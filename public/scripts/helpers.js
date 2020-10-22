
// Creates a div that will hold a map and a button
const addMapContainer = function (mapId) {

  let newDiv = `<div class="smallMapContainer" id="smallMapContainer${mapId}"></div>`
  $('.smallMapSection').append(newDiv);
}

const addMapDiv = function (mapId) {
  let newDiv = `<div class="smallMap" id="smallMap${mapId}"></div>`;
  $(`#smallMapContainer${mapId}`).append(newDiv);
}

const addButtonsDiv = function (mapId) {
  let newDiv = `<div class="buttonsMap" id="buttonsMap${mapId}"></div>`;

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

  let editButton = `<div class="editFavoriteUnfavoriteButton">
                      <form method="GET" action="/users/maps/${mapId}/edit">
                          <button type="submit" id="map${mapId}EditButton" class="editButton btn btn-outline-primary">EDIT</button>
                      </form>
                    </div>`;


  $(`#buttonsMap${mapId}`).append(editButton);
};

// Adds a favorite button inside a div and add it to the parent div
const addFavoriteButton = function(mapId) {

  let favoriteButton = `<div class="editFavoriteUnfavoriteButton">
                         <form method="POST" action="/api/maps/${mapId}/favorite">
                            <button type="submit" id="map${mapId}FavoriteButton" class="favoriteButton btn btn-outline-warning">FAVORITE  </button>
                          </form>
                        </div>`;


  $(`#buttonsMap${mapId}`).append(favoriteButton);
};

const addUnFavoriteButton = function(mapId) {

  let unFavoriteButton = `<div class="editFavoriteUnfavoriteButton">
                            <form method="POST" action="/api/maps/${mapId}/unfavorite">
                              <button type="submit" id="map${mapId}UnFavoriteButton" class="unfavoriteButton btn btn-warning">UNFAVORITE THIS MAP</button>
                            </form>
                          </div>`;


  $(`#buttonsMap${mapId}`).append(unFavoriteButton);
};

// Adds a pin to a map
const pinsDrawer = function (mapId, title, description, latitude, longitude, image_url) {

  let infos = ` <h3>${title}<h3>
  <article>${description}</article>
  <img src="${image_url}" width="30em" height="30em">`

  L.marker([latitude, longitude]).addTo(mapsObj[mapId])
      .bindPopup(infos);

};

const pinsDrawerEditor = function (mapId, title, description, latitude, longitude, image_url, pinId) {
  // data-mapId=... mapId
  let infos = `<form class="deleteForm" id="${pinId}" data-mapId="${mapId}">
  <h3>${title}</h3>
  <article>${description}</article>
  <img src="${image_url}" width="30em" height="30em">
    <button type="submit">Delete</button>
  </form>`


  L.marker([latitude, longitude]).addTo(mapsObj[mapId])
      .bindPopup(infos);

};
