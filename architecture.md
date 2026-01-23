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
├── backend/                       # Node.js / Express backend
│   ├── src/
│   │   ├── server.js              # Express app
│   │   ├── engineBridge.js        # Calls C++ engine binary
│   │   └── validator.js           # Input validation
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
