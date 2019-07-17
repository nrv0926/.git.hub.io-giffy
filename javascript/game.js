var gifList = ["Lionel Messi", "Lebron James", "ronaldo"];


// These arrays will simplify from switching the gifs from still to animated,
var gifAnim = [];

var gifStill = [];





$(document).ready(function() {


    // This adds buttons for every Gif search made 

    function makeButtons(array) {



        $.each(array, function(x, thisGif) {



            var gifButton = $("<button>");

            gifButton.attr({

                id: thisGif,

                class: "searchGif",

                value: thisGif,



            });



            gifButton.append(thisGif);



            $("#buttonWell").append(gifButton);



        });

    };



    makeButtons(gifList);






    // Event That Occurs When A new gif search is entered

    $("#gifForm").submit(function(event) {

        event.preventDefault();

        var gifSearched = [];

        //Learned yesterday And applied today!!!
        gifSearched.push($("#gifSearch").val().trim());



        // making the array into a button

        makeButtons(gifSearched);

        // This clears the input blank so it's not annoying

        $("#gifSearch").val("");

    }); // end of $("#gifForm").submit(function (event)

    // --------------------------------------------------------------------------------------------------------------------------------------


    // --------------------------------------------------------------------------------------------------------------------------------------------

    // initializes the ajax request when a button is clicked

    $("#buttonWell").on("click", ".searchGif", function() {



        // currentGif is the current button that will be search gifs for

        var currentGif = this.id;
        console.log(this);
        // will retrieve images only of this rating and of this amount
        var rating = "pg";

        var limit = 10;



        // this is the URL search to retrieve the Gifs with

        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + currentGif + "&rating=" + rating + "&limit=" + limit + "&api_key=Mz35xihj3olb9R14GZJTFLtKfkZPotDF";



        // This retrieves The data received from the api

        $.ajax({

            url: searchURL,

            method: "GET"

        }).done(function(gifData) {



            // this clears out the div for the images

            $("#gifWell").text("");



            // this variable simplifies using the data from the api

            gifBankArray = gifData.data;


            $.each(gifBankArray, function(i) {

                rating = gifData.data[i].rating;

                var thisGif = gifData.data[i].images.original_still.url;



                // populating the two arrays created before with still and animated data
                gifStill.push(thisGif);

                gifAnim.push(gifData.data[i].images.original.url);




                // Creating a div to hold gifs and appropriate rating
                var gifPlaceHolder = $("<div>");

                $(gifPlaceHolder).attr("class", "gifContainer");



                //Rating place holder  

                var ratingPlaceHolder = $("<figcaption>");

                $(ratingPlaceHolder).append("Rating: " + rating);



                // still image data

                var stillImage = $("<img>");

                $(stillImage).attr({

                    id: "image" + i,

                    src: thisGif

                });



                // placing rating and image in their container
                $(gifPlaceHolder).append(ratingPlaceHolder);

                $(gifPlaceHolder).append(stillImage);



                // now dispaying the image container on screen
                $("#gifWell").append(gifPlaceHolder);

            })




            // on click event which allows to toggle between still/animated

            $("img").on("click", function() {


                // going to compare the clicked img to those in the array 
                //will need to first identify and select clciked img

                var srcOfClickedImage = $(this).attr("src");
                console.log(this);



                var switchToAnim = -1;

                var switchToStill = -1;


                // each function allows to iterate through the array 
                // in order to identify if it is the still or animated to make the change

                $.each(gifStill, function(i) {



                    if (srcOfClickedImage === gifStill[i]) {

                        switchToAnim = i;

                    };



                    if (srcOfClickedImage === gifAnim[i]) {

                        switchToStill = i;

                    };

                });



                // If the switchToAnim has an index number (not -1), that's the

                // index number of the image that needs to switch to animated

                if (switchToAnim != -1) {

                    $(this).attr("src", gifAnim[switchToAnim]);

                };



                // If the switchToStill has an index number (not -1), that's the

                // index number of the image that needs to switch to still

                if (switchToStill != -1) {

                    $(this).attr("src", gifStill[switchToStill]);

                };



            });



        });



    });



});