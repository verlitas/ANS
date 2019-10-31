//This script will display the cards within the index.html after a search request from the user.
//This script will retrieve images from the backend.

//----------VARIABLES----------//

var $row = $("#posters-row");

var dummyObject = {
    title : "dummyTitle",
    source : "https://via.placeholder.com/200x300"
}

var dummyObjects = [
    {
        title : "dummy1",
        source : "https://via.placeholder.com/200x300"
    },
    {
        title : "dummy2",
        source : "https://via.placeholder.com/200x300"
    }
]

//----------FUNCTION----------//

/*This function can take in an Array of objects or a single object.
* The object passing through must have a "title" and "source" component.
* Function will append an image to the row with ID:"posters-row"  */
function AppendImage(movieObject)
{
    //If the parameter is an array, then...
    if(Array.isArray(movieObject))
    {
        //For each object inside of the array, rerun this function passing in that object as the parameter.
        movieObject.forEach(movObj => {
            AppendImage(movObj);
        });
        return null;    //Return so we do not execute the rest of the code.
    }

    //IF the object does NOT have a source OR does NOT have a title, then...
    if(!movieObject.source || !movieObject.title)
    {
        //Send error and return null, so that no further code in this function is run.
        console.error("Missing source or title.  Parameter could be wrong");
        return null;
    }

    //Below: Create an oprhan 'div' component AND add the classes 'col' and 's4'
    $col = $("<div>").addClass("col s4");

    //Below: Create an orphan 'img' component AND add an 'src' attribute with the source from our object parameter
    //Also, add the class 'responsive-img' and an ID equal to the parameter 'title'.  This will be used for referencing the object in the future.
    $img = $("<img>").attr("src", movieObject.source).addClass("responsive-img").attr("id", movieObject.title);

    //Append the '$img' oprhan component to the oprhan component, '$col' we create earlier
    $col.append($img);
    
    //Append the '$col' oprhan component to the component identified as 'posters-row' in our HTML.
    $row.append($col);
}

//----------MAIN----------//


//---------MODAL--------//

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
