import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

// ─── Zone config ──────────────────────────────────────────────────────────────
const ZONES = {
  navbar:    { mood: "curious", messages: ["Ooh the navbar! 🧭", "So many episodes~ 📺", "Click something! 👆", "🌸 Shahnaz is up there!"], characterReply: null },
  hero:      { mood: "happy",   messages: ["Episode 01 starts here~ 🌅", "Time to code! 💻", "She loves mornings... barely ☕"], characterReply: null },
  about:     { mood: "read",    messages: ["Reading Shahnaz's profile 📖", '"cats: obviously 🐱" — that\'s me!', "She drinks tea not coffee! ☕"], characterReply: null },
  skills:    { mood: "amazed",  messages: ["So many skills! 🤩", "React AND Framer Motion?! ⚛️", "The training arc is real ⚡"], characterReply: null },
  projects:  { mood: "excited", messages: ["Look at these projects! 🚀", "She shipped all of these! 😸", "Oreo tested every one 🐾"], characterReply: null },
  contact:   { mood: "wave",    messages: ["Send her a message! 💌", "She replies fast~ 🏃", "Season Finale! 📺"], characterReply: null },
  footer:    { mood: "sleepy",  messages: ["The credits are rolling... 🎬", "See you in Season 2! 📺✨", "Oreo is sleepy now 💤"], characterReply: null },
  character: {
    mood: "love",
    messages: ["Shahnaz!! 💖", "My favourite human~ 🥰", "Can I have a snack? 🐟", "Sitting together hehe 🐱"],
    characterReply: ["Oreo!! 🐱💖", "There you are, silly cat~", "You want snacks AGAIN? 😂", "My little ginger baby 🧡"],
  },
  default: { mood: "idle", messages: ["Meow~ 🐱", "Drag me somewhere! 🐾", "Oreo is watching~ 👀", "Got any fish? 🐟"], characterReply: null },
};

// ─── SVG Cat (white + ginger) ─────────────────────────────────────────────────
const CatSVG = ({ mood, frame }) => {
  const eyeClose = mood === "sleepy";
  const eyeHappy = ["happy","love","excited","wave","curious"].includes(mood);
  const eyeStars = mood === "amazed";
  const tailWag  = ["love","happy","excited"].includes(mood);
  return (
    <svg width="76" height="86" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.42)) drop-shadow(0 1px 4px rgba(0,0,0,0.28))" }}>
      <motion.path d="M22 68 Q8 55 11 42" stroke="#d97706" strokeWidth="6" strokeLinecap="round" fill="none"
        animate={{ rotate: tailWag ? [0,-30,30,-30,30,0] : frame===0 ? -14 : 14 }}
        style={{ transformOrigin:"22px 68px" }}
        transition={{ duration: tailWag ? 0.55 : 0.5, repeat: tailWag ? Infinity : 0 }} />
      <motion.circle cx="11" cy="42" r="4" fill="white"
        animate={{ rotate: frame===0 ? -14 : 14 }} style={{ transformOrigin:"22px 68px" }} transition={{ duration:0.5 }} />
      <ellipse cx="40" cy="66" rx="21" ry="17" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <ellipse cx="52" cy="60" rx="10" ry="8"  fill="#f59e0b" opacity="0.72" />
      <ellipse cx="27" cy="69" rx="8"  ry="7"  fill="#d97706" opacity="0.60" />
      <circle cx="40" cy="38" r="20" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <ellipse cx="29" cy="28" rx="10" ry="8" fill="#f59e0b" opacity="0.68" />
      <ellipse cx="55" cy="33" rx="8"  ry="7" fill="#d97706" opacity="0.62" />
      <ellipse cx="42" cy="23" rx="6"  ry="5" fill="#fbbf24" opacity="0.50" />
      <polygon points="22,22 15,5 33,18"  fill="white"  stroke="#e5e7eb" strokeWidth="1.2" />
      <polygon points="58,22 65,5 47,18"  fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <polygon points="24,21 19,9 31,18"  fill="#fda4a4" opacity="0.85" />
      <polygon points="56,21 61,9 49,18"  fill="#fda4a4" opacity="0.85" />
      {eyeClose ? (
        <><path d="M30 37 Q34 33 38 37" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none" /><path d="M42 37 Q46 33 50 37" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none" /></>
      ) : eyeStars ? (
        <><text x="28" y="41" fontSize="12" textAnchor="middle">⭐</text><text x="50" y="41" fontSize="12" textAnchor="middle">⭐</text></>
      ) : eyeHappy ? (
        <><path d="M30 39 Q34 34 38 39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none" /><path d="M42 39 Q46 34 50 39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none" /></>
      ) : (
        <><circle cx="34" cy="37" r="5.5" fill="#14532d" /><circle cx="46" cy="37" r="5.5" fill="#14532d" /><circle cx="34" cy="37" r="3.5" fill="#16a34a" /><circle cx="46" cy="37" r="3.5" fill="#16a34a" /><circle cx="35.5" cy="35.5" r="1.8" fill="white" /><circle cx="47.5" cy="35.5" r="1.8" fill="white" /></>
      )}
      <ellipse cx="40" cy="44" rx="3" ry="2" fill="#f9a8d4" />
      <path d="M37 46 Q40 50 43 46" stroke="#f9a8d4" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <line x1="16" y1="42" x2="33" y2="43" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="46" x2="33" y2="46" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="47" y1="43" x2="64" y2="42" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="47" y1="46" x2="64" y2="46" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="26" cy="47" rx="6" ry="3.5" fill="#fda4af" opacity={eyeHappy||mood==="love"?0.65:0.32} />
      <ellipse cx="54" cy="47" rx="6" ry="3.5" fill="#fda4af" opacity={eyeHappy||mood==="love"?0.65:0.32} />
      <motion.g animate={mood==="wave"?{y:[-6,-15,-6],rotate:[-10,22,-10]}:{y:0,rotate:0}}
        transition={{repeat:mood==="wave"?Infinity:0,duration:0.5}} style={{transformOrigin:"18px 62px"}}>
        <ellipse cx="18" cy="62" rx="7" ry="6" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <ellipse cx="20" cy="60" rx="4" ry="3" fill="#f59e0b" opacity="0.55" />
      </motion.g>
      <ellipse cx="62" cy="76" rx="7" ry="6" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      <ellipse cx="31" cy="82" rx="6" ry="5" fill="white"  stroke="#e5e7eb" strokeWidth="1" />
      <ellipse cx="49" cy="82" rx="6" ry="5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" opacity="0.82" />
      {mood==="sleepy" && (
        <motion.text x="56" y="16" fontSize="14" fill="#92400e" fontFamily="serif" fontWeight="bold"
          animate={{opacity:[1,0.15,1],y:[-2,-10,-2]}} transition={{repeat:Infinity,duration:1.6}}>z</motion.text>
      )}
      {mood==="love" && (
        <>
          <motion.text x="57" y="19" fontSize="13" animate={{y:[-2,-13,-2],opacity:[1,0.2,1]}} transition={{repeat:Infinity,duration:1.2}}>💖</motion.text>
          <motion.text x="4" y="24" fontSize="11" animate={{y:[-2,-11,-2],opacity:[1,0.2,1]}} transition={{repeat:Infinity,duration:1.5,delay:0.45}}>💕</motion.text>
        </>
      )}
    </svg>
  );
};

// ─── Zone detection using your exact IDs + classNames ─────────────────────────
function detectZone(x, y) {
  // Navbar: className="navbar", fixed at top
  const navbar = document.querySelector("nav.navbar");
  if (navbar) {
    const r = navbar.getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom + 10) return "navbar";
  }
  if (y < 72) return "navbar";

  // Character: CompanionSimple is position:fixed bottom:0 right:2rem ~165px wide ~205px tall
  if (x >= window.innerWidth - 215 && y >= window.innerHeight - 235) return "character";

  // Footer: className="footer"
  const footer = document.querySelector("footer.footer");
  if (footer) {
    const r = footer.getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return "footer";
  }

  // Sections: id="contact", "projects", "skills", "about", "hero"
  for (const id of ["contact","projects","skills","about","hero"]) {
    const el = document.getElementById(id);
    if (el) {
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return id;
    }
  }
  return "default";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PastelCat() {
const [pos, setPos] = useState({
  x: Math.min(window.innerWidth - 100, window.innerWidth - 240),
  y: window.innerHeight - 170,
});
  const [isDragging, setIsDragging] = useState(false);
  const [zone, setZone]             = useState("character");
  const [mood, setMood]             = useState("love");
  const [oreoMsg, setOreoMsg]       = useState("");
  const [charMsg, setCharMsg]       = useState("");
  const [frame, setFrame]           = useState(0);
  const [petCount, setPetCount]     = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);
  const [introduced, setIntroduced] = useState(false);

  const oreoTimer  = useRef(null);
  const charTimer  = useRef(null);
  const sleepTimer = useRef(null);
  const moodLock   = useRef(false);
  const posRef     = useRef(pos);
  const zoneRef    = useRef(zone);
  posRef.current   = pos;
  zoneRef.current  = zone;

  const showOreo = useCallback((msg, ms=3800) => {
    clearTimeout(oreoTimer.current);
    setOreoMsg(msg);
    oreoTimer.current = setTimeout(() => setOreoMsg(""), ms);
  }, []);

  const showChar = useCallback((msg, ms=3800) => {
    clearTimeout(charTimer.current);
    setCharMsg(msg);
    charTimer.current = setTimeout(() => setCharMsg(""), ms);
  }, []);

  const applyZone = useCallback((z) => {
    const cfg = ZONES[z] || ZONES.default;
    setZone(z); setMood(cfg.mood);
    showOreo(cfg.messages[Math.floor(Math.random() * cfg.messages.length)], 4000);
    if (cfg.characterReply) {
      setTimeout(() => showChar(cfg.characterReply[Math.floor(Math.random() * cfg.characterReply.length)], 4000), 900);
    }
  }, [showOreo, showChar]);

  // Tail tick
  useEffect(() => {
    const id = setInterval(() => setFrame(f => f===0?1:0), 700);
    return () => clearInterval(id);
  }, []);

  // Intro
  useEffect(() => {
    const t = setTimeout(() => {
      moodLock.current = true; setMood("wave");
      showOreo("Hey! I'm Oreo 🐱 drag me anywhere!", 4200);
      setIntroduced(true);
      setTimeout(() => {
        moodLock.current = false;
        showChar("That's my cat Oreo~ 🧡", 3500);
        applyZone("character");
      }, 4600);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  // Sleep timer
  const resetSleep = useCallback(() => {
    clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => {
      setIsSleeping(true); setMood("sleepy");
      showOreo("Zzz... 💤", 99999);
    }, 32000);
  }, [showOreo]);

  useEffect(() => { resetSleep(); return () => clearTimeout(sleepTimer.current); }, [resetSleep]);

  // Periodic idle messages
  useEffect(() => {
    if (!introduced) return;
    const id = setInterval(() => {
      if (!moodLock.current && !isSleeping) {
        const cfg = ZONES[zoneRef.current] || ZONES.default;
        showOreo(cfg.messages[Math.floor(Math.random() * cfg.messages.length)]);
        if (zoneRef.current === "character" && cfg.characterReply && Math.random() > 0.45)
          setTimeout(() => showChar(cfg.characterReply[Math.floor(Math.random() * cfg.characterReply.length)]), 1100);
      }
    }, 11000);
    return () => clearInterval(id);
  }, [introduced, isSleeping, showOreo, showChar]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true); moodLock.current = true; setMood("excited");
    if (isSleeping) { setIsSleeping(false); showOreo("Wah! I was sleeping! 😾", 2000); }
    else { const m=["Wheee~! 🌀","Where are we going?! 😲","Oreo is flying! ✨","Nyaa~! 🐾"]; showOreo(m[Math.floor(Math.random()*m.length)], 2000); }
  }, [isSleeping, showOreo]);

  const handleDragEnd = useCallback((_e, info) => {
    setIsDragging(false);
    const nx = Math.max(10, Math.min(window.innerWidth - 90, posRef.current.x + info.offset.x));
    const ny = Math.max(10, Math.min(window.innerHeight - 95, posRef.current.y + info.offset.y));
    setPos({ x: nx, y: ny });
    setTimeout(() => { moodLock.current = false; applyZone(detectZone(nx, ny)); resetSleep(); }, 80);
  }, [applyZone, resetSleep]);

  const handleClick = useCallback(() => {
    resetSleep();
    if (isSleeping) { setIsSleeping(false); moodLock.current=false; showOreo("Oreo is awake! 😸"); applyZone(zoneRef.current); return; }
    const next = petCount + 1; setPetCount(next); moodLock.current = true;
    if (next % 4 === 0) {
      setMood("wave"); showOreo("Oreo loves you! 🐾💕", 2600);
      if (zoneRef.current === "character") setTimeout(() => showChar("Such a happy kitty 🥰", 2600), 800);
      setTimeout(() => { moodLock.current=false; applyZone(zoneRef.current); }, 2700);
    } else {
      setMood("happy");
      const m=["Purrr~ 🧡","That tickles! 😸","More! More! 🐾","Nyaa~ ✨","Hehe~ 🐱"];
      showOreo(m[Math.floor(Math.random()*m.length)], 2000);
      setTimeout(() => { moodLock.current=false; applyZone(zoneRef.current); }, 2100);
    }
  }, [petCount, isSleeping, showOreo, showChar, applyZone, resetSleep]);

  const bubbleSide = pos.x > window.innerWidth * 0.58 ? "right" : pos.x < 80 ? "left" : "center";

  return (
    <>
      <style>{`.oreo-wrap{touch-action:none;cursor:grab;}.oreo-wrap:active{cursor:grabbing;}`}</style>

      {/* Shahnaz's reply bubble — always near her character, bottom-right */}
      <AnimatePresence>
        {charMsg && (
          <motion.div key={"char-"+charMsg}
            initial={{opacity:0,scale:0.72,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.72,y:10}}
            transition={{duration:0.22,type:"spring",stiffness:320,damping:22}}
            style={{
              position:"fixed", bottom:215, right:"2.8rem",
              background:"white", border:"2.5px solid #f472b6", borderRadius:16,
              padding:"7px 14px", fontSize:12.5, fontFamily:"'Segoe UI',system-ui,sans-serif",
              color:"#9d174d", whiteSpace:"nowrap", fontWeight:600,
              boxShadow:"0 6px 22px rgba(244,114,182,0.35), 0 2px 6px rgba(0,0,0,0.08)",
              pointerEvents:"none", zIndex:10002,
            }}>
            {charMsg}
            <div style={{position:"absolute",bottom:-9,right:22,width:0,height:0,
              borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"9px solid #f472b6"}} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Oreo */}
      <motion.div className="oreo-wrap" drag dragMomentum={false} dragElastic={0.05}
        onDragStart={handleDragStart} onDragEnd={handleDragEnd} onClick={handleClick}
        animate={{ x:pos.x, y:pos.y, scale:isDragging?1.14:1, rotate:isDragging?[-2,2,-2,2,0]:0 }}
        transition={{ x:{duration:isDragging?0:0.28,ease:"easeOut"}, y:{duration:isDragging?0:0.28,ease:"easeOut"}, scale:{duration:0.15}, rotate:{duration:0.4} }}
        whileTap={{scale:0.86}}
        
        style={{position:"fixed",top:0,left:0,zIndex:9999,userSelect:"none",width:80}}>

        
        {/* Oreo's bubble */}
        <AnimatePresence>
          {oreoMsg&&(
            <motion.div key={oreoMsg}
              initial={{opacity:0,scale:0.72,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.72,y:10}}
              transition={{duration:0.22,type:"spring",stiffness:320,damping:22}}
              style={{
                position:"absolute", bottom:94,
                ...(bubbleSide==="right"?{right:0}:bubbleSide==="left"?{left:0}:{left:"50%",transform:"translateX(-50%)"}),
                background:"white", border:"2.5px solid #f9a8d4", borderRadius:16,
                padding:"7px 14px", fontSize:12.5, fontFamily:"'Segoe UI',system-ui,sans-serif",
                color:"#be185d", whiteSpace:"nowrap", fontWeight:600,
                boxShadow:"0 6px 22px rgba(249,168,212,0.45), 0 2px 6px rgba(0,0,0,0.08)",
                pointerEvents:"none",
              }}>
              {oreoMsg}
              <div style={{position:"absolute",bottom:-9,
                left:bubbleSide==="right"?"auto":bubbleSide==="left"?20:"50%",
                right:bubbleSide==="right"?20:"auto",
                transform:bubbleSide==="center"?"translateX(-50%)":"none",
                width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"9px solid #f9a8d4"}} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cat with idle animation based on mood */}
        <motion.div
          animate={mood==="love"?{y:[0,-4,0]}:mood==="amazed"?{scale:[1,1.07,1]}:mood==="read"?{rotate:[-2,0,-2]}:{y:0,scale:1,rotate:0}}
          transition={{duration:1.6,repeat:Infinity,ease:"easeInOut"}}>
          <CatSVG mood={mood} frame={frame} />
        </motion.div>

        {/* Pet hearts */}
        <AnimatePresence>
          {petCount>0&&(
            <motion.div key={`h${petCount}`} initial={{opacity:1,y:0,scale:1}} animate={{opacity:0,y:-46,scale:1.75}} transition={{duration:0.82}}
              style={{position:"absolute",top:-16,right:-10,fontSize:20,pointerEvents:"none"}}>🧡</motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}