let currentURL = $(location).attr('href');
let apiURL = currentURL.replace('http://localhost:8080/users', '/api');

const mapsObj = {};
let selectedMarker = {};

$(document).ready(() => {
  let i = 0;
  let markers = [];

  $.get(`${apiURL}`).then(({ maps: mapData, user_id }) => {
    const { id, title, latitude, longitude } = mapData[0]
    addMapContainer(id);
    addMapDiv(id);
    mapsObj[id] = mapDrawer(id, title, [latitude, longitude]);

    $.get(`/api/maps/${id}/pins/`).then(pins => {
      for (let p of pins) {
        pinsDrawerEditor(id, p.title, p.description, p.latitude, p.longitude, p.image_url, p.id);
      }
    });
    mapsObj[id].on("click", function (evt) {
      let marker = L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(mapsObj[id]);
      marker.bindPopup(`
                  <form id="${i}">
                    <div class="form-group">
                      <input type='text' name='marker_title' placeholder="Title" class="form-control form-control-sm" aria-describedby="inputGroup-sizing-sm"/>
                      <input type='text' name='marker_description' placeholder="Description" class="form-control form-control-sm" aria-describedby="inputGroup-sizing-sm"/>
                      <input type='url' name='marker_image' placeholder="Image Url" class="form-control form-control-sm" aria-describedby="inputGroup-sizing-sm"/>
                      <button type="submit" id="saveButton" class="btn btn-outline-success btn-sm">Add</button>
                    </div>
                  </form>`).openPopup();

      $(`#${i}`).on("submit", function (evt) {
        evt.preventDefault()
        let markerTemp = {};

        markerTemp.title = escape(evt.target.marker_title.value);
        markerTemp.description = escape(evt.target.marker_description.value);
        markerTemp.image_url = escape(evt.target.marker_image.value);
        markerTemp.lat = marker._latlng.lat
        markerTemp.lng = marker._latlng.lng
        markers.push(markerTemp);
        // Add data to the pins array
        marker.closePopup();
      })

      $('#buttonUpdate').submit(function (event) {
        event.preventDefault();
        $.ajax({
          method: "POST",
          url: `/api/maps/${id}/pins/`,
          data: {markers}
        }).then(() => {
          $.ajax({
            method: "POST",
            url: `/api/maps/${id}/contributions/`,
            data: {user_id}
          }).then(() => {
            window.location.replace(`/users/maps/${id}/edit`);
          })
        })
      })
    });
  });

  $(`.smallMapSection`).on("submit", ".editForm", function(evt) {
    evt.preventDefault();

    let pinId = $(this).attr('id');
    let mapId =  $(this).data('mapid');
    let newMarker = {};

    newMarker.title = escape(evt.target.marker_title.value);
    newMarker.description = escape(evt.target.marker_description.value);
    newMarker.image_url = escape(evt.target.marker_image.value);

    $.ajax({
      method: "PUT",
      url: `/api/maps/${mapId}/pins/${pinId}`,
      data: newMarker

    }).then(() => {
      $.ajax({
        method: "POST",
        url: `/api/maps/${mapId}/contributions/`
      }).then(() => {
        window.location.replace(`/users/maps/${mapId}/edit`);
      })
    })
  })
  $(`.smallMapSection`).on("click", "#editPin", function(event) {
    event.preventDefault()

    let pinId = $(this).parent().attr('id');
    let mapId =  $(this).parent().data('mapid');

    let newForm = `<form class="editForm" id="${pinId}" data-mapId="${mapId}">
                    <div class="form-group">
                     <input type='text' name='marker_title' placeholder="Title"  class="form-control form-control-sm" aria-describedby="inputGroup-sizing-sm"/>
                      <input type='text' name='marker_description' placeholder="Description" class="form-control form-control-sm" aria-describedby="inputGroup-sizing-sm"/>
                      <input type='url' placeholder="https://" name='marker_image' class="form-control form-control-sm" aria-describedby="inputGroup-sizing-sm"/>
                      <button id="buttonSave" type="submit" class="btn btn-outline-success btn-sm">Save</button>
                   </form>`

    $(this).parent().parent().html(newForm);
  })

  $(`.smallMapSection`).on("submit", ".deleteForm", function(event) {
    event.preventDefault();
    let pinId = $(this).attr('id');
    let mapId = $(this).data('mapid');
    let markers = mapId;

    $.ajax({
      method: "DELETE",
      url: `/api/maps/${mapId}/pins/${pinId}`,
      data: {markers}
    }).then(() => {
      $.ajax({
        method: "POST",
        url: `/api/maps/${mapId}/contributions/`
      }).then(() => {
        window.location.replace(`/users/maps/${mapId}/edit`);
      })
    })
  })
})
