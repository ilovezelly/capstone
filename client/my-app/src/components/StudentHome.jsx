import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudentHome = () => {
  const {email, batch_id} = useParams();
  const [student, setStudent] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/auth/dashboard/${email}/${batch_id}`)
    .then(result => {
      if(result.data.data){
        setStudent(result.data.data)
      }else{
        alert(result.data.error)
      }
    }).catch(err => console.log(err))
  },[]);


  const fetchStudentData = () => {
    axios.get(`http://localhost:3000/auth/dashboard/${email}/${batch_id}`)
      .then(result => {
        if (result.data.data) {
          setStudent(result.data.data);
        } else {
          alert(result.data.error);
        }
      }).catch(err => console.log(err));
  };

  
  const handleTimeIn = async (email, batch_id) => {
    try {
      const responseTimeIn = new Date();
      const time = responseTimeIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = responseTimeIn.toISOString().split('T')[0]; 
      const response = await axios.post(`http://localhost:3000/auth/dashboard/${email}/${batch_id}/timeIn`, {
        time_in: time,
        date: date
      });
      console.log(response.data); // Log the response from the backend
      if (response.data.status) {
        const attendance_id = response.data.attendance_id;
        console.log(attendance_id)
        // Display a success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Time In Successful',
          text: 'You have successfully recorded your time in.',
        }).then(()=>{
          fetchStudentData();
        });
      // Enable time out button
      document.getElementById('timeOutBtn').disabled = false;
      document.getElementById('timeOutBtn').addEventListener('click', () => handleTimeOut(attendance_id));
    } else {
      // Display an error message using Swal
      Swal.fire({
        icon: 'error',
        title: 'Time In Failed',
        text: 'Failed to record your time in. Please try again.',
      });
    }
    } catch (error) {
      console.error('Error recording time in:', error);
      // Handle error as needed
    }
  };

  const handleTimeOut = async (attendance_id) => {
    try {
      const responseTimeOut = new Date();
      const time_out = responseTimeOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const response = await axios.post(`http://localhost:3000/auth/dashboard/${email}/${batch_id}/timeOut`, {
        timeOut: time_out,
        attendance_id: attendance_id,
      });
      console.log(response.data); // Log the response from the backend
      if (response.data.status) {
        // Display a success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Time Out Successful',
          text: 'You have successfully recorded your time out.',
        }).then(()=>{
          fetchStudentData();
        });
      // Disable time out button after recording time out
      document.getElementById('timeOutBtn').disabled = true;
      }else {
        // Display an error message using Swal
        Swal.fire({
          icon: 'error',
          title: 'Time In Failed',
          text: 'Failed to record your time out. Please try again.',
        });}
    } catch (error) {
      console.error('Error updating time out:', error);
    }
  };
  
  const studentData = student.map((student) => (
    <tr key={student.batch_id}>
        <td style={{border:'1px solid black', padding: '8px'}}>{student.batch_id}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{student.email}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{student.date}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{student.time_in}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{student.time_out}</td>
    </tr>
  ));  


  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-50 bg-success-subtle' >
          <div className="container mt-5">
              <div className='text-center pb-1' style={{border: '#c1ff72'}}>
                  <h4>Attendance Tracker</h4>
              </div>
              <hr />
              <div className="row">
                  <div className="col-12">
                      <label htmlFor="email" className="form-label">Student Email</label>
                      <input type='email' name="email" id="email" className="form-control rounded-0 mb-2"
                          value={email} readOnly />
                  </div>
                  <div className="col-12">
                      <label htmlFor="batchId" className="form-label">Student Batch</label>
                      <input type='text' name="batchId" id="batchId" className="form-control rounded-0 mb-2"
                          value={batch_id} readOnly />
                  </div>
              </div>
              <div className="p-3 d-flex justify-content-around mt-3">
                  <button className='button btn' onClick={() => email && batch_id && handleTimeIn(email, batch_id)}>Time In</button>
                  <button className='button btn' id="timeOutBtn" onClick={handleTimeOut} disabled>    
                  Time Out
                  </button>
            </div>
          </div>
        </div>
    </div>
      <div className='mt-4 px-5 pt-3'>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <h3>Student Record</h3>
         </div>
        <div className='d-flex justify-content-center align-items-center mb-5'>
        <table style={{borderCollapse: 'collapse', border: '2px solid black', padding: '5px', display: 'inline-block'}}>
            <thead style={{backgroundColor: 'lightblue'}}>
                <tr>
                    <th style={{border:'1px solid black', padding: '8px'}}>Batch Id</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Email</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Date</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Time In</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Time Out</th>
                </tr>
            </thead>
            <tbody>
              {studentData}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentHome
