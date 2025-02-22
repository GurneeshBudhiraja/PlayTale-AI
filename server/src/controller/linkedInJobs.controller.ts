import { Request, Response } from "express";
import JobsApplied from "../model/jobsApplied.model.js";
import mongoose from "mongoose";

// Gets all the applied jobs from DB
export async function getAppliedJobs(req: Request, res: Response) {
  try {
    const email = (req.query.email as string).trim()
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required"
      })
      return
    }
    const appliedJobs = await JobsApplied.findOne({
      email
    })
    res.status(200).json({
      success: true,
      appliedJobs,
    })
    return;
  } catch (error) {
    console.log("Error getting all the applied jobs.")
    res.status(500).json({
      success: false,
      message: "Failed to get applied jobs",

    })
  }

}


// Saves a new applied job in the db
export async function saveAppliedJob(req: Request, res: Response) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const body = req.body as {
      email: string;
      position: string;
      companyName: string;
      appliedDate: string;
      jobUrl: string;
      location: string;
    };
    if (!Object.keys(body).length) {
      session.abortTransaction()
      await session.endSession()
      res.status(400).json({
        success: true,
        message: "Body missing from request."
      })
      return;
    }
    const { email, ...jobInfo } = body
    await JobsApplied.findOneAndUpdate({ email }, {
      $push: {
        totalJobs: jobInfo
      }
    }, {
      new: true,
      upsert: true,
    })
    session.commitTransaction()
    session.endSession()
    res.status(200).json({
      success: true,
      message: "Job has been saved"
    })
  } catch (error) {
    session.abortTransaction()
    res.status(500).json({
      success: false,
      message: "Failed to save the job",
    })
  } finally {
    await session.endSession()
  }
}
