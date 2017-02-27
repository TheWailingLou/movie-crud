$(document).ready(function(){
  console.log("on show page")

  var url = window.location.pathname.split(':')
  var unchangedMovieTitle = url[1]

  function popluateFields(result) {
    // console.log(result)
    var movieMatch = result.movies.filter(function(movie) {
      return movie.title === unchangedMovieTitle
    })[0]
    var objKeys = ["title", "year", "director", "User Rating", "posterURL"]
    $(".movieInfoField").find(".posterURL").children("img").attr("src", movieMatch["posterURL"])
    for (var i=0; i<4; i++) {
      $(".movieInfoField").find(".movieDescriptors:nth-child("+(i+1).toString()+")").append("<h2>"+movieMatch[objKeys[i]]+"</h2>")
    }
  }

  $.get('/movies')
    .then(popluateFields)
    .catch(err => console.log(err))
})
