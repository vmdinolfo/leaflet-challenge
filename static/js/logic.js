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
  
  // Use link to get geojson data
  var earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  
  
  var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

// Grab data with d3
d3.json(earthquakeData).then(function(data) {

    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Coors Field",
            "amenity": "Baseball Stadium",
            "popupContent": "This is where the Rockies play!"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-104.99404, 39.75621]
        }
    };
    
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
          "$" + feature.properties.MHI2016);
      }
    }).addTo(myMap);
});