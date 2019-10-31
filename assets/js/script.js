


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
  //We are running 'dummy_getMovies' to avoid wasting our API keys.
  movieObjects = dummy_getMovies(uActorName);
})

//----------------------------------------//
//-------END OF SEARCH FUNCTIONALITY------//
//----------------------------------------//



//----------------------------------------//
//-------BACK END FUNCTIONALITY-----------//
//----------------------------------------//


//Pass in a string,actor name, to return an array of movie objects.
//*****Running this function will use our API keys.  It is currently set up NOT to run */
function getMovies(pActorName) {

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
  *  1)   Take in the actor name as a search parameter and send an AJAX call to 'TMBD' to return the actor's ID
  *  2)   IF 'TMDB' returns an ID, then make another AJAX call to 'TMBD' to retrieve a list of movies by the actor.  Add each movie to a list 'movieTitles'
  *  3)   For each movie title in 'movieTitles', send an AJAX call to 'UNOGS'
  *  3a)  >>> IF the movie exists on Netflix, create a new object containing information about the movie.
  *  3b)  >>> Add this object to an array called 'movieObjects'
  *  3c)  >>> Repeat for each title.
  *  4)   IF the array 'movieObjects' is NOT null, then return it.
  * */

  //The search parameter for our query
  var iSearch = pActorName;

  //The URL to be querried.
  var queryURL = "https://api.themoviedb.org/3/search/person?api_key=41cc40eab0f24f658207f0966da0ca79&language=en-US&page=1&include_adult=false" + "&query=" + iSearch;

  //Log the search parameter
  console.log(iSearch);

  //Beginning of AJAX calls.  Several AJAX calls are nested within this one.
  //First AJAX call : Using the parameter of the actor's name, search 'TMDB' for a list of movies with that actor.
  $.ajax({
    url: queryURL,    //The URL to be querried
    method: "GET"     //Runs a method to get information from the 'TMDB' API.
  })
    //Once we get a response from our API, then...
    .then(function (results) {
      console.log(results);     //Log the results from the API.
      console.log("Actor ID : " + results.results[0].id);     //Log the ID number of the actor.
      var actorID = results.results[0].id;    //Set a new variable 'actorID' to the ID number of the first result found on our returned result.

      //Begin a second AJAX call.  This will take the 'actorID' established before and get movies by that actor name using 
      $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie?api_key=41cc40eab0f24f658207f0966da0ca79&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=" + actorID,
        method: "GET"
      })
        //Once we get a response from our API, then...
        .then(function (results) {
          //Log the results of our call: the movies returned from our call.
          console.log(results);

          //Set a new variable equal to the results of our results: this is now a list of objects from our API.
          var iRes = results.results;

          //Set a new empty array: this will store the titles of our movies.
          var movieTitles = [];

          //For each object inside 'iRes', get the title and add it to our array 'movieTitles'
          iRes.forEach(title => {

            //Push the title of the movie to the array.
            movieTitles.push(title.original_title);

          });

          //Log our movie titles.
          console.log(movieTitles);

          //~~~~~~~~~~Limit titles for testing~~~~~~~~~~//
          //This limits our movie titles to 1 to avoid bankrupting Martin.
          movieTitles = movieTitles.splice(0, 1);
          console.log(movieTitles);
          //~~~~~~~~~~Limit titles for testing~~~~~~~~~~//

          //For each title within 'movieTitles', check 'UNOGS' to see if the movie exists on Netflix.  If it does, then create a 'movieObject' and add that object to our global array 'movieObjects'
          movieTitles.forEach(pTitle => {

            //Similar to AJAX but different.  I can not explain everything going on here.
            //We modify the URL based on the current title, pTitle.
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=" + pTitle + "&cl=78&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and",
              "method": "GET",
              "headers": {
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                "x-rapidapi-key": "53a78fd11fmsh48108adf3c93d14p1260d1jsna5ea2a9262c1"
              }
            }
            $.ajax(settings).done(function (response) {
              console.log(response);

              //Set our Netflix title to the response title from UNOGS.
              var UNOGS_title = response.ITEMS[0].title;

              //If the Netflix result title is equal to our parameter title, then the movie exists on Netflix, so...
              if (UNOGS_title === pTitle) {
                console.log("Titles are equal");

                //Create an object with elements from our result.
                var movieObject = {
                  title: response.ITEMS[0].title,
                  source: response.ITEMS[0].largeimage,
                  plot: response.ITEMS[0].synopsis,
                  rating: response.ITEMS[0].rating,
                  release: response.ITEMS[0].released,
                  runTime: response.ITEMS[0].runtime
                }

                //Push the object to our list of movieObjects.
                movieObjects.push(movieObject);
                console.log(movieObjects);

                //Append the array, movieObjects, to our index.html.
                AppendImage(movieObjects);

                console.log("Search completed for actor");
              }
              else {
                console.log("titles are NOT equal");
              }
            });

          });
        })
    })

  //return the array
  return movieObjects;
}

function dummy_getMovies(pActorName) {
  var dummyMovieObjects = [
    {
      title: "dummy 1",
      source: "https://via.placeholder.com/200x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    },
    {
      title: "dummy 2",
      source: "https://via.placeholder.com/200x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    },
    {
      title: "dummy 3",
      source: "https://via.placeholder.com/200x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    },
    {
      title: "dummy 4",
      source: "https://via.placeholder.com/200x300",
      actors: "actor1, actor2",
      plot: "Something happens and people do stuff about it",
      rating: "PG-13",
      release: "2010"
    }]


  //Push the object to our list of movieObjects.
  movieObjects.push(dummyMovieObjects);
  console.log(movieObjects);

  //Append the array, movieObjects, to our index.html.
  AppendImage(movieObjects);
  return dummyMovieObjects;
}


//----------------------------------------//
//-------END OF SEARCH FUNCTIONALITY------//
//----------------------------------------//



//---------------------------------------//
//----------------MODAL------------------//
//---------------------------------------//

//listens for a click on posters row
$("#posters-row").on("click", function (event) {
  console.log($(event.target).hasClass("responsive-img poster"));
  //checks if the event that was clicked has a class of responsive-img poster and is equal to poster
  if ($(event.target).hasClass("responsive-img poster")) {
    console.log("this image")
    // then load modal
    var movieID = $(event.target).attr("id");
    movieObjects.forEach(function (movObj) {
      var movObj_title = movObj.title;
      if (movieID === movObj_title) {
displayObjModal(movObj)
      }
    })

  }
})

function displayObjModal(movObject) {
  $("#display-title").text(movObject.title);
  $("#display-image").attr("src", movObject.source);
  $("#display-plot").text(movObject.synopsis);
  $("#display-rating").text(movObject.rating);
  $("#display-release").text(movObject.release);
  $("#display-runtime").text(movObject.runtime)

}
