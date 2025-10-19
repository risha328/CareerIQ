import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import AIPoweredFeatures from '../components/AIPoweredFeatures';
import { CandidatesSection } from '../components/CandidatesSection';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <CandidatesSection />
      <AIPoweredFeatures />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;
