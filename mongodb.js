const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db)
        return MongoClient.connect(this.url, this.options)
            .then(db => this.db = db.db("rgym"))
    }

    static getCollection(collection) {
        let func = (collectionName) => {
            return new Promise((resolve, reject) => {
                mongodb.db.collection(collectionName, function (error, controllerHandle) {
                    if (error) reject(error);
                    resolve(controllerHandle);
                });
            });
        };
        return func(collection);
    }

    static createPlan(plan) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("workouts"));
                var result = await controllerHandle.insertOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = plan;
        return func(query);
    }

    static getPlans() {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("workouts"));
                var result = await controllerHandle.find(query, { projection: { _id: 0 } }).toArray();
                return result;
            } catch (e) {
                return false;
            }
        };
        let query = {};
        return func(query);
    }

    static getUser(username) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.find(query).toArray();
                return result;
            } catch (e) {
                return false;
            }
        };
        let query = { username: username };
        return func(query);
    }

    static getUsers() {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.find(query, { projection: { _id: 0, password: 0 } }).toArray();
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { username: { $exists: true} };
        return func(query);
    }

    static insertUser(username, password, email) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.insertOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { username: username, password: password, email: email, admin: false };
        return func(query);
    }

    static editUser(username, new_username, password, email) {
        var func = async (query, new_values) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.updateOne(query, new_values);
                return result;
            } catch (e) {
                return e;
            }
        };

        let new_values = { $set: { username: new_username, email: email} };

        if (password != undefined && password != '') {
            new_values.$set.password = password;
        }

        console.log('New Values: ', new_values);

        let query = {username: username};
        return func(query, new_values);
    }

    static deleteUser(username) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.deleteOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { username: username };
        return func(query);
    }

    static getThemes() {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.find(query).toArray();
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { theme_title: { $exists: true} };
        return func(query);
    }

    static insertTheme(title, description, avatar) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.insertOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { theme_title: title, theme_description: description, theme_avatar: avatar};
        return func(query);
    }

    static editTheme(title, new_title, description, avatar) {
        var func = async (query, new_values) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.updateOne(query, new_values);
                return result;
            } catch (e) {
                return e;
            }
        };
        let new_values = {};
        if (avatar == undefined) {
            new_values = { $set: {theme_title: new_title, theme_description: description } };
        } else {
            new_values = { $set: {theme_title: new_title, theme_description: description, theme_avatar: avatar } };
        }

        let query = {theme_title: title};
        return func(query, new_values);
    }

    static deleteTheme(title) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.deleteOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { theme_title: title};
        return func(query);
    }

    static getPosts(theme_title) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.find(query).toArray();
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { post_theme_title: theme_title };
        return func(query);
    }

    static insertPost(title, description, avatar, theme) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.insertOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { post_title: title, post_description: description, post_avatar: avatar, post_theme_title: theme};
        return func(query);
    }

    static editPost(title, new_title, description, avatar) {
        var func = async (query, new_values) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.updateOne(query, new_values);
                return result;
            } catch (e) {
                return e;
            }
        };
        let new_values = {};

        if (avatar == undefined) {
            new_values = { $set: {post_title: new_title, post_description: description } };
        } else {
            new_values = { $set: {post_title: new_title, post_description: description, post_avatar: avatar } };
        }

        let query = {post_title: title};
        return func(query, new_values);
    }

    static deletePost(title) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.deleteOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { post_title: title};
        return func(query);
    }

    static getPost(theme_title) {
        var func = async (query) => {
            try {
                var controllerHandle = await (MongoDB.getCollection("todos"));
                var result = await controllerHandle.findOne(query);
                return result;
            } catch (e) {
                return e;
            }
        };
        let query = { post_theme_title: theme_title };
        return func(query);
    }
}

mongodb = new MongoDB;

mongodb.db = null
mongodb.url = 'mongodb://localhost:27017/'
mongodb.options = {
    reconnectTries:     5000,
    useNewUrlParser: true
}

mongodb.connectToMongo();

module.exports = { MongoDB };