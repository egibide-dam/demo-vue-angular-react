<script setup>
// 'score' es un objeto reactivo pasado desde HomeView con las victorias
// de cada jugador y los empates. Al ser una prop, se actualiza automáticamente
// cuando el padre modifica el valor.
defineProps({
  score: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="row justify-content-center g-3 text-center">
    <div class="col-auto">
      <div class="card" style="min-width: 110px;">
        <div class="card-body">
          <h5 class="card-title text-primary">X</h5>
          <p class="display-5 mb-0">{{ score.X }}</p>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="card" style="min-width: 110px;">
        <div class="card-body">
          <h5 class="card-title text-secondary">Empates</h5>
          <p class="display-5 mb-0">{{ score.draws }}</p>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="card" style="min-width: 110px;">
        <div class="card-body">
          <h5 class="card-title text-danger">O</h5>
          <p class="display-5 mb-0">{{ score.O }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
