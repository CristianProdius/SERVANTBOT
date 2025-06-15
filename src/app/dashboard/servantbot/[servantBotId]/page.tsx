import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ServantBotViewPage from '@/features/servantbot/components/servantbot-view-page';

export const metadata = {
  title: 'Dashboard : ServantBot Configuration'
};

type PageProps = { params: Promise<{ servantBotId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ServantBotViewPage servantBotId={params.servantBotId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
