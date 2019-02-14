
let ctx;
let weightVector;

function runPerceptron() {
  weightVector = new Vector(0,0,0);
  const learningRate = 0.5;
  console.log(weightVector);
  
  let rerun = false;
  let iterations = 0;  //Tracks number of times the training data is run through. Used to determine stopping if data seems not linearly separable
  let trainingData = [
    [new Vector(1, 1, 0), 1],
    [new Vector(-1, -1, 0), -1],
    [new Vector(0, -1, 0), -1],
    [new Vector(1, -1, 0), 1],
    [new Vector(-1, 0, 0), -1],
    [new Vector(0, 1, 0), 1],
    [new Vector(-1, 1, 0), -1],
    [new Vector(1, 0, 0), 1],
    [new Vector(-0.5, 4, 0), -1]
    
  ];
  
  console.log("---------");
  do {
    rerun = false;
    for(let i = 0; i < trainingData.length; i++) {
      console.log("training Input: " + trainingData[i][0].x + ", " + trainingData[i][0].y);
      console.log("Correct Label : " + trainingData[i][1])
      let dotProduct = weightVector.dot(trainingData[i][0]);
      console.log("Dot Product   : " + dotProduct);
      let outputLabel = dotProduct > 0 ? 1 : -1;
      console.log("Output Label  : " + outputLabel);
    
      weightVector = weightVector.add(trainingData[i][0].multiply(learningRate).multiply(trainingData[i][1] - outputLabel));
      console.log("Weight Vector :" + weightVector.x + ", " + weightVector.y);
      
      if(outputLabel != trainingData[i][1]) {
        rerun = true;
      }
    }
    iterations++;
    console.log("----------");
    if(iterations >= 10000) {
      console.log("ERROR: Weight Vector not found in 10000 passes. Data assumed unseparable.");
      break;
    }
  } while (rerun);
  
  console.log("Training Complete");

  graph(trainingData);
}

//TODO
function trainPerceptron(trainingData) {
  
}

//TODO
function testPercceptron(testData) {
  
}

function graph(data) {
  ctx.clearRect(0,0,500,500);
  graphAxis();
  graphWeight();
  graphData(data);
}

function graphAxis() {
  let xOrigin = 500/2;
  let yOrigin = 500/2;
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(xOrigin, 0);
  ctx.lineTo(xOrigin, 500);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, yOrigin);
  ctx.lineTo(500, yOrigin);
  ctx.stroke();
  for(let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(xOrigin, yOrigin);
    ctx.arc(500 / 10 * i , yOrigin, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  for(let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(xOrigin, yOrigin);
    ctx.arc(xOrigin, 500 / 10 * i , 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function graphWeight() {
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  ctx.beginPath();
  let xOrigin = 500/2;
  let yOrigin = 500/2
  ctx.strokeStyle= "#00f"
  ctx.moveTo(xOrigin, yOrigin);
  ctx.lineTo(weightVector.x / xMax * 500 / 2 + xOrigin, weightVector.y / yMax * 500 / -2 + yOrigin);
  ctx.stroke();
  ctx.strokeStyle= "#000"
  let temp;
}

function graphData(data) {
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  let xOrigin = 500/2;
  let yOrigin = 500/2
  for(let i = 0; i < data.length; i++) {
    data[i][1] == 1 ? ctx.fillStyle = "#f0f" : ctx.fillStyle = "#0f0";
    ctx.beginPath();
    ctx.moveTo(xOrigin, yOrigin);
    ctx.arc(data[i][0].x / xMax * 500 / 2 + xOrigin, data[i][0].y / yMax * 500 / -2 + yOrigin, 3, 0, 2 * Math.PI);
    ctx.fill(); 
  }
  ctx.fillStyle = "#000";
}

window.onload = function() {
  ctx = document.getElementById("ctx").getContext("2d");
  runPerceptron();
  

}