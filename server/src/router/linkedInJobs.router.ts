import { Router } from "express";
import { getAppliedJobs } from "../controller/linkedInJobs.controller.js";

const router = Router()

// Gets all the applied jobs based on the email id
router.get("/", getAppliedJobs)


export default router