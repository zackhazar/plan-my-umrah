import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PlannerState, TransportSelection, VisaSelection, OptionalService } from '@/types/planner.types';

const initialValues = {
  step: 1,
  travellers: { adults: 1, children: 0, infants: 0 },
  dates: { departure: null, return: null },
  flight: { departureAirport: '', arrivalAirport: 'JED', estimatedPricePerPerson: 0, isManualOverride: false },
  hotelMakkah: null,
  hotelMadinah: null,
  transport: [],
  visa: null,
  optionals: [],
};

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      ...initialValues,

      setStep: (step: number) => set({ step }),
      
      updateTravellers: (type: 'adults' | 'children' | 'infants', count: number) => set((state) => ({
        travellers: { ...state.travellers, [type]: Math.max(0, count) }
      })),

      updateDates: (departure: Date | null, returnDate: Date | null) => set(() => ({
  dates: { departure, return: returnDate }
})),

      updateFlight: (data: Partial<PlannerState['flight']>) => set((state) => ({
        flight: { ...state.flight, ...data }
      })),

      updateHotelMakkah: (data: Partial<PlannerState['hotelMakkah'] & {}>) => set((state) => ({
        hotelMakkah: state.hotelMakkah ? { ...state.hotelMakkah, ...data } : { hotelId: '', name: '', stars: 0, nights: 1, pricePerNight: 0, ...data }
      })),

      updateHotelMadinah: (data: Partial<PlannerState['hotelMadinah'] & {}>) => set((state) => ({
        hotelMadinah: state.hotelMadinah ? { ...state.hotelMadinah, ...data } : { hotelId: '', name: '', stars: 0, nights: 1, pricePerNight: 0, ...data }
      })),

      addTransport: (data: TransportSelection) => set((state) => ({
        transport: [...state.transport.filter(t => t.id !== data.id), data]
      })),

      removeTransport: (id: string) => set((state) => ({
        transport: state.transport.filter((t) => t.id !== id)
      })),

      updateVisa: (data: VisaSelection) => set(() => ({
        visa: data
      })),

      toggleOptional: (data: OptionalService) => set((state) => {
        const exists = state.optionals.find((o) => o.id === data.id);
        if (exists) {
          return { optionals: state.optionals.filter((o) => o.id !== data.id) };
        }
        return { optionals: [...state.optionals, data] };
      }),

      resetPlanner: () => set(initialValues),
    }),
    {
      name: 'pmu-planner-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        step: state.step,
        travellers: state.travellers,
        flight: state.flight,
        hotelMakkah: state.hotelMakkah,
        hotelMadinah: state.hotelMadinah,
        transport: state.transport,
        visa: state.visa,
        optionals: state.optionals,
      }),
    }
  )
);