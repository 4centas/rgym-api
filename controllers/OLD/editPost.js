var { MongoDB } = require("../mongodb");

var formidable = require('formidable'); // File System
var uniqueFilename = require('unique-filename');
var fs = require('fs');

module.exports = function(app){
    app.route('/editPost')
    .post(function (req, res) {
        // Start a session
        sess = req.session;


        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log('=> /editPost');
            
            let title = fields.title
            console.log('title: ', title);
            let new_title = fields.new_title;
            console.log('new_title: ', new_title);
            let description = fields.description;
            console.log('description: ', description);

            if (files.filetoupload != undefined) {
                let oldpath = files.filetoupload.path;

                //Get Image File Type
                let type = files.filetoupload.type;
                type = type.split("/");
                //Check Image File Type
                if (type[0] == "image"){
                    //Check Image Size
                    if (files.filetoupload.size < 1000000){
                        //Create Image
                        let filepath = '/userfiles/' + uniqueFilename('', 'image') + '.' + type[1];
                        //Give to the image copy the path, unique name and type
                        let newpath = __dirname + '../../../' + 'app/' + filepath;
                        fs.rename(oldpath, newpath,  function (err) {
                            if (err){
                                console.log(err);
                            } else {
                                // Add Info to DB
                                MongoDB.editPost(title, new_title, description, filepath).then(function (result) {
                                    if (!result){
                                        sess.message = "An error occured";
                                        res.send({permission: sess.admin, message: sess.message});
                                    } else {
                                        sess.message = 'Post Edited';
                                        res.send({permission: sess.admin, message: sess.message});
                                    }
                                });
                            }
                        });
                    } else {
                        console.log('File is too big, 1MB max');
                        sess = req.session;
                        sess.message = 'File is too big, 1MB max';
                        res.send({permission: sess.admin, message: sess.message});
                    }
                } else {
                    console.log('File is not an Image');
                    sess = req.session;
                    sess.message = 'File is not an Image';
                    res.send({permission: sess.admin, message: sess.message});
                }
            } else {
                console.log('No image');
                // Add Info to DB
                MongoDB.editPost(title, new_title, description).then(function (result) {
                    if (!result){
                        sess.message = "An error occured";
                        res.send({permission: sess.admin, message: sess.message});
                    } else {
                        sess.message = 'Post Edited';
                        res.send({permission: sess.admin, message: sess.message});
                    }
                });
            }
        });
    })
}
