(function () {
    'use strict';
    
    function configFunction($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'js/landing/landingTemplate.html',
            controller: 'LandingController',
            controllerAs: 'vm'
        });
    }
    angular.module('stackoverflowApp.landing')
            .config(configFunction);

    
    configFunction.$inject = ['$routeProvider'];
    
    
})();