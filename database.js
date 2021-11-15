const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost",
    user:"username",
    password:"",
    database:""
});
con.connect((error)=>{
    if(error) throw error;
    //console.log("Database is connected successfully!");
});
module.exports = con;
