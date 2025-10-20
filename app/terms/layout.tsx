import { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export const metadata: Metadata = {
  title: "Terms of Service - Task Genius",
  description: "Terms of Service for Task Genius Plugin and Desktop Application.",
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
