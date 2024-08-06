import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FollowMouse from "@/components/FollowMouse";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check Repo",
  description: "by Zenx5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
        <FollowMouse offsetX={50} offsetY={50} className="w-[100px] h-[100px] z-10 rounded-full fixed bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"/>
        {children}
      </body>
    </html>
  );
}
