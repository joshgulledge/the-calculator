const express = require('express');
const app = express();

// set port
const port = 3000;

// set global variables
const previousProblems = [];

// set public
app.use(express.static('server/public'));

// set json reader
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start listening
app.listen(port, () => {
  console.log('listening on port', port);
});

app.get('/getAnswers', (req, res) => {
  res.send(previousProblems);
});

app.post('/getAnswers', (req, res) => {
  // see comments below for post pattern
  const calculateInfo = req.body.doTheMath;

  calculate(calculateInfo);

  res.sendStatus(200);
});
/*
------ Follow this pattern for posts ------

{
  doTheMath: [
    {
      num1: exampleNumber
      num2: exampleNumber
      operation: exampleOperator
    }
  ]
}
*/

function calculate(theMath) {
  const theInfo = theMath[0];
  const problem = {
    num1: Number(theInfo.num1),
    num2: Number(theInfo.num2),
    operation: theInfo.operation,
    results: 0,
  };

  if (theInfo.operation === '+') {
    problem.results = problem.num1 + problem.num2;
  }
  if (theInfo.operation === '-') {
    problem.results = problem.num1 - problem.num2;
  }
  if (theInfo.operation === 'x') {
    problem.results = problem.num1 * problem.num2;
  }
  if (theInfo.operation === '/') {
    problem.results = problem.num1 / problem.num2;
  }

  previousProblems.push(problem);
}
