import { delay } from '@/constants/mock-api';
import { MissionLog } from '@/features/overview/components/mission-log';

export default async function MissionLogPage() {
  await delay(1000); // Simulate API call
  return <MissionLog />;
}
