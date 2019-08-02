var { MongoDB } = require("../mongodb");

module.exports = function(app){
    app.route('/getPost')
    .get(function (req, res) {
        // Get session
        sess = req.session;
        // If the user has not logged in set him has "not logged in"
        if (!sess.admin) {
            sess.admin = -1;
        }

        console.log('=> /getPost');
        console.log('Title: ', req.query.title);

        getPost();

        async function getPost() {
            // Wait for query to finish then send data
            MongoDB.getPost(req.query.title).then(function (result) {
                res.send(result);
            });
        }
    })
}