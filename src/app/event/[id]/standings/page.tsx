import event from '@/lib/event.json';
import { generateStandings } from '@/lib/standings';
import { columns } from '@/components/standings/columns';
import H1 from '@/components/H1/H1';
import DataTable from '@/components/Table/DataTable';

export const metadata = {
  title: `Round ${event.data.CurrentRoundNumber} Standings - ${event.data.EventName}`,
};

export default function Standings() {
  const { data } = event;
  const standings = generateStandings(data);

  return (
    <main className="px-2">
      <H1>
        Round {data.CurrentRoundNumber} Standings - {data.EventName}
      </H1>
      <DataTable columns={columns} data={standings} />
    </main>
  );
}
