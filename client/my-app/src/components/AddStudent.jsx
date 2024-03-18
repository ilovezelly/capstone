import React, {useState, useEffect} from 'react'
import axios from 'axios';

const AddStudent = () => {
    const [student, setStudent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        batch_id: '',
    })
    const [batch, setBatch] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/admindashboard/studentbatch')
        .then(result => {
          if(result.data.Status){
            setBatch(result.data.Result)
          }else{
            alert(result.data.Error)
          }
        }).catch(err => console.log(err))
      },[])

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/admindashboard/add_student', student)
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
        <div className="col-12">
            <label for="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="firstName"
              placeholder="Enter First Name"
              onChange={(e)=> setStudent({...student, first_name: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label for="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="lastName"
              placeholder="Enter Last Name"
              onChange={(e)=> setStudent({...student, last_name: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="email"
              placeholder="Enter Email"
              onChange={(e)=> setStudent({...student, email: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="password"
              placeholder="Enter Password"
              onChange={(e)=> setStudent({...student, password: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label for="batch" className="form-label">
              Category
            </label>
            <select name="batch" id="batch" className="form-select"
                    onChange={(e)=> setStudent({...student, first_name: e.target.value})}>
                        {batch.map((b) => {
                            return <option value={b.Name}>{b.Name}</option>
                        })}
            </select>
          </div>
            <button className='btn btn-success w-100 rounded-0 mb-2'>Add New Student</button>
        </form>
    </div>
</div>
  )
}

export default AddStudent
