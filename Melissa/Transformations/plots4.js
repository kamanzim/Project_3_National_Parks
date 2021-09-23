var trace4 = {
    x: top_10_parks_species.park_names,
    y: top_10_parks_species.species_abundance,
    name: "species",
    type: "bar",
    marker: {
        color: 'rgb(255, 153, 153)'
    }
  }

  var data4 = [trace4]

  var layout4 = {
    title: "Top 10 Parks with the most abundant species",
    xaxis: { title: "Park Names"},
    yaxis: { title: "Number of species_abundance"},
    tickangle:  30
  };
  layout2={xaxis: {automargin: true}, yaxis: {automargin: true}}

  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot4", data4, layout4);