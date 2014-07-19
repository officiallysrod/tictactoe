var tttApp = angular.module('TttApp', []);

  tttApp.controller('TTTController', function ($scope) {
  
  $scope.board = []

  $scope.createSquares = function(numWidth) {
    var j = 1;
    for(i = 0; i < numWidth * numWidth; i++){
      $scope.board.push({owner: "", pointValue: j});
      j = j * 2;
    }
  }

  $scope.turn = 1;

  $scope.xScore = 0;
  $scope.yScore = 0;

  $scope.setChoice = function(cell) {
    if(cell.owner == ""){
      if($scope.turn == 1) {
        cell.owner = "X";
        $scope.xScore = $scope.xScore + cell.pointValue;
        console.log(cell.pointValue);
        $scope.turn = 2;
      }
      else {
        cell.owner = "O";
        $scope.yScore = $scope.yScore + cell.pointValue;
        console.log(cell.pointValue);
        $scope.turn = 1;
      }
    }
    $scope.winChecker();
  }

  $scope.winChecker = function(){
    if($scope.xScore == 7){
      alert("X wins!");
    }
  }

  // $scope.winChecker = function(){
  //   if($scope.row1 == 3){
  //     alert("X wins!");
  //   }
  // }

  var init = function(){
    $scope.createSquares(3);
  };

  init();

});