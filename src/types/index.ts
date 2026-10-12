export type TripType = 'one-way' | 'round-trip';

export type BookingStatus = 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED';

export type EmailStatus = 'SENT' | 'PENDING' | 'FAILED';

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  suitableUseCases: string[];
  vehicleOptions: string[];
  bookingInfo: string;
  isBhavansExclusive?: boolean;
}

export interface FleetItem {
  id: string;
  category: string;
  name: string;
  seatingCapacity: number | null; // null if unconfirmed
  capacityConfirmed: boolean;
  capacityLabel: string;
  image: string;
  shortDescription: string;
  features: string[];
  idealFor: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  tripType: TripType;
  travelDate: string | null;
  returnDate?: string;
  pickupLocation: string;
  destination: string;
  passengerCount: number | '';
  vehicleCategory: string;
  additionalRequirements?: string;
  language?: string;
}

export interface BookingRecord extends BookingFormData {
  id: number | string;
  bookingReference: string;
  passengerCount: number;
  status: BookingStatus;
  emailNotificationStatus: EmailStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}
