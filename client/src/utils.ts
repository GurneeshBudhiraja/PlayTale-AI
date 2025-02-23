import React from "react";
import { LINKEDIN_REDIRECT_URI } from "./env";
import pdfToText from "react-pdftotext";


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
