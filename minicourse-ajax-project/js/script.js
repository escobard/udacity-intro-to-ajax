
function loadData() {

    // keep in mind that using libraries to simplify the code you have to write is THE way to develop
    // sets the jquery objects 
    // Dollar signs are unecessary; for the sake of this course we are using them to identify objects as jquery objects
    // will be using the .ajax method and the .getJSON method
    // .ajax can be revised here : http://api.jquery.com/jquery.ajax/
    //  .JSOn can be revised here : http://api.jquery.com/jquery.getjson/
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

        // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var $street = $('#street').val();
    // this sets the VALUE of the #street id input as the $street variable. VERY useful for login form
    
    var $city = $('#city').val();

    // join the street and city variables together
    var $address = $street + ', ' + $city;

    // sets the greeting
    
    $greeting.text('So you want to live at ' + $address + '?');



    // load streetview

    $streetURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + $address + '';
    // YOUR CODE GOES HERE!
    $body.append('<img class="bgimg" src="'+ $streetURL +'">');

    /* NYT AJAX JSON request, more information / documentation here : https://classroom.udacity.com/courses/ud110/lessons/3310298553/concepts/31806586030923

    $.getJSON(URL, function (data){
        console.log(data);
    }); */

    /* original .getJSON request for lists from: http://api.jquery.com/jquery.getjson/

    $.getJSON( "ajax/test.json", function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });
     
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
    });    */

    // custom .get JSON request
    // from the nyt API generator
    $nyurl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&sort=newest&api-key=3a62af964c584fb58daa1f6694d85312'

    $.getJSON($nyurl, function( data ) {
    $nytHeaderElem.text('New York Times Articles About ' + $city);

    // sets the params for the articles function
    $articles = data.response.docs;
    // sets the containers for each li element for a for loop, that generates incremental lis
    for (var i = 0; i < $articles.length; i++) {
        var $article = $articles[i];
        //appends the articles each li, styling seems to be a little off
        $nytElem.append('<li class="article">'+'<a href="'+$article.web_url+'">'+$article.headline.main+'</a>'+'<p>'+ $article.snippet +'</p>'+'</li>');
    };
});
    return false;
};
// try to use this for the login programming needed on the first project
$('#form-container').submit(loadData);
