import React,{useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
    const [studentsData, setStudentsData] = useState([]);
    const today = new Date().toISOString().slice(0, 10);
    // const today = '2024-03-18'
    // const today =  new Date();

    console.log(today)

    useEffect(() => {
      const fetchStudentsData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/auth/admindashboard');
          const { data } = response.data;
          console.log(data)
          setStudentsData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchStudentsData();
    }, []);  

    const data = studentsData.filter((student, index, array) => { if (student.date === today) {
                return array.findIndex((item) =>
                item.student_id === student.student_id && item.date === student.date) === index;
      }return false;}).map((student, index) => (
                              <tr key={index}>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.student_id}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.first_name}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.last_name}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.email}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.batch_id}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.batch_name}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.batch_type}</td>
                                <td style={{border:'1px solid black', padding: '8px'}}>{student.date.toLocaleString()}</td>
                                {/* <td style={{ border: '1px solid black', padding: '8px', color: getStatusColor(student.status) }}>{student.status}</td> */}
                              </tr>
))
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 shadow-sm w-25' style={{border: '1px solid #c1ff72'}}>
          <div className='text-center pb-1'>
            <h4>Present</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between align-center'>
            <h5>Total:  {data.length}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 shadow-sm w-25' style={{border: '1px solid #c1ff72'}}>
          <div className='text-center pb-1'>
            <h4>Active Batch</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>PTWD98</h5>
            <h5>FTWD101</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <h3>Kodego Student Present Today: {today}</h3>
         </div>
        <div className='d-flex justify-content-center align-items-center mb-5'>
        <table style={{borderCollapse: 'collapse', border: '2px solid black', padding: '5px', display: 'inline-block'}}>
            <thead style={{backgroundColor:'#004aad', color: 'white'}}>
                <tr>
                    <th style={{border:'1px solid black', padding: '8px'}}>Student Id</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Student First Name</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Student Last Name</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Student Email</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Batch Id</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Batch Name</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Batch Type</th>
                    <th style={{border:'1px solid black', padding: '8px'}}>Date Today</th>
                </tr>
            </thead>
            <tbody>
            {data}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Home

