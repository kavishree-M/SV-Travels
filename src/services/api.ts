import axios from 'axios';
import { BookingFormData, BookingRecord, ServiceItem, FleetItem } from '../types';
import { SERVICES_DATA, FLEET_DATA } from '../data/travelData';

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = !configuredApiBaseUrl
  ? '/api'
  : configuredApiBaseUrl.startsWith('/')
    ? configuredApiBaseUrl
    : configuredApiBaseUrl.startsWith('http://') || configuredApiBaseUrl.startsWith('https://')
      ? configuredApiBaseUrl
      : `https://${configuredApiBaseUrl.includes('.') || configuredApiBaseUrl.includes(':') ? configuredApiBaseUrl : `${configuredApiBaseUrl}.onrender.com`}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120_000,
});

export const apiService = {
  // Fetch services list
  async getServices(): Promise<ServiceItem[]> {
    try {
      const response = await apiClient.get<ServiceItem[]>('/services');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((service) => ({
          ...service,
          image: SERVICES_DATA.find((localService) => localService.id === service.id)?.image ?? service.image,
        }));
      }
    } catch {
      // Fallback to local structured services if backend isn't mounted yet
    }
    return SERVICES_DATA;
  },

  // Fetch fleet list
  async getFleet(): Promise<FleetItem[]> {
    try {
      const response = await apiClient.get<FleetItem[]>('/fleet');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((vehicle) => ({
          ...vehicle,
          image: FLEET_DATA.find((localVehicle) => localVehicle.id === vehicle.id)?.image ?? vehicle.image,
        }));
      }
    } catch {
      // Fallback to local structured fleet
    }
    return FLEET_DATA;
  },

  // Submit booking enquiry
  async submitBooking(formData: BookingFormData): Promise<BookingRecord> {
    const response = await apiClient.post<BookingRecord>('/bookings', formData);
    if (!response.data?.bookingReference || response.data.emailNotificationStatus !== 'SENT') {
      throw new Error('SV Travels did not confirm email delivery. Please try again or contact us directly.');
    }

    return response.data;
  },
};
