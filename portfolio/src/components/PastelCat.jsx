import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import idle from "../assets/cat/idle.png";
import walk1 from "../assets/cat/walk1.png";
import walk2 from "../assets/cat/walk2.png";
import happy from "../assets/cat/happy.png";
import sleep from "../assets/cat/sleep.png";

const poses = {
  idle,
  happy,
  sleep
};

function PastelCat() {
  const [position, setPosition] = useState(50);
  const [direction, setDirection] = useState(1);
  const [walkingFrame, setWalkingFrame] = useState(0);
  const [mood, setMood] = useState("idle");
  const [message, setMessage] = useState("");

  // Random walk
  useEffect(() => {
    const move = setInterval(() => {
      setPosition((prev) => {
        let next = prev + direction * 5;
        if (next > 80 || next < 5) {
          setDirection((d) => -d);
          return prev;
        }
        return next;
      });

      setWalkingFrame((f) => (f === 0 ? 1 : 0));
    }, 800);

    return () => clearInterval(move);
  }, [direction]);

  // Random cute messages
  useEffect(() => {
    const messages = [
      "Meow~ 🌸",
      "She codes really well 💻",
      "Don’t forget to scroll! ✨",
      "Send her a message 💌",
      "I like snacks 🐟"
    ];

    const talk = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMsg);

      setTimeout(() => setMessage(""), 3000);
    }, 8000);

    return () => clearInterval(talk);
  }, []);

  const currentWalkFrame = walkingFrame === 0 ? walk1 : walk2;

  return (
    <motion.div
      className="fixed bottom-5"
      animate={{ left: `${position}%` }}
      transition={{ duration: 0.6 }}
      style={{ transform: direction === -1 ? "scaleX(-1)" : "scaleX(1)" }}
    >
      {message && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow text-sm text-pink-500">
          {message}
        </div>
      )}

      <img
        src={currentWalkFrame}
        alt="Pastel Cat"
        className="w-24 drop-shadow-xl"
      />
    </motion.div>
  );
}

export default PastelCat;