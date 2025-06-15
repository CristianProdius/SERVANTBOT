import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ServantBotListingPage from '@/features/servantbot/components/servantbot-listing-page';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconRobot, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'ServantBot Fleet Management'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='ServantBot Fleet'
            description='Monitor and manage your IoT-enabled robotic assistants across all facilities.'
          />
          <div className='flex gap-2'>
            <Link
              href=''
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <IconPlus className='mr-2 h-4 w-4' /> Deploy New Bot
            </Link>
          </div>
        </div>
        <Separator />

        {/* Fleet Statistics */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Active Bots
                </p>
                <p className='text-2xl font-bold'>12</p>
              </div>
              <IconRobot className='h-8 w-8 text-green-500' />
            </div>
            <p className='text-muted-foreground mt-2 text-xs'>
              <span className='text-green-600'>+2</span> from last month
            </p>
          </div>

          <div className='rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Tasks Today
                </p>
                <p className='text-2xl font-bold'>248</p>
              </div>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950'>
                <span className='text-sm font-medium text-blue-600'>94%</span>
              </div>
            </div>
            <p className='text-muted-foreground mt-2 text-xs'>
              236 completed, 12 in progress
            </p>
          </div>

          <div className='rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Patients Served
                </p>
                <p className='text-2xl font-bold'>186</p>
              </div>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950'>
                <span className='text-sm font-medium text-purple-600'>
                  ↑12%
                </span>
              </div>
            </div>
            <p className='text-muted-foreground mt-2 text-xs'>
              Across 3 facilities
            </p>
          </div>

          <div className='rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  System Health
                </p>
                <p className='text-2xl font-bold'>98%</p>
              </div>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-950'>
                <span className='text-xs font-medium text-green-600'>Good</span>
              </div>
            </div>
            <p className='text-muted-foreground mt-2 text-xs'>
              1 bot scheduled for maintenance
            </p>
          </div>
        </div>

        {/* ServantBot Table */}
        <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={8} rowCount={10} filterCount={3} />
          }
        >
          <ServantBotListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
