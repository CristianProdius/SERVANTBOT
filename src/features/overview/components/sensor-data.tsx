'use client';

import {
  IconRadar,
  IconWifi,
  IconTemperature,
  IconDroplets,
  IconVolume,
  IconCamera,
  IconBrandSpeedtest,
  IconCompass,
  IconBarrierBlock,
  IconAlertTriangle,
  IconCircleCheck,
  IconActivity,
  IconEye,
  IconHandStop
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface SensorReading {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
  maxValue?: number;
  historicalData?: Array<{ time: string; value: number }>;
}

interface ObstacleData {
  direction: string;
  distance: number;
  type: 'wall' | 'person' | 'object' | 'clear';
}

// Simulated sensor data - replace with real IoT data
const sensorReadings: SensorReading[] = [
  {
    id: 'proximity-front',
    name: 'Front Proximity',
    value: 2.4,
    unit: 'm',
    status: 'normal',
    icon: <IconRadar className='size-4' />,
    maxValue: 5,
    historicalData: [
      { time: '10s', value: 3.2 },
      { time: '8s', value: 2.8 },
      { time: '6s', value: 2.5 },
      { time: '4s', value: 2.4 },
      { time: '2s', value: 2.4 },
      { time: 'now', value: 2.4 }
    ]
  },
  {
    id: 'proximity-rear',
    name: 'Rear Proximity',
    value: 3.8,
    unit: 'm',
    status: 'normal',
    icon: <IconRadar className='size-4' />,
    maxValue: 5
  },
  {
    id: 'ultrasonic-left',
    name: 'Left Ultrasonic',
    value: 0.8,
    unit: 'm',
    status: 'warning',
    icon: <IconActivity className='size-4' />,
    maxValue: 3
  },
  {
    id: 'ultrasonic-right',
    name: 'Right Ultrasonic',
    value: 1.2,
    unit: 'm',
    status: 'normal',
    icon: <IconActivity className='size-4' />,
    maxValue: 3
  },
  {
    id: 'cliff-detection',
    name: 'Cliff Detection',
    value: 'Safe',
    unit: '',
    status: 'normal',
    icon: <IconBarrierBlock className='size-4' />
  },
  {
    id: 'speed',
    name: 'Movement Speed',
    value: 0.5,
    unit: 'm/s',
    status: 'normal',
    icon: <IconBrandSpeedtest className='size-4' />,
    maxValue: 1.2
  },
  {
    id: 'gyroscope',
    name: 'Gyroscope',
    value: '0°',
    unit: '',
    status: 'normal',
    icon: <IconCompass className='size-4' />
  },
  {
    id: 'camera',
    name: 'Camera Feed',
    value: 'Active',
    unit: '',
    status: 'normal',
    icon: <IconCamera className='size-4' />
  }
];

// Environmental sensors
const environmentalSensors: SensorReading[] = [
  {
    id: 'temperature',
    name: 'Ambient Temp',
    value: 22.5,
    unit: '°C',
    status: 'normal',
    icon: <IconTemperature className='size-4' />,
    historicalData: [
      { time: '5m', value: 22.3 },
      { time: '4m', value: 22.4 },
      { time: '3m', value: 22.5 },
      { time: '2m', value: 22.6 },
      { time: '1m', value: 22.5 },
      { time: 'now', value: 22.5 }
    ]
  },
  {
    id: 'humidity',
    name: 'Humidity',
    value: 45,
    unit: '%',
    status: 'normal',
    icon: <IconDroplets className='size-4' />,
    maxValue: 100
  },
  {
    id: 'noise',
    name: 'Noise Level',
    value: 42,
    unit: 'dB',
    status: 'normal',
    icon: <IconVolume className='size-4' />,
    maxValue: 80
  },
  {
    id: 'wifi',
    name: 'WiFi Signal',
    value: -45,
    unit: 'dBm',
    status: 'normal',
    icon: <IconWifi className='size-4' />
  }
];

// Obstacle detection radar
const obstacleData: ObstacleData[] = [
  { direction: 'Front', distance: 2.4, type: 'clear' },
  { direction: 'Front-Right', distance: 1.8, type: 'wall' },
  { direction: 'Right', distance: 1.2, type: 'wall' },
  { direction: 'Rear-Right', distance: 3.5, type: 'clear' },
  { direction: 'Rear', distance: 3.8, type: 'clear' },
  { direction: 'Rear-Left', distance: 2.2, type: 'object' },
  { direction: 'Left', distance: 0.8, type: 'person' },
  { direction: 'Front-Left', distance: 1.5, type: 'object' }
];

const statusColors = {
  normal: 'text-green-600 bg-green-50 dark:bg-green-950',
  warning: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950',
  critical: 'text-red-600 bg-red-50 dark:bg-red-950'
};

const obstacleColors = {
  clear: 'fill-green-500',
  wall: 'fill-gray-400',
  person: 'fill-yellow-500',
  object: 'fill-blue-500'
};

export function SensorData() {
  // Calculate overall sensor health
  const totalSensors = sensorReadings.length + environmentalSensors.length;
  const normalSensors = [...sensorReadings, ...environmentalSensors].filter(
    (s) => s.status === 'normal'
  ).length;
  const sensorHealth = (normalSensors / totalSensors) * 100;

  return (
    <div className='space-y-4'>
      {/* Sensor Health Overview */}
      <div className='flex items-center justify-between px-6 pt-4'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <IconActivity className='text-primary size-4' />
            <span className='text-sm font-medium'>Sensor Array Status</span>
          </div>
          <div className='text-muted-foreground text-xs'>
            {normalSensors}/{totalSensors} sensors operational
          </div>
        </div>
        <Badge
          variant={sensorHealth === 100 ? 'default' : 'secondary'}
          className='gap-1'
        >
          {sensorHealth === 100 ? (
            <IconCircleCheck className='size-3' />
          ) : (
            <IconAlertTriangle className='size-3' />
          )}
          {sensorHealth.toFixed(0)}% Health
        </Badge>
      </div>

      {/* Obstacle Detection Radar */}
      <div className='mx-6 space-y-2 rounded-lg border p-4'>
        <h4 className='flex items-center gap-2 text-sm font-medium'>
          <IconEye className='size-4' />
          360° Obstacle Detection
        </h4>
        <div className='relative flex h-40 items-center justify-center'>
          <svg className='absolute h-full w-full' viewBox='-100 -100 200 200'>
            {/* Radar circles */}
            {[1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx='0'
                cy='0'
                r={i * 20}
                fill='none'
                stroke='currentColor'
                strokeWidth='0.5'
                opacity='0.2'
              />
            ))}

            {/* Direction lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1='0'
                y1='0'
                x2={80 * Math.cos(((angle - 90) * Math.PI) / 180)}
                y2={80 * Math.sin(((angle - 90) * Math.PI) / 180)}
                stroke='currentColor'
                strokeWidth='0.5'
                opacity='0.1'
              />
            ))}

            {/* Obstacle indicators */}
            {obstacleData.map((obstacle, i) => {
              const angle = i * 45;
              const distance = (obstacle.distance / 5) * 80; // Scale to radar size
              const x = distance * Math.cos(((angle - 90) * Math.PI) / 180);
              const y = distance * Math.sin(((angle - 90) * Math.PI) / 180);

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r='6'
                    className={obstacleColors[obstacle.type]}
                    opacity='0.8'
                  />
                  {obstacle.type === 'person' && (
                    <foreignObject x={x - 5} y={y - 5} width='10' height='10'>
                      <IconHandStop className='size-2.5 text-white' />
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* Center bot */}
            <circle cx='0' cy='0' r='8' className='fill-primary' />
            <circle
              cx='0'
              cy='0'
              r='4'
              className='fill-white dark:fill-gray-900'
            />
          </svg>
        </div>
        <div className='flex items-center justify-center gap-4 text-xs'>
          <div className='flex items-center gap-1'>
            <div className='h-3 w-3 rounded-full bg-green-500' />
            <span>Clear</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='h-3 w-3 rounded-full bg-yellow-500' />
            <span>Person</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='h-3 w-3 rounded-full bg-blue-500' />
            <span>Object</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='h-3 w-3 rounded-full bg-gray-400' />
            <span>Wall</span>
          </div>
        </div>
      </div>

      {/* Navigation Sensors */}
      <div className='space-y-3 px-6'>
        <h4 className='text-sm font-medium'>Navigation Sensors</h4>
        <div className='grid grid-cols-2 gap-3'>
          {sensorReadings.map((sensor) => (
            <div key={sensor.id} className='space-y-2 rounded-lg border p-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className={cn('rounded p-1', statusColors[sensor.status])}
                  >
                    {sensor.icon}
                  </div>
                  <span className='text-xs font-medium'>{sensor.name}</span>
                </div>
                <Badge variant='outline' className='text-xs'>
                  {sensor.value}
                  {sensor.unit}
                </Badge>
              </div>

              {sensor.maxValue && typeof sensor.value === 'number' && (
                <Progress
                  value={(sensor.value / sensor.maxValue) * 100}
                  className='h-1.5'
                />
              )}

              {sensor.historicalData && (
                <div className='h-12 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={sensor.historicalData}>
                      <Line
                        type='monotone'
                        dataKey='value'
                        stroke='rgb(59, 130, 246)'
                        strokeWidth={1.5}
                        dot={false}
                      />
                      <YAxis hide />
                      <XAxis hide />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload[0]) {
                            return (
                              <div className='bg-background/95 rounded border px-2 py-1 text-xs'>
                                {payload[0].value}
                                {sensor.unit}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Sensors */}
      <div className='space-y-3 px-6 pb-4'>
        <h4 className='text-sm font-medium'>Environmental Sensors</h4>
        <div className='grid grid-cols-2 gap-3'>
          {environmentalSensors.map((sensor) => (
            <div key={sensor.id} className='space-y-2 rounded-lg border p-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className={cn('rounded p-1', statusColors[sensor.status])}
                  >
                    {sensor.icon}
                  </div>
                  <span className='text-xs font-medium'>{sensor.name}</span>
                </div>
                <Badge variant='outline' className='text-xs'>
                  {sensor.value}
                  {sensor.unit}
                </Badge>
              </div>

              {sensor.maxValue && typeof sensor.value === 'number' && (
                <Progress
                  value={(sensor.value / sensor.maxValue) * 100}
                  className='h-1.5'
                />
              )}

              {sensor.historicalData && (
                <div className='h-12 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={sensor.historicalData}>
                      <Line
                        type='monotone'
                        dataKey='value'
                        stroke='rgb(34, 197, 94)'
                        strokeWidth={1.5}
                        dot={false}
                      />
                      <YAxis hide />
                      <XAxis hide />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload[0]) {
                            return (
                              <div className='bg-background/95 rounded border px-2 py-1 text-xs'>
                                {payload[0].value}
                                {sensor.unit}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
