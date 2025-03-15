import Form from 'next/form';
import event from '@/lib/event.json';
import H1 from '@/components/H1/H1';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type Team, generateTeams } from '@/lib/teams';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const metadata = {
  title: event.data.EventName,
};

export default async function Personal({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { data } = event;
  const { player } = await searchParams;
  const reversedRoundNumbers = [...new Array(data.CurrentRoundNumber)]
    .map((_, i) => i + 1)
    .reverse();
  const { teams } = generateTeams(data);

  let team: Team | undefined;
  if (player) {
    team = Object.values(teams).find((team) => team.PlayerName === player);
  }

  return (
    <main className="px-2">
      <H1>{data.EventName}</H1>
      <section aria-label="Search form">
        <Form action="personal" className="space-y-4 mb-4">
          <Label>
            Type your name:
            <Input
              list="nomiGiocatori"
              type="text"
              name="player"
              defaultValue={player}
            />
            <datalist id="nomiGiocatori">
              {Object.values(teams).map((team) => (
                <option key={team._id} value={team.PlayerName} />
              ))}
            </datalist>
          </Label>
          <Button variant="outline" type="submit">
            Search
          </Button>
        </Form>
      </section>

      {player && team && (
        <section aria-label="Search result">
          <div className="text-2xl mb-4">
            <p>Name: {player}</p>
            <p>Current Round: {data.CurrentRoundNumber}</p>
            <p>Points: {team.MatchPoints}</p>
            <p>Rank: {team.Rank}</p>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Round</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Opponent</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reversedRoundNumbers.map((roundNumber) => {
                  const matchAsTeam1 = data.MatchingTables.find(
                    (match) =>
                      match.RoundNumber === roundNumber &&
                      match.Team1 === team._id,
                  );
                  if (matchAsTeam1) {
                    if (matchAsTeam1.Player1 === null) {
                      return (
                        <TableRow key={roundNumber}>
                          <TableCell>{roundNumber}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>LOSS</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      );
                    }
                    if (
                      matchAsTeam1.Number === null &&
                      matchAsTeam1.GameByes1 === 1
                    ) {
                      return (
                        <TableRow key={roundNumber}>
                          <TableCell>{roundNumber}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>BYE</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      );
                    }
                    if (matchAsTeam1.Team2) {
                      if (roundNumber === data.CurrentRoundNumber) {
                        return (
                          <TableRow key={roundNumber}>
                            <TableCell>{roundNumber}</TableCell>
                            <TableCell>{matchAsTeam1.Number}</TableCell>
                            <TableCell>
                              {teams[matchAsTeam1.Team2].PlayerName}
                            </TableCell>
                            <TableCell>-</TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow key={roundNumber}>
                            <TableCell>{roundNumber}</TableCell>
                            <TableCell>{matchAsTeam1.Number}</TableCell>
                            <TableCell>
                              {teams[matchAsTeam1.Team2].PlayerName}
                            </TableCell>
                            <TableCell>
                              {matchAsTeam1.GameWins1}-{matchAsTeam1.GameWins2}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    }
                  }
                  const matchAsTeam2 = data.MatchingTables.find(
                    (match) =>
                      match.RoundNumber === roundNumber &&
                      match.Team2 === team._id,
                  );
                  if (matchAsTeam2) {
                    if (roundNumber === data.CurrentRoundNumber) {
                      return (
                        <TableRow key={roundNumber}>
                          <TableCell>{roundNumber}</TableCell>
                          <TableCell>{matchAsTeam2.Number}</TableCell>
                          <TableCell>
                            {teams[matchAsTeam2.Team1].PlayerName}
                          </TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      );
                    } else {
                      return (
                        <TableRow key={roundNumber}>
                          <TableCell>{roundNumber}</TableCell>
                          <TableCell>{matchAsTeam2.Number}</TableCell>
                          <TableCell>
                            {teams[matchAsTeam2.Team1].PlayerName}
                          </TableCell>
                          <TableCell>
                            {matchAsTeam2.GameWins2}-{matchAsTeam2.GameWins1}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </main>
  );
}
