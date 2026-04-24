import type { Score } from '../types/game'

// 'score': objeto con las victorias de X, O y los empates.
// Este componente es puramente presentacional: recibe datos y los muestra.
// No emite ningún evento ni modifica estado.
interface GameScoreboardProps {
  score: Score
}

export default function GameScoreboard({ score }: GameScoreboardProps) {
  return (
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
  )
}
