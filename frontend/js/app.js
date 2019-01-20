var app = angular.module('appSorteio', ['ui.router', 'appControllers.controller', 'App.services']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  
    $httpProvider.defaults.headers['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" }
    
    $urlRouterProvider.otherwise("/home");
  

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeController'
    });

    
    $stateProvider.state('admin', {
        url : '/admin',
        templateUrl : 'views/admin.html',
        controller : 'adminController'
    });


});