'use client';

import {
  IconRobot,
  IconPill,
  IconActivityHeartbeat,
  IconHome,
  IconAlertCircle,
  IconCircleCheck,
  IconClock,
  IconMapPin,
  IconUser
} from '@tabler/icons-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mission types
type MissionType =
  | 'medication'
  | 'vitals'
  | 'assistance'
  | 'navigation'
  | 'alert';

interface Mission {
  id: string;
  time: string;
  type: MissionType;
  title: string;
  location?: string;
  patient?: string;
  status: 'completed' | 'in-progress' | 'pending' | 'alert';
  priority?: 'high' | 'medium' | 'low';
  details?: string;
}

// Sample mission data - replace with real-time data from your backend
const missionData: Mission[] = [
  {
    id: '1',
    time: '14:45',
    type: 'medication',
    title: 'Medication Delivered',
    location: 'Room 204',
    patient: 'Maria Popescu',
    status: 'completed',
    details: 'Insulin injection reminder'
  },
  {
    id: '2',
    time: '14:30',
    type: 'vitals',
    title: 'Vital Signs Check',
    location: 'Room 108',
    patient: 'Ion Rusu',
    status: 'in-progress',
    priority: 'high',
    details: 'Blood pressure and temperature'
  },
  {
    id: '3',
    time: '14:15',
    type: 'alert',
    title: 'Fall Detection Alert',
    location: 'Hallway B2',
    status: 'completed',
    priority: 'high',
    details: 'False alarm - patient dropped walking stick'
  },
  {
    id: '4',
    time: '14:00',
    type: 'assistance',
    title: 'Mobility Assistance',
    location: 'Dining Hall',
    patient: 'Ana Cojocaru',
    status: 'completed',
    details: 'Helped transfer to wheelchair'
  },
  {
    id: '5',
    time: '13:45',
    type: 'navigation',
    title: 'Autonomous Navigation',
    location: 'Floor 2 → Floor 1',
    status: 'completed',
    details: 'Elevator route optimization'
  },
  {
    id: '6',
    time: '13:30',
    type: 'medication',
    title: 'Scheduled Medication',
    location: 'Room 305',
    patient: 'Gheorghe Munteanu',
    status: 'pending',
    priority: 'medium',
    details: 'Scheduled for 15:30'
  }
];

const missionIcons: Record<MissionType, React.ReactNode> = {
  medication: <IconPill className='size-4' />,
  vitals: <IconActivityHeartbeat className='size-4' />,
  assistance: <IconUser className='size-4' />,
  navigation: <IconMapPin className='size-4' />,
  alert: <IconAlertCircle className='size-4' />
};

const statusColors = {
  completed: 'text-green-600 bg-green-50 dark:bg-green-950',
  'in-progress': 'text-blue-600 bg-blue-50 dark:bg-blue-950',
  pending: 'text-gray-600 bg-gray-50 dark:bg-gray-950',
  alert: 'text-red-600 bg-red-50 dark:bg-red-950'
};

const priorityBadges = {
  high: 'destructive',
  medium: 'secondary',
  low: 'outline'
} as const;

export function MissionLog() {
  return (
    <div className='space-y-4'>
      {/* Summary Stats */}
      <div className='flex items-center justify-between px-6 pt-4'>
        <div className='flex items-center gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <IconCircleCheck className='size-4 text-green-600' />
            <span className='font-medium'>12 Completed</span>
          </div>
          <div className='flex items-center gap-2'>
            <IconClock className='size-4 text-blue-600' />
            <span className='font-medium'>3 Active</span>
          </div>
          <div className='flex items-center gap-2'>
            <IconAlertCircle className='size-4 text-red-600' />
            <span className='font-medium'>1 Alert</span>
          </div>
        </div>
        <Badge variant='outline' className='gap-1'>
          <IconRobot className='size-3' />
          Auto-logging
        </Badge>
      </div>

      {/* Mission List */}
      <ScrollArea className='h-[400px] px-6 pb-4'>
        <div className='space-y-3'>
          {missionData.map((mission) => (
            <div
              key={mission.id}
              className={cn(
                'relative rounded-lg border p-4 transition-all hover:shadow-sm',
                mission.status === 'alert' &&
                  'border-red-200 dark:border-red-900',
                mission.status === 'in-progress' &&
                  'border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20'
              )}
            >
              {/* Mission Header */}
              <div className='flex items-start justify-between gap-4'>
                <div className='flex items-start gap-3'>
                  <div
                    className={cn(
                      'rounded-full p-2',
                      statusColors[mission.status]
                    )}
                  >
                    {missionIcons[mission.type]}
                  </div>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-sm font-medium'>{mission.title}</h4>
                      {mission.priority && (
                        <Badge
                          variant={priorityBadges[mission.priority]}
                          className='h-5 text-xs'
                        >
                          {mission.priority}
                        </Badge>
                      )}
                    </div>
                    <div className='text-muted-foreground flex items-center gap-4 text-xs'>
                      <span className='flex items-center gap-1'>
                        <IconClock className='size-3' />
                        {mission.time}
                      </span>
                      {mission.location && (
                        <span className='flex items-center gap-1'>
                          <IconMapPin className='size-3' />
                          {mission.location}
                        </span>
                      )}
                      {mission.patient && (
                        <span className='flex items-center gap-1'>
                          <IconUser className='size-3' />
                          {mission.patient}
                        </span>
                      )}
                    </div>
                    {mission.details && (
                      <p className='text-muted-foreground mt-1 text-xs'>
                        {mission.details}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  variant={
                    mission.status === 'completed' ? 'default' : 'secondary'
                  }
                  className='text-xs'
                >
                  {mission.status}
                </Badge>
              </div>

              {/* Progress indicator for active missions */}
              {mission.status === 'in-progress' && (
                <div className='mt-3'>
                  <div className='bg-secondary h-1 w-full rounded-full'>
                    <div className='bg-primary h-1 w-2/3 animate-pulse rounded-full' />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
