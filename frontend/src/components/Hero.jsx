import React from 'react';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      {/* <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IQ</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">CareerIQ</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="max-w-lg">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Smarter
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Recruitment
                </span>
                Powered by AI
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                CareerIQ revolutionizes hiring with intelligent resume parsing,
                skill matching, and data-driven insights. Connect the right talent
                with the right opportunities, faster than ever.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Find Your Dream Job
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105">
                  Hire Talent
                </button>
              </div>

              {/* Stats */}
              <div className="flex space-x-8">
                <div>
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-gray-500">Jobs Matched</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-gray-500">Companies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-500">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl transform rotate-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  {/* Match Score */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Match Score</span>
                      <span className="text-2xl font-bold text-green-600">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-11/12"></div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">React.js</div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">Node.js</div>
                    <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium">Python</div>
                    <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium">MongoDB</div>
                  </div>

                  {/* AI Processing */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>AI analyzing resume patterns...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg transform -rotate-6">
                <div className="text-sm font-semibold text-gray-700">🎯 Perfect Match</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg transform rotate-6">
                <div className="text-sm font-semibold text-gray-700">⚡ Instant Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Trusted By Section */}
      {/* <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">Trusted by leading companies</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-xl font-bold text-gray-400">TechCorp</div>
          <div className="text-xl font-bold text-gray-400">InnovateLabs</div>
          <div className="text-xl font-bold text-gray-400">DataSystems</div>
          <div className="text-xl font-bold text-gray-400">CloudTech</div>
          <div className="text-xl font-bold text-gray-400">NextGen</div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;