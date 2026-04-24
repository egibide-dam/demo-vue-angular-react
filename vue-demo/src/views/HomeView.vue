<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage.js'

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

function cellClass(cell) {
  if (!cell) return 'btn-outline-secondary'
  return cell === 'X' ? 'btn-primary' : 'btn-danger'
}
</script>

<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">Tres en Raya</h1>

    <div class="d-flex flex-column align-items-center mb-3">
      <div v-for="row in [0, 1, 2]" :key="row" class="d-flex">
        <button
          v-for="col in [0, 1, 2]"
          :key="col"
          class="btn m-1 fw-bold fs-2"
          :class="cellClass(board[row * 3 + col])"
          style="width: 90px; height: 90px;"
          @click="handleClick(row * 3 + col)"
        >
          {{ board[row * 3 + col] }}
        </button>
      </div>
    </div>

    <div class="text-center mb-3">
      <span class="badge fs-5 px-4 py-2" :class="statusClass">
        {{ statusMessage }}
      </span>
    </div>

    <div class="text-center mb-4">
      <button class="btn btn-success me-2" @click="newGame">Nueva partida</button>
      <button class="btn btn-outline-secondary" @click="resetScore">Resetear marcador</button>
    </div>

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
  </div>
</template>
