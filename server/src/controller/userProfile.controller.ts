import { Request, Response } from "express";
import mongoose from "mongoose";
import UserProfile from "../model/userProfile.model.js";

export async function createUserProfile(req: Request, res: Response) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const body = req.body;
    if (!Object.keys(body).length) {
      session.abortTransaction()
      res.status(400).json({
        success: false,
        message: "Missing body"
      })
      return;
    }
    // trims all the values from the body object
    Object.keys(body).forEach((key) => {
      if (typeof body[key as keyof typeof body] === 'string') {
        body[key as keyof typeof body] = (body[key as keyof typeof body] as string).trim()
      }
    })

    const response = await (new UserProfile({
      ...body
    })).save()
    console.log("response:", response)
    session.commitTransaction()
    res.status(200).json({
      success: true,
      message: "User profile has been created"
    })

  } catch (error) {
    console.log("Error creating a new user profile", error)
    session.abortTransaction()
    res.status(500).json({
      success: false,
      message: "Failed to create a new user profile"
    })
  } finally {
    await session.endSession()
  }
}


export async function getUserProfile(req: Request, res: Response) {
  try {
    const email = (req.query.email as string)?.trim();
    console.log(req.params)
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Missing email query params"
      })
      return;
    }
    const response = await UserProfile.findOne({ email }, { __v: 0, _id: 0, email:0 })
    console.log(response)
    res.status(200).json({
      success: true,
      response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get the user profile info."
    })
  } finally { }

}