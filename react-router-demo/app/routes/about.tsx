import { Link } from 'react-router'
import type { Route } from './+types/about'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Acerca de — Tres en Raya' },
    { name: 'description', content: 'Descripción del proyecto React Router 7' },
  ]
}

export default function About() {
  return (
    <div className="container py-4">
      <div className="text-end mb-2">
        <Link to="/" className="text-muted small">← Inicio</Link>
      </div>

      <h1 className="text-center mb-1">Acerca de</h1>
      <p className="text-center text-muted mb-5">
        <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">React Router 7</a>
      </p>

      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card mb-4">
            <div className="card-header fw-bold">Tecnologías</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Framework:</strong> React 19 + React Router 7 (framework mode)</li>
              <li className="list-group-item"><strong>Lenguaje:</strong> TypeScript</li>
              <li className="list-group-item"><strong>Bundler:</strong> Vite</li>
              <li className="list-group-item"><strong>Router:</strong> React Router 7 con SSR (framework mode)</li>
              <li className="list-group-item"><strong>Estilos:</strong> Bootstrap 5</li>
              <li className="list-group-item"><strong>Persistencia:</strong> <code>localStorage</code> mediante hook <code>useLocalStorage</code></li>
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header fw-bold">Estructura del proyecto</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><code>app/routes/home.tsx</code> — Ruta raíz <code>/</code> con el juego</li>
              <li className="list-group-item"><code>app/routes/about.tsx</code> — Esta página (ruta <code>/about</code>)</li>
              <li className="list-group-item"><code>app/routes.ts</code> — Definición de rutas</li>
              <li className="list-group-item"><code>app/root.tsx</code> — Layout raíz compartido; importa Bootstrap</li>
              <li className="list-group-item"><code>app/components/</code> — Componentes del juego</li>
              <li className="list-group-item"><code>app/hooks/</code> — Custom hooks (<code>useLocalStorage</code>)</li>
              <li className="list-group-item"><code>app/types/</code> — Tipos TypeScript compartidos (<code>Cell</code>, <code>Score</code>)</li>
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header fw-bold">Componentes del juego</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><code>GameCell</code> — Botón individual. Props: <code>cell</code>, <code>onCellClick</code></li>
              <li className="list-group-item"><code>GameBoard</code> — Cuadrícula 3×3 y badge de estado. Props: <code>board</code>, <code>statusMessage</code>, <code>statusClass</code>, <code>onCellClick</code></li>
              <li className="list-group-item"><code>GameControls</code> — Botonera. Props: <code>onNewGame</code>, <code>onResetScore</code></li>
              <li className="list-group-item"><code>GameScoreboard</code> — Marcador presentacional. Prop: <code>score</code></li>
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header fw-bold">Convenciones</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Framework mode:</strong> React Router 7 actúa como meta-framework con SSR; las rutas se definen en <code>routes.ts</code></li>
              <li className="list-group-item"><strong>Navegación SPA:</strong> componente <code>&lt;Link&gt;</code> de React Router en lugar de <code>&lt;a&gt;</code></li>
              <li className="list-group-item"><strong>Meta por ruta:</strong> función <code>meta()</code> exportada desde cada fichero de ruta</li>
              <li className="list-group-item"><strong>Estado:</strong> <code>useState</code>; centralizado en la ruta (<em>lifting state up</em>)</li>
              <li className="list-group-item"><strong>Comunicación:</strong> props tipadas con interfaces TypeScript; callbacks como props para eventos</li>
              <li className="list-group-item"><strong>Persistencia:</strong> hook <code>useLocalStorage</code> con <code>useEffect</code> para leer solo en cliente (evita errores SSR)</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
