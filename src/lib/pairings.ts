import type event from './event.json';
import { type Team } from './teams';

export type Pairing = {
  table: number | null;
  player1: string;
  puntiPlayer1: number | '-';
  player2: string;
  puntiPlayer2: number | '-';
};

export function generatePairings(
  data: typeof event.data,
  teams: Record<string, Team>,
) {
  const currentRound = data.CurrentRoundNumber;
  const pairings: Pairing[] = [];

  data.MatchingTables.filter(
    (match) => match.RoundNumber === currentRound,
  ).forEach((match) => {
    if (match.GameByes1 === 1) {
      pairings.push({
        table: 0,
        player1: teams[match.Team1].PlayerName,
        puntiPlayer1: teams[match.Team1].MatchPoints,
        player2: 'BYE',
        puntiPlayer2: '-',
      });
    } else if (match.Player1 === null) {
      pairings.push({
        table: 0,
        player1: teams[match.Team1].PlayerName,
        puntiPlayer1: teams[match.Team1].MatchPoints,
        player2: 'LOSS',
        puntiPlayer2: '-',
      });
    } else if (match.Team2 !== undefined) {
      pairings.push({
        table: match.Number,
        player1: teams[match.Team1].PlayerName,
        puntiPlayer1: teams[match.Team1].MatchPoints,
        player2: teams[match.Team2].PlayerName,
        puntiPlayer2: teams[match.Team2].MatchPoints,
      });
      pairings.push({
        table: match.Number,
        player1: teams[match.Team2].PlayerName,
        puntiPlayer1: teams[match.Team2].MatchPoints,
        player2: teams[match.Team1].PlayerName,
        puntiPlayer2: teams[match.Team1].MatchPoints,
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
