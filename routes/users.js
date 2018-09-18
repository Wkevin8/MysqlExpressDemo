var express = require('express');
var router = express.Router();
const $userDao = require('../dao/$user-dao');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/addUser', function (req, res, next) {
    $userDao.add(req, res, next);
});

router.get('/test', function (req, res, next) {
    $userDao.queryAll(req, res, next);
});

router.post('/post', function (req, res, next) {
    console.log(req.body);
    res.json({
        code: 200,
        msg: "成功",
        data: req.body,
    })
});
router.get('/insertUser', function (req, res, next) {
    $userDao.insertUser(req, res, next);
});

module.exports = router;
