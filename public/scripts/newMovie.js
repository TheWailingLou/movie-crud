$(document).ready(function(){
  $(".submitMovie").click(function(event){
    var $inputField = $(".movieInput input")
    var flag = false
    var infoObject = {
      title:"",
      year:0,
      director: "",
      "User Rating":0,
      posterURL:""
    }
    for (var i=0; i<$inputField.length; i++){
      if (!$inputField[i].value) {
        flag = true
      } else {
        switch($inputField[i].className.split(' ')[0]) {
          case "title":
            infoObject["title"] = $inputField[i].value
            break;
          case "year":
            infoObject["year"] = $inputField[i].value
            break;
          case "director":
            infoObject["director"] = $inputField[i].value
            break;
          case "rating":
            infoObject["User Rating"] = $inputField[i].value
            break;
          case "posterURL":
            infoObject["posterURL"] = $inputField[i].value
            break;
        }
        // console.log($inputField[i].className.split(' ')[0])
      }
    }

    if (flag) {
      alert("All fields must be filled out!")
    } else {
      $.ajax("/movies", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(infoObject)
      }).then(result => {
        console.log(result)
        window.location = "/movies.html"
      })
    }

  })
})
