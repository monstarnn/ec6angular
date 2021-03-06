angular.module('login').run(['stateAdapter','$templateCache', function (stateAdapter, $templateCache) {
    stateAdapter.state('access', {
        abstract: true,
        url: '/access',
        template: '<div ui-view></div>'
    }).state('access.signin', {
        url: '/signin',
        template: $templateCache.get('login/controllers/signin/signin.controller.html'),
        controller: 'SigninController as signin'
    }).state('access.signup', {
        url: '/signup',
        template: $templateCache.get('login/controllers/signup/signup.controller.html'),
        controller: 'SignupController'
    });
}]);
