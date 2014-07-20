var tttApp = angular.module('TttApp', []);

  tttApp.controller('TTTController', function ($scope) {
  
  $scope.board = []

  $scope.createSquares = function(numWidth) {
    for(i = 0; i < numWidth * numWidth; i++){
      $scope.board.push({owner: "", checker: new Date()});
    }
  }

  $scope.scoreBoard = {xWins: 0, oWins: 0, ties: 0};
  $scope.turn = 1;
  $scope.gameOver = false;
  $scope.playCounter = 0;

  $scope.setChoice = function(cell) {
    if($scope.gameOver === false){
      if(cell.owner === ""){
        if($scope.turn === 1){
          cell.owner = "X";
          cell.checker = "X";
          $scope.playCounter++;
          $scope.turn = 2;
        }
        else {
          cell.owner = "O";
          cell.checker = "O";
          $scope.playCounter++;
          $scope.turn = 1;
        }
      }
      $scope.winChecker();
    }
    else {
      $scope.playAgain();
    }
  }

  $scope.winChecker = function() {
    if($scope.playCounter >= 5){
      $scope.rowChecker();
      $scope.columnChecker();
      $scope.diagChecker();
      if($scope.playCounter === 9 && $scope.gameOver === false){
        $scope.scoreBoard.ties++;
        $scope.gameOver = true;
      }
    }
  }

  $scope.rowChecker = function() {
    var width = Math.sqrt($scope.board.length);
    for(i = 0; i <= (width - 1) * width; i+=width){
      if($scope.board[i].checker === $scope.board[i + 1].checker && $scope.board[i].checker === $scope.board[i + 2].checker){
        $scope.board[i].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
        $scope.gameOver = true;
      }
    }
  }

  $scope.columnChecker = function() {
    var width = Math.sqrt($scope.board.length);
    for(i = 0; i <= width; i++){
      if($scope.board[i].checker === $scope.board[i + width].checker && $scope.board[i].checker === $scope.board[i + (width * 2)].checker){
        $scope.board[i].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
        $scope.gameOver = true;
      }
    }
  }

  $scope.diagChecker = function() {
    var width = Math.sqrt($scope.board.length);
    if($scope.board[0].checker === $scope.board[width + 1].checker && $scope.board[0].checker === $scope.board[(width + 1) * 2].checker){
      $scope.board[0].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
      $scope.gameOver = true;
    }
    else if($scope.board[width -1].checker === $scope.board[(width * 2) - 2].checker && $scope.board[width - 1].checker === $scope.board[(width * 3) - 3].checker){
      $scope.board[width - 1].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
      $scope.gameOver = true;
    }    
  }

  $scope.playAgain = function(){
    $scope.board = [];
    $scope.createSquares(3);
    $scope.gameOver = false;
    $scope.turn = 1;
    $scope.playCounter = 0;
  }

  var init = function(){
    $scope.createSquares(3);
  }

  init();

});