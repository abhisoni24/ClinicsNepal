class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Errorhandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid, Try again`;
    err = new Errorhandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired, Try again`;
    err = new Errorhandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default Errorhandler;
