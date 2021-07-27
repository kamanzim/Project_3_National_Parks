// Get metadata from the samples.json file
function metadata(s) {
  
  d3.json("/api/v1.0/Parks").then((data) => {
    
    var parkName = data.filter(p => p.park_name == s);
    //console.log(parkName);
  
    var result = parkName[0];
    //console.log(result);

    var demographic = d3.select("#park-metadata");
    demographic.html("");
    // demographic.append("h6").text(parkName);
    Object.entries(result).forEach(([key, value]) => {
      demographic.append("h6").text(`${key}: ${value}`);
    });
  });
}

// function addParks() {
  
//   d3.select("#parkDataset").append('select')
//   d3.select("#parkDataset>select").append('option').text("Select a Park")
//   // d3.select("#parkDataset>select").attr('onchange','parkChange(this.value)')
//   d3.json("/api/v1.0/Parks").then(result=>{
//     var pNames = result.map(p => p.park_name);
//     result.forEach(park=>{
//       d3.select("#parkDataset>select").append('option').text(park.park_name).property('value',park.park_code)
//       });
//   //});
//     const initialPark = pNames[0];
//     //console.log(initialPark);
//     metadata(initialPark);
//   });
// }

function init() {
  // dropdown select element
  var selector = d3.select("#parkDataset");
  // addParks();
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
    // buildGraphs(initalSample);
 });
}

function parkChange(nPark) {
  // Pass in the new sample once selected in the dropdown
  //console.log(nSample)
  metadata(nPark);
  //buildGraphs(nSample);
}

// Initialize the dashboard
init();