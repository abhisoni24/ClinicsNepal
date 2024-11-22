export const catchAsyncErrors = (theFunction) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
