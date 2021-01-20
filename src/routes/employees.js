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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, row, fields) => {
        if(!err) {
            res.json(row[0]);
        } else {
            console.log(err);
        }
    });
});


// create new employee
router.post('/', (req, res) => {
    const { id, name, salary } = req.body;
    const query = `
        CALL employeeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee saved'});
        } else {
            console.log(err);
        }
    });
});


// Update Data table employee
router.put('/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `CALL employeeAddOrEdit(?, ?, ?)`;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee Updated'});
        } else {
            console.log(err);
        }
    });
});

// Delete Data table employee
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;