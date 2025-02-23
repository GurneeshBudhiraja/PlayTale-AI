import React from "react";
import { LINKEDIN_REDIRECT_URI } from "./env";
import pdfToText from "react-pdftotext";
import axios from "axios";
import { GET_LINKEDIN_INFO, GET_USER_PROFILE_INFO } from "./ui/constants/backendRoute.constants";


export async function linkedInLogin() {
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78alqpzulixtgq&redirect_uri=${LINKEDIN_REDIRECT_URI}&state=hard_to_guess_string&scope=openid%20profile%20email`
}


export async function getUserProfileDetails() {
  try {
    return;
  } catch (error) {
    console.log("error:", error)
  }

}


export async function extractText(e: React.ChangeEvent<HTMLInputElement>, setPdfText: React.Dispatch<React.SetStateAction<{
  resumeText: string;
  coverLetterText: string;
}>>, category: "resumeText" | "coverLetterText") {
  const file = (e.target.files as FileList)[0]
  const fileText = await pdfToText(file)
  console.log(fileText)
  setPdfText((prev) => ({
    ...prev,
    [category]: fileText || ""
  }))
  return;
}


export async function getCurrentUserInfo({
  setUserInfo,
}: {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
}) {
  const { data } = await axios.get(GET_LINKEDIN_INFO, {
    withCredentials: true,
  });
  const { success, ...userInfo } = data as Omit<LinkedMeRouteType, "loggedIn">;
  if (success) {
    // Updates the userInfo state once the user info has been collected from the backend
    setUserInfo({
      ...userInfo,
      userProfile: {
        ...userInfo.userProfile,
      },
      loggedIn: true,
    });
    const { data } = await axios.get(GET_USER_PROFILE_INFO, {
      params: {
        email: userInfo.email,
      },
    });
    const { response } = data as {
      success: boolean;
      response: Omit<UserProfileType, "completedUserProfile">;
    };
    if (!response) {
      setUserInfo((prev) => ({
        ...prev,
        userProfile: {
          ...prev.userProfile,
        },
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        userProfile: {
          completedUserProfile: true,
          ...response,
        },
      }));
    }
  }
}
