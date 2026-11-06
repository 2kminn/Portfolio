import { ArrowUpRight } from "lucide-react";
import UiIcon from "@/components/UiIcon";
import { profile } from "@/data/profile";

export default function ContactButton() {
  return (
    <a href={`mailto:${profile.email}`} className="ui-button ui-button-primary">
      이메일 보내기 <UiIcon icon={ArrowUpRight} size="sm" />
    </a>
  );
}
