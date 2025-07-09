import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Assuming you're using React Router
import { Home, User, FileText, Settings, LogOut, Shield } from 'lucide-react'; // Example icons
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const user = useSelector((state) => state.user); 
  console.log(user)
    return (
       user.login ? (
        <div className="min-h-screen bg-amber-50 flex">
            {/* Left Sidebar */}
            <div className="bg-white w-64 py-6 px-4 shadow-xl border-r border-teal-100 flex flex-col justify-between animate-fadeIn">
                <div>
                    {/* User Profile Header */}
                    <div className="flex flex-col items-center justify-center mb-8 animate-slideDown">
                        <div className="p-3 bg-teal-700 rounded-full text-white shadow-lg mb-3">
                            <User size={28} />
                        </div>
                        <span className="text-xl font-semibold text-teal-800">{user.name}</span>
                        <span className="text-sm text-teal-600">User Portal</span>
                    </div>
                    
                    {/* Navigation Menu */}
                    <div className="relative">
                        {/* Accent line */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-700 rounded"></div>
                        
                        <nav className="mt-6 pl-2">
                            <ul className="space-y-3">
                                <li className="animate-slideRight" style={{ animationDelay: '0.1s' }}>
                                    <Link to="/user/dashboard" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                                        <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                                            <Home size={18} />
                                        </div>
                                        <span className="font-medium">Home</span>
                                    </Link>
                                </li>
                                <li className="animate-slideRight" style={{ animationDelay: '0.2s' }}>
                                    <Link to="/user/dashboard/profile" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                                        <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                                            <User size={18} />
                                        </div>
                                        <span className="font-medium">Profile</span>
                                    </Link>
                                </li>
                                <li className="animate-slideRight" style={{ animationDelay: '0.3s' }}>
                                    <Link to="/user/dashboard/updatePassword" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                                        <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                                            <Shield size={18} />
                                        </div>
                                        <span className="font-medium">Update Password</span>
                                    </Link>
                                </li>
                                <li className="animate-slideRight" style={{ animationDelay: '0.4s' }}>
                                    <Link to="/user/dashboard/mycomplaints" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                                        <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                                            <FileText size={18} />
                                        </div>
                                        <span className="font-medium">My Complaints</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
                {/* Logout Button */}
                <button className="flex items-center p-3 mt-6 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                    <div className="p-2 bg-red-100 rounded-lg mr-3 text-red-600">
                        <LogOut size={18} />
                    </div>
                    <span className="font-medium">Logout</span>
                </button>
            </div>

            {/* Right Side - Content Area */}
            <div className="flex-1 bg-white m-4 rounded-xl shadow-lg p-6 animate-fadeIn">
                {/* Welcome banner */}
                <div className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-700 rounded-r-lg animate-slideDown">
                    <h1 className="text-2xl font-bold text-teal-800">Welcome, {user.name}</h1>
                    <p className="text-teal-600">Manage your account and services from this dashboard.</p>
                </div>
                
                {/* Outlet for nested routes */}
                <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    <Outlet /> {/* This is where nested routes/pages will render */}
                </div>
            </div>
        </div>
       ) : (
        <div className="flex items-center justify-center min-h-screen bg-amber-50 animate-fadeIn">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Shield size={32} className="text-red-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-teal-800">Access Denied</h2>
                <p className="text-gray-600 mb-6">You need to be logged in to access this dashboard.</p>
                <Link to="/user/login" className="inline-block px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    Go to Login
                </Link>
            </div>
        </div>
       )
    );
};


export default UserDashboard;