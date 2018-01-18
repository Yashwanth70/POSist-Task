angular
.module('app')
.service('User', function($http) {

    this.login = function (username, password) {
        var data = {
        	method: 'POST',
  			url: '/api/user/login',
        	data: {
        		username: username,
        		password: password
        	}
        };
        return $http(data);

    }
});