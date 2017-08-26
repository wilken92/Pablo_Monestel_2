


(function(){
  angular
  .module('testApp')
  .controller('buyController',buyController);
  buyController.$inject = ['buyService','$scope','playersService','propertyService'];


  function buyController(buyService,$scope,playersService,propertyService){

    var vm = this;
    vm.buy = "";
    loadBuy();


    function loadBuy(){
      buyService.getBuy().then(function (response) {
        vm.buy = response.data;
      });

      playersService.getPlayers().then(function (response) {
        vm.playerRel = response.data;
      });

      propertyService.getProperty().then(function (response) {
        vm.propertyRel = response.data;
      });

    }


      // Encargada de mostrar la información al usuario
      $scope.pagina = 1;
      $scope.siguiente = function() {
        $scope.pagina = 2;
      }
      $scope.anterior = function() {
        $scope.pagina = 1;
      }
      $scope.registro1 = function() {
        $scope.pagina = 1;
      }// Cierre de la encargada de mostrar la información al usuario



      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.save= function(){
        var newBuy = {
          player: vm.player,
          property: vm.property
      
        } // Cierre de newProperty

      // intento de restringir los usuarios que se registran
      if(vm.property.length === 0){
         propertyService.setBuy(newBuy);
         clean();
         loadBuy();
         swal({
           type: 'success',
           title: '¡Compra completada!',
           timer: 3000,
           showConfirmButton: false
         }).then(
              function () {},
              // handling the promise rejection
              function (dismiss) {
                if (dismiss === 'timer') {
                  console.log('Compa exitosa')
                }
              }
            )
         return;
      } else{
        buyService.setBuy(newBuy).then(function (response) {
          vm.player = null;
          vm.property = null;
        loadBuy();
         });
           swal({
             type: 'success',
             title: '¡Compra completada!',
             timer: 3000,
             showConfirmButton: false
           }).then(
              function () {},
              // handling the promise rejection
              function (dismiss) {
                if (dismiss === 'timer') {
                console.log('Registro exitoso')
                }
              }
            )
          return;
        }
  } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pBuy){
        vm.id = pBuy._id;
        vm.player = pBuy.player;
        vm.property = pBuy.property;
       
        ;
      } // Cierre de la función getInfo

      //función que cambia botones al precionar editar
      vm.hideButton = function(){
        document.querySelector('#actualizar').classList.remove('displayNone');
        document.querySelector('#registrar').classList.add('displayNone');
      } // Cierre de la función que cambia botones al precionar editar

      // Inicio de la función update, que se encarga de devolver los datos para ser editados
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var propertyEdit = {
          _id : vm.id,
          player: vm.player,
          property: vm.property,
        
          
        } // Cierre de propertyEdit
        swal({
         type: 'success',
         title: '¡Información actualizada!',
         timer: 3000,
         showConfirmButton: false
        }).then(
             function () {},
             // handling the promise rejection
             function (dismiss) {
               if (dismiss === 'timer') {
                 console.log('Información actualizada')
               }
             }
           )
        buyService.updateBuy(buyEdit).then(function(response){
          buyService.getProperty()
            .then(function(response){
              vm.property = response.data;
            })
            .catch(function(err){
              console.log(err);
            })
         });
        loadProperty();
        clear();
      } // Cierre de la función update

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clear(){
        vm.player = '';
        vm.property = '';
      } // Cierre de la función clean

    }// Cierre de la función propertyController
})();

