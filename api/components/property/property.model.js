//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var PropertySchema = new mongoose.Schema({
  code: String,
  name: String,
  position: String,
  price: Number,
  group: String,
  owner: String,
  photo: String,
  probability: String
});

module.exports = mongoose.model('Property', PropertySchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
