import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminLogin = () => {
    const [values, setValues] = useState(
        {
            email: '',
            password: '',
        });

        const navigate = useNavigate()
        axios.defaults.withCredentials = true; //to generate the token in the local storage

const [error, setError] = useState(null)
const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post('http://localhost:3000/auth/adminLogin', values)
    .then(result => {
        if(result.data.loginStatus){
            navigate('/auth/admindashboard')
        }else{
            setError(result.data.Error)
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
              <h2>Admin Login</h2>
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
                  <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Log in</button>
              </form>
          </div>
      </div>
    )
}

export default AdminLogin
