"use client";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 🏠 Menu Button (Hamburger Icon) */}
      <button
        onClick={toggleDrawer}
        className="absolute top-4 left-4 p-3 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* 📜 Sidebar Drawer */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bg-gray-900 text-white w-64 p-6"
      >
        {/* ❌ Close Button */}
        <button onClick={toggleDrawer} className="absolute top-4 right-4">
          <X className="w-6 h-6" />
        </button>

        {/* 🌟 Menu Content */}
        <nav className="mt-10 flex flex-col space-y-4">
          <a href="#" className="text-lg hover:text-green-400 transition">
            📜 About
          </a>
          <a href="#" className="text-lg hover:text-green-400 transition">
            ⚙️ Settings
          </a>
        </nav>
      </Drawer>
    </>
  );
}
