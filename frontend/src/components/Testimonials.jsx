import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      company: "TechCorp",
      image: "SJ",
      rating: 5,
      content: "CareerIQ helped me find my dream job in just 3 days! The AI matching was incredibly accurate - I got offers from 3 companies that were perfect fits for my skills and career goals.",
      stats: "5 job matches • 3 interviews • 1 dream job",
      type: "candidate",
      background: "from-blue-500 to-cyan-500",
      icon: "💼"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      role: "HR Director",
      company: "InnovateLabs",
      image: "MR",
      rating: 5,
      content: "We reduced our hiring time by 65% using CareerIQ. The AI shortlisting saved us hundreds of hours in resume screening, and the candidates we hired have been exceptional.",
      stats: "42 candidates screened • 18 hired • 65% faster hiring",
      type: "employer",
      background: "from-green-500 to-emerald-500",
      icon: "⚡"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Product Manager",
      company: "DataSystems",
      image: "PP",
      rating: 5,
      content: "The skill gap analysis was a game-changer! I discovered exactly what I needed to learn to advance my career and landed a 40% salary increase in 2 months.",
      stats: "8 skills identified • 3 courses completed • 40% salary increase",
      type: "candidate",
      background: "from-purple-500 to-pink-500",
      icon: "🚀"
    },
    {
      id: 4,
      name: "David Chen",
      role: "CTO",
      company: "CloudTech Solutions",
      image: "DC",
      rating: 5,
      content: "The quality of candidates from CareerIQ is outstanding. We've hired 15 developers in 3 months, all with 90%+ match scores. It's transformed our recruitment process.",
      stats: "15 developers hired • 90% average match • 3 months",
      type: "employer",
      background: "from-orange-500 to-amber-500",
      icon: "🎯"
    },
    {
      id: 5,
      name: "Emily Watson",
      role: "UX Designer",
      company: "CreativeMinds",
      image: "EW",
      rating: 5,
      content: "I was struggling to find remote opportunities that matched my skills. CareerIQ found me 8 perfect remote positions, and I accepted my top choice within a week!",
      stats: "8 remote matches • 5 interviews • 1 week to offer",
      type: "candidate",
      background: "from-indigo-500 to-blue-500",
      icon: "🌎"
    }
  ];

  const stats = [
    { number: "10K+", label: "Jobs Matched", icon: "💼" },
    { number: "5K+", label: "Candidates Hired", icon: "🎓" },
    { number: "2K+", label: "Companies Trust Us", icon: "🏢" },
    { number: "98%", label: "Satisfaction Rate", icon: "⭐" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTestimonial, isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Success Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Don't just take our word for it. See how CareerIQ is transforming careers 
            and revolutionizing recruitment for candidates and employers alike.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Testimonial Carousel */}
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="relative h-96">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === activeTestimonial
                      ? 'opacity-100 transform translate-x-0'
                      : 'opacity-0 transform translate-x-full'
                  }`}
                >
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                      {/* Left Side - Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${testimonial.background} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                            {testimonial.image}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                            <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                            <StarRating rating={testimonial.rating} />
                          </div>
                        </div>

                        <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 italic">
                          "{testimonial.content}"
                        </blockquote>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{testimonial.icon}</span>
                            <span>{testimonial.stats}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            testimonial.type === 'candidate' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {testimonial.type === 'candidate' ? 'Candidate' : 'Employer'}
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Visual */}
                      <div className={`bg-gradient-to-br ${testimonial.background} p-8 lg:p-12 flex items-center justify-center relative overflow-hidden`}>
                        <div className="text-center text-white relative z-10">
                          <div className="text-6xl mb-4">{testimonial.icon}</div>
                          <h4 className="text-2xl font-bold mb-2">Success Story</h4>
                          <p className="text-white/80">
                            {testimonial.type === 'candidate' 
                              ? 'Career Transformation' 
                              : 'Recruitment Revolution'
                            }
                          </p>
                        </div>
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 right-4 text-4xl">🎯</div>
                          <div className="absolute bottom-4 left-4 text-4xl">⚡</div>
                          <div className="absolute top-1/2 left-1/4 text-3xl">🚀</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTestimonial(index);
                  setIsAutoPlaying(false);
                }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeTestimonial
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Mini Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActiveTestimonial(index);
                  setIsAutoPlaying(false);
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${testimonial.background} flex items-center justify-center text-white font-bold`}>
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{testimonial.role}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">"{testimonial.content}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;