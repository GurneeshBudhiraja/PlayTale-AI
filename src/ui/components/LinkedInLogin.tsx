import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useUserInfoContext } from "../context/UserInfoContext";
import { LINKEDIN_LOGIN } from "../constants/backendRoute.constants";
import { getCurrentUserInfo } from "../../utils";

function LinkedInLogin({
  setIsLogging,
}: {
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfoContext();

  async function getAccessToken() {
    const code = window?.location?.href?.split("?")[1]?.split("code=")[1];
    try {
      // Generates the access token and stores in the cookies
      const { data } = await axios.post(
        LINKEDIN_LOGIN,
        {
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success } = data as {
        success: boolean;
        message: string;
      };
      if (success) {
        // Gets the current logged in user info after the access token has been generated
        await getCurrentUserInfo({ setUserInfo });
      }
    } catch (error) {
      console.log("Error getting the access token:", error);
      setUserInfo({
        loggedIn: false,
        email: "",
        name: "",
        picture: "",
        userProfile: {
          completedUserProfile: false,
          preferredJobTitle: "",
          linkedInSummary: "",
          personalWebsiteLink: "",
          preferredJobCountry: "",
          profileSummary: "",
          folderName: "",
          resumeText: "",
          coverLetterText: "",
        },
      });
    } finally {
      setIsLogging(false);
      navigate("/");
    }
  }

  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <div className="grid place-items-center h-full w-full animate-spin">
      <Loader2 size={50} className="text-indigo-500" />
    </div>
  );
}

export default LinkedInLogin;
