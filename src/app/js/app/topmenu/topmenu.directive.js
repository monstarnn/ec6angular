/**
 * Created by ilja on 04.10.16.
 */


class TopMenu {
    constructor($templateCache, $state ) {
        // _accountService.set(this, accountService);
        // debugger;
        this.restrict = 'E';
        this.state = $state;
        debugger;
        this.template = $templateCache.get('app/topmenu/topmenu.html');
        this.scope = {};
        // this.controller = ['$scope', function ($scope) {
        //     // var curYear = new Date().getFullYear();
        //     // $scope.copyright = function () {
        //     //     return '© ' + (curYear != '2016' ? '2016 - ' : '') + curYear;
        //     // };
        // }];
    }

    // link(scope) {
    //     scope.doSomething = function () {
    //         //какой-нибудь код
    //         var accountService= _accountService.get(Copyright.instance);
    //         //какой-нибудь код
    //     }
    // }
    //
    static createInstance ($templateCache, $state ){
        TopMenu.instance = new TopMenu($templateCache, $state  );
        return TopMenu.instance;
    }
}

TopMenu.createInstance.$inject= ['$templateCache'];

// TopMenu.createInstance.$inject = ['$templateCache'];

export {TopMenu}
