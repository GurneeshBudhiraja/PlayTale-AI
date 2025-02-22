import { Request, Response } from "express";
import JobsApplied from "../model/jobsApplied.model.js";
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