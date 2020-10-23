// Keeps our site safe from injection attacks
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
const mapDrawer = function (mapId, titleString, latLongArr) {
  const map = L.map(`smallMap${mapId}`).setView(latLongArr, 10);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: `${escape(titleString)}`,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic29jaWFqbCIsImEiOiJja2dmZm9ubzkxazI5MnpxcWpiNW4zOTJxIn0.I27HxC16sHXVkfz1XrUmFQ'
  }).addTo(map);
  return map;
};

// Adds an edit button inside a div and add it to the parent div
const addEditButton = function (mapId) {
  let editButton = `<div class="editFavoriteUnfavoriteButton">
                      <form method="GET" action="/users/maps/${mapId}/edit">
                          <button type="submit" id="map${mapId}EditButton" class="editButton btn btn-outline-primary">EDIT</button>
                      </form>
                    </div>`;
  $(`#buttonsMap${mapId}`).append(editButton);
};

// Adds a favorite button inside a div and add it to the parent div
const addFavoriteButton = function (mapId) {
  let favoriteButton = `<div class="editFavoriteUnfavoriteButton">
                         <form method="POST" action="/api/maps/${mapId}/favorite">
                            <button type="submit" id="map${mapId}FavoriteButton" class="favoriteButton btn btn-outline-warning">FAVORITE</button>
                          </form>
                        </div>`;
  $(`#buttonsMap${mapId}`).append(favoriteButton);
};

// Allows the user to unfavourite a map
const addUnFavoriteButton = function (mapId) {
  let unFavoriteButton = `<div class="editFavoriteUnfavoriteButton">
                            <form method="POST" action="/api/maps/${mapId}/unfavorite">
                              <button type="submit" id="map${mapId}UnFavoriteButton" class="unfavoriteButton btn btn-warning">UNFAVORITE</button>
                            </form>
                          </div>`;
  $(`#buttonsMap${mapId}`).append(unFavoriteButton);
};

// Adds an icon to the map showing if they are a contributor
const addContributorIcon = function (mapId) {
  let contributorIcon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-award-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
  </svg>`;
  $(`#buttonsMap${mapId}`).append(contributorIcon);
};

// Adds a pin to the map with a popUp windows that displays informations on the pin
const pinsDrawer = function (mapId, title, description, latitude, longitude, image_url) {
  let infos = `<div class="pinInfo">
                <h5>${title}</h5>
                <article>${description}</article>
                <img src="${image_url}" width="60em" height="30em">
              </div>`

  L.marker([latitude, longitude]).addTo(mapsObj[mapId])
    .bindPopup(infos);
};

// Adds a pin to the map with a popUp windows that enables the user to delete the pin
const pinsDrawerEditor = function (mapId, title, description, latitude, longitude, image_url, pinId) {
  let infos = `<form class="deleteForm" id="${pinId}" data-mapId="${mapId}">
                <h6>${title}</h6>
                <article>${description}</article>
                <img src="${image_url}" width="30em" height="30em">
                <button type="button" id="editPin" class="btn btn-outline-success btn-sm">Edit</button>
                <button type="submit" id="deleteButton" class="btn btn-outline-danger btn-sm">Delete</button>
              </form>`
  L.marker([latitude, longitude]).addTo(mapsObj[mapId])
    .bindPopup(infos);
};
