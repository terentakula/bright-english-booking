import { useMemo } from "react";
import { useBookingsStore } from "../../bookings/model/bookings.store";
import { StatusBadge } from "../../../shared/ui/StatusBadge";
import type { BookingStatus } from "../../bookings/types/booking.types";

type ClientSummary = {
  key: string;
  name: string;
  phone: string;
  email?: string;
  bookingsCount: number;
  lastServiceTitle: string;
  lastBookingDate: string;
  lastBookingTime: string;
  lastStatus: BookingStatus;
};

function getBookingTimestamp(date: string, time: string) {
  return new Date(`${date}T${time}`).getTime();
}

const clientStatusStyles: Record<
  BookingStatus,
  {
    card: string;
    row: string;
    metric: string;
  }
> = {
  new: {
    card: "border-l-4 border-l-brand-orange bg-[#fff7ed]",
    row: "bg-[#fff7ed]/70 hover:bg-[#ffedd5]",
    metric: "bg-white ring-orange-100",
  },
  confirmed: {
    card: "border-l-4 border-l-amber-400 bg-[#fffbeb]",
    row: "bg-[#fffbeb]/70 hover:bg-[#fef3c7]",
    metric: "bg-white ring-amber-100",
  },
  completed: {
    card: "border-l-4 border-l-emerald-500 bg-[#f0fdf4]",
    row: "bg-[#f0fdf4]/70 hover:bg-[#dcfce7]",
    metric: "bg-white ring-emerald-100",
  },
  cancelled: {
    card: "border-l-4 border-l-rose-300 bg-[#fff1f2]",
    row: "bg-[#fff1f2]/70 hover:bg-[#ffe4e6]",
    metric: "bg-white ring-rose-100",
  },
};

export function ClientsSummary() {
  const bookings = useBookingsStore((state) => state.bookings);

  const clients = useMemo(() => {
    const clientsMap = new Map<string, ClientSummary>();

    bookings.forEach((booking) => {
      const existingClient = clientsMap.get(booking.clientPhone);

      if (!existingClient) {
        clientsMap.set(booking.clientPhone, {
          key: booking.clientPhone,
          name: booking.clientName,
          phone: booking.clientPhone,
          email: booking.clientEmail,
          bookingsCount: 1,
          lastServiceTitle: booking.serviceTitle,
          lastBookingDate: booking.date,
          lastBookingTime: booking.time,
          lastStatus: booking.status,
        });

        return;
      }

      const existingTimestamp = getBookingTimestamp(
        existingClient.lastBookingDate,
        existingClient.lastBookingTime,
      );

      const currentTimestamp = getBookingTimestamp(booking.date, booking.time);

      clientsMap.set(booking.clientPhone, {
        ...existingClient,
        name: booking.clientName,
        email: booking.clientEmail ?? existingClient.email,
        bookingsCount: existingClient.bookingsCount + 1,
        lastServiceTitle:
          currentTimestamp >= existingTimestamp
            ? booking.serviceTitle
            : existingClient.lastServiceTitle,
        lastBookingDate:
          currentTimestamp >= existingTimestamp
            ? booking.date
            : existingClient.lastBookingDate,
        lastBookingTime:
          currentTimestamp >= existingTimestamp
            ? booking.time
            : existingClient.lastBookingTime,
        lastStatus:
          currentTimestamp >= existingTimestamp
            ? booking.status
            : existingClient.lastStatus,
      });
    });

    return Array.from(clientsMap.values()).sort(
      (a, b) =>
        getBookingTimestamp(b.lastBookingDate, b.lastBookingTime) -
        getBookingTimestamp(a.lastBookingDate, a.lastBookingTime),
    );
  }, [bookings]);

  return (
    <section className="mb-8 rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6">
      <div className="mb-6">
        <p className="mb-4 inline-flex rounded-full bg-brand-cream px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
          Студенты
        </p>

        <h1 className="mb-2 text-2xl font-bold">Ученики и заявки</h1>

        <p className="max-w-2xl leading-7 text-brand-brown/80">
          Список учеников собирается автоматически из заявок. Если один ученик
          записывается несколько раз с тем же телефоном, система объединяет его
          записи в одну карточку.
        </p>
      </div>

      <div className="grid gap-4 md:hidden">
        {clients.map((client) => (
          <article
            key={client.key}
            className={`rounded-4xl p-4 shadow-sm ring-1 ring-brand-brown/10 transition hover:-translate-y-0.5 hover:shadow-brand ${clientStatusStyles[client.lastStatus].card}`}
          >
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="mb-1 font-bold">{client.name}</h3>
                <p className="text-sm text-brand-brown/70">{client.phone}</p>
                {client.email && (
                  <p className="mt-1 text-sm text-brand-brown/70">
                    {client.email}
                  </p>
                )}
              </div>

              <StatusBadge status={client.lastStatus} />
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div
                className={`rounded-2xl bg-white p-4 ring-1 ${clientStatusStyles[client.lastStatus].metric}`}
              >
                <p className="mb-1 text-brand-brown/70">Количество записей</p>
                <p className="font-semibold text-brand-brown">
                  {client.bookingsCount}
                </p>
              </div>
              <div
                className={`rounded-2xl bg-white p-4 ring-1 ${clientStatusStyles[client.lastStatus].metric}`}
              >
                <p className="mb-1 text-brand-brown/70">Последний курс</p>
                <p className="font-semibold text-brand-brown">
                  {client.lastServiceTitle}
                </p>
              </div>
              <div
                className={`rounded-2xl bg-white p-4 ring-1 ${clientStatusStyles[client.lastStatus].metric}`}
              >
                <p className="mb-1 text-brand-brown/70">Дата</p>
                <p className="font-semibold text-brand-brown">
                  {client.lastBookingDate}
                </p>
              </div>
              <div
                className={`rounded-2xl bg-white p-4 ring-1 ${clientStatusStyles[client.lastStatus].metric}`}
              >
                <p className="mb-1 text-brand-brown/70">Время</p>
                <p className="font-semibold text-brand-brown">
                  {client.lastBookingTime}
                </p>
              </div>
            </div>
          </article>
        ))}

        {clients.length === 0 && (
          <div className="rounded-4xl text-center text-brand-brown/70 bg-brand-page p-5 ring-1 ring-orange-100">
            Ученики появятся после создания заявок.
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-3xl  ring-1 ring-brand-brown/20 md:block">
        <table className="w-full min-w-225 border-separate border-spacing-0 overflow-hidden rounded-2xl text-left text-sm">
          <thead className="bg-brand-brown text-white">
            <tr>
              <th className="rounded-tl-2xl px-5 py-4">Ученик</th>
              <th className="px-5 py-4">Телефон</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Записей</th>
              <th className="px-5 py-4">Последний курс</th>
              <th className="px-5 py-4">Дата</th>
              <th className="rounded-tr-2xl px-5 py-4">Статус</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr
                key={client.key}
                className={`transition ${clientStatusStyles[client.lastStatus].row}`}
              >
                <td className="border-t border-white/70 px-5 py-4 font-medium">{client.name}</td>
                <td className="border-t border-white/70 px-5 py-4">{client.phone}</td>
                <td className="border-t border-white/70 px-5 py-4">{client.email ?? "-"}</td>
                <td className="border-t border-white/70 px-5 py-4">{client.bookingsCount}</td>
                <td className="border-t border-white/70 px-5 py-4">{client.lastServiceTitle}</td>
                <td className="border-t border-white/70 px-5 py-4">{client.lastBookingDate}</td>
                <td className="border-t border-white/70 px-5 py-4">
                  <StatusBadge status={client.lastStatus} />
                </td>
              </tr>
            ))}

            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-brand-brown/70"
                >
                  Клиентов пока нет. Они появятся после создания заявок.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
