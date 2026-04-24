import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Cell, Score } from '../models/game.types';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { GameControlsComponent } from '../components/game-controls/game-controls.component';
import { GameScoreboardComponent } from '../components/game-scoreboard/game-scoreboard.component';

const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, GameBoardComponent, GameControlsComponent, GameScoreboardComponent],
  template: `
    <div class="container py-4">
      <div class="text-end mb-2">
        <a routerLink="/about" class="text-muted small">Acerca de</a>
      </div>

      <h1 class="text-center mb-1">Tres en Raya</h1>
      <p class="text-center text-muted mb-4">
        <a href="https://angular.dev" target="_blank" rel="noopener noreferrer">Angular 21</a>
      </p>

      <app-game-board
        [board]="board()"
        [statusMessage]="statusMessage()"
        [statusClass]="statusClass()"
        (cellClick)="handleClick($event)"
      />

      <app-game-controls
        (newGame)="newGame()"
        (resetScore)="resetScore()"
      />

      <app-game-scoreboard [score]="score()" />
    </div>
  `,
})
export class HomeComponent {
  private storage = inject(StorageService);

  board = signal<Cell[]>(Array(9).fill(null));
  currentPlayer = signal<'X' | 'O'>('X');
  gameOver = signal(false);
  winner = signal<'X' | 'O' | null>(null);
  score = signal<Score>(this.storage.get<Score>('tictactoe-score', { X: 0, O: 0, draws: 0 }));

  statusMessage = computed(() => {
    if (this.winner()) return `¡Gana ${this.winner()}!`;
    if (this.gameOver()) return '¡Empate!';
    return `Turno de ${this.currentPlayer()}`;
  });

  statusClass = computed(() => {
    if (this.winner() === 'X') return 'bg-primary';
    if (this.winner() === 'O') return 'bg-danger';
    if (this.gameOver()) return 'bg-secondary';
    return this.currentPlayer() === 'X' ? 'bg-primary' : 'bg-danger';
  });

  private checkWinner(b: Cell[]): 'X' | 'O' | null {
    for (const [a, c, d] of WINNING_COMBINATIONS) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a] as 'X' | 'O';
    }
    return null;
  }

  handleClick(index: number): void {
    if (this.gameOver() || this.board()[index]) return;

    const newBoard = [...this.board()];
    newBoard[index] = this.currentPlayer();
    this.board.set(newBoard);

    const w = this.checkWinner(newBoard);
    if (w) {
      this.winner.set(w);
      this.gameOver.set(true);
      const newScore = { ...this.score(), [w]: this.score()[w] + 1 };
      this.score.set(newScore);
      this.storage.set('tictactoe-score', newScore);
    } else if (newBoard.every(Boolean)) {
      this.gameOver.set(true);
      const newScore = { ...this.score(), draws: this.score().draws + 1 };
      this.score.set(newScore);
      this.storage.set('tictactoe-score', newScore);
    } else {
      this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X');
    }
  }

  newGame(): void {
    this.board.set(Array(9).fill(null));
    this.currentPlayer.set('X');
    this.gameOver.set(false);
    this.winner.set(null);
  }

  resetScore(): void {
    const empty: Score = { X: 0, O: 0, draws: 0 };
    this.score.set(empty);
    this.storage.set('tictactoe-score', empty);
    this.newGame();
  }
}
