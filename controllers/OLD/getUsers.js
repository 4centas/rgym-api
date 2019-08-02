var { MongoDB } = require("../mongodb");

module.exports = function(app){
    app.route('/getUsers')
    .get(function (req, res) {
        // Get session
        sess = req.session;
        // If the user has not logged in set him has "not logged in"
        if (!sess.admin) {
            sess.admin = -1;
        }

        console.log('=> /getUsers');
        

        // Wait for query to finish then send data
        MongoDB.getUsers().then(function (result) {
            res.send(result);
        });

    })
}