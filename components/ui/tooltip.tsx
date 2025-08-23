import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { cn } from "fumadocs-ui/utils/cn";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Tooltip = Popover;

const TooltipTrigger = PopoverTrigger;

const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverContent>) => (
  <PopoverContent
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
