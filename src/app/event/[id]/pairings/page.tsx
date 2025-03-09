import event from '@/lib/event.json';
import { generateTeams } from '@/lib/teams';
import { generatePairings } from '@/lib/pairings';
import { columns } from '@/components/pairings/columns';
import H1 from '@/components/H1/H1';
import DataTable from '@/components/Table/DataTable';

export const metadata = {
  title: `Round ${event.data.CurrentRoundNumber} Pairings - ${event.data.EventName}`,
};

export default function Pairings() {
  const { data } = event;
  const { teams } = generateTeams(data);
  const pairings = generatePairings(data, teams);

  return (
    <main className="px-2">
      <H1>
        Round {data.CurrentRoundNumber} Pairings - {data.EventName}
      </H1>
      <DataTable columns={columns} data={pairings} />
    </main>
  );
}
