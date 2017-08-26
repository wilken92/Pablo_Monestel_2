(function(){
  angular
  .module('testApp')
  .service('propertyService', propertyService);

  propertyService.$inject = ['$http'];

  // Inicio de función propertyService
  function propertyService($http){
    var  property = [];

    var publicAPI = {
      setProperty : _setProperty,
      getProperty : _getProperty,
      updateProperty : _updateProperty

    }; // Cierre del publicAPI
    return publicAPI;

    // Inicio de la funcion setproperty, que se encarga de registar los datos en el localStorage
    function _setProperty(pProperty){
      return $http.post('http://localhost:3000/api/save_property',pProperty)

    } // Cierre de la función setproperty

    // Inicio de la función getproperty, que se encarga de obtener los datos más actualizados
    function _getProperty(){
      return $http.get('http://localhost:3000/api/get_all_property');

    } // Cierre de la funcíon getproperty

    // Inicio de la función updateproperty, que se encarga de permitir la edición de datos
    function _updateProperty(pobjProperty){
      console.log(pobjProperty);
      return $http.put('http://localhost:3000/api/update_property',pobjProperty);

    }// Fin de la función updateproperty


  }// Fin de función propertyService
})();
