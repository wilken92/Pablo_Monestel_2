
(function () {
  angular
  .module('testApp')
  .service('buyService', buyService);

// Inicio de función blazeService.(Wilken)
  function buyService($http){
    var buy = [];
    var publicAPI = {
     setBuy : _setBuy,
     getBuy : _getBuy,
     updateBuy : _updateBuy,
    };// Cierre del publicAPI
    return publicAPI;

  // Inicio de la funcion setBuys, que se encarga de registar los datos en el localStorage.(Wilken)
    function _setBuy(pBuy){
     return $http.post('http://localhost:3000/api/save_buy',pBuy)
    }// Cierre de la función setBuys.

    // Inicio de la función getBuys, que se encarga de obtener los datos más actualizados.(Wilken)
    function _getBuy(){
      return $http.get('http://localhost:3000/api/get_all_buy');
    }// Cierre de la función getBuys.

    // Inicio de la función updateBuys, que se encarga de permitir la edición de datos.(Wilken)
    function _updateBuy(pobjBuy){
     console.log(pobjBuy);
        return $http.put('http://localhost:3000/api/update_buy',pobjBuy);
    }// Cierre de la función updateBuys

  

  }// Fin de función buyservice
})();
