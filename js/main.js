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
    $scope.playerOne = "Player One";
    $scope.playerTwo = "";
    $scope.playerNum;
    $scope.invalidTurn = false;
    $scope.winner = "";
    $scope.tie = false;
    $scope.gameOver = false;
    var sfx = new Audio('pop.mp3');

    //is called by ng-click on any cell on the board
    $scope.setChoice = function(cell){
      if($scope.boardContainer.gameOver === false){
        sfx.play();
        if($scope.playerNum != $scope.turn){ $scope.invalidTurn = true; }
        else {
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
          $scope.tie = true;
          $scope.boardContainer.gameOver = true;
        }
      }
    }

    //is called by the winChecker function.
    //checks each row on the board for winning scenarios.
    var rowChecker = function() {
      var width = 3;
      for(i = 0; i <= (width - 1) * width; i+=width){
        if($scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + 1].owner && 
          $scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + 2].owner){
            $scope.boardContainer.boardArray[i].winner = $scope.boardContainer.boardArray[i + 1].winner = $scope.boardContainer.boardArray[i + 2].winner = true;
            $scope.boardContainer.boardArray[i].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
            $scope.boardContainer.gameOver = true;
            $scope.announceWinner();
        }
      }
    }

    //is called by the winChecker function.
    //checks each column on the board for winning scenarios.
    var columnChecker = function() {
      var width = 3;
      for(i = 0; i <= width; i++){
        if($scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + width].owner && 
          $scope.boardContainer.boardArray[i].owner === $scope.boardContainer.boardArray[i + (width * 2)].owner){
            $scope.boardContainer.boardArray[i].winner = $scope.boardContainer.boardArray[i + width].winner = $scope.boardContainer.boardArray[i + (width * 2)].winner = true;
            $scope.boardContainer.boardArray[i].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
            $scope.boardContainer.gameOver = true;
            $scope.announceWinner();
        }
      }
    }

    //is called by the winChecker function.
    //checks each diagonal on the board for winning scenarios.
    var diagChecker = function() {
      var width = 3;
      if($scope.boardContainer.boardArray[0].owner === $scope.boardContainer.boardArray[width + 1].owner && 
        $scope.boardContainer.boardArray[0].owner === $scope.boardContainer.boardArray[(width + 1) * 2].owner){
          $scope.boardContainer.boardArray[0].winner = $scope.boardContainer.boardArray[width + 1].winner = $scope.boardContainer.boardArray[(width + 1) * 2].winner = true;
          $scope.boardContainer.boardArray[0].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
          $scope.boardContainer.gameOver = true;
          $scope.announceWinner();
      }
      else if($scope.boardContainer.boardArray[width -1].owner === $scope.boardContainer.boardArray[(width * 2) - 2].owner && 
        $scope.boardContainer.boardArray[width - 1].owner === $scope.boardContainer.boardArray[(width * 3) - 3].owner){
          $scope.boardContainer.boardArray[width -1].winner = $scope.boardContainer.boardArray[(width * 2) - 2].winner = $scope.boardContainer.boardArray[(width * 3) - 3].winner = true;
          $scope.boardContainer.boardArray[width - 1].owner === "X" ? $scope.scoreBoard.xWins++ : $scope.scoreBoard.oWins++;
          $scope.boardContainer.gameOver = true;
          $scope.announceWinner();
      }    
    }

    //is called by the setChoice function if gameOver === true. 
    //resets variable to default values, builds nine new objects to create the board array,
    //and alternates which player starts the next game.
    var playAgain = function(){
      $scope.board = [];
      $scope.createSquares(3);
      $scope.boardContainer.gameOver = false;
      $scope.winner = "";
      $scope.tie = false;
      $scope.turn === 1 ? $scope.turn = 1 : $scope.turn = 2;
    }

    //assigns user-entered name to playerOne or playerTwo variable and assigns playerNum variable
    var setName = function(){
      if($scope.playerOne === "" || ($scope.playerOne != "" && $scope.playerTwo != "")){
        $scope.playerOne = $scope.userName;
        $scope.playerTwo = "";
        $scope.playerNum = 1;
      }
      else {
        $scope.playerTwo = $scope.userName;
        $scope.playerNum = 2;
      }
    }

    //sets a default value for $scope.playerTwo until user enters a value
    $scope.defaultNameTwo = function(){
      if($scope.playerTwo === ""){return "WAITING...";}
    }

    //hides the invalidTurn dialog on user's click
    $scope.hideInvalidTurn = function(){
      $scope.invalidTurn = false;
    }

    $scope.announceWinner = function(){
      if($scope.boardContainer.gameOver === true){
        $scope.turn === 2 ? $scope.winner = $scope.playerOne : $scope.winner = $scope.playerTwo;
      }
    }

    //all the stuff to make Firebase work
    var TTTRef = new Firebase("https://tic-tac-toe-v2.firebaseio.com/") ;
    var BoardContainerRef = new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteBoardContainer');
    var PlayerOneRef = new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayerOne');
    var PlayerTwoRef = new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayerTwo');

    $scope.remoteBoardContainer = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteBoardContainer'));
    $scope.remoteScoreBoard = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteScoreBoard'));
    $scope.remoteTurn = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteTurn'));
    $scope.remotePlayCounter = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayCounter'));
    $scope.remotePlayerOne = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayerOne'));
    $scope.remotePlayerTwo = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remotePlayerTwo'));
    $scope.remoteWinner = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteWinner'));
    $scope.remoteTie = $firebase(new Firebase('https://tic-tac-toe-v2.firebaseio.com//remoteTie'));

    $scope.remoteBoardContainer.$bind($scope, "boardContainer");
    $scope.remoteScoreBoard.$bind($scope, "scoreBoard");
    $scope.remoteTurn.$bind($scope, "turn");
    $scope.remotePlayCounter.$bind($scope, "playCounter");
    $scope.remotePlayerOne.$bind($scope, "playerOne");
    $scope.remotePlayerTwo.$bind($scope, "playerTwo");
    $scope.remoteWinner.$bind($scope, "winner");
    $scope.remoteTie.$bind($scope, "tie");

    BoardContainerRef.onDisconnect().remove();
    PlayerOneRef.onDisconnect().set("Player One");
    PlayerTwoRef.onDisconnect().set("Player Two");

});