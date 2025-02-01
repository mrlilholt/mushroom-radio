"use client"; // ✅ Add this at the top

import React, { createContext, useContext, useState, ReactNode } from "react";

// 🔧 Context Type
interface SettingsContextType {
  rainSound: boolean;
  setRainSound: (value: boolean) => void;
  windSound: boolean;
  setWindSound: (value: boolean) => void;
  forestSound: boolean;
  setForestSound: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
}

// 🎛️ Default Values
const defaultSettings: SettingsContextType = {
  rainSound: false,
  setRainSound: () => {},
  windSound: false,
  setWindSound: () => {},
  forestSound: false,
  setForestSound: () => {},
  darkMode: true,
  setDarkMode: () => {},
  volume: 50,
  setVolume: () => {},
};

// 🌍 Create Context
const SettingsContext = createContext<SettingsContextType>(defaultSettings);

// ⚙️ Settings Provider
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [rainSound, setRainSound] = useState(false);
  const [windSound, setWindSound] = useState(false);
  const [forestSound, setForestSound] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(50);

  return (
    <SettingsContext.Provider
      value={{ rainSound, setRainSound, windSound, setWindSound, forestSound, setForestSound, darkMode, setDarkMode, volume, setVolume }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// ✅ Hook for Using Settings
export const useSettings = () => useContext(SettingsContext);
