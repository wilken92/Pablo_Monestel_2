//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var BuySchema = new mongoose.Schema({
  player: String,
  property: String
});

module.exports = mongoose.model('Buy', BuySchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
