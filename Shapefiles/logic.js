const npsAPIkey = "9JElOdCGJTGJeQnZ9YUJtbUdnrORrnHFGUpQCRQ4"
const npsBaseURL = "https://developer.nps.gov/api/v1"



// function myStyle(feature) {
//     switch (feature.properties.boroughCode) {
//         case '1': return {color: "#ff0000"};
//         case '2':   return {color: "green"};
//     }
// }

function parkDescription(e){
    if (e.target.options.alt) {var UNIT_CODE = e.target.options.alt}
    else {var UNIT_CODE = e.layer.feature.properties.UNIT_CODE}
    d3.json(`${npsBaseURL}/parks?&parkCode=${UNIT_CODE}&api_key=${npsAPIkey}`).then(response=>{
        if (response.data[0]) {var description = response.data[0].description
        var popup = `<h1>${response.data[0].fullName}</h1><hr><p>${description}</p><p><a href=${response.data[0].url}>${response.data[0].url}</a></p><hr><img src=${response.data[0].images[0].url} style="max-width:100%">`
        console.log(response.data[0])
        L.popup().setLatLng(e.latlng)
        .setContent(popup)
        .openOn(mymap)
        }    
    })
    
}
function gauge(parksDisplayed) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: parksDisplayed,
            title: { text: "Number of Parks" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
            axis: { range: [null, 63] },
            // steps: [
            //     { range: [0, 2], color: "#ff8b94" },
            //     { range: [2, 4], color: "#ffaaa5" },
            //     { range: [4,6], color: "#ffd3b6 "},
            //     { range: [6,8], color: "#dcedc1"},
            //     { range: [8,9], color: "#a8e6cf"},
            // ],
            bar: { color: "#3385c6" }
            }
        }
        ];
        
        var layout = {height: 200, margin: {
            l: 30,
            r: 30,
            b: 0,
            t: 20,
            pad: 4
          },
          paper_bgcolor: "#eeefee"};
        Plotly.newPlot('gauge', data, layout,{responsive:true,displayModeBar: false});
};

function buttonReset () {
    d3.select('#top10').selectAll('button').attr("class", "btn btn-secondary w-100")
    clearMap()
}
// function onEachFeature(feature, layer) {
//     if (feature.properties) {
//         layer.bindPopup(function() {`${parkDescription(feature.properties.UNIT_CODE)}`})
//             }
// }
var shapeConverted
var parksDisplayed        
var national_parks
var markers = L.layerGroup()
function showParks(filter) {
shp("data/boundaries").then(d=>{
    // console.log(d)
    // console.log(filter)
    national_parks = L.geoJson(d, {filter: parkFilter, style: {color: "aquamarine", opacity: 0.8, fillcolor: "aquamarine", fillOpacity: 0.4}}).addTo(mymap);
    //use park code to grab lat/lon from DB and populate markers as well
    // L.geoJson(national_parks, {onEachFeature:onEachFeature}).addTo(mymap)
    parksDisplayed = national_parks.getLayers().length
    gauge(parksDisplayed)
    national_parks.eachLayer(layer=>{
        var feature = layer.feature
    // Check if feature is a polygon
    if (feature.geometry.type === 'Polygon'|| feature.geometry.type === 'MultiPolygon') {
        // Don't stroke and do opaque fill
        // layer.setStyle({
        //     'weight': 0,
        //     'fillOpacity': 0
        // });
        // Get bounds of polygon
        var bounds = layer.getBounds();
        // Get center of bounds
        var center = bounds.getCenter();
        // Use center to put marker on map
        var marker = L.marker(center,{alt: feature.properties.UNIT_CODE}).on('click',parkDescription).bindTooltip().setTooltipContent(feature.properties.UNIT_NAME).addTo(markers);
    }
})
function parkFilter(feature, layer) {
    if (!filter) return true
    else if (filter.includes(feature.properties.STATE)) {
        return true}
}// Deprecated. I manually deleted shapefile attributes to reduce the shapefile size and speed up webpage loading

national_parks.on('click', function(clicked) {parkDescription(clicked)})

// national_parks.on('mouseover', function(e) {parkDescription(e)});
    // L.geoJSON(d).addTo(mymap)


})
}
showParks()

function clearMap() {
    mymap.removeLayer(national_parks)
    markers.eachLayer(function(layer) {markers.removeLayer(layer);})
}

function buttonToggle(element) {
    console.log(d3.select(element).attr("class"))
    if (d3.select(element).attr("class") == "btn btn-secondary w-100") {
        clearMap()
        showParks(["CA","WY"])
        console.log(national_parks)
        buttonReset()
        d3.select(element).attr("class","btn btn-primary w-100")
    }
    else if (d3.select(element).attr("class")=="btn btn-primary w-100") {
        // d3.select(element).attr("class","btn btn-secondary")
        clearMap()
        buttonReset()
        showParks()
    }

}



var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

var mymap = L.map('map',{
    center: [ 39.656570, -96.479204],
    zoom: 4,
    layers: [light,markers]
    });

var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl)