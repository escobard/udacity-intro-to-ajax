
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
    // Paste this URL into your browser, to view the raw JSON data.
    // This can be used to return your AJAX request and its parameters, prior to actually running the request
    $nyurl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&sort=newest&api-key=3a62af964c584fb58daa1f6694d85312'

    $.getJSON($nyurl, function( data ) {
    $nytHeaderElem.text('New York Times Articles About ' + $city);
    // sets the params for the articles function
    $articles = 
    // this is the data received from the ajax call
    data
    // this is the response data received via the ajax call, call from jquery language more here : https://api.jquery.com/jquery.get/
    .response
    // this defines the DOCUMENTS within the response. you can view this via the network tab, where the docs are listed per request
    .docs;
    // sets the containers for each li element for a for loop, that generates incremental lis
    for (var i = 0; i < $articles.length; i++) {
        var $article = $articles[i];
        //appends the articles each li, styling seems to be a little off
        //each of the $article. appends are ELEMENTS of the .docs array within the .response object. these can be viewed in the network tab for each obj
        $nytElem.append('<li class="article">'+'<a href="'+$article.web_url+'">'+$article.headline.main+'</a>'+'<p>'+ $article.snippet +'</p>'+'</li>');
    };
}).fail(function (){
        $nytHeaderElem.text('New York Times Articles were not found');;
    });;
    
    // start my own ajax request for wikipedia
    // udacity needs to post the URL they expect for this app to work on their course
    $wikiURL = 'http://en.wikipedsadfsia.org/w/api.php?action=opensearch&search=' + $city + '&format=json&callback=wikiCallback';

    // added timeout function when wiki resources fail to load due to no error handling on jsonp ajax calls
    $wikiFail = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);
    // could also set as:  $.ajax(wikiURL{}); instead of adding URL in the object, as the callback expects the URL in the .ajax function argument
    $.ajax({
    // this defines the requests' URL
     url: $wikiURL,
    // sets the datatype for this request
     dataType: "jsonp",
     // jsonp: "callback" sets the datatype function name usually to callback
     success: function (response) {
        var $wikiArticles = response[1];

        for (var i = 0; i < $wikiArticles.length; i++) {
            var $wikiArticle = $wikiArticles[i];
            // the following does not work for wikipedia, gotta remember that each of these requests is different, and accepts different parameters.
            // Also, familirizing myseif with the instructors html on this app would have allowed me to find the answer on my own
            // $wikiElem.append('<li class="wiki-article">'+'<a href="'+$wikiArticle.web_url+'">'+$wikiArticle.headline.main+'</a>'+'<p>'+$wikiArticle.snippet + '</p>'+'</li>');
            // from instructor notes
            var $wikiajaxurl = 'http://en.wikipedia.org/wiki/'+ $wikiArticle;
            $wikiElem.append('<li><a href='+$wikiajaxurl+'">'+$wikiArticle+'</a></li>');   
        };

        clearTimeout($wikiFail);
     }
    });

    return false;
};
// try to use this for the login programming needed on the first project
$('#form-container').submit(loadData);
