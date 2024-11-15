import { DateTime } from "luxon";
export function formatRelativeDate(dateString: string): string {
  const dt = DateTime.fromISO(dateString);
  const relative = dt.toRelativeCalendar();
  const parts = (relative && relative.split(" ")) as string[];

  const firstPart = parts?.[0] ?? "";

  if (firstPart) {
    if (parts && parts[0] === "1") {
      parts[1] = parts[1].replace("s", "");
    }
    parts[1] = parts[1].charAt(0) + parts[1].slice(1);
    return `${parts.join(" ")}`;
  }
  return "data inválida!";
}
