/**
 * Created by ilja on 04.10.16.
 */

class AppController {
    constructor($scope
        , $state
    ){
        debugger;
        this.$state= $state;
        this.scope=$scope;
        this.scope.Text = "Hello, man!";
        this.init();
    }

    init(){
    }
}

AppController.$inject['$scope', '$state'];

export {AppController};