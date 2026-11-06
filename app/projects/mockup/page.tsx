import type { Metadata } from "next";
import ProjectDetailMockup from "@/components/ProjectDetailMockup";

export const metadata: Metadata = {
  title: "모아 | 프로젝트 상세 목업",
  description: "공책 테마로 구성한 프로젝트 상세 페이지 목업입니다.",
  robots: { index: false, follow: false },
};

export default function ProjectMockupPage() {
  return <ProjectDetailMockup />;
}
