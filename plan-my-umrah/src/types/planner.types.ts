export interface HotelSelection {
  hotelId: string;
  name: string;
  stars: number;
  nights: number;
  pricePerNight: number;
}

export interface TransportSelection {
  id: string;
  route: string;
  vehicle: string;
  price: number;
}

export interface VisaSelection {
  type: string;
  price: number;
  includesSiskopatuh: boolean;
  includesInsurance: boolean;
}

export interface OptionalService {
  id: string;
  serviceName: string;
  price: number;
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
    departureAirport: string;
    arrivalAirport: string;
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
  updateVisa: (data: VisaSelection) => void;
  toggleOptional: (data: OptionalService) => void;
  resetPlanner: () => void;
}