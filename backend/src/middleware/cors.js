const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://localhost:5173',
  'http://localhost:5173',
  'https://localhost:5173',
];

/**
 * CORS middleware configured for AR Furniture Viewer.
 * Allows credentials and specific origins for local development.
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // In development, be permissive with local network IPs
      if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)/)) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: Origin not allowed'));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
