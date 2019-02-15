$(document).ready(function(){

  function random(num) {
    return Math.floor(Math.random() * num);
  }

  $('#searchbutton').click(function(){

    //getting the input from the user and sending it to the API
    const params = $('input').val()
    var url = "https://images-api.nasa.gov/search?q="

    $.ajax({
      url: url + params,
      type: "GET",
      dataType : "json",
    }).done(function(json){

        //getting all the items out of the API that I need
        let listlen = json.collection.items.length
        let randomNum = random(listlen)
        let img = '<img src="' + json.collection.items[randomNum].links[0].href + '">'
        let desc = json.collection.items[randomNum].data[0].description
        let title = json.collection.items[randomNum].data[0].title

        //the logic in the game in case the first result isn't an image
        if (img.includes('jpg'))
          $(".image").html(img)
        else {
          //if the first random result isn't an image, it goes through the results to find one that is
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

  //the hamburger nav menu
  $(".nav").hide();
  $("#hamburger").click(function(){
    $(".nav").slideToggle("slow", function(){
      $("#hamburger").hide();
      $(".nav").show();
      $("#cross").show();
    });
  });

  //the animation for the hmaburger menu going back to a box
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

  $('.playbutton').click(function(event){
    //displaying the game results on page when the play button is clicked
    event.preventDefault();
    $('.namegame')
  });

});
