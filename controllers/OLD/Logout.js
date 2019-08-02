module.exports = function(app){
    app.get('/logout', (req, res) => {
        console.log('=> /logout');

        req.session.destroy();
        res.send({permission: '-1', message: 'Logged Out'});
    });
}