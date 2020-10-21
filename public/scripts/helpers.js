
// Creates a div that will hold a map and a button
const addMapContainer = function (mapId) {

  let newDiv = `<div class="smallMapContainer" id="smallMapContainer${mapId}"></div>`
  $('.smallMapSection').append(newDiv);

}

const addMapDiv = function (mapId) {
  let newDiv = `<div class="smallMap" id="smallMap${mapId}"></div>`;

  $(`#smallMapContainer${mapId}`).append(newDiv);
}

// Draws a map inside a div and add it to the parent div
const mapDrawer = function(mapId, titleString, latLongArr) {
  const map = L.map(`smallMap${mapId}`).setView(latLongArr, 10);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: `${titleString}`,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic29jaWFqbCIsImEiOiJja2dmZm9ubzkxazI5MnpxcWpiNW4zOTJxIn0.I27HxC16sHXVkfz1XrUmFQ'
  }).addTo(map);

  return map;

};

// Adds an edit button inside a div and add it to the parent div
const addEditButton = function(mapId) {

  let editButton = `<div>
                      <form method="GET" action="/users/maps/${mapId}/edit">
                          <button type="submit" id="map${mapId}EditButton" class="editButton">Edit</button>
                      </form>
                    </div>`;


  $(`#smallMapContainer${mapId}`).append(editButton);
};

// Adds a favorite button inside a div and add it to the parent div
const addFavoriteButton = function(mapId) {

  let favoriteButton = `<div>
                         <form method="POST" action="/api/maps/${mapId}/favorite">
                            <button type="submit" id="map${mapId}FavoriteButton" class="favoriteButton">FAVORITE THIS MAP</button>
                          </form>
                        </div>`;


  $(`#smallMapContainer${mapId}`).append(favoriteButton);
};

const addUnFavoriteButton = function(mapId) {
  let unFavoriteButton = `<div>
                            <form method="POST" action="/api/maps/${mapId}/unfavorite">
                              <button type="submit" id="map${mapId}UnFavoriteButton" class="unfavoriteButton">UNFAVORITE THIS MAP</button>
                            </form>
                          </div>`;
  $(`#smallMapContainer${mapId}`).append(unFavoriteButton);
};

// Adds a pin to a map
const pinsDrawer = function (mapId, title, description, latitude, longitude, image_url) {
  let infos = ` <h3>${title}<h3>
                <article>${description}</article>
                <img src="${image_url}" width="30em" height="30em">`

  L.marker([latitude, longitude]).addTo(mapsObj[mapId])
      .bindPopup(infos);

};

