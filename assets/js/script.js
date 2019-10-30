


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

//----------------------------------------//
//----------SEARCH FUNCTIONALITY----------//
//----------------------------------------//

var movieObjects = [];

//Add an event listener to the element ID'd as '#submit-btn'
//When the event is fired, get movies based on the users input then append those movies to our posters list.
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  //Get the value (input) of the element ID'd as '#search-bar'
  var uActorName = $("#search-bar").val();

  //Set our variable, movieObjects, equal to the return function 'getMovies' and pass in our user's actor input.
  movieObjects = dummy_getMovies(uActorName);

  //Append the array, movieObjects, to our index.html.
  AppendImage(movieObjects);

  console.log("Search completed for actor : " + uActorName);
  console.log(movieObjects);
})

/***This function does not yet have back end functionality***/
//Pass in a string,actor name, to return an array of movie objects.
function dummy_getMovies(pActorName) {

  //Reset the array, 'movieObjects'
  movieObjects = [];

  //IF the parameter type is NOT a string, then...
  if (typeof pActorName !== "string") {
    //Log an error and return null: we do not want to run further code in this function.
    console.error("Passing a parameter with the wrong type.");
    return null;
  }

  //'i' specifies this as an iteration, 'p' specifies parameter.
  var iActor = pActorName.trim();   //Trim off any spaces on the outside of the string.

  /* Back end functionality...
  *  1)   Take in the actor name as a search parameter and send an AJAX call to 'WhatIsMyMovie?'
  *  2)   IF 'WhatIsMyMovie?' returns some amount of movies, then stores the movie titles in an array, 'movieTitles'.
  *  3)   For each movie title in 'movieTitles', send an AJAX call to 'UNOGS'
  *  3a)  >>> IF the movie exists on Netflix, create a new object containing information about the movie.
  *  3b)  >>> Add this object to an array called 'movieObjects'
  *  3c)  >>> Repeat for each title.
  *  4)   IF the array 'movieObjects' is NOT null, then return it.
  * */

  //A placeholder array until our Back End is complete
  var dummyMovieObjects = [
    {
      title: "dummy 1",
      source: "https://via.placeholder.com/300x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    },
    {
      title: "dummy 2",
      source: "https://via.placeholder.com/300x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    },
    {
      title: "dummy 3",
      source: "https://via.placeholder.com/300x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    }
  ]

  //return the array
  return dummyMovieObjects;
}

//----------------------------------------//
//-------END OF SEARCH FUNCTIONALITY------//
//----------------------------------------//



//---------------------------------------//
//----------------MODAL------------------//
//--------------------------------------//

$("#posters-row").on("click", function (event) {
  if ($(event.target).hasClass("responsive-img poster") === "poster") { console.log("this image") }
  console.log($(event.target).hasClass("responsive-img poster"));

})