# Mobile Nav Drawer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken fullscreen mobile menu overlay with a left-side drawer (dark card, icons, active state, "Proyectos" link) and fix the underlying `position: fixed` containing-block bug.

**Architecture:** `components/layout/Nav.tsx` keeps the `<header>` (logo + toggle button) and now returns a Fragment with a new sibling component `components/layout/MobileDrawer.tsx` (backdrop + sliding panel). Because the drawer is no longer a descendant of the GSAP-animated `<header>`, its `position: fixed` is computed against the viewport.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, lucide-react (new dependency), CSS-in-JS inline styles (existing convention in this file), no test framework — verification via `npm run lint`, `npx tsc --noEmit`, and Playwright screenshots against the dev server.

**Branch:** `feature/mobile-menu-redesign` (already created and checked out).

---

### Task 1: Install lucide-react

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install the dependency**

Run:
```bash
npm install lucide-react
```

- [ ] **Step 2: Verify it was added**

Run:
```bash
grep '"lucide-react"' package.json
```
Expected: a line like `"lucide-react": "^0.x.x",` under `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add lucide-react for nav icons"
```

---

### Task 2: Add "Proyectos" link to shared LINKS array

**Files:**
- Modify: `components/layout/Nav.tsx:11-15`

- [ ] **Step 1: Update the LINKS array**

In `components/layout/Nav.tsx`, replace:

```ts
const LINKS = [
  { href: '/#portfolio', label: 'Trabajo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
]
```

with:

```ts
const LINKS = [
  { href: '/#portfolio', label: 'Trabajo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/proyectos', label: 'Proyectos' },
]
```

- [ ] **Step 2: Start the dev server (if not already running)**

Run:
```bash
npm run dev
```
Wait for `✓ Ready` in the output.

- [ ] **Step 3: Verify the desktop nav now shows "Proyectos"**

Run:
```bash
curl -s http://localhost:3000/ | grep -o '>Proyectos<'
```
Expected: `>Proyectos<` printed (at least once, from the desktop pill nav).

- [ ] **Step 4: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat: add Proyectos link to nav"
```

---

### Task 3: Create the MobileDrawer component

**Files:**
- Create: `components/layout/MobileDrawer.tsx`

- [ ] **Step 1: Write the component**

Create `components/layout/MobileDrawer.tsx`:

```tsx
// components/layout/MobileDrawer.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Briefcase, FolderKanban, User, Wrench, X, type LucideIcon } from 'lucide-react'

interface DrawerLink {
  href: string
  label: string
}

interface MobileDrawerProps {
  open: boolean
  links: DrawerLink[]
  pathname: string
  onClose: () => void
}

const ICONS: Record<string, LucideIcon> = {
  '/#portfolio': Briefcase,
  '/#servicios': Wrench,
  '/#sobre-mi': User,
  '/proyectos': FolderKanban,
}

export default function MobileDrawer({ open, links, pathname, onClose }: MobileDrawerProps) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 101,
          background: 'rgba(4,12,10,0.6)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 102,
          width: 'min(300px, 82vw)',
          background: '#0a1411',
          borderRight: '1px solid var(--hairline)',
          boxShadow: '20px 0 60px rgba(0,0,0,0.4)',
          display: 'flex', flexDirection: 'column',
          padding: '24px 20px',
          gap: 8,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s ease',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar menú"
          style={{
            position: 'absolute', top: 20, right: 16,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: 6, cursor: 'pointer',
            display: 'flex', color: 'var(--white)',
          }}
        >
          <X size={16} />
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, marginBottom: 16, marginTop: 36,
        }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 36, height: 36, flexShrink: 0 }}>
            <Image
              src="/images/logo/logo letra blanca.png"
              alt="Luis Cruz"
              fill
              sizes="36px"
              style={{ objectFit: 'contain' }}
            />
          </span>
          <div>
            <div style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 13, color: 'var(--white)' }}>
              Luis Cruz
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>
              Diseñador & Dev WordPress
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(({ href, label }) => {
            const Icon = ICONS[href]
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 12,
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  color: active ? 'var(--teal)' : 'var(--white)',
                  background: active ? 'rgba(0,194,168,0.15)' : 'transparent',
                }}
              >
                {Icon && <Icon size={18} />}
                {label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/#contacto"
          onClick={onClose}
          style={{
            marginTop: 'auto',
            background: 'var(--orange)', color: '#fff',
            fontWeight: 700, borderRadius: '100px',
            padding: '14px 28px', fontSize: 11,
            letterSpacing: '2px', textTransform: 'uppercase',
            textDecoration: 'none', textAlign: 'center',
          }}
        >
          Hablemos
        </Link>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors referencing `MobileDrawer.tsx` (the file isn't imported anywhere yet, so it must still compile standalone — unused-export errors are not expected since `noUnusedLocals` applies to locals, not exports).

- [ ] **Step 3: Commit**

```bash
git add components/layout/MobileDrawer.tsx
git commit -m "feat: add MobileDrawer component"
```

---

### Task 4: Integrate MobileDrawer into Nav and fix the position:fixed bug

**Files:**
- Modify: `components/layout/Nav.tsx` (full rewrite of the toggle button + return statement)

- [ ] **Step 1: Replace the entire file contents**

Replace the full contents of `components/layout/Nav.tsx` with:

```tsx
// components/layout/Nav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'
import MobileDrawer from './MobileDrawer'

const LINKS = [
  { href: '/#portfolio', label: 'Trabajo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/proyectos', label: 'Proyectos' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.set(navRef.current, { y: 0 })
  }, [pathname])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let lastY = 0
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const currentY = self.scroll()
        if (currentY > lastY && currentY > 100) {
          gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.in' })
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' })
        }
        lastY = currentY
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: isMobile ? '20px 20px 0' : '28px 40px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <span style={{ position: 'relative', display: 'inline-block', width: isMobile ? 100 : 130, height: isMobile ? 27 : 34 }}>
            <Image
              src="/images/logo/logo letra blanca.png"
              alt="Luis Cruz"
              fill
              priority
              sizes="130px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </span>
        </Link>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-toggle"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 10, cursor: 'pointer', display: 'flex',
              zIndex: 103, position: 'relative', color: 'var(--white)',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        ) : (
          <nav className="nav-desktop" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '100px',
            padding: '10px 20px',
            display: 'flex', gap: 24, alignItems: 'center',
            backdropFilter: 'blur(12px)',
          }}>
            {LINKS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              style={{
                background: 'var(--orange)', color: '#fff',
                fontWeight: 700, borderRadius: '100px',
                padding: '6px 16px', fontSize: 10,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Hablemos
            </Link>
          </nav>
        )}
      </header>

      {isMobile && (
        <MobileDrawer
          open={menuOpen}
          links={LINKS}
          pathname={pathname}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
```

- [ ] **Step 2: Lint**

Run:
```bash
npx eslint components/layout/Nav.tsx components/layout/MobileDrawer.tsx
```
Expected: no errors.

- [ ] **Step 3: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "fix: move mobile drawer outside transformed header, redesign as left drawer"
```

---

### Task 5: Visual verification with Playwright

**Files:** none (verification only — no files created in the repo)

- [ ] **Step 1: Ensure the dev server is running**

Run:
```bash
curl -sf http://localhost:3000/ -o /dev/null -w "%{http_code}\n"
```
Expected: `200`. If it fails, run `npm run dev` in the background and wait for `✓ Ready`.

- [ ] **Step 2: Set up a scratch Playwright install (if not already present)**

Run:
```bash
npm install --no-save --prefix /tmp/pw-tmp playwright@1.60.0
npx --yes --prefix /tmp/pw-tmp playwright install chromium
```

- [ ] **Step 3: Write the verification script**

Create `/tmp/pw-tmp/verify-drawer.mjs`:

```js
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// 1. Home, menu closed
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'C:\\tmp\\drawer-closed.png' });

// 2. Open the drawer
await page.click('.nav-mobile-toggle');
await page.waitForTimeout(450);
await page.screenshot({ path: 'C:\\tmp\\drawer-open.png' });

// Drawer must cover full viewport height and hide the Hero text behind it
const heroVisible = await page.isVisible('text=VER PROYECTOS');
console.log('Hero CTA visible while drawer open (expect false):', heroVisible);

// 3. Close via backdrop click (click far right edge, outside the panel)
await page.mouse.click(380, 400);
await page.waitForTimeout(450);
const openAfterBackdrop = await page.evaluate(() => document.body.innerHTML.includes('translateX(0)'));
console.log('translateX(0) present after backdrop click (expect false):', openAfterBackdrop);

// 4. Reopen, then close via the X button
await page.click('.nav-mobile-toggle');
await page.waitForTimeout(450);
await page.click('button[aria-label="Cerrar menú"]');
await page.waitForTimeout(450);
const openAfterXButton = await page.evaluate(() => document.body.innerHTML.includes('translateX(0)'));
console.log('translateX(0) present after X button click (expect false):', openAfterXButton);

// 5. Reopen, then close by clicking a nav link
await page.click('.nav-mobile-toggle');
await page.waitForTimeout(450);
await page.click('a:has-text("Servicios")');
await page.waitForURL('**/#servicios');
await page.waitForTimeout(450);
const openAfterLinkClick = await page.evaluate(() => document.body.innerHTML.includes('translateX(0)'));
console.log('translateX(0) present after link click (expect false):', openAfterLinkClick);

// 6. Proyectos page — active state
await page.goto('http://localhost:3000/proyectos', { waitUntil: 'networkidle' });
await page.click('.nav-mobile-toggle');
await page.waitForTimeout(450);
await page.screenshot({ path: 'C:\\tmp\\drawer-proyectos-active.png' });

await browser.close();
```

- [ ] **Step 4: Run the script**

Run:
```bash
cd /tmp/pw-tmp && node verify-drawer.mjs
```
Expected output:
```
Hero CTA visible while drawer open (expect false): false
translateX(0) present after backdrop click (expect false): false
translateX(0) present after X button click (expect false): false
translateX(0) present after link click (expect false): false
```

- [ ] **Step 5: Inspect the screenshots**

Read `C:\tmp\drawer-closed.png`, `C:\tmp\drawer-open.png`, and `C:\tmp\drawer-proyectos-active.png`.

Confirm visually:
- `drawer-open.png`: a dark panel covers the left ~80% of the screen from top to bottom (no Hero content bleeding through at the top), with the "Luis Cruz / Diseñador & Dev WordPress" header, 4 nav items with icons (Briefcase, Wrench, User, FolderKanban), and an orange "HABLEMOS" pill at the bottom.
- `drawer-proyectos-active.png`: the "Proyectos" row has a teal-tinted background and teal text, the others don't.

If anything looks wrong, fix `MobileDrawer.tsx` or `Nav.tsx` and re-run Steps 4-5 (do not commit broken UI).

---

### Task 6: Final full-suite check and push

**Files:** none

- [ ] **Step 1: Run lint across the project**

Run:
```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 2: Run a production build**

Run:
```bash
npm run build
```
Expected: build completes successfully (exit code 0).

- [ ] **Step 3: Push the branch**

```bash
git push -u origin feature/mobile-menu-redesign
```

- [ ] **Step 4: Open a PR (or report branch ready for review)**

Use `gh pr create` with a title summarizing the drawer redesign and bug fix, or report the branch is ready for the user to review/merge.
