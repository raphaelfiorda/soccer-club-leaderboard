export default function sortLeaderboard(array: [], tieBreaker: string[]) {
  // ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
  // Ordem para desempate
  // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
  const sortedArray = array
    .sort((a, b) => {
      switch (true) {
        case a[tieBreaker[0]] !== b[tieBreaker[0]]:
          return b[tieBreaker[0]] - a[tieBreaker[0]];
        case a[tieBreaker[1]] !== b[tieBreaker[1]]:
          return b[tieBreaker[1]] - a[tieBreaker[1]];
        case a[tieBreaker[2]] !== b[tieBreaker[2]]:
          return b[tieBreaker[2]] - a[tieBreaker[2]];
        case a[tieBreaker[3]] !== b[tieBreaker[3]]:
          return b[tieBreaker[3]] - a[tieBreaker[3]];
        default: return a[tieBreaker[4]] - b[tieBreaker[4]];
      }
    });

  return sortedArray;
}
