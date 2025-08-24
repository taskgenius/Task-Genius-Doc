import React from "react";
import { cn } from "fumadocs-ui/utils/cn";

interface TimeParsingExampleProps {
  variant?: "default" | "range" | "inheritance" | "combined";
  children: React.ReactNode;
  className?: string;
}

const variantConfig = {
  default: {
    label: "📅 Time Format Example",
    gradient: "from-purple-500 to-purple-700",
    borderColor: "border-purple-300 dark:border-purple-700",
    shadowColor: "shadow-purple-500/10 hover:shadow-purple-500/20",
  },
  range: {
    label: "⏱️ Time Range Example",
    gradient: "from-pink-500 to-red-500",
    borderColor: "border-pink-300 dark:border-pink-700",
    shadowColor: "shadow-pink-500/10 hover:shadow-pink-500/20",
  },
  inheritance: {
    label: "🔗 Date Inheritance Example",
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-300 dark:border-blue-700",
    shadowColor: "shadow-blue-500/10 hover:shadow-blue-500/20",
  },
  combined: {
    label: "🎯 Combined Format Example",
    gradient: "from-green-500 to-teal-500",
    borderColor: "border-green-300 dark:border-green-700",
    shadowColor: "shadow-green-500/10 hover:shadow-green-500/20",
  },
};

export function TimeParsingExample({
  variant = "default",
  children,
  className,
}: TimeParsingExampleProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        "relative my-4 overflow-hidden rounded-lg border bg-gray-50 dark:bg-gray-900/50",
        "transition-all duration-300 hover:-translate-y-0.5",
        "shadow-md hover:shadow-lg",
        config.borderColor,
        config.shadowColor,
        className
      )}
    >
      {/* Header with gradient background */}
      <div
        className={cn(
          "flex items-center px-4 py-2",
          "bg-gradient-to-r text-white",
          "border-b border-white/20",
          config.gradient
        )}
      >
        <span className="text-sm font-semibold">{config.label}</span>
      </div>

      {/* Content area */}
      <div className="relative">
        {/* Animated shimmer effect on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 hover:opacity-100"
          aria-hidden="true"
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Code content */}
        <div className="p-4">
          <div className="[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export a wrapper component for markdown code blocks
export function TimeParsingExampleWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Parse the className to determine the variant
  const getVariant = (): TimeParsingExampleProps["variant"] => {
    if (!className) return "default";
    if (className.includes("time-range-examples")) return "range";
    if (className.includes("time-inheritance-examples")) return "inheritance";
    if (className.includes("time-combined-examples")) return "combined";
    return "default";
  };

  return (
    <TimeParsingExample variant={getVariant()} className={className}>
      {children}
    </TimeParsingExample>
  );
}