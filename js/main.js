var tttApp = angular.module('TttApp', ["firebase"]);

  tttApp.controller('TTTController', function ($scope, $firebase) {
  
  $scope.board = []

  //creates new objects and pushes them into the empty $scope.board array
  var createSquares = function(numWidth) {
    for(i = 0; i < numWidth * numWidth; i++){
      $scope.board.push({owner: i, winner: null});
    }
  }

  //initializes variables
  $scope.showModal = true;
  $scope.scoreBoard = {xWins: 0, oWins: 0, ties: 0};
  $scope.turn = 1;
  $scope.playerOne = null;
  $scope.playerTwo = null;
  var gameOver = false;
  var playCounter = 0;
  var sfx = new Audio('pop.mp3');

  //is called by ng-click on any cell on the board
  $scope.setChoice = function(cell) {
    if(gameOver === false){
      sfx.play();
      if(cell.owner != "X" && cell.owner != "O"){
        if($scope.turn === 1){
          cell.owner = "X";
          playCounter++;
          $scope.turn = 2;
        }
        else {
          cell.owner = "O";
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

  //is called by the setChoice function.
  //checks the board for all winning scenarios. 
  var winChecker = function() {
    if(playCounter >= 5){
      diagChecker();
      rowChecker();
      columnChecker();
      if(playCounter === 9 && gameOver === false){
        $scope.scoreBoard.ties++;
        gameOver = true;
      }
    }
  }

  //is called by the winChecker function.
  //checks each row on the board for winning scenarios.
  var rowChecker = function() {
    var width = Math.sqrt($scope.board.length);
    for(i = 0; i <= (width - 1) * width; i+=width){
      if($scope.board[i].owner === $scope.board[i + 1].owner && 
        $scope.board[i].owner === $scope.board[i + 2].owner){
          $scope.board[i].winner = $scope.board[i + 1].winner = $scope.board[i + 2].winner = true;
          $scope.board[i].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
          gameOver = true;
      }
    }
  }

  //is called by the winChecker function.
  //checks each column on the board for winning scenarios.
  var columnChecker = function() {
    var width = Math.sqrt($scope.board.length);
    for(i = 0; i <= width; i++){
      if($scope.board[i].owner === $scope.board[i + width].owner && 
        $scope.board[i].owner === $scope.board[i + (width * 2)].owner){
          $scope.board[i].winner = $scope.board[i + width].winner = $scope.board[i + (width * 2)].winner = true;
          $scope.board[i].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
          gameOver = true;
      }
    }
  }

  //is called by the winChecker function.
  //checks each column on the board for winning scenarios.
  var diagChecker = function() {
    var width = Math.sqrt($scope.board.length);
    if($scope.board[0].owner === $scope.board[width + 1].owner && 
      $scope.board[0].owner === $scope.board[(width + 1) * 2].owner){
        $scope.board[0].winner = $scope.board[width + 1].winner = $scope.board[(width + 1) * 2].winner = true;
        $scope.board[0].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
        gameOver = true;
    }
    else if($scope.board[width -1].owner === $scope.board[(width * 2) - 2].owner && 
      $scope.board[width - 1].owner === $scope.board[(width * 3) - 3].owner){
        $scope.board[width -1].winner = $scope.board[(width * 2) - 2].winner = $scope.board[(width * 3) - 3].winner = true;
        $scope.board[width - 1].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
        gameOver = true;
    }    
  }

  //is called by the setChoice function if gameOver === true. 
  //resets variable to default values, builds nine new objects to create the board array,
  //and alternates which player starts the next game.
  var playAgain = function(){
    $scope.board = [];
    createSquares(3);
    gameOver = false;
    playCounter = 0;
    $scope.turn === 1 ? $scope.turn = 1 : $scope.turn = 2;
  }

  //sets a default value for $scope.playerOne if user doesn't enter a value
  $scope.defaultNameOne = function(){
    if($scope.playerOne === null){return "PLAYER 1";}
  }

  //sets a default value for $scope.playerTwo if user doesn't enter a value
  $scope.defaultNameTwo = function(){
    if($scope.playerTwo === null){return "PLAYER 2";}
  }

  //is called by ng-click on the "Let's get started" button that appears on page load
  //switches the $scope.showModal variable to false.
  $scope.hideModal = function(){
    $scope.showModal = false;
  }

  var init = function(){
    createSquares(3);
  }

  init();

});