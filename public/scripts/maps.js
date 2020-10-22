const mapsObj = {};


$(document).ready(() => {
  $.get('/api/maps').then(({maps:mapsData, user_id}) => {
    let sortedMaps = [];
    $.get("/api/maps/favoriteMaps").then(({favoriteMaps}) => {
      sortedMaps = favoriteMaps;
      // Remove duplicates
      for (let map of mapsData) {
        let includes = false;
        for (let fav of favoriteMaps) {
          if (map.id === fav.id) {
            includes = true;
          }
        }
        if (!includes) {
          sortedMaps.push(map);
        }
      }
      let mapsToDraw = [];
      if (user_id) {
        mapsToDraw = sortedMaps;
      } else {
        mapsToDraw = mapsData;
      }
      for (let m of mapsToDraw) {
        addMapContainer(m.id);
        addMapDiv(m.id);
        mapsObj[m.id] = mapDrawer(m.id, m.title, [m.latitude, m.longitude]);
        $(`#smallMap${m.id}`).click( () => {
          window.location.replace(`/users/maps/${m.id}`);
        });

        $.get(`/api/pins/maps/${m.id}`).then(pins => {
          for (let p of pins) {
            pinsDrawer(m.id, p.title, p.description, p.latitude, p.longitude, p.image_url);
          }
        });
        // If the user is logged in
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
  })
});

