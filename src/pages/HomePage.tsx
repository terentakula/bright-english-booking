import { Link } from "react-router-dom";
import { ROUTES } from "../app/router/routes";
import { Container } from "../shared/ui/Container";
import { businessConfig } from "../shared/config/business.config";
import { Button } from "../shared/ui/Button";
import { motion, type Variants } from "motion/react";
import img1 from "../assets/star.png";
import img2 from "../assets/books.png";
import homeBg from "../assets/home-bg.png";

const advantages = [
  {
    title: "Подбор уровня",
    description:
      "Определяем стартовый уровень ученика и подбираем понятный маршрут обучения.",
  },
  {
    title: "Разговорная практика",
    description:
      "Фокус на живой речи, уверенности и ситуациях, которые встречаются в жизни.",
  },
  {
    title: "Уроки без стресса",
    description:
      "Объясняем простым языком, поддерживаем ученика и помогаем не бояться ошибок.",
  },
  {
    title: "Английский для жизни",
    description:
      "Разбираем реальные ситуации: путешествия, работа, учёба, общение и собеседования.",
  },
];

const learningSteps = [
  {
    title: "Выберите курс",
    description:
      "Пробное занятие, индивидуальный формат, группа или подготовка к собеседованию.",
  },
  {
    title: "Оставьте заявку",
    description:
      "Укажите имя, контактные данные, удобную дату и время занятия.",
  },
  {
    title: "Мы подтвердим запись",
    description:
      "Администратор обработает заявку и назначит урок в удобном формате.",
  },
];

const levels = ["A1", "A2", "B1", "B2", "C1"];

const benefits = [
  "Уютная атмосфера на уроках",
  "Преподаватели с опытом",
  "Мини-группы до 6 учеников",
  "Индивидуальный план обучения",
  "Много разговорной практики",
  "Понятная программа по уровням",
];

export function HomePage() {
  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardFadeIn: Variants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <main className="py-8 sm:py-10">
      <Container>
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative mb-8 overflow-hidden rounded-4xl bg-brand-cream p-5 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div className="pointer-events-none absolute right-0 top-0 hidden rotate-12 sm:block ">
              <img src={img1} alt="" className="w-full h-25" />
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 hidden rotate-12 sm:block ">
              <img src={img2} alt="" className="w-full h-20" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-4 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                {businessConfig.hero.badge}
              </p>

              <h1 className="mb-4 max-w-3xl text-4xl font-black leading-tight tracking-tight text-brand-brown sm:text-5xl lg:text-6xl">
                {businessConfig.hero.title}
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-8 text-brand-brown/80">
                {businessConfig.hero.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to={ROUTES.booking}>
                  <Button type="button">
                    {businessConfig.hero.primaryAction}
                  </Button>
                </Link>

                <Link to={ROUTES.services}>
                  <Button type="button" variant="secondary">
                    {businessConfig.hero.secondaryAction}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 md:p-6">
              <div className="mb-4 rounded-3xl bg-brand-brown p-5 text-white">
                <p className="mb-2 text-sm text-white/70">
                  {businessConfig.dashboard.todayLabel}
                </p>
                <p className="mb-2 text-4xl font-black">
                  {businessConfig.dashboard.todayValue}
                </p>
                <p className="mb-2 text-sm text-white/70">
                  Новые заявки на пробные уроки и курсы
                </p>
              </div>

              <div className="mb-4 grid gap-4">
                {businessConfig.dashboard.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl bg-brand-page p-5 ring-1 ring-orange-100"
                  >
                    <p className="mb-1 font-bold text-brand-brown">
                      {card.title}
                    </p>
                    <p className="text-sm leading-6 text-brand-brown/70">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl flex justify-center flex-wrap gap-2">
                {levels.map((level) => (
                  <span
                    key={level}
                    className="rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-orange"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8 grid gap-3 md:grid-cols-2"
        >
          {advantages.map((item) => (
            <motion.article
              key={item.title}
              variants={cardFadeIn}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-orange-100 shadow-brand"
            >
              <h2 className="mb-2 text-brand-brown font-black">{item.title}</h2>
              <p className="text-sm leading-6 text-brand-brown/70">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.section>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8 grid gap-5 md:grid-cols-3"
        >
          {learningSteps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={cardFadeIn}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-orange-100"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-brand-orange text-sm font-black text-white shadow-brand">
                0{index + 1}
              </div>

              <h2 className="mb-3 text-xl font-black text-brand-brown">
                {step.title}
              </h2>
              <p className="leading-7 text-brand-brown/70">
                {step.description}
              </p>
            </motion.article>
          ))}
        </motion.section>

        <section className="mb-8 rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Why Bright English
              </p>

              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Учится можно спокойно, понятно и с интересом
              </h2>

              <p className="text-brand-brown/70">
                Bright English помогает ученикам постепенно заговорить на
                английском: через понятные объяснения, регулярную практику и
                поддержку преподавателя на каждом этапе.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl bg-brand-page px-4 py-3 font-semibold text-brand-brown ring-1 ring-orange-100"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{ backgroundImage: `url(${homeBg})` }}
          className="relative overflow-hidden rounded-4xl bg-cover bg-center p-6 text-white shadow-brand before:absolute before:inset-0 before:bg-black/40 sm:p-8 lg:p-10"
        >
          <div className="relative z-20 flex flex-wrap items-end  justify-between gap-6">
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Trial lesson
              </p>

              <h2 className="mb-4 max-w-2xl text-3xl font-bold sm:text-4xl">
                Запишитесь на пробное занятие и получите план обучения
              </h2>

              <p className="max-w-2xl leading-7 text-white/90">
                Выберите удобное время, оставьте заявку, а администратор школы
                подтвердит запись через админ-панель.
              </p>
            </div>

            <Link to={ROUTES.booking}>
              <Button type="button">Записаться</Button>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
