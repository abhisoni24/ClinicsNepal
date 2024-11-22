import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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

  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
