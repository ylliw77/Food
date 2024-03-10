function errorHandler(err, req, res, next) {
  let value = 500;
  let message = "Internal server error";
  console.log(err);

  if (err.name == "USER_NOT_FOUND") {
    value = 401;
    message = err.message;
  } else if (err.name == "SequelizeValidationError") {
    value = 400;
    message = err.errors[0].message;
  } else if (err.name == "SequelizeUniqueConstraintError") {
    value = 400;
    message = err.errors[0].message;
  } else if(err.name == "NOT_FOUND") {
    value = 404
    message = "Error not found"
  } else if(err.name == "UNAUTHORIZED" || err.name == "JsonWebTokenError") {
    value = 401
    message = "Login required"
  } else if(err.name == "FORBIDDEN") {
    value = 403
    message = "Forbidden access"
  }


  res.status(value).json({message})
}

module.exports = errorHandler;
