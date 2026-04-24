import { Component, input } from '@angular/core';
import { Score } from '../../models/game.types';

@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  template: `
    <!-- 'score' es un input de solo lectura para este componente.
         AppComponent actualiza la señal 'score' y Angular re-renderiza
         automáticamente este componente cuando cambia el valor. -->
    <div class="row justify-content-center g-3 text-center">
      <div class="col-auto">
        <div class="card" style="min-width: 110px;">
          <div class="card-body">
            <h5 class="card-title text-primary">X</h5>
            <p class="display-5 mb-0">{{ score().X }}</p>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <div class="card" style="min-width: 110px;">
          <div class="card-body">
            <h5 class="card-title text-secondary">Empates</h5>
            <p class="display-5 mb-0">{{ score().draws }}</p>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <div class="card" style="min-width: 110px;">
          <div class="card-body">
            <h5 class="card-title text-danger">O</h5>
            <p class="display-5 mb-0">{{ score().O }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GameScoreboardComponent {
  score = input.required<Score>();
}
