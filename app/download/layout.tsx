import { HomeLayout } from "fumadocs-ui/layouts/home";
import { type ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download - Task Genius",
  description: "Download Task Genius App.",
};

export default function WaitlistLayout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
