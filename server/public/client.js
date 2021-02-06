console.log('client js up and running sir');

$(document).ready(onReady);

function onReady() {
  $('.operator-btns').on('click', setOperator);
  $('#equals').on('click', sendMathInfo);
  $('#clear').on('click', clearInputs);
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
    .then((res) => renderData(res))
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

  // dont render most recent in this list
  for (let i = 0; i < theData.length - 1; i++) {
    $('.all-the-problems').append(`
    <li>${theData[i].num1} ${theData[i].operation} ${theData[i].num2}  </li>
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
