import { statusLabels } from "../../features/bookings/constants/bookingStatus";
import type { BookingStatus } from "../../features/bookings/types/booking.types";

type StatusBadgeProps = {
  status: BookingStatus;
};

const statusBadgeClasses: Record<BookingStatus, string> = {
  new: "bg-[#fff7ed] text-brand-orange ring-orange-100",
  confirmed: "bg-[#fffbeb] text-amber-700 ring-amber-100",
  completed: "bg-[#f0fdf4] text-emerald-700 ring-emerald-100",
  cancelled: "bg-[#fff1f2] text-rose-700 ring-rose-100",
};

const statusDotClasses: Record<BookingStatus, string> = {
  new: "bg-brand-orange",
  confirmed: "bg-amber-500",
  completed: "bg-emerald-500",
  cancelled: "bg-rose-400",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ring-1 shadow-sm ${statusBadgeClasses[status]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${statusDotClasses[status]}`}
        aria-hidden="true"
      />
      {statusLabels[status]}
    </span>
  );
}
