import { create } from "zustand";
import { persist } from "zustand/middleware";
import { servicesMock } from "../data/services.mock";
import type { Service, ServiceCategory } from "../types/service.types";

type CreateServicePayload = {
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
  category?: ServiceCategory;
  isPopular?: boolean;
};

type UpdateServicePayload = Partial<CreateServicePayload> & {
  isActive?: boolean;
};

type ServicesStore = {
  services: Service[];
  addService: (payload: CreateServicePayload) => void;
  updateService: (serviceId: string, payload: UpdateServicePayload) => void;
  deleteService: (serviceId: string) => void;
  toggleServiceStatus: (serviceId: string) => void;
  resetServices: () => void;
};

export const useServicesStore = create<ServicesStore>()(
  persist(
    (set) => ({
      services: servicesMock,

      addService: (payload) =>
        set((state) => ({
          services: [
            {
              id: crypto.randomUUID(),
              title: payload.title,
              description: payload.description,
              price: payload.price,
              durationMinutes: payload.durationMinutes,
              category: payload.category ?? "custom",
              isPopular: payload.isPopular ?? false,
              isActive: true,
              createdAt: new Date().toISOString(),
            },
            ...state.services,
          ],
        })),

      updateService: (serviceId, payload) =>
        set((state) => {
          const serviceToUpdate = state.services.find(
            (service) => service.id === serviceId,
          );

          if (!serviceToUpdate) {
            return {
              services: state.services,
            };
          }

          const updatedService = {
            ...serviceToUpdate,
            ...payload,
          };

          return {
            services: [
              updatedService,
              ...state.services.filter((service) => service.id !== serviceId),
            ],
          };
        }),

      deleteService: (serviceId) =>
        set((state) => ({
          services: state.services.filter(
            (service) => service.id !== serviceId,
          ),
        })),

      toggleServiceStatus: (serviceId) =>
        set((state) => ({
          services: state.services.map((service) =>
            service.id === serviceId
              ? { ...service, isActive: !service.isActive }
              : service,
          ),
        })),

      resetServices: () =>
        set({
          services: servicesMock,
        }),
    }),
    {
      name: "bright-english-booking-services",
    },
  ),
);
