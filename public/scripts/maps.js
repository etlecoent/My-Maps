const mapsObj = {};


$(document).ready(() => {
  $.get('/api/maps').then(({maps:mapsData, user_id}) => {

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
  })
});


