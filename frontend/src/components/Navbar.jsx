import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const publicNav = (
    <>
      <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
      <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Jobs</Link>
      <Link to="/ai-resume-analyzer" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">AI Resume Analyzer</Link>
      <Link to="/for-employers" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">For Employers</Link>
      <Link to="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
    </>
  );

  const candidateNav = (
    <>
      <Link to="/candidate-dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
      <Link to="/my-jobs" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">My Jobs</Link>
      <Link to="/my-resume" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">My Resume</Link>
      <Link to="/recommendations" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Recommendations</Link>
      <Link to="/skill-insights" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Skill Insights</Link>
    </>
  );

  const employerNav = (
    <>
      <Link to="/employer-dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
      <Link to="/post-job" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Post Job</Link>
      <Link to="/candidates" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Candidates</Link>
      <Link to="/analytics" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Analytics</Link>
    </>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">CareerIQ</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {!user && publicNav}
            {user && user.role === 'candidate' && candidateNav}
            {user && user.role === 'employer' && employerNav}
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
              </>
            ) : (
              <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Profile</button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {!user && publicNav}
          {user && user.role === 'candidate' && candidateNav}
          {user && user.role === 'employer' && employerNav}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
