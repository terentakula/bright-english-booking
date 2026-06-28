import type { BookingStatus } from "../types/booking.types";

export const statusLabels: Record<BookingStatus, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  completed: "Завершена",
  cancelled: "Отменена",
};

export const statusClasses: Record<BookingStatus, string> = {
  new: "bg-orange-50 text-brand-orange",
  confirmed: "bg-green-50 text-green-700",
  completed: "bg-brand-cream text-brand-brown",
  cancelled: "bg-red-50 text-red-700",
};

export const statusOptions: BookingStatus[] = [
  "new",
  "confirmed",
  "completed",
  "cancelled",
];
