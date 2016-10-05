import Catalog from './catalog/module.js'
import {AppController} from './controller.js';
import {TopMenu} from './topmenu/topmenu.directive.js'
import {AppService} from './service.js'

var app= angular.module('app', ['core', 'ui.router', 'main.templates', 'app.catalog']);
app.controller('appController', AppController);

AppController.$inject= ['$scope', '$state'];

app.service('appService', AppService);
app.directive('topMenu', TopMenu.createInstance);

TopMenu.createInstance.$inject= ['$templateCache', '$state'];

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/catalog');
    $stateProvider
        .state('home', {
            url : '^',
            views : {
                'content' : {
                    templateProvider: function($templateCache){
                        return $templateCache.get('app/catalog/cat-list.html');
                    },
                    controller : 'catalogCtrl'
                },
                'subconten' : {
                    templateProvider: function($templateCache){
                        debugger;
                        return "<div>submenu</div>";
                    }
                }

            }
        })
}]);
