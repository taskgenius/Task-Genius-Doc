import { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export const metadata: Metadata = {
  title: "Privacy Policy - Task Genius",
  description: "Privacy Policy for Task Genius Plugin and Desktop Application.",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
