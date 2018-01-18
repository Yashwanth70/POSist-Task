angular
.module('app')
.controller('UserCtrl', function($scope, toastr, $window, $state, User){

    
	$scope.login = function(){
    	
    	if(!$scope.username){
    		toastr.error('Please enter username');
    		return false;
    	}
    	
    	if(!$scope.password){
    		toastr.error('Please enter password');
    		return false;
    	}

    	User.login($scope.username, $scope.password).then(
    		function successCallback(response) {
    			var data = response.data;
    			if(data.success){
    				toastr.success(data.message);
    				$window.sessionStorage.token = data.token;
    				$state.go('app.customer.list');
    				console.log('Not Going');
    			} else {
    				delete $window.sessionStorage.token;
    				toastr.error(data.message);
    			}
		  	}, function errorCallback(response) {
			    console.log(response);
		  	});
	}
})