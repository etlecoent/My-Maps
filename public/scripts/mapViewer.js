let currentURL = $(location).attr('href');
let apiURL = currentURL.replace('http://localhost:8080/users', '/api');

$(document).ready(() => {

  $.get(`${apiURL}`, data => {
  }).then(data => {
    for (let o of data) {
      addMapDiv(o.id);
      mapDrawerOnly(o.id, o.title, [o.latitude, o.longitude]);
    }
  });
});
