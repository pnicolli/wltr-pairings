import event from '@/lib/event.json';
import { generateTeams } from '@/lib/teams';
import { generatePairings } from '@/lib/pairings';

export const metadata = {
  title: `${event.data.EventName} - Round ${event.data.CurrentRoundNumber}`,
};

export default function Pairings() {
  const { data } = event;
  const { teams } = generateTeams(data);
  const pairings = generatePairings(data, teams);

  return (
    <main>
      <h1 className="text-center text-2xl font-bold">
        {data.EventName} - Round {data.CurrentRoundNumber}
      </h1>
      <table>
        <thead>
          <tr>
            <th>Table</th>
            <th>Player 1</th>
            <th>Points</th>
            <th>Player 2</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {pairings.map((pairing, index) => (
            <tr key={index}>
              <td>{pairing.table}</td>
              <td>{pairing.player1}</td>
              <td>{pairing.puntiPlayer1}</td>
              <td>{pairing.player2}</td>
              <td>{pairing.puntiPlayer2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
