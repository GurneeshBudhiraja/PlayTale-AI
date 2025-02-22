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
    const appliedJobsDbResponse = await JobsApplied.find({
      email
    })
    if (!appliedJobsDbResponse.length) {
      res.status(200).json({
        success: true,
        appliedJobs: null,
      })
      return;
    }
    const appliedJobs = appliedJobsDbResponse[0].totalJobs
    res.status(200).json({
      success: true,
      appliedJobs,
    })
    return;
  } catch (error) {
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
    Object.keys(body).forEach((key) => {
      if (typeof body[key as keyof typeof body] === 'string') {
        body[key as keyof typeof body] = (body[key as keyof typeof body] as string).trim()
      }
    })
    const { email, ...jobInfo } = body

    // Upserts the applied jobs by the user
    await JobsApplied.findOneAndUpdate({ email }, {
      $push: {
        totalJobs: {
          $each: [jobInfo],
          $position: 0
        }
      }
    }, {
      new: true,
      upsert: true,
      session
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
