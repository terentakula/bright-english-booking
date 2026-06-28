export const businessConfig = {
    name: "Bright English Booking",
    shortName: "BE",
    tagline: "English school booking platform",
    description: "Система онлайн-записи для школы английского языка: пробные уроки, индивидуальные занятия, групповые курсы и админ-панель для обработки заявок.",


    hero: {
        badge: "Bright English Booking",
        title: "Начните говорить уверенно по-английски",
        description: "Запишитесь на пробное занятие, выберите удобный формат обучения и получите персональный маршрут изучения английского языка.",
        primaryAction: "Начать занятие",
        secondaryAction: "Смотреть курсы",
    },

    dashboard: {
        todayLabel: "Сегодня",
        todayValue: "8 заявок",
        cards: [
            {
                title: "Пробный урок",
                description: "Ученик оставил заявку на первое бусплатное занятие",
            },
            {
                title: "Заявка подтверждена",
                description: "Администратор связался с учеником и назначил время",
            },
            {
                title: "Урок завершён",
                description: "Занятие прошло, заявка сохранена в истории",
            },
        ],
    },

    sections: {
        howItWorksTitle: "Как проходит запись",
        howItWorksDescription: "Ученик выбирает курс, оставляет контакты, а школа подтверждает занятие через админ-панель.",
        benefitsTitle: "Почему стоит выбрать нас",
        benefitsDescription: "Bright English Booking помогает школе принимать заявки, управлять курсами и видеть клиентскую базу в одном интерфейсе.",
    },
} as const