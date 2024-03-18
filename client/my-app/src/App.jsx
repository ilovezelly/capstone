import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// Admin View
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard'
import Home from './components/Home';
import StudentBatch from './components/StudentBatch';
import Profile from './components/Profile';
import AddBatch from './components/NewBatch';
import NewBatch from './components/NewBatch';
import UpdateStudent from './components/UpdateStudent';
import AdminProfile from './components/AdminProfile';
// Student View
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import StudentHome from './components/StudentHome';
import Start from './components/Start';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      {/* Student View */}
      <Route path='/auth/adminlogin' element={<AdminLogin />}></Route>
      <Route path='/auth/studentlogin' element={<StudentLogin />}></Route>
      <Route path='/auth/dashboard/:email/:batch_id' element={<Dashboard/>}>
          <Route path='' element={<StudentHome/>}></Route>
          <Route path='/auth/dashboard/:email/:batch_id/timeIn' element={<Dashboard/>}></Route>
          <Route path='/auth/dashboard/:email/:batch_id/timeOut' element={<Dashboard/>}></Route>
          <Route path='/auth/dashboard/:email/:batch_id/profile' element={<Profile/>}></Route>
          <Route path='/auth/dashboard/:email/:batch_id/profile/update' element={<Profile/>}></Route>
      </Route>
      {/* Admin View */}
      <Route path='/auth/admindashboard' element={<AdminDashboard/>}>
          <Route path='/auth/admindashboard' element={<Home/>}></Route>
          <Route path='/auth/admindashboard/studentbatch' element={<StudentBatch/>}></Route>
          <Route path='/auth/admindashboard/profile/:staff_id' element={<AdminProfile/>}></Route>
          <Route path='/auth/admindashboard/profile/:staff_id/update' element={<AdminProfile/>}></Route>
          <Route path='/auth/admindashboard/add_batch' element={<AddBatch/>}></Route>
          <Route path='/auth/admindashboard/new_batch/:batch_id' element={<NewBatch/>}></Route>
          <Route path='/auth/admindashboard/update/:student_id' element={<UpdateStudent/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
