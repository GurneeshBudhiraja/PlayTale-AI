import mongoose from "mongoose";


const UserProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  preferredJobTitle: {
    type: String,
    trim: true,
    required: true,
  },
  personalWebsiteLink: {
    type: String,
    trim: true,
    required: true,
  },
  preferredJobCountry: {
    type: String,
    trim: true,
    required: true,
  },
  profileSummary: {
    type: String,
    trim: true,
    required: true,
  },
  folderName: {
    type: String,
    trim: true,
    required: true,
  },
  resumeText: {
    type: String,
    trim: true,
    required: true,
  },
  coverLetterText: {
    type: String,
    trim: true,
    required: true,
  }
}, {
  timestamps: true,
})



const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfile;
