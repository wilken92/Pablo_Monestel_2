//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var BlazeSchema = new mongoose.Schema({
  nameBlaze:String,
  date1: Date,
  time1: Date,
  time2: Date,
  date2: Date,
  place: String,
  status: String
});

module.exports = mongoose.model('Blaze', BlazeSchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
