(function(){
  angular
    .module('testApp')
    .controller('propertyController',propertyController);

    propertyController.$inject = ['propertyService','ImageService','Upload','$scope'];


    function propertyController(propertyService,ImageService,Upload,$scope){

      var vm = this;
      vm.property = "";
      loadProperty();

      function loadProperty(){
        propertyService.getProperty().then(function (response) {
            vm.property = response.data;
          });

          vm.cloudObj = ImageService.getConfiguration();

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

      // Inicio de la función presave
      vm.presave= function(newProperty){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newProperty.photo = data.url;
            vm.save(newProperty);
          }); // Cierre de la función success
      } // Cierre de la función presave


      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.save= function(){
        var newProperty = {
          code: vm.code,
          name: vm.name,
          price: vm.price,
          photo: vm.photo
      
        } // Cierre de newProperty

      // intento de restringir los usuarios que se registran
      if(vm.property.length === 0){
         propertyService.setProperty(newProperty);
         clean();
         loadProperty();
         swal({
           type: 'success',
           title: '¡Registro completado!',
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
      } else{
        propertyService.setProperty(newProperty).then(function (response) {
          vm.code = null;
          vm.name = null;
          vm.price = null;
          vm.photo = null;
        loadProperty();
         });
           swal({
             type: 'success',
             title: '¡Registro completado!',
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
      vm.getInfo = function(pProperty){
        vm.id = pProperty._id;
        vm.code = pProperty.code;
        vm.name = pProperty.name;
        vm.price = pProperty.price;
        vm.photo = pProperty.photo;
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
          code: vm.code,
          name: vm.name,
          price: vm.price,
          photo: vm.photo,
          
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
        propertyService.updateProperty(propertyEdit).then(function(response){
          propertyService.getProperty()
            .then(function(response){
              vm.property = response.data;
            })
            .catch(function(err){
              console.log(err);
            })
         });
        loadProperty();
        clean();
      } // Cierre de la función update

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.code = '';
        vm.name = '';
        vm.price = '';
      } // Cierre de la función clean

    }// Cierre de la función propertyController
})();
