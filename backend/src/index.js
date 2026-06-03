require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const corsOptions = require('./middleware/cors');

// Initialize database (creates tables if needed)
require('./config/database');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors(corsOptions));
app.use(express.json());

// Serve static 3D model files from /models directory
app.use(
  '/models',
  express.static(path.join(__dirname, '..', 'models'), {
    setHeaders: (res, filePath) => {
      // Set correct MIME types for 3D model formats
      if (filePath.endsWith('.glb')) {
        res.setHeader('Content-Type', 'model/gltf-binary');
      } else if (filePath.endsWith('.gltf')) {
        res.setHeader('Content-Type', 'model/gltf+json');
      } else if (filePath.endsWith('.usdz')) {
        res.setHeader('Content-Type', 'model/vnd.usdz+zip');
      }
      // Allow cross-origin requests for models
      res.setHeader('Access-Control-Allow-Origin', '*');
    },
  })
);

// --- API Routes ---
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AR Furniture Viewer API',
  });
});

// --- Frontend Serving (Full Stack) ---
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// SPA Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Sunucu hatası oluştu.',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// --- Start Server ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 AR Furniture API & Web çalışıyor:`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://0.0.0.0:${PORT}`);
  console.log(`\n📦 API Endpoints:`);
  console.log(`   GET /api/products`);
  console.log(`   GET /api/products/:slug`);
  console.log(`   GET /api/categories`);
  console.log(`   GET /api/health\n`);
});
