# Novig Take-home Assessment
## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

This project uses a weather API that requires an API key.

Create a .env file in the root of the project (same level as package.json):
```bash
REACT_APP_WEATHER_KEY=your_api_key_here
```

### 4. Run the App
```bash
npm start
```

App runs at:
```
http://localhost:3000
```
API Key Notes

Accessed via:
```bash
process.env.REACT_APP_WEATHER_KEY
```
This avoids hardcoding secrets, but the key is still visible in the client bundle.
In production, this should be moved behind a backend service.

### Tradeoffs
#### Frontend-Only API Integration
- Simpler and faster to build
- Exposes API key to the client

#### Chart Integration (Chart.js)
- Enables clear visualization of hourly data
- Adds some bundle size and configuration overhead

### Future Improvements
#### Secure API via Backend
- Proxy requests through a server to protect the API key
#### Basic Caching
- Cache responses per location to reduce duplicate API calls and improve performance

### Summary

This project is a lightweight weather comparison tool built with Create React App. It focuses on simplicity, clear data visualization, and ease of setup, while leaving room for backend integration and performance improvements.
