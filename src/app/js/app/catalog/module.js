
import {CatalogController}  from './controller.js';
import {CatalogService}     from './service.js';

CatalogController.$inject = [
        '$scope',
        '$state',
        'catalogService'
    ];

export default angular
    .module('app.catalog', ['ui.router'])
    .controller('catalogCtrl', CatalogController)
    .service('catalogService', CatalogService)
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            // $urlRouterProvider.otherwise('/catalog');
            $stateProvider
                .state('catalog', {
                    url: '/catalog',
                    views : {
                        'content' : {
                            templateProvider: function($templateCache){
                                return $templateCache.get('app/catalog/cat-list.html');
                            },
                            controller : 'catalogCtrl'
                        }
                        // ,
                        // 'subconten' : {
                        //     templateProvider: function($templateCache){
                        //         return $templateCache.get('app/catalog/cat-list.html');
                        //     }
                        // }

                    },
                })
                // .state('catalog.list', {
                //     url: '/list',
                //     views : {
                //         '@': {
                //             templateProvider: function ($templateCache) {
                //                 return '<div>list</div>';
                //             }
                //         }
                //     }
                // })
                .state('catalog.details', {
                    url: '/:id',
                    views : {
                        'contente@' : {
                            templateProvider: function($templateCache){
                                return $templateCache.get('app/catalog/cat-item_big.html');
                            }
                        },
                        'subcontent@' : {
                            templateProvider: function($templateCache){
                                return '<div>sdfsdf</div>'
                            }
                        }

                    }


                })
        }]);



