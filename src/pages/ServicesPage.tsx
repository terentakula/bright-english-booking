import { Link } from "react-router-dom";
import { ROUTES } from "../app/router/routes";
import { useServicesStore } from "../features/services/model/services.store";
import { businessConfig } from "../shared/config/business.config";
import { Container } from "../shared/ui/Container";
import { formatDuration, formatPrice } from "../shared/utils/format";
import { Button } from "../shared/ui/Button";
import { motion, type Variants } from "motion/react";

const courseBenefits = [
  "Определение уровня",
  "Живая разговорная практика",
  "Домашние задания",
  "Поддержка преподавателя",
];

const courseListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const courseCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ServicesPage() {
  const services = useServicesStore((state) => state.services);
  const activeServices = services.filter((service) => service.isActive);

  return (
    <main className="py-10">
      <Container>
        <section className="mb-8 rounded-4xl bg-brand-cream p-5 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:p-10">
          <div className="mb-6 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                Курсы
              </p>

              <h1 className="mb-3 text-4xl font-bold leading-tight text-brand-brown sm:text-5xl">
                Выберите формат обучения английскому
              </h1>

              <p className="text-lg leading-8 text-brand-brown/75">
                {businessConfig.description}
              </p>
            </div>

            <div className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 lg:self-start">
              <div className="mb-4 rounded-3xl bg-brand-brown p-5 text-white">
                <p className="mb-2 text-sm font-semibold text-white/90">
                  Пробное занятие
                </p>
                <p className="mb-2 text-3xl font-black">45 минут</p>
                <p className="text-sm leading-6 text-white/90">
                  Познакомимся, определим уровень и подберём подходящий курс.
                </p>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-brand-page p-4 ring-1 ring-orange-100">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-orange">
                    Цена
                  </p>
                  <p className="font-bold text-brand-brown">Бесплатно</p>
                </div>

                <div className="rounded-2xl bg-brand-page p-4 ring-1 ring-orange-100">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-orange">
                    Формат
                  </p>
                  <p className="font-bold text-brand-brown">Онлайн</p>
                </div>
              </div>

              <Link to={ROUTES.booking} className="block">
                <Button type="button" className="w-full">
                  Записаться на пробный урок
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {courseBenefits.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-brown shadow-sm ring-1 ring-orange-100"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <motion.div
          variants={courseListVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 grid gap-5 md:grid-cols-3"
        >
          {activeServices.map((service) => (
            <motion.article
              key={service.id}
              variants={courseCardVariants}
              className="relative flex flex-col justify-between gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100"
            >
              {service.isPopular && (
                <span className="absolute right-5 top-5 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white shadow-sm">
                  Популярно
                </span>
              )}

              <h2 className="pr-24 text-xl font-bold">{service.title}</h2>
              <p className="mb-2 leading-7 text-brand-brown/70">
                {service.description}
              </p>

              <div className="mb-3 flex items-center justify-between text-sm font-semibold">
                <span className="rounded-full bg-brand-page px-3 py-1 text-brand-brown ring-1 ring-orange-100">
                  {formatDuration(service.durationMinutes)}
                </span>
                <span className="rounded-full bg-brand-page px-3 py-1 text-brand-brown ring-1 ring-orange-100">
                  {formatPrice(service.price)}
                </span>
              </div>

              <Link to={ROUTES.booking}>
                <Button className="w-full" type="button">
                  Записаться
                </Button>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {activeServices.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center text-brand-brown/70 shadow-sm ring-1 ring-orange-100">
            Сейчас нет активных курсов для записи.
          </div>
        )}

        <section className="rounded-4xl bg-brand-cream p-5 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="max-w-xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-brown">
                Нужна помощь?
              </p>

              <h2 className="mb-3 text-3xl font-bold">
                Не знаете, какой курс выбрать?
              </h2>

              <p className="leading-7 text-brand-brown/70">
                Запишитесь на пробный урок — преподаватель определит уровень и
                подскажет, какой формат обучения подойдёт лучше.
              </p>
            </div>

            <Link to={ROUTES.booking} className="block">
              <Button type="button" className="w-full">
                Записаться на пробный урок
              </Button>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
