import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCellComponent } from '../game-cell/game-cell.component';
import { Cell } from '../../models/game.types';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, GameCellComponent],
  template: `
    <div class="d-flex flex-column align-items-center mb-3">
      <div *ngFor="let row of rows" class="d-flex">
        <!-- Pasamos el valor de cada celda como input 'cell'.
             Escuchamos el evento 'clicked' del hijo y emitimos 'cellClick'
             hacia AppComponent con el índice calculado. -->
        <app-game-cell
          *ngFor="let col of cols"
          [cell]="board()[row * 3 + col]"
          (clicked)="cellClick.emit(row * 3 + col)"
        />
      </div>
    </div>

    <div class="text-center mb-3">
      <!-- [ngClass] aplica la clase Bootstrap del badge dinámicamente según el estado. -->
      <span class="badge fs-5 px-4 py-2" [ngClass]="statusClass()">
        {{ statusMessage() }}
      </span>
    </div>
  `,
})
export class GameBoardComponent {
  // 'board': array de 9 posiciones con los valores actuales del tablero.
  board = input.required<Cell[]>();
  // 'statusMessage': texto informativo del turno o resultado.
  statusMessage = input.required<string>();
  // 'statusClass': clase Bootstrap del badge ('bg-primary', 'bg-danger', etc.).
  statusClass = input.required<string>();

  // Evento que sube el índice de la celda pulsada hasta AppComponent.
  cellClick = output<number>();

  rows = [0, 1, 2];
  cols = [0, 1, 2];
}
