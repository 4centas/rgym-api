module.exports = function(app){
    // Plans
    require('../controllers/getPlanList')(app);
    require('../controllers/createPlan')(app);
}