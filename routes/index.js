var express = require('express');
var router = express.Router();
var db = require('../lib/database');
var cryptoRandomString = require('crypto-random-string');
var lerr = require('../lib/err');
//var urlencode = require('urlencode');
var setting = require('../setting');

var sqlstring = require('sqlstring');

mysql = new db("mysql","slURL",3);


/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
});

// RESTFUL api for transfer origin to short
router.post('/url', function (req, res, next) {
    // insert url table and update short
    var originurl = req.body.url;
    if (typeof originurl !== "string" ) {
        res.json({error:1,msg:"no good params."})
        return false;
    }

    var insertsql = sqlstring.format('insert into  `url`(`shorturl`,`originurl`) values("","?")',[originurl]);

    mysql.query(insertsql,function (err,result) {
        if (err) {
            console.log(err);
            return
        }

        var hashed = cryptoRandomString(10);
        var updatesql = 'update `url` set `shorturl`= "' + hashed+ '" where `urlid`="' + result.insertId +'"';

        console.log(updatesql);
        mysql.query(updatesql,function (err,result) {
            console.log(result);
        })

        res.json({shorturl:setting.Sdomain+hashed});
    });
})

// RESTFUL api for to redirect shortURL to orignURL
router.get('/url/:urlhash', function (req, res, next) {

    var p = req.params;
    if ( typeof p.urlhash === 'undefined') {
        res.json(lerr.param);
        return false;
    }

    var sql = 'select originurl from `url` where `shorturl`="' + p.urlhash + '"';
    mysql.query(sql,function (err,rows) {

        if (err || !(rows.length == 1)) {
            res.json(lerr.param);
            return false
        }

        var originurl = rows[0].originurl;
        res.redirect(301, originurl);
        res.end();
    });

});


module.exports = router;
