'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className="container py-4">
      {/* Link de Next.js para volver al inicio sin recargar la página */}
      <div className="text-end mb-2">
        <Link href="/" className="text-muted small">← Inicio</Link>
      </div>

      <h1 className="text-center mb-1">Acerca de</h1>
      <p className="text-center text-muted mb-5">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js 16</a>
      </p>

      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card mb-4">
            <div className="card-header fw-bold">Tecnologías</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Framework:</strong> React 19 + Next.js 16</li>
              <li className="list-group-item"><strong>Lenguaje:</strong> TypeScript</li>
              <li className="list-group-item"><strong>Bundler:</strong> Next.js con Turbopack en desarrollo</li>
              <li className="list-group-item"><strong>Router:</strong> App Router de Next.js (basado en el sistema de ficheros)</li>
              <li className="list-group-item"><strong>Estilos:</strong> Bootstrap 5</li>
              <li className="list-group-item"><strong>Persistencia:</strong> <code>localStorage</code> mediante hook <code>useLocalStorage</code></li>
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header fw-bold">Estructura del proyecto</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><code>app/page.tsx</code> — Ruta raíz <code>/</code> con el juego</li>
              <li className="list-group-item"><code>app/about/page.tsx</code> — Esta página (ruta <code>/about</code>)</li>
              <li className="list-group-item"><code>app/layout.tsx</code> — Layout raíz compartido; importa Bootstrap</li>
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
              <li className="list-group-item"><strong>Directiva <code>&apos;use client&apos;</code>:</strong> necesaria en componentes que usan hooks de estado (<code>useState</code>, <code>useEffect</code>)</li>
              <li className="list-group-item"><strong>Routing:</strong> App Router — cada carpeta con <code>page.tsx</code> define una ruta</li>
              <li className="list-group-item"><strong>Navegación SPA:</strong> componente <code>&lt;Link&gt;</code> de Next.js en lugar de <code>&lt;a&gt;</code></li>
              <li className="list-group-item"><strong>Estado:</strong> <code>useState</code>; centralizado en la página (<em>lifting state up</em>)</li>
              <li className="list-group-item"><strong>Comunicación:</strong> props tipadas con interfaces TypeScript; callbacks como props para eventos</li>
              <li className="list-group-item"><strong>Persistencia:</strong> hook <code>useLocalStorage</code> con <code>useEffect</code> para leer solo en cliente</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
