import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "fumadocs-ui/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-fd-primary text-fd-primary-foreground shadow hover:bg-fd-primary/80",
        secondary:
          "border-transparent bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-secondary/80",
        destructive:
          "border-transparent bg-fd-destructive text-fd-destructive-foreground shadow hover:bg-fd-destructive/80",
        outline: "text-fd-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
