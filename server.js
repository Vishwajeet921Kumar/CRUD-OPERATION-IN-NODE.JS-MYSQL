const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 80;
const db = require("./database");

app.use(express.static('public'));// Serving the static files
app.use(bodyParser.urlencoded({ extended: false })); // Parsing the content of body
app.use(bodyParser.json());

//  Setting up the template engine
app.set('view engine', 'pug');

// Route for dynamic files
// EndPoints

app.get('/add', (req, res) => {
    res.status(200).render('med-form');

});


app.get('/meds', (req, res) => {
    let totalList = [];

    // Query to get data from database
    db.query("Select * from Medicine", function (err, rows) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        } else {


            // Loop check on each row
            for (let i = 0; i < rows.length; i++) {

                // Create an object to save current row's data
                let medList = {
                    'id': rows[i].id,
                    'medName': rows[i].medName,
                    'totalCount': rows[i].totalCount,
                    'brandName': rows[i].brandName,
                }
                // Add object into array
                totalList.push(medList);
            }

            // Render meds.pug page using array
            res.status(200).render('meds', { totalList });
        }
    })
});

app.post('/meds/add', (req, res) => {
    let medName = req.body.medName;
    let totalCount = req.body.totalCount;
    let brandName = req.body.brandName;
    let sql = `insert into Medicine (medName,totalCount,brandName) values (?,?,?)`;
    db.query(sql,[medName, totalCount, brandName], function (err, result) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        } else {
            console.log("Data is inserted successfully");
            res.status(200).redirect('/meds');
        }
    });
});

app.post('/meds/delete/:id', (req, res) => {

    db.query(`delete from Medicine where id = ` + req.params.id, function (err, result, rows) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
            console.log("Data is deleted successfully");
            // Redirect to meds.pug page
            res.status(200).redirect('/meds');
        }
    });
})

app.get('/meds/edit/:id', (req, res) => {
    db.query(`Select * from Medicine where id = ` + req.params.id, (err, rows, result) => {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        } else {
            // Check if the result is found or not
            if (rows.length == 1) {
                // Create the object to save the data.
                let medList = {
                    'id': rows[0].id,
                    'medName': rows[0].medName,
                    'totalCount': rows[0].totalCount,
                    'brandName': rows[0].brandName
                }
                res.status(200).render('med-edit', { medList });
            }
        }
    })
});

app.post('/meds/edit/:id', (req, res) => {
    db.query("Update Medicine set `medName` = '" + req.body.medName + "', `totalCount` = '" + req.body.totalCount + "', `brandName` = '" + req.body.brandName + "' where `id` = '" + req.params.id + "' ",
        (err, result) => {
            if (err) {
                res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
            } else {
                console.log("Data is edited successfully");
                res.redirect('/meds');
            }
        });
});



app.listen(port, () => {
    console.log(`The application has started on port:${port}`);
});