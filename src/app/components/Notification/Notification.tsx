import React from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end";

interface NotificationProps {
  title: string;
  description: string;
  type?: "success" | "error" | "warning" | "info" | "loading";
  duration?: number;
  placement?: Placement | undefined;
}

export const Notification: React.FC<NotificationProps> = ({
  title,
  description,
  type = "info",
  duration = 5000,
  placement = "bottom-start",
}) => {
  toaster.create({
    title,
    description,
    type,
    duration,
    placement,
  });
  return <Toaster />;
};
