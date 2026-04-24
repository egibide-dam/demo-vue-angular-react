'use client'

// Props de GameControls: solo callbacks, no necesita datos de estado.
// 'onNewGame': función a ejecutar al pulsar "Nueva partida".
// 'onResetScore': función a ejecutar al pulsar "Resetear marcador".
// Este patrón de pasar callbacks como props es la forma estándar en React
// para que componentes hijos desencadenen acciones en el padre.
interface GameControlsProps {
  onNewGame: () => void
  onResetScore: () => void
}

export default function GameControls({ onNewGame, onResetScore }: GameControlsProps) {
  return (
    <div className="text-center mb-4">
      <button className="btn btn-success me-2" onClick={onNewGame}>
        Nueva partida
      </button>
      <button className="btn btn-outline-secondary" onClick={onResetScore}>
        Resetear marcador
      </button>
    </div>
  )
}
