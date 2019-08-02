var { MongoDB } = require("../mongodb");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app){
    app.route('/deleteUser')
    .post(jsonParser, function (req, res) {
        sess = req.session;
        console.log('=> /deleteUser');

        let username = req.body.username;
        console.log('Delete: ', username);

        if (!sess.admin) {
            sess.admin = -1;
            console.log('Not Allowed');
            sess.message = 'Not Allowed';
            res.send({permission: sess.admin, message: sess.message});
        } else if (username == undefined) {
            console.log('No ID submitted');
            sess.message = 'No ID submitted';
            res.send({permission: sess.admin, message: sess.message});
        } else {
            MongoDB.deleteUser(username).then(function (result) {
                if (!result){
                    console.log('An error occured');
                    sess.message = "An error occured";
                    res.send({permission: sess.admin, message: sess.message});
                } else {
                    console.log('User Deleted');
                    sess.message = 'User Deleted';
                    res.send({permission: sess.admin, message: sess.message});
                }
            });
        }
    });
}