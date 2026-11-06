import type { LucideIcon } from "lucide-react";

const sizes = { sm: 16, md: 20, lg: 24 } as const;

export default function UiIcon({ icon: Icon, size = "md", className = "" }: {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return <Icon aria-hidden="true" size={sizes[size]} strokeWidth={1.75} className={`ui-icon ${className}`} />;
}
