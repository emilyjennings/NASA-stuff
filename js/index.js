$(document).ready(function(){

  function random(num) {
    return Math.floor(Math.random() * num);
  }

  $('#searchbutton').click(function(){

    const params = $('input').val()
    var url = "https://images-api.nasa.gov/search?q="

    $.ajax({
      url: url + params,
      type: "GET",
      dataType : "json",
    }).done(function(json){

        let listlen = json.collection.items.length
        let randomNum = random(listlen)
        let img = '<img src="' + json.collection.items[randomNum].links[0].href + '">'
        let desc = json.collection.items[randomNum].data[0].description
        let title = json.collection.items[randomNum].data[0].title

        if (img.includes('jpg'))
          $(".image").html(img)
        else {
          for (var i =0; i < 20; i++){
            let nextimg = json.collection.items[i].links[0].href
            let img = '<img src="' + nextimg + '">'
            if (nextimg.includes('jpg')){
              $(".image").html(img)
            }
          }
        }

        $('.desc').text(desc)
        $('.title').text(title)
    });
  });

  $(".nav").hide();
  $("#hamburger").click(function(){
    $(".nav").slideToggle("slow", function(){
      $("#hamburger").hide();
      $(".nav").show();
      $("#cross").show();
    });
  });


  $("#cross").click(function(event){
    event.preventDefault();
    //click event that takes information from the event and prevents refresh
    if ($("#cross").is(":visible")){
      $(".nav").slideToggle("slow", function(){
        $("#cross").hide();
        $("#hamburger").show();
      });
    }
  });
});
