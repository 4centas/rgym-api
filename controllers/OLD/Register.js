var { MongoDB } = require("../mongodb");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');

module.exports = function(app){
    app.route('/register')
    .post(jsonParser, function (req, res) {
        // Start a session
        sess = req.session;

        let username = req.body.username;
        let password = req.body.password;
        let confirmpassword = req.body.confirmpassword;
        let email = req.body.email;

        getThemes();

        async function getThemes() {
            // Get User
            let result = await MongoDB.getUser(username);
            if (result.length > 0) {
                sess.message = "Username already in use";
                res.send({permission: sess.admin, message: sess.message});
            } else {
                if (username.length > 20 ) {
                    sess.message = "Usernames can only have up to 20 characters";
                    res.send({permission: sess.admin, message: sess.message});
                } else {
                    if (password != confirmpassword) {
                        sess.message = "Password do not match";
                        res.send({permission: sess.admin, message: sess.message});
                    } else {
                        // Generate Hashed + Salted Password
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(password, salt, function(err, hashed_password) {
                                // Add new User do Database
                                MongoDB.insertUser(username, hashed_password, email).then(function (result) {
                                    if (!result){
                                        sess.message = "An error occured";
                                        res.send({permission: sess.admin, message: sess.message});
                                    } else {
                                        sess.admin = 0;
                                        sess.message = 'Registered with Success';
                                        res.send({permission: sess.admin, message: sess.message});
                                    }
                                });
                            });
                        });
                    }
                }
            }
        }
    })
}
