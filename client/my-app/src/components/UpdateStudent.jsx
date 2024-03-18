import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateStudent = () => {
    const {student_id} = useParams();
    const [newRecord, setNewRecord] = useState({
        first_name: '',
        last_name: '',
        email: '',
        batch_id: '',
    });
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/admindashboard/update/${student_id}`);
                const studentData = response.data.status;
                if (studentData.length > 0) {
                    const { first_name, last_name, email, batch_id } = studentData[0];
                    setNewRecord({ first_name, last_name, email, batch_id });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchStudentData();
    }, [student_id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/auth/admindashboard/update/${student_id}`, newRecord);
            if (response.data.status) {
                // Reset form fields
                setNewRecord({
                    batch_id: '',
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
                        window.location.href = 'http://localhost:3001/auth/admindashboard/studentbatch';
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
                <h4 className='mb-2'>Student Id No: {student_id}</h4>
            </div>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='p-3 rounded w-25 border bg-success-subtle'>
                    <h2>Update Student</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="batch" className="form-label">Batch</label>
                        <input type='text' name="batch" id="batch" className="form-control rounded-0" placeholder="Enter Batch Id"
                        value={newRecord.batch_id}
                        onChange={(e)=> setNewRecord({...newRecord, batch_id: e.target.value})}/>
                    </div>
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
                        <input type="email"className="form-control rounded-0 mb-2"id="email"placeholder="Enter Email" autoComplete='off'
                         value={newRecord.email}
                        onChange={(e)=> setNewRecord({...newRecord, email: e.target.value})}/>
                    </div>
                        <button className='btn w-100 rounded-0 mb-2'style={{backgroundColor:'#000080', color: 'white'}}>Update Student</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateStudent
