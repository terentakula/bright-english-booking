import { Link } from "react-router-dom";
import { Container } from "../shared/ui/Container";
import { ROUTES } from "../app/router/routes";
import { Button } from "../shared/ui/Button";

export function NotFoundPage() {
  return (
    <main className="py-8 sm:py-10">
      <Container>
        <section className="rounded-3xl bg-brand-cream p-10 text-center shadow-brand ring-1 ring-orange-100">
          <p className="mb-3 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
            404
          </p>

          <h1 className="mb-4 text-4xl font-bold">Страница не найдена</h1>

          <p className="mb-8 mx-auto max-w-xl text-brand-brown/70">
            Похоже, вы перешли по неправильной ссылке. Вернитесь на главную
            страницу или запишитесь на пробное занятие.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to={ROUTES.home}>
              <Button type="button">На главную</Button>
            </Link>
            <Link to={ROUTES.booking}>
              <Button type="button">Записаться</Button>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
