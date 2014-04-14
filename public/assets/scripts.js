'use strict';

function T9Controller($scope) {

  $scope.inputStr = "";
  $scope.message = "";
  $scope.possibleWords = [];

  // Display order of numbers
  $scope.buttonOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"]

  // Number mappings
  $scope.buttonMap =
    { "1": []
    , "2": ['A', 'B', 'C']
    , "3": ['D', 'E', 'F']
    , "4": ['G', 'H', 'I']
    , "5": ['J', 'K', 'L']
    , "6": ['M', 'N', 'O']
    , "7": ['P', 'Q', 'R', 'S']
    , "8": ['T', 'U', 'V']
    , "9": ['W', 'X', 'Y', 'Z']
    , "*": []
    , "0": []
    , "#": []
    };

  /**
   * clearInput - start over
   */
  $scope.clearInput = function() {
    $scope.inputStr = "";
    $scope.possibleWords = [];
  }

  /**
   * clearMessage - remove message text
   */
  $scope.clearMessage = function() {
    $scope.message = "";
  }

  /**
   * addDigit - Add number to input string after button press
   * param num number on button
   * return null
   */
  $scope.addWordToMessage = function(word) {
    $scope.message += word + " ";
    $scope.clearInput();
  }

  /**
   * addDigit - Add number to input string after button press
   * param num number on button
   * return null
   */
  $scope.addDigit = function(num) {
    $scope.inputStr += num;
    $scope.possibleWords = getPossibleWords($scope.inputStr)
    console.log($scope.inputStr, $scope.possibleWords);
  }

  /**
   * Gets all possible words for a given number sequence typed on a standard
   * telephone 10-digit keypad. Gets ALL letter combinations and not just
   * those which are actual words (which would require a separate dictionary
   * lookup).
   *
   * Characters that do not correspond with a letter will be ignored.
   *
   * @param int|string numberSequence
   *
   * @return array An array of unique lowercase string word possibilities
   *               given the number sequence.
   */
  var getPossibleWords = function (inputStr) {
    if(inputStr == "")
      return [];

    var str         = inputStr.replace()    // beginning string
      , strLength   = str.length  // beginning string length
      , wordArray   = []          // initialize empty wordArray
      , returnArray = []          // initialize empty returnArray
      , buttonGroup = $scope.buttonMap[str.substring(0, 1)] // get the array of values for the button group
      ;

    // If string is longer than 1 char, get possible words array subset
    // recursively cut down the string until we have one char
    if (strLength > 1) {
        wordArray = getPossibleWords(str.substring(1, strLength));
    }

    // If the button has an array of values continue, otherwise return the wordArray
    if (buttonGroup.length > 0) {
      // if the wordArray is not empty continue, otherwise return the buttonGroup array of values
      if (wordArray.length > 0) {
        // Her we loop through each buttonGroup value, and add each leter to each value in the wordArray
        for (var i in buttonGroup) {
          for (var x in wordArray) {
            var newWord = buttonGroup[i] + wordArray[x];
            returnArray.push( newWord.toLowerCase() );
          }
        }
      } else {
        for(var i in buttonGroup) {
          returnArray.push( buttonGroup[i].toLowerCase() );
        }
      }
    } else {
        returnArray = wordArray;
    }

    return returnArray;
  }

}