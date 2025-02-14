"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

// 🎵 Playlist Arrays for each Radio
const chillPlaylist = [
  { title: "cassette Vibes ☕", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738346564/Cassetteski_zowc8m.mp3" },
  { title: "study Dreams 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738345514/studyski_vqivrj.mp3" },
  { title: "focus Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738345300/focuski_eqbdst.mp3" },
  { title: "chill Time 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738337991/chillski_mhtmln.mp3" },
  { title: "Chill Vibes ☕", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196209/csb5_mkgvbg.mp3" },
  { title: "Lofi Dreams 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196022/csb2_y7qffy.mp3" },
  { title: "Chill Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738202860/Chill_Study_Music_chill_lo-fi_hip_hop_beats_5_pgfz35.mp3" },
  { title: "Lofi Time 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738202770/vbeats_rbqh2w.mp3" },
  { title: "Night Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738195960/beats_nvkrgk.mp3" },
  { title: "Day Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196197/beats2_q2olzm.mp3" },
  { title: "Game Beats 🎮", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738268132/gamers_wf07pg.mp3" },
];

const boomBapPlaylist = [
  { title: "Boom Bap Classic 1", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738203000/boombap1.mp3" },
  { title: "Boom Bap Classic 2", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738203001/boombap2.mp3" },
  { title: "Boom Bap Classic 3", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738203002/boombap3.mp3" },
  // ...add more boom bap tracks as needed
];

// 🍄 Fake "Now Playing" Track Titles (shared between radios)
const fakeTracks = [
  { song: "Spore Lo-Fi", artist: "Psilocybe Beats" },
  { song: "Enoki Dreams", artist: "Flammulina Grooves" },
  { song: "Mycelium Vibes", artist: "Hyphae Collective" },
  { song: "Shroomwave", artist: "Agaricus Flow" },
  { song: "Forest Floor Funk", artist: "Boletus Sound System" },
  { song: "Bioluminescent Beats", artist: "Panellus Strobe" },
  { song: "Truffle Shuffle", artist: "Tuber Dub" },
  { song: "Mystic Spores", artist: "Psathyrella Beats" },
  { song: "Electric Hyphae", artist: "Amanita Flow" },
  { song: "Golden Fruiting Bodies", artist: "Lentinula Sound System" },
  { song: "Hidden Gills", artist: "Cortinarius Groove" },
  { song: "Ethereal Clusters", artist: "Morchella Bass" },
  // ...remaining fake tracks
];

export default function Home() {
  // Choose which radio is active
  const [selectedRadio, setSelectedRadio] = useState<"chill" | "boombap">("chill");
  // Current playlist is selected by radio mode.
  const currentPlaylist = selectedRadio === "chill" ? chillPlaylist : boomBapPlaylist;

  // Use one index for the current track across both the real playlist and fake tracks display.
  const [nowPlayingIndex, setNowPlayingIndex] = useState(Math.floor(Math.random() * fakeTracks.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  // 🌿 Ambient Sounds
  const [rainSound, setRainSound] = useState(false);
  const [windSound, setWindSound] = useState(false);
  const [forestSound, setForestSound] = useState(false);

  // When the radio mode switches, reset the track index.
  useEffect(() => {
    setNowPlayingIndex(0);
  }, [selectedRadio]);

  // Fake "Now Playing" updater (every 210 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setNowPlayingIndex((prevIndex) => (prevIndex + 1) % fakeTracks.length);
    }, 210000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      const newIsPlaying = !isPlaying;
      setIsPlaying(newIsPlaying);
      if (newIsPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      if (logoRef.current) {
        logoRef.current.classList.toggle("is-playing", newIsPlaying);
      }
    }
  }, [isPlaying]);

  const skipTrack = () => {
    const randomIndex = Math.floor(Math.random() * currentPlaylist.length);
    setNowPlayingIndex(randomIndex);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const replayTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const playAmbient = (id: string, condition: boolean) => {
      const audioElement = document.getElementById(id) as HTMLAudioElement;
      if (audioElement) {
        if (condition) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    };

    playAmbient("rain-audio", rainSound);
    playAmbient("wind-audio", windSound);
    playAmbient("forest-audio", forestSound);
  }, [rainSound, windSound, forestSound]);

  return (
    <main className="flex flex-col items-center space-y-6 bg-transparent text-white min-h-screen justify-center relative w-full">
      <Sidebar />

      {/* 🎥 Background Video */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/mushroom_bg.mp4" type="video/mp4" />
      </video>

      {/* 🏷️ Title with Frosted Glass */}
      <div className="frosted-glass text-center">
        <div className="logo-container">
          <Image
            src="/mushroomRadioLogo.png"
            alt="Mushroom Radio Logo"
            className="logo-image"
            ref={logoRef}
            width={200}
            height={200}
            priority
          />
        </div>
      </div>

      {/* 📻 Radio Toggle */}
      <div className="frosted-glass flex space-x-4 p-2 rounded">
        <button
          onClick={() => setSelectedRadio("chill")}
          className={`px-4 py-2 rounded ${selectedRadio === "chill" ? "bg-green-500" : "bg-gray-700"}`}
        >
          Chill Radio
        </button>
        <button
          onClick={() => setSelectedRadio("boombap")}
          className={`px-4 py-2 rounded ${selectedRadio === "boombap" ? "bg-green-500" : "bg-gray-700"}`}
        >
          Boom Bap Radio
        </button>
      </div>

      {/* 🎵 Now Playing Section */}
      <div className="frosted-glass text-center p-4 rounded">
        <p className="title-font text-2xl font-semibold text-blue-300">Now Playing:</p>
        <div className="relative w-64 h-10 bg-white/10 px-6 py-2 rounded-lg shadow-md overflow-hidden">
          <motion.div
            className="absolute left-0 w-max whitespace-nowrap"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            {fakeTracks[nowPlayingIndex].song} - {fakeTracks[nowPlayingIndex].artist}
          </motion.div>
        </div>
      </div>

      {/* 🎧 Audio Player */}
      <audio
        ref={audioRef}
        autoPlay
        onEnded={() => {
          setNowPlayingIndex((prevIndex) => (prevIndex + 1) % currentPlaylist.length);
          if (audioRef.current) {
            audioRef.current.play();
          }
        }}
      >
        <source src={currentPlaylist[nowPlayingIndex % currentPlaylist.length].url} type="audio/mp3" />
      </audio>

      {/* Controls: Play/Pause, Replay and Skip */}
      <div className="flex flex-col items-center space-y-4">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={
            isPlaying
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: ["0px 0px 10px #ff00ff", "0px 0px 20px #ff9900", "0px 0px 10px #ff00ff"],
                }
              : {}
          }
          transition={isPlaying ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
          onClick={togglePlay}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 shadow-lg border-2 border-white"
        >
          {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
        </motion.button>

        {/* Replay and Skip Controls */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={replayTrack}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 shadow-lg border-2 border-white"
          >
            <RotateCw className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipTrack}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 shadow-lg border-2 border-white"
          >
            <SkipForward className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* 🌿 Ambient Sound Toggles */}
      <div className="frosted-glass flex space-x-4 mt-4 p-2 rounded">
        {[
          { label: "Rain", state: rainSound, setState: setRainSound, id: "rain-audio" },
          { label: "Wind", state: windSound, setState: setWindSound, id: "wind-audio" },
          { label: "Forest", state: forestSound, setState: setForestSound, id: "forest-audio" },
        ].map(({ label, state, setState }, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={state}
                onChange={() => setState(!state)}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 peer-checked:bg-green-400 transition duration-300"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))}
      </div>

      {/* 🌿 Ambient Audio Elements */}
      <audio id="rain-audio" loop>
        <source src="https://res.cloudinary.com/dkewu76nu/video/upload/v1738371461/rain_epwjpq.mp3" type="audio/mp3" />
      </audio>
      <audio id="wind-audio" loop>
        <source src="https://res.cloudinary.com/dkewu76nu/video/upload/v1738371452/wind_otfrvy.mp3" type="audio/mp3" />
      </audio>
      <audio id="forest-audio" loop>
        <source src="https://res.cloudinary.com/dkewu76nu/video/upload/v1738371462/forest_tb0i4y.mp3" type="audio/mp3" />
      </audio>
    </main>
  );
}
