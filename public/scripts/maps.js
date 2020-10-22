const mapsObj = {};


$(document).ready(() => {

  $.get('/api/maps').then(({maps:mapsData, user_id}) => {
    let counter = 0;

    for (let m of mapsData) {

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
        });
      }
    }
  })



});
