// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
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
    console.log(data);
  }).then(data => {
    for (let o of data) {
      mapDrawer(o.id, o.title, [o.latitude, o.longitude]);
    }
  });
});
