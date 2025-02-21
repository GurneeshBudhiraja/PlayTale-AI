import { Router } from "express";
import { getLinkedInAccessToken, getLinkedInUserInfo } from "../controller/linkedin.controller.js";


const router = Router()


router.post("/login", getLinkedInAccessToken)
router.get("/me", getLinkedInUserInfo)



export default router