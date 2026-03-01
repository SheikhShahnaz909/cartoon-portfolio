import { useState, useEffect } from "react";

export function useGreeting() {
  const [greeting, setGreeting] = useState({ text: "", emoji: "", period: "" });

  useEffect(() => {
    function compute() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12)
        return { text: "Good morning",   emoji: "☀️",  period: "morning" };
      if (hour >= 12 && hour < 17)
        return { text: "Good afternoon", emoji: "🌤️", period: "afternoon" };
      if (hour >= 17 && hour < 21)
        return { text: "Good evening",   emoji: "🌇", period: "evening" };
      return   { text: "Good night",     emoji: "🌙", period: "night" };
    }
    setGreeting(compute());
  }, []);

  return greeting;
}
