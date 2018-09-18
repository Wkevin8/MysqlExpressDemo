const mysql = require('mysql');
const $config = require('../config/db');
const $sql = require('./$user-sql-mapping');

// 使用连接池，提升性能
const pool = mysql.createPool($config.mysql);

// 转换json
var convertStringToJson = function (res, result) {
    if (typeof result === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(result);
    }
};

module.exports = {
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                let data = [];
                result.forEach(function (row, index) {
                    // toString("utf8") buffer to string
                    data.push({name: row.name.toString("utf8"), age: row.age});
                });

                res.json({
                    code: 200,
                    result: data,
                });

                // 释放连接
                connection.release();
            });
        });
    },
    insertUser: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query("insert into t_user (name,age) values ('李四',38)", [], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    }
                }

                convertStringToJson(res, result);
                connection.release();
            });
        });
    },
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // 获取参数
            var param = req.query || req.params;
            console.log(req);
            connection.query($sql.insert, [param.name, param.age], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }

                // 转换json
                convertStringToJson(res, result);

                // 释放连接
                connection.release();
            });
        });
    }
};