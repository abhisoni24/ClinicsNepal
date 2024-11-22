import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userSchema.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    idn,
    role,
    dob,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !phone ||
    !idn ||
    !role ||
    !dob
  ) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    idn,
    role,
    dob,
  });
  res.status(200).json({
    success: true,
    message: "User registered successfully",
  });
});
