import { useMemo, useState } from "react";
import { useBookingsStore } from "../features/bookings/model/bookings.store";
import type { BookingStatus } from "../features/bookings/types/booking.types";
import { Container } from "../shared/ui/Container";
import { formatPrice } from "../shared/utils/format";
import { Button } from "../shared/ui/Button";
import { StatCard } from "../shared/ui/StatCard";
import { Input } from "../shared/ui/Input";
import { Select } from "../shared/ui/Select";
import { StatusBadge } from "../shared/ui/StatusBadge";
import {
  statusLabels,
  statusOptions,
} from "../features/bookings/constants/bookingStatus";
import { ServiceManager } from "../features/services/components/ServicesManager";
import { ClientsSummary } from "../features/clients/components/ClientsSummary";
import { useServicesStore } from "../features/services/model/services.store";

type StatusFilter = "all" | BookingStatus;
type SortType = "newest" | "oldest" | "dateAsc" | "dateDesc";

const statusFilterOption: { label: string; value: StatusFilter }[] = [
  { label: "Все", value: "all" },
  { label: "Новые", value: "new" },
  { label: "Подтверждённые", value: "confirmed" },
  { label: "Завершённые", value: "completed" },
  { label: "Отменённые", value: "cancelled" },
];

const bookingRowStyles: Record<BookingStatus, string> = {
  new: "bg-[#fff7ed]/70 hover:bg-[#ffedd5]",
  confirmed: "bg-[#fffbeb]/70 hover:bg-[#fef3c7]",
  completed: "bg-[#f0fdf4]/70 hover:bg-[#dcfce7]",
  cancelled: "bg-[#fff1f2]/70 hover:bg-[#ffe4e6]",
};

export function AdminDashboardPage() {
  const bookings = useBookingsStore((state) => state.bookings);
  const services = useServicesStore((state) => state.services);
  const updateBookingStatus = useBookingsStore(
    (state) => state.updateBookingStatus,
  );

  const resetBookings = useBookingsStore((state) => state.resetBookings);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortType, setSortType] = useState<SortType>("newest");

  const filteredBookings = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return [...bookings]
      .filter((booking) => {
        const matchesStatus =
          statusFilter === "all" || booking.status === statusFilter;

        const matchesSearch =
          !normalizedSearch ||
          booking.clientName.toLowerCase().includes(normalizedSearch) ||
          booking.clientPhone.toLowerCase().includes(normalizedSearch) ||
          booking.serviceTitle.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortType === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        if (sortType === "oldest") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }

        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();

        if (sortType === "dateAsc") {
          return dateA - dateB;
        }

        return dateB - dateA;
      });
  }, [bookings, searchQuery, statusFilter, sortType]);

  const statusCounters = useMemo(() => {
    const counters: Record<BookingStatus, number> = {
      new: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    bookings.forEach((booking) => {
      counters[booking.status] += 1;
    });

    return counters;
  }, [bookings]);

  const servicePriceById = useMemo(
    () => new Map(services.map((service) => [service.id, service.price])),
    [services],
  );

  const clientsCount = new Set(bookings.map((booking) => booking.clientPhone))
    .size;

  const estimatedRevenue = bookings.reduce((sum, booking) => {
    if (booking.status !== "completed") {
      return sum;
    }

    return sum + (servicePriceById.get(booking.serviceId) ?? 2500);
  }, 0);

  return (
    <main className="py-8 sm:py-10">
      <Container>
        <section className="mb-8 rounded-4xl bg-brand-cream p-5 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:p-10">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_320px] lg:p-10">
            <div>
              <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                Админ-панель
              </p>

              <h1 className="mb-3 text-4xl font-bold leading-tight text-brand-brown sm:text-5xl">
                Панель управления Bright English
              </h1>

              <p className="max-w-lg text-lg leading-8 text-brand-brown/75">
                Управляйте заявками на уроки, статусами записей, курсами и
                клиентской базой Bright English.
              </p>
            </div>

            <div className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 lg:self-start">
              <p className="mb-2 text-sm font-semibold text-brand-brown/60">
                Нужно обработать
              </p>
              <p className="mb-4 text-5xl font-bold">{statusCounters.new}</p>
              <p className="mb-5 text-sm leading-6 text-brand-brown/70">
                Новые заявки лучше подтверждать сразу, чтобы ученик видел
                актуальный статус в личном кабинете.
              </p>
              <Button type="button" variant="secondary" onClick={resetBookings}>
                Сбросить данные
              </Button>
            </div>
          </div>
        </section>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Новые заявки" value={statusCounters.new} />
          <StatCard label="Подтверждены" value={statusCounters.confirmed} />
          <StatCard label="Ученики" value={clientsCount} />
          <StatCard label="Выручка" value={formatPrice(estimatedRevenue)} />
        </div>

        <section className="mb-8 rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
          <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_220px_220px]">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-brown">
                Поиск
              </span>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Имя, телефон или услуга"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-brown">
                Статус
              </span>
              <Select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as StatusFilter)
                }
              >
                {statusFilterOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-brown">
                Сортировка
              </span>
              <Select
                value={sortType}
                onChange={(e) => setSortType(e.target.value as SortType)}
              >
                <option value="newest">Сначала новые заявки</option>
                <option value="oldest">Сначала старые заявки</option>
                <option value="dateAsc">Ближайшие записи</option>
                <option value="dateDesc">Дальние записи</option>
              </Select>
            </label>
          </div>

          <p className="text-sm text-brand-brown/60">
            Найдено заявок:{" "}
            <span className="font-semibold text-brand-brown">
              {filteredBookings.length}
            </span>
          </p>
        </section>

        <div className="mb-8 grid gap-4 md:hidden">
          {filteredBookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="mb-1 font-bold">{booking.clientName}</h2>
                  <p className="text-sm text-brand-brown/60">
                    {booking.clientPhone}
                  </p>
                </div>

                <StatusBadge status={booking.status} />
              </div>

              <div className="grid gap-3 text-sm">
                <div>
                  <p className="mb-1 text-brand-brown/60">Услуга</p>
                  <p className="font-semibold text-brand-brown">
                    {booking.serviceTitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1 text-brand-brown/60">Дата</p>
                    <p className="font-semibold text-brand-brown">
                      {booking.date}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-brand-brown/60">Время</p>
                    <p className="font-semibold text-brand-brown">
                      {booking.time}
                    </p>
                  </div>
                </div>

                <label className="grid gap-2">
                  <span className="text-brand-brown/60">Изменить статус</span>
                  <Select
                    value={booking.status}
                    onChange={(e) =>
                      updateBookingStatus(
                        booking.id,
                        e.target.value as BookingStatus,
                      )
                    }
                    className="rounded-xl px-3 py-2 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </Select>
                </label>
              </div>
            </article>
          ))}

          {filteredBookings.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center text-brand-brown/60 shadow-sm ring-1 ring-orange-100">
              Заявки не найдены. Попробуйте изменить поиск или фильтр.
            </div>
          )}
        </div>

        <div className="mb-8 hidden overflow-hidden rounded-4xl bg-[#f4e8dc] shadow-sm ring-1 ring-brand-brown/20 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-separate border-spacing-0 rounded-2xl text-left text-sm">
              <thead className="bg-brand-brown text-xs uppercase tracking-[0.14em] text-white text-center">
                <tr>
                  <th className="px-5 py-4">Клиент</th>
                  <th className="px-5 py-4">Телефон</th>
                  <th className="px-5 py-4">Курс</th>
                  <th className="px-5 py-4">Дата и время</th>
                  <th className="px-5 py-4">Статус</th>
                  <th className="px-5 py-4">Действие</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className={`transition ${bookingRowStyles[booking.status]}`}
                  >
                    <td className="border-t border-white/70 px-5 py-4 align-top">
                      <p className="mb-1 font-bold text-brand-brown">
                        {booking.clientName}
                      </p>
                      <p className="text-xs text-brand-brown/55">
                        Новая заявка
                      </p>
                    </td>

                    <td className="border-t border-white/70 px-5 py-4 align-top">
                      <p className="whitespace-nowrap font-semibold text-brand-brown/80">
                        {booking.clientPhone}
                      </p>
                    </td>

                    <td className="max-w-[260px] border-t border-white/70 px-5 py-4 align-top">
                      <p className="font-semibold leading-6 text-brand-brown">
                        {booking.serviceTitle}
                      </p>
                    </td>
                    <td className="border-t border-white/70 px-5 py-4 align-top ">
                      <p className="mb-1 whitespace-nowrap font-bold text-brand-brown">
                        {booking.date}
                      </p>
                      <p className="text-sm  text-brand-brown/60">
                        {booking.time}
                      </p>
                    </td>
                    <td className="border-t border-white/70 px-5 py-4 align-top">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="border-t border-white/70 px-5 py-4 align-top">
                      <Select
                        value={booking.status}
                        onChange={(e) =>
                          updateBookingStatus(
                            booking.id,
                            e.target.value as BookingStatus,
                          )
                        }
                        className="max-w-[190px] rounded-xl px-3 py-2 text-sm"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </Select>
                    </td>
                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="bg-white/60 px-5 py-10 text-center text-brand-brown/60"
                    >
                      Заявки не найдены. Попробуйте изменить поиск или фильтр.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ClientsSummary />
        <ServiceManager />
      </Container>
    </main>
  );
}
