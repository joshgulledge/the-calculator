console.log('client js up and running sir');

$(document).ready(onReady);

function onReady() {
  $('.operator-btns').on('click', setOperator);
  $('#equals').on('click', getAnswer);
  $('#clear').on('click', clearInputs);
}

// global variables
let operator = '';
let num1 = 0;
let num2 = 0;

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

function getAnswer() {
  gatherInputs();
  console.log(`we are going to ${operator} the numbers ${num1} and ${num2}`);
}

function gatherInputs() {
  num1 = $('#first-numb-input').val();
  num2 = $('#second-numb-input').val();
}
