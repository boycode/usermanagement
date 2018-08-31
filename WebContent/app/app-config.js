/**
 * Author : Jackline_Xavier 
 * Description : Configuration file.
 */
app.config(function($routeProvider) {
	$routeProvider
	.when("/approval", {
		templateUrl : "app/views/approval.html",
		controller : "ApprovalCtrl"              
	})
	.when("/analytics", {
		templateUrl : "app/views/analytics.html",
		controller : "AnalyticsCtrl"
	})
	.when("/home", {
		templateUrl : "app/views/home.html",
		controller : "MainCtrl"              
	})
	.otherwise({
		redirectTo: '/home'
	});

});