angular
.module('app')
.service('Customer', function($http) {

    this.list = function (options) {
        var data = {
        	method: 'POST',
  			url: '/api/customer/list',
        	data: options
        };
        return $http(data);
    },

    this.count = function (options) {
        var data = {
            method: 'POST',
            url: '/api/customer/count',
            data: options
        };
        return $http(data);
    },

    this.new = function (options) {
        var data = {
        	method: 'POST',
  			url: '/api/customer/create',
        	data: options
        };
        return $http(data);
    },

    this.update = function (options) {
        var data = {
        	method: 'POST',
  			url: '/api/customer/update',
        	data: options
        };
        return $http(data);
    },

    this.getById = function(options){
    	var data = {
        	method: 'POST',
  			url: '/api/customer/getById',
        	data: options
        };
        return $http(data);
    },

    this.remove = function(options){
    	var data = {
        	method: 'DELETE',
  			url: '/api/customer/remove',
        	data: options,
        	headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        return $http(data);
    },

    this.getReport = function(options){
    	var data = {
        	method: 'POST',
  			url: '/api/customer/getReport',
        	data: options,
        };
        return $http(data);
    }
});