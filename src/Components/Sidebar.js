import React, { useState } from 'react';
import logo from './assets/log.png';
import {
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import MenuItem from './MenuItem/MenuItem';
import { Outlet } from 'react-router-dom';


const Sidebar = () => {
    const [active, setActive] =useState(null);

    const handleItemClick = (item) => {
      setActive(item);
    }
  return (
    <div>
    <nav id='default-sidebar' className='fixed top-0 left-0 w-64 h-screen'>
    <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-blue-400 border-r'>
      <img 
        src={logo} 
        alt="Logo" 
        className='flex items-start h-20 ml-2 ' 
      />
      <ul className='space-y-2 font-medium ml-2'>
        <MenuItem to='#' icon={Squares2X2Icon}
        isActive={active === 'dashboard'}
        onClick={() => handleItemClick('dashboard')}>
        Dashboard
        </MenuItem>

        <MenuItem to='/sidebar/task' icon={ClipboardDocumentListIcon}
        isActive={active === 'mytasks'}
        onClick={() => handleItemClick('mytasks')}>
        My Tasks
        </MenuItem>

        <MenuItem to='/sidebar/calendar' icon={CalendarDaysIcon}
        isActive={active === 'schedule'}
        onClick={() => handleItemClick('schedule')}>
        Schedule
        </MenuItem>

        <MenuItem to='/sidebar/notes' icon={PencilSquareIcon}
        isActive={active === 'notes'}
        onClick={() => handleItemClick('notes')}>
        Notes
        </MenuItem>

        <MenuItem to='/sidebar/settings' icon={Cog6ToothIcon}
        isActive={active === 'settings'}
        onClick={() => handleItemClick('settings')}>
        Settings
        </MenuItem>

        <MenuItem to='/calendar' icon={PowerIcon}>
        Logout
        </MenuItem>
        
        </ul>
    </div>  
  </nav>
  <Outlet />
  </div>
  );
};

export default Sidebar;

