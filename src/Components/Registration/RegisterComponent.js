import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    //console.log(userData);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // const clearInputFields = () => {
    //     setUserData({   
    //         name: "",
    //         email: "",
    //         phone: "",
    //         password: "",
    //         confirmPassword: "",
    //     });
    // };

    const validate = () => {
        const errors = {};
        if(!userData.name) errors.name = "Name is required";
        if(!userData.email) errors.email = "Email is required";
         else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
        errors.email = 'Invalid email address';
         }
        if(!userData.phone) errors.phone = "Phone is required";
        if (!userData.password) errors.password = "Password is required";
        if (!userData.confirmPassword)
        errors.confirmPassword = "Confirm Password is required";
        if (userData.password !== userData.confirmPassword)
        errors.confirmPassword = "Passwords must match";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/auth/register",
                    {
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                        password: userData.password,
                    }
                );
                console.log(response);
                toast.success("Registration successful");
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
                
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
  return (
    <div className='min-h-screen flex  justify-center bg-gray-100'>
      <div className='bg-white  mt-4 mb-4 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>
            Register Form
        </h2>
        <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>Name</label>
            <input
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100'
            type='text'
            id='name'
            placeholder='Enter your name'
            name='name'
            value={userData.name}
            onChange={handleChange}></input>
            {errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
            )}
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>Email</label>
            <input
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100'
            type='text'
            id='email'
            placeholder='Enter your email'
            name='email'
            value={userData.email}
            onChange={handleChange}></input>
            {errors.name && (
                <div className="text-red-500 text-sm">{errors.email}</div>
            )}
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>Phone</label>
            <input
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100'
            type='text'
            id='phone'
            placeholder='Phone Number'
            name='phone'
            value={userData.phone}
            onChange={handleChange}></input>
            {errors.name && (
                <div className="text-red-500 text-sm">{errors.phone}</div>
            )}
        </div>
        <div className="mb-4 relative ">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 cursor-pointer" />
              ) : (
                <FaEye className="text-gray-500 cursor-pointer" />
              )}
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
        <div className="mb-6 relative">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-500 cursor-pointer" />
              ) : (
                <FaEye className="text-gray-500 cursor-pointer" />
              )}
            </div>
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}
              </div>
            )}
        </div>
        <button
            className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            type="submit"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  )
}

export default RegisterComponent
