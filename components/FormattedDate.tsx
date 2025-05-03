import { CalendarIcon } from "lucide-react";

interface FormattedDateProps {
  dateString: string | undefined;
}

export function FormattedDate({ dateString }: FormattedDateProps) {
  const formattedDate = dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not specified";

  return <span className="flex items-center gap-1">{formattedDate}</span>;
}
