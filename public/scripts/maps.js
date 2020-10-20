// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/maps"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// SERVER SIDE
// WHEN GET ON /users/maps -> res.render SEND THE HTML

// WHEN GET ON /api/maps -> res.send the data from the SQL request SEND THE DATA

// USER SIDE
// GET /users/maps then ASYNCH GET call on /example/maps to retrieve the data


$(document).ready(() => {

  $.get('/api/maps', data => {
  }).then(data => {
    for (let o of data) {
      addMapDiv(o.id);
      mapDrawerOnly(o.id, o.title, [o.latitude, o.longitude]);
      addEditButton(o.id);
    }
  })

  $.get("/api/pins").then( data => {
    console.log(data);
    // run function to create pins for each map
  });

});
