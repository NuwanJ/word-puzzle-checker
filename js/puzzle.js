
var thisPuzzle = new Array(); 
var thisWords = new Array(); 
var rows = 0; // number of rows in the puzzle
var columns = 0; // number of columns in the puzzle

var foundLeft = '00FF00';
var foundRight = '154893';
var foundUpDown = 'FF0069';
var foundDownUp = 'FF5900';

var foundUpLeft = '85FF012';
var foundUpRight = '56FF78';
var foundDownLeft = 'F25900';
var foundDownRight = 'FF7890';

var foundCharacterColor = '#00FF00';
var foundW = 0;

function doIt(){
  loadPuzzle();
  solvePuzzle();
}
function loadPuzzle(){
  var i, j = 0; // indexes
  var rebuild = false; // rebuild puzzle (new columnds, rows..)

  $("#foundList").html("");
  $('#puzzle').val("");
  $("#puzzleText").val($("#puzzleText").val().replace(/ /g,''));
  $("#words").val($("#words").val().replace(/ /g,'').toUpperCase());
  
  // read words
  if (thisWords.length != $("#words").val().split('\n').length) {
    thisWords = $("#words").val().split('\n');
    //$("span#wTotal").html(thisWords.length-1);
    rebuild = true;
  }
  
  if (thisPuzzle.length != $("#puzzleText").val().split('\n').length) {
    thisPuzzle = $("#puzzleText").val().replace(" ", "").split('\'\n');
    rebuild = true;
    thisRows = thisPuzzle.length;
    thisColumns = (thisPuzzle[0].length-1);
  }
  
  // TODO: check words length

  // create table
  if (true == rebuild) {
    $("table#puzzle").html("");
    for (i=0; i < thisRows; ++i) {
      $("table#puzzle").append("<tr id=\"r"+i+"\"></tr>");
      for (j=0; j < thisColumns; ++j) {
        $("table#puzzle tr#r"+i).append("<td id=\"c"+(j+1)+"\" rel=\"E\">"+thisPuzzle[i].charAt(j+1)+"</td>");
      }
    }
  }


}

function solvePuzzle(){
  var wFound = new Array(); // list of words that were found
    var res = false; // was word found in any direction
    var wL = thisWords.length;
    var i=0; // index for the words
    var j=0; // index for the puzzle rows
    var k=0; // index for the puzzle columns
    var fChar = ''; // first character
    foundW = 0;
    
    for (i=0; i < wL; ++i) {
      // search all words
      fChar = thisWords[i].charAt(0); // get first char and find beginning

      console.log("\n" + thisWords[i]);
      
      wordFound:
      for (j=0; j < thisRows; ++j) {
        for (k=0; k < thisColumns; ++k) {
          if (fChar == thisPuzzle[j].charAt(k+1)) {
            // first character found
            
            // check left
            res = findWordLeft(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found Left > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");

              break wordFound; // word found, break loops
            } 
            

            // check right
            res = findWordRight(thisWords[i], 1, thisWords[i].length, j, k+1);

            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found Right > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");

              break wordFound; // word found, break loops
            }
            
            // check top
            res = findWordUp(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found Up > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");
              
              break wordFound; // word found, break loops
            }
            
            // check bottom
            res = findWordDown(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found Down > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");
              
              break wordFound; // word found, break loops
            }
            
            // check up-left
            res = findWordUpLeft(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found upLeft > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");
              
              break wordFound; // word found, break loops
            }
            
            // check up-right
            res = findWordUpRight(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found upRight > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");
              
              break wordFound; // word found, break loops
            }
            
            // check down-left
            res = findWordDownLeft(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found downLeft > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");
              
              break wordFound; // word found, break loops
            }
            
            // check down-right
            res = findWordDownRight(thisWords[i], 1, thisWords[i].length, j, k+1);
            if (false !== res) {
              $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundCharacterColor).attr('rel', 'X');
              console.log("found downRight > " + thisWords[i]); foundW++;
              $("#foundList").append(thisWords[i] + "<br>");
              
              break wordFound; // word found, break loops
            }
            
          }
        }
      }
      ++wFound;
    }
    $("input#wFound").val(foundW);
    //$("#pSolution").html(getSolution());
}


function getSolution() {
  var result = '';
  $("#puzzle td[rel='E']").each(function(i) {
    result += $(this).html() + " ";
  });
  return result;
}





function findWordLeft(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (0 < k && word.charAt(posW) == thisPuzzle[j].charAt(k-1)) {
    result = this.findWordLeft(word, posW+1, wordL, j, k-1);
    if (result !== false) {
      $("table#puzzle tr#r"+j+" td#c"+(k-1)).css('background-color', this.foundLeft).attr('rel', 'X');
      return new Array(j, k-1);
    }
  }
  return result;
}

function findWordRight(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (thisColumns > k && word.charAt(posW) == thisPuzzle[j].charAt(k+1)) {
    result = this.findWordRight(word, posW+1, wordL, j, k+1);
    if (result !== false) {
      $("table#puzzle tr#r"+j+" td#c"+(k+1)).css('background-color', this.foundRight).attr('rel', 'X');
      return new Array(j, k+1);
    }
  }
  return result;
}

function findWordUp(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (0 <= (j-1) && word.charAt(posW) == thisPuzzle[j-1].charAt(k)) {
    result = this.findWordUp(word, posW+1, wordL, j-1, k);
    if (result !== false) {
      $("table#puzzle tr#r"+(j-1)+" td#c"+k).css('background-color', this.foundDownUp).attr('rel', 'X');
      return new Array(j-1, k);
    }
  }
  return result;
}

function findWordDown(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (thisRows > (j+1) && word.charAt(posW) == thisPuzzle[j+1].charAt(k)) {
    result = this.findWordDown(word, posW+1, wordL, j+1, k);
    if (result !== false) {
      $("table#puzzle tr#r"+(j+1)+" td#c"+k).css('background-color', this.foundUpDown).attr('rel', 'X');
      return new Array(j+1, k);
    }
  }
  return result;
}

function findWordUpLeft(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (0 < k && 0 < j && word.charAt(posW) == thisPuzzle[j-1].charAt(k-1)) {
    result = this.findWordUpLeft(word, posW+1, wordL, j-1, k-1);
    if (result !== false) {
      $("table#puzzle tr#r"+(j-1)+" td#c"+(k-1)).css('background-color', this.foundUpLeft).attr('rel', 'X');
      return new Array(j-1, k-1);
    }
  }
  return result;
}

function findWordUpRight(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (thisColumns > k && 0 < j && word.charAt(posW) == thisPuzzle[j-1].charAt(k+1)) {
    result = this.findWordUpRight(word, posW+1, wordL, j-1, k+1);
    if (result !== false) {
      $("table#puzzle tr#r"+(j-1)+" td#c"+(k+1)).css('background-color', this.foundUpRight).attr('rel', 'X');
      return new Array(j-1, k+1);
    }
  }
  return result;
}

function findWordDownLeft(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found

  if (thisRows > (j+1) && 0 < k  && word.charAt(posW) == thisPuzzle[j+1].charAt(k-1)) {
    result = this.findWordDownLeft(word, posW+1, wordL, j+1, k-1);
    if (result !== false) {
      $("table#puzzle tr#r"+(j+1)+" td#c"+(k-1)).css('background-color', this.foundDownLeft).attr('rel', 'X');
      return new Array(j+1, k-1);
    }
  }
  return result;
}

function findWordDownRight(word, posW, wordL, j, k) {
  var result = false;
  if (posW == wordL) { return true; } // check if all characters were found
  
  if (thisRows > (j+1) && thisColumns > k   && word.charAt(posW) == thisPuzzle[j+1].charAt(k+1)) {
    result = this.findWordDownRight(word, posW+1, wordL, j+1, k+1);
    if (result !== false) {
      $("table#puzzle tr#r"+(j+1)+" td#c"+(k+1)).css('background-color', this.foundDownRight).attr('rel', 'X');
      return new Array(j+1, k+1);
    }
  }
  return result;
}
