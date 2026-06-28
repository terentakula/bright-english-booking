export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled"

export type Booking = {
    id: string
    clientName: string
    clientPhone: string
    clientEmail?: string
    serviceId: string
    serviceTitle: string
    date: string
    time: string
    status: BookingStatus
    createdAt: string
}