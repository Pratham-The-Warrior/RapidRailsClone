# RapidRail Backend Service

The RapidRail Backend is a high-performance Node.js/Express service that serves as the orchestration layer for the Indian Railways Train Route Optimization system. It facilitates communication between the React-based frontend and the high-efficiency C++ routing engine.

---

## 🏗️ Architectural Overview

The backend follows a **Bridge Pattern** to integrate a high-performance C++ engine with a modern web interface. It handles input validation, request transformation, process management for the C++ engine (IPC), and error propagation.

### 🔄 Data Flow
1. **Request**: Frontend sends a JSON payload to the `/api/route` endpoint.
2. **Validation**: `validator.js` ensures the input adheres to the required schema.
3. **Bridge Execution**: `engineBridge.js` spawns the C++ binary and pipes the JSON request via `stdin`.
4. **Processing**: The C++ Engine parses the request and `trains.json`, runs the Dijkstra-based optimization, and writes the result to `stdout`.
5. **Response**: Node.js captures the `stdout`, parses the result, and returns it to the frontend.

---

## 📁 Directory Structure

```text
backend/
├── src/
│   ├── server.js           # Entry point: Express app and middleware setup
│   ├── routes/
│   │   └── api.js          # Route definitions for the API
│   ├── controllers/
│   │   └── routeController.js # Logic for handling routing requests
│   ├── services/
│   │   └── engineBridge.js  # IPC manager for Spawn/Pipe to C++ engine
│   ├── middleware/
│   │   ├── validator.js    # Input schema validation (e.g., Joi/Zod)
│   │   └── errorHandler.js # Centralized error handling
│   └── config/
│       └── constants.js    # Shared constants and configuration
├── tests/                  # Unit and integration tests
├── .env                    # Environment variables (Port, Engine Path)
├── package.json            # Dependencies and scripts
└── README.md               # Quick setup guide
```

---

## 🚀 API Specification

### Find Optimal Route
`POST /api/route`

Calculates the optimal train route between two stations based on time and constraints.

**Request Body**
```json
{
  "source": "GKP",
  "destination": "DR",
  "date": "2026-02-15",
  "max_switches": 2,
  "max_wait_time": 240,
  "preferred_classes": ["2A", "3A", "SL"]
}
```

**Success Response (200 OK)**
```json
{
  "status": "success",
  "data": {
    "total_time": 1580,
    "switches": 1,
    "segments": [
      {
        "train_number": "12541",
        "from": "GKP",
        "to": "LKO",
        "departure": "14:20",
        "arrival": "19:30"
      },
      ...
    ]
  }
}
```

**Error Responses**
- `400 Bad Request`: Validation error (missing fields, invalid station codes).
- `404 Not Found`: No route found between the specified stations.
- `500 Internal Server Error`: C++ engine crash or IPC failure.

---

## ⚙️ Engine Bridge (IPC)

The `engineBridge.js` uses Node.js `child_process.spawn` to communicate with the C++ engine. This ensures that the heavy computation does not block the Node.js event loop.

```javascript
// Conceptual Bridge Logic
const { spawn } = require('child_process');
const engine = spawn('./bin/train_engine', [TRAINS_JSON_PATH]);

engine.stdin.write(JSON.stringify(requestPayload));
engine.stdin.end();

engine.stdout.on('data', (data) => {
  // Parse and return result
});
```

---

## 🔧 Setup & Configuration

### Prerequisites
- Node.js (v18+)
- Compiled C++ Engine Binary (see `/engine`)

### Environment Variables
Create a `.env` file in the `backend/` root:
```env
PORT=5000
ENGINE_PATH=../engine/bin/train_engine
DATA_PATH=../engine/data/trains.json
NODE_ENV=development
```

### Installation
```bash
cd backend
npm install
npm run dev
```

---

## 🛡️ Security & Validation
- **Input Sanitization**: All incoming requests are validated against station code regex and date formats.
- **Process Isolation**: The C++ engine runs as a separate process with limited permissions.
- **Error Handling**: Graceful handling of engine timeouts or segmentation faults.
