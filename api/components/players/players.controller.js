(function(){
  angular
    .module('testApp')
    .controller('playersController',playersController);
    function playersController(playersService,ImageService,Upload,$scope){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.players = playersService.getPlayers();
      }init(); // Cierre de la función init

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
      } // Cierre de la encargada de mostrar la información al usuario

      // Inicio de la función presave
      vm.presave= function(newPlayer){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newPlayer.photo = data.url;
            vm.save(newPlayer);
          }); // Cierre de la función success
      } // Cierre de la función presave

      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.save= function(){
        var newPlayer = {
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          money: Number(1000),
          photo: vm.photo
        } // Cierre de newPlayer

      // intento de restringir los usuarios que se registran
      if(vm.players.length === 0){
         playersService.setPlayers(newPlayer);
         clean();
         init();
         swal({
           type: 'success',
           title: '¡Jugador Registrado!',
           timer: 3000,
           showConfirmButton: false
         })
         return;

      } else{
          for(var i = 0; i < vm.players.length; i++){
            if(newPlayer.code == vm.players[i].code){
              swal({
               type: 'error',
               title: '¡El código ya existe!',
               timer: 3000,
               showConfirmButton: false
              })
              return;
          } else{
               playersService.setPlayers(newPlayer);
               clean();
               init();
               swal({
                 type: 'success',
                 title: '¡Jugador Registrado!',
                 timer: 3000,
                 showConfirmButton: false
               })
               return;
            }
          }
        }
      } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pPlayer){
        vm.code = pPlayer.code;
        vm.name = pPlayer.name;
        vm.alias = pPlayer.alias;
        vm.money = pPlayer.money;
        vm.photo = pPlayer.photo;
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
        var playersEdit = {
          code: vm.code,
          name: vm.name,
          alias: vm.alias,
          photo: vm.photo
        } // Cierre de playersEdit
        swal({
         type: 'success',
         title: '¡Información actualizada!',
         timer: 3000,
         showConfirmButton: false
        })
        playersService.updatePlayers(playersEdit);
        init();
        clean();
      } // Cierre de la función update

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.code = '';
        vm.name = '';
        vm.alias = '';

      } // Cierre de la función clean

    }// Cierre de la función playersController
})();
