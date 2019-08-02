var {
    MongoDB
} = require("../mongodb");

module.exports = function (app) {
    app
        .route('/api/getPlanList')
        .get(function (req, res) {
            
            MongoDB.getPlans().then((result) => {

                setTimeout(() => {
                    res.header('Access-Control-Allow-Origin', "*");
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    res.header('Access-Control-Allow-Headers', 'Content-Type');
                    res.send(result);
                }, 500);
                
            })

        });
}