# Suppanut Sukuntapuksa — Portfolio

A minimal, editorial portfolio for a Senior UX/UI Designer. Built with
**Next.js 16 + Tailwind CSS v4 + Motion**. Showcases UX/UI and web design work
as full case studies.

## Run it

```bash
npm install      # first time only
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where everything lives

```
app/
  page.tsx              Home (hero + selected work + about teaser)
  work/page.tsx         All work (filterable by category)
  work/[slug]/page.tsx  Case-study template (one per project, auto-generated)
  about/page.tsx        About
  contact/page.tsx      Contact
  globals.css           Colors, fonts, base styles
components/             Nav, Footer, Hero, cards, animations
lib/
  projects.ts           ★ ALL PROJECT CONTENT — edit here
  site.ts               ★ Your name, bio, email, links — edit here
public/work/            ★ Project images go here
```

## Editing your content

**1. Personal info** → `lib/site.ts`
Name, role, bio, email, and social links (Dribbble, LottieFiles, LinkedIn, CV).

**2. Projects & case studies** → `lib/projects.ts`
Each project is one object in the `projects` array. The fields:

| field        | what it does                                              |
|--------------|-----------------------------------------------------------|
| `title`      | Project name                                              |
| `category`   | `"UX/UI Design"` or `"Web Design"` (drives the filters)   |
| `summary`    | One-line tagline shown in lists                           |
| `client/role/year/tags` | Meta shown on the case-study page              |
| `accent`     | Hex color for the placeholder block until you add images  |
| `overview`   | The big opening paragraph                                 |
| `sections`   | The case study: challenge → process → solution → impact   |
| `metrics`    | Optional headline stats (value + label)                   |
| `gallery`    | How many image slots to show                              |

The case-study sections currently contain **placeholder text** — replace each
`body` with your real story. The home page features the first 6 projects; reorder
the array to change which ones (and in what order) appear.

## Adding your images

No images are required — every project shows a colored placeholder with its
initials until you add files. To use real screenshots, drop them here:

```
public/work/<slug>/cover.jpg   ← main image (cards + case-study hero)
public/work/<slug>/01.jpg      ← gallery image 1
public/work/<slug>/02.jpg      ← gallery image 2  ... etc.
```

`<slug>` is the project's `slug` in `lib/projects.ts`
(e.g. `public/work/bitkub-next/cover.jpg`). Images fade in automatically once
present — no code changes needed. JPG, PNG, or WebP all work.

## Deploying (free)

Push to GitHub, then import the repo at [vercel.com](https://vercel.com) — it
auto-detects Next.js and deploys on every push. You can add a custom domain in
the Vercel dashboard.
