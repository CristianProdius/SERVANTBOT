'use client';

import {
  IconHeartbeat,
  IconActivity,
  IconTemperature,
  IconLungs,
  IconDroplets,
  IconAlertCircle,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconUser,
  IconClock,
  IconStethoscope,
  IconPill,
  IconBellRinging,
  IconCircleCheck
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
  Tooltip,
  ReferenceLine
} from 'recharts';

interface VitalSign {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  normalRange: { min: number; max: number };
  historicalData: Array<{ time: string; value: number }>;
}

interface Patient {
  id: string;
  name: string;
  room: string;
  age: number;
  lastCheck: string;
  nextMedication: string;
  alerts: number;
  conditions: string[];
}

// Current monitored patient
const currentPatient: Patient = {
  id: 'P-204',
  name: 'Maria Popescu',
  room: 'Room 204',
  age: 78,
  lastCheck: '15 min ago',
  nextMedication: '16:30',
  alerts: 0,
  conditions: ['Hypertension', 'Type 2 Diabetes']
};

// Vital signs data - replace with real patient monitoring data
const vitalSigns: VitalSign[] = [
  {
    id: 'heart-rate',
    name: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    status: 'normal',
    trend: 'stable',
    icon: <IconHeartbeat className='size-4' />,
    normalRange: { min: 60, max: 100 },
    historicalData: [
      { time: '30m', value: 68 },
      { time: '25m', value: 70 },
      { time: '20m', value: 71 },
      { time: '15m', value: 69 },
      { time: '10m', value: 73 },
      { time: '5m', value: 72 },
      { time: 'now', value: 72 }
    ]
  },
  {
    id: 'blood-pressure',
    name: 'Blood Pressure',
    value: 128,
    unit: 'mmHg',
    status: 'warning',
    trend: 'up',
    icon: <IconActivity className='size-4' />,
    normalRange: { min: 90, max: 120 },
    historicalData: [
      { time: '30m', value: 118 },
      { time: '25m', value: 120 },
      { time: '20m', value: 122 },
      { time: '15m', value: 125 },
      { time: '10m', value: 126 },
      { time: '5m', value: 127 },
      { time: 'now', value: 128 }
    ]
  },
  {
    id: 'oxygen',
    name: 'Blood Oxygen',
    value: 97,
    unit: '%',
    status: 'normal',
    trend: 'stable',
    icon: <IconLungs className='size-4' />,
    normalRange: { min: 95, max: 100 },
    historicalData: [
      { time: '30m', value: 96 },
      { time: '25m', value: 97 },
      { time: '20m', value: 96 },
      { time: '15m', value: 97 },
      { time: '10m', value: 98 },
      { time: '5m', value: 97 },
      { time: 'now', value: 97 }
    ]
  },
  {
    id: 'temperature',
    name: 'Body Temperature',
    value: 36.8,
    unit: '°C',
    status: 'normal',
    trend: 'stable',
    icon: <IconTemperature className='size-4' />,
    normalRange: { min: 36.1, max: 37.2 },
    historicalData: [
      { time: '30m', value: 36.7 },
      { time: '25m', value: 36.7 },
      { time: '20m', value: 36.8 },
      { time: '15m', value: 36.8 },
      { time: '10m', value: 36.9 },
      { time: '5m', value: 36.8 },
      { time: 'now', value: 36.8 }
    ]
  },
  {
    id: 'glucose',
    name: 'Blood Glucose',
    value: 112,
    unit: 'mg/dL',
    status: 'normal',
    trend: 'down',
    icon: <IconDroplets className='size-4' />,
    normalRange: { min: 70, max: 140 },
    historicalData: [
      { time: '2h', value: 145 },
      { time: '1.5h', value: 138 },
      { time: '1h', value: 128 },
      { time: '45m', value: 120 },
      { time: '30m', value: 115 },
      { time: '15m', value: 113 },
      { time: 'now', value: 112 }
    ]
  },
  {
    id: 'respiratory',
    name: 'Respiratory Rate',
    value: 16,
    unit: 'rpm',
    status: 'normal',
    trend: 'stable',
    icon: <IconLungs className='size-4' />,
    normalRange: { min: 12, max: 20 },
    historicalData: [
      { time: '30m', value: 15 },
      { time: '25m', value: 16 },
      { time: '20m', value: 15 },
      { time: '15m', value: 16 },
      { time: '10m', value: 17 },
      { time: '5m', value: 16 },
      { time: 'now', value: 16 }
    ]
  }
];

const statusColors = {
  normal: 'text-green-600 bg-green-50 dark:bg-green-950',
  warning: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950',
  critical: 'text-red-600 bg-red-50 dark:bg-red-950'
};

const trendIcons = {
  up: <IconTrendingUp className='size-3' />,
  down: <IconTrendingDown className='size-3' />,
  stable: <IconMinus className='size-3' />
};

const getChartColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'rgb(34, 197, 94)';
    case 'warning':
      return 'rgb(250, 204, 21)';
    case 'critical':
      return 'rgb(239, 68, 68)';
    default:
      return 'rgb(59, 130, 246)';
  }
};

export function HealthMonitor() {
  // Calculate overall health score
  const normalVitals = vitalSigns.filter((v) => v.status === 'normal').length;
  const healthScore = (normalVitals / vitalSigns.length) * 100;

  return (
    <div className='space-y-4'>
      {/* Patient Info Header */}
      <div className='space-y-3 px-6 pt-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start gap-3'>
            <div className='bg-primary/10 rounded-full p-2'>
              <IconUser className='text-primary size-5' />
            </div>
            <div className='space-y-1'>
              <h3 className='text-sm font-medium'>{currentPatient.name}</h3>
              <div className='text-muted-foreground flex items-center gap-3 text-xs'>
                <span>{currentPatient.room}</span>
                <span>Age: {currentPatient.age}</span>
                <span className='flex items-center gap-1'>
                  <IconClock className='size-3' />
                  {currentPatient.lastCheck}
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant={currentPatient.alerts === 0 ? 'default' : 'destructive'}
            className='gap-1'
          >
            {currentPatient.alerts === 0 ? (
              <>
                <IconCircleCheck className='size-3' />
                Stable
              </>
            ) : (
              <>
                <IconAlertCircle className='size-3' />
                {currentPatient.alerts} Alerts
              </>
            )}
          </Badge>
        </div>

        {/* Medical Conditions */}
        <div className='flex items-center gap-2'>
          <IconStethoscope className='text-muted-foreground size-4' />
          <div className='flex gap-2'>
            {currentPatient.conditions.map((condition) => (
              <Badge key={condition} variant='secondary' className='text-xs'>
                {condition}
              </Badge>
            ))}
          </div>
        </div>

        {/* Next Medication Alert */}
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/20'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <IconPill className='size-4 text-blue-600' />
              <span className='text-sm font-medium'>Next Medication</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconBellRinging className='size-4 text-blue-600' />
              <span className='text-sm font-medium'>
                {currentPatient.nextMedication}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className='space-y-3 px-6 pb-4'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-medium'>Vital Signs Monitoring</h4>
          <div className='text-muted-foreground text-xs'>
            Health Score: {healthScore.toFixed(0)}%
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3'>
          {vitalSigns.map((vital) => (
            <div
              key={vital.id}
              className={cn(
                'space-y-3 rounded-lg border p-4',
                vital.status === 'warning' &&
                  'border-yellow-200 dark:border-yellow-800',
                vital.status === 'critical' &&
                  'border-red-200 dark:border-red-800'
              )}
            >
              {/* Vital Header */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div
                    className={cn(
                      'rounded-full p-2',
                      statusColors[vital.status]
                    )}
                  >
                    {vital.icon}
                  </div>
                  <div>
                    <h5 className='text-sm font-medium'>{vital.name}</h5>
                    <div className='mt-1 flex items-center gap-2'>
                      <span className='text-xl font-semibold'>
                        {vital.value}
                        <span className='text-muted-foreground ml-1 text-sm font-normal'>
                          {vital.unit}
                        </span>
                      </span>
                      <Badge variant='outline' className='gap-1 text-xs'>
                        {trendIcons[vital.trend]}
                        {vital.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-muted-foreground text-xs'>
                    Normal: {vital.normalRange.min}-{vital.normalRange.max}{' '}
                    {vital.unit}
                  </div>
                </div>
              </div>

              {/* Vital Chart */}
              <div className='h-16 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={vital.historicalData}>
                    <ReferenceLine
                      y={vital.normalRange.max}
                      stroke='currentColor'
                      strokeDasharray='3 3'
                      opacity={0.3}
                    />
                    <ReferenceLine
                      y={vital.normalRange.min}
                      stroke='currentColor'
                      strokeDasharray='3 3'
                      opacity={0.3}
                    />
                    <Line
                      type='monotone'
                      dataKey='value'
                      stroke={getChartColor(vital.status)}
                      strokeWidth={2}
                      dot={false}
                    />
                    <XAxis dataKey='time' hide />
                    <YAxis
                      domain={[
                        vital.normalRange.min -
                          (vital.normalRange.max - vital.normalRange.min) * 0.1,
                        vital.normalRange.max +
                          (vital.normalRange.max - vital.normalRange.min) * 0.1
                      ]}
                      hide
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          return (
                            <div className='bg-background/95 rounded border px-2 py-1 text-xs'>
                              <div>
                                {payload[0].payload.time}: {payload[0].value}
                                {vital.unit}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
