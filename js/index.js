$(document).ready(function(){

  $('#searchbutton').click(function(){

    const params = $('input').val()
    var url = "https://images-api.nasa.gov/search?q="

    $.ajax({
      url: url + params,
      type: "GET",
      dataType : "json",
    }).done(function(json){

        let img = '<img src="' + json.collection.items[0].links[0].href + '">'
        let desc = json.collection.items[0].data[0].description

        if (img.includes('jpg'))
          $(".image").html(img)
        else {
          for (var i =0; i < 20; i++){
            let nextimg = json.collection.items[i].links[0].href
            if (nextimg.includes('jpg')){
              $(".image").html('<img src="' + nextimg + '">')
            }
          }
        }

        $('.desc').text(desc)
    });



  });
});
