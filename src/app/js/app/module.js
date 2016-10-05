// import router from './router.js';


import Catalog from './catalog/module.js'

import {AppController} from './controller.js'
// import {TopMenu} from './topmenu/topmenu.directive.js'
// import {AppService} from './service.js'

var app = angular.module('app', ['core', 'app.catalog', 'ui.router', 'main.templates']);
app.controller('appController', AppController);

// AppController.$inject[
//         '$scope',
//         '$state'
//     ];

// app.service('appService', AppService);
// app.directive('topmenu', TopMenu.createInstance);

// TopMenu.getInstance.$inject= ['$templateCache'];


// app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//     // $urlRouterProvider.otherwise('/catalog');
//     debugger;
//     $stateProvider
//         .state('main', {
//             url: '/',
//             templateProvider : function ( $templateCache ) {
//                 debugger;
//                 return $templateCache.get('app.module.html');
//             }
//
//         });
// }]);
