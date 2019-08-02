var { MongoDB } = require("../mongodb");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');

module.exports = function(app){
    app.route('/editUser')
    .post(jsonParser, function (req, res) {
        sess = req.session;

        let username = req.body.username;
        let new_username = req.body.new_username;
        let password = req.body.password;
        let email = req.body.email;
        console.log('Got: ', username, new_username, password, email);


        // Generate Hashed + Salted Password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hashed_password) {
                // Add Info to DB
                MongoDB.editUser(username, new_username, hashed_password, email).then(function (result) {
                    if (!result){
                        sess.message = "An error occured";
                        res.send({permission: sess.admin, message: sess.message});
                    } else {
                        sess.message = 'TUser Edited';
                        res.send({permission: sess.admin, message: sess.message});
                    }
                });
            });
        });


    })
}