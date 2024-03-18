import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
    const [values, setValues] = useState(
        {
            email: '',
            password: '',
            batch_id: '',
        });

        axios.defaults.withCredentials = true; //to generate the token in the local storage

const [error, setError] = useState(null)
const handleSubmit = (event) =>{
    event.preventDefault();
    axios.post(`http://localhost:3000/auth/studentlogin`, values)
    .then(result => {
        if(result.data.loginStatus){
            window.location.href = `http://localhost:3001/auth/dashboard/${values.email}/${values.batch_id}`;
        }else{
            setError(result.data.error)
        }
    })
    .catch(err => console.log(err))
}

    return (
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
          <div className='p-3 rounded w-25 border loginForm'>
              <div className='text-warning'>
              </div>
              <div className='text-warning'>
                {error && error}
              </div>
              <h2>Student Login</h2>
              <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                      <label htmlFor="email"><strong>Email:</strong></label>
                      <input type="email" name='email' id='email' placeholder='Enter Email'
                        onChange={(event)=> setValues({...values, email: event.target.value})} className='form-control rounded-0'/>
                  </div>
                  <div className='mb-3'> 
                      <label htmlFor="password"><strong>Password:</strong></label>
                      <input type="password" name='password' id='password' placeholder='Enter Password'
                       onChange={(event)=> setValues({...values, password: event.target.value})} className='form-control rounded-0'/>
                  </div>
                  <div className='mb-3'> 
                      <label htmlFor="batchId"><strong>Batch Id:</strong></label>
                      <input type="text" name='batchId' id='batchId' placeholder='Enter Batch Id'
                       onChange={(event)=> setValues({...values, batch_id: event.target.value})} className='form-control rounded-0'/>
                  </div>
                  <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Log in</button>
              </form>
          </div>
      </div>
    )
}
export default StudentLogin
