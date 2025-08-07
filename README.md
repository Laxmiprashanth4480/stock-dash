# Stock Market Dashboard

A full‑stack **MERN** application that lets you monitor real‑time stock quotes, build and track virtual portfolios, simulate buy/sell orders, and explore market trends with interactive charts.  


---

## ✨ Features

| Category | Highlights |
|----------|------------|
| **Market Data** | Live price feed with automatic refresh; day/high/low indicators |
| **Portfolio** | Add/remove holdings, view total P&L, average cost & allocations |
| **Trading Simulator** | Virtual cash balance, limit & market orders, order history |
| **Analytics** | Candlestick and line charts, technical indicators, comparators |
| **Auth & Security** | JWT‑based login/registration, hashed passwords, protected routes |
| **Responsive UI** | Optimised for desktop & mobile with dark‑mode support |

---

## 🏗 Tech Stack

- **Frontend:** React 18, Redux Toolkit, Tailwind CSS, Recharts  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Realtime:** WebSockets (Socket.io) for streaming quotes  
- **Testing:** Jest, React Testing Library, Supertest  
- **Tooling:** Vite, ESLint + Prettier, Husky ± lint‑staged  

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js     | ≥ 18.x |
| npm / yarn  | latest |
| MongoDB     | running locally or Atlas cluster |

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/ChadubulaVani/EazyByts-Module-2.git
cd EazyByts-Module-2

# 2. Install dependencies
# (uses workspaces – install once at the root)
npm install

# 3. Set up environment variables
cp .env.example .env
# update MONGODB_URI, JWT_SECRET, API_KEY etc.

# 4. Start both servers (concurrently)
npm run dev
```

> Visit **http://localhost:5173** to view the app. The API runs on **http://localhost:5000** by default.

---

## 📂 Project Structure

```
EazyByts-Module-2
├─ client/            # React app
│  ├─ src/
│  │  ├─ components/
│  │  ├─ features/    # Redux slices
│  │  ├─ hooks/
│  │  └─ pages/
├─ server/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ sockets/
└─ docs/              # Postman collection & screenshots
```

---

## 🧪 Running Tests

```bash
# Front‑end unit & integration tests
npm run test --workspace=client

# Back‑end API tests
npm run test --workspace=server
```

---

## 🔒 Environment Variables

Name | Purpose
-----|---------
`MONGODB_URI` | MongoDB connection string
`JWT_SECRET`  | Secret key for signing JSON Web Tokens
`ALPHA_VANTAGE_KEY` | (Optional) external market‑data provider API key

---

## 🤝 Contributing

1. Fork the repo & create a feature branch  
2. Follow the existing code style (`npm run lint`)  
3. Commit with conventional commits  
4. Open a pull request – describe **what** & **why**  

---

## 📜 License

Distributed under the **MIT License** – see [`LICENSE`](LICENSE) for details.

---

## 🙏 Acknowledgements

- [Alpha Vantage](https://www.alphavantage.co/) for free stock APIs  
- [Recharts](https://recharts.org/) for charting components   
