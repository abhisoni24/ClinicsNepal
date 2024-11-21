import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, `Message must be at least 10 characters`],
  },
});

export const Message = mongoose.model("Message", messageSchema);
