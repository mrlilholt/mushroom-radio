"use client";
import { motion } from "framer-motion";
import { Sun, Moon, Volume2, Music } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Settings() {
  const { darkMode, setDarkMode, volume, setVolume } = useSettings();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 px-6">
      {/* ⚙️ Page Title */}
      <h1 className="text-4xl font-bold mb-6 flex items-center space-x-3">
        <Music className="w-8 h-8 text-blue-400" />
        <span>Settings</span>
      </h1>

      {/* 🎨 Theme Toggle */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        whileTap={{ scale: 0.9 }}
        className="flex items-center space-x-3 text-lg font-semibold bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition mb-4"
      >
        {darkMode ? <Moon className="w-6 h-6 text-gray-400" /> : <Sun className="w-6 h-6 text-yellow-400" />}
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </motion.button>

      {/* 🔊 Volume Slider */}
      <div className="flex flex-col items-center w-full max-w-xs mb-6">
        <label className="text-lg font-semibold flex items-center space-x-3">
          <Volume2 className="w-6 h-6 text-green-400" />
          <span>Volume</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>
    </main>
  );
}
