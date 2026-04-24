import type { Cell } from '../types/game'
import GameCell from './GameCell'

// Props que recibe GameBoard desde home.tsx (el componente raíz con el estado).
// 'board': array de 9 posiciones con el estado actual del tablero.
// 'statusMessage': texto del badge de estado.
// 'statusClass': clase Bootstrap del badge.
// 'onCellClick': callback que home.tsx ejecutará con el índice de la celda pulsada.
//   Patrón "lifting state up": el estado vive arriba, los hijos notifican cambios.
interface GameBoardProps {
  board: Cell[]
  statusMessage: string
  statusClass: string
  onCellClick: (index: number) => void
}

export default function GameBoard({ board, statusMessage, statusClass, onCellClick }: GameBoardProps) {
  return (
    <>
      <div className="d-flex flex-column align-items-center mb-3">
        {[0, 1, 2].map((row) => (
          <div key={row} className="d-flex">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col
              return (
                // Pasamos la celda como prop y un callback con el índice ya calculado.
                // GameCell no sabe su posición; esa responsabilidad pertenece a GameBoard.
                <GameCell
                  key={col}
                  cell={board[index]}
                  onCellClick={() => onCellClick(index)}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className="text-center mb-3">
        <span className={statusClass}>{statusMessage}</span>
      </div>
    </>
  )
}
