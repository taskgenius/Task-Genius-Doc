import type { ReactNode } from "react";

export default function ChangelogLayout({ children }: { children: ReactNode }) {
  console.log("ChangelogLayout");
  return <div className="container mx-auto px-4 py-8">{children}</div>;
}
