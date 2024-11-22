import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, `First name must be at least 3 characters`],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, `Last name must be at least 3 characters`],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, `Phone number must be exact 10 characters`],
    maxLength: [10, `Phone number must be exact 10 characters`],
  },
  idn: {
    type: String,
    required: true,
    minLength: [7, `ID number must be exact 10 characters`],
    maxLength: [7, `ID number must be exact 10 characters`],
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, `Password must be at least 8 characters`],
    maxLength: [15, `Password must be at most 15 characters`],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
    required: false,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
