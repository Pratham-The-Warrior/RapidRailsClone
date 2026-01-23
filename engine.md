```
stdin JSON request
        ↓
train_engine.cpp
        ↓ parses → SearchRequest struct
utils/graph.cpp → build graph from trains.json
utils/dijkstra.cpp → run algorithm
utils/time_utils.cpp → handle times & day offsets
        ↓
stdout JSON result
```

```
engine/
│
├── src/
│   └── train_engine.cpp      # Main C++ source file
├── bin/
│   └── train_engine          # Compiled binary
├── data/
│   └── trains.json           # Indian Railways schedule data
├── include/
│   └── json.hpp              # nlohmann/json header for JSON parsing
└── utils/
    ├── graph.h/cpp           # Graph structures (nodes, edges)
    ├── dijkstra.h/cpp        # Dijkstra algorithm implementation
    └── time_utils.h/cpp      # Time conversion / cross-midnight functions
```