var { mongodb } = require("../mongodb");

module.exports = function(app){
    app.route('/getPermission')
    .get(function (req, res) {
        sess = req.session;
        if (!sess.username) {
            sess.admin = -1;
            res.send({permission: sess.admin});
        } else {
            res.send({permission: sess.admin});
        }
    })
}   