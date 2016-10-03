class MainController{
    constructor($scope, $state){
        this.$state= $state;
        this.scope=$scope;
        this.scope.Text = "Hello, man!";
        this.init();
    }
    init(){
    }
}

MainController.$inject=['$scope',  '$state'];

export {MainController}
