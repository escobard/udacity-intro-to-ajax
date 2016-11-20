
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

    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
