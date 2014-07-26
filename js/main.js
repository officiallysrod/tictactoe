var TTTApp = angular.module('TTTApp', ["firebase"]);

  TTTApp.controller('TTTController', function ($scope, $firebase) {

    $scope.board = [];

    //creates new objects, pushes them into the empty $scope.board array, 
    //and subsequently pushes that array into an object.
    //note that it is necessary to push the array into an object to make the game play nice w/ Firebase.
    $scope.createSquares = function(numWidth) {
      for(i = 0; i < numWidth * numWidth; i++){
        $scope.board.push({owner: i, winner: ""});
      }
        $scope.boardContainer = {boardArray: $scope.board, gameOver: $scope.gameOver};
        $scope.playCounter = 0;
    }

    //is called by ng-click on the "Let's get started" button that appears on page load
    //switches the $scope.showModal variable to false and runs the createSquares function to build gameboard.
    $scope.startGame = function(){
      if($scope.userName != null) {
        $scope.showModal = false;
        $scope.createSquares(3);
        setName();
      }
    }

    //initializes variables
    $scope.showModal = true;
    $scope.scoreBoard = {xWins: 0, oWins: 0, ties: 0};
    $scope.turn = 1;
    $scope.userName = null;
    $scope.playerOne = "";
    $scope.playerTwo = "";
    $scope.gameOver = false;
    // $scope.playCounter = 0;
    var sfx = new Audio('pop.mp3');

    //is called by ng-click on any cell on the board
    $scope.setChoice = function(cell) {
      if($scope.boardContainer.gameOver === false){
        sfx.play();
        if(cell.owner != "X" && cell.owner != "O"){
          if($scope.turn === 1){
            cell.owner = "X";
            $scope.playCounter++;
            $scope.turn = 2;
          }
          else {
            cell.owner = "O";
            $scope.playCounter++;
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
      if($scope.playCounter >= 5){
        diagChecker();
        rowChecker();
        columnChecker();
        if($scope.playCounter === 9 && $scope.gameOver === false){
          $scope.scoreBoard.ties++;
          $scope.boardContainer.gameOver = true;
        }
      }
    }

    //is called by the winChecker function.
    //checks each row on the board for winning scenarios.
    var rowChecker = function() {
      // var width = Math.sqrt($scope.board.length);
      var width = 3;
      for(i = 0; i <= (width - 1) * width; i+=width){
        if($scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + 1].owner && 
          $scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + 2].owner){
            $scope.boardContainer.boardArray[i].winner = $scope.boardContainer.boardArray[i + 1].winner = $scope.boardContainer.boardArray[i + 2].winner = true;
            $scope.boardContainer.boardArray[i].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
            $scope.boardContainer.gameOver = true;
        }
      }
    }

    //is called by the winChecker function.
    //checks each column on the board for winning scenarios.
    var columnChecker = function() {
      // var width = Math.sqrt($scope.board.length);
      var width = 3;
      for(i = 0; i <= width; i++){
        if($scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + width].owner && 
          $scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + (width * 2)].owner){
            $scope.boardContainer.boardArray[i].winner = $scope.boardContainer.boardArray[i + width].winner = $scope.boardContainer.boardArray[i + (width * 2)].winner = true;
            $scope.boardContainer.boardArray[i].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
            $scope.boardContainer.gameOver = true;
        }
      }
    }

    //is called by the winChecker function.
    //checks each column on the board for winning scenarios.
    var diagChecker = function() {
      // var width = Math.sqrt($scope.board.length);
      var width = 3;
      if($scope.boardContainer.boardArray[0].owner === $scope.boardContainer.boardArray[width + 1].owner && 
        $scope.boardContainer.boardArray[0].owner === $scope.boardContainer.boardArray[(width + 1) * 2].owner){
          $scope.boardContainer.boardArray[0].winner = $scope.boardContainer.boardArray[width + 1].winner = $scope.boardContainer.boardArray[(width + 1) * 2].winner = true;
          $scope.boardContainer.boardArray[0].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
          $scope.boardContainer.gameOver = true;
      }
      else if($scope.boardContainer.boardArray[width -1].owner === $scope.boardContainer.boardArray[(width * 2) - 2].owner && 
        $scope.boardContainer.boardArray[width - 1].owner === $scope.boardContainer.boardArray[(width * 3) - 3].owner){
          $scope.boardContainer.boardArray[width -1].winner = $scope.boardContainer.boardArray[(width * 2) - 2].winner = $scope.boardContainer.boardArray[(width * 3) - 3].winner = true;
          $scope.boardContainer.boardArray[width - 1].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
          $scope.boardContainer.gameOver = true;
      }    
    }

    //is called by the setChoice function if gameOver === true. 
    //resets variable to default values, builds nine new objects to create the board array,
    //and alternates which player starts the next game.
    var playAgain = function(){
      $scope.board = [];
      $scope.createSquares(3);
      $scope.boardContainer.gameOver = false;
      // $scope.gameOver = false;
      // $scope.playCounter = 0;
      $scope.turn === 1 ? $scope.turn = 1 : $scope.turn = 2;
    }

    var setName = function(){
      if($scope.playerOne != "" && $scope.playerTwo != ""){
        $scope.playerOne = $scope.userName;
        $scope.playerTwo = "";
      }
      else {
        $scope.playerTwo = $scope.userName;
      }
      // $scope.playerOne === "" ? $scope.playerOne = $scope.userName : $scope.playerTwo = $scope.userName;
    }

    //sets a default value for $scope.playerOne if user doesn't enter a value
    // $scope.defaultNameOne = function(){
    //   if($scope.playerOne === ""){return "PLAYER 1";}
    // }

    //sets a default value for $scope.playerTwo until user enters a value
    $scope.defaultNameTwo = function(){
      if($scope.playerTwo === ""){return "PLAYER 2";}
    }

    var TTTRef = new Firebase("https://tic-tac-toe-v2.firebaseio.com/") ;
    $scope.remoteBoardContainer = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteBoardContainer'));
    $scope.remoteScoreBoard = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteScoreBoard'));
    $scope.remoteTurn = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteTurn'));
    $scope.remotePlayCounter = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayCounter'));
    $scope.remotePlayerOne = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayerOne'));
    $scope.remotePlayerTwo = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayerTwo'));

    $scope.remoteBoardContainer.$bind($scope, "boardContainer");
    $scope.remoteScoreBoard.$bind($scope, "scoreBoard");
    $scope.remoteTurn.$bind($scope, "turn");
    $scope.remotePlayCounter.$bind($scope, "playCounter");
    $scope.remotePlayerOne.$bind($scope, "playerOne");
    $scope.remotePlayerTwo.$bind($scope, "playerTwo");

});