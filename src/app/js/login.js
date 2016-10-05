import modules from './modules.js';
import login from './login/module.js';


// angular.module('core',['ngRoute', 'ui.router']);
// angular.module('core').provider('stateAdapter',['$stateProvider', function($stateProvider){
//     this.$get=function(){
//         return {
//             state: function(name,options){
//                 return $stateProvider.state(name, options);
//             }
//         }
//     }
// }]);

angular.module('main', ['core', 'main.templates']);
//angular.module('account', ['main','shared','main.templates']);
angular.module('login', ['core', 'main', 'main.templates']);
angular.module('app', ['core', 'login']);

angular.module('app');

angular.module('login').config(['$urlRouterProvider',function($urlRouterProvider){
    $urlRouterProvider.otherwise('access/signin');
    $urlRouterProvider.when('', 'access/signin');
}]);

