# Train Route Optimization – Frontend (React)

A precise, production-ready frontend project structure for the Train Route Optimization system.

This structure explicitly supports **all search parameters**:

* Source station
* Destination station
* Travel date
* Maximum switches
* Maximum wait time
* Preferred classes
* Sorting preference (time / switches)

---

## Final Project Structure

```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── SearchCockpit.jsx      # Main search form with validation
│   │   ├── RouteCard.jsx          # Summarized and expanded route view
│   │   └── UserProfile.jsx        # Premium sidebar drawer
│   │
│   ├── api.js                     # API communication layer
│   ├── App.jsx                    # Root component with search logic
│   ├── index.css                  # Comprehensive design system
│   └── main.jsx                   # Entry point
│
├── package.json
└── vite.config.js
```

---

## Component Architecture

### SearchCockpit.jsx

The primary search interface. It manages:
* **Form State**: `from`, `to`, `date`, `maxSwitches`, `maxWait`, `classes`, `sortBy`.
* **Validation**: Checks for same source/destination and ensures classes are selected.
* **Layout**: Horizontal station group with swap capability, options row, and class chips.

### RouteCard.jsx

Handles the rendering of travel options:
* **Route Summary**: Displays duration, switch count, timeline (times/codes), and dates.
* **Expanded View**: Shows a detailed breakdown of each segment (train info, durations, wait times).
* **States**: Collapsed for easy scanning, expanded for journey planning.

### UserProfile.jsx

A slide-out drawer providing:
* **User Identity**: Avatar, name, and loyalty status (e.g., Gold Member).
* **Quick Tools**: PNR status checker.
* **History**: Upcoming journey summaries.
* **Saved Data**: Quick access to passenger profiles.

---

## API & Data Flow

### api.js
* Uses `fetch` to POST search parameters to `/api/route`.
* Handles error responses and JSON parsing.

### App.jsx (State Central)
* Manages `routes`, `loading`, `searched`, and `error` states.
* Executes the search flow: Validates → Calls API → Updates UI.
* **Mock Fallback**: Implements a dedicated fallback mechanism that provides dynamic, realistic train routes if the backend API is unreachable or returns an error. This ensures a consistent demo experience even without the routing engine.

---

## Design System

The frontend uses a custom design system defined in `index.css`, featuring:
* **Brand Colors**: `--ir-blue` (#003366) and `--ir-orange` (#FF6B00).
* **Glassmorphism**: Translucent cards with backdrop blur.
* **Micro-interactions**: Hover effects, smooth transitions for drawers and cards.
* **Responsive Layout**: Adapts from mobile-first timeline to desktop dashboards.
