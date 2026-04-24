import type { Cell } from '../types/game'

// Props que recibe GameCell desde GameBoard.
// 'cell': valor de la casilla ('X', 'O' o null).
// 'onCellClick': callback que GameBoard ejecutará cuando el usuario pulse.
//   En React los eventos se propagan hacia arriba pasando funciones como props.
interface GameCellProps {
  cell: Cell
  onCellClick: () => void
}

function cellClass(cell: Cell): string {
  if (!cell) return 'btn btn-outline-secondary fw-bold fs-2 m-1'
  return cell === 'X'
    ? 'btn btn-primary fw-bold fs-2 m-1'
    : 'btn btn-danger fw-bold fs-2 m-1'
}

export default function GameCell({ cell, onCellClick }: GameCellProps) {
  return (
    // onCellClick es una función que nos pasa el padre (GameBoard).
    // Al pulsarla, React la ejecuta y el control sube al componente padre.
    <button
      className={cellClass(cell)}
      style={{ width: 90, height: 90 }}
      onClick={onCellClick}
    >
      {cell}
    </button>
  )
}
