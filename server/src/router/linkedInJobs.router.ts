import { Router } from "express";
import { getAppliedJobs, saveAppliedJob } from "../controller/linkedInJobs.controller.js";

const router = Router()

// Gets all the applied jobs based on the email id
router.get("/", getAppliedJobs)


// Saves an applied LinkedIn job
router.post("/", saveAppliedJob)



export default router