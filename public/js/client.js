console.log('Client-side code running');

$(document).ready(function () {
    function setDate() {}
    function onOverlay() {
        //  document.getElementById("overlay").style.display = "block";re.!
    }

    function offOverlay() {
        //  document.getElementById("overlay").style.display = "none";
    }

    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    function print_element_day(day, id) {
        date = day.dt_txt;
        date = new Date(date);
        arr_dt = date.toString().split(" ");
        max_temp = day.main.temp_max;
        min_temp = day.main.temp_min;
        icon = day.weather[0].icon;
        $("#d" + id + " .day").text(arr_dt[0] + " " + arr_dt[1] + " " + arr_dt[2]);
        $("#d" + id + " .degree label").text(Math.round(max_temp - 273.15));
        $("#d" + id + " small label").text(Math.round(min_temp - 273.15));
        $("#d" + id + " .forecast-icon").html('<img src="images/weather_icons/' + icon +
            '@2x.png" alt="" width=48>');
    }

    function print_dataWeek(data) {
        for (let i = 0; i < 39; i += 8) {
            print_element_day(data.list[i], i / 8);
        }
    }

    function print_dataDay(data) {
        $('#city_name').text(data.name + ' - ' + data.sys.country);

        let dNow = new Date();

        curr_date = parseInt(data.dt);

        curr_date = timeConverter(curr_date);
        arr_dt = curr_date.toString().split(" ");
        $('#date').text(arr_dt[0] + " " + arr_dt[1]);

        $('#description').text(data.weather[0].description);

        $('#icon_weather').html('<img src="images/weather_icons/' + data.weather[0].icon +
            '@2x.png" alt="" width=100>');

        $('#main_temp').text(Math.round(data.main.temp - 273.15));
        $('#max_temp').text(Math.round(data.main.temp_max - 273.15));
        $('#min_temp').text(Math.round(data.main.temp_min - 273.15));

        $('#humidity').text(data.main.humidity);

        $('#wind_speed').text(data.wind.speed);
        $('#pressure').text(data.main.pressure);


        let sunrise = timeConverter(parseInt(data.sys.sunrise));
        let sunset = timeConverter(parseInt(data.sys.sunset));

        arr_dt = sunrise.toString().split(" ");
        $('#sunrise').text(arr_dt[3]);
        arr_dt = sunset.toString().split(" ");
        $('#sunset').text(arr_dt[3]);

    }


    function save_history(data) {
        let todo = {
            city: data.name,
            country: data.sys.country
        };
        fetch('/clicked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(function (response) {
                if (response.ok) {
                    console.log('Click was recorded');
                    return;
                }
                throw new Error('Request failed.');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function get_infoWeek(search_key) {
        url = 'http://api.openweathermap.org/data/2.5/forecast';
        onOverlay();
        $.ajax({
            url: url,
            method: "GET",
            data: {
                q: search_key,
                appid: '587132a7c3f1e30752d02cd829cc8f73'
            },
        }).done(function (response) {
            console.log(response);
            print_dataWeek(response)

        }).fail(function (jqXHR, textStatus) {
            $(".screen-reader-response").html(jqXHR, textStatus);

        });
    };

    function get_infoDay(search_key) {
        url = 'http://api.openweathermap.org/data/2.5/weather';
        onOverlay();
        $.ajax({
            url: url,
            method: "GET",
            data: {
                q: search_key,
                appid: '587132a7c3f1e30752d02cd829cc8f73'
            },
        }).done(function (response) {
            console.log(response);
            print_dataDay(response);

            save_history(response);


        }).fail(function (jqXHR, textStatus) {
            $(".screen-reader-response").html(jqXHR, textStatus);

        });
    };

    $('#search_btn').click(function () {
        // $('#search_btn').prop( "disabled", true );

        let podeIr = true;

        if ($(search).val()) {
            let search = $("#search").val();
        } else {
            $("#search_form  .screen-reader-response").html('Preencha seu Nome');
            podeIr = false;
            return;
        }

        if (podeIr) {
            get_infoDay(search);
            get_infoWeek(search);
            $("#search_form .screen-reader-response").html("<b style='color:#6c9f12;'>Mensagem enviada!</b>");
        }
        // $('#search_btn').prop( "disabled", false );
        $('#search_form')[0].reset();
    });

});
