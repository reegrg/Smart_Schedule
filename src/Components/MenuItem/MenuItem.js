// MenuItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ to, icon: Icon, children, isActive, onClick }) => {
  return (
    <li>
        <Link
        className={`flex items-center p-1 rounded ${isActive ? 'bg-gray-200 text-black' : 'text-neutral-500 hover:bg-gray-200 hover:text-neutral-700'} `}
        to={to}
        onClick={onClick}>
        <Icon className="h-5 w-5 mr-2 mb-2" />
        <span className="ml-2 mb-2 font-normal">{children}</span> {/* Adjust the text size here */}
      </Link>
    </li>
  );
};

export default MenuItem;
