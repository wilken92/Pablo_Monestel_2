(function(){
  angular
  .module('testApp')
  .service('buyService', buyService);

  // Inicio de función buyService
  function buyService($http){
    var  buy = [];
    var publicAPI = {
      setBuy : _setBuy,
      getBuy : _getBuy
    }; // Cierre del publicAPI
    return publicAPI;

    // Inicio de la funcion setBuy, que se encarga de registar los datos en el localStorage
    function _setBuy(pBuy){
      return $http.post('http://localhost:3000/api/save_buy',pBuy)

    } // Cierre de la función setBuy

    // Inicio de la función getBuy, que se encarga de obtener los datos más actualizados
    function _getBuy(){
      return $http.get('http://localhost:3000/api/get_all_buy');

    } // Cierre de la funcíon getBuy

  }// Fin de función buyService
})();
