// Get metadata from the samples.json file
function metadata(s) {

  d3.json("/api/v1.0/Parks").then((data) => {

    var parkName = data.filter(p => p.park_name == s);
    //console.log(parkName);

    var result = parkName[0];
    //console.log(result);

    var demographic = d3.select("#park-metadata");
    demographic.html("");

    Object.entries(result).forEach(([key, value]) => {
      demographic.append("h6").text(`${key}: ${value}`);
    });
  });
}

function buildGraphs() {
  var paper_bgcolor = "white"
  var vbarColor = "#4974a5"
  // Build the top 10 parks per arcers
  d3.json("/api/v1.0/top_10_arces").then((data) => {
    var parkName = data.map(d => d.park_name);
    //console.log(parkName);
    var totalAcres = data.map(t => t.acres);
    //console.log(totalAcres);

    // bar chart
    var trace1 =
    {
      x: parkName,
      y: totalAcres,
      marker: {
        color: vbarColor
      },
      type: "bar"
    };

    var barData = [trace1];

    var barLayout = {
      title: "Largest Parks",
      // width: 450,
      // height: 500,
      // margin: { t: 50, b: 175, l: 100, r: 100 },
      // margin: { b: 175 },
      xaxis: { tickangle: 45, automargin: true},
      yaxis: {
        gridwidth: 2,
        title: "Acres",
        // titlefont: { size: 20 },
        automargin: true
      },
      paper_bgcolor: paper_bgcolor
    }

    Plotly.newPlot("acres_plot", barData, barLayout, { responsive: true, displayModeBar: false });
  })

  // Top 10 bar graph
  // Grab the API URL 
  d3.json("/api/v1.0/Top 10 Parks visited").then(function (data) {
    // Check the data
        // Create variables to hold park names and visitation

    var names = data.map(row => row.park_name);
    // console.log(names);

    var visitation = data.map(row => row.sum);
    // console.log(visitation);

    //build the trace for the bar graph
    var trace1 = {
      type: "bar",
      y: visitation,
      x: names,
      marker: {
        color: vbarColor
      }
    }
    //assign the trace to the data variable
    var data = [trace1];

    //configure the graph layout
    var layout = {
      // width: 450,
      // height: 500,
      xaxis: { tickangle: 45, automargin: true },
      yaxis: {title: "Total Visitors", automargin: true},
      title: "Most Visited Parks (1904 to 2016)",
      paper_bgcolor: paper_bgcolor
    }

    //draw the plot
    Plotly.newPlot("top10_visit_plot", data, layout, { responsive: true, displayModeBar: false });

  });

  // Rare species graph
  var rare_species_url = "/api/v1.0/rare_species"
  //var rare_species_url = "rare_species.json"
  var barColor = "#70100a"
  d3.json(rare_species_url).then(species => {

    trace1 = {
      y: species.map(n => n.park_name).reverse(),
      x: species.map(n => n.count).reverse(),
      type: "bar",
      orientation: "h"
    }
    data = [trace1]
    layout = {
      xaxis: { title: "Number of Rare Species", automargin: true },
      yaxis: { title: "", automargin: true },
      title: "Parks With Most Rare Species",
      colorway: [barColor],
      paper_bgcolor: paper_bgcolor
    }
    Plotly.newPlot('rare_plot', data, layout, { responsive: true, displayModeBar: false })
  })

  // Trail miles graph
  var barColor = "#70100a"
  d3.json("/api/v1.0/Trail_Miles").then(t => {

    trace1 = {
      y: t.map(n => n.park_name).reverse(),
      x: t.map(n => n.sum).reverse(),
      type: "bar",
      orientation: "h"
    }
    data = [trace1]
    layout = {
      xaxis: { title: "Trail Miles", automargin: true },
      yaxis: { title: "", automargin: true },
      title: "Parks With Most Trail Miles",
      colorway: [barColor],
      paper_bgcolor: paper_bgcolor
    }
    Plotly.newPlot('trail_plot', data, layout, { responsive: true, displayModeBar: false })
  })

}




function init() {
  // dropdown select element
  var selector = d3.select("#parkDataset");

  // fill in the parkDataset
  //console.log(data.park_name);
  d3.json("/api/v1.0/Parks").then((p) => {
    var pNames = p.map(p => p.park_name);
    //console.log(pNames)
    pNames.forEach((s) => {
      selector
        .append("option")
        .text(s)
        .property("value", s);
    });

    // Pass in the first Park Name to create the graph and demographic info
    const initialPark = pNames[0];
    // console.log(initialPark)
    metadata(initialPark);
    buildGraphs();
  });
}

function parkChange(nPark) {
  // Pass in the new Park name once selected in the dropdown
  //console.log(nSample)
  metadata(nPark);
}

// Initialize the dashboard
init();