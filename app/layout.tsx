import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { metadataBase } from "@/lib/metadata";
import AnimationToggle from "@/components/AnimationToggle";
import "./globals.css";
import "./ui-system.css";
import "./cli-sections.css";

const title = `${profile.name} | 개발자 포트폴리오`;
const description = `프론트엔드와 백엔드 경험을 소개하는 ${profile.name}의 개발자 포트폴리오`;

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: title,
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
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
    <html lang="ko">
      <body><AnimationToggle />{children}</body>
    </html>
  );
}
