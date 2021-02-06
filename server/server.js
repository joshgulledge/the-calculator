const express = require('express');
const app = express();
// set port
const port = 3000;
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
  res.send('you did it');
});

app.post('/getAnswers', (req, res) => {
  // see comments below for post pattern
  const calculateInfo = req.body.doTheMath;

  calculate(calculateInfo);

  res.send('post recieved');
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
  let theInfo = theMath[0];
  let numberOne = Number(theInfo.num1);
  let numberTwo = Number(theInfo.num2);
  let results;

  if (theInfo.operation === 'add') {
    results = numberOne + numberTwo;
  }
  if (theInfo.operation === 'subtract') {
    results = numberOne - numberTwo;
  }
}
