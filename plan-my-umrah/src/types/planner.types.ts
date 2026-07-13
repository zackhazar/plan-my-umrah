export interface HotelSelection {
  hotelId: string;
  name: string;
  stars: number;
  checkIn: Date | null;
  checkOut: Date | null;
  nights: number; // dihitung dari checkIn–checkOut (fallback manual)
  pricePerNight: number;
}

export type TransportMode = 'car' | 'train' | 'bus' | 'custom';
export type TransportUnit = 'per_vehicle' | 'per_pax' | 'flat';

export interface TransportSelection {
  id: string; // unik per leg
  mode: TransportMode;
  route: string;
  vehicle: string; // nama kendaraan / kelas kereta / label kustom
  price: number; // harga satuan (per kendaraan / per pax / flat) dalam Rupiah
  unit: TransportUnit;
  qty: number; // jumlah kendaraan (car) — untuk train/bus/custom = 1
}

export interface VisaSelection {
  type: string;
  pricePerPax: number;
  tierLabel: string;
  siskopatuhPerPax: number;
  brnApproval: boolean; // dibantu approval hotel BRN
  brnIsRamadhan: boolean;
  brnTotal: number; // total Rupiah bantuan approval (SAR x hari x pax x kurs)
}

export interface OptionalService {
  id: string;
  serviceName: string;
  price: number; // total Rupiah
  days?: number;
}

export interface PlannerState {
  step: number;
  travellers: {
    adults: number;
    children: number;
    infants: number;
  };
  dates: {
    departure: Date | null;
    return: Date | null;
  };
  flight: {
    departureAirport: string; // bandara asal (Indonesia)
    arrivalAirport: string; // bandara tiba di Saudi (JED/MED)
    returnAirport: string; // bandara kepulangan dari Saudi (JED/MED)
    estimatedPricePerPerson: number;
    isManualOverride: boolean;
  };
  hotelMakkah: HotelSelection | null;
  hotelMadinah: HotelSelection | null;
  transport: TransportSelection[];
  visa: VisaSelection | null;
  optionals: OptionalService[];

  setStep: (step: number) => void;
  updateTravellers: (type: 'adults' | 'children' | 'infants', count: number) => void;
  updateDates: (departure: Date | null, returnDate: Date | null) => void;
  updateFlight: (data: Partial<PlannerState['flight']>) => void;
  updateHotelMakkah: (data: Partial<HotelSelection>) => void;
  updateHotelMadinah: (data: Partial<HotelSelection>) => void;
  addTransport: (data: TransportSelection) => void;
  removeTransport: (id: string) => void;
  updateVisa: (data: VisaSelection | null) => void;
  toggleOptional: (data: OptionalService) => void;
  resetPlanner: () => void;
}
