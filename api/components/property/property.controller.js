var Property = require('./property.model.js');

module.exports.save = function(req, res){
  var newProperty = new Property({
      code: req.body.code,
      name: req.body.name,
      position: req.body.position,
      price: req.body.price,
      group: req.body.group,
      owner: req.body.owner,
      photo: req.body.photo,
      probability: req.body.probability
  });

  newProperty.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo realizar la compra' + err});
    }else{
      res.json({success:true, msg:'Se registró correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Property.find().then(function(property){
    res.send(property);
  })
};

module.exports.update = function(req,res){

  Property.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, property) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
