
let ctx;
let weightVector;
let goToX = 0;
let goToY = 0;
let xPerp = 0;
let yPerp = 0;
let trainingData = [
    [new Vector(-1, 1.5, 0), 1],
    [new Vector(4, 3, 0), -1],
    [new Vector(2, 3, 0), -1],
    [new Vector(-1.5, -4, 0), 1],
    [new Vector(-2, 3, 0), 1],
    [new Vector(4, 2), -1],
    [new Vector(-1, 2), 1],
    [new Vector(2, -2), 1],
    [new Vector(4.5, 3), -1]
    
  ];
      

function runPerceptron() {
  //weightVector = new Vector(0,0,0);
  //const learningRate = 0.5;
  weight_v_x = Number(document.getElementById("w_v_x").value);
  weight_v_y = Number(document.getElementById("w_v_y").value);  
  weightVector = new Vector(weight_v_x,weight_v_y,0);
  const learningRate = Number(document.getElementById("learningRate").value);
  bias = Number(document.getElementById("bias").value);
    
  console.log(weightVector);
  
  let rerun = false;
  let iterations = 0;  //Tracks number of times the training data is run through. Used to determine stopping if data seems not linearly separable
  
  let total_errors = [];
  
  console.log("---------");
  do {
    rerun = false;
    let num_errors = 0;
    for(let i = 0; i < trainingData.length; i++) {
      console.log("training Input: " + trainingData[i][0].x + ", " + trainingData[i][0].y);
      console.log("Correct Label : " + trainingData[i][1])
      let dotProduct = weightVector.dot(trainingData[i][0]) + bias;
      console.log("Dot Product   : " + dotProduct);
      let outputLabel = dotProduct > 0 ? 1 : -1;
      console.log("Output Label  : " + outputLabel);
    
      weightVector = weightVector.add(trainingData[i][0].multiply(learningRate).multiply(trainingData[i][1] - outputLabel));
      console.log("Weight Vector :" + weightVector.x + ", " + weightVector.y);
      
      bias = bias + learningRate*(trainingData[i][1] - outputLabel)
        
      if(outputLabel != trainingData[i][1]) {
        rerun = true;
        num_errors++;
      }
    }
    total_errors.push(num_errors/trainingData.length);
    iterations++;
    console.log("----------")
  } while (rerun && iterations < 5000);
  if(rerun){       
      console.log("failure");
  }
  graph_errors("graph_errors", total_errors);    
  console.log("Training Complete");
  ctx.clearRect(0, 0, 500, 500);
  graphAxis();
  graphWeight();
  graphPerpendicularWeight();
  graphData(trainingData);
  
}

//TODO
function trainPerceptron(trainingData) {
  
}

//TODO
function testPercceptron(testData) {
  
}

function graph() {
  
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
  ctx.moveTo(xOrigin, yOrigin - (bias/5*250));
  ctx.lineTo(weightVector.x / xMax * 500 / 2 + xOrigin, weightVector.y / yMax * 500 / -2 + yOrigin - (bias/5*250));
  ctx.stroke();
  ctx.strokeStyle= "#000"
  let temp;
}

function updateGraphWeight() {
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  ctx.beginPath();
  xOrigin = goToX;
  yOrigin = goToY;
  ctx.strokeStyle= "#00f"
  ctx.moveTo(xOrigin, yOrigin);
  ctx.lineTo(weightVector.x / xMax * 500 / 2 + xOrigin, weightVector.y / yMax * 500 / -2 + yOrigin);
  ctx.stroke();
  ctx.strokeStyle= "#000"
  let temp;
}

function graphPerpendicularWeight() {
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  ctx.beginPath();
  let xOrigin = 500/2;
  let yOrigin = 500/2
  ctx.strokeStyle= "#f00"
  ctx.moveTo(xOrigin, yOrigin- (bias/5*250));

  if(weightVector.x != 0){
      xPerp = -weightVector.y * (Math.sqrt( (10*(weightVector.x)**2) / (weightVector.x**2 + weightVector.y**2) )) / weightVector.x
      yPerp = Math.sqrt( (10*(weightVector.x**2)) / (weightVector.x**2 + weightVector.y**2) )
  }else{
      xPerp = 5;
      yPerp = 0;
  }
    
  ctx.lineTo(xPerp / xMax * 5000 / 2 + xOrigin, yPerp / yMax * 5000 / -2 + yOrigin- (bias/5*250));
  if(weightVector.x !=0){    
    ctx.lineTo(-xPerp / xMax * 5000 / 2 + xOrigin, -yPerp / yMax * 5000 / -2 + yOrigin- (bias/5*250));
  }else{
    ctx.lineTo(-xPerp / xMax * 5000 / 2 + xOrigin, yPerp / yMax * 5000 / -2 + yOrigin- (bias/5*250));
  }
  ctx.stroke();
  ctx.strokeStyle= "#000"
  let temp;   
  
    
  dotProd = (weightVector.x * xPerp) + (weightVector.y * yPerp)
  mag_weight_vector = Math.sqrt(weightVector.x**2 + weightVector.y**2)
  mag_perp_vector = Math.sqrt(xPerp**2 + yPerp**2)
  angleBetweenVectors = Math.acos(dotProd / (mag_perp_vector*mag_weight_vector))
  console.log("bias is: " + bias);
  console.log("perp line x is: " + xPerp + " y is: " + yPerp);
  console.log("angle between vectors is: " + angleBetweenVectors * 180 / Math.PI)
}

function updatePerpendicularWeight() {
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  ctx.beginPath();
  let xOrigin = 500/2;
  let yOrigin = 500/2
  ctx.strokeStyle= "#f00"
  

  xOrigin = goToX;
  yOrigin = goToY;
    
  ctx.moveTo(xOrigin, yOrigin);
  ctx.moveTo(xPerp / xMax * 5000 / 2 + xOrigin, yPerp / yMax * 5000 / -2 + yOrigin);
  if(weightVector.x !=0){    
    ctx.lineTo(-xPerp / xMax * 5000 / 2 + xOrigin, -yPerp / yMax * 5000 / -2 + yOrigin);
  }else{
    ctx.lineTo(-xPerp / xMax * 5000 / 2 + xOrigin, yPerp / yMax * 5000 / -2 + yOrigin);
  }
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