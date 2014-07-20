var tttApp = angular.module('TttApp', []);

  tttApp.controller('TTTController', function ($scope) {
  
  $scope.board = []

  $scope.createSquares = function(numWidth) {
    for(i = 0; i < numWidth * numWidth; i++){
      $scope.board.push({owner: "", pointValue: 0});
    }
  }

  $scope.scoreBoard = {xWins: 0, oWins: 0, ties: 0};
  $scope.turn = 1;
  $scope.gameOver = false;
  $scope.playCounter = 0;
  $scope.playerOne = "Player One";
  $scope.playerTwo = "Player Two";

  $scope.setChoice = function(cell) {
    if($scope.gameOver === false){
      if(cell.owner === ""){
        if($scope.turn === 1){
          cell.owner = "X";
          cell.pointValue = cell.pointValue + 1;
          $scope.playCounter = $scope.playCounter + 1;
          $scope.turn = 2;
        }
        else {
          cell.owner = "O";
          cell.pointValue = cell.pointValue - 1;
          $scope.playCounter = $scope.playCounter + 1;
          $scope.turn = 1;
        }
      }
      $scope.winChecker();
    }
    else {
      $scope.playAgain();
    }
  }

  $scope.winChecker = function(){
    if($scope.board[0].pointValue + $scope.board[1].pointValue + $scope.board[2].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[0].pointValue + $scope.board[1].pointValue + $scope.board[2].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[3].pointValue + $scope.board[4].pointValue + $scope.board[5].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[3].pointValue + $scope.board[4].pointValue + $scope.board[5].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[6].pointValue + $scope.board[7].pointValue + $scope.board[8].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[6].pointValue + $scope.board[7].pointValue + $scope.board[8].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[0].pointValue + $scope.board[3].pointValue + $scope.board[6].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[0].pointValue + $scope.board[3].pointValue + $scope.board[6].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[1].pointValue + $scope.board[4].pointValue + $scope.board[7].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[1].pointValue + $scope.board[4].pointValue + $scope.board[7].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[2].pointValue + $scope.board[5].pointValue + $scope.board[8].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[2].pointValue + $scope.board[5].pointValue + $scope.board[8].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[0].pointValue + $scope.board[4].pointValue + $scope.board[8].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[0].pointValue + $scope.board[4].pointValue + $scope.board[8].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[2].pointValue + $scope.board[4].pointValue + $scope.board[6].pointValue === 3){
      $scope.scoreBoard.xWins = $scope.scoreBoard.xWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.board[2].pointValue + $scope.board[4].pointValue + $scope.board[6].pointValue === -3){
      $scope.scoreBoard.oWins = $scope.scoreBoard.oWins + 1;
      $scope.gameOver = true;
    }
    else if($scope.playCounter === 9){
      $scope.scoreBoard.ties = $scope.scoreBoard.ties + 1;
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