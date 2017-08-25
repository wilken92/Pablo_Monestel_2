var express = require('express');
var router = express.Router();
var propertyController = require('./property.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_blazes')
  .post(function(req,res){
    propertyController.save(req,res);
  });

router.route('/get_all_blazes')
  .get(function(req,res){
    propertyController.findAll(req,res);
  });

router.route('/update_blaze')
  .put(function(req, res){
    propertyController.update(req,res);
  });

module.exports = router;