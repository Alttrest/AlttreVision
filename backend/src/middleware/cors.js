const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://localhost:5173',
  'http://localhost:5173',
  'https://localhost:5173',
];

/**
 * CORS middleware configured for AR Furniture Viewer.
 * Allow all origins to prevent issues when serving Full-Stack on Render.
 */
const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
