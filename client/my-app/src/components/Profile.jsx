import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const Profile = () => {
  const { email, batch_id }  = useParams();
  const [newRecord, setNewRecord] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
      const fetchStudentData = async () => {
          try {
              const response = await axios.get(`http://localhost:3000/auth/dashboard/${email}/${batch_id}/profile`);
              console.log('Response:', response.data.data); // Log response data for debugging
              const studentData = response.data.data;
              if (studentData && studentData.length > 0) {
                  const { first_name, last_name, email, password } = studentData[0];
                  setNewRecord({ first_name, last_name, email, password });
              } else {
                  console.log('No student data found.');
              }
          } catch (error) {
              console.error('Error fetching student data:', error);
          }
      };
  
      fetchStudentData();
  }, [email, batch_id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/auth/dashboard/${email}/${batch_id}/profile/update`, newRecord);
            if (response.data.status) {
                // Reset form fields
                setNewRecord({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: ''
                });
                // Reload batch data
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Student info has been updated.',
                    confirmButtonColor: '#8B0000',
                }).then((result) => {
                    // Navigate to a new page after Swal is dismissed
                    if (result.isConfirmed || result.isDismissed) {
                        window.location.href = `http://localhost:3001/auth/dashboard/${email}/${batch_id}/profile`;
                    }
                });
            } else {
                alert(response.data.error);
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <h4 className='mb-2'>Student Name: {newRecord.first_name} {newRecord.last_name}</h4>
            </div>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='p-3 rounded w-25 border bg-success-subtle'>
                    <h2>Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="firstName" className="form-label"> First Name </label>
                        <input type="text" className="form-control rounded-0" id="firstName"placeholder="Enter First Name"
                        value={newRecord.first_name}
                        onChange={(e)=> setNewRecord({...newRecord, first_name: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control rounded-0 mb-2"id="lastName"placeholder="Enter Last Name"
                         value={newRecord.last_name}
                        onChange={(e)=> setNewRecord({...newRecord, last_name: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email"className="form-control rounded-0 mb-2"id="email"placeholder="Enter Email" readOnlyåå
                         value={newRecord.email}
                        onChange={(e)=> setNewRecord({...newRecord, email: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="password" className="form-label">Email</label>
                        <input type="password"className="form-control rounded-0 mb-2"id="password"placeholder="Enter Password" autoComplete='off'
                         value={newRecord.password}
                        onChange={(e)=> setNewRecord({...newRecord, password: e.target.value})}/>
                    </div>
                        <button className='btn w-100 rounded-0 mb-2'style={{backgroundColor:'#000080', color: 'white'}}>Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Profile
