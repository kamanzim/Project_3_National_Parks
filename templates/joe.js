var species_url = "rare_species.json"
var barColor = "34ebd2"
d3.json(species_url).then(species=>{
    
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
        Plotly.newPlot('rare_plot',data,layout)
    })