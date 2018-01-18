angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/customer/list');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'app/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['assets/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['assets/css/simple-line-icons.css']
        }]);
      }]
    }
  })
  .state('app.customer', {
    url: '/customer',
    template: '<ui-view></ui-view>',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['app/components/customer/customer.controller.js',
                  'app/components/customer/customer.service.js']
        });
      }]
    }
  })
  
  /**
    call to show customers list
  */
  .state('app.customer.list', {
    url: '/list',
    templateUrl: 'app/components/customer/customer.list.view.html'
  })

  /**
    call to add new customer
  */
  .state('app.customer.new', {
    url: '/new',
    templateUrl: 'app/components/customer/customer.edit.view.html'
  })

  /**
    call to update customer
  */
  .state('app.customer.edit', {
    url: '/edit/:customerId',
    templateUrl: 'app/components/customer/customer.edit.view.html'
  })

  /**
    call to show customer report
  */
  .state('app.customer.report', {
    url: '/report/:customerId',
    templateUrl: 'app/components/customer/customer.report.view.html'
  })


  .state('access', {
    abstract: true,
    templateUrl: 'app/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['assets/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['assets/css/simple-line-icons.css']
        }]);
      }],
    }
  })

  /**
    call to login in app
  */
  .state('access.login', {
    url: '/login',
    templateUrl: 'app/components/user/login.view.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['app/components/user/user.controller.js',
                  'app/components/user/user.service.js']
        });
      }]
    }
  })

  /**
    call to not found
  */
  .state('access.404', {
    url: '/404',
    templateUrl: 'app/pages/404.html'
  })

  /**
    call to server error
  */
  .state('access.500', {
    url: '/500',
    templateUrl: 'app/pages/500.html'
  })
}])
.run(['$rootScope', '$state', '$stateParams', '$window', function($rootScope, $state, $stateParams, $window) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (!$window.sessionStorage.token && $state.current.name == 'access.login') {
      $state.go('access.login');
    }
  });
  $rootScope.logout = function(){
    delete $window.sessionStorage.token;
    $state.go('access.login');
  }
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);

