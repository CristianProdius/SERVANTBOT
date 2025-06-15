import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MissionLogSkeleton() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-[120px]' />
        <Skeleton className='h-4 w-[200px]' />
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Summary Stats Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='flex items-center gap-2'>
                <Skeleton className='size-4 rounded-full' />
                <Skeleton className='h-4 w-20' />
              </div>
            ))}
          </div>
          <Skeleton className='h-6 w-24 rounded-full' />
        </div>

        {/* Mission Items Skeleton */}
        <div className='space-y-3'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='rounded-lg border p-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex items-start gap-3'>
                  <Skeleton className='size-8 rounded-full' />
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-32' />
                      <Skeleton className='h-5 w-16 rounded-full' />
                    </div>
                    <div className='flex items-center gap-4'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-3 w-20' />
                      <Skeleton className='h-3 w-28' />
                    </div>
                    <Skeleton className='h-3 w-48' />
                  </div>
                </div>
                <Skeleton className='h-5 w-20 rounded-full' />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
