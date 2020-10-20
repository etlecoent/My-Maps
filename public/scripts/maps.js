const mapsObj = {};

$(document).ready(() => {

  $.get('/api/maps').then(mapsData => {

    for (let m of mapsData) {
      addMapContainer(m.id);
      addMapDiv(m.id);
      mapsObj[m.id] = mapDrawer(m.id, m.title, [m.latitude, m.longitude]);

      $.get(`/api/pins/maps/${m.id}`).then(pins => {

        for (let p of pins) {
          pinsDrawer(m.id, p.title, p.description, p.latitude, p.longitude, p.img_url)
        }
      });
      addEditButton(m.id);
      if (m.is_favorite) {
        addFavoriteButton(m.id);
      } else {
        addUnFavoriteButton(m.id);
      }
    }
  })
});
