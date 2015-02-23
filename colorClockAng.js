var app = angular.module("colorClock", []);

app.directive("colorClock", function(){
	return {
		restrict: 'E',
		template: "<div id=\"clock_wrap\"><div id=\"clock\"></div><div id=\"hex\"></div><div id=\"clock_bg\"></div></div>",
		controller: ['$scope','$interval', function($scope, $interval){
			$scope.maxnumhours = 23;
			$scope.maxnummins = 59;
			$scope.maxnumsecs = 60;
			$scope.maxmilisecs = 999;
			$scope.currentTime = new Date();
			$scope.currentHours = $scope.currentTime.getHours();
			$scope.currentMinutes = $scope.currentTime.getMinutes();
			$scope.currentSeconds = $scope.currentTime.getSeconds();
			$scope.currentMiliSeconds = $scope.currentTime.getMilliseconds();
			$scope.rounded = $scope.currentSeconds + ($scope.currentMiliSeconds / $scope.maxmilisecs);

			$scope.hexifyWithZeroLead = function(tohex){
				var rtn = tohex.toString(16);
				return ( rtn.length == 1 ? "0" : "" ) + rtn;
			};
			function updateClock() {
				//Set Current Time Variables
				$scope.currentTime = new Date ( );
				$scope.currentHours = $scope.currentTime.getHours();
				$scope.currentMinutes = $scope.currentTime.getMinutes();
				$scope.currentSeconds = $scope.currentTime.getSeconds();
				$scope.currentMiliSeconds = $scope.currentTime.getMilliseconds();
				$scope.rounded = $scope.currentSeconds + ($scope.currentMiliSeconds / $scope.maxmilisecs);

				//Get Color Percentages based off time.
				//Percentage of 255 for Color
				//Percentage of 100 for Position
				rednum = (Math.round(255 * (($scope.currentHours) / $scope.maxnumhours)));
				rednum100 = (Math.round(100 * (($scope.currentHours) / $scope.maxnumhours)));
				greennum = (Math.round(255 * (($scope.currentMinutes) / $scope.maxnummins)));
				greennum100 = (Math.round(100 * (($scope.currentMinutes) / $scope.maxnummins)));
				bluenum = (Math.round(255 * (($scope.rounded) / $scope.maxnumsecs)));
				bluenum100 = (Math.round(100 * (($scope.rounded) / $scope.maxnumsecs)));

				//convert to HEX
				redhex = $scope.hexifyWithZeroLead(rednum);
				greenhex = $scope.hexifyWithZeroLead(greennum);
				bluehex = $scope.hexifyWithZeroLead(bluenum);

				//Create the Hex Strings
				var hex = "#" + redhex + greenhex + bluehex;		//Total HEX Value
				var fullredhex = "#"+redhex+"0000";				//RED Only Hex
				var fullgreenhex = "#00"+greenhex+"00";			//GREEN Only Hex
				var fullbluehex = "#0000"+bluehex;				//BLUE Only Hex

				//zerolead the time for display
				$scope.currentHours = ( $scope.currentHours < 10 ? "0" : "" ) + $scope.currentHours;
				$scope.currentMinutes = ( $scope.currentMinutes < 10 ? "0" : "" ) + $scope.currentMinutes;
				$scope.currentSeconds = ( $scope.currentSeconds < 10 ? "0" : "" ) + $scope.currentSeconds;

				//append the values
				$("#clock").html("<span id='hours'>"+ $scope.currentHours + "</span>:<span id='minutes'>" + $scope.currentMinutes + "</span>:<span id='seconds'>" + $scope.currentSeconds + '</span>');
				$("#hex").html(hex);
				$('body').css('background-color',hex);
			}

			$interval(updateClock, 250);
		}]
	};
});