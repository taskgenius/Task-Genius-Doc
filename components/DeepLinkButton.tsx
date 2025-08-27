import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "fumadocs-ui/utils/cn";

const deepLinkButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md px-4 py-0 h-10 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring",
  {
    variants: {
      variant: {
        primary:
          "bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90",
        secondary:
          "bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-secondary/80",
        warning:
          "bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface DeepLinkButtonProps
  extends VariantProps<typeof deepLinkButtonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function DeepLinkButton({ 
  href, 
  children, 
  variant, 
  className 
}: DeepLinkButtonProps) {
  return (
    <a href={href} >
      <button
        className={cn(deepLinkButtonVariants({ variant }), className, "hover:cursor-pointer")}
      >
        {children}
      </button>
    </a>
  );
}

interface DeepLinkFallbackProps {
  customText?: string;
}

export function DeepLinkFallback({ customText }: DeepLinkFallbackProps = {}) {
  return (
    <p className="text-sm text-fd-muted-foreground mt-2">
      {customText || "If the link doesn't work: Obsidian → Settings → Community Plugins → Task Genius"}
    </p>
  );
}