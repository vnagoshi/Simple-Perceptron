 function graph_errors(div, values) {
    let trace =[];
    let counter = [];
    for(i=0; i<values.length; i++){
        counter[i] = i;
    }
    trace[0] = {
                  x: counter,
                  y: values,
                  mode: 'lines+markers',
                  marker: {
                    size: 40,
                    //color: region_2016
                  },
                  type: 'scatter',
                  name: "year: ",
                  //text: name1,
                  textposition: 'top center',
                  textfont: {
                    family:  'Raleway, sans-serif'
                  },
                  marker: { size: 12 }
                };  
      let axis_color = "#000000";
        
        var data = trace;

        var layout = {
          hovermode: 'closest',
          xaxis: {
            title: 'iterations',
            //range: [ 0, 2 ]
          },
          yaxis: {
            title: 'percent of errors',
            titlefont: {
              //family: 'Courier New, monospace',
              size: 12,
              color: axis_color
            }
          },
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: 'rgba(0,0,0,0)',  
          legend: {
            
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'grey',
            },
            title: 'hi',
          },
          title:'percent errors per iteration',
        font: {
           size: 12,
           color: axis_color
         },
         titlefont: {
            size: 16,
            color: axis_color
         }, 
        };
      
        Plotly.newPlot(div, data, layout); 
}