var Player = require('./player.model.js');

module.exports.save = function(req, res){
  var newPlayer = new Player({
    code: req.body.code,
    name: req.body.name,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    alias: req.body.alias,
    money: req.body.money,
    photo: req.body.photo
  });

  newPlayer.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo realizar la compra' + err});
    }else{
      res.json({success:true, msg:'Se registró correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Player.find().then(function(players){
    res.send(players);
  })
};

module.exports.update = function(req,res){
  Player.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, player) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
