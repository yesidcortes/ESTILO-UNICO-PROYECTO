const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    // Usamos la variable de entorno o una conexión local por defecto si no la lee
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/estilo_unico';
    
    await mongoose.connect(uri);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
  }
};

module.exports = connectMongo;