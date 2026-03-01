import { useState } from "react";

// Test if splash works
import WelcomeSplash from "./components/WelcomeSplash";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <WelcomeSplash onComplete={() => setShowSplash(false)} />;
  }

  // Simple test content after splash
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #fef3c7, #fce7f3, #e9d5ff)",
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#ec4899"
    }}>
      ✅ Content is loading! If you see this, the basic app works.
      <br />
      Now we can add back the real components.
    </div>
  );
}
