var { MongoDB } = require("../mongodb");

module.exports = function(app){
    app.route('/getThemes')
    .get(function (req, res) {
        // Get session
        sess = req.session;
        // If the user has not logged in set him has "not logged in"
        if (!sess.admin) {
            sess.admin = -1;
        }

        getThemes();

        async function getThemes() {
            // Wait for query to finish then send data
            MongoDB.getThemes().then(function (result) {
                res.send(result);
            });
        }
    })
}