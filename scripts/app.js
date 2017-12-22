//wait for user to put number
    //if correct - make number from input, change ? sign to input
    //else - make number in input red, in equation - background yellow

//when all numbers set correct - change ? to input
//wait for user to put number
    //if correct - make number from input
    //else - make number in input red

var first = document.getElementById("first");
var second = document.getElementById("second");
var pict = document.getElementById("pict");
var scale = document.getElementById("scale");
var result = document.getElementById("result");
var equation = document.querySelector("#numSum p");

var answer;
var round = 0;

function init(){
    generateNumbers();
    showArrowShape(first);
}

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

function lastIter() {
    var inp = getInput(null, false);
    inp.classList.add("finalInput");
    equation.replaceChild(inp, result);
}

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

function generateNumbers(){
    var firstValue = giveRandomNum(6, 9);
    var secondValue = giveRandomNum(11 - firstValue, 14 - firstValue);
    answer = firstValue + secondValue;
    first.textContent = firstValue;
    second.textContent = secondValue;
}

function giveRandomNum(lowLimit, highLimit){
    return Math.round(lowLimit - 0.5 + Math.random() * (highLimit - lowLimit + 1));
}

window.onload = init;