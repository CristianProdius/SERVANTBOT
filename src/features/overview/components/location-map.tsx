'use client';

import {
  IconMapPin,
  IconRobot,
  IconBed,
  IconPill,
  IconStairs,
  IconElevator,
  IconDoor,
  IconAlertTriangle,
  IconCircle,
  IconSquare,
  IconHexagon,
  IconTriangle,
  IconHome,
  IconMedicalCross,
  IconUsers
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
  type: 'patient' | 'common' | 'medical' | 'service' | 'corridor';
  occupied?: boolean;
  hasAlert?: boolean;
  coordinates: { x: number; y: number };
}

interface NavigationPath {
  from: string;
  to: string;
  progress: number;
  estimatedTime: number; // in seconds
}

// Sample facility layout data - replace with your actual floor plan
const facilityLayout: Room[] = [
  // Patient rooms
  {
    id: 'r204',
    name: 'Room 204',
    type: 'patient',
    occupied: true,
    coordinates: { x: 20, y: 20 }
  },
  {
    id: 'r205',
    name: 'Room 205',
    type: 'patient',
    occupied: true,
    coordinates: { x: 60, y: 20 }
  },
  {
    id: 'r206',
    name: 'Room 206',
    type: 'patient',
    occupied: false,
    coordinates: { x: 100, y: 20 }
  },
  {
    id: 'r207',
    name: 'Room 207',
    type: 'patient',
    occupied: true,
    hasAlert: true,
    coordinates: { x: 140, y: 20 }
  },

  // Common areas
  {
    id: 'dining',
    name: 'Dining Hall',
    type: 'common',
    coordinates: { x: 20, y: 80 }
  },
  {
    id: 'lounge',
    name: 'Lounge',
    type: 'common',
    coordinates: { x: 100, y: 80 }
  },

  // Medical areas
  {
    id: 'nurse',
    name: 'Nurse Station',
    type: 'medical',
    coordinates: { x: 80, y: 50 }
  },
  {
    id: 'med',
    name: 'Med Storage',
    type: 'medical',
    coordinates: { x: 120, y: 50 }
  },

  // Service areas
  {
    id: 'charge',
    name: 'Charging Dock',
    type: 'service',
    coordinates: { x: 160, y: 80 }
  },
  {
    id: 'elevator',
    name: 'Elevator',
    type: 'service',
    coordinates: { x: 80, y: 100 }
  }
];

// Current bot location and navigation
const currentBotLocation = { x: 85, y: 45 }; // Near nurse station
const navigationPath: NavigationPath = {
  from: 'nurse',
  to: 'r207',
  progress: 35,
  estimatedTime: 45
};

const roomTypeIcons = {
  patient: <IconBed className='size-3' />,
  common: <IconUsers className='size-3' />,
  medical: <IconMedicalCross className='size-3' />,
  service: <IconHome className='size-3' />,
  corridor: <IconSquare className='size-3' />
};

const roomTypeColors = {
  patient:
    'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
  common:
    'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
  medical:
    'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700',
  service:
    'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700',
  corridor:
    'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
};

export function LocationMap() {
  // Calculate path line coordinates
  const fromRoom = facilityLayout.find((r) => r.id === navigationPath.from);
  const toRoom = facilityLayout.find((r) => r.id === navigationPath.to);

  return (
    <div className='space-y-4'>
      {/* Status Bar */}
      <div className='flex items-center justify-between px-6 pt-4'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <IconMapPin className='text-primary size-4' />
            <span className='text-sm font-medium'>Floor 2, Wing A</span>
          </div>
          <div className='text-muted-foreground text-xs'>
            Last update: 5 seconds ago
          </div>
        </div>
        <Badge variant='default' className='gap-1'>
          <IconRobot className='size-3' />
          Navigating
        </Badge>
      </div>

      {/* Navigation Progress */}
      {navigationPath && (
        <div className='mx-6 space-y-2 rounded-lg border bg-blue-50 p-3 dark:bg-blue-950/20'>
          <div className='flex items-center justify-between text-sm'>
            <span className='font-medium'>
              {fromRoom?.name} → {toRoom?.name}
            </span>
            <span className='text-muted-foreground text-xs'>
              ETA: {navigationPath.estimatedTime}s
            </span>
          </div>
          <Progress value={navigationPath.progress} className='h-2' />
          {toRoom?.hasAlert && (
            <div className='flex items-center gap-2 text-xs text-red-600'>
              <IconAlertTriangle className='size-3' />
              Alert in destination room
            </div>
          )}
        </div>
      )}

      {/* Floor Map */}
      <div className='relative mx-6 h-[300px] overflow-hidden rounded-lg border bg-gray-50 dark:bg-gray-900/20'>
        <svg
          className='absolute inset-0 h-full w-full'
          viewBox='0 0 200 120'
          preserveAspectRatio='xMidYMid meet'
        >
          {/* Grid lines for reference */}
          <defs>
            <pattern
              id='grid'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 20 0 L 0 0 0 20'
                fill='none'
                stroke='currentColor'
                strokeWidth='0.5'
                opacity='0.1'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#grid)' />

          {/* Navigation Path Line */}
          {fromRoom && toRoom && (
            <line
              x1={fromRoom.coordinates.x + 10}
              y1={fromRoom.coordinates.y + 10}
              x2={toRoom.coordinates.x + 10}
              y2={toRoom.coordinates.y + 10}
              stroke='rgb(59, 130, 246)'
              strokeWidth='2'
              strokeDasharray='5,5'
              className='animate-pulse'
            />
          )}

          {/* Rooms */}
          {facilityLayout.map((room) => (
            <g key={room.id}>
              <rect
                x={room.coordinates.x}
                y={room.coordinates.y}
                width='20'
                height='20'
                rx='2'
                className={cn(
                  'stroke-2',
                  room.type === 'patient' && room.occupied
                    ? 'fill-blue-200 dark:fill-blue-800'
                    : 'fill-white dark:fill-gray-800',
                  room.type === 'common' &&
                    'fill-green-100 dark:fill-green-900',
                  room.type === 'medical' &&
                    'fill-purple-100 dark:fill-purple-900',
                  room.type === 'service' && 'fill-gray-100 dark:fill-gray-800',
                  room.hasAlert && 'animate-pulse stroke-red-500'
                )}
                stroke={room.hasAlert ? 'red' : 'currentColor'}
                strokeOpacity={0.3}
              />

              {/* Room Icons */}
              <foreignObject
                x={room.coordinates.x + 4}
                y={room.coordinates.y + 4}
                width='12'
                height='12'
              >
                <div className='flex h-full w-full items-center justify-center'>
                  {room.type === 'patient' && (
                    <IconBed className='size-3 text-blue-600' />
                  )}
                  {room.type === 'common' && (
                    <IconUsers className='size-3 text-green-600' />
                  )}
                  {room.type === 'medical' && (
                    <IconMedicalCross className='size-3 text-purple-600' />
                  )}
                  {room.type === 'service' && room.id === 'elevator' && (
                    <IconElevator className='size-3 text-gray-600' />
                  )}
                  {room.type === 'service' && room.id === 'charge' && (
                    <IconHome className='size-3 text-gray-600' />
                  )}
                </div>
              </foreignObject>

              {/* Room Labels */}
              <text
                x={room.coordinates.x + 10}
                y={room.coordinates.y - 5}
                textAnchor='middle'
                className='fill-current text-[8px] opacity-70'
              >
                {room.name}
              </text>
            </g>
          ))}

          {/* Bot Location */}
          <g className='animate-pulse'>
            <circle
              cx={currentBotLocation.x}
              cy={currentBotLocation.y}
              r='6'
              fill='rgb(59, 130, 246)'
              opacity='0.3'
            />
            <circle
              cx={currentBotLocation.x}
              cy={currentBotLocation.y}
              r='4'
              fill='rgb(59, 130, 246)'
            />
            <foreignObject
              x={currentBotLocation.x - 10}
              y={currentBotLocation.y - 10}
              width='20'
              height='20'
            >
              <div className='flex h-full w-full items-center justify-center'>
                <IconRobot className='size-5 text-white drop-shadow-lg' />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className='px-6 pb-4'>
        <div className='grid grid-cols-2 gap-2 text-xs'>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded border bg-blue-200 dark:bg-blue-800' />
            <span>Occupied Room</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded border bg-white dark:bg-gray-800' />
            <span>Empty Room</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded border bg-green-100 dark:bg-green-900' />
            <span>Common Area</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded border bg-purple-100 dark:bg-purple-900' />
            <span>Medical Station</span>
          </div>
        </div>
      </div>
    </div>
  );
}
