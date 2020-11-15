console.log('Server-side code running');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
let fs = require('fs');
const app = express();


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zx220485",
    database: "my_test_DB"
});

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser());

// start the express web server listening on 8080
app.listen(8080, () => {
    console.log('listening on localhost port: 8080');
});

// serve the homepage
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/public/template/index.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        con.connect(function (err) {
            let sql = 'SELECT * FROM history  ORDER BY times  desc LIMIT 5';
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.write(data);
                res.write('<div id="history">');
                res.write('<h3>Search History</h3>');
                for (let i = 0; i < result.length; i++) {
                    res.write('<button onclick="get_infoDay(' + result[i].city + ')"> ' + result[i].city + '</button>');
                }
                res.write('</div>');
                // res.write("function get_infoDay(search_key){ url = 'http://api.openweathermap.org/data/2.5/weather' //?q='+search_key+'&appid=587132a7c3f1e30752d02cd829cc8f73'; onOverlay(); $.ajax({	url: url,method: 'GET',data: {q: search_key,appid: '587132a7c3f1e30752d02cd829cc8f73'},}).done(function(response) {print_dataDay(response);save_history(response);});};")
                res.end();
            });
        });
    });

});


app.post('/clicked', (req, res) => {
    sql = 'SELECT * FROM history WHERE city="' + req.body.city + '" AND country="' + req.body.country + '"';
    con.connect(function (err) {
        //if (err) throw err;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            let sql;
            if (result.length) {
                sql = 'UPDATE history SET times = (parseInt(result[0].times) + 1) WHERE city= req.body.city' +
                    'AND country' + '=' + req.body.country;

                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                });
            } else {
                sql = 'INSERT INTO history (city, country, times) VALUES (req.body.city, req.body.country + 1)';
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                });
            }
        });
    });


});
