import { delay } from '@/constants/mock-api';
import { SensorData } from '@/features/overview/components/sensor-data';

export default async function SensorDataPage() {
  await delay(1200); // Simulate sensor data fetch
  return <SensorData />;
}
