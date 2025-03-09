import type event from './event.json';

export type Standing = {
  rank: number;
  player1: string;
  matchPoints: number;
  opponentMatchWinPercentage: number;
  gameWinPercentage: number;
  opponentGameWinPercentage: number;
};

export function generateStandings(data: typeof event.data): Standing[] {
  // for (var i = 0; i < dati.Teams.length; i++) {
  //   for (var ii = 0; ii < dati.Persons.length; ii++) {
  //     if (dati.Persons[ii]._id == dati.Teams[i].Players[0]) {
  //       idTeam.push(dati.Teams[i]._id);
  //       giocatori.push(
  //         dati.Persons[ii].LastName + ' ' + dati.Persons[ii].FirstName,
  //       );
  //       break;
  //     }
  //   }
  // }
  const standings: Standing[] = data.Teams.map((team) => {
    const player = data.Persons.find(
      (person) => person._id === team.Players[0],
    );
    if (!player) {
      return null;
    }
    return {
      rank: team.Rank,
      player1: player.LastName + ' ' + player.FirstName,
      matchPoints: team.MatchPoints,
      opponentMatchWinPercentage: team.OpponentsGameWinPercent,
      gameWinPercentage: team.GameWinPercent,
      opponentGameWinPercentage: team.OpponentsGameWinPercent,
    };
  }).filter((standing) => standing !== null) as Standing[];

  standings.sort((a, b) => {
    return a.rank - b.rank;
  });

  return standings;
}
