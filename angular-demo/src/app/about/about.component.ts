import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container py-4">
      <div class="text-end mb-2">
        <a routerLink="/" class="text-muted small">← Inicio</a>
      </div>

      <h1 class="text-center mb-1">Acerca de</h1>
      <p class="text-center text-muted mb-5">
        <a href="https://angular.dev" target="_blank" rel="noopener noreferrer">Angular 21</a>
      </p>

      <div class="row justify-content-center">
        <div class="col-lg-8">

          <div class="card mb-4">
            <div class="card-header fw-bold">Tecnologías</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Framework:</strong> Angular 21</li>
              <li class="list-group-item"><strong>Lenguaje:</strong> TypeScript</li>
              <li class="list-group-item"><strong>Bundler:</strong> Angular CLI (@angular/build)</li>
              <li class="list-group-item"><strong>Router:</strong> Angular Router con componentes standalone</li>
              <li class="list-group-item"><strong>Estilos:</strong> Bootstrap 5</li>
              <li class="list-group-item"><strong>Persistencia:</strong> <code>localStorage</code> mediante <code>StorageService</code> inyectable</li>
            </ul>
          </div>

          <div class="card mb-4">
            <div class="card-header fw-bold">Estructura del proyecto</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><code>src/app/home/</code> — Página principal con la lógica del juego</li>
              <li class="list-group-item"><code>src/app/about/</code> — Esta página</li>
              <li class="list-group-item"><code>src/app/components/</code> — Componentes reutilizables del juego</li>
              <li class="list-group-item"><code>src/app/services/</code> — <code>StorageService</code> para persistencia</li>
              <li class="list-group-item"><code>src/app/models/</code> — Tipos TypeScript compartidos (<code>Cell</code>, <code>Score</code>)</li>
              <li class="list-group-item"><code>src/app/app.ts</code> — Componente raíz (shell) con <code>&lt;router-outlet&gt;</code></li>
              <li class="list-group-item"><code>src/app/app.routes.ts</code> — Definición de rutas</li>
            </ul>
          </div>

          <div class="card mb-4">
            <div class="card-header fw-bold">Componentes del juego</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><code>GameCellComponent</code> — Botón individual. <code>input(cell)</code>, <code>output(clicked)</code></li>
              <li class="list-group-item"><code>GameBoardComponent</code> — Cuadrícula 3×3 y badge de estado. <code>input.required(board, statusMessage, statusClass)</code>, <code>output(cellClick)</code></li>
              <li class="list-group-item"><code>GameControlsComponent</code> — Botonera. <code>output(newGame)</code>, <code>output(resetScore)</code></li>
              <li class="list-group-item"><code>GameScoreboardComponent</code> — Marcador. <code>input.required(score)</code></li>
            </ul>
          </div>

          <div class="card mb-4">
            <div class="card-header fw-bold">Convenciones</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Reactividad:</strong> API de señales de Angular — <code>signal()</code>, <code>computed()</code></li>
              <li class="list-group-item"><strong>Inputs:</strong> <code>input()</code> e <code>input.required()</code> — datos que el padre pasa al hijo</li>
              <li class="list-group-item"><strong>Outputs:</strong> <code>output()</code> — eventos que el hijo emite al padre</li>
              <li class="list-group-item"><strong>Inyección:</strong> <code>inject()</code> en lugar de constructor para obtener servicios</li>
              <li class="list-group-item"><strong>Componentes standalone:</strong> sin NgModule; cada componente declara sus propias dependencias en <code>imports[]</code></li>
              <li class="list-group-item"><strong>Bindings:</strong> <code>[prop]</code> para pasar datos, <code>(evento)</code> para escuchar eventos</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {}
