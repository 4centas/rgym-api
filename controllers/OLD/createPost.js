var { MongoDB } = require("../mongodb");

var formidable = require('formidable'); // File System
var uniqueFilename = require('unique-filename');
var fs = require('fs');

module.exports = function(app){
    app.route('/createPost')
    .post(function (req, res) {
        // Start a session
        sess = req.session;


        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log('=> /createPost');
            
            let oldpath = files.filetoupload.path;
            let title = fields.title;
            let description = fields.description;
            let theme = fields.theme;

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
                        if (err) throw err;
                        // Add Info to DB
                        MongoDB.insertPost(title, description, filepath, theme).then(function (result) {
                            if (!result){
                                sess.message = "An error occured";
                                res.send({permission: sess.admin, message: sess.message});
                            } else {
                                sess.message = 'Post Created';
                                res.send({permission: sess.admin, message: sess.message});
                            }
                        });
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
        });
    })
}
