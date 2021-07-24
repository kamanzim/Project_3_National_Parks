// Get metadata from the samples.json file
function metadata(s) {
  
  d3.json("/api/v1.0/Species").then((data) => {
    
    var setArray = data.filter(sObject => sObject.park_name == s);
    // var result = setArray[0]

    console.log(setArray);

    // var demographic = d3.select("#park-metadataa");
    // demographic.html("");
    // Object.entries(result).forEach(([key, value]) => {
    //   demographic.append("h6").text(`${key}: ${value}`);
    // });
  });
}

function addParks() {
  
  d3.select("#parkDataset").append('select')
  d3.select("#parkDataset>select").append('option').text("Select a Park")
  //d3.select("#parkDataset>select").attr('onchange','goToPark(this.value)')
  d3.json("/api/v1.0/Parks").then(result=>{
    var pNames = Object.entries(result);
    result.forEach(park=>{
      d3.select("#parkDataset>select").append('option').text(park.park_name).property('value',park.park_code)
      });
  //});
    const initialPark = pNames[0];
    console.log(pNames[0]);
    //metadata(initialPark);
  });
}

function init() {
  // dropdown select element
  // var selector = d3.select("#parkDataset");
  addParks();
  // fill in the selDataset
  // d3.json("/api/v1.0/Parks").then(function(data) {
  //   console.log(data[0].park_name)
  // d3.json("/api/v1.0/Parks").then((p) => {
  //   var pNames = p.park_name;
  //   console.log(pNames)
    // pNames.forEach((s) => {
    //   selector
    //     .append("option")
    //     .text(s)
    //     .property("value", s);
    // });

    // Pass in the first sample to create the graph and demographic info
    // const initalSample = pNames[0];
    // metadata(initalSample);
    // buildGraphs(initalSample);
  // });
}

function parkChange(nSample) {
  // Pass in the new sample once selected in the dropdown
  metadata(nSample);
  //buildGraphs(nSample);
}

// Initialize the dashboard
init();