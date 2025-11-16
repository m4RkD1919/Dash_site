// In a production app, this URL would typically be loaded from an environment
// variable (e.g., process.env.VITE_API_BASE) for better flexibility
// across different environments (development, staging, production).

// We will use the environment variable provided by the build system.
// This allows the app to connect to the correct backend API endpoint
// without needing to hardcode the URL. The backend server must be
// configured with the correct CORS headers to allow requests from the
// domain where this frontend is hosted.
export const API_BASE_URL = 'https://footy-cron.mdresser.workers.dev';
export const DEFAULT_LEAGUE_ID = 1625;