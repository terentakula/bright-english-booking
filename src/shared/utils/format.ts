export function formatPrice(value: number) {
    return new Intl.NumberFormat("ru-RU").format(value) + " ₽"
}

export function formatDuration(minutes: number) {
    return `${minutes} минут`
}