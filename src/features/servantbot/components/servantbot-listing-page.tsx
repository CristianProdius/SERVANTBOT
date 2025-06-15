import { ServantBot } from '@/constants/data';
import { fakeServantBots } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ServantBotTable } from './servantbot-tables';
import { columns } from './servantbot-tables/columns';

type ServantBotListingPage = {};

export default async function ServantBotListingPage({}: ServantBotListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const status = searchParamsCache.get('status');
  const facility = searchParamsCache.get('facility');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status }),
    ...(facility && { facility })
  };

  const data = await fakeServantBots.getServantBots(filters);
  const totalServantBots = data.total_bots;
  const servantBots: ServantBot[] = data.bots;

  return (
    <ServantBotTable
      data={servantBots}
      totalItems={totalServantBots}
      columns={columns}
    />
  );
}
