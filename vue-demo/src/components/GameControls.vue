<script setup>
// Este componente no necesita ningún dato del padre.
// Solo emite eventos para que HomeView ejecute las acciones correspondientes.
const emit = defineEmits(['new-game', 'reset-score'])
</script>

<template>
  <div class="text-center mb-4">
    <!-- Al pulsar, emitimos 'new-game'. HomeView escucha con @new-game="newGame()". -->
    <button class="btn btn-success me-2" @click="emit('new-game')">
      Nueva partida
    </button>
    <!-- Al pulsar, emitimos 'reset-score'. HomeView escucha con @reset-score="resetScore()". -->
    <button class="btn btn-outline-secondary" @click="emit('reset-score')">
      Resetear marcador
    </button>
  </div>
</template>
