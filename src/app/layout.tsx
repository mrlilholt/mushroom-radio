import "./globals.css";
import Sidebar from "../components/Sidebar"; // ✅ Import Sidebar
import { Pacifico } from "next/font/google";

const titleFont = Pacifico({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 text-white min-h-screen flex font-sans ${titleFont.className}`}>
        <Sidebar /> {/* ✅ Sidebar is now available on all pages */}
        <div className="flex-1 flex flex-col items-center justify-center">{children}</div>
      </body>
    </html>
  );
}
