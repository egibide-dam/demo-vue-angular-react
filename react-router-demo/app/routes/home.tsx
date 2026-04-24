import { useState } from 'react'
import type { Route } from './+types/home'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Tres en Raya' },
    { name: 'description', content: 'Juego de Tres en Raya' },
  ]
}

type Cell = 'X' | 'O' | null

interface Score {
  X: number
  O: number
  draws: number
}

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

function cellClass(cell: Cell): string {
  if (!cell) return 'btn btn-outline-secondary fw-bold fs-2 m-1'
  return cell === 'X'
    ? 'btn btn-primary fw-bold fs-2 m-1'
    : 'btn btn-danger fw-bold fs-2 m-1'
}

export default function Home() {
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
      <h1 className="text-center mb-1">Tres en Raya</h1>
      <p className="text-center text-muted mb-4"><a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">React Router 7</a></p>

      <div className="d-flex flex-column align-items-center mb-3">
        {[0, 1, 2].map((row) => (
          <div key={row} className="d-flex">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col
              return (
                <button
                  key={col}
                  className={cellClass(board[index])}
                  style={{ width: 90, height: 90 }}
                  onClick={() => handleClick(index)}
                >
                  {board[index]}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="text-center mb-3">
        <span className={statusClass()}>{statusMessage()}</span>
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-success me-2" onClick={newGame}>
          Nueva partida
        </button>
        <button className="btn btn-outline-secondary" onClick={resetScore}>
          Resetear marcador
        </button>
      </div>

      <div className="row justify-content-center g-3 text-center">
        <div className="col-auto">
          <div className="card" style={{ minWidth: 110 }}>
            <div className="card-body">
              <h5 className="card-title text-primary">X</h5>
              <p className="display-5 mb-0">{score.X}</p>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="card" style={{ minWidth: 110 }}>
            <div className="card-body">
              <h5 className="card-title text-secondary">Empates</h5>
              <p className="display-5 mb-0">{score.draws}</p>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="card" style={{ minWidth: 110 }}>
            <div className="card-body">
              <h5 className="card-title text-danger">O</h5>
              <p className="display-5 mb-0">{score.O}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

