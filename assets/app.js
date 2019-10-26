$(document).ready(function () {
    var searchArray = [];
    let api_key = '8PyAm2GLlGpTexHaUht9Zrrrcgqnuuuv';
    // let url = 'https://api.giphy.com/v1/gifs/search?api_key=8PyAm2GLlGpTexHaUht9Zrrrcgqnuuuv&q=dog&limit=10&offset=0&rating=G&lang=en';


    $('#search_Submit').on('click', function (event) {
        const searchText = $('#gif_Search').val();

        event.preventDefault();
        //$('.gif_Container').empty();
        var b = $("<button>").text(searchText);
        b.addClass("btn");
        b.attr("data-name", searchText);
        searchArray.push(searchText)
        $(".result").append(b)
    });




    $(document).on('click', "img", function () {//this is for dynamic html listene
        console.log($(this))
        let image = $(this)
        let moving = image.attr("data-moving")
        let still = image.attr("data-still")
        let state = image.attr("data-state")
        if (state == "still") {
            image.attr("src", moving)
            image.attr("data-state", "moving")
        } else if (state = "moving") {
            image.attr("src", still)
            image.attr("data-state", "still")

        }
    })

    $(document).on('click', ".btn", function (event) {//this is for dynamic html listene
        //$('.btn').on('click', function (j) {//this is for static html listene
        event.preventDefault();
        $('.gif_Container').empty();
        const searchText = $(this).attr("data-name")
        const queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchText}&limit=10&offset=0&rating=G&lang=en`;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(response => {
            const data = response.data;
            data.forEach(element => {
                console.log(element)
                var gif = element.images.fixed_width_still.url;
                var showGif = $("<img>").attr("src", gif);
                showGif.attr("data-still", gif)
                showGif.attr("data-moving", element.images.fixed_width.url)
                showGif.attr("data-state", "still")
                $('.gif_Container').prepend(showGif)
            });
        });
    });
});
