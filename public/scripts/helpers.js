const pinsDrawer = function (mpaId, title, description, latitude, longitude, img_url) {

  let newPin = `<script>
                  var marker = L.marker([${latitude}, ${longitude}]).addTo(mymap);
                  // add content to the pin (text etc)
                </script>`


};

const addMapDiv = function (mapId) {

  let newDiv = `<div class="smallMapContainer" id="smallMapContainer${mapId}"></div>`

  $('.smallMapSection').append(newDiv);

}



const mapDrawerOnly = function(mapId, titleString, latLongArr) {

  let newDiv = `<div class="smallMap" id="smallMap${mapId}"></div>`;

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

  $(`#smallMapContainer${mapId}`).append(newDiv, newMapString);
};

const addEditButton = function(mapId) {

  let editButton = `<div>
                      <form method="GET" action="/users/maps/${mapId}/edit">
                          <button type="submit" id="map${mapId}Button">EDIT NEW MAP</button>
                      </form>
                    </div>`;


  $(`#smallMapContainer${mapId}`).append(editButton);
};
