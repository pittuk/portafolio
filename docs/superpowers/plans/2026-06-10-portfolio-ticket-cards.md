# Portfolio Ticket Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rounded corners (`borderRadius: 20` + `overflow: 'hidden'`) on the Portfolio section's project cards and "Ver todos" CTA cards with the same ticket-style diagonal-cut `clip-path` used by `ServiceStaggerCards`.

**Architecture:** Two files change. `components/project/ProjectCard.tsx` swaps its rounded-corner styling for the ticket `clip-path` (covers both the desktop horizontal carousel and the mobile grid, since both render `ProjectCard`). `components/sections/Portfolio.tsx` defines a shared `TICKET_CLIP_PATH` constant and applies it to its two "Ver todos" CTA buttons (mobile and desktop), replacing their `borderRadius: 20`.

**Tech Stack:** Next.js 16 / React 19 / TypeScript, plain inline styles (no Tailwind/`cn`), CSS `clip-path`.

There is no test runner in this project (no jest/vitest config). Verification is via `npx tsc --noEmit`, `npm run build`, and manual visual check with `npm run dev`.

---

### Task 1: Apply ticket clip-path to ProjectCard

**Files:**
- Modify: `components/project/ProjectCard.tsx:58-71`

- [ ] **Step 1: Replace borderRadius/overflow with clip-path**

In `d:\Documentos\Pittuk\web\Nueva propuesta\components\project\ProjectCard.tsx`, find this block (around lines 58-71):

```tsx
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 20,
          overflow: 'hidden',
          height: '100%',
          minHeight: 200,
          cursor: 'none',
          ...style,
        }}
      >
```

Replace it with:

```tsx
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
          height: '100%',
          minHeight: 200,
          cursor: 'none',
          ...style,
        }}
      >
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors referencing `ProjectCard.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/project/ProjectCard.tsx
git commit -m "style: apply ticket clip-path to project cards"
```

---

### Task 2: Apply ticket clip-path to Portfolio CTA cards

**Files:**
- Modify: `components/sections/Portfolio.tsx`

- [ ] **Step 1: Add the shared clip-path constant**

In `d:\Documentos\Pittuk\web\Nueva propuesta\components\sections\Portfolio.tsx`, find the top of the file (lines 1-13):

```tsx
'use client'
import { useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '@/components/project/ProjectCard'
import type { Project } from '@/types'
import { useMediaQuery } from '@/lib/useMediaQuery'

interface PortfolioProps {
  projects: Project[]
}
```

Replace it with:

```tsx
'use client'
import { useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '@/components/project/ProjectCard'
import type { Project } from '@/types'
import { useMediaQuery } from '@/lib/useMediaQuery'

const TICKET_CLIP_PATH = 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)'

interface PortfolioProps {
  projects: Project[]
}
```

- [ ] **Step 2: Update the mobile "Ver todos" CTA card**

Find this line (around line 115):

```tsx
          <button onClick={goToProjects} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,194,168,0.12)', borderRadius: 20, gap: 8, cursor: 'pointer', color: 'var(--teal)', background: 'rgba(0,194,168,0.02)', padding: '32px 20px' }}>
```

Replace it with:

```tsx
          <button onClick={goToProjects} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,194,168,0.12)', clipPath: TICKET_CLIP_PATH, gap: 8, cursor: 'pointer', color: 'var(--teal)', background: 'rgba(0,194,168,0.02)', padding: '32px 20px' }}>
```

- [ ] **Step 3: Update the desktop "Ver todos" CTA card**

Find this block (around lines 193-204):

```tsx
        <button
          onClick={goToProjects}
          className="h-card"
          style={{
            flex: '0 0 auto', width: 200,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(0,194,168,0.12)',
            borderRadius: 20, gap: 12, cursor: 'pointer',
            color: 'var(--teal)', background: 'rgba(0,194,168,0.02)',
          }}
        >
```

Replace it with:

```tsx
        <button
          onClick={goToProjects}
          className="h-card"
          style={{
            flex: '0 0 auto', width: 200,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(0,194,168,0.12)',
            clipPath: TICKET_CLIP_PATH, gap: 12, cursor: 'pointer',
            color: 'var(--teal)', background: 'rgba(0,194,168,0.02)',
          }}
        >
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors referencing `Portfolio.tsx`

- [ ] **Step 5: Commit**

```bash
git add components/sections/Portfolio.tsx
git commit -m "style: apply ticket clip-path to portfolio CTA cards"
```

---

### Task 3: Visual verification

**Files:** none (manual check)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: succeeds with zero errors

- [ ] **Step 2: Run dev server and check the section**

Run: `npm run dev`
Open the site and scroll to `#portfolio`. Verify:
- Desktop (>=769px): horizontal carousel cards show the diagonal cut at the top-right corner; the project cover image is clipped to the ticket shape (no overflow); hover tilt + arrow badge still work without visual glitches; the "Ver todos" CTA card (200px wide) also shows the ticket cut
- Mobile (<768px): grid cards (1 column) show the diagonal cut; the "Ver todos" CTA card at the bottom of the grid also shows the ticket cut

- [ ] **Step 3: Stop the dev server**

No commit needed for this task (verification only).
