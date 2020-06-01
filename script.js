$(document).ready(function () {
    // use variables to hold results to push to zomato api call
    var cityName = "";
    var stateCode = "";
    var lat = "";
    var lon = "";
    var id = "";

    var apiK = "e1014510ebbf942b1f1d07d44fa4f59b";

    $(".save").on("click", function (event) {
        event.preventDefault();
        cityName = $(".search").val().trim();

        // if (!cityName) {
        //     alert("Please enter a City Name!")
        // }

        // AJAX call to the run OpenWeatherMap API to use city name as search criteria
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${stateCode}&appid=${apiK}`;


        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data)
            console.log(data.coord)


            searchByCity();
            function searchByCity() {
                lat = data.coord.lat
                console.log(lat)
                lon = data.coord.lon
                console.log(lon)
               
                var api = "527c121c5d125ed8860ba0873283b0c9";
                var entityType = "city";
                
                // set lat and lon for api call
                var coordS = `lat=${lat}&lon=${lon}`

                // api call to get resturants Ids
                var queryURL1 = `https://developers.zomato.com/api/v2.1/establishments?${coordS}`

                $.ajax({
                    url: queryURL1,
                    method: "GET",
                    headers: {
                        "user-key": api,
                        "accept": "application/json"
                    }
                }).then(function (rests) {
                    console.log(rests)
                    id = rests.establishments[0].establishment.id
                    console.log(id)
                })

                // api call to get resturants details
                
                
            }
        })

    });
});
