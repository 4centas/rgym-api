var { MongoDB } = require("../mongodb");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');

module.exports = function(app){
    app.route('/login')
    .post(jsonParser, function (req, res) {
        // Start session
        sess = req.session;
        sess.admin = -1;

        // Start query + hash comparison
        checkUser(req.body.password);

        async function checkUser(password) {
            // Get Password from DB
            let query_result = await MongoDB.getUser(req.body.username);
            // Wait for query to finish then compare the two Hashed Passwords
            if (query_result[0] != undefined) {
                bcrypt.compare(password, query_result[0].password).then(function(match) {
                    // If passwords match
                    if(match) {
                        sess.admin = query_result[0].admin ?  1 : 0;
                        sess.message = 'Logged in with Success';
                        res.send({permission: sess.admin, message: sess.message});
                    } else {
                        sess.admin = -1;
                        sess.message = 'Username and Passwords do not Match';
                        res.send({permission: sess.admin, message: sess.message});
                    }
                });
            } else {
                sess.admin = -1;
                sess.message = 'Username and Passwords do not Match';
                res.send({permission: sess.admin, message: sess.message});
            }
        }
    })
}