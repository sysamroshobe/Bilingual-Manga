# Local Hosting Setup

This project is ready to run locally after cloning.

## Requirements

- Node.js 20+ (22 recommended)
- npm 10+
- Git (for clone/pull)

## 1) Clone and enter project

```powershell
git clone <your-repo-url>
cd Bilingual_Manga-home--src-
```

## 2) Extract bundled database

The repo tracks `database-json.zip` and excludes extracted large JSON from git.

### Why this is done

- The big files (`json/BM_data.manga_data.json`, etc.) are not stored directly in git history.
- Instead, the repo stores `database-json.zip`.
- After cloning/pulling, you run `npm run db:extract` to recreate those JSON files locally.
- This keeps the repo cleaner and avoids huge tracked JSON churn.
- It still lets everyone get the needed DB from one bundled file in the repo.

```powershell
npm run db:extract
```

This creates:
- `json/BM_data.manga_data.json`
- `json/BM_data.manga_metadata.json`
- `json/dw.json`

## 3) Install dependencies

```powershell
npm install
```

## 4) Run locally (fullstack, one command)

```powershell
npm run dev
```

Open: `http://localhost:5173`

## Useful scripts

- `npm run db:extract` ? unzip DB archive into `json/`
- `npm run db:pack` ? rebuild `database-json.zip` from current `json/` files
- `npm run setup:local` ? install + extract DB in one command

## Repository storage strategy

- Keep `database-json.zip` in repo (small enough for GitHub)
- Do not commit extracted large JSON files (`.gitignore` handles this)
