$(document).ready(function() {
  var url = window.location.pathname.split(':')
  var unchangedMovieTitle = url[1]
  var objToPost = {
    title:"",
    year:0,
    director: "",
    "User Rating":0,
    posterURL:""
  }
  function popluateFields(result) {
    // console.log(result)
    var movieMatch = result.movies.filter(function(movie) {
      return movie.title === unchangedMovieTitle
    })[0]
    // console.log(movieMatch)
    var objKeys = ["title", "year", "director", "User Rating", "posterURL"]
    $inputs = $(".movieInput").find("input")

    for (var i=0; i<$inputs.length; i++) {

      $inputs[i].value = movieMatch[objKeys[i]]
    }
  }

  $(".submitChanges").click(function(){
    var $inputs = $(".movieInput").find("input")
    objKeys = ["title", "year", "director", "User Rating", "posterURL"]
    for (var i=0; i<$inputs.length; i++) {
      if (objKeys[i] !== "User Rating") {
        objToPost[objKeys[i]] = $inputs[i].value
      } else {
        objToPost["User Rating"] = parseInt($inputs[i].value)
      }

    }
    // console.log(objToPost)
    $.ajax("/movies/:"+unchangedMovieTitle, {
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(objToPost)
    }).then(result => {
      console.log(result)
      window.location = "/movies.html"
    })
  })

  $.get('/movies')
    .then(popluateFields)
    .catch(err => console.log(err))
})
