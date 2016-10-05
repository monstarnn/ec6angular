class CatalogController {
    constructor($scope, $state, serv){
        this.$state = $state;
        this.scope = $scope;
        this.service = serv;
        this.init();
    }
    init(){
        this.scope.test =  () => this.test();
    }
    test () {

        this.service.getList();
    }
}

// CatalogController.$inject=['$scope',  '$state',  'catalogService'];

export {CatalogController}