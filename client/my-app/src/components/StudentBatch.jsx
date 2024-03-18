import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';


const StudentBatch = () => {
  const [batch, setBatch] = useState([]);

  const [newBatch, setNewBatch] = useState({
        batch_status: '',
        batch_type: '',
        batch_name: '',
        start_date: '',
        end_date: '',
        staff_id: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/auth/admindashboard/studentbatch')
    .then(result => {
      if(result.data.status){
        setBatch(result.data.status)
      }else{
        alert(result.data.error)
      }
    }).catch(err => console.log(err))
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/auth/admindashboard/student_batch', newBatch);
        if (response.data.status) {
            setBatch(prevBatch => [...prevBatch, response.data.result]);
            setNewBatch({
                batch_status: '',
                batch_type: '',
                batch_name: '',
                start_date: '',
                end_date: '',
                staff_id: ''
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'New batch has been added.',
                confirmButtonColor: '#8B0000',
            }).then(() => {
                // Reload the window to fetch new data
                window.location.reload();
            });
        } else {
            throw new Error(response.data.error);
        }
    } catch (error) {
        console.log(error);
        alert('An error occurred while adding the new batch.');
    }
}

async function handleDelete(batch_id) {
  try {
      const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this batch!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
          await axios.delete(`http://localhost:3000/auth/admindashboard/studentbatch/${batch_id}`);
          setBatch(batch.filter(item => item.batch_id !== batch_id));
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


  const sortedBatches = [...batch].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

  const studentBatches = sortedBatches.map((batch) => (
    <tr key={batch.batch_id}>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.batch_id}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.batch_status}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.batch_type}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.batch_name}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.start_date}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.end_date}</td>
        <td style={{border:'1px solid black', padding: '8px'}}>{batch.staff_id}</td>
        <td>
          <button style={{backgroundColor:'#8B0000', color: 'white', padding: '10px', border: 'none'}} onClick={()=>handleDelete(batch.batch_id)}>
              <i class="bi bi-trash-fill"></i>
          </button>
          <button style={{ backgroundColor:'#000080', color: 'white', border:'1px solid black', padding: '9px'}}>              
              <Link to={`/auth/admindashboard/new_batch/${batch.batch_id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex'}}>
                  <i class="bi bi-eye-fill"></i> 
              </Link>
          </button>
</td>

    </tr>
  ));  

  return (
    <div className='px-5 mt-5'>
      {/* Listing of Kodego Batches */}
      <div className='d-flex justify-content-center align-items-center h-75'>
            <h2 className='mb-2'>Welcome to Kodego Student Batch Database</h2>
        </div>
      <div className='d-flex justify-content-center align-items-center mb-5'>
        <table style={{ borderCollapse: 'collapse', border: '2px solid black', padding: '5px', display: 'inline-block' }}>
          <thead style={{backgroundColor:'#004aad', color: 'white'}}>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Batch Id</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Batch Status</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Batch Type</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Batch Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Start Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>End Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Staff</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentBatches}
          </tbody>
        </table>
      </div>
      {/* Add New Batch Form */}
      <div className='d-flex justify-content-center align-items-center h-75 mb-5'>
              <div className='p-3 rounded w-50 border bg-primary-subtle ' >
                <h3>Add New Batch</h3>
                <form onSubmit={handleSubmit}>
                  <div className="col-12">
                      <label htmlFor="batch_status" className="form-label">
                        Batch Status
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0 mb-1"
                        id="batch_status"
                        placeholder="Enter Batch Status"
                        value={batch.batch_status}
                        onChange={(e) => setNewBatch({ ...newBatch, batch_status: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="batch_type" className="form-label">
                        Batch Type
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0 mb-1"
                        id="batch_type"
                        placeholder="Enter Batch Type"
                        value={batch.batch_type}
                        onChange={(e) => setNewBatch({ ...newBatch, batch_type: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="batch_status" className="form-label">
                        Batch Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0 mb-1"
                        id="batch_name"
                        placeholder="Enter Batch Name"
                        value={batch.batch_name}
                        onChange={(e) => setNewBatch({ ...newBatch, batch_name: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="batch_status" className="form-label">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control rounded-0 mb-1"
                        id="start_date"
                        value={batch.start_date}
                        onChange={(e) => setNewBatch({ ...newBatch, start_date: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="batch_status" className="form-label">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="form-control rounded-0 mb-1"
                        id="end_date"
                        value={batch.end_date}
                        onChange={(e) => setNewBatch({ ...newBatch, end_date: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="batch_status" className="form-label">
                        Staff Id
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0 mb-1"
                        id="staff_id"
                        placeholder="Enter Staff Id"
                        value={batch.staff_id}
                        onChange={(e) => setNewBatch({ ...newBatch, staff_id: e.target.value })}
                      />
                    </div>
                      <button className='btn w-100 rounded-0 mb-' type='submit'style={{backgroundColor:'#000080', color: 'white'}}>Add New Batch</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default StudentBatch
