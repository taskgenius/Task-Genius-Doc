import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Genius",
  description: "A comprehensive plugin for Task Management in Obsidian.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
