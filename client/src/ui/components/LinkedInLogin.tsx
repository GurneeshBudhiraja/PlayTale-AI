import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../env";
import { useNavigate } from "react-router";

function LinkedInLogin({
  setIsLogging,
}: {
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  async function getAccessToken() {
    const code = window?.location?.href?.split("?")[1]?.split("code=")[1];
    console.log(code);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/linkedin/login`,
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
        const { data } = await axios.get(`${BACKEND_URL}/linkedin/me`, {
          withCredentials: true,
        });
        const { success, ...userInfo } = data as LinkedMeRouteType;
        if (success) {
          console.log(userInfo);
        }
      }
    } catch (error) {
      console.log("Error getting the access token:", error);
      navigate("/");
      return;
    } finally {
      setIsLogging(false);
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
