
import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Palvelumme | Voon Marketing Agency"
        description="Tarjoamme kattavan valikoiman digitaalisen markkinoinnin palveluita, jotka on suunniteltu kasvattamaan liiketoimintaasi. Tässä on tarkempi erittely siitä, mitä teemme."
      />
      <div className="bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Palvelumme</h1>
          <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-16">Tarjoamme kattavan valikoiman digitaalisen markkinoinnin palveluita, jotka on suunniteltu kasvattamaan liiketoimintaasi. Tässä on tarkempi erittely siitä, mitä teemme.</p>
          <Services />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;