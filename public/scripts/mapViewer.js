let currentURL = $(location).attr('href');
let apiURL = currentURL.replace('http://localhost:8080/users', '/api');
const mapsObj = {};

$(document).ready(() => {

  $.get(`${apiURL}`).then(({maps:mapData, user_id}) => {
    for (let m of mapData) {
      addMapContainer(m.id);
      addMapDiv(m.id);
      mapsObj[m.id] = mapDrawer(m.id, m.title, [m.latitude, m.longitude]);
      $.get(`/api/maps/${m.id}/pins/`).then(pins => {
        for (let p of pins) {
          pinsDrawer(m.id, p.title, p.description, p.latitude, p.longitude, p.image_url)
        }
      });
      // If the user is logged in, add those buttons
      if(user_id) {
        addButtonsDiv(m.id);
        addEditButton(m.id);

        // Ajax query to get FavoriteMaps and check if the m (current map) is favorite
        $.get(`/api/maps/${m.id}/favoriteMaps/`).then (({favoriteMaps}) => {

          if (favoriteMaps.length) {
            addUnFavoriteButton(m.id);
          } else {
            addFavoriteButton(m.id);
          }

          // Ajax query to get contributions of the user on this map and checks if the user as contributed
          $.get(`/api/maps/${m.id}/contributions`).then (({contributions}) => {
            if (contributions.length) {
              addContributorIcon(m.id);
            }
          });
        });
      }
    }
  });

});



