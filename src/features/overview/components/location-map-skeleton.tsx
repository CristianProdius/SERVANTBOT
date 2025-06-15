import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LocationMapSkeleton() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-[100px]' />
        <Skeleton className='h-4 w-[180px]' />
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Status Bar Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-24' />
          </div>
          <Skeleton className='h-6 w-20 rounded-full' />
        </div>

        {/* Navigation Progress Skeleton */}
        <div className='space-y-2 rounded-lg border p-3'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3 w-16' />
          </div>
          <Skeleton className='h-2 w-full rounded-full' />
        </div>

        {/* Map Skeleton */}
        <div className='relative h-[300px] overflow-hidden rounded-lg border bg-gray-50 dark:bg-gray-900/20'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='space-y-4 text-center'>
              <Skeleton className='mx-auto h-12 w-12 rounded-full' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </div>

        {/* Legend Skeleton */}
        <div className='grid grid-cols-2 gap-2'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4 rounded' />
              <Skeleton className='h-3 w-20' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
