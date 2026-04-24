'use client'

import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Cell, Score } from './types/game'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import GameScoreboard from './components/GameScoreboard'

const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function checkWinner(board: Cell[]): 'X' | 'O' | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as 'X' | 'O'
    }
  }
  return null
}

export default function Home() {
  // Todo el estado vive aquí (patrón "lifting state up").
  // Los componentes hijos reciben datos como props y notifican cambios
  // mediante callbacks también pasados como props.
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<'X' | 'O' | null>(null)
  const [score, setScore] = useLocalStorage<Score>('tictactoe-score', { X: 0, O: 0, draws: 0 })

  function handleClick(index: number) {
    if (gameOver || board[index]) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const w = checkWinner(newBoard)
    if (w) {
      setWinner(w)
      setGameOver(true)
      setScore({ ...score, [w]: score[w] + 1 })
    } else if (newBoard.every(Boolean)) {
      setGameOver(true)
      setScore({ ...score, draws: score.draws + 1 })
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  function newGame() {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameOver(false)
    setWinner(null)
  }

  function resetScore() {
    setScore({ X: 0, O: 0, draws: 0 })
    newGame()
  }

  function statusMessage() {
    if (winner) return `¡Gana ${winner}!`
    if (gameOver) return '¡Empate!'
    return `Turno de ${currentPlayer}`
  }

  function statusClass() {
    if (winner === 'X') return 'badge fs-5 px-4 py-2 bg-primary'
    if (winner === 'O') return 'badge fs-5 px-4 py-2 bg-danger'
    if (gameOver) return 'badge fs-5 px-4 py-2 bg-secondary'
    return currentPlayer === 'X'
      ? 'badge fs-5 px-4 py-2 bg-primary'
      : 'badge fs-5 px-4 py-2 bg-danger'
  }

  return (
    <div className="container py-4">
      {/* El título y el subtítulo permanecen en la página, no son componentes */}
      <h1 className="text-center mb-1">Tres en Raya</h1>
      <p className="text-center text-muted mb-4">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js 16</a>
      </p>

      {/* GameBoard recibe el tablero y los textos del badge como props.
          onCellClick es el callback que ejecutará cuando el usuario pulse una celda. */}
      <GameBoard
        board={board}
        statusMessage={statusMessage()}
        statusClass={statusClass()}
        onCellClick={handleClick}
      />

      {/* GameControls solo necesita los callbacks; no hay datos que pasarle. */}
      <GameControls onNewGame={newGame} onResetScore={resetScore} />

      {/* GameScoreboard es un componente presentacional puro: solo recibe datos. */}
      <GameScoreboard score={score} />
    </div>
  )
}

