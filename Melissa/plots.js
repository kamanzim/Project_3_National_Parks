// Creating the Trace
var trace1 = {
    x: top_10_park_size.park_names_states,
    y: top_10_park_size.acres,
    name: "acres",
    type: "bar"
  };
  
  var data = [trace1];
  
  var layout = {
    title: "Top 10 Parks by size",
    xaxis: { title: "Park Names & States"},
    yaxis: { title: "Acres"},
    tickangle:  30
  };
  layout={xaxis: {automargin: true}, yaxis: {automargin: true}}

  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
  