# 🚀 SkillVerse (AR KORE LOGICS)

SkillVerse is a career workspace platform that helps learners become industry-ready through structured learning roadmaps, curated resources, mentorship and community support. Learners pick a path, follow an interactive roadmap, unlock modules step by step and track their progress from beginner to professional.

## ✨ Features

- **Landing page** – hero, career paths, how it works, product demo, benefits, mentors, testimonials, pricing, FAQ and final CTA
- **Auth** – sign up, log in, log out and forgot password with Supabase Auth; protected dashboard routes via middleware
- **Onboarding** – choose a career track (includes an Artificial Intelligence track aligned with the CBSE Class 9 curriculum)
- **Roadmaps** – an 8-module AI course (Start Your AI Journey → AI Project Cycle → Understand Data → Math for AI → Discover Gen AI → Python Fundamentals → Logic & Loops → Lists, Projects & Exam Prep)
- **Module pages** – weekly poster-style lessons, progress tracking and **progressive unlocking** (next module unlocks when the current one is completed)
- **Resources** – 20 study materials (DSA, DBMS, OS, CN, ML, Java, IoT, Web Programming and more) as `.docx` files, previewed in the browser with Mammoth
- **Mentorship** – mentor list and booking dialog to schedule sessions
- **Community** – create posts and comments
- **Courses & Settings** pages
- Privacy policy, terms, sitemap, robots, custom 404 and error pages

## 🛠️ Tech Stack

| Area | Tech |
|------|------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Lucide icons |
| Animation | Framer Motion |
| Backend | Next.js API routes + Supabase (Postgres, Auth) |
| Docs preview | Mammoth (`.docx` → HTML) |
| Validation | Zod |
| Analytics | Vercel Analytics |

## 📁 Project Structure

```
AR-KORE-LOGICS/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── login/ signup/ forgot-password/ onboarding/
│   ├── dashboard/               # Overview, roadmaps, module/[id], courses,
│   │                            # resources, mentorship, community, settings
│   └── api/                     # auth, roadmaps, modules/[id], mentors, community, settings
├── components/                  # Landing + dashboard components
├── lib/                         # Supabase clients, db helpers, auth, career context
├── public/
│   ├── ai-course/               # Weekly AI lesson posters (week 1–8)
│   └── resources/               # Study material (.docx)
├── documentation/               # PRD, TRD, DRD, UI, structure and build notes
├── supabase-schema.sql          # Tables: users, mentors, sessions, posts, comments, progress
└── middleware.ts                # Session refresh + route protection
```

## 🚀 Run Locally

**Prerequisites:** Node.js 18+, pnpm (or npm) and a Supabase project.

```bash
git clone https://github.com/shivamani-code/AR-KORE-LOGICS.git
cd AR-KORE-LOGICS
pnpm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Run `supabase-schema.sql` in the Supabase SQL editor, then:

```bash
pnpm dev        # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## 📄 Documentation

Product, technical, design and UI docs live in the `documentation/` folder; the audit and changelog notes are in `PRODUCTION_AUDIT_REPORT.md`, `PRODUCTION_IMPROVEMENTS_SUMMARY.md` and `IMPROVEMENTS_CHANGELOG.md`.
