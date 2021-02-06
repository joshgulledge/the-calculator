console.log('client js up and running sir');

$(document).ready(onReady);

function onReady() {
  $('.operator-btns').on('click', setOperator);
  $('#equals').on('click', sendMathInfo);
  $('#clear').on('click', clearInputs);
  $('.the-numbers').on('click', useNumberButtons);
}

function useNumberButtons(e) {
  $('#input-container').val(`${e.target.id}`);
}

// global variables
let operator = '';
let num1 = 0;
let num2 = 0;
let mathProblemArr = [];

// functions

function clearInputs() {
  $('#first-numb-input').val('');
  $('#second-numb-input').val('');
  operator = '';
  num1 = 0;
  num2 = 0;
}

function setOperator(e) {
  operator = $(e.target).attr('id');
  // console.log(operator);
}

function sendMathInfo() {
  gatherInputs();
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
  ${mostRecent.results}
  `);

  // empty the problems list
  $('.all-the-problems').empty();

  // dont render most recent in this list
  for (let i = 0; i < theData.length - 1; i++) {
    let operator;
    // get the symbol
    switch (theData[i].operation) {
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

    $('.all-the-problems').append(`
    <li>${theData[i].num1} ${operator} ${theData[i].num2}  = ${theData[i].results}</li>
    `);
  }
}

function gatherInputs() {
  mathProblemArr = [];

  const mathProblem = {
    num1: $('#first-numb-input').val(),
    num2: $('#second-numb-input').val(),
    operation: operator,
  };

  mathProblemArr.push(mathProblem);
}
