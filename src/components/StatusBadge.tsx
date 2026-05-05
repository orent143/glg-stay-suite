import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "info" | "neutral" | "danger";

const toneMap: Record<string, Tone> = {
  Available: "success",
  Paid: "success",
  Approved: "success",
  Active: "success",
  Occupied: "info",
  Pending: "warning",
  Unpaid: "warning",
  "Notice Given": "warning",
  Maintenance: "neutral",
  Past: "neutral",
  Rejected: "danger",
  Overdue: "danger",
};

const styles: Record<Tone, string> = {
  success: "bg-status-success-bg text-status-success",
  warning: "bg-status-warning-bg text-status-warning",
  info: "bg-status-info-bg text-status-info",
  neutral: "bg-status-neutral-bg text-status-neutral",
  danger: "bg-status-danger-bg text-status-danger",
};

interface Props {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: Props) {
  const tone = toneMap[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[tone],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", `bg-status-${tone}`)} />
      {status}
    </span>
  );
}
