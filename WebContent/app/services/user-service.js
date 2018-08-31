/**
 * Author : Jackline_Xavier 
 * Description : Main Services .
 */

app.service('mainService', function($http, $q) {
	//Function for getting added contacts
	this.getAddedContacts = function() {
		console.log(serviceURL.getAddedContactDetails);
		return $http({
			method : 'GET',
			url : serviceURL.getAddedContactDetails
		}).then(function(response) {
			if (typeof response.data === 'object') {
				return response.data;
			} else {
				var res={};
				res.errors={};
				res.success=false;
				res.errors.errorCode="";
				res.errors.errorMessage=msg.msgGetContactsError;
				return res;
			}
		}, function(response) {
			var res={};
			res.errors={};
			res.success=false;
			res.errors.errorCode="";
			res.errors.errorMessage=msg.msgGetContactsError;
			return res;
		});
	};
	
	//Function for approving added contacts
	this.approveContacts = function(inputContacts) {
		console.log(serviceURL.approveContacts);
		return $http({
			method : 'POST',
			url : serviceURL.approveContacts,
			data : inputContacts,
		}).then(function(response) {
			if (typeof response.data === 'object') {
				return response.data;
			} else {
				var res={};
				res.errors={};
				res.success=false;
				res.errors.errorCode="";
				res.errors.errorMessage=msg.msgApproveContactsError;
				return res;
			}
		}, function(response) {
			var res={};
			res.errors={};
			res.success=false;
			res.errors.errorCode="";
			res.errors.errorMessage=msg.msgApproveContactsError;
			return res;
		});
	}
	
	
});