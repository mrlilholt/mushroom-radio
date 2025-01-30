"use client";
import { motion } from "framer-motion";
import { Code, Music, Server, Rocket } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 px-6">
      {/* 🏷️ Page Title */}
      <h1 className="text-4xl font-bold mb-6 flex items-center space-x-3">
        <Music className="w-8 h-8 text-pink-400" />
        <span>Mushroom Radio</span>
      </h1>

      {/* 📝 Description */}
      <p className="text-lg text-gray-300 text-center max-w-xl">
        A **lo-fi music** experience with a sleek retro aesthetic, built with modern web technologies.
      </p>

      {/* ⚙️ Tech Stack Section */}
      <div className="mt-8 space-y-4 text-lg">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-3">
          <Code className="w-6 h-6 text-blue-400" />
          <span>Frontend: **Next.js, React, Tailwind CSS**</span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-3">
          <Rocket className="w-6 h-6 text-green-400" />
          <span>UI Animations: **Framer Motion**</span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-3">
          <Server className="w-6 h-6 text-purple-400" />
          <span>Hosting: **Netlify + Cloudinary for Audio**</span>
        </motion.div>
      </div>
    </main>
  );
}
