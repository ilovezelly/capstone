import express from 'express';
import db from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';

const router = express.Router();

router.post('/studentlogin', (req, res) => {
    const sql = 'SELECT * FROM students WHERE email = ? AND password = ? AND batch_id = ?'
    db.query(sql, [req.body.email, req.body.password, req.body.batch_id], (err,result)=>{
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
         return res.json({loginStatus: false, error: 'Wrong Email or Password'})
     }
    })
 });

 router.get('/dashboard/:email/:batch_id', (req, res) => {
  const { email } = req.params; 
  const sql = 'SELECT * FROM attendance WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if(err) return res.json({status: false, error: 'Query Error'})
    return res.json({status: true, data: result})
  });
});

 router.post('/dashboard/:email/:batch_id', (req, res) => {
    const email = req.params.email;
    const sql = 'SELECT * FROM students WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error('Query error:', err);
        return res.json({ status: false, error: 'Query error' });
      }
      if (result.length === 0) {
        return res.json({ status: false, error: 'User not found' });
      }
      const userData = result[0];
      return res.json({ status: true, data: userData });
    });
  });

  router.post('/dashboard/:email/:batch_id/timeIn', (req, res)=>{
    const sql = 'INSERT INTO attendance (batch_id, email, time_in, date) VALUES (?,?,?,?)';
    const values = [
      req.params.batch_id,
      req.params.email,
      req.body.time_in,
      req.body.date];
    db.query(sql, values, (err, result) => {
      if (err) {
          return res.json({status: false, error: 'Query error' });
      }
      const attendance_id = result.insertId;
      return res.json({ status: true, attendance_id: attendance_id });
  });
  });

  router.post('/dashboard/:email/:batch_id/timeOut', (req, res) => {
    const email = req.params.email;
    const batch_id = req.params.batch_id;
    const time_out = req.body.timeOut;
    const attendance_id = req.body.attendance_id;
  
    // Update the record in the database
    const sql = 'UPDATE attendance SET time_out = ? WHERE attendance_id = ?';
    const values = [time_out, attendance_id];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating time out:', err);
        return res.json({ status: false, error: 'Internal Server Error' });
      }
      return res.json({ status: true });
    });
  });

  // Profile
  router.get('/dashboard/:email/:batch_id/profile', (req, res) => {
    const { email } = req.params; 
    const sql = 'SELECT * FROM students WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if(err) return res.json({status: false, error: 'Query Error'})
      return res.json({status: true, data: result})
    });
  });

  router.put('/dashboard/:email/:batch_id/profile/update', (req, res) => {
    // Hash the password
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) {
            return res.json({ status: false, error: 'Hashing error' });
        }

        // Use UPDATE query to update existing student data
        const sql = 'UPDATE `students_db`.`students` SET first_name = ?, last_name = ?, password = ? WHERE email = ? AND batch_id = ?';
        const values = [
            req.body.first_name,
            req.body.last_name,
            hash, // Use the hashed password here
            req.params.email, // Use req.params to get email from URL
            req.params.batch_id, // Use req.params to get batch_id from URL
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ status: false, error: 'Query error' });
            }
            return res.json({ status: true });
        });
    });
});



export {router as studentRouter}
