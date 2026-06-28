import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Booking, BookingStatus } from "../types/booking.types";
import { bookingsMock } from "../data/bookings.mock";

type CreateBokingPayload = {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
};

type BookingsStore = {
  bookings: Booking[];
  currentClientPhone: string | null
  addBooking: (payload: CreateBokingPayload) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  cancelBooking: (bobookingId: string) => void;
  resetBookings: () => void;
};

export const useBookingsStore = create<BookingsStore>()(
  persist(
    (set) => ({
      bookings: bookingsMock,
      currentClientPhone: null,

      addBooking: (payload) =>
        set((state) => ({
          currentClientPhone: payload.clientPhone,
          bookings: [
            {
              id: crypto.randomUUID(),
              ...payload,
              status: "new",
              createdAt: new Date().toISOString(),
            },
            ...state.bookings,
          ],
        })),
      updateBookingStatus: (bookingId, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status } : booking,
          ),
        })),
      cancelBooking: (bookingId) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: "cancelled" }
              : booking,
          ),
        })),

      resetBookings: () =>
        set({
          bookings: bookingsMock,
        }),
    }),
    {
      name: "service-booking-dashboard-bookings",
    },
  ),
);
