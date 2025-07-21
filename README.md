
# Threat Intel Dashboard

A simple and efficient full-stack application to check the risk level of IP addresses using public threat intelligence APIs.

## Features

- Input any IPv4 address and retrieve relevant data.
- Data is fetched from:
  - AbuseIPDB (abuse reports and risk score)
  - IPQualityScore (fraud detection, VPN/proxy flags)
- Result includes:
  - IP address, hostname, ISP, country
  - Abuse score, recent reports
  - Threat score, VPN/proxy detection
- Risk level indication (Low / Medium / High) with color coding
- Persistent search history (stored locally)
- Graceful handling of rate limits (HTTP 429)
- Fully tested backend and frontend components

## Tech Stack

- Frontend: React (with Context API), Vite, React Testing Library, Vitest
- Backend: Node.js, Express, Axios, Jest
- APIs: AbuseIPDB, IPQualityScore

## Installation and Setup

### Clone and Install

```bash
git clone https://github.com/Miriam-Wolpin/threat-intel-dashboard.git
cd threat-intel-dashboard
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your API keys in .env
npm run dev
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Then navigate to: http://localhost:5173

## .env Configuration

In `backend/.env`, create the following variables:

```
ABUSE_IPDB_KEY=your_abuse_ipdb_key_here
IP_QUALITY_KEY=your_ipqualityscore_key_here
```

## Running Tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npx vitest
```

## Folder Structure

- `frontend/`: React app (with components, context, hooks, utils, and tests)
- `backend/`: Node.js API server (with routes, services, utils, and tests)

## Development Notes

This project was built with clarity and simplicity in mind, balancing clean modular code with practical features. A few tradeoffs and design decisions include:

- **Context API over Redux**: For global state management, I used React's built-in Context API. Since the app's state needs were limited (mainly result data and loading/error flags), Context was a lightweight and maintainable choice.

- **Client-side validation**: IP validation was handled both on the client (optional UX enhancement) and server (strict validation for safety). The regex was refined during testing to ensure accuracy.

- **API response aggregation**: The backend acts as a BFF (Backend for Frontend), merging two external API responses into one unified object. This makes the frontend simpler and decouples it from third-party formats.

- **Testing strategy**: I focused on key logic and component behavior. The backend tests mock external APIs and validate aggregation. The frontend tests cover rendering, state transitions, and error handling.

- **Rate limit handling**: External APIs may block requests after a threshold. I implemented graceful 429 handling both server-side and in the UI, so the user isn't confused by cryptic errors.

- **Styling**: Since the focus was on functionality and architecture, styling was intentionally minimal. The component structure allows easy integration of design systems like Tailwind or Material UI if desired.


