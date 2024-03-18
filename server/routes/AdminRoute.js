import express from 'express';
import db from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();


// Profile
router.get('/admindashboard/profile/:staff_id', (req, res) => {
    const { staff_id } = req.params;
    console.log(staff_id);
    const sql = 'SELECT * FROM staffs WHERE staff_id = ?';
    db.query(sql, [staff_id], (err, result) => {
        if (err) return res.json({ status: false, error: 'Query Error' });
        return res.json(result[0]);
    });
});

router.put('/admindashboard/profile/update', (req, res) => {
    // Hash the password
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) {
            return res.json({ status: false, error: 'Hashing error' });
        }

        // Use UPDATE query to update existing admin data
        const sql = 'UPDATE staffs SET first_name = ?, last_name = ?, password = ? WHERE email = ?';
        const values = [
            req.body.first_name,
            req.body.last_name,
            hash, // Use the hashed password here
            req.params.email, // Use req.params to get email from URL
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ status: false, error: 'Query error' });
            }
            return res.json({ status: true });
        });
    });
});

router.get('/admindashboard', (req,res)=>{
    // const today = new Date().toISOString().slice(0, 10);
    const sql = `SELECT 
                students.student_id,
                students.first_name,
                students.last_name,
                students.email,
                batch.batch_id,
                batch.batch_name,
                batch.batch_type,
                attendance.date
            FROM 
                students
            INNER JOIN 
                batch ON students.batch_id = batch.batch_id
            LEFT JOIN
                attendance ON students.email = attendance.email AND attendance.date`;
db.query(sql, ( err, result) => {
    if (err) return res.json({ status: false, error: 'Query Error' });
    if (!Array.isArray(result)) return res.json({ status: false, error: 'Invalid Data' });
    return res.json({ status: true, data: result });
})
});

// Manage Student Batch -- getting the data inside the database
router.get('/admindashboard/studentbatch', (req,res)=>{
    const sql = 'SELECT * FROM batch';
    db.query(sql,(err,results)=> {
        if(err) return res.json({status: false, error: 'Query Error'})
                return res.json({status: results})
    })
});

// Manage Students of New Batch -- adding the data inside the new batch
router.get('/admindashboard/new_batch/:batch_id', (req, res) => {
    const sql = 'SELECT * FROM `students_db`.`students` WHERE `batch_id` = ? ';
    const { batch_id } = req.params;

    db.query(sql, [batch_id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: false, error: 'Query Error' });
        }
        return res.json({ status: true, data: results }); 
    });
});

// Manage Student Batch -- adding the new data inside the database
router.post('/admindashboard/student_batch', (req, res) => {
    const sql = 'INSERT INTO `students_db`.`batch` (`batch_name`, `batch_type`, `batch_status`, `start_date`, `end_date`, `staff_id`) VALUES (?, ?, ?, ?, ?, ?)';
    const { batch_name, batch_type, batch_status, start_date, end_date, staff_id } = req.body;
    
    // Validate data (check if required fields are present)
    if (!batch_name || !batch_type || !batch_status || !start_date || !end_date || !staff_id) {
        return res.status(400).json({ status: false, error: 'Missing required fields' });
    }

    const values = [batch_name, batch_type, batch_status, start_date, end_date, staff_id];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ status: false, error: 'Query Error' });
        return res.json({ status: true, result });
    });
});

router.post('/admindashboard/new_batch/:batch_id', (req, res) => {
    // Hash the password
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) {
            return res.json({ status: false, error: 'Hashing error' });
        }
        const sql = 'INSERT INTO `students_db`.`students` (`first_name`, `last_name`, `email`, `password`, `batch_id`) VALUES (?, ?, ?, ?, ?)';
        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hash, // Use the hashed password here
            req.params.batch_id, // Use req.params to get batch_id from URL
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({status: false, error: 'Query error' });
            }
            return res.json({ status: true });
        });
    });
});

router.get('/admindashboard/update/:student_id', (req,res) => {
    const sql = 'SELECT * FROM students WHERE student_id = ?'
    const student_id = req.params.student_id;

    db.query(sql,[student_id], (err,result)=>{
        if (err) {
            return res.json({status: false, error: 'Query error' });
        }
        return res.json({ status: result });
    })
});

router.put('/admindashboard/update/:student_id', (req, res) => {
    const { student_id } = req.params; 
    const sql = `UPDATE students SET first_name = ?, last_name = ?, email = ?, batch_id = ? 
                WHERE student_id = ?`;
    const { first_name, last_name, email, batch_id } = req.body; 

    const values = [
        first_name,
        last_name,
        email,
        batch_id, 
        student_id, 
    ];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Query error:', err); // Log query error for debugging
            return res.status(500).json({ status: false, error: 'Query error' }); // Return appropriate error response
        }
        return res.json({ status: true });
    });
});


router.delete('/admindashboard/students/:student_id', (req, res) => {
    const student_id = req.params.student_id;
    const sql = 'DELETE FROM students WHERE student_id = ?';

    db.query(sql, [student_id], (err, result) => {
        if (err) {
            return res.json({ status: false, error: 'Query error' });
        }
        return res.json({ status: true });
    });
});

router.delete('/admindashboard/studentbatch/:batch_id', (req, res) => {
    const batch_id = req.params.batch_id;
    const sql = 'DELETE FROM batch WHERE batch_id = ?';

    db.query(sql, [batch_id], (err, result) => {
        if (err) {
            return res.json({ status: false, error: 'Query error' });
        }
        return res.json({ status: true });
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: "Success"});
});

router.post('/adminlogin', (req, res)=>{
    const email = req.params;
    const sql = 'SELECT * FROM staffs WHERE email =?  and password = ?'
    db.query(sql, [req.body.email, req.body.password], (err,result)=>{
     if(err) return res.json({loginStatus: false, Error: "Query Error"})
     if(result.length > 0){
         const email = result[0].email;
         const token = jwt.sign({
             role:'admin', email: email}, 
             'jwt_secret_key', 
             {expiresIn: '1d'})
             res.cookie('token', token)
             return res.json({loginStatus: true})
     }else{
         return res.json({loginStatus: false, Error: 'Wrong Email or Password'})
     }
    })
 });

export { router as adminRouter };
