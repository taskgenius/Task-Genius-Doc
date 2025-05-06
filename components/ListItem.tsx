import { cn } from "fumadocs-ui/utils/cn";

interface ListItemConfig {
  taskId: string;
  content: string;
  dueDate: {
    date: string;
    display: string;
    isTomorrow: boolean;
  };
  scheduledDate: {
    date: string;
    display: string;
  };
  startDate: {
    date: string;
    display: string;
  };
  priority: number;
}

export const ListItem = ({
  taskId = "Quick Capture.md-L12",
  content = "测试",
  dueDate = { date: "2025-05-06", display: "2025-05-06", isTomorrow: true },
  scheduledDate = { date: "2025-04-22", display: "2025-04-22" },
  startDate = { date: "2025-04-09", display: "2025-04-09" },
  priority = 5,
}: Partial<ListItemConfig> = {}) => {
  return (
    <div
      className="not-prose relative flex flex-col p-2 px-4 transition-colors duration-200 tree-task-item hover:bg-fd-secondary dark:hover:bg-fd-secondary rounded-md border border-fd-border"
      data-task-id={taskId}
    >
      <div className="flex w-full items-start gap-1.5">
        <div className="flex-shrink-0 flex items-center justify-center w-4 h-4 cursor-pointer text-gray-400 hover:text-blue-500 pt-[var(--size-2-2)]">
          <input
            disabled
            className="task-list-item-checkbox"
            type="checkbox"
            data-task=" "
          />
        </div>
        <div className="flex-grow">
          <div className="leading-[1.4] -mt-1">
            <div
              className="markdown-block markdown-renderer"
              data-block-id="block-1746442888842-0"
            >
              <p dir="auto" className="my-0">
                {content}
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-2 text-sm text-fd-muted-foreground">
            <div
              className={cn(
                "bg-fd-accent px-2 py-0.5 rounded-md text-sm task-date task-due-date",
                dueDate.isTomorrow ? "text-fd-accent-foreground" : ""
              )}
              aria-label={dueDate.date}
              title={dueDate.date}
            >
              {dueDate.display}
            </div>
            <div
              className={cn(
                "bg-fd-muted px-2 py-0.5 rounded-md text-sm task-date task-scheduled-date",
                scheduledDate.date ? "text-fd-muted-foreground" : ""
              )}
              aria-label={scheduledDate.date}
              title={scheduledDate.date}
            >
              {scheduledDate.display}
            </div>
            <div
              className={cn(
                "bg-fd-muted px-2 py-0.5 rounded-md text-sm task-date task-start-date",
                startDate.date ? "text-fd-muted-foreground" : ""
              )}
              aria-label={startDate.date}
              title={startDate.date}
            >
              {startDate.display}
            </div>
          </div>
        </div>
        <div
          className={`${
            priority > 3
              ? "text-red-500"
              : priority === 2
              ? "text-yellow-500"
              : priority === 1
              ? "text-blue-500"
              : ""
          }`}
        >
          {"!".repeat(priority)}
        </div>
      </div>
    </div>
  );
};
