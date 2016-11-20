
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

    var $street = $('#street')
    // this sets the VALUE of the #street id input as the $street variable. VERY useful for login form
    .val();
    var $city = $('#city').val;

    // join the street and city variables together
    var $address = $street + '+' + $city;

    // sets the greeting
    
    $greeting.text('So you want to live at ' + $address + '?');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    $streetURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + $address + '?';
    // YOUR CODE GOES HERE!
    $body.append('<img class="bgimg" src="'+ $streetURL +'">');

    return false;
};

// try to use this for the login programming needed on the first project
$('#form-container').submit(loadData);
