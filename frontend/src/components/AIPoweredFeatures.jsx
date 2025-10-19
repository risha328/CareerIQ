import React from 'react';

const AIPoweredFeatures = () => {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      title: "AI Resume Parsing",
      description: "Advanced NLP extracts information from any resume format with 99% accuracy, understanding context and relationships.",
      highlights: ["Multi-format support", "Context understanding", "99% accuracy rate"],
      gradient: "from-purple-500 to-pink-500",
      bgColor: "purple-50",
      delay: "0"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: "Smart Skill Extraction",
      description: "Identifies and categorizes technical, soft, and domain-specific skills from resumes and job descriptions.",
      highlights: ["1000+ skills database", "Skill categorization", "Proficiency assessment"],
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "blue-50",
      delay: "100"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
      title: "Intelligent Match Scoring",
      description: "Algorithm calculates compatibility scores based on skills, experience, culture fit, and career aspirations.",
      highlights: ["Multi-factor analysis", "Real-time scoring", "Culture fit assessment"],
      gradient: "from-green-500 to-emerald-500",
      bgColor: "green-50",
      delay: "200"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      ),
      title: "Fraud Detection & Security",
      description: "Advanced algorithms detect suspicious patterns, fake profiles, and spam to ensure platform integrity.",
      highlights: ["Pattern recognition", "Real-time monitoring", "Spam prevention"],
      gradient: "from-red-500 to-orange-500",
      bgColor: "red-50",
      delay: "300"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      ),
      title: "Personalized Recommendations",
      description: "Machine learning algorithms provide tailored job suggestions and candidate recommendations based on behavior.",
      highlights: ["Behavioral analysis", "Learning preferences", "Smart suggestions"],
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "indigo-50",
      delay: "400"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
      title: "Dynamic Skill-Gap Analysis",
      description: "Identifies missing skills for target roles and recommends learning paths to bridge the gap.",
      highlights: ["Career path mapping", "Learning recommendations", "Progress tracking"],
      gradient: "from-amber-500 to-orange-500",
      bgColor: "amber-50",
      delay: "500"
    }
  ];

  return (
    <section id="ai-features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            AI-Powered Intelligence
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Smart Recruitment
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Powered by AI
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Leverage cutting-edge artificial intelligence to transform your recruitment experience. 
            From intelligent parsing to smart matching, our platform does the heavy lifting for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={feature.delay}
            >
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:transform group-hover:scale-105 h-full flex flex-col">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {feature.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex items-center text-sm text-gray-500">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}></div>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${feature.gradient} bg-opacity-5`}></div>
              </div>

              {/* Floating AI Badge */}
              <div className="absolute -top-3 -right-3">
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd"/>
                  </svg>
                  AI
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">99%</div>
                <div className="text-blue-100">Parsing Accuracy</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">10x</div>
                <div className="text-blue-100">Faster Hiring</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">50k+</div>
                <div className="text-blue-100">Skills Mapped</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Match Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience AI-Powered Recruitment?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of companies and candidates transforming their hiring journey with CareerIQ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all group">
                <span className="flex items-center justify-center">
                  Watch AI Demo
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AIPoweredFeatures;