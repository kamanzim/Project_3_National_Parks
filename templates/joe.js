var rare_species_url = "/api/v1.0/rare_species"
//var rare_species_url = "rare_species.json"
var barColor = "#70100a"
d3.json(rare_species_url).then(species=>{
    
        trace1 = {
            y:species.map(n=>n.park_name).reverse(),
            x:species.map(n=>n.count).reverse(),
            type:"bar",
            orientation: "h"
        }
        data = [trace1]
        layout = {
            xaxis: {title: "Number of Rare Species",automargin:true},
            yaxis: {title: "",automargin:true},
            title: "Parks With The Greatest Number of Rare Species",
            colorway: [barColor]
        }
        Plotly.newPlot('rare_plot',data,layout,{responsive:true,displayModeBar: false})
    })