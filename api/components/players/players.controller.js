var Player = require('./players.model.js');

module.exports.save = function(req, res){
  var newPlayer = new Player({
    name: req.body.name,
    direction : req.body.direction,
    phone: req.body.phone,
    email: req.body.email,
    contact: req.body.contact,
    status: req.body.status
  });

  newPlayer.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el jugador' + err});
    }else{
      res.json({success:true, msg:'Se registró el jugador correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Player.find().then(function(players){
    res.send(players);
  })
};

module.exports.update = function(req,res){

  Buy.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, player) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
