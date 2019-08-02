var {
    MongoDB
} = require("../mongodb");

module.exports = function (app) {
    app
        .route('/api/createPlan')
        .get(function (req, res) {

            const plan = {
                title: "Powerlifting",
                separator: [
                    "Week 1", "Week 2", "Week 3"
                ],
                workout: {
                    "Week 1": {
                        "Day 1": {
                            exercise: "Bench Press",
                            sets: "4",
                            reps: "12"
                        },
                        "Day 2": {
                            exercise: "Bench Press",
                            sets: "8",
                            reps: "3"
                        }
                    },
                    "Week 2": {
                        "Day 1": {
                            exercise: "Bench Press",
                            sets: "4",
                            reps: "7"
                        },
                        "Day 2": {
                            exercise: "Bench Press",
                            sets: "6",
                            reps: "3"
                        }
                    }
                }
            }
            MongoDB.createPlan(plan);

            res.send('success');

        });
}