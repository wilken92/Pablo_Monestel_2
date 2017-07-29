(function(){
  angular
    .module('testApp')
    .controller('playerController', playerController);
    function playerController(playerService,ImageService,Upload){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.teachers = teacherService.getTeachers();
        vm.to = new Date();
      }init(); // Cierre de la función init


      // Inicio de la función presave
      vm.presave= function(newTeacher){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newTeacher.photo = data.url;
            vm.save(newTeacher);
          }); // Cierre de la función success
      } // Cierre de la función presave


      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.save= function(){
        var newTeacher = {
          name: vm.name,
          firstName: vm.firstName,
          lastName: vm.lastName,
          id: vm.id,
          date: vm.date,
          grade: vm.grade,
          email: vm.email,
          telephone: vm.telephone,
          civilStatus: vm.civilStatus,
          gender: vm.gender,
          status: 'Activo',
          photo: vm.photo
        } // Cierre de newTeacher
        teacherService.setTeachers(newTeacher);
        init();
        clean();
      } // Cierre de la función save


      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pTeacher){
        vm.name = pTeacher.name;
        vm.firstName = pTeacher.firstName;
        vm.lastName = pTeacher.lastName;
        vm.id = pTeacher.id;
        vm.date = new Date(pTeacher.date);
        vm.grade = pTeacher.grade;
        vm.email = pTeacher.email;
        vm.telephone = pTeacher.telephone;
        vm.civilStatus = pTeacher.civilStatus;
        vm.gender = pTeacher.gender;
        vm.photo = pTeacher.photo;
      } // Cierre de la función getInfo


      // Inicio de la función update, que se encarga de devolver los datos para ser editados
      vm.update = function(){
        var teacherEdit = {
          name: vm.name,
          firstName: vm.firstName,
          lastName: vm.lastName,
          id: vm.id,
          date: vm.date,
          grade: vm.grade,
          email: vm.email,
          telephone: vm.telephone,
          civilStatus: vm.civilStatus,
          gender: vm.gender,
          status: 'Activo',
          photo: vm.photo
        } // Cierre de teacherEdit
        teacherService.updateTeacher(teacherEdit);
        init();
        clean();
      } // Cierre de la función update


      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.name = '';
        vm.firstName =  '';
        vm.lastName =  '';
        vm.id =  '';
        vm.date =  '';
        vm.grade =  '';
        vm.email =  '';
        vm.telephone =  '';
        vm.civilStatus =  '';
        vm.gender =  '';
        vm.photo = '';
      } // Cierre de la función clean


      // Inicio de la función inactive, que se encarga de cambiar el estado del profesor
      //función que cambia el estado a inabilitado
      vm.inactive = function(pTeacher){
        var teacherList = teacherService.getTeachers();
          for (var i = 0; i < teacherList.length; i++) {
            if (teacherList[i].id == pTeacher.id) {
              teacherList[i].status = 'inhabilitado';
              console.log(teacherList[i].status)
            }// Cierre del if
          }// Cierre del ciclo
        teacherService.updateState(teacherList);
        init();
      }// Cierre funcion inative

      //función que cambia el estado a activo
      vm.active = function(pTeacher){
        var teacherList = teacherService.getTeachers();
          for (var i = 0; i < teacherList.length; i++) {
            if (teacherList[i].id == pTeacher.id) {
              teacherList[i].status = 'Activo';
              console.log(teacherList[i].status)
            }// Cierre del if
          }// Cierre del ciclo
        teacherService.updateState(teacherList);
        init();
      }// Cierre de la funcion active


    }// Cierre de la función teacherController
})();
