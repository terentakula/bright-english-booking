import { useRef, useState } from "react";
import { useServicesStore } from "../model/services.store";
import type { Service, ServiceCategory } from "../types/service.types";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { formatDuration, formatPrice } from "../../../shared/utils/format";
import { AnimatePresence, motion } from "motion/react";

type ServiceFormState = {
  title: string;
  description: string;
  price: string;
  durationMinutes: string;
  category: ServiceCategory;
  isPopular: boolean;
};

const emptyFormState: ServiceFormState = {
  title: "",
  description: "",
  price: "",
  durationMinutes: "",
  category: "custom",
  isPopular: false,
};

const categoryLabels: Record<ServiceCategory, string> = {
  individual: "Индивидуальные",
  speaking: "Разговорные",
  career: "Карьера",
  custom: "Другое",
};

const categoryOptions: ServiceCategory[] = [
  "individual",
  "speaking",
  "career",
  "custom",
];

function getServiceCardClassName(service: Service) {
  if (!service.isActive) {
    return "border-l-4 border-l-brand-brown/25 bg-[#eee5dc] opacity-80";
  }

  if (service.isPopular) {
    return "border-l-4 border-l-brand-orange bg-[#fff3e6]";
  }

  return "border-l-4 border-l-brand-brown/20 bg-[#f8efe6]";
}

function getServiceStatusClassName(isActive: boolean) {
  return isActive
    ? "bg-orange-50 text-brand-orange ring-orange-100"
    : "bg-brand-brown/10 text-brand-brown/60 ring-brand-brown/10";
}

export function ServiceManager() {
  const services = useServicesStore((state) => state.services);
  const addService = useServicesStore((state) => state.addService);
  const updateService = useServicesStore((state) => state.updateService);
  const deleteService = useServicesStore((state) => state.deleteService);
  const toggleServiceStatus = useServicesStore(
    (state) => state.toggleServiceStatus,
  );
  const resetServices = useServicesStore((state) => state.resetServices);

  const [form, setForm] = useState<ServiceFormState>(emptyFormState);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

  const editingService = services.find(
    (service) => service.id === editingServiceId,
  );

  function scrollToForm() {
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setIsFormHighlighted(true);

      window.setTimeout(() => {
        setIsFormHighlighted(false);
      }, 1000);
    }, 50);
  }

  function updateField<T extends keyof ServiceFormState>(
    field: T,
    value: ServiceFormState[T],
  ) {
    setMessage("");
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function validateForm() {
    const price = Number(form.price);
    const durationMinutes = Number(form.durationMinutes);

    if (!form.title.trim()) {
      return "Введите название услуги.";
    }
    if (!form.description.trim()) {
      return "Введите описание услуги.";
    }
    if (!Number.isFinite(price) || price < 0) {
      return "Введите корректную цену.";
    }
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      return "Введите корректную длительность.";
    }
    return "";
  }

  function handleSubmit() {
    const error = validateForm();

    if (error) {
      setMessage(error);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      durationMinutes: Number(form.durationMinutes),
      category: form.category,
      isPopular: form.isPopular,
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
      setMessage("Услуга обновлена.");
    } else {
      addService(payload);
      setMessage("Услуга добавлена.");
    }

    setForm(emptyFormState);
    setEditingServiceId(null);
  }

  function handleEdit(service: Service) {
    setEditingServiceId(service.id);
    setMessage("");

    setForm({
      title: service.title,
      description: service.description,
      price: String(service.price),
      durationMinutes: String(service.durationMinutes),
      category: service.category,
      isPopular: Boolean(service.isPopular),
    });

    scrollToForm();
  }

  function handleCancelEdit() {
    setEditingServiceId(null);
    setForm(emptyFormState);
    setMessage("");
  }

  function handleDelete(serviceId: string) {
    const shouldDelete = window.confirm("Удалить эту услугу?");

    if (!shouldDelete) {
      return;
    }

    deleteService(serviceId);

    if (editingServiceId === serviceId) {
      handleCancelEdit();
    }
  }

  return (
    <section className="mt-8 rounded-4xl bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-brand-cream px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
            Courses CRUD
          </p>

          <h2 className="mb-2 text-2xl font-bold">Управление курсами</h2>

          <p className="max-w-2xl text-brand-brown/80">
            Добавляй, редактируй, отключай и удаляй курсы. Активные курсы сразу
            появляются на странице услуг и в фоме записи.
          </p>
        </div>

        <Button type="button" variant="secondary" onClick={resetServices}>
          Сбросить услуги
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[360px_1fr] md:items-start">
        <motion.form
          ref={formRef}
          layout
          animate={{
            boxShadow: isFormHighlighted
              ? "0 28px 70px rgba(91,55,35,0.24)"
              : "0 18px 45px rgba(91,55,35,0.13)",
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="overflow-hidden rounded-4xl bg-[#e7cfb7]"
        >
          <div className="bg-brand-brown p-5 text-white">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">
                {editingService ? "Редактировать курс" : "Новый курс"}
              </h3>

              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                {editingService ? "Edit" : "Create"}
              </span>
            </div>

            <p className="text-sm leading-6 text-white/75">
              {editingService
                ? "Измените данные курса и сохраните обновления."
                : "Заполните основные данные курса, чтобы он появился на сайте."}
            </p>

            {editingService && (
              <p className="mt-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                Сейчас редактируется: {editingService.title}
              </p>
            )}
          </div>
          <div className=" rounded-b-4xl grid gap-4 bg-[#ead8c4] p-5 border border-t-0 border-brand-brown/30">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-brown">
                Название
              </span>
              <Input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Например, Консультация"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-brown">
                Описание
              </span>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-28 bg-white w-full min-w-0 rounded-2xl border border-brand-brown/10 px-4 py-3 outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15"
                placeholder="Кратко опишите услугу"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-brown">
                  Цена
                </span>
                <Input
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  type="number"
                  min="0"
                  placeholder="2500"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-brown">
                  Длительность
                </span>
                <Input
                  value={form.durationMinutes}
                  onChange={(e) =>
                    updateField("durationMinutes", e.target.value)
                  }
                  type="number"
                  min="1"
                  placeholder="60"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-brown">
                Категория
              </span>
              <Select
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value as ServiceCategory)
                }
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex items-center gap-3 rounded-2xl bg-brand-cream/90 p-4">
              <input
                checked={form.isPopular}
                onChange={(e) => updateField("isPopular", e.target.checked)}
                type="checkbox"
                className="size-4 accent-brand-orange"
              />
              <span className="text-sm font-semibold text-brand-brown">
                Пометить как популярную услугу
              </span>
            </label>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-brand-brown px-4 py-3 text-sm font-semibold text-white shadow-sm"
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleSubmit}>
                {editingService ? "Сохранить" : "Добавить"}
              </Button>

              {editingService && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit}
                >
                  Отменить
                </Button>
              )}
            </div>
          </div>
        </motion.form>

        <motion.div layout className="grid gap-4">
          <AnimatePresence>
            {services.map((service) => (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`rounded-3xl p-5 shadow-sm ring-1 ring-brand-brown/20 transition hover:-translate-y-0.5 hover:shadow-brand ${getServiceCardClassName(
                  service,
                )}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="max-w-[320px] truncate text-lg font-bold">
                        {service.title}
                      </h3>

                      {service.isPopular && (
                        <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                          Популярно
                        </span>
                      )}

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getServiceStatusClassName(
                          service.isActive,
                        )}`}
                      >
                        {service.isActive ? "Активна" : "Отключена"}
                      </span>
                    </div>

                    <p className="mb-4 max-w-2xl leading-6 text-sm text-brand-brown/75">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-sm font-semibold">
                      <span className="rounded-full bg-white px-3 py-1 text-brand-brown ring-1 ring-brand-brown/10">
                        {formatPrice(service.price)}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-brand-brown ring-1 ring-brand-brown/10">
                        {formatDuration(service.durationMinutes)}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-brand-brown ring-1 ring-brand-brown/10">
                        {categoryLabels[service.category]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleEdit(service)}
                      className="px-4 py-2"
                    >
                      Изменить
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => toggleServiceStatus(service.id)}
                      className="px-4 py-2"
                    >
                      {service.isActive ? "Отключить" : "Включить"}
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDelete(service.id)}
                      className="px-4 py-2"
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {services.length === 0 && (
            <div className="rounded-3xl bg-brand-page p-8 text-center text-brand-brown/70 ring-1 ring-orange-100">
              Услуг пока нет. Добавить первую услугу можно через форму.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
