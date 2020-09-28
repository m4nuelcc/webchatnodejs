const mongoose = require('mongoose');
// importamos Schema desde mongoose
const { Schema } = mongoose;

//creamos un nuego Schema o estructura de base de datos
const ChatSchema = new Schema ({
  nick: String,
  msg: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

//exportamos modelo de mongoose, y dentro de la bd chat 
module.exports = mongoose.model('Chat', ChatSchema);