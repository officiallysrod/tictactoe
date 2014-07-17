var tttApp = angular.module('TttApp', []);

tttApp.controller('TTTController', function ($scope) {
  
  $scope.test = "This is a test!";

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
  
});