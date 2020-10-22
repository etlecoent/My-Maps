let currentURL = $(location).attr('href');
let apiURL = currentURL.replace('http://localhost:8080/users', '/api');


$(document).ready(() => {

  let mapsObj;
  let i = 0;
  const markers = [];
  $.get(`${apiURL}`).then(({maps:mapData, user_id}) => {
    console.log(mapData)
    const {id, title, latitude, longitude} = mapData[0]
      addMapContainer(id);
      addMapDiv(id);
    mapsObj = mapDrawer(id, title, [latitude, longitude]);

    // for (let m of mapData) {
    //   addMapContainer(m.id);
    //   addMapDiv(m.id);

    //   $.get(`/api/pins/maps/${m.id}`).then(pins => {

    //     for (let p of pins) {
    //       pinsDrawer(m.id, p.title, p.description, p.latitude, p.longitude, p.image_url)
    //     }
    //   });
    // }
    mapsObj.on("click", function(evt) {
      console.log(evt.latlng)
      var marker = L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(mapsObj);
      marker.bindPopup(`<form id="${i}">
      <p>Name: <input type='text' name='marker_name'/></p>
       <p><button>Add</button></p>
   </form>`).openPopup();
   $(`#${i}`).on("submit", function(evt) {
     evt.preventDefault()
     marker.name = evt.target.marker_name.value;
     markers.push(marker)
    //  mapsObj.closePopup()
     console.log(markers)
   })
   i++
    } )
  });
});



// grab markes and send to back end to save
// find id of map
// markers table add name of marker, lat, long
// reset and save button
