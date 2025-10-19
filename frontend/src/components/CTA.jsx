import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Hiring Process?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of companies using CareerIQ to find the perfect talent faster and more efficiently.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/register?role=candidate"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Find Your Dream Job
          </Link>
          <Link
            to="/register?role=employer"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
          >
            Hire Talent
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
