# FreshFind

FreshFind is a React + Vite website for discovering fresh produce, local markets, seasonal information, and market prices. It does not sell products and has no cart, checkout, backend, or database.

## Setup

```bash
npm install
npm run dev      # start the local development server
npm run build    # create the production build in dist/
```

## Main features

- Home page with responsive FreshFind header, hero section, market discovery, live clock, and visitor counter.
- Markets page with market cards, open/closed status, filtering, sorting, location information, and map details.
- Produce Guide with fruit, vegetable, and dairy products, seasonal information, market availability, search, filters, detail pages, bookmarks, and sharing.
- Seasonal page for seasonal produce discovery.
- Contact, About, authentication demo, and location picker interfaces.
- Existing rule-based chatbot for FreshFind questions. The chatbot remains a separate feature and does not provide price comparisons.
- Responsive desktop, tablet, and mobile layouts. The header stays fixed while scrolling and uses controlled responsive navigation.

## Spatial AI Price Comparison

The Spatial AI Price Comparison page is an additional standalone feature at `#/price-comparison`.

It allows users to search or select a fruit, vegetable, or dairy product and compare the same unit across available markets. Each result can show:

- Product name and category
- Market name
- Price and unit
- Market location and distance, when available
- Best shown price and market navigation link

Price data is read from `src/data/priceComparisons.json`; prices are not hardcoded in the page component. Product and market information is reused from the project JSON data. If a product has no price records, the page shows an unavailable-data message instead of inventing a price.

The page includes a demo-price disclaimer because sample prices may differ from real market prices. It has no cart, checkout, purchase, or e-commerce behavior.

The product selector uses the reusable animated `src/components/FilterSelect.jsx` component rather than a native browser select. It opens downward, closes when clicking outside, and uses the existing FreshFind styling.

## Data and structure

- `src/pages` - route-level pages, including `PriceComparison.jsx`.
- `src/components` - reusable UI such as `Header`, `Chatbot`, `FilterSelect`, cards, maps, and modals.
- `src/context` - shared application state, data, geolocation, bookmarks, and notifications.
- `src/hooks` - filtering, sharing, clock, and market-status hooks.
- `src/utils` - reusable helper functions and storage utilities.
- `src/data` - JSON data for markets, produce, chatbot responses, price comparisons, contact content, and About content.
- `public/assets` - static images and other public assets.
- `src/theme.css` and `src/index.css` - global design, responsive layout, header, chatbot, and component styles.

## Important implementation notes

- Routing uses `react-router-dom` with `HashRouter`, so routes continue to use URLs such as `#/markets/...`.
- The chatbot logic, questions, answers, and UI are separate from the Spatial AI price comparison feature.
- Price, market, and product values are supplied through JSON files; there is no backend or database.
- The header uses CSS responsive behavior instead of JavaScript based on `window.innerWidth`, so browser zoom does not incorrectly switch a normal desktop header into a mobile menu.
- The chatbot header has responsive spacing so its title, reset button, and close button remain aligned on smaller widths.
- Demo visitor counts and bookmarks use browser `localStorage` where applicable.

## Deployment

For Vercel, import the GitHub repository and use these settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

After the first deployment, pushes to the connected production branch automatically create a new deployment.