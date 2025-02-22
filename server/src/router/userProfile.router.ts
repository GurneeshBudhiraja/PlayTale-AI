import { Router } from "express";
import { createUserProfile, getUserProfile } from "../controller/userProfile.controller.js";

const router = Router();

// Gets the user profile info from DB
router.get("/", getUserProfile)

// Creates a new user profile in the db
router.post("/", createUserProfile)



export default router