var services = angular.module('App.services', []);
services.factory('services', function ($http, $q, $state) {
    return {

        
        getUrlBase : function(){
            return 'http://localhost:3000';
        },

       
        embaralhaArray: function (array) {
            var m = array.length, t, i;

            while (m) {

                
                i = Math.floor(Math.random() * m--);

                
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        },

        API: function (url, metodo, data) {
           
            var q = $q.defer();
           
            if(metodo === 'GET'){
                $http.get(url).then(function (retorno) {
                    q.resolve(retorno);
                }, function (erro) {
                    q.reject(erro);
                });
            }else if(metodo === 'POST'){
                $http.post(url, data).then(function (retorno) {
                    q.resolve(retorno);
                }, function (erro) {
                    q.reject(erro);
                });
            }else if(metodo === 'DELETE'){
                
                $http.delete(url, {data : data}).then(function (retorno) {
                    q.resolve(retorno);
                }, function (erro) {
                    q.reject(erro);
                });
            }else if(metodo === 'PUT'){
                $http.put(url, data).then(function (retorno) {
                    q.resolve(retorno);
                }, function (erro) {
                    q.reject(erro);
                });
            }
            
           
           
            return q.promise;

        }

    }
})