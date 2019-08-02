var { MongoDB } = require("../mongodb");

module.exports = function(app){
    app.route('/getPosts')
    .get(function (req, res) {
        // Get session
        sess = req.session;
        // If the user has not logged in set him has "not logged in"
        if (!sess.admin) {
            sess.admin = -1;
        }

        console.log('=> /getPosts');
        console.log('Title: ', req.query.title);

        getPosts();

        async function getPosts() {
            // Wait for query to finish then send data
            MongoDB.getPosts(req.query.title).then(function (result) {
                res.send(result);
            });
        }
    })
}