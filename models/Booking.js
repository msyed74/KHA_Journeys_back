import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  dob: String,
  age: String,
  maritalStatus: String,
  nationality: String,
  passportNumber: String,
  passportIssueDate: String,
  passportExpiryDate: String,
  whatsapp: String,
  alternateNumber: String,
  email: String,
  address: String,
  emergencyContact: String,
  packageType: String,
  specialRequest: String,

  passportImage: String,
  photo: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Booking", bookingSchema);
