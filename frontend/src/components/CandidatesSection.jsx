import React from 'react';

const CandidatesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
      ),
      title: "Upload Resume Instantly",
      description: "Drag & drop your resume in any format. Our AI parses it in seconds and extracts all your skills and experience."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      ),
      title: "Personalized Job Matches",
      description: "Get job recommendations that actually match your skills, experience, and career aspirations."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      ),
      title: "Track Skill Growth",
      description: "Monitor your skill development, identify gaps, and get recommendations for career advancement."
    }
  ];

  return (
    <section id="for-candidates" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:pr-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              For Job Seekers
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Dream Job
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Let AI do the hard work for you. CareerIQ matches you with opportunities that fit your skills, 
              experience, and career goals. No more endless searching - just quality matches.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Career Journey
            </button>
          </div>

          {/* Right Content - Visualization */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Match Score</h3>
                  <p className="text-gray-500">Senior Frontend Developer</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-sm text-gray-500">Excellent Match</div>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  {/* Progress Circle */}
                  <circle cx="50" cy="50" r="40" stroke="url(#gradient)" strokeWidth="8" fill="none" 
                    strokeDasharray="251.2" strokeDashoffset="15.1" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">94%</div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>
              </div>

              {/* Skills Match */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Technical Skills</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Experience</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Culture Fit</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-9/12"></div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  Save Job
                </button>
                <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">5 new matches</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="text-sm font-medium text-gray-700">🎯 Top 3% match</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EmployersSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: "AI Shortlists Best Candidates",
      description: "Our AI screens thousands of profiles to find the perfect matches for your requirements."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: "Automatic Skill Matching",
      description: "Get precise match percentages for skills, experience, and cultural fit."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      ),
      title: "Bias-Free Recruitment",
      description: "Eliminate unconscious bias and focus on qualifications and skills only."
    }
  ];

  return (
    <section id="for-employers" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Dashboard Preview */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recruitment Analytics</h3>
                <div className="text-sm text-gray-500">Last 30 days</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">42</div>
                  <div className="text-sm text-blue-600">Candidates</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-green-600">Shortlisted</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-purple-600">Interviews</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-amber-600">5</div>
                  <div className="text-sm text-amber-600">Hired</div>
                </div>
              </div>

              {/* Candidate List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">SJ</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                      <div className="text-xs text-gray-500">Senior Developer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">96%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm font-bold">MK</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Mike Chen</div>
                      <div className="text-xs text-gray-500">Product Manager</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">92%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-bold">EP</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Emma Parker</div>
                      <div className="text-xs text-gray-500">UX Designer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">88%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  View All
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                  Schedule Interviews
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">3 new</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
              <div className="text-sm font-medium text-gray-700">⚡ 60% faster</div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:pl-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              For Employers
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hire Smarter,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Not Harder
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Transform your recruitment process with AI-powered candidate matching. 
              Reduce time-to-hire by 60% and find qualified candidates that actually fit your needs.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Post Your Job Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CandidatesSection, EmployersSection };