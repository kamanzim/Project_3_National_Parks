const npsAPIkey = "9JElOdCGJTGJeQnZ9YUJtbUdnrORrnHFGUpQCRQ4"
const npsBaseURL = "https://developer.nps.gov/api/v1"

var mymap = L.map('map').setView([   47.976258, -88.931261], 9);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap)

function myStyle(feature) {
    switch (feature.properties.boroughCode) {
        case '1': return {color: "#ff0000"};
        case '2':   return {color: "green"};
    }
}

function parkDescription(e){
    var UNIT_CODE = e.layer.feature.properties.UNIT_CODE
    d3.json(`${npsBaseURL}/parks?&parkCode=${UNIT_CODE}&api_key=${npsAPIkey}`).then(response=>{
        var description = response.data[0].description
        var popup = `<h1>${response.data[0].fullName}</h1><hr><p>${description}</p><p><a href=${response.data[0].url}>${response.data[0].url}</a></p><hr><img src=${response.data[0].images[0].url} style="max-width:100%">`
        console.log(response.data[0])
        L.popup().setLatLng(e.latlng)
        .setContent(popup)
        .openOn(mymap)    
    })
    
}

function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(function() {`${parkDescription(feature.properties.UNIT_CODE)}`})
            }
}
        
// var shp = require('shpjs')
shp("boundaries.zip").then(d=>{
    // console.log(d)

    var national_parks = L.geoJson(d, {filter: parkFilter,style: {color: "aquamarine", opacity: 0.8, fillcolor: "aquamarine", fillOpacity: 0.4}}).addTo(mymap);

function parkFilter(feature) {
  if (feature.properties.UNIT_TYPE === "National Park") return true
}

national_parks.on('click', function(e) {parkDescription(e)})

// national_parks.on('mouseover', function(e) {parkDescription(e)});
    // L.geoJSON(d).addTo(mymap)

    
    
    // L.geoJSON(myLines, {
    //     style: myStyle
    // }).addTo(map);
})