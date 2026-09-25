# FreshFind (React)

React + Vite conversion of the original FreshFind vanilla JS SPA.

## Setup
```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
```

## Structure
- `src/pages` – route-level pages (Home, Markets, MarketDetail, Produce, ProduceDetail, Contact, About, NotFound)
- `src/components` – reusable UI (Header, Chatbot, MarketCard, ProduceCard, filters, etc.)
- `src/context` – shared state via React Context (app data + geolocation, toast notifications)
- `src/hooks` – small hooks (market filtering, share, live clock/status)
- `src/utils` – pure helper functions (market status/mood, storage)
- `src/data` – original JSON data files (markets, produce, chatbot), bundled at build time
- `public/assets` – original images/video, served as static files

## Notes
- Routing uses `react-router-dom` with `HashRouter`, so URLs still look like `#/markets/...` just like the original.
- Visit count still uses `localStorage`.
- The bookmarks/favorites feature and the login/signup demo modal have both been removed. Remaining features: filtering/sorting markets, produce guide, market/produce detail pages with maps, geolocation-based distance sorting, rule-based chatbot, featured market spotlight, live clock and animated visit counter.
