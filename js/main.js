var tttApp = angular.module('TttApp', []);

  tttApp.controller('TTTController', function ($scope) {
  
  $scope.board = []

  // $scope.oldboard = [
  //   [  
  //     {cell: "aa", owner: "", pointValue: ""},
  //     {cell: "ab", owner: "", pointValue: ""},
  //     {cell: "ac", owner: "", pointValue: ""}
  //   ],
    
  //   [  
  //     {cell: "ba", owner: "", pointValue: ""},
  //     {cell: "bb", owner: "", pointValue: ""},
  //     {cell: "bc", owner: "", pointValue: ""}
  //   ],
    
  //   [  
  //     {cell: "ca", owner: "", pointValue: ""},
  //     {cell: "cb", owner: "", pointValue: ""},
  //     {cell: "cc", owner: "", pointValue: ""}
  //   ]
  // ]

  $scope.createSquares = function(numWidth) {
    for(i = 0; i < numWidth * numWidth; i++){
      $scope.board.push({owner: "", pointValue: ""});
    }
  }

  $scope.turn = 1;

  $scope.setChoice = function(cell) {
    if(cell.owner == ""){
      if($scope.turn == 1) {
        cell.owner = "X";
        cell.pointValue = 1;
        $scope.turn = 2;
      }
      else {
        cell.owner = "O";
        cell.pointValue = -1;
        $scope.turn = 1;
      }
    }
    $scope.winChecker();
  }

//win checker variables
  // $scope.row1 = $scope.board[0][0].pointValue + $scope.board[0][1].pointValue + $scope.board[0][2].pointValue;
  // $scope.row2 = $scope.board[1][0].pointValue + $scope.board[1][1].pointValue + $scope.board[1][2].pointValue;
  // $scope.row3 = $scope.board[2][0].pointValue + $scope.board[2][1].pointValue + $scope.board[2][2].pointValue;
  // $scope.column1 = $scope.board[0][0].pointValue + $scope.board[1][0].pointValue + $scope.board[2][0].pointValue;
  // $scope.column2 = $scope.board[0][1].pointValue + $scope.board[1][1].pointValue + $scope.board[2][1].pointValue;
  // $scope.column3 = $scope.board[0][2].pointValue + $scope.board[1][2].pointValue + $scope.board[2][2].pointValue;
  // $scope.diag1 = $scope.board[0][0].pointValue + $scope.board[1][1].pointValue + $scope.board[2][2].pointValue;
  // $scope.diag1 = $scope.board[0][2].pointValue + $scope.board[1][1].pointValue + $scope.board[2][0].pointValue;

  // $scope.winChecker = function(){
  //   if($scope.row1 == 3){
  //     alert("X wins!");
  //   }
  // }

  // $scope.winChecker = function() {
  //   if($scope.board[0][0].pointValue + $scope.board[0][1].pointValue + $scope.board[0][2].pointValue == 3){
  //     alert("X wins!");
  //   }
  // }
  var init = function(){
    $scope.createSquares(3);
  };

  init();

});