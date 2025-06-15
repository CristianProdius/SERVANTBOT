import { fakeServantBots, ServantBot } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ServantBotForm from './servantbot-form';

type TServantBotViewPageProps = {
  servantBotId: string;
};

export default async function ServantBotViewPage({
  servantBotId
}: TServantBotViewPageProps) {
  let servantBot = null;
  let pageTitle = 'Deploy New ServantBot';

  if (servantBotId !== 'new') {
    const data = await fakeServantBots.getServantBotById(servantBotId);
    servantBot = data.bot as ServantBot;
    if (!servantBot) {
      notFound();
    }
    pageTitle = `Configure ${servantBot.name}`;
  }

  return <ServantBotForm initialData={servantBot} pageTitle={pageTitle} />;
}
