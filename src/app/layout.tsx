import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import Sidebar from "../components/Sidebar";
import { Pacifico } from "next/font/google";

const titleFont = Pacifico({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 text-white min-h-screen flex font-sans ${titleFont.className}`}>
        <SettingsProvider> {/* ✅ Wrap everything inside the provider */}
          <Sidebar /> {/* ✅ Sidebar stays visible on all pages */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {children} {/* ✅ Your app content */}
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}

