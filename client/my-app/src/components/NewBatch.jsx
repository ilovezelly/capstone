
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link} from 'react-router-dom';
import Swal from 'sweetalert2'

const NewBatch = () => {
    const {batch_id} = useParams();
    const [student, setStudent] = useState([]);

    const [newRecord, setNewRecord] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        batch_id: batch_id,
    });

    useEffect(()=>{
        // async for making API request
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/admindashboard/new_batch/${batch_id}`);
                setStudent(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStudentData();
    }, [batch_id]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/auth/admindashboard/new_batch/${batch_id}`, newRecord);
            if (response.data.status) {
                setStudent([...student, response.data.result]);
                setNewRecord({
                    batch_id: batch_id,
                    first_name: '',
                    last_name: '',
                    email: '',
                    password:''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'New student has been added.',
                    confirmButtonColor: '#8B0000',
                }).then(() => {
                    // Reload the window to fetch new data
                    window.location.reload();
                });
            } else {
                alert(response.data.error); // Corrected from alert(result.data.error)
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    async function handleDelete(student_id) {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this student data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
    
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/auth/admindashboard/students/${student_id}`);
                setStudent(student.filter(item => item.student_id !== student_id)); // Update student list after deletion
                Swal.fire(
                    'Deleted!',
                    'Student has been deleted.',
                    'success'
                );
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const newBatch = student.map(student => (
        <tr key={student.student_id}>
            <td style={{border:'1px solid black', padding: '8px'}}>{student.student_id}</td>
            <td style={{border:'1px solid black', padding: '8px'}}>{student.first_name}</td>
            <td style={{border:'1px solid black', padding: '8px'}}>{student.last_name}</td>
            <td style={{border:'1px solid black', padding: '8px'}}>{student.email}</td>
            <td style={{border:'1px solid black', padding: '8px'}}>{student.batch_id}</td>
            <td><button style={{backgroundColor:'#8B0000', color: 'white', padding: '9.5px', border: 'none'}} onClick={()=>handleDelete(student.student_id)}>
                    <i class="bi bi-trash-fill"></i>
                </button> 
                <button style={{backgroundColor:'#000080', color: 'white', border:'1px solid black', padding: '9px'}}>
                  <Link to={`/auth/admindashboard/update/${student.student_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <i class="bi bi-pencil-fill"></i>
                  </Link></button>
            </td>
        </tr>
      ));  

  return (
    <div>
        <div className='px-5 mt-5'>
        <div className='d-flex justify-content-center align-items-center h-75'>
            <h2 className='mb-2'>Batch {batch_id}</h2>
        </div>
        <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border bg-success-subtle'>
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
            <div className="col-12">
                <label htmlFor="batch" className="form-label">Batch</label>
                <input type='text' name="batch" id="batch" className="form-control rounded-0" value={batch_id} readOnly/>
            </div>
            <div className="col-12">
                <label htmlFor="firstName" className="form-label"> First Name </label>
                <input type="text" className="form-control rounded-0" id="firstName"placeholder="Enter First Name"
                onChange={(e)=> setNewRecord({...newRecord, first_name: e.target.value})}/>
            </div>
            <div className="col-12">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control rounded-0 mb-2"id="lastName"placeholder="Enter Last Name"
                onChange={(e)=> setNewRecord({...newRecord, last_name: e.target.value})}/>
            </div>
            <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email"className="form-control rounded-0 mb-2"id="email"placeholder="Enter Email"
                onChange={(e)=> setNewRecord({...newRecord, email: e.target.value})}/>
            </div>
            <div className="col-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password"className="form-control rounded-0 mb-2"id="password"placeholder="Enter Password"
                onChange={(e)=> setNewRecord({...newRecord, password: e.target.value})}/>
            </div>
                <button className='btn w-100 rounded-0 mb-2' style={{backgroundColor:'#000080', color: 'white'}}>Add New Student</button>
            </form>
        </div>
    </div>
        <div className='d-flex justify-content-center align-items-center mt-5'>
        <h3>Kodego Batch Student List</h3>
        </div>
        <div className='d-flex justify-content-center align-items-center mb-5'>
        <table style={{borderCollapse: 'collapse', border: '2px solid black', padding: '5px', display: 'inline-block'}}>
                <thead style={{backgroundColor:'#c1ff72'}}>
                    <tr>
                        <th style={{border:'1px solid black', padding: '8px'}}>Student Id</th>
                        <th style={{border:'1px solid black', padding: '8px'}}>Student First Name</th>
                        <th style={{border:'1px solid black', padding: '8px'}}>Student Last Name</th>
                        <th style={{border:'1px solid black', padding: '8px'}}>Student Email</th>
                        <th style={{border:'1px solid black', padding: '8px'}}>Student Batch</th>
                        <th style={{border:'1px solid black', padding: '8px'}}>Edits</th>
                    </tr>
                </thead>

                <tbody>
                    {newBatch}
                </tbody>
            </table> 
        </div>
        </div>
    </div>
  )
}

export default NewBatch
