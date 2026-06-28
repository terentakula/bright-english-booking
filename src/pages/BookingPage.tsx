import { useState } from "react";
import { useBookingsStore } from "../features/bookings/model/bookings.store";
import { Container } from "../shared/ui/Container";
import { formatDuration, formatPrice } from "../shared/utils/format";
import { Input } from "../shared/ui/Input";
import { Select } from "../shared/ui/Select";
import { Button } from "../shared/ui/Button";
import { useServicesStore } from "../features/services/model/services.store";

const initialFormState = {
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  serviceId: "",
  date: "",
  time: "",
};

export function BookingPage() {
  const addBooking = useBookingsStore((state) => state.addBooking);
  const services = useServicesStore((state) => state.services);

  const activeServices = services.filter((service) => service.isActive);

  const [form, setForm] = useState(initialFormState);
  const [successMessage, setSuccessMeassage] = useState("");

  const selectedService =
    activeServices.find((service) => service.id === form.serviceId) ??
    activeServices[0];

  function updateField(field: keyof typeof form, value: string) {
    setSuccessMeassage("");
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit() {
    if (
      !form.clientName.trim() ||
      !form.clientPhone.trim() ||
      !form.date ||
      !form.time ||
      !selectedService
    ) {
      setSuccessMeassage("Заполните имя, телефон, услугу, дату и время");
      return;
    }

    addBooking({
      clientName: form.clientName.trim(),
      clientPhone: form.clientPhone.trim(),
      clientEmail: form.clientEmail.trim() || undefined,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      date: form.date,
      time: form.time,
    });

    setForm(initialFormState);
    setSuccessMeassage(
      "Заявка отправлена. Администратор школы скоро свяжется с вами",
    );
  }

  return (
    <main className="py-8 sm:py-10">
      <Container>
        <section className="rounded-4xl bg-brand-cream p-4 shadow-brand ring-1 ring-orange-100 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="mb-6">
              <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                Пробный урок
              </p>

              <h1 className="mb-4 text-center text-3xl font-bold leading-tight text-brand-brown sm:text-5xl lg:text-left">
                Запишитесь на пробное занятие
              </h1>

              <p className="mb-6 text-lg leading-8 text-brand-brown/75 text-center lg:text-left">
                Выберите курс, удобную дату и время. Мы определим уровень,
                подберём преподавателя и предложим понятный план обучения.
              </p>


              <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:grid lg:justify-start">
                {[
                  "Определим текущий уровень английского",
                  "Подберём подходящий формат занятий",
                  "Расскажем, как будет строиться обучение",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-brand-brown shadow-sm ring-1 ring-orange-100"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {selectedService && (
                <div className="rounded-4xl bg-brand-brown p-5 text-white shadow-brand">
                  <p className="mb-2 text-sm font-semibold text-white/80">
                    Выбранный курс
                  </p>

                  <h2 className="text-2xl font-bold">
                    {selectedService.title}
                  </h2>

                  <p className="mb-4 text-sm leading-6 text-white/80">
                    {selectedService.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-brown">
                      {formatDuration(selectedService.durationMinutes)}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-brown">
                      {selectedService.price === 0
                        ? "Бесплатно"
                        : formatPrice(selectedService.price)}
                    </span>
                  </div>
                </div>
              )}

            </div>
            <div className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 shadow-brand">
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange">
                  Форма бронирования
                </p>

                <h1 className="mb-4 text-2xl font-bold text-brand-brown">
                  Оставьте заявку
                </h1>

                {activeServices.length === 0 ? (
                  <div className="rounded-3xl bg-brand-page p-6 text-center text-brand-brown/75 ring-1 ring-orange-100">
                    Сейчас нет активных курсов для записи.
                  </div>
                ) : (
                  <form className="grid gap-5 min-w-0">
                    <label className="grid gap-2 min-w-0">
                      <span className="font-medium">Имя</span>
                      <Input
                        value={form.clientName}
                        onChange={(e) =>
                          updateField("clientName", e.target.value)
                        }
                        placeholder="Александр"
                      />
                    </label>

                    <label className="grid gap-2 min-w-0">
                      <span className="font-medium">Телефон</span>
                      <Input
                        value={form.clientPhone}
                        onChange={(e) =>
                          updateField("clientPhone", e.target.value)
                        }
                        placeholder="+7 999 000-00-00"
                      />
                    </label>

                    <label className="grid gap-2 min-w-0">
                      <span className="font-medium">Email</span>
                      <Input
                        value={form.clientEmail}
                        onChange={(e) =>
                          updateField("clientEmail", e.target.value)
                        }
                        placeholder="alex@gmail.com"
                      />
                    </label>

                    <label className="grid gap-2 min-w-0">
                      <span className="font-medium">Курс</span>
                      <Select
                        value={form.serviceId || selectedService?.id || ""}
                        onChange={(e) =>
                          updateField("serviceId", e.target.value)
                        }
                        className="w-full min-w-0"
                      >
                        {activeServices.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title} - {formatPrice(service.price)},{" "}
                            {formatDuration(service.durationMinutes)}
                          </option>
                        ))}
                      </Select>
                    </label>

                    <div className="mb-3 grid min-w-0 gap-5 md:grid-cols-2">
                      <label className="grid gap-2 min-w-0">
                        <span className="font-medium">Дата</span>
                        <Input
                          value={form.date}
                          onChange={(e) => updateField("date", e.target.value)}
                          type="date"
                        />
                      </label>

                      <label className="grid gap-2 min-w-0">
                        <span className="font-medium">Время</span>
                        <Input
                          value={form.time}
                          onChange={(e) => updateField("time", e.target.value)}
                          type="time"
                        />
                      </label>
                    </div>

                    {successMessage && (
                      <div className="rounded-2xl bg-brand-cream px-4 py-3 text-sm font-semibold text-brand-brown ring-1  ring-orange-100">
                        {successMessage}
                      </div>
                    )}

                    <Button
                      onClick={handleSubmit}
                      type="button"
                      className="w-full sm:w-auto"
                    >
                      Отправить заявку
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
