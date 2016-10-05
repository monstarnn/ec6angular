export default {
    config : function ($stateProvider) {
        $stateProvider
        .state('catalog', {
            url: '/catalog',
            templateProvider: function($templateCache){
                return $templateCache.get('app/catalog/cat-list.html');
            }
        });
    }
};
