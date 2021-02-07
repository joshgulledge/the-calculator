// global variables
let operator = '';
let number1 = 0;
let number2 = 0;
let mathProblemArr = [];
let display = '';
let currentNumber = '';

$(document).ready(onReady);

function onReady() {
  // $('.operator-btns').on('click', setOperator);
  // $('#equals').on('click', sendMathInfo);
  $('#clear').on('click', clearInputs);
  $('.the-numbers').on('click', useNumberButtons);
  $('#reset').on('click', resetHistory);
}

function resetHistory() {
  // send new get call
  $.ajax({
    url: '/resetHistory',
    method: 'GET',
  })
    .then((res) => {
      clearInputs();
      $('.current-answer').empty();
      $('.all-the-problems').empty();
      $('#input-container').val('');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function useNumberButtons(e) {
  // console.log(e.target.attributes.class);
  let input = $('#input-container');

  if (e.target.attributes.class) {
    // see if target is a number
    display += e.target.id;
    currentNumber += e.target.id;
    input.val(`${display}`);
  }

  // if target not number or equal or clear
  if (!e.target.attributes.class) {
    // num1 empty then save to num1, num1 not empty save to num2
    !number1 ? (number1 = currentNumber) : (number2 = currentNumber);

    // if its the equal
    if (e.target.id === 'equals') {
      // check for all values needed
      if (!number1 || !number2 || !operator) {
        alert('Please use two numbers and an operator');
        return;
      }

      // set up the array of obj
      mathProblemArr.push({
        num1: number1,
        num2: number2,
        operation: operator,
      });

      console.log(mathProblemArr);

      // send to server
      sendMathInfo();
      clearInputs();

      // leave the function
      return;
    }

    // get operator symbol
    makeOperatorSymbol(e.target.id);

    // add symbol to display
    display += operator;
    input.val(`${display}`);

    // clear out current number
    currentNumber = '';
    console.log(
      `num1 = ${number1}, num2 = ${number2}, operator is ${operator}`
    );
  }
}

// functions

function clearInputs() {
  // $('#first-numb-input').val('');
  // $('#second-numb-input').val('');
  $('#input-container').val('');
  operator = '';
  number1 = 0;
  number2 = 0;
  currentNumber = '';
  display = '';
  mathProblemArr = [];
}

// function setOperator(e) {
//   operator = $(e.target).attr('id');
//   // console.log(operator);
// }

function sendMathInfo() {
  // gatherInputs();
  // send the problem to server
  // do not get answer here
  $.ajax({
    url: '/getAnswers',
    method: 'POST',
    data: {
      doTheMath: mathProblemArr,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // use get to retrieve answer per instructions
  getAnswer();
}

function getAnswer() {
  $.ajax({
    url: '/getAnswers',
    method: 'GET',
  })
    .then((res) => {
      renderData(res);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function renderData(theData) {
  // clear answer
  $('.current-answer').empty();

  // most recent problem is the last one
  const mostRecent = theData[theData.length - 1];
  $('.current-answer').append(`
  <h1>${mostRecent.results}<h1>
  `);

  // empty the problems list
  $('.all-the-problems').empty();

  // dont render most recent in this list
  for (let i = 0; i < theData.length; i++) {
    // get the symbol
    // makeOperatorSymbol(theData[i].operation);

    $('.all-the-problems').append(`
    <li>${theData[i].num1} ${theData[i].operation} ${theData[i].num2}  = ${theData[i].results}</li>
    `);
  }
}

function makeOperatorSymbol(someValue) {
  // get the symbol
  switch (someValue) {
    case 'add':
      operator = '+';
      break;
    case 'subtract':
      operator = '-';
      break;
    case 'multiply':
      operator = 'x';
      break;
    case 'divide':
      operator = '/';
  }
}

// function gatherInputs() {
//   mathProblemArr = [];

//   const mathProblem = {
//     num1: $('#first-numb-input').val(),
//     num2: $('#second-numb-input').val(),
//     operation: operator,
//   };

//   mathProblemArr.push(mathProblem);
// }
