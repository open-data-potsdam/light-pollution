(function($) {
  "use strict"; // Start of use strict


  var lightMap = L.map('lightmap',{zoomControl: false}).setView([52.48166, 13.35350], 16.5);
  lightMap.dragging.disable();
  lightMap.touchZoom.disable();
  lightMap.doubleClickZoom.disable();
  lightMap.scrollWheelZoom.disable();



  var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

  var lampIcon = L.Icon.extend({
    options: {
      shadowUrl:    null,
      iconSize:     [60, 60],
      shadowSize:   [ 0,  0],
      iconAnchor:   [30, 30],
      shadowAnchor: [30, 30],
      popupAnchor:  [30, 30]
    }
  });

  var lampGas   = new lampIcon({iconUrl: 'img/lightGas.png'}),
      lampME3c  = new lampIcon({iconUrl: 'img/lightME3c.png'}),
      lampME2   = new lampIcon({iconUrl: 'img/lightME2.png'}),
      lampS5    = new lampIcon({iconUrl: 'img/lightS5.png'}),
      lampS4    = new lampIcon({iconUrl: 'img/lightS4.png'});


  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.dark',
      accessToken: 'pk.eyJ1Ijoib2tsYWItcG90c2RhbSIsImEiOiJjajd4Yzh6b3UxOWFyMndvNHJqNmRjZXViIn0.y8PAeugp7uaqNXqw9RvMdQ'
  }).addTo(lightMap);

  // https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}
  // https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2tsYWItcG90c2RhbSIsImEiOiJjajd4YzVwczg1bmptMzdxbXd1N21xczRrIn0.EXuZdezqodA72JIEPekG-A

  //*
  var mapData = null;
  $.getJSON( "data/Schoeneberg-Auswahl-Gasometer.geojson", function( data ) {
    mapData = data;


    L.geoJSON(mapData, {
      pointToLayer: function (feature, latlng) {
        if(feature.properties.BETRIEBART == "Gas") {
          return L.marker(latlng, { icon: lampGas });
        }
        var type = feature.properties.BESIT;
        switch(type) {
          case 'ME3c':
              return L.marker(latlng, { icon: lampME3c });
            break;
          case 'ME2':
              return L.marker(latlng, { icon: lampME2 });
            break;
          case 'S4':
              return L.marker(latlng, { icon: lampS4 });
            break;
          case 'S5':
              return L.marker(latlng, { icon: lampS5 });
            break;
            default:
              console.log(type);
              return L.circleMarker(latlng, geojsonMarkerOptions);
              break;
        }
      }
    }).addTo(lightMap);

  });
  //L.geoJSON(mapData).addTo(lightMap);
  // */

  $('#visualization').on('click', function(e){
    console.log($(this));
  });



})(jQuery); // End of use strict