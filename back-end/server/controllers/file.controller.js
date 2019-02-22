const fileCtrl = {};

const { unlink } = require('fs-extra');
const path = require('path');
var moment = require('moment');
moment().format();
var mime = require('mime-types');

const File = require('../models/File');

fileCtrl.uploadFile = async (data, cb) => {
    var now = moment();
    const { size } = data.file;
    const { mimetype } = data.file;
    var icon;
    if (mimetype === mime.lookup('.pdf')) {
        icon = 'pdfIcon';
    }
    else if (mimetype === mime.lookup('.doc')) {
        icon = 'docIcon';
    }
    else if (mimetype === mime.lookup('.docx')) {
        icon = 'docIcon';
    }
    else if (mimetype === mime.lookup('.xls')) {
        icon = 'xlsIcon';
    }
    else if (mimetype === mime.lookup('.xlsx')) {
        icon = 'xlsIcon';
    }
    else if (mimetype === mime.lookup('.ppt')) {
        icon = 'pptIcon';
    }
    else if (mimetype === mime.lookup('.pptx')) {
        icon = 'pptIcon';
    }
    else if (mimetype === mime.lookup('.jpg')) {
        icon = 'jpgIcon';
    }
    else if (mimetype === mime.lookup('.png')) {
        icon = 'pngIcon';
    }
    else if (mimetype === mime.lookup('.txt')) {
        icon = 'txtIcon';
    }
    else if (mimetype === mime.lookup('.zip')) {
        icon = 'zipIcon';
    }
    else {
        icon = 'fileIcon';
    }
    var decimals=2;
    if(size == 0) return '0 Bytes';
    var k = 1024,
    dm = decimals <= 0 ? 0 : decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(size) / Math.log(k));
    var fileSize = parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    const file = new File();
    file.filename = data.file.filename;
    file.author = data.body.author;
    file.path = '/uploads/' + data.file.filename;
    file.originalname = data.file.originalname;
    file.icon = icon;
    file.size = fileSize;
    file.created_at = now;
    await file.save();
    cb(file._id);
};//External Checked

fileCtrl.deleteFile = async (req, res) => {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id)
        .then(async () => {
            if (file === null) {
                res.json({
                    status: "File doesn't exists"
                });
            }
            else {
                await unlink(path.resolve('./' + file.path));
                res.json({
                    status: 'File Deleted'
                });
            }
        })
        .catch(() => {
            res.json({
                status: "File doesn't exists"
            });
        });
};//Checked

fileCtrl.downloadFile = async (req, res) => {
    const { id } = req.params;
    const file = await File.findById(id)
        .catch(() => {
            res.json({
                status: "File doesn't exists"
            });
        });
    if (file === null) {
        res.json({
            status: "File doesn't exists"
        });
    }
    else if (file === undefined) {
    } 
    else {
        var fileDownload = path.resolve('./' + file.path);
        res.download(fileDownload, file.originalname); // Set disposition and send it.
    }
};//Checked

fileCtrl.deleteFiles = async (id) => {
    const file = await File.findByIdAndDelete(id)
    await unlink(path.resolve('./' + file.path));
};

module.exports = fileCtrl;