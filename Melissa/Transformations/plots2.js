var trace2 = {
    x: top_10_park_trails.trail_names_state,
    y: top_10_park_trails.popularity,
    name: "popularity",
    type: "bar",
    marker: {
        color: 'rgb(102,153,255)'
    }
  }

  var data2 = [trace2]

  var layout2 = {
    title: "Top 10 Parks' trails by popularity",
    xaxis: { title: "Park Trails & States"},
    yaxis: { title: "Popularity"},
    tickangle:  30
  };
  layout2={xaxis: {automargin: true}, yaxis: {automargin: true}}

  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot2", data2, layout2);