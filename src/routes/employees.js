const { Router } = require('express')
const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();

const mysql = require('../database');

// get table employees
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees', (err, row, fields) => {
        if(!err) {
            res.json(row);
        } else {
            console.log(err)
        }
    });
});

module.exports = router;