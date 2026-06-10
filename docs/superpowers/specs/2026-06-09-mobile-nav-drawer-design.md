# Rediseño del menú mobile (drawer lateral)

## Problema

El menú mobile actual (`components/layout/Nav.tsx`) es un overlay `position: fixed; inset: 0` renderizado **dentro** del `<header>`. El `<header>` recibe `transform: translateY()` vía GSAP (animación de ocultar/mostrar al hacer scroll). Un `transform` en un ancestro convierte ese ancestro en el *containing block* de los descendientes `position: fixed`, por lo que el overlay del menú queda acotado al bounding box del header (solo el área superior) en vez de cubrir toda la pantalla. Resultado: el contenido del Hero se ve "sangrando" detrás del menú abierto.

Además, visualmente el menú actual (overlay centrado, links sueltos) no se alinea con el resto de la identidad del sitio.

## Objetivo

Reemplazar el overlay actual por un **drawer lateral** (panel deslizante desde la izquierda) con estética de tarjeta oscura, iconos por item, cabecera de marca y estado activo — inspirado en un patrón de sidebar de dashboard, adaptado a la paleta del sitio (`styles/tokens.css`: `--bg`, `--teal`, `--orange`, `--card-surface`, `--hairline`).

## Fix estructural (raíz del bug)

`Nav` pasa de retornar un único `<header>` a retornar un `Fragment` con:
- `<header>` (logo + botón toggle), sin cambios de posicionamiento.
- El drawer (backdrop + panel) como **sibling** del header, fuera de cualquier elemento con `transform`.

Esto garantiza que `position: fixed` del drawer se calcule respecto al viewport.

## Componentes

### Backdrop
- `position: fixed; inset: 0; z-index: 101`
- `background: rgba(4,12,10,0.6)`, `backdrop-filter: blur(4px)`
- Click cierra el menú (`setMenuOpen(false)`)
- Visibilidad controlada con `opacity` + `pointer-events` (no se desmonta, para permitir transición de salida)

### Panel del drawer
- `position: fixed; top:0; left:0; bottom:0; z-index: 102`
- `width: min(300px, 82vw)`
- `background: #0a1411` (superficie oscura, ligeramente más clara que `--bg`)
- `border-right: 1px solid var(--hairline)`
- `box-shadow` hacia la derecha para dar profundidad
- Animación: `transform: translateX(-100% | 0)` con `transition: transform 0.35s ease`
- `display: flex; flex-direction: column; padding: 24px 20px; gap: 8px`

### Cabecera del panel
- Logo actual (`/images/logo/logo letra blanca.png`, mismo `Image` que en el header)
- Debajo: "Luis Cruz" (heading, bold) y "Diseñador & Dev WordPress" (`var(--muted)`, tamaño pequeño)
- Botón cerrar (icono `X` de lucide-react) posicionado arriba a la derecha del panel

### Lista de navegación
Cada item: fila con icono (lucide-react, 18-20px) + label, padding `10px 12px`, `border-radius: 12px`.

| Label | Href | Icono lucide |
|---|---|---|
| Trabajo | `/#portfolio` | `Briefcase` |
| Servicios | `/#servicios` | `Wrench` |
| Sobre mí | `/#sobre-mi` | `User` |
| Proyectos | `/proyectos` | `FolderKanban` |

`Proyectos` es un link nuevo que se agrega al array `LINKS` compartido (también aparecerá en el nav desktop).

### Estado activo
Solo por ruta: si `pathname === '/proyectos'`, ese item recibe `background: rgba(0,194,168,0.15)` y `color: var(--teal)`. El resto de los items (anclas en home) no tienen estado activo — sin scroll-spy.

### CTA "Hablemos"
Botón pill naranja (`var(--orange)`), full width, al final del panel (`margin-top: auto`), igual que el CTA actual pero ocupando el ancho del drawer.

### Botón toggle (header)
Se reemplazan los 3 `<span>` del hamburger actual por iconos `Menu` / `X` de lucide-react, manteniendo el botón circular existente (`background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 12px`).

## Dependencia nueva

`lucide-react` — iconos usados: `Menu`, `X`, `Briefcase`, `Wrench`, `User`, `FolderKanban`.

## Fuera de alcance

- Scroll-spy / resaltado de sección activa en home.
- Cambios al nav desktop más allá de heredar el nuevo link "Proyectos" del array `LINKS` compartido.
- Cambios a la animación de ocultar/mostrar el header al hacer scroll (se mantiene igual).

## Validación

- Abrir el menú en viewport mobile (≤768px): el drawer debe cubrir verticalmente toda la pantalla (no debe verse el Hero detrás), independientemente del estado de scroll/transform del header.
- Navegar a `/proyectos` y abrir el menú: el item "Proyectos" debe verse resaltado en teal.
- Cerrar con: botón X, click en backdrop, y al navegar (click en un link).
- Verificar que el nav desktop sigue funcionando y ahora incluye "Proyectos".
