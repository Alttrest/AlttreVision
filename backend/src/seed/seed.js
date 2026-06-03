const db = require('../config/database');

/**
 * Seed the database with demo categories and products.
 * Uses placeholder 3D models from model-viewer's shared assets.
 */
function seed() {
  console.log('🌱 Veritabanı doldurma başlatılıyor...\n');

  const categories = [
    { id: 1, name: 'Koltuklar', slug: 'koltuklar', icon: '🛋️' },
    { id: 2, name: 'Masalar', slug: 'masalar', icon: '🪑' },
    { id: 3, name: 'Aydınlatma', slug: 'aydinlatma', icon: '💡' },
    { id: 4, name: 'Dekorasyon', slug: 'dekorasyon', icon: '🏺' },
    { id: 5, name: 'Yatak Odası', slug: 'yatak-odasi', icon: '🛏️' },
  ];

  const products = [
    {
      id: 1,
      name: 'Modern Koltuk',
      slug: 'modern-koltuk',
      description: 'Minimalist tasarımlı, yüksek konforlu üç kişilik koltuk. Ergonomik yapısı ile uzun süreli oturma rahatlığı sağlar.',
      price: 18499.99,
      currency: 'TRY',
      category_id: 1,
      model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb',
      ios_model_url: '',
      poster_url: '',
      dimensions: { width: 210, depth: 95, height: 82 },
      color: 'Antrasit',
      material: 'Kadife Kumaş',
      ar_scale: 'auto',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Berjer Koltuk',
      slug: 'berjer-koltuk',
      description: 'Klasik berjer tasarımına modern bir dokunuş. Derin oturma alanı ile kitap okuma köşeniz için ideal.',
      price: 8999.99,
      currency: 'TRY',
      category_id: 1,
      model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
      ios_model_url: '',
      poster_url: '',
      dimensions: { width: 85, depth: 90, height: 105 },
      color: 'Hardal',
      material: 'Keten',
      ar_scale: 'auto',
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Ahşap Sandık',
      slug: 'ahsap-sandik',
      description: 'Eskitme dokulu, çok amaçlı ahşap saklama sandığı. Rustik dekorasyonlar için ideal bir tamamlayıcı.',
      price: 1250.00,
      currency: 'TRY',
      category_id: 2,
      model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb',
      ios_model_url: '',
      poster_url: '',
      dimensions: { width: 50, depth: 50, height: 50 },
      color: 'Ahşap',
      material: 'Masif Ahşap',
      ar_scale: 'auto',
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Dev Avokado Heykeli',
      slug: 'dev-avokado',
      description: 'Mutfak veya restoran dekorasyonu için devasa avokado figürü. Canlı renkleri ile ortama neşe katar.',
      price: 899.99,
      currency: 'TRY',
      category_id: 4,
      model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb',
      ios_model_url: '',
      poster_url: '',
      dimensions: { width: 30, depth: 30, height: 45 },
      color: 'Yeşil',
      material: 'Reçine',
      ar_scale: 'auto',
      created_at: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Savaşçı Kaskı',
      slug: 'savasci-kaski',
      description: 'Koleksiyonerler için savaş hasarlı, detaylı sci-fi kask replikası. Odak noktası olacak bir dekor.',
      price: 6899.00,
      currency: 'TRY',
      category_id: 4,
      model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
      ios_model_url: '',
      poster_url: '',
      dimensions: { width: 35, depth: 35, height: 40 },
      color: 'Metalik',
      material: 'Titanyum Alaşım',
      ar_scale: 'auto',
      created_at: new Date().toISOString(),
    },
    {
      id: 6,
      name: 'Antika Fotoğraf Makinesi',
      slug: 'antika-kamera',
      description: 'Retro tarza sahip, orijinal görünümlü antika fotoğraf makinesi. Çalışma masanız veya kitaplığınız için şık bir obje.',
      price: 2299.99,
      currency: 'TRY',
      category_id: 4,
      model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
      ios_model_url: '',
      poster_url: '',
      dimensions: { width: 25, depth: 15, height: 20 },
      color: 'Siyah / Ahşap',
      material: 'Metal & Ahşap',
      ar_scale: 'auto',
      created_at: new Date().toISOString(),
    },
  ];

  db.bulkInsert(categories, products);

  console.log(`✅ ${categories.length} kategori eklendi.`);
  console.log(`✅ ${products.length} ürün eklendi.`);
  console.log(`\n🎉 Seed tamamlandı!`);
}

seed();
