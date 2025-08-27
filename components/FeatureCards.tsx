"use client";

import { Card } from "fumadocs-ui/components/card";
import { 
  CheckCircle, 
  Zap, 
  Calendar, 
  Filter, 
  Workflow, 
  Trophy, 
  Layers, 
  Code,
  BarChart3,
  Clock,
  Target,
  Users
} from "lucide-react";
import { ReactElement } from "react";

interface FeatureCard {
  title: string;
  description: string;
  icon: ReactElement;
  highlight?: boolean;
}

const features: FeatureCard[] = [
  {
    title: "10+ Task Views",
    description: "Choose from Inbox, Forecast, Projects, Matrix, Timeline, Kanban and more",
    icon: <Layers className="size-5" />,
    highlight: true,
  },
  {
    title: "Visual Progress",
    description: "Track task completion with dynamic progress bars and status indicators",
    icon: <BarChart3 className="size-5" />,
  },
  {
    title: "Smart Workflows",
    description: "Design multi-stage processes with automatic transitions",
    icon: <Workflow className="size-5" />,
    highlight: true,
  },
  {
    title: "Natural Dates",
    description: "Type 'tomorrow', 'next week' or any natural language date",
    icon: <Calendar className="size-5" />,
  },
  {
    title: "Advanced Filters",
    description: "Create complex queries to find exactly what you need",
    icon: <Filter className="size-5" />,
  },
  {
    title: "Habit Tracking",
    description: "Build streaks, track habits, and earn rewards",
    icon: <Trophy className="size-5" />,
    highlight: true,
  },
  {
    title: "Time Tracking",
    description: "Track time spent on tasks with built-in timer",
    icon: <Clock className="size-5" />,
  },
  {
    title: "AI Integration",
    description: "Connect with Claude, Cursor, and VS Code via MCP",
    icon: <Code className="size-5" />,
  },
  {
    title: "Quick Capture",
    description: "Instantly capture tasks from anywhere in your vault",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Project Management",
    description: "Organize tasks into projects with hierarchical structure",
    icon: <Target className="size-5" />,
  },
  {
    title: "Team Collaboration",
    description: "Share views and collaborate on shared vaults",
    icon: <Users className="size-5" />,
  },
  {
    title: "Status Cycling",
    description: "Custom task statuses with keyboard shortcuts",
    icon: <CheckCircle className="size-5" />,
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature) => (
        <Card
        title={feature.title}
          key={feature.title}
          className={`p-4 hover:border-fd-primary/50 transition-all ${
            feature.highlight ? "border-fd-primary/30 bg-fd-primary/5" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              feature.highlight 
                ? "bg-fd-primary/20 text-fd-primary" 
                : "bg-fd-muted/50 text-fd-muted-foreground"
            }`}>
              {feature.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-fd-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}