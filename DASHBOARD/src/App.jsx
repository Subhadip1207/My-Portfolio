import './App.css'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ManageSkills from './pages/ManageSkills.jsx'
import ManageTimeLine from './pages/ManageTimeLine.jsx'
import ManageProjects from './pages/ManageProjects.jsx'
import ViewProjects from './pages/ViewProjects.jsx'
import UpdateProject from './pages/UpdateProject.jsx'
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/userSlice.js';
import { getAllMessages } from './store/slices/messagesSlice.js';
import { getAllTimelines } from './store/slices/timelineSlice';
import { getAllskills } from './store/slices/skillSlice';
import { getAllSoftwareApplications } from './store/slices/softwareApplicationSlice';
import { getAllProjects } from './store/slices/projectSlice';
import { getAllLanguages } from './store/slices/languageSlice';
import Managelanguages from './pages/Managelanguages';

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimelines());
    dispatch(getAllskills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllProjects());
    dispatch(getAllLanguages());
  },[])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/password/forgot' element={<ForgotPassword />}></Route>
        <Route path='/password/reset/:token' element={<ResetPassword />}></Route>
        <Route path='/manage/skills' element={<ManageSkills />}></Route>
        <Route path='/manage/timeline' element={<ManageTimeLine />}></Route>
        <Route path='/manage/projects' element={<ManageProjects />}></Route>
        <Route path='/view/project/:id' element={<ViewProjects />}></Route>
        <Route path='/update/project/:id' element={<UpdateProject />}></Route>
        <Route path='/manage/languages' element={<Managelanguages />}></Route>
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  )
}

export default App