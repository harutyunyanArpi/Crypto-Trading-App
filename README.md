# Crypto Trading App

This is a cryptocurrency trading application built with **React**, **TypeScript**, **Vite**, **SCSS** for styling, **Zustand** for state management, and **React Query** for efficient data fetching and caching. Users can browse a list of cryptocurrency assets, sort them by name or price, and initiate buy or sell actions. Trading functionality is accessible only after logging in, using a simulated authentication system for demonstration purposes. Styling is implemented with **SCSS**, utilizing variables, mixins, and modular structure for maintainability.

---

**Live Demo**:
https://harutyunyanarpi.github.io/Crypto-Trading-App/
---

##  Features

- Local login system with simulated authentication (no backend)
- Sortable and expandable cryptocurrency asset table
- Protected Trade route accessible only after login
- Real-time crypto prices fetched from the CoinGecko API
- Two-way conversion between selected crypto assets and USD
- Swap functionality to reverse input directions instantly
- State management with Zustand and data fetching with React Query
- Responsive, modern UI styled using SCSS with variables and mixins

---

##  Assumptions & Trade-offs

### Assumptions:

- Local login is sufficient for this demo; no real authentication or backend integration is implemented
- CoinGecko API is assumed to be reliable and publicly accessible without authentication
- Session persistence is handled locally
- Buy/Sell functionality is purely for simulation purposes and does not involve real transactions

### Trade-offs:

- No backend integration: trade history, user data, and real persistence are not supported
- No JWT or session tokens: authentication is simplified, reducing security realism
- React Query is used without custom retry handling configuration initially
- Swap and conversion logic may float slightly due to JS precision

---

## Tech Stack

- React + TypeScript
- Vite
- SCSS
- Zustand (authentication)
- React Query (data fetching + caching)
- CoinGecko API

## Advantages & Disadvantages of Technologies Used

| Technology        | Advantages                                                                           | Disadvantages                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| **React**         | Large ecosystem, reusable components, fast rendering with virtual DOM                | Can get complex with state management in large apps                           |
| **TypeScript**    | Type safety, better IDE support, reduces runtime errors                              | Requires learning curve, more verbose syntax                                  |
| **Vite**          | Fast startup and HMR, optimized builds out of the box                                | Limited plugin ecosystem compared to Webpack                                  |
| **SCSS**          | Nested syntax, variables, mixins, and better style structure for large-scale styling | Can lead to deeply nested code if not structured well; requires build tooling |
| **Zustand**       | Minimal API, easy to use, no boilerplate                                             | Lacks built-in middleware and devtools out of the box                         |
| **React Query**   | Handles caching, background sync, request deduplication                              | Can add complexity if not configured properly                                 |
| **CoinGecko API** | Free, public, and extensive crypto data                                              | Rate limits, no authentication—risk of unavailability or misuse               |

---

## 📂 Folder Structure

```
src/
├── components/       # Reusable UI (Header, Table, Modal, ErrorBoundary)
├── pages/            # Home and Trade pages
├── store/            # Zustand auth state
├── hooks/            # React Query hooks
├── routes/           # App routing + protection
├── services/         # For API interaction logic, reusable across features
├── utils/            # Utils for the app
├── enums/            # All the global enums
├── types/            # All the global types
├── styles/            # All the global styles
├── App.tsx
├── main.tsx
```

---

## 🔧 Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/harutyunyanArpi/Crypto-Trading-App.git
cd crypto-trading-app

# 2. Install dependencies
npm install

# 3. Create a .env file
cp .env.example .env

# 4. Run the dev server
npm run dev

Visit `http://localhost:5173` to view the app.


---

## Usage

1. **Log In** with any email
2. On **Home Page**:
   - View top 10 assets
   - Sort by name or price
   - Show more assets
   - Use Buy/Sell dropdown
3. On **Trade Page**:
   - Convert crypto ⇄ fiat
   - Swap inputs
   - Live rate updates

---

## Linting, Formatting, and Git Hooks

- Prettier + ESLint
- Husky pre-commit hook
- `lint-staged` config ensures code is clean

---
