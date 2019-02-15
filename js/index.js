$(document).ready(function(){

  function random(num) {
    return Math.floor(Math.random() * num);
  }

  $('#searchbutton').click(function(){

    //getting the input from the user and sending it to the API
    const params = $('input').val()
    const url = "https://images-api.nasa.gov/search?q="

    $.ajax({
      url: url + params,
      type: "GET",
      dataType : "json",
    }).done(function(json){

        //getting all the items out of the API that I need
        let listlen = json.collection.items.length
        let randomNum = random(listlen)
        let randomItem = json.collection.items[randomNum]
        let img = '<img src="' + randomItem.links[0].href + '">'
        let desc = randomItem.data[0].description
        let title = randomItem.data[0].title

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

  const spaceSearch = ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
  let randomSpaceSearch = spaceSearch[random(spaceSearch.length)]

  $('#playbutton').click(function(event){
    //displaying the game results on page when the play button is clicked
    event.preventDefault();
    $('#playbutton').hide()

    //taking an array of some space objects for randomization in the guessing game, as the search item in the API call
    //this random thing is used only for the searches
    const url = "https://images-api.nasa.gov/search?q="

    //sending the call to the NASA API
    $.ajax({
      url: url + randomSpaceSearch,
      type: "GET",
      dataType : "json",
    }).done(function(json){

      //similar with the search function above, we need to parse out certain things from the results first
      let listlen = json.collection.items.length
      let randomNum = random(listlen)
      let randomItem = json.collection.items[randomNum]
      let img = '<img src="' + randomItem.links[0].href + '">'
      let desc = randomItem.data[0].description //may not want to use this
      let title = randomItem.data[0].title

      //make sure it's not a video
      if (img.includes('jpg')) {
        //display the image and the choices, first setting a new random variable for the buttons
        let button2 = spaceSearch[random(spaceSearch.length)]
        let button3 = spaceSearch[random(spaceSearch.length)]

        $('#namegameimage').prepend(img)
        $('#namegamechoices').html(
          '<button type="button" name="button">'+ randomSpaceSearch +'</button><button type="button" name="button">' + button3 + '</button><button type="button" name="button">' + button2 + '</button>'

        )
      } else {
        //if the first random result isn't an image, it goes through the results to find one that is
        for (var i =0; i < 20; i++){
          let nextimg = json.collection.items[i].links[0].href
          let img = '<img src="' + nextimg + '">'
          if (nextimg.includes('jpg')){
            $(".image").html(img)
          }
        }
      }
    });
  });

});
