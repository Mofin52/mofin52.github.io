/*
 Saving most important elements to variables.
 */
var first = document.getElementById("first");
var second = document.getElementById("second");
var pict = document.getElementById("pict");
var scale = document.getElementById("scale");
var result = document.getElementById("result");
var equation = document.querySelector("#numSum p");

/*
 Answer of main equation - will initialize during app initialization
 */
var answer;

/*
 Count of round. Needed to know at which part of page we need to make changes
 */
var round = 0;

/*
 Initialization. Generates equation and shows the first arrow.
 */
function init(){
    generateNumbers();
    showArrowShape(first);
}

/*
 Method to show arrows. Elem - is operand of equation to which arrow corresponds.
 */
function showArrowShape(elem){
    var unit = 38.7;
    var arrowSize = elem.textContent * unit;
    var arrow = document.createElement("div");
    arrow.classList.add("arrow");
    arrow.style.width = arrowSize + "px";
    arrow.style.height = arrowSize/2 + "px";
    pict.insertBefore(arrow, scale);
    var inp = getInput(arrow, true);
    pict.insertBefore(inp, arrow);
}

/*
 Method created inputs for arrows and final part of equation.
 */
function getInput(place, isForArrows) {
    var inp = document.createElement("input");
    inp.classList.add("numInput");

    if (isForArrows) {
        inp.style.marginLeft = parseFloat(place.style.width)/2 + 15 + "px";
        inp.style.top = -parseFloat(place.style.height) - 15 + "px";
        inp.style.marginRight = -parseFloat(place.style.width)/2 - 51 + "px";
    }

    inp.onkeyup = checkResult;
    return inp;
}

/*
 Listener that reacts on keyup event.
 1. Looks what round it is to know what values to compare.
 2. Compares value of input to corresponding part of equation.
 3. Depending on result of comparison either highlights mistakes or move us to the next round.
 */
function checkResult() {
    var guess = this.value;
    if (round == 0) {
        if(guess == first.textContent) {
            first.classList.remove("highlight");
            this.classList.remove("wrongAnswer");
            pict.replaceChild(prepareReplaceNode(guess, this, true), this);
            round++;
            showArrowShape(second);
        } else {
            first.classList.add("highlight");
            this.classList.add("wrongAnswer");
        }
    } else if (round == 1) {
        if(guess == second.textContent) {
            second.classList.remove("highlight");
            this.classList.remove("wrongAnswer");
            pict.replaceChild(prepareReplaceNode(guess, this, true), this);
            round++;
            lastIter();
        } else {
            second.classList.add("highlight");
            this.classList.add("wrongAnswer");
        }
    } else {
        if(guess == answer) {
            this.classList.remove("wrongAnswer");
            equation.replaceChild(prepareReplaceNode(guess, this, false), this);
            //replace node
        } else {
            this.classList.add("wrongAnswer");
        }
    }
}
/*
 Method to init last iteration. Could be refactored and combined with showArrowShape but I have no time.
 */
function lastIter() {
    var inp = getInput(null, false);
    inp.classList.add("finalInput");
    equation.replaceChild(inp, result);
}
/*
 Methods prepares text node that will replace input after right answer.
 value - what to write in node
 prevelem - element we want to replace (needed to copy JS-calculated styles).
 isForArrows - if true, we copy calculated styles, if false - we skip it.
 */
function prepareReplaceNode(value, prevElem, isForArrows) {
    var newNode = document.createElement("span");
    newNode.classList.add("numInput");
    newNode.style.borderColor = "transparent";
    newNode.textContent = value;

    if (isForArrows) {
        newNode.style.marginLeft = prevElem.style.marginLeft;
        newNode.style.top = prevElem.style.top;
        newNode.style.marginRight = prevElem.style.marginRight;
    }

    return newNode;
}

/*
 Misc method to generate equation.
 */
function generateNumbers(){
    var firstValue = giveRandomNum(6, 9);
    var secondValue = giveRandomNum(11 - firstValue, 14 - firstValue);
    answer = firstValue + secondValue;
    first.textContent = firstValue;
    second.textContent = secondValue;
}

/*
  Misc method to generate random numbers in given ranges.
 */
function giveRandomNum(lowLimit, highLimit){
    return Math.round(lowLimit - 0.5 + Math.random() * (highLimit - lowLimit + 1));
}

/*
  Initialisation of app.
 */
window.onload = init;