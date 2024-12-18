export type Classement = {
  team: string; // Nom de l'équipe
  rank: number; // Position dans le classement
  points: number; // Points accumulés
  games: number; // Nombre de matchs joués
  gamesWon: number; // Nombre de matchs gagnés
  gamesLost: number; // Nombre de matchs perdus
};

export type Match = {
  team1: string; // Nom de l'équipe 1
  team2: string; // Nom de l'équipe 2
  score1: number; // Score de l'équipe 1
  score2: number; // Score de l'équipe 2
};

export type Team = {
  id: number; // Identifiant de l'équipe
  group: string; // Groupe de l'équipe
  name: string; // Nom de l'équipe
};
