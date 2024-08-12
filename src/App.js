import React from 'react'
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route , useLocation} from "react-router-dom";
import LoginComponent from './Components/Login/LoginComponent';
import RegisterComponent from './Components/Registration/RegisterComponent';
import TaskComponent from './Components/Task/TaskComponent';
import NoteComponent from './Components/Note/NoteComponent';
import SettingsComponent from './Components/Settings/SettingsComponent';
import CalendarComponent from './Components/Calendar/CalendarComponent';
import HomeComponent from './Components/Home/HomeComponent';


const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = [ '/sidebar','notes' , 'task', 'settings', 'calendar' ];
  // // Check if current path includes the dynamic segment
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <div>
      {!shouldHideNavbar && <Navbar/>}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />

        <Route path="/sidebar" element={<Sidebar />}>
          <Route path="notes" element={<NoteComponent />} />
          <Route path="task" element={<TaskComponent />} />
          <Route path="settings" element={<SettingsComponent />} />
          <Route path="calendar" element={<CalendarComponent />} />
        </Route>
        
        
      </Routes>
    </div>
    </>
  )
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
