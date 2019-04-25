
let ctx;
let data = [];
let centers = [];

function cluster(){
    let clusters = document.getElementById("clusters").value;
    //let centers = create_cluster_centers(clusters);
    
    let xDist = 0;
    let yDist = 0;
    let totalDist = 0;
    let converging = true;
    let groups = [];
    for(let p=0; p<clusters; p++){
        groups.push([]);
        
    }

    while (converging){
        for(let k =0; k<clusters; k++){
            groups[k] = [];
        }
        converging = false;
        for(let i=0; i<data.length; i++){
            let minDist = -1;
            let parent = 0;
            for(let j=0; j<clusters; j++){
                xDist = (data[i][0].x - centers[j][0].x)**2;
                yDist = (data[i][0].y - centers[j][0].y)**2;
                totalDist = xDist + yDist;
                if(minDist == -1){
                    minDist = totalDist
                }else if(minDist > totalDist){
                    minDist = totalDist;
                    parent = j;
                }
            }
            if(data[i][1] != parent){
                converging = true;
            }
            data[i][1] = parent;
            groups[parent].push(data[i]);
        }
        
        for(let l=0; l<groups.length; l++){
            let avgX = 0;
            let avgY = 0;
            for(let m=0; m<groups[l].length; m++){
                avgX += groups[l][m][0].x;
                avgY += groups[l][m][0].y
            }
            if(l == 0){
            console.log(centers[l]);
				console.log("original x: " + centers[l][0].x);
				console.log("updated x: " + avgX);
				console.log("original y: " + centers[l][0].y);
				console.log("updated y: "+ avgY);
            }
            avgX = avgX / groups[l].length;
            avgY = avgY / groups[l].length;
            centers[l][0].x = avgX;
            centers[l][0].y = avgY;
        }
    }
    console.log("done!");
    ctx.clearRect(0, 0, 500, 500);
    graphData(centers,6);
    graphData(data,3);
    graphAxis();
}

function placeCenters(){
	let clusters = document.getElementById("clusters").value;
    let centers = create_cluster_centers(clusters);
	ctx.clearRect(0, 0, 500, 500);
	graphData(centers,6);
    graphAxis();
    graphData(data,3);
}


function showPoints(){
    numbPoints = document.getElementById("dataPoints").value
    data = create_data(numbPoints);
    ctx.clearRect(0, 0, 500, 500);
    graphAxis();
    graphData(data,3);
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


function graphData(data, radius) {
  let xMax = 5, xMin = -5;
  let yMax = 5, yMin = -5;
  let xOrigin = 500/2;
  let yOrigin = 500/2;
  
  for(let i = 0; i < data.length; i++) {
    ctx.fillStyle = getColor(data[i][1]);
    ctx.beginPath();
    ctx.moveTo(xOrigin, yOrigin);
    ctx.arc(data[i][0].x / xMax * 500 / 2 + xOrigin, data[i][0].y / yMax * 500 / -2 + yOrigin, radius, 0, 2 * Math.PI);
    ctx.fill(); 
  }
  ctx.fillStyle = "#000";
}


function getColor(point){
    let color = point;
    if(color == 0){
        return "#f0f";
    }else if(color == 1){
        return "#0f0";
    }else{
        return "#ff0";
    }
}

function create_data(data_points){
    let points = []
    for(let i =0; i<data_points; i++){    
    	let rand_val = Math.random();
    	if(rand_val < 0.33){    	
			x = setRange(-5,-4)
			y = setRange(-5,-4)
        }else if(rand_val < 0.66){
        	x = setRange(-1,1)
			y = setRange(-1,1)
        }else{
        	x = setRange(4,5)
			y = setRange(4,5)
        }
        points.push([new Vector(x, y, 0), 0 ])
    }
    return points;
}

function setRange(min, max){
	return (Math.random() * ((max - min) + 1)) + min
}

function create_cluster_centers(data_points){
    let points = [];
    for(let i=0; i<data_points; i++){
        x = (10*Math.random()) - 5
        y = (10*Math.random()) - 5
        points.push([new Vector(x, y, 0),i])
    }
    centers = points;
    return points;
}

window.onload = function() {
  ctx = document.getElementById("ctx").getContext("2d");

}