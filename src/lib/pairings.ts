import type event from './event.json';
import { type Team } from './teams';

export type Pairing = {
  table: number | null;
  player1: string;
  player1Points: number | '-';
  player2: string;
  player2Points: number | '-';
};

export function generatePairings(
  data: typeof event.data,
  teams: Record<string, Team>,
): Pairing[] {
  const currentRound = data.CurrentRoundNumber;
  const pairings: Pairing[] = [];

  data.MatchingTables.filter(
    (match) => match.RoundNumber === currentRound,
  ).forEach((match) => {
    if (match.GameByes1 === 1) {
      pairings.push({
        table: 0,
        player1: teams[match.Team1].PlayerName,
        player1Points: teams[match.Team1].MatchPoints,
        player2: 'BYE',
        player2Points: '-',
      });
    } else if (match.Player1 === null) {
      pairings.push({
        table: 0,
        player1: teams[match.Team1].PlayerName,
        player1Points: teams[match.Team1].MatchPoints,
        player2: 'LOSS',
        player2Points: '-',
      });
    } else if (match.Team2 !== undefined) {
      pairings.push({
        table: match.Number,
        player1: teams[match.Team1].PlayerName,
        player1Points: teams[match.Team1].MatchPoints,
        player2: teams[match.Team2].PlayerName,
        player2Points: teams[match.Team2].MatchPoints,
      });
      pairings.push({
        table: match.Number,
        player1: teams[match.Team2].PlayerName,
        player1Points: teams[match.Team2].MatchPoints,
        player2: teams[match.Team1].PlayerName,
        player2Points: teams[match.Team1].MatchPoints,
      });
    }
  });
  pairings.sort(function (a, b) {
    const nameA = a.player1.toUpperCase(); // ignore upper and lowercase
    const nameB = b.player1.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  return pairings;
}
