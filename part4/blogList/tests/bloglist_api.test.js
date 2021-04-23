const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");

const api = supertest(app);

const getToken = async (name, password) => {
  const user = {
    username: name,
    password: password,
  };

  const tokenResponse = await api.post("/api/login").send(user);
  return tokenResponse.body.token;
};

test("check unique identifier property of the blog posts is named id", async () => {
  jest.setTimeout(30000);
  const response = await api.get("/api/blogs");
  response.body.map((blog) => expect(blog.id).toBeDefined());
});

describe("add to database", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("get all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
  });

  test("verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };

    const token = await getToken("root", "sekret");

    const originalStateOfData = await api.get("/api/blogs");

    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(200);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(originalStateOfData.body.length + 1);
  });

  test("verifies that if the likes property is missing from the request and if so default likes to equals 0", async () => {
    jest.setTimeout(30000);
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };

    const token = await getToken("root", "sekret");

    const response = await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(response.body.likes).toBe(0);
  });

  test("verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      likes: 12,
      __v: 0,
    };

    const token = await getToken("root", "sekret");

    const originalStateOfData = await api.get("/api/blogs");

    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(originalStateOfData.body.length);

  });

  test("adding a blog fails with the proper status code 401 Unauthorized if a token is not provided.", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };


    const originalStateOfData = await api.get("/api/blogs");

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(originalStateOfData.body.length);
  })
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeds with a fresh username", async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(userAtStart.length);
  });

  test("creation fails when password length is less than 3", async () => {
    // jest.setTimeout(30000);
    const newUser = {
      username: "blob",
      name: "blober",
      password: "li",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );
  });

  test("creation fails when password is not given", async () => {
    const newUser = {
      username: "blob",
      name: "blober",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("password is required");
  });

  test("creation fails when username length is less than 3", async () => {
    const newUser = {
      username: "bb",
      name: "blober",
      password: "lis",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      `User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`
    );
  });

  test("creation fails when username is not given", async () => {
    const newUser = {
      name: "blober",
      password: "lis",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "User validation failed: username: Path `username` is required."
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
