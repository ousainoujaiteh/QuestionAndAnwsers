'use strict';
var dbConn = require('./../../config/db.config');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create User
var User = function(user){
    this.username = user.username;
    this.password = bcrypt.hashSync(user.password, 8);
    this.first_name = user.first_name;
    this.last_name = user.last_name;
};


User.create = function(newUser,result){
    dbConn.query("INSERT INTO users set ?",newUser,function(err,res){
        if(err){
            console.log("Error In Creating User", err);
            result(err,null);
        }else{
            console.log("User ID: ",res.insertId);
            result(null,result.insertId);
        }
    });
}


User.login = async (req,res) => {
    try{
        dbConn.query("Select * from users where username = ? ", req.body.username, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }catch(error){
        return res.status(500).send({ message: error.message });
    }
}

module.exports = User;