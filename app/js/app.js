/*globals angular */

var app = angular.module('angular', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
		.otherwise({
			redirectTo: '/'
		});
});