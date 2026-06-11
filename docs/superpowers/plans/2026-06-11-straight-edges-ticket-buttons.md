# Straight Edges + Ticket-Cut Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `border-radius` from containers and pill/tag elements (except those already using the diagonal "ticket" clip-path), and apply a smaller proportional ticket clip-path to the main CTA buttons.

**Architecture:** Pure styling edits across existing components. Each file gets its `borderRadius` values set to `0` per the spec categories, and a small local `BUTTON_TICKET_CLIP_PATH` constant (8px cut) is added to files containing CTA buttons, following the existing pattern of locally-defined `TICKET_CLIP_PATH` constants (e.g. `Portfolio.tsx`, `DoubleBezelCard.tsx`).

**Tech Stack:** Next.js, React, inline style objects (CSS-in-JS via `style` prop), `app/globals.css`.

**Reference spec:** `docs/superpowers/specs/2026-06-11-straight-edges-ticket-buttons-design.md`

---

### Task 1: Nav.tsx — straight containers + ticket CTA

**Files:**
- Modify: `components/layout/Nav.tsx`

- [ ] **Step 1: Add the button ticket clip-path constant**

After the `LINKS` array (around line 17), add:

```ts
const LINKS = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/proyectos', label: 'Proyectos' },
]

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'
```

- [ ] **Step 2: Straighten the mobile menu toggle button**

In the mobile toggle `<button>` style (around line 94), change:

```ts
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 10, cursor: 'pointer', display: 'flex',
```

to:

```ts
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 0, padding: 10, cursor: 'pointer', display: 'flex',
```

- [ ] **Step 3: Straighten the desktop nav pill and apply ticket cut to "Hablemos"**

Change the desktop `<nav>` style (around line 101-108) from:

```tsx
          <nav className="nav-desktop" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '100px',
            padding: '10px 20px',
            display: 'flex', gap: 24, alignItems: 'center',
            backdropFilter: 'blur(12px)',
          }}>
```

to:

```tsx
          <nav className="nav-desktop" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 0,
            padding: '10px 20px',
            display: 'flex', gap: 24, alignItems: 'center',
            backdropFilter: 'blur(12px)',
          }}>
```

Then change the "Hablemos" link (around line 114-125) from:

```tsx
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
```

to:

```tsx
            <Link
              href="/#contacto"
              style={{
                background: 'var(--orange)', color: '#fff',
                fontWeight: 700, borderRadius: 0,
                clipPath: BUTTON_TICKET_CLIP_PATH,
                padding: '6px 16px', fontSize: 10,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Hablemos
            </Link>
```

- [ ] **Step 4: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "style: straighten nav corners and apply ticket cut to Hablemos CTA"
```

---

### Task 2: MobileDrawer.tsx — straight containers + ticket CTA

**Files:**
- Modify: `components/layout/MobileDrawer.tsx`

- [ ] **Step 1: Add the button ticket clip-path constant**

After the `ICONS` map (around line 23), add:

```ts
const ICONS: Record<string, LucideIcon> = {
  '/#servicios': Wrench,
  '/#sobre-mi': User,
  '/proyectos': FolderKanban,
}

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'
```

- [ ] **Step 2: Straighten the close button**

Change (around line 64):

```ts
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: 6, cursor: 'pointer',
```

to:

```ts
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 0, padding: 6, cursor: 'pointer',
```

- [ ] **Step 3: Straighten the logo/name block**

Change (around line 75):

```ts
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, marginBottom: 16, marginTop: 36,
```

to:

```ts
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 0, marginBottom: 16, marginTop: 36,
```

- [ ] **Step 4: Straighten the nav links**

Change (around line 108):

```ts
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 12,
```

to:

```ts
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 0,
```

- [ ] **Step 5: Apply ticket cut to the "Hablemos" CTA**

Change (around line 121-135) from:

```tsx
        <Link
          href="/#contacto"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
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
```

to:

```tsx
        <Link
          href="/#contacto"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          style={{
            marginTop: 'auto',
            background: 'var(--orange)', color: '#fff',
            fontWeight: 700, borderRadius: 0,
            clipPath: BUTTON_TICKET_CLIP_PATH,
            padding: '14px 28px', fontSize: 11,
            letterSpacing: '2px', textTransform: 'uppercase',
            textDecoration: 'none', textAlign: 'center',
          }}
        >
          Hablemos
        </Link>
```

- [ ] **Step 6: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add components/layout/MobileDrawer.tsx
git commit -m "style: straighten drawer corners and apply ticket cut to Hablemos CTA"
```

---

### Task 3: globals.css — straighten service stagger nav button

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Remove border-radius from `.service-stagger-nav`**

Change (around line 89):

```css
.service-stagger-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: transparent;
  border: 1px solid var(--hairline);
  border-radius: 12px;
  color: var(--white);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

to:

```css
.service-stagger-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: transparent;
  border: 1px solid var(--hairline);
  border-radius: 0;
  color: var(--white);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: straighten service stagger nav button corners"
```

---

### Task 4: EyebrowPill.tsx — rectangular pill

**Files:**
- Modify: `components/ui/EyebrowPill.tsx`

- [ ] **Step 1: Remove the pill border-radius (keep the dot circular)**

Change (around line 9-21):

```tsx
      style={{
        background: 'rgba(0,194,168,0.08)',
        border: '1px solid rgba(0,194,168,0.2)',
        borderRadius: '100px',
        padding: '5px 14px',
```

to:

```tsx
      style={{
        background: 'rgba(0,194,168,0.08)',
        border: '1px solid rgba(0,194,168,0.2)',
        borderRadius: 0,
        padding: '5px 14px',
```

Do **not** change line 23 (`borderRadius: '50%'` on the decorative dot).

- [ ] **Step 2: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/EyebrowPill.tsx
git commit -m "style: make EyebrowPill rectangular"
```

---

### Task 5: About.tsx — rectangular skill tags

**Files:**
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: Remove border-radius from skill tags**

Change (around line 127):

```tsx
            <span key={skill} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: '100px', padding: '5px 12px' }}>
```

to:

```tsx
            <span key={skill} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: 0, padding: '5px 12px' }}>
```

- [ ] **Step 2: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "style: make About skill tags rectangular"
```

---

### Task 6: ServiceStaggerCards.tsx — rectangular tag

**Files:**
- Modify: `components/ui/ServiceStaggerCards.tsx`

- [ ] **Step 1: Remove border-radius from the service tag**

Change (around line 127-143):

```tsx
          <span
            key={tag}
            style={{
              fontSize: 8,
              letterSpacing: 1,
              borderRadius: '100px',
              padding: '3px 10px',
```

to:

```tsx
          <span
            key={tag}
            style={{
              fontSize: 8,
              letterSpacing: 1,
              borderRadius: 0,
              padding: '3px 10px',
```

- [ ] **Step 2: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/ServiceStaggerCards.tsx
git commit -m "style: make service card tag rectangular"
```

---

### Task 7: ProjectFilter.tsx — rectangular filter pills

**Files:**
- Modify: `components/project/ProjectFilter.tsx`

- [ ] **Step 1: Remove border-radius from filter pills**

Change (around line 47-58):

```tsx
            style={{
              background: active === c.key ? 'var(--teal)' : 'rgba(255,255,255,0.04)',
              color: active === c.key ? 'var(--bg)' : 'var(--muted)',
              border: active === c.key ? 'none' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 100,
              padding: '8px 20px',
```

to:

```tsx
            style={{
              background: active === c.key ? 'var(--teal)' : 'rgba(255,255,255,0.04)',
              color: active === c.key ? 'var(--bg)' : 'var(--muted)',
              border: active === c.key ? 'none' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 0,
              padding: '8px 20px',
```

- [ ] **Step 2: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/project/ProjectFilter.tsx
git commit -m "style: make project filter pills rectangular"
```

---

### Task 8: PrimaryButton.tsx — ticket-cut CTA

**Files:**
- Modify: `components/ui/PrimaryButton.tsx`

- [ ] **Step 1: Add the button ticket clip-path constant**

After the imports (around line 3), add:

```tsx
// components/ui/PrimaryButton.tsx
'use client'
import { ReactNode } from 'react'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

interface PrimaryButtonProps {
```

- [ ] **Step 2: Apply ticket cut to the inner button (keep the icon circle as-is)**

Change (around line 14-30):

```tsx
    <div
      style={{
        background: 'var(--teal)',
        color: 'var(--bg)',
        borderRadius: '100px',
        padding: '14px 28px',
```

to:

```tsx
    <div
      style={{
        background: 'var(--teal)',
        color: 'var(--bg)',
        borderRadius: 0,
        clipPath: BUTTON_TICKET_CLIP_PATH,
        padding: '14px 28px',
```

Do **not** change the icon circle style (`borderRadius: '50%'`, around line 36).

- [ ] **Step 3: Apply ticket cut to the outer shell**

Change (around line 46-52):

```tsx
    <div style={{
      background: 'rgba(0,194,168,0.06)',
      border: '1px solid rgba(0,194,168,0.15)',
      borderRadius: '100px',
      padding: '5px',
      display: 'inline-block',
    }}>
```

to:

```tsx
    <div style={{
      background: 'rgba(0,194,168,0.06)',
      border: '1px solid rgba(0,194,168,0.15)',
      borderRadius: 0,
      clipPath: BUTTON_TICKET_CLIP_PATH,
      padding: '5px',
      display: 'inline-block',
    }}>
```

- [ ] **Step 4: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/ui/PrimaryButton.tsx
git commit -m "style: apply ticket cut to PrimaryButton"
```

---

### Task 9: Contact.tsx — straight form fields + ticket-cut submit button

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Add the button ticket clip-path constant**

After the imports (around line 54), add:

```tsx
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

const schema = z.object({
```

- [ ] **Step 2: Straighten the name/email field wrappers**

Change (around line 158):

```tsx
              <div key={field} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors[field] ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: 2 }}>
                <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
```

to:

```tsx
              <div key={field} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors[field] ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 0, padding: 2 }}>
                <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 0 }}>
```

- [ ] **Step 3: Straighten the project type field wrapper**

Change (around line 165-166):

```tsx
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.projectType ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
```

to:

```tsx
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.projectType ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 0, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 0 }}>
```

- [ ] **Step 4: Straighten the message field wrapper**

Change (around line 174-175):

```tsx
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.message ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
```

to:

```tsx
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.message ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 0, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 0 }}>
```

- [ ] **Step 5: Apply ticket cut to the submit button shell and button**

Change (around line 187-202) from:

```tsx
            <div style={{ background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', borderRadius: '100px', padding: 4 }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: 'var(--teal)', color: 'var(--bg)', borderRadius: '100px',
                  padding: '14px 24px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', width: '100%',
                  fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Mensaje enviado!' : 'Enviar mensaje'}
                <span style={{ width: 28, height: 28, background: 'rgba(4,12,10,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↗</span>
              </button>
            </div>
```

to:

```tsx
            <div style={{ background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', borderRadius: 0, clipPath: BUTTON_TICKET_CLIP_PATH, padding: 4 }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: 'var(--teal)', color: 'var(--bg)', borderRadius: 0,
                  clipPath: BUTTON_TICKET_CLIP_PATH,
                  padding: '14px 24px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', width: '100%',
                  fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Mensaje enviado!' : 'Enviar mensaje'}
                <span style={{ width: 28, height: 28, background: 'rgba(4,12,10,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↗</span>
              </button>
            </div>
```

The icon `<span>` keeps `borderRadius: '50%'`.

- [ ] **Step 6: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "style: straighten contact form fields and apply ticket cut to submit button"
```

---

### Task 10: Project detail page — rectangular tags, ticket CTA, straight galleries

**Files:**
- Modify: `app/(site)/proyectos/[slug]/page.tsx`

- [ ] **Step 1: Add the button ticket clip-path constant**

After the imports (around line 7), add:

```tsx
import type { Metadata } from 'next'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

interface Props {
```

- [ ] **Step 2: Make tech tags rectangular**

Change (around line 144):

```tsx
                <span key={tool} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: '100px', padding: '3px 10px' }}>
```

to:

```tsx
                <span key={tool} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: 0, padding: '3px 10px' }}>
```

- [ ] **Step 3: Apply ticket cut to "Visitar sitio web"**

Change (around line 157-173) from:

```tsx
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--teal)', color: 'var(--bg)',
                borderRadius: '100px', padding: '10px 20px',
                fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700,
                letterSpacing: 1.5, textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Visitar sitio web ↗
            </a>
          )}
```

to:

```tsx
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--teal)', color: 'var(--bg)',
                borderRadius: 0, clipPath: BUTTON_TICKET_CLIP_PATH, padding: '10px 20px',
                fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700,
                letterSpacing: 1.5, textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Visitar sitio web ↗
            </a>
          )}
```

- [ ] **Step 4: Straighten mosaic gallery image containers**

Change (around line 198-203):

```tsx
                      <div key={ci} style={{
                        flex: row.type === 'full' ? '1 1 100%' : '1 1 50%',
                        borderRadius: 16, overflow: 'hidden',
                        position: 'relative',
                        aspectRatio: row.type === 'full' ? '16/9' : '4/5',
                      }}>
```

to:

```tsx
                      <div key={ci} style={{
                        flex: row.type === 'full' ? '1 1 100%' : '1 1 50%',
                        borderRadius: 0, overflow: 'hidden',
                        position: 'relative',
                        aspectRatio: row.type === 'full' ? '16/9' : '4/5',
                      }}>
```

- [ ] **Step 5: Straighten stacked images**

Change (around line 221-235) from:

```tsx
              {project.sliceUrls?.map((url, i) => {
                const total = project.sliceUrls!.length
                const borderRadius = i === 0
                  ? '20px 20px 0 0'
                  : i === total - 1
                    ? '0 0 20px 20px'
                    : '0 0 0 0'
                return (
                  <img
                    key={i}
                    src={url}
                    alt={`${project.title} — imagen ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', display: 'block', borderRadius }}
                  />
                )
              })}
```

to:

```tsx
              {project.sliceUrls?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${project.title} — imagen ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: 0 }}
                />
              ))}
```

- [ ] **Step 6: Straighten cover image container**

Change (around line 242):

```tsx
                <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 16, position: 'relative', aspectRatio: '16/10' }}>
```

to:

```tsx
                <div style={{ borderRadius: 0, overflow: 'hidden', marginBottom: 16, position: 'relative', aspectRatio: '16/10' }}>
```

- [ ] **Step 7: Straighten slice image containers**

Change (around line 257):

```tsx
                    <div key={i} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
```

to:

```tsx
                    <div key={i} style={{ borderRadius: 0, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
```

- [ ] **Step 8: Verify with TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 9: Commit**

```bash
git add "app/(site)/proyectos/[slug]/page.tsx"
git commit -m "style: straighten project detail galleries/tags and apply ticket cut to live site link"
```

---

### Task 11: Final build and visual check

**Files:** none (validation only)

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes with no errors

- [ ] **Step 3: Visual check in dev server**

Run: `npm run dev`

Open the site and check:
- Nav (desktop pill + mobile drawer) and "Hablemos" CTAs: straight corners, visible 8px diagonal cut on the CTA buttons
- Hero "Ver proyectos" button: straight + ticket-cut, icon circle still round
- EyebrowPill, About skill tags, service card tags, project filter pills, project tech tags: rectangular (no rounded corners)
- Contact form: field wrappers straight-edged, submit button ticket-cut, icon circle still round
- Project detail page: gallery images straight-edged, "Visitar sitio web" ticket-cut
- Cursor, decorative dots, arrow badges: still circular (unchanged)

Stop the dev server when done.
