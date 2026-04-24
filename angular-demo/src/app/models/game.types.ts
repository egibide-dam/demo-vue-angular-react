export type Cell = 'X' | 'O' | null;

export interface Score {
  X: number;
  O: number;
  draws: number;
}
