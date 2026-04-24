<script setup>
// RouterLink se usa para la navegación SPA de vuelta al inicio.
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container py-4">
    <div class="text-end mb-2">
      <!-- RouterLink para volver al inicio sin recargar la página -->
      <RouterLink to="/" class="text-muted small">← Inicio</RouterLink>
    </div>

    <h1 class="text-center mb-1">Acerca de</h1>
    <p class="text-center text-muted mb-5">
      <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a>
    </p>

    <div class="row justify-content-center">
      <div class="col-lg-8">

        <div class="card mb-4">
          <div class="card-header fw-bold">Tecnologías</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Framework:</strong> Vue 3</li>
            <li class="list-group-item"><strong>Lenguaje:</strong> JavaScript</li>
            <li class="list-group-item"><strong>Bundler:</strong> Vite</li>
            <li class="list-group-item"><strong>Router:</strong> Vue Router 5 con lazy-loading de rutas</li>
            <li class="list-group-item"><strong>Estilos:</strong> Bootstrap 5</li>
            <li class="list-group-item"><strong>Persistencia:</strong> <code>localStorage</code> mediante composable <code>useLocalStorage</code></li>
          </ul>
        </div>

        <div class="card mb-4">
          <div class="card-header fw-bold">Estructura del proyecto</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><code>src/views/</code> — Páginas de la aplicación (HomeView, AboutView)</li>
            <li class="list-group-item"><code>src/components/</code> — Componentes reutilizables del juego</li>
            <li class="list-group-item"><code>src/composables/</code> — Lógica reutilizable (<code>useLocalStorage</code>)</li>
            <li class="list-group-item"><code>src/router/</code> — Configuración de Vue Router</li>
            <li class="list-group-item"><code>src/App.vue</code> — Componente raíz con <code>&lt;RouterView&gt;</code></li>
            <li class="list-group-item"><code>src/main.js</code> — Punto de entrada, monta la app e importa Bootstrap</li>
          </ul>
        </div>

        <div class="card mb-4">
          <div class="card-header fw-bold">Componentes del juego</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><code>GameCell.vue</code> — Botón individual de casilla. Recibe prop <code>cell</code>, emite evento <code>click</code></li>
            <li class="list-group-item"><code>GameBoard.vue</code> — Cuadrícula 3×3 y badge de estado. Recibe props <code>board</code>, <code>statusMessage</code>, <code>statusClass</code>; emite evento <code>cell-click</code> con el índice</li>
            <li class="list-group-item"><code>GameControls.vue</code> — Botonera de control. Emite eventos <code>new-game</code> y <code>reset-score</code></li>
            <li class="list-group-item"><code>GameScoreboard.vue</code> — Marcador de partidas. Recibe prop <code>score</code> (solo lectura)</li>
          </ul>
        </div>

        <div class="card mb-4">
          <div class="card-header fw-bold">Convenciones</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>API de composición:</strong> <code>&lt;script setup&gt;</code> con <code>ref()</code> y <code>computed()</code></li>
            <li class="list-group-item"><strong>Props:</strong> <code>defineProps()</code> — declara los datos que el padre pasa al hijo</li>
            <li class="list-group-item"><strong>Eventos:</strong> <code>defineEmits()</code> — declara los eventos que el hijo puede emitir al padre</li>
            <li class="list-group-item"><strong>Bindings en template:</strong> <code>:prop</code> para datos, <code>@evento</code> para escuchar eventos</li>
            <li class="list-group-item"><strong>Estado:</strong> centralizado en <code>HomeView.vue</code>; los componentes hijos son presentacionales o emiten eventos</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
