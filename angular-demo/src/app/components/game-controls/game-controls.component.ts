import { Component, output } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  template: `
    <div class="text-center mb-4">
      <!-- Al pulsar, emitimos 'newGame'. AppComponent escucha con (newGame)="newGame()". -->
      <button class="btn btn-success me-2" (click)="newGame.emit()">
        Nueva partida
      </button>
      <!-- Al pulsar, emitimos 'resetScore'. AppComponent escucha con (resetScore)="resetScore()". -->
      <button class="btn btn-outline-secondary" (click)="resetScore.emit()">
        Resetear marcador
      </button>
    </div>
  `,
})
export class GameControlsComponent {
  // Outputs sin payload: el componente no necesita enviar datos,
  // solo notificar al padre de que se ha producido una acción.
  newGame = output<void>();
  resetScore = output<void>();
}
