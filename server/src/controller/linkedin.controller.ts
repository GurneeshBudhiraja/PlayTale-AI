import { Request, Response } from "express"
import axios from "axios"
import { PROFILE_URL } from "../constants/linkedInRouteConstants.js";

export async function getLinkedInAccessToken(req: Request, res: Response) {
  try {
    const { code } = req.body as {
      code: string
    };
    if (!code) {
      res.status(401).json({
        success: false,
        message: "Code missing in the request body"
      })
      return;
    }
    const { data } = await axios.post(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=78alqpzulixtgq&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${process.env.FRONTEND_URL}`)


    const { access_token, expires_in } = data as {
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
      id_token: string;
    }
    console.log("access_token is:", access_token)
    res.cookie("access-token", access_token)
    res.json({
      success: true,
      message: "LinkedIn access token has been generated successfully",
    })
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting the LinkedIn Access Token"
    })
    return;
  }
}


export async function getLinkedInUserInfo(req: Request, res: Response) {
  try {
    const accessToken = req.cookies["access-token"];
    console.log(accessToken)
    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: "User not logged in."
      })
      return;
    }
    const { data: info } = await axios.get(PROFILE_URL, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    res.status(200).json({
      success: true,
      email: info?.email || "",
      name: info?.name || "",
      picture: info?.picture || "",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting the LinkedIn Access Token"
    })
    return;
  }
}