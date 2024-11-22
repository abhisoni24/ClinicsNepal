import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

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
  generateToken(user, "User registered successfully", 200, res);
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
  generateToken(user, "User logged in successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, gender, phone, idn, dob } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !phone ||
    !idn ||
    !dob
  ) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already exists with this email`,
        400
      )
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    idn,
    dob,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New admin added successfully",
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", { expires: new Date(Date.now()), httpOnly: true })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Patient logged out successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar is needed", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["/image/webp", "image/jpeg", "image/png"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(
      new ErrorHandler("Invalid file format. It is not supported.", 400)
    );
  }

  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    idn,
    dob,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !phone ||
    !idn ||
    !dob ||
    !doctorDepartment
  ) {
    return next(
      new ErrorHandler("Please provide full details of the doctor", 400)
    );
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already exists with this email`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Error from Cloudinary"
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    idn,
    dob,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  return res.status(200).json({
    success: true,
    message: "New doctor added successfully",
    doctor,
  });
});
