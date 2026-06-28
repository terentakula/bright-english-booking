import { Link } from "react-router-dom";
import { useBookingsStore } from "../features/bookings/model/bookings.store";
import { Button } from "../shared/ui/Button";
import { Container } from "../shared/ui/Container";
import { ROUTES } from "../app/router/routes";
import img from "../assets/books.png";
import { AnimatePresence, motion } from "motion/react";
import { StatusBadge } from "../shared/ui/StatusBadge";

export function ClientDashboardPage() {
  const bookings = useBookingsStore((state) => state.bookings);
  const currentClientPhone = useBookingsStore(
    (state) => state.currentClientPhone,
  );
  const cancelBooking = useBookingsStore((state) => state.cancelBooking);

  const clientBookings = currentClientPhone
    ? bookings.filter((booking) => booking.clientPhone === currentClientPhone)
    : [];

  return (
    <main className="py-8 lg:py-10">
      <Container className="max-w-5xl">
        <section className="mb-8 rounded-4xl bg-brand-cream p-4 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                Кабинет ученика
              </p>

              <p className="mb-8 max-w-lg text-brand-brown/75">
                Здесь отображаются заявки на пробные уроки и курсы английского.
                Можно посмотреть дату, время, статус записи и отменить заявку.
              </p>
            </div>

            <Link to={ROUTES.booking}>
              <Button type="button">Записаться ещё</Button>
            </Link>
          </div>
        </section>

        <section>
          {clientBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-4xl bg-white p-8 text-center shadow-sm ring-1 ring-orange-100"
            >
              <div className="w-96 h-96 justify-self-center">
                <img
                  src={img}
                  alt="img"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              <h2 className="mb-2 text-2xl font-bold">Пока нет записей</h2>

              <p className="mb-5 leading-7 text-brand-brown/70">
                Оставьте заявку на пробное занятие, и она появится в личном
                кабинете ученика.
              </p>

              <Link to={ROUTES.booking} className="inline-block">
                <Button type="button">Записаться</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div className="grid gap-4 md:grid-cols-2">
              <AnimatePresence>
                {clientBookings.map((booking, index) => (
                  <motion.article
                    layout
                    key={booking.id}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{
                      duration: 0.28,
                      delay: Math.min(index * 0.04, 0.16),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-orange">
                          Урок английского
                        </p>

                        <h2 className="mb-2 text-xl font-bold">
                          {booking.serviceTitle}
                        </h2>

                        <p className="text-brand-brown/60">
                          Для Вас{" "}
                          <span className="font-bold text-brand-brown">
                            {booking.clientName}
                          </span>
                        </p>
                      </div>

                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="mb-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-brand-page p-4 ring-1 ring-orange-100">
                        <p className="mb-1 text-sm font-medium text-brand-brown/60">
                          Дата
                        </p>
                        <p className="font-bold">{booking.date}</p>
                      </div>
                      <div className="rounded-2xl bg-brand-page p-4 ring-1 ring-orange-100">
                        <p className="mb-1 text-sm font-medium text-brand-brown/60">
                          Время
                        </p>
                        <p className="font-bold">{booking.time}</p>
                      </div>
                    </div>

                    {booking.status !== "cancelled" && (
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => cancelBooking(booking.id)}
                          className="px-4 py-2"
                        >
                          Отменить урок
                        </Button>
                      </div>
                    )}
                    {booking.status === "cancelled" && (
                      <p className="rounded-2xl bg-brand-page p-4 ring-1 ring-orange-100 text-center font-bold text-lg">
                        Урок отменен
                      </p>
                    )}
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </Container>
    </main>
  );
}
