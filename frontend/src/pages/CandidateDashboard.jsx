import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const CandidateDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Welcome, Candidate! Your dashboard content goes here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
