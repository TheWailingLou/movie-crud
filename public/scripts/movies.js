var currentObj = {
  title:"",
  year:0,
  director: "",
  "User Rating":0,
  posterURL:""
}
var movieToGet_Title;

$(document).ready(function(){
  var posterURLs = []
  function showMovies(data) {
    var movies = data.movies
    movies.forEach(function(movie){
      var htmlInject = "<div class='inputMovie'>"
      htmlInject += "<div class='btn-group' role='' aria-label='...'>"
      htmlInject += "<button type='button' class='btn btn-default edit'>Edit</button>"
      htmlInject += "<button type='button' class='btn btn-default show'>Show</button>"
      htmlInject += "<button type='button' class='btn btn-default delete'>Delete</button></div>"
      htmlInject += "<ul class='list-group'>"
      var movieData = Object.keys(movie)
      posterURLs.push([movie.title, movie.posterURL])
      movieData.forEach(function(movieInfo){
        if (movieInfo !== 'posterURL') {
          var descriptorString = movieInfo[0].toUpperCase()+movieInfo.slice(1, movieInfo.length)
          var infoItem = "<span class='"+movieInfo+" "+movie[movieInfo]+" movieInfo'>"+descriptorString+":</span> "
          var infoItemValue = movie[movieInfo]
          var liSnippet = "<li class='list-group-item'>"+infoItem+infoItemValue+"</li>"
          htmlInject += liSnippet
        }
      })

      htmlInject += "</ul></div>"
      $(".movieBoxes").append(htmlInject)
    })
    console.log(posterURLs)
    $(".edit").click(function(){
      // console.log($(this).parents('.inputMovie').find(".movieInfo")[0].className.split(' ')[1]);
      movieToGet_Title = $(this).parents('.inputMovie').find(".movieInfo")[0].className.split(' ')[1]
      location.href = "/movies/edit/:"+movieToGet_Title
    })
    $(".delete").click(function(){
      // console.log($(this).parents('.inputMovie').find(".movieInfo")[0].className.split(' ')[1]);
      movieToDelete_Title = $(this).parents('.inputMovie').find(".movieInfo")[0].className.split(' ')[1]
      $.ajax("/movies/:"+movieToDelete_Title, {
        method: "DELETE",
        contentType: "application/json"
      }).then(result => {
        $(this).parent().parent().remove()
      })
    })
    $(".show").click(function(){
      console.log($(this).parents('.inputMovie').find(".movieInfo")[0].className.split(' ')[1]);
      movieToGet_Title = $(this).parents('.inputMovie').find(".movieInfo")[0].className.split(' ')[1]
      location.href = "/movies/show/:"+movieToGet_Title
    })
  }

  $.get('/movies')
    .then(showMovies)
  


})
