import { linkedInLogin } from "../../utils";
import Button from "../components/Button";
import Text from "../components/Text";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import LinkedInLogin from "../components/LinkedInLogin";
import { useUserInfoContext } from "../context/UserInfoContext";
import axios from "axios";
import { BACKEND_URL } from "../../env";

function StartPage() {
  const { setUserInfo, userInfo } = useUserInfoContext();
  const numberOfShapes = 25;
  const [isLogging, setIsLogging] = useState<boolean>(false);
  async function getCurrentUser() {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/linkedin/me`, {
        withCredentials: true,
      });
      const { success, ...info } = data;
      const { email, name, picture } = info as UserInfoType;
      if (success) {
        setUserInfo({
          email,
          name,
          picture,
          loggedIn: true,
        });
      } else {
        setUserInfo({
          email: "",
          loggedIn: false,
          name: "",
          picture: "",
        });
      }
    } catch (error) {
      console.log("Error in getting the current user:", error);
      setUserInfo({
        email: "",
        name: "",
        loggedIn: false,
        picture: "",
      });
    }
  }
  useEffect(() => {
    if (window?.location?.href?.split("?")[1]?.split("code=")[1]) {
      setIsLogging(true);
    }
    getCurrentUser();
  }, []);

  // Generate shape configurations only once with improved animation parameters
  const shapes = useMemo(() => {
    return Array.from({ length: numberOfShapes }, (_, index) => ({
      id: index,
      size: Math.random() * 5 + 3, // Slightly larger shapes
      opacity: Math.random() * 0.15 + 0.1, // Slightly more visible
      startX: Math.random() * 100, // Full width coverage
      startY: Math.random() * 100, // Full height coverage
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: Math.random() * 8 + 12, // Slower, more gentle movement
      delay: index * 0.2, // Faster initial appearance
      scale: Math.random() * 0.5 + 0.8, // Add size variation during animation
      rotate: Math.random() * 360, // Add rotation
    }));
  }, []);

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Animated background shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-indigo-300"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: shape.opacity,
            left: `${shape.startX}%`,
            top: `${shape.startY}%`,
          }}
          animate={{
            left: [`${shape.startX}%`, `${shape.endX}%`, `${shape.startX}%`],
            top: [`${shape.startY}%`, `${shape.endY}%`, `${shape.startY}%`],
            scale: [1, shape.scale, 1],
            rotate: [0, shape.rotate, 0],
          }}
          transition={{
            duration: shape.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Front content */}
      {isLogging ? (
        <LinkedInLogin setIsLogging={setIsLogging} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-6 relative z-10">
          <Text
            className="text-5xl font-bold bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent"
            textContent="JobPilot AI"
          />
          <Text
            className="text-2xl bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent shadow-2xl"
            textContent="Land your dream job, on autopilot."
          />
          {userInfo.loggedIn ? (
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-semibold px-6 py-3 rounded-lg transition-colors"
              onClick={() => console.log(userInfo)}
            >
              Get Started
            </Button>
          ) : (
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-semibold px-6 py-3 rounded-lg transition-colors"
              onClick={linkedInLogin}
            >
              Sign in with LinkedIn
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default StartPage;
