import React from 'react';

const SettingsComponent = () => {
    return (
        <div className="flex flex-col h-screen ml-80 bg-gray-50">
            {/* Top Navbar for Settings */}
            <nav className='border py-2'>
                <h2 className='text-2xl font-serif'>Settings</h2>
            </nav>

            <div className='flex flex-1'>
                {/* Sidebar */}
                <aside className='w-1/4 bg-gray-50 p-4 shadow-md'>
                    <div className="space-y-4">
                        <h3 className='text-xl font-medium'>Profile Settings</h3>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded block w-full">Edit Profile</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded block w-full">Change Password</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded block w-full">Delete Account</button>
                        <div className="bg-white py-2 rounded-lg shadow-md">
                        <h2 className="text-lg font-medium mb-4">Theme and Appearance</h2>
                        </div>
                        <h3 className='text-xl font-medium mt-6'>About</h3>
                    </div>
                </aside>

                {/* Content Area */}
                <main className='flex-1 p-4'>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Product Image:
                    </label>
                    <input
                      type="file"
                      name="productImage"
                      //onChange={handleFileChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </main>
            </div>
        </div>
    );
};

export default SettingsComponent;
