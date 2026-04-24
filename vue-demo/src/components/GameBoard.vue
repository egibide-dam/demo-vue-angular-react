<script setup>
import GameCell from './GameCell.vue'

// 'board': array de 9 posiciones con los valores del tablero.
// 'statusMessage': texto del badge ("Turno de X", "¡Gana O!", etc.).
// 'statusClass': clase Bootstrap del badge ('bg-primary', 'bg-danger', etc.).
defineProps({
  board: {
    type: Array,
    required: true,
  },
  statusMessage: {
    type: String,
    required: true,
  },
  statusClass: {
    type: String,
    required: true,
  },
})

// Cuando el usuario pulsa una celda, este componente emite 'cell-click'
// con el índice de la casilla. El padre (HomeView) es quien actualiza el estado.
const emit = defineEmits(['cell-click'])
</script>

<template>
  <div class="d-flex flex-column align-items-center mb-3">
    <div v-for="row in [0, 1, 2]" :key="row" class="d-flex">
      <!-- Pasamos el valor de la celda como prop ':cell'.
           Escuchamos el evento 'click' del hijo y lo re-emitimos hacia HomeView
           con el índice calculado. -->
      <GameCell
        v-for="col in [0, 1, 2]"
        :key="col"
        :cell="board[row * 3 + col]"
        @click="emit('cell-click', row * 3 + col)"
      />
    </div>
  </div>

  <div class="text-center mb-3">
    <span class="badge fs-5 px-4 py-2" :class="statusClass">
      {{ statusMessage }}
    </span>
  </div>
</template>
