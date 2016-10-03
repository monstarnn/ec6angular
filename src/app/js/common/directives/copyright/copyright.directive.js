var _accountService = new WeakMap();

class Copyright {
    constructor($templateCache, accountService) {
        _accountService.set(this, accountService);
        this.restrict = 'E';
        this.template = $templateCache.get('common/directives/copyright/copyright.directive.html');
        this.scope = {};
        this.controller = ['$scope', function ($scope) {
            var curYear = new Date().getFullYear();
            $scope.copyright = function () {
                return '© ' + (curYear != '2016' ? '2016 - ' : '') + curYear;
            };
        }];
    }

    link(scope) {
        scope.doSomething = function () {
            //какой-нибудь код
            var accountService= _accountService.get(Copyright.instance);
            //какой-нибудь код
        }
    }

    static createInstance($templateCache, accountService) {
        Copyright.instance = new Copyright($templateCache, accountService);
        return Copyright.instance;
    }
}
Copyright.createInstance.$inject = ['$templateCache', 'accountService'];

export {Copyright}

