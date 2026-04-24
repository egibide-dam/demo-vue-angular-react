<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocalStorage } from '../composables/useLocalStorage.js'
import GameBoard from '../components/GameBoard.vue'
import GameControls from '../components/GameControls.vue'
import GameScoreboard from '../components/GameScoreboard.vue'

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

const board = ref(Array(9).fill(null))
const currentPlayer = ref('X')
const gameOver = ref(false)
const winner = ref(null)

const score = useLocalStorage('tictactoe-score', { X: 0, O: 0, draws: 0 })

function checkWinner(b) {
  for (const [a, c, d] of WINNING_COMBINATIONS) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
  }
  return null
}

function handleClick(index) {
  if (gameOver.value || board.value[index]) return

  board.value[index] = currentPlayer.value
  const w = checkWinner(board.value)

  if (w) {
    winner.value = w
    gameOver.value = true
    score.value[w]++
  } else if (board.value.every(Boolean)) {
    gameOver.value = true
    score.value.draws++
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function newGame() {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  gameOver.value = false
  winner.value = null
}

function resetScore() {
  score.value = { X: 0, O: 0, draws: 0 }
  newGame()
}

const statusMessage = computed(() => {
  if (winner.value) return `¡Gana ${winner.value}!`
  if (gameOver.value) return '¡Empate!'
  return `Turno de ${currentPlayer.value}`
})

const statusClass = computed(() => {
  if (winner.value === 'X') return 'bg-primary'
  if (winner.value === 'O') return 'bg-danger'
  if (gameOver.value) return 'bg-secondary'
  return currentPlayer.value === 'X' ? 'bg-primary' : 'bg-danger'
})
</script>

<template>
  <div class="container py-4">
    <!-- RouterLink genera un <a> que navega sin recargar la página (SPA).
         'to' acepta el nombre de la ruta o la ruta literal. -->
    <div class="text-end mb-2">
      <RouterLink to="/about" class="text-muted small">Acerca de</RouterLink>
    </div>

    <!-- El título y el subtítulo permanecen en la vista, no son componentes -->
    <h1 class="text-center mb-1">Tres en Raya</h1>
    <p class="text-center text-muted mb-4">
      <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a>
    </p>

    <!-- GameBoard recibe el estado del tablero y los textos del badge como props (:prop).
         Escuchamos el evento 'cell-click' con @cell-click para procesar el movimiento. -->
    <GameBoard
      :board="board"
      :status-message="statusMessage"
      :status-class="statusClass"
      @cell-click="handleClick"
    />

    <!-- GameControls no necesita datos; solo emite eventos que mapeamos
         a las funciones de esta vista con @new-game y @reset-score. -->
    <GameControls
      @new-game="newGame"
      @reset-score="resetScore"
    />

    <!-- GameScoreboard recibe el objeto score como prop de solo lectura.
         Vue lo mantiene reactivo: cuando score cambia aquí, el componente
         hijo se re-renderiza automáticamente. -->
    <GameScoreboard :score="score" />
  </div>
</template>
