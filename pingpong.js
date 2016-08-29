var module = angular.module('myApp', []);
module.controller('PingPongCtrl', function($scope) {
	
	$scope.moveBall = function(striker) {
		if($('#ball')) {
			var ballMarginsArray = $('#ball').css("margin").split(' ');
			var keyMargins = ["top", "right", "bottom", "left"];
			var key,value,condition;
			var widthChecker = $("#ball").parent().width();
			var ballMargins = {};
			var playerMap = {
				'lPlayer' : 'bat2',
				'rPlayer' : 'bat1'
			};
			for (var i = 0; i < keyMargins.length; i++) {
				value = ballMarginsArray[i] && ballMarginsArray[i].substring(0,ballMarginsArray[i].length-2) && parseInt(ballMarginsArray[i].substring(0,ballMarginsArray[i].length-2));
				ballMargins[keyMargins[i]] = value || 0;
			}

			var randomer = function(randomer,executionSeq) {
				setTimeout( function() {
					switch(striker) {
						case 'lPlayer':
							ballMargins.left = ballMargins.left + 5;
							if(ballMargins.right>0) {
								ballMargins.right = ballMargins.right - 5;
							}
							condition = (ballMargins.right)>= 0 && (ballMargins.left + ballMargins.right) <= widthChecker;
							condition && $('#ball').css("margin",(ballMargins.top + "px " + ballMargins.right + "px " + "0px " + ballMargins.left + "px"));		
						break;
						
						case 'rPlayer':
							ballMargins.right = ballMargins.right + 5;
							if(ballMargins.left>0) {
								ballMargins.left = ballMargins.left - 5;
							}
							condition = (ballMargins.left)>= 0 && (ballMargins.left + ballMargins.right) <= widthChecker ;
							condition && $('#ball').css("margin",(ballMargins.top + "px " + ballMargins.right + "px " + "0px " + ballMargins.left + "px"));				
						break;
					}
					if(condition) {
						randomer(randomer);
					} else {
						$scope.strikeBall(playerMap[striker]);
					}
					executionSeq++;
				}, 10);
			};
			randomer(randomer,0);
		}
	};

	$scope.strikeBall = function(bat) {
		var ballMarginsArray = $('#ball').css("margin").split(' ');
		var batMarginsArray = $('#' + bat).css("margin").split(' ');
		var keyMargins = ["top", "right", "bottom", "left"];
		var ballMargins = {};
		var batMargins = {};
		for (var i = 0; i < keyMargins.length; i++) {
			value = ballMarginsArray[i] && ballMarginsArray[i].substring(0,ballMarginsArray[i].length-2) && parseInt(ballMarginsArray[i].substring(0,ballMarginsArray[i].length-2));
			ballMargins[keyMargins[i]] = value || 0;
			value = batMarginsArray[i] && batMarginsArray[i].substring(0,batMarginsArray[i].length-2) && parseInt(batMarginsArray[i].substring(0,batMarginsArray[i].length-2));
			batMargins[keyMargins[i]] = value || 0;
		}
		var differntial = batMargins.top - ballMargins.top;
		if((differntial>=-100 && differntial<=30) && ((bat === 'bat1' && ballMargins.left<15) || (bat === 'bat2' && ballMargins.right<15))) {
			$scope.moveBall($('#' + bat).parent().attr('id'));
		} else {
			alert(bat + " lost");
		}

	};
	
	$scope.strikeBall('bat1');
	
	$scope.moveBat = function(mouseEvent,bat) {
		if($('#' + bat) && mouseEvent.clientY>124 && mouseEvent.clientY<818) {
			$('#' + bat).css("margin-top",mouseEvent.clientY-125);
		}
		
	};
})