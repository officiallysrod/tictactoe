var tttApp = angular.module('TttApp', []);

tttApp.controller('TTTController', function ($scope) {
  
  $scope.board = [
    [  
      {cell: "aa", owner: ""},
      {cell: "ab", owner: ""},
      {cell: "ac", owner: ""}
    ],
    
    [  
      {cell: "ba", owner: ""},
      {cell: "bb", owner: ""},
      {cell: "bc", owner: ""}
    ],
    
    [  
      {cell: "ca", owner: ""},
      {cell: "cb", owner: ""},
      {cell: "cc", owner: ""}
    ]
  ]

  $scope.turn = 1;

  $scope.setChoice = function(cell) {
    if(cell.owner == ""){
      if($scope.turn == 1) {
        cell.owner = "X";
        $scope.turn = 2;
      }
      else {
        cell.owner = "O";
        $scope.turn = 1;
      }
    }
  }

  $scope.setClass = function(cell) {
    if(cell.owner == "x") {
      return "xselected";
    }
    else {
      return "oselected";
    }
  }

});