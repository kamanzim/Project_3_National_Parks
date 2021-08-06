var trace3 = {
    x: top_10_parks_visitors_2016.park_names_states,
    y: top_10_parks_visitors_2016.visitors,
    name: "visitors",
    type: "bar",
    marker: {
        color: 'rgb(255, 153, 255)'
    }
  }

  var data3 = [trace3]

  var layout3 = {
    title: "Top 10 Parks by visitation in the year 2016",
    xaxis: { title: "Park Names & States"},
    yaxis: { title: "Visitors"},
    tickangle:  30
  };
  layout2={xaxis: {automargin: true}, yaxis: {automargin: true}}

  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot3", data3, layout3);