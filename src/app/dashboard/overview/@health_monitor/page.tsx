import { delay } from '@/constants/mock-api';
import { HealthMonitor } from '@/features/overview/components/health-monitor';

export default async function HealthMonitorPage() {
  await delay(1800); // Simulate health data API call
  return <HealthMonitor />;
}
