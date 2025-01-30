"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // 🎵 Playlist Array (Replace with your Cloudinary links)
  const playlist = [
    { title: "Chill Vibes ☕", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196209/csb5_mkgvbg.mp3" },
    { title: "Lofi Dreams 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196022/csb2_y7qffy.mp3" },
    { title: "Chill Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738202860/Chill_Study_Music_chill_lo-fi_hip_hop_beats_5_pgfz35.mp3" },
    { title: "Lofi Time 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738202770/vbeats_rbqh2w.mp3" },
    { title: "Night Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738195960/beats_nvkrgk.mp3" },
    { title: "Day Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196197/beats2_q2olzm.mp3" },
  ];

  const [currentTrack, setCurrentTrack] = useState(Math.floor(Math.random() * playlist.length)); // Start with random track
  const [isPlaying, setIsPlaying] = useState(false);

  const nextTrack = useCallback(() => {
    const nextIndex = Math.floor(Math.random() * playlist.length);
    setCurrentTrack(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [playlist.length, audioRef]);
  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("ended", nextTrack);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", nextTrack);
      }
    }; // ✅ Added missing closing bracket
  }, [nextTrack]); // ✅ Dependency array
  

  // ▶️ Play / Pause Function
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="flex flex-col items-center space-y-6 bg-gray-900 text-white min-h-screen justify-center">
      <h1 className="text-5xl font-bold mb-4 font-[Pacifico]">
        📻 Mushroom Radio 📻
      </h1>


      {/* 🎵 Track Title */}
      <p className="text-xl bg-white/10 px-6 py-2 rounded-lg backdrop-blur-md shadow-md">
        {playlist[currentTrack].title}
      </p>

      {/* 🎧 Audio Player (Hidden) */}
      <audio ref={audioRef} autoPlay>
        <source src={playlist[currentTrack].url} type="audio/mp3" />
      </audio>

{/* 🔊 Animated Music Bars */}
<div className="flex space-x-2 h-12 mt-4">
  {[...Array(5)].map((_, i) => (
    <motion.div
      key={i}
      className="w-2 bg-green-400 rounded"
      animate={isPlaying ? { height: [10, 30, 10] } : { height: 10 }} // 🔄 Pause effect
      transition={{
        repeat: isPlaying ? Infinity : 0, // 🛑 Stops when paused
        duration: 0.8 + i * 0.2,
        ease: "easeInOut",
      }}
    />
  ))}
</div>



      {/* 🕹️ Controls */}
      <div className="flex space-x-4 mt-4">
        

        {/* ▶️ Play / Pause */}
        <motion.button
  whileHover={{ scale: 1.2 }} // 🔍 Slightly bigger on hover
  whileTap={{ scale: 0.9 }} // 🎯 Shrinks slightly when clicked
  animate={isPlaying ? { scale: [1, 1.1, 1], boxShadow: ["0px 0px 10px #ff00ff", "0px 0px 20px #ff9900", "0px 0px 10px #ff00ff"] } : {}}
  transition={isPlaying ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
  onClick={togglePlay}
  className="neon-button w-16 h-16 flex items-center justify-center"
>
  {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
</motion.button>


      </div>
    </main>
  );
}
