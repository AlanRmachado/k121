var controller = angular.module('appControllers.controller', []);

controller.controller('homeController', function ($scope, $state) {
    $scope.createAccount = () => {
        $state.go('admin');
    }
});



controller.controller('adminController', function ($scope, $state, services, $http) {
    let id = 1;
    let urlBase = services.getUrlBase();
    $scope.registerUser = false;
    $scope.inUpdate = false;
    $scope.participante = {};
    $scope.participantes = [];
    $scope.shouldBeOpen = false;


    const InitApp = async () => {
        let response = await services.API(`${urlBase}/participantes`, 'GET');
        $scope.participantes = response.data;
        $scope.inUpdate = false;
        $scope.$apply();
    }

    $scope.openAdd = () => {
        $scope.participante = {};
        $scope.registerUser = true;
    }

    $scope.cancelarEdicao = () => {
        $scope.participante = {};
        $scope.inUpdate = false;
    }

    $scope.editar = (participante) => {
        $scope.participante = participante;
        $scope.inUpdate = true;
    }

    hasThisParticipante = (participante, arr)=>{
        
        let result = arr.filter(obj=>{
             return obj.nome === participante.nome || obj.email === participante.email;
        })
        return result;
    }


    $scope.salvar = async (edicao) => {   

        if (!$scope.participante.nome && !$scope.participante.email) return;
        id += 1;
       
        
        if (!edicao) {
            let hasPart = hasThisParticipante($scope.participante, $scope.participantes);
            if(hasPart.length > 0){
                alert('Participante já existente');
                return;
            }
            
            let data = {
                nome: $scope.participante.nome,
                email: $scope.participante.email,
                amigo: '',
            }
            let response = await services.API(`${urlBase}/participantes`, 'POST', data);
        } else {
            let data = $scope.participante;
            
            let response = await services.API(`${urlBase}/participantes`, 'PUT', data);
        }

        $scope.participante = {};
        InitApp();
    }


    $scope.deleteParticipante = async (_id) => {
        let response = await services.API(`${urlBase}/participantes`, 'DELETE', { id: _id });
        InitApp();
    }

    $scope.fazerSorteio = async () => {
        if ($scope.participantes.length < 4) {
            alert('necessário ter ao menos 4 participantes')
        }

        if ($scope.participantes.length % 2 != 0) {
            alert('Para realizar o sorteio, você precisa ter um numero par de participantes');
            return;
        }
        newArr = JSON.parse(JSON.stringify($scope.participantes));

        newArr = services.embaralhaArray(newArr);
        newArr = services.embaralhaArray(newArr);

        let ArrayPares = [];

        let size = newArr.length;

        for (let i = 0; i < newArr.length; i+=2) {

            let participante1 = {
                _id: newArr[i]._id,
                nome: newArr[i].nome,
                email: newArr[i].email,

               
                amigo: newArr[i + 1].nome,
               
            }

            let participante2 = {
                _id: newArr[i + 1]._id,
                nome: newArr[i + 1].nome,
                email: newArr[i + 1].email,               
                amigo: newArr[i].nome,               
            }

            ArrayPares.push(participante1);
            ArrayPares.push(participante2);

        }

        try {
            let response = await services.API(`${urlBase}/sorteio`, 'PUT', ArrayPares);
            if(response.status === 200){
                alert('Sorteio concluído. Dentro de instante, todos os participantes receberão um e-mail com seu amigo secreto');
            }
        } catch (error) {
            console.log(error);
        }
        
         

    }

    InitApp();


});