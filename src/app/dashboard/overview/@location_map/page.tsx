import { delay } from '@/constants/mock-api';
import { LocationMap } from '@/features/overview/components/location-map';

export default async function LocationMapPage() {
  await delay(1500); // Simulate API call for map data
  return <LocationMap />;
}
