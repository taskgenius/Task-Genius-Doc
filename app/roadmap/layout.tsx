import { HomeLayout } from "fumadocs-ui/layouts/home";
import { type ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog - Task Genius",
  description: "Changelog for Task Genius.",
};

export default function ChangelogLayout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
