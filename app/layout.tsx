import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyeongmin Lee | Developer Portfolio",
  description: "Gyeongmin Lee's developer portfolio, spanning frontend and backend work.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
