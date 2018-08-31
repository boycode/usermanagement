/**
 * Author : Jackline_Xavier
 * Description : Controller for User Manager.
 */

app.controller("ApprovalCtrl", ['$scope','$rootScope','ngDialog','$route', '$http', '$filter','$timeout','mainService', 
                                function($scope, $rootScope, ngDialog, $route, $http, $filter, $timeout, mainService){
	//this.$route = $route;

	$scope.addedContacts = undefined;
	$scope.selectedAllRows = false;

	$scope.callAttempts = [1,2,3];

	/**
	 *  Service call to get all added contacts
	 */
	$scope.getAddedContacts = function () {
		return mainService.getAddedContacts().then(
				function (data) {
					if (data.success === true) {
						$scope.addedContacts = data.root;

						console.log($scope.addedContacts);
					} else {
						var error = data.errors;
						$scope.addedContacts = "";
						//console.log(error.errorMessage);
					}
				}
		);
	};

	//Call method to get list of added contacts
	$scope.getAddedContacts();

	/**
	 *  Method to select/ de-select all added contacts
	 */
	$scope.selectAllAddedContacts = function () {
		console.log($scope.selectedAllRows);

		/*if (!$scope.selectedAllRows) {
			$scope.selectedAllRows = true;
		} else {
			$scope.selectedAllRows = false;
		}*/
		angular.forEach($scope.addedContacts, function (val) {
			val.selected = $scope.selectedAllRows;
		});
	};

	/**
	 *  Method to select/ de-select a single added contact
	 *  @param index - index of the selected contact
	 */
	$scope.selectContactRow = function(index){
		console.log(index);
		/*angular.forEach($scope.addedContacts, function (val,key) {
			if(key === index){
				if(val.selected === false){

				}
			}
		});*/
	}
	/**
	 *  Method to enable/disable main/sub approve buttons group
	 *  	Main button will be enabled if any one contact is selected.
	 *  	Sub button groups will be enabled only if there is no record selection
	 *  @param NA
	 */
	$scope.selectedAtleastOneContact = function(){
		var trues = $filter("filter")( $scope.addedContacts , {selected: true} );
		return trues.length;
	};

	/**
	 *  Method to approve/reject/hold a single added contact
	 *  @param contact - record for approval
	 *  @param action - approve/reject/onhold
	 */
	$scope.approveSingleContact = function(contact, action){
		console.log(contact);
		var contactObj = {};
		contactObj.contacts = [];
		contactObj.contacts.push(contact);
		contactObj.action = action;

		return mainService.approveContacts(contactObj).then(
				function (data) {
					if (data.success === true) {
						$scope.addedContacts = data.root;
						console.log(JSON.stringify(data.successDetails.successMessage));
						dialog = ngDialog.open({
							template: data.successDetails.successMessage,
							plain: true,
							className: 'ngdialog-theme-success'
						});
						//Reload the contact list once the api is success
						$scope.getAddedContacts();
					} else {
						var error = data.errors;
						//console.log(error.errorMessage);
						dialog = ngDialog.open({
							template: error.errorMessage,
							plain: true,
							className: 'ngdialog-theme-error'
						});
					}
				}
		);
	}

	/**
	 *  Method to approve/reject/hold a list of added contacts
	 *  @param NA
	 */
	$scope.approveContacts = function(){
		console.log("approveContacts >>");
		/*angular.forEach($scope.addedContacts, function (val,key) {
			if(key === index){
				if(val.selected === false){

				}
			}
		});*/
	}


}]);