import { getCurrentUserInfo, linkedInLogin } from "../../utils";
import Button from "../components/Button";
import Text from "../components/Text";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import LinkedInLogin from "../components/LinkedInLogin";
import { useUserInfoContext } from "../context/UserInfoContext";
import { ArrowUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router";

function StartPage() {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const numberOfShapes = 25;
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (window?.location?.href?.split("?")[1]?.split("code=")[1]) {
      setIsLogging(true);
    }

    async function getUser() {
      await getCurrentUserInfo({ setUserInfo });
      setIsLoading(false);
    }

    getUser();
  }, [setUserInfo]);

  // Generate shape configurations only once with improved animation parameters
  const shapes = useMemo(() => {
    return Array.from({ length: numberOfShapes }, (_, index) => ({
      id: index,
      size: Math.random() * 5 + 3,
      opacity: Math.random() * 0.15 + 0.1,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: Math.random() * 8 + 12,
      delay: index * 0.2,
      scale: Math.random() * 0.5 + 0.8,
      rotate: Math.random() * 360,
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
          {!isLoading &&
            (userInfo.loggedIn ? (
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-semibold px-6 py-3 rounded-lg transition-colors inline-flex "
                onClick={() => navigate("/linkedin-bot")}
              >
                Continue
                <span>
                  <ArrowUpRightIcon />
                </span>
              </Button>
            ) : (
              <Button
                className={`bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-semibold px-6 py-3 rounded-lg transition-all duration-500 ease-in-out`}
                onClick={linkedInLogin}
              >
                Sign in with LinkedIn
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}

export default StartPage;
