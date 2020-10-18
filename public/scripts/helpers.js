const mapDrawer = function(mapId, titleString, latLongArr) {

  let newDiv = `<div class="smallMap" id="smallMap${mapId}" style="height: 150px; width: 150px;"></div>`;

  let newMapString = `<script>
                      var mymap = L.map('smallMap${mapId}').setView([${latLongArr}], 10);
                      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        maxZoom: 18,
                        attribution: '${titleString}',
                        id: 'mapbox/streets-v11',
                        tileSize: 512,
                        zoomOffset: -1,
                        accessToken: 'pk.eyJ1Ijoic29jaWFqbCIsImEiOiJja2dmZm9ubzkxazI5MnpxcWpiNW4zOTJxIn0.I27HxC16sHXVkfz1XrUmFQ'
                      }).addTo(mymap);
                      </script>`;

  $('.smallMapSection').append(newDiv, newMapString);
};
