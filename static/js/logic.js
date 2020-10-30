// Creating map object
var myMap = L.map("mapid", {
    center: [50, -110],
    zoom: 4
  });
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "light-v10",
accessToken: API_KEY
}).addTo(myMap);

// Use link to get geojson data (Larger Set)
var earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Use link to get geojson data (Smaller Set For Testing)
//var earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'


//Grab data with d3
d3.json(earthquakeURL).then(function(data) {
    
    // create a style funtion for markers to match assignment requirements
    function circleStyle(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: colorLevel(feature.geometry.coordinates[2]),
        color: "Grey",
        radius: getMagnitude(feature.properties.mag),
        stroke: true,
        weight: 0.5
        };
    }

    // Function to determine color of marker based on depth of earthquake
    function colorLevel(depth) {
        if (depth > 100) {
            return "Red"
        }        
        else if (depth > 70) {
            return "OrangeRed"
        }
        else if (depth > 50) {
            return "orange"
        }
        else if (depth > 30) {
            return "yellow"
        }
        else if (depth > 10)  {
            return "green"
        }
        else {
            return "Chartreuse"
        }
    };

    // Function to determine radius based on earthquake magnitude
    function getMagnitude(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 3;
    }

    // Add Legend and set parameters for the legend
    // create legend and assign position
    var legend = L.control({position: 'bottomright'});

    // add funtion to populate legend
    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            depths = [0, 10, 30, 50, 70, 100]
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorLevel(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

    L.geoJson(data, {

            // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
    style: circleStyle,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth:" + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place) ;
    }
    }).addTo(myMap);          



});