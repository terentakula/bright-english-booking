import { Link, useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/Button";
import { Container } from "../shared/ui/Container";
import { Input } from "../shared/ui/Input";
import { ROUTES } from "../app/router/routes";
import { useAuthStore, type UserRole } from "../features/auth/auth.store";

export function LoginPage() {
  const navigate = useNavigate();
  const loginAs = useAuthStore((state) => state.loginAs);

  function handleDemoLogin(role: UserRole) {
    loginAs(role);

    if (role === "admin") {
      navigate(ROUTES.adminDashboard);
      return;
    }

    if (role === "client") {
      navigate(ROUTES.clientDashboard);
      return;
    }

    navigate(ROUTES.home);
  }

  return (
    <main className="py-8 sm:py-10 ">
      <Container>
        <section className="grid gap-8 rounded-4xl bg-brand-cream p-5 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="mb-3 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
              Demo Login
            </p>

            <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
              Вход в кабинет
            </h1>

            <p className="mb-5 max-w-xl text-lg leading-8 text-brand-brown/75">
              Это демонстрационная страница входа. В реальном проекте здесь
              можно подключить авторизацию для учеников, администраторов и
              преподавателей.
            </p>

            <div className="grid gap-3">
              <p className="rounded-2xl bg-white p-4 font-bold text-brand-brown shadow-sm ring-1 ring-orange-100">
                Ученик видит только свои записи
              </p>
              <p className="rounded-2xl bg-white p-4 font-bold text-brand-brown shadow-sm ring-1 ring-orange-100">
                Администратор управляет всеми заявками
              </p>
              <p className="rounded-2xl bg-white p-4 font-bold text-brand-brown shadow-sm ring-1 ring-orange-100">
                Курсы и заявки сохраняются в демо-хранилище
              </p>
            </div>
          </div>

          <div className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6">
            <div className="mb-6 rounded-3xl bg-brand-brown p-5 text-white text-center">
              <h2 className="mb-2 text-3xl font-semibold">Bright English</h2>
              <p className="text-sm leading-6 text-white/70">
                Войдите в демо-кабинет или перейдите сразу к нужному разделу.
              </p>
            </div>
            <form className="mb-5 grid gap-5">
              <label className="grid gap-2">
                <span className="font-medium">Email</span>
                <Input type="email" placeholder="admin@gmail.com" />
              </label>

              <label className="grid gap-2">
                <span className="font-medium">Пароль</span>
                <Input type="password" placeholder="********" />
              </label>
            </form>

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <Link to={ROUTES.clientDashboard}>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleDemoLogin("client")}
                >
                  Кабинет ученика
                </Button>
              </Link>

              <Link to={ROUTES.adminDashboard}>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleDemoLogin("admin")}
                >
                  Администратор
                </Button>
              </Link>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="mb-5 w-full"
              onClick={() => handleDemoLogin("guest")}
            >
              Продолжить как гость
            </Button>

            <p className="rounded-2xl bg-brand-page p-4 text-sm leading-6 ring-1 ring-orange-100">
              Форма входа демонстрационная. Гость может смотреть сайт и
              оставлять заявку на пробное занятие. Ученик видит свой кабинет, а
              администратор управляет всеми заявками.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
