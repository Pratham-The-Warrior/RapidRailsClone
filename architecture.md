Tentative Project Structure
```
RapidRail/
│
├── engine/                        # C++ routing engine
│   ├── data/
│   │   └── trains.json            # Central train schedule data
│   ├── include/
│   │   └── json.hpp               # nlohmann/json header
│   ├── src/
│   │   └── train_engine.cpp       # Main logic
│   └── utils/
│       ├── graph.cpp/h            # Graph structures
│       ├── dijkstra.cpp/h         # Shortest path algorithm
│       └── time_utils.cpp/h       # Time conversion helpers
│
├── backend/                       # Node.js / Express backend (Modular)
│   ├── src/
│   │   ├── server.js              # Entry point
│   │   ├── routes/                # API route definitions
│   │   ├── controllers/           # Request handling logic
│   │   ├── services/              # Business logic & Engine Bridge
│   │   ├── middleware/            # Validation & Error handling
│   │   └── config/                # Constants & Environment config
│   ├── tests/                     # Unit & Integration tests
│   └── package.json
│
├── frontend/                      # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchCockpit.jsx  # Main search form & logic
│   │   │   ├── RouteCard.jsx      # Individual route display
│   │   │   └── UserProfile.jsx    # User sidebar drawer
│   │   ├── api.js                 # API client
│   │   ├── App.jsx                # Main layout & state
│   │   ├── index.css              # Global styles (Tailwind-style)
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
