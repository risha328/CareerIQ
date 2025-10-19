import React, { useState } from 'react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('candidate');

  const candidateSteps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      description: 'Simply upload your resume in any format. Our AI will parse and extract all relevant information automatically.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
      ),
      features: ['AI-powered parsing', 'Multiple format support', 'Instant processing']
    },
    {
      number: '02',
      title: 'AI Skills Extraction',
      description: 'Our advanced AI analyzes your resume to identify skills, experience, and qualifications with 98% accuracy.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      features: ['Skill gap analysis', 'Experience mapping', 'Competency scoring']
    },
    {
      number: '03',
      title: 'Get Perfect Job Matches',
      description: 'Receive personalized job recommendations with match scores and direct application options.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7"/>
        </svg>
      ),
      features: ['Smart matching', 'Real-time alerts', 'One-click apply']
    }
  ];

  const employerSteps = [
    {
      number: '01',
      title: 'Post Job Requirements',
      description: 'Create detailed job postings with required skills, experience level, and company culture fit.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      ),
      features: ['Easy job creation', 'Template library', 'Custom requirements']
    },
    {
      number: '02',
      title: 'AI Candidate Matching',
      description: 'Our AI scans thousands of profiles to find the most qualified candidates based on your criteria.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      features: ['Intelligent screening', 'Culture fit analysis', 'Ranked candidates']
    },
    {
      number: '03',
      title: 'Review & Interview Shortlist',
      description: 'Get a curated list of top candidates ready for interviews with detailed analytics and insights.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      features: ['Candidate analytics', 'Interview scheduling', 'Team collaboration']
    }
  ];

  const steps = activeTab === 'candidate' ? candidateSteps : employerSteps;

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How CareerIQ Works
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Experience the future of recruitment with our AI-powered platform. 
            Whether you're looking for your dream job or your next great hire, 
            CareerIQ makes it simple and efficient.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('candidate')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'candidate'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                For Candidates
              </button>
              <button
                onClick={() => setActiveTab('employer')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'employer'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                For Employers
              </button>
            </div>
          </div>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transform scale-x-0 transition-transform duration-1000 origin-left"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:transform group-hover:scale-105 h-full">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                    activeTab === 'candidate' 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      : 'bg-gradient-to-br from-green-500 to-emerald-600'
                  }`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    activeTab === 'candidate'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <svg className={`w-4 h-4 mr-3 ${
                          activeTab === 'candidate' ? 'text-blue-500' : 'text-green-500'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    activeTab === 'candidate' 
                      ? 'border-blue-200' 
                      : 'border-green-200'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to {activeTab === 'candidate' ? 'Find Your Dream Job?' : 'Hire Top Talent?'}
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of {activeTab === 'candidate' ? 'candidates' : 'companies'} already using CareerIQ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;