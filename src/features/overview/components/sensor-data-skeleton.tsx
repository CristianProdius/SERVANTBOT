import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SensorDataSkeleton() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-[140px]' />
        <Skeleton className='h-4 w-[220px]' />
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Sensor Health Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-36' />
            <Skeleton className='h-3 w-32' />
          </div>
          <Skeleton className='h-6 w-24 rounded-full' />
        </div>

        {/* Radar Skeleton */}
        <div className='space-y-2 rounded-lg border p-4'>
          <Skeleton className='h-4 w-40' />
          <div className='relative flex h-40 items-center justify-center'>
            <Skeleton className='h-32 w-32 rounded-full' />
          </div>
          <div className='flex items-center justify-center gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='flex items-center gap-1'>
                <Skeleton className='h-3 w-3 rounded-full' />
                <Skeleton className='h-3 w-12' />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Sensors Skeleton */}
        <div className='space-y-3'>
          <Skeleton className='h-4 w-32' />
          <div className='grid grid-cols-2 gap-3'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='space-y-2 rounded-lg border p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-6 w-6 rounded' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                  <Skeleton className='h-5 w-12 rounded-full' />
                </div>
                <Skeleton className='h-1.5 w-full rounded-full' />
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Sensors Skeleton */}
        <div className='space-y-3'>
          <Skeleton className='h-4 w-36' />
          <div className='grid grid-cols-2 gap-3'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='space-y-2 rounded-lg border p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-6 w-6 rounded' />
                    <Skeleton className='h-3 w-20' />
                  </div>
                  <Skeleton className='h-5 w-16 rounded-full' />
                </div>
                <Skeleton className='h-1.5 w-full rounded-full' />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
