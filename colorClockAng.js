var app = angular.module("colorClock", []);

app.directive("colorClock", function(){
	return {
		restrict: 'E',
		template: "<div ng-style=\"{'background-color': hex, 'color': invertHex}\" id=\"clock_wrap\"><div id=\"clock\"><span id='hours'>{{currentHours}}</span>:<span id='minutes'>{{currentMinutes}}</span>:<span id='seconds'>{{currentSeconds}}</span></div><div id=\"hex\">{{hex}}</div><div id=\"clock_bg\"></div></div>",
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
            $scope.hex = "#000";
            $scope.invertHex = "000";
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
				$scope.hex = "#" + redhex + greenhex + bluehex;		//Total HEX Value
                $scope.invertHex = "#" + invertHex(""+redhex+greenhex+bluehex);
				//zerolead the time for display
				$scope.currentHours = ( $scope.currentHours < 10 ? "0" : "" ) + $scope.currentHours;
				$scope.currentMinutes = ( $scope.currentMinutes < 10 ? "0" : "" ) + $scope.currentMinutes;
				$scope.currentSeconds = ( $scope.currentSeconds < 10 ? "0" : "" ) + $scope.currentSeconds;
			}
            
            function invertHex(hexnum){
              hexnum = hexnum.toUpperCase();
              var splitnum = hexnum.split("");
              var resultnum = "";
              var simplenum = "FEDCBA9876".split("");
              var complexnum = new Array();
              complexnum.A = "5";
              complexnum.B = "4";
              complexnum.C = "3";
              complexnum.D = "2";
              complexnum.E = "1";
              complexnum.F = "0";

              for(i=0; i<6; i++){
                if(!isNaN(splitnum[i])) {
                  resultnum += simplenum[splitnum[i]]; 
                } else if(complexnum[splitnum[i]]){
                  resultnum += complexnum[splitnum[i]]; 
                }
              }

              return resultnum;
            }

			$interval(updateClock, 250);
		}]
	};
});