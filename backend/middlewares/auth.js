import { catchAsyncErrors } from "./catchAsyncErrors.js";
import Errorhandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAutheticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(
      new Errorhandler("Please login as admin to access this resource", 400)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new Errorhandler(
        `${req.user.role} is not authorized for this resource.`,
        403
      )
    );
  }
  next();
});

export const isPatientAutheticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new Errorhandler("Patient not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new Errorhandler(
          `${req.user.role} is not authorized for this resource.`,
          403
        )
      );
    }
    next();
  }
);
