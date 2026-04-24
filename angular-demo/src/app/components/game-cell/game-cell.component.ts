import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cell } from '../../models/game.types';

@Component({
  selector: 'app-game-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Emitimos el evento 'clicked' al padre cuando el usuario pulsa la celda.
         El padre (GameBoard) añadirá el índice y re-emitirá hacia AppComponent. -->
    <button
      class="btn m-1 fw-bold fs-2"
      [ngClass]="cellClass()"
      style="width: 90px; height: 90px;"
      (click)="clicked.emit()"
    >
      {{ cell() }}
    </button>
  `,
})
export class GameCellComponent {
  // input() es la API de señales de Angular 21 para recibir datos del padre.
  // 'cell' recibe el valor de la casilla: 'X', 'O' o null.
  cell = input<Cell>(null);

  // output() declara un evento que este componente puede emitir hacia el padre.
  // El padre escucha con (clicked)="onCellClicked(i)".
  clicked = output<void>();

  cellClass = computed(() => {
    if (!this.cell()) return 'btn-outline-secondary';
    return this.cell() === 'X' ? 'btn-primary' : 'btn-danger';
  });
}
