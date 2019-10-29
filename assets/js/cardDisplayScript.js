//This script will display the cards within the index.html after a search request from the user.
//This script will retrieve images from the backend.

//----------VARIABLES----------//

var $row = $("#posters-row");

var dummyObject = {
    title : "dummyTitle",
    source : "https://via.placeholder.com/300x300"
}

var dummyObjects = [
    {
        title : "dummy1",
        source : "https://via.placeholder.com/300x300"
    },
    {
        title : "dummy2",
        source : "https://via.placeholder.com/300x300"
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

    if(!movieObject.source || !movieObject.title)
    {
        console.error("Missing source or title.  Parameter could be wrong");
        return null;
    }

    $col = $("<div>").addClass("col s4");

    $img = $("<img>").attr("src", movieObject.source).addClass("responsive-img").attr("id", movieObject.title);

    $col.append($img);

    $row.append($col);
}

//----------MAIN----------//

AppendImage(dummyObjects);

$row.on("click", function(event){
    console.log("ID of target : " + $(event.target).attr("id"));
})
