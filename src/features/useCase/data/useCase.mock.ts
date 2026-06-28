import type { useCase } from "../types/useCase.types";


export const useCasesMock: useCase[] = [
    {
        id: "english-school",
        title: "English School",
        description: "Сайт онлайн-школы или репетитора с записью на пробный урок.",
        features: [
            "Курсы и уровни языка",
            "Запись на пробный урок",
            "Кабинет ученика",
        ],
    },
    {
        id: "barber-shop",
        title: "Barber Shop",
        description: "Система записи для барбершопа с услугами, мастерами и расписанием.",
        features: [
            "Выбор услуги",
            "Выбор мастера",
            "Управление записями",
        ],
    },
    {
        id: "auto-service",
        title: "Auto Service",
        description: "Шаблон для автосервиса: заявки на диагностику, ремонт и обслуживание.",
        features: [
            "Тип услуги",
            "Марка автомобиля",
            "Статусы ремонта",
        ],
    },
]