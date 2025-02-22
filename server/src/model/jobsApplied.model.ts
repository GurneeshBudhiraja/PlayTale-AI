import mongoose from "mongoose";


const JobsAppliedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  totalJobs: [
    {
      position: {
        type: String,
        required: true,
        trim: true,
      },
      companyName: {
        type: String,
        required: true,
        trim: true,
      },
      appliedDate: {
        type: String,
        required: true,
        trim: true,
      },
      jobUrl: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
    }
  ]
})


const JobsApplied = mongoose.model("JobsApplied", JobsAppliedSchema)

export default JobsApplied