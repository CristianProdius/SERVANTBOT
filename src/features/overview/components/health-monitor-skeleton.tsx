import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function HealthMonitorSkeleton() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-[160px]' />
        <Skeleton className='h-4 w-[240px]' />
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Patient Info Skeleton */}
        <div className='space-y-3'>
          <div className='flex items-start justify-between'>
            <div className='flex items-start gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-3 w-16' />
                  <Skeleton className='h-3 w-12' />
                  <Skeleton className='h-3 w-20' />
                </div>
              </div>
            </div>
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>

          {/* Conditions */}
          <div className='flex items-center gap-2'>
            <Skeleton className='h-4 w-4' />
            <div className='flex gap-2'>
              <Skeleton className='h-5 w-24 rounded-full' />
              <Skeleton className='h-5 w-28 rounded-full' />
            </div>
          </div>

          {/* Next Medication */}
          <div className='rounded-lg border p-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-28' />
              </div>
              <Skeleton className='h-4 w-12' />
            </div>
          </div>
        </div>

        {/* Vital Signs Skeleton */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-36' />
            <Skeleton className='h-3 w-24' />
          </div>

          {/* Vital Cards */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='space-y-3 rounded-lg border p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-6 w-16' />
                      <Skeleton className='h-5 w-16 rounded-full' />
                    </div>
                  </div>
                </div>
                <Skeleton className='h-3 w-32' />
              </div>
              <Skeleton className='h-16 w-full rounded' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
