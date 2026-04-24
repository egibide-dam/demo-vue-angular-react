# AGENTS.md — Guía para agentes de IA

Este fichero describe el proyecto, su estructura, las convenciones de desarrollo y las instrucciones que deben seguir los agentes de IA (GitHub Copilot, etc.) al trabajar en este repositorio.

---

## Descripción del proyecto

Proyecto de demostración para estudiantes del DAM (Desarrollo de Aplicaciones Multiplataforma). Su objetivo es implementar **la misma aplicación** —un juego de **tres en raya** (Tic-tac-toe)— en cuatro tecnologías frontend distintas, para que los estudiantes puedan comparar cómo se resuelve el mismo problema en cada una.

Cada subdirectorio contiene una aplicación web completa e independiente, autocontenida con sus propias dependencias y configuración.

---

## Estructura del repositorio

```
demo-vue-angular-react/
├── vue-demo/           # Vue 3 + Vue Router + Vite (JavaScript)
├── angular-demo/       # Angular 21 + TypeScript
├── react-next-demo/    # React 19 + Next.js 16 + TypeScript
├── react-router-demo/  # React 19 + React Router 7 + Vite + TypeScript
├── README.md
└── AGENTS.md           # Este fichero
```

---

## La aplicación: Tres en raya (Tic-tac-toe)

### Funcionalidades requeridas

1. **Tablero de juego**: 9 botones (cuadrícula 3×3) que representan las casillas del tablero.
2. **Lógica del juego**:
   - Dos jugadores (X y O) se alternan al pulsar las casillas.
   - Detección automática de victoria (filas, columnas, diagonales) y de empate.
   - Mensaje de resultado al terminar la partida.
   - Botón para reiniciar la partida sin resetear el marcador.
3. **Marcador de partidas**:
   - Muestra las partidas ganadas por X, ganadas por O y empates.
   - Botón para resetear completamente el marcador.
4. **Persistencia local**: El marcador se guarda en el navegador con la tecnología recomendada para cada plataforma (ver más abajo), de modo que sobrevive a recargas de página.
5. **SPA**: La aplicación completa reside en una única página, sin navegación a otras rutas.

### Diseño de la interfaz (Bootstrap 5)

**Todas las aplicaciones deben tener exactamente el mismo diseño visual**, usando Bootstrap 5 como único framework de estilos (sin Tailwind CSS, sin estilos propios más allá de ajustes mínimos de layout).

- **Layout**: Contenedor centrado, título de la aplicación, tablero y marcador apilados verticalmente.
- **Tablero**: Grid 3×3 usando componentes `btn` de Bootstrap. Los botones deben ser cuadrados y de tamaño uniforme.
  - Casilla vacía: botón secundario (`btn-outline-secondary` o similar).
  - Jugador X: botón primario (`btn-primary`).
  - Jugador O: botón danger (`btn-danger`).
- **Marcador**: Tabla o conjunto de badges/cards de Bootstrap mostrando victorias de X, victorias de O y empates.
- **Botones de control**: "Nueva partida" y "Resetear marcador".
- No se usa ningún otro framework CSS. Tailwind CSS, si ya estaba en la plantilla de scaffolding, debe **eliminarse** y sustituirse por Bootstrap 5.

---

## Tecnologías por subdirectorio

### `vue-demo/` — Vue 3

| Aspecto | Detalle |
|---|---|
| Framework | Vue 3 (Composition API con `<script setup>`) |
| Lenguaje | JavaScript |
| Bundler | Vite |
| Router | Vue Router 5 |
| Persistencia | `localStorage` mediante un composable (`useStorage` o similar) |
| Bootstrap | Importado vía npm (`bootstrap`) en `main.js` |
| Comandos | `npm run dev` · `npm run build` · `npm run preview` |

**Convenciones**:
- La lógica del juego y el estado se gestionan en el componente principal o en composables reutilizables en `src/composables/`.
- Un único componente de vista en `src/views/HomeView.vue` contiene todo el juego.

---

### `angular-demo/` — Angular 21

| Aspecto | Detalle |
|---|---|
| Framework | Angular 21 |
| Lenguaje | TypeScript |
| Bundler | Angular CLI (`@angular/build`) |
| Router | Angular Router (una sola ruta raíz) |
| Persistencia | `localStorage` mediante un servicio inyectable (`StorageService`) |
| Bootstrap | Importado vía npm (`bootstrap`) en `angular.json` y `styles.scss` |
| Comandos | `npm start` · `npm run build` · `npm test` |

**Convenciones**:
- Componente standalone principal: `AppComponent`.
- La lógica del juego se gestiona con `signal()` de Angular 21 (reactivity primitives).
- El servicio de persistencia se encuentra en `src/app/services/storage.service.ts`.
- No usar módulos NgModule; usar componentes standalone.

---

### `react-next-demo/` — React + Next.js 16

| Aspecto | Detalle |
|---|---|
| Framework | React 19 + Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Bundler | Next.js (Turbopack en dev) |
| Router | App Router de Next.js (una sola ruta: `app/page.tsx`) |
| Persistencia | `localStorage` mediante un custom hook (`useLocalStorage`) en `'use client'` |
| Bootstrap | Importado vía npm (`bootstrap`) en `app/globals.css` o `app/layout.tsx` |
| Comandos | `npm run dev` · `npm run build` · `npm start` · `npm run lint` |

**Convenciones**:
- Toda la aplicación reside en `app/page.tsx` marcado con `'use client'`.
- Tailwind CSS debe eliminarse del proyecto; Bootstrap 5 es el único framework CSS.
- Los custom hooks se ubican en `app/hooks/`.
- No se usan Server Components para la lógica del juego (requiere estado en cliente).

---

### `react-router-demo/` — React + React Router 7

| Aspecto | Detalle |
|---|---|
| Framework | React 19 + React Router 7 (framework mode) |
| Lenguaje | TypeScript |
| Bundler | Vite |
| Router | React Router 7 (una sola ruta: `app/routes/home.tsx`) |
| Persistencia | `localStorage` mediante un custom hook (`useLocalStorage`) |
| Bootstrap | Importado vía npm (`bootstrap`) en `app/root.tsx` |
| Comandos | `npm run dev` · `npm run build` · `npm start` · `npm run typecheck` |

**Convenciones**:
- Tailwind CSS debe eliminarse del proyecto; Bootstrap 5 es el único framework CSS.
- La lógica del juego reside en `app/routes/home.tsx`.
- Los custom hooks se ubican en `app/hooks/`.

---

## Convenciones generales de código

- **No duplicar lógica entre tecnologías**: cada implementación debe ser idiomática para su framework.
- **Sin comentarios innecesarios**: el código debe ser autoexplicativo; comentar solo lo que necesite aclaración.
- **Tipado estricto** en los proyectos TypeScript (Angular, react-next-demo, react-router-demo).
- **Sin dependencias extra**: no añadir librerías de terceros salvo Bootstrap 5. La lógica del juego se implementa from scratch.
- Cada subdirectorio es completamente independiente; no hay código compartido entre ellos.

---

## Convenciones de commits

> **Regla fundamental**: cada funcionalidad completada o corrección de bug debe tener su propio commit independiente. No agrupar cambios no relacionados en un mismo commit.

### Cuándo hacer commit

- Al completar una funcionalidad nueva (aunque sea parcial pero funcional).
- Al corregir un bug concreto.
- Al añadir o actualizar documentación relevante.
- **No** hacer commit de código roto o que no compila.

### Formato del mensaje de commit

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción breve en imperativo>
```

**Tipos permitidos**:

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Refactorización sin cambio de comportamiento |
| `style` | Cambios de formato/estilo (CSS, layout) |
| `docs` | Documentación |
| `chore` | Tareas de mantenimiento (deps, config) |

**Scopes** (uno por subdirectorio):

| Scope | Directorio |
|---|---|
| `vue` | `vue-demo/` |
| `angular` | `angular-demo/` |
| `next` | `react-next-demo/` |
| `react-router` | `react-router-demo/` |
| `root` | Raíz del repositorio |

**Ejemplos**:

```
feat(vue): implementar tablero 3x3 con Bootstrap 5
feat(angular): añadir lógica de detección de victoria
feat(next): persistir marcador con localStorage
fix(react-router): corregir empate cuando el tablero está lleno
style(angular): ajustar tamaño de botones del tablero
chore(vue): instalar Bootstrap 5 y eliminar estilos por defecto
docs(root): crear AGENTS.md con instrucciones del proyecto
```

### Trailer obligatorio

Todo commit creado por un agente de IA debe incluir el siguiente trailer al final del mensaje:

```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

## Comandos de desarrollo por subdirectorio

| Subdirectorio | Instalar deps | Servidor dev | Build producción |
|---|---|---|---|
| `vue-demo/` | `npm install` | `npm run dev` | `npm run build` |
| `angular-demo/` | `npm install` | `npm start` | `npm run build` |
| `react-next-demo/` | `npm install` | `npm run dev` | `npm run build` |
| `react-router-demo/` | `npm install` | `npm run dev` | `npm run build` |

Cada aplicación arranca por defecto en `http://localhost:5173` (Vite) o en el puerto que asigne su CLI. Verificar el puerto en la salida del terminal al iniciar.

---

## Referencias

- [Vue 3 — Quick Start](https://vuejs.org/guide/quick-start.html)
- [Angular — Installation](https://angular.dev/installation)
- [Next.js — App Router Getting Started](https://nextjs.org/docs/app/getting-started)
- [React Router 7 — Installation](https://reactrouter.com/start/framework/installation)
- [Bootstrap 5 — Docs](https://getbootstrap.com/docs/5.3/)
- [Conventional Commits](https://www.conventionalcommits.org/)
