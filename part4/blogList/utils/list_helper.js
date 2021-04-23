const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Michael Chan",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

 const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.sort((a, b) => b.likes - a.likes);
  return {
    title: mostLikedBlog[0].title,
    author: mostLikedBlog[0].author,
    likes: mostLikedBlog[0].likes,
  };
}; 

const mostBlogs = (blogs) => {
  let names = [];
  let authors = blogs.map((blog) => {
    names.push(blog.author);
    return {
      author: blog.author,
      blogs: 0,
    };
  });

  const filtedAuthors = authors.filter((author, index) => {
    const aux = JSON.stringify(author);
    return (
      index ===
      authors.findIndex((obj) => {
        return JSON.stringify(obj) === aux;
      })
    );
  });

  for (let name of names) {
    for (let author of filtedAuthors) {
      if (author.author === name) {
        author.blogs++;
        break;
      }
    }
  }

  const mostBlogs = filtedAuthors.sort((a, b) => b.blogs - a.blogs)
  return mostBlogs[0];
};

 const mostLikes = (blogs) => {
    let l = []
    let k = []
    let mostLiked = blogs.filter(blog => {
      let aux = {}
      if(l.includes(blog.author)){
        l.push(blog.author)
        k.forEach(element => {
          if(element.author === blog.author){
            element.likes += blog.likes
          }
        });
      }else  {
        l.push(blog.author)
        k.push(blog)
        aux = blog
        return aux;
      }
    }).reduce((acc, curr) => (acc.likes > curr.likes) ? acc : curr)
    return {
      author: mostLiked.author,
      likes: mostLiked.likes
    }
}
 

 module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}; 