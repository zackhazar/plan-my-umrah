'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { MAKKAH_HOTELS } from '@/config/pricing';
import { HotelStep } from './HotelStep';

export function Step4HotelMakkah() {
  const { hotelMakkah, updateHotelMakkah } = usePlannerStore();

  return (
    <HotelStep
      city="Makkah"
      landmark="Masjidil Haram"
      hotels={MAKKAH_HOTELS}
      selection={hotelMakkah}
      update={updateHotelMakkah}
      backStep={3}
      nextStep={5}
      nextLabel="Lanjut ke Hotel Madinah"
    />
  );
}
