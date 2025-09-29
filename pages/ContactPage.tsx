
import React from 'react';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const ContactPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Ota Yhteyttä | Voon Marketing Agency"
        description="Oletko valmis viemään markkinointisi seuraavalle tasolle? Olemme täällä auttamassa. Täytä alla oleva lomake tai ota meihin yhteyttä suoraan."
      />
      <div className="bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Ota Yhteyttä</h1>
          <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-16">Oletko valmis viemään markkinointisi seuraavalle tasolle? Olemme täällä auttamassa. Täytä alla oleva lomake tai ota meihin yhteyttä suoraan.</p>
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;