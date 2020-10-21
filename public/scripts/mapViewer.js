let currentURL = $(location).attr('href');
let apiURL = currentURL.replace('http://localhost:8080/users', '/api');

const mapsObj = {};

$(document).ready(() => {

  $.get(`${apiURL}`).then(({maps:mapData, user_id}) => {

    for (let m of mapData) {
      addMapContainer(m.id);
      addMapDiv(m.id);
      mapsObj[m.id] = mapDrawer(m.id, m.title, [m.latitude, m.longitude]);

      $.get(`/api/pins/maps/${m.id}`).then(pins => {

        for (let p of pins) {
          pinsDrawer(m.id, p.title, p.description, p.latitude, p.longitude, p.image_url)
        }
      });
      // If the user is logged in, add those buttons
      if(user_id) {
        addButtonsDiv(m.id);
        addEditButton(m.id);
        if (!m.is_favorite) {
          addFavoriteButton(m.id);
        } else {
          addUnFavoriteButton(m.id);
        }
      }
    }
  });
});



