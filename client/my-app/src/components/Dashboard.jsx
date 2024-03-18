import React, {useEffect, useState} from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'

const Dashboard = () => {
  const { email, batch_id }  = useParams();
  const handleLogout = () => {
		axios.get('http://localhost:3000/auth/logout')
		.then(res => {
      window.location.href = `http://localhost:3001/`;
		}).catch(err => console.log(err));
	}
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor:'#004aad', color: '#white'}}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/auth/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Kodego 
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={`/auth/dashboard/${email}/${batch_id}`}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/auth/dashboard/${email}/${batch_id}/profile`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}> </li>
              <li>
              <Link to= '/'
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow"style={{backgroundColor:'#c1ff72', color: 'black'}} >
                <h4>Welcome, {email}!</h4>
            </div>
            <Outlet/>
        </div>
      </div>
      <footer className="fixed-bottom" style={{ textAlign: 'center', backgroundColor:'#c1ff72', color: 'black' }}>
        Made with <i className="bi-heart-fill text-danger"></i> by Deozzell Palomar
      </footer>
    </div>
  )
}
export default Dashboard
