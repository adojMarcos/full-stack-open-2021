const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
  return request.token;
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id || !decodedToken) {
    return response.status(401).json({ error: "token missing or invalid" });
  } else {
    request.user = await User.findById(decodedToken.id);
  }
  
  next();
  return request.user;
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
