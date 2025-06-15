import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import {
  IconBattery,
  IconBattery1,
  IconBattery2,
  IconBattery3,
  IconBattery4,
  IconActivityHeartbeat,
  IconWifi,
  IconWifiOff,
  IconAlertTriangle,
  IconCircleCheck,
  IconHome,
  IconMedicalCross,
  IconClock,
  IconMapPin,
  IconTemperature,
  IconDroplets,
  IconShieldCheck,
  IconRobot
} from '@tabler/icons-react';
import React from 'react';

export default function ServantBotDashboard({
  mission_log,
  sensor_data,
  health_monitor,
  location_map
}: {
  mission_log: React.ReactNode;
  sensor_data: React.ReactNode;
  health_monitor: React.ReactNode;
  location_map: React.ReactNode;
}) {
  // Helper function to get battery icon based on level
  const getBatteryIcon = (level: number) => {
    if (level > 75) return <IconBattery4 className='size-5 text-green-500' />;
    if (level > 50) return <IconBattery3 className='size-5 text-yellow-500' />;
    if (level > 25) return <IconBattery2 className='size-5 text-orange-500' />;
    if (level > 10) return <IconBattery1 className='size-5 text-red-500' />;
    return <IconBattery className='size-5 animate-pulse text-red-500' />;
  };

  // Simulated real-time data (replace with actual IoT data)
  const batteryLevel = 78;
  const isConnected = true;
  const currentMode = 'Healthcare';
  const activeAlerts = 0;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Header with Bot Status */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <IconRobot className='text-primary size-8' />
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                ServantBot Control Center
              </h2>
              <p className='text-muted-foreground text-sm'>
                Unit ID: SB-MD-001 | Chisinau Assisted Living Facility
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Badge
              variant={isConnected ? 'default' : 'destructive'}
              className='gap-1'
            >
              {isConnected ? (
                <IconWifi className='size-3' />
              ) : (
                <IconWifiOff className='size-3' />
              )}
              {isConnected ? 'Connected' : 'Offline'}
            </Badge>
            <Badge variant='outline' className='gap-1'>
              {currentMode === 'Healthcare' ? (
                <IconMedicalCross className='size-3' />
              ) : (
                <IconHome className='size-3' />
              )}
              {currentMode} Mode
            </Badge>
          </div>
        </div>

        {/* Critical Status Cards */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* Battery Status */}
          <Card className='@container/card border-l-4 border-l-green-500'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconBattery className='size-4' />
                Battery Status
              </CardDescription>
              <CardTitle className='flex items-center gap-3 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {batteryLevel}%{getBatteryIcon(batteryLevel)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline' className='text-xs'>
                  ~4.5 hrs remaining
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-sm'>
              <div className='font-medium text-green-600'>
                Optimal Performance
              </div>
              <div className='text-muted-foreground text-xs'>
                Charging dock: 15m away
              </div>
            </CardFooter>
          </Card>

          {/* Active Missions */}
          <Card className='@container/card border-l-4 border-l-blue-500'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconActivityHeartbeat className='size-4' />
                Active Missions
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                3 / 12
              </CardTitle>
              <CardAction>
                <Badge variant='outline' className='text-xs'>
                  25% Complete
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-sm'>
              <div className='font-medium'>Medication Delivery: Room 204</div>
              <div className='text-muted-foreground text-xs'>
                Next: Vitals check at 14:30
              </div>
            </CardFooter>
          </Card>

          {/* System Alerts */}
          <Card className='@container/card border-l-4 border-l-green-500'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconShieldCheck className='size-4' />
                System Status
              </CardDescription>
              <CardTitle className='flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl'>
                {activeAlerts === 0 ? (
                  <>
                    <IconCircleCheck className='size-6 text-green-500' />
                    All Clear
                  </>
                ) : (
                  <>
                    <IconAlertTriangle className='size-6 text-yellow-500' />
                    {activeAlerts} Alerts
                  </>
                )}
              </CardTitle>
              <CardAction>
                <Badge variant='outline' className='text-xs'>
                  Last check: 2m ago
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-sm'>
              <div className='font-medium text-green-600'>
                All systems operational
              </div>
              <div className='text-muted-foreground text-xs'>
                Next maintenance: 72 hrs
              </div>
            </CardFooter>
          </Card>

          {/* Environmental Status */}
          <Card className='@container/card border-l-4 border-l-purple-500'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconHome className='size-4' />
                Environment
              </CardDescription>
              <CardTitle className='flex items-center justify-between text-xl font-semibold'>
                <span className='flex items-center gap-2'>
                  <IconTemperature className='size-5' />
                  22°C
                </span>
                <span className='flex items-center gap-2'>
                  <IconDroplets className='size-5' />
                  45%
                </span>
              </CardTitle>
              <CardAction>
                <Badge variant='outline' className='text-xs'>
                  Optimal
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-sm'>
              <div className='font-medium'>Floor 2, Wing A</div>
              <div className='text-muted-foreground text-xs'>
                Air quality: Excellent
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Mission Progress Cards */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='col-span-1'>
            <CardHeader className='pb-3'>
              <CardDescription>Daily Tasks</CardDescription>
              <CardTitle>24 / 48</CardTitle>
            </CardHeader>
            <CardFooter>
              <div className='flex w-full items-center gap-2'>
                <div className='bg-secondary h-2 w-full rounded-full'>
                  <div className='bg-primary h-2 w-1/2 rounded-full' />
                </div>
                <span className='text-sm font-medium'>50%</span>
              </div>
            </CardFooter>
          </Card>

          <Card className='col-span-1'>
            <CardHeader className='pb-3'>
              <CardDescription>Patient Interactions</CardDescription>
              <CardTitle>18</CardTitle>
            </CardHeader>
            <CardFooter>
              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                <IconClock className='size-4' />
                Last: 12 min ago
              </div>
            </CardFooter>
          </Card>

          <Card className='col-span-1'>
            <CardHeader className='pb-3'>
              <CardDescription>Distance Traveled</CardDescription>
              <CardTitle>2.4 km</CardTitle>
            </CardHeader>
            <CardFooter>
              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                <IconMapPin className='size-4' />
                Current: Room 204
              </div>
            </CardFooter>
          </Card>

          <Card className='col-span-1'>
            <CardHeader className='pb-3'>
              <CardDescription>Efficiency Score</CardDescription>
              <CardTitle>94%</CardTitle>
            </CardHeader>
            <CardFooter>
              <Badge variant='outline' className='gap-1'>
                <IconActivityHeartbeat className='size-3' />
                Excellent
              </Badge>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          {/* Mission Log - Full width on mobile, 4 cols on desktop */}
          <div className='col-span-1 md:col-span-2 lg:col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Mission Log</CardTitle>
                <CardDescription>
                  Real-time activity and task completion
                </CardDescription>
              </CardHeader>
              {mission_log}
            </Card>
          </div>

          {/* Location Map - 3 cols */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Live Location</CardTitle>
                <CardDescription>
                  Current position and navigation path
                </CardDescription>
              </CardHeader>
              {location_map}
            </Card>
          </div>

          {/* Sensor Data - 4 cols */}
          <div className='col-span-1 md:col-span-2 lg:col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Sensor Readings</CardTitle>
                <CardDescription>
                  Proximity, obstacle detection, and navigation sensors
                </CardDescription>
              </CardHeader>
              {sensor_data}
            </Card>
          </div>

          {/* Health Monitoring - 3 cols */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Patient Health Metrics</CardTitle>
                <CardDescription>
                  Vital signs and health monitoring data
                </CardDescription>
              </CardHeader>
              {health_monitor}
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
