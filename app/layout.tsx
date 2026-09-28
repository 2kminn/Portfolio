import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이경민 | Developer Portfolio",
  description: "프론트엔드와 백엔드 경험을 함께 소개하는 이경민의 개발자 포트폴리오",
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
      <body>{children}</body>
    </html>
  );
}
