'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { MADINAH_HOTELS } from '@/config/pricing';
import { HotelStep } from './HotelStep';

export function Step5HotelMadinah() {
  const { hotelMadinah, updateHotelMadinah } = usePlannerStore();

  return (
    <HotelStep
      city="Madinah"
      landmark="Masjid Nabawi"
      hotels={MADINAH_HOTELS}
      selection={hotelMadinah}
      update={updateHotelMadinah}
      backStep={4}
      nextStep={6}
      nextLabel="Lanjut ke Transportasi"
    />
  );
}
