const notFound = (req, res, next) => {
  res.statusCode = 404;
  const error = new Error(`Not found ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "Production" ? null : err.stack,
  });
};
export { notFound, errorHandler };
