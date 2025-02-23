import Button from "../components/Button";
import Text from "../components/Text";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { useGamePreferencesContext } from "../context/GameContext";

function StartPage() {
  const numberOfShapes = 25;
  const navigate = useNavigate();
  const buttonClickSoundRef = useRef<HTMLAudioElement>(null);
  const { setGamePreferences } = useGamePreferencesContext();

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

  useEffect(() => {
    // Clears the context on the page load
    setGamePreferences({
      age: 12,
      customTheme: "",
      selectedTheme: "fun",
    });
  }, [setGamePreferences]);

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

      <div className="h-full flex flex-col items-center justify-center gap-6 relative z-10">
        <Text
          className="text-5xl font-bold bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent py-1"
          textContent="PlayTale"
        />
        <Text
          className="text-2xl bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent shadow-2xl"
          textContent="Play. Create. Explore your own tales."
        />
        <Button
          className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full shadow-[3px_2px_0px_white] active:shadow-none active:translate-1 w-1/4"
          onClick={() => {
            if (buttonClickSoundRef.current) buttonClickSoundRef.current.play();
            setTimeout(() => navigate("/theme"), 500);
          }}
          buttonProps={{
            onMouseUp: () => {
              setTimeout(() => {
                if (buttonClickSoundRef.current) {
                  buttonClickSoundRef.current.pause();
                  buttonClickSoundRef.current.currentTime = 0;
                }
              }, 2000);
            },
          }}
        >
          <audio
            src="/button-click-sound.mp3"
            ref={buttonClickSoundRef}
            hidden={true}
          />
          Start
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
