export type ServiceCategory = "individual" | "speaking" | "career" | "custom"

export type Service = {
    id: string
    title: string
    description: string
    price: number
    durationMinutes: number
    category: ServiceCategory
    isPopular?: boolean
    isActive: boolean
    createdAt: string
}