var tttApp = angular.module('TttApp', []);

  tttApp.controller('TTTController', function ($scope) {
  
  $scope.board = []

  var createSquares = function(numWidth) {
    for(i = 0; i < numWidth * numWidth; i++){
      $scope.board.push({owner: "", checker: new Date(), winner: null});
    }
  }

  $scope.showModal = true;
  $scope.scoreBoard = {xWins: 0, oWins: 0, ties: 0};
  $scope.turn = 1;
  $scope.playerOne = null;
  $scope.playerTwo = null;
  var gameOver = false;
  var playCounter = 0;
  var sfx = new Audio('pop.mp3');

  $scope.setChoice = function(cell) {
    if(gameOver === false){
      sfx.play();
      if(cell.owner === ""){
        if($scope.turn === 1){
          cell.owner = "X";
          cell.checker = "X";
          playCounter++;
          $scope.turn = 2;
        }
        else {
          cell.owner = "O";
          cell.checker = "O";
          playCounter++;
          $scope.turn = 1;
        }
      }
      winChecker();
    }
    else {
      playAgain();
    }
  }

  var winChecker = function() {
    if(playCounter >= 5){
      rowChecker();
      columnChecker();
      diagChecker();
      if(playCounter === 9 && gameOver === false){
        $scope.scoreBoard.ties++;
        gameOver = true;
      }
    }
  }

  var rowChecker = function() {
    var width = Math.sqrt($scope.board.length);
    for(i = 0; i <= (width - 1) * width; i+=width){
      if($scope.board[i].checker === $scope.board[i + 1].checker && $scope.board[i].checker === $scope.board[i + 2].checker){
        $scope.board[i].winner = true;
        $scope.board[i + 1].winner = true;
        $scope.board[i + 2].winner = true;
        $scope.board[i].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
        gameOver = true;
      }
    }
  }

  var columnChecker = function() {
    var width = Math.sqrt($scope.board.length);
    for(i = 0; i <= width; i++){
      if($scope.board[i].checker === $scope.board[i + width].checker && $scope.board[i].checker === $scope.board[i + (width * 2)].checker){
        $scope.board[i].winner = true;
        $scope.board[i + width].winner = true;
        $scope.board[i + (width * 2)].winner = true;
        $scope.board[i].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
        gameOver = true;
      }
    }
  }

  var diagChecker = function() {
    var width = Math.sqrt($scope.board.length);
    if($scope.board[0].checker === $scope.board[width + 1].checker && $scope.board[0].checker === $scope.board[(width + 1) * 2].checker){
      $scope.board[0].winner = true;
      $scope.board[width + 1].winner = true;
      $scope.board[(width + 1) * 2].winner = true;
      $scope.board[0].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
      gameOver = true;
    }
    else if($scope.board[width -1].checker === $scope.board[(width * 2) - 2].checker && $scope.board[width - 1].checker === $scope.board[(width * 3) - 3].checker){
      $scope.board[width -1].winner = true;
      $scope.board[(width * 2) - 2].winner = true;
      $scope.board[(width * 3) - 3].winner = true;
      $scope.board[width - 1].checker === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
      gameOver = true;
    }    
  }

  var playAgain = function(){
    $scope.board = [];
    createSquares(3);
    gameOver = false;
    playCounter = 0;
    $scope.turn === 1 ? $scope.turn = 1 : $scope.turn = 2;
  }

  $scope.defaultNameOne = function(){
    if($scope.playerOne === null){return "PLAYER 1";}
  }

  $scope.defaultNameTwo = function(){
    if($scope.playerTwo === null){return "PLAYER 2";}
  }

  $scope.hideModal = function(){
    $scope.showModal = false;
  }

  var init = function(){
    createSquares(3);
  }

  init();

});