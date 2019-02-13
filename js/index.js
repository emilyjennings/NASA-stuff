$(document).ready(function(){

  $('#searchbutton').click(function(){

    const params = $('input').val()
    var url = "https://images-api.nasa.gov/search?q="

    $.ajax({
      url: url + params,
      type: "GET",
      dataType : "json",
    }).done(function(json){
        $(".results").prepend('<img src="' + json.collection.items[0].links[0].href + '">')
        // if("copyright" in result) {
        //   $("#copyright").text("Image Credits: " + result.copyright);
        // }
        // else {
        //   $("#copyright").text("Image Credits: " + "Public Domain");
        // }
        // $('.results').text(result.first)
    });



  });
});
