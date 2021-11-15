const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost",
    user:"vishu",
    password:"Qaz@1234",
    database:"MedicalInventory"
});
con.connect((error)=>{
    if(error) throw error;
    //console.log("Database is connected successfully!");
});
module.exports = con;