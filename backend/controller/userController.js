import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

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

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password do not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });
});
