# Bilingual_Manga-home--src-

Source code of bilingual manga(home), packaged for local hosting after clone/pull.

## Quick start

1. Install dependencies:
   - `npm install`
2. Extract bundled database files:
   - `npm run db:extract`
3. Run backend (terminal 1):
   - `node app.js`
4. Run frontend (terminal 2):
   - `npm run dev`

Open `http://localhost:5173`.

## Database packaging

This repo includes `database-json.zip` with:
- `json/BM_data.manga_data.json`
- `json/BM_data.manga_metadata.json`
- `json/dw.json`

The extracted large JSON files are git-ignored; use the archive for transport.

## Utility scripts

- `npm run db:extract` - unzip `database-json.zip` into `json/`
- `npm run db:pack` - rebuild `database-json.zip` from current `json/` files
- `npm run setup:local` - install deps + extract database

## Full setup guide

See `SETUP.md`.
