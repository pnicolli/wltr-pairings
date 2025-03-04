import type event from './event.json';

export type Team = (typeof event.data.Teams)[0] & { PlayerName: string };

export function generateTeams(data: typeof event.data) {
  const teams: Record<string, Team> = {};
  const players: Record<string, string> = {};

  data.Persons.forEach((player) => {
    players[player._id] = `${player.LastName} ${player.FirstName}`;
  });
  data.Teams.forEach((team) => {
    teams[team._id] = {
      ...team,
      PlayerName: players[team.Players[0]],
    };
  });

  return { teams, players };
}
