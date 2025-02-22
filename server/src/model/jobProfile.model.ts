import { Schema, model, models } from "mongoose";

const UserProfileSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  coverLetterLink: {
    type: String,
    required: true,
  },
  botAssignedFolder: {
    type: String,
    required: true,
  },
  userLinkedinProfileInfo: {
    type: String,
    required: true
  },
  personalWebsiteLink: {
    type: String,
    required: true,
  },
  jobLocationCountry: {
    type: String,
    required: true,
    lowercase: true,
  },
  jobLocationCity: {
    type: String,
    required: false,
    lowercase: true,
    default: ""
  },
  aiProfileSummary: {
    type: String,
    required: true,
    lowercase: true,
  },
  githubAccountUrl: {
    type: String,
    required: false,
    default: "",
  }
})




const UserProfile = model("JobProfile", UserProfileSchema)

export default UserProfile
