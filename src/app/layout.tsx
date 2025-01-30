import "./globals.css";
import { Pacifico } from "next/font/google";

const titleFont = Pacifico({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans ${titleFont.className}`}>
        {children}
      </body>
    </html>
  );
}
