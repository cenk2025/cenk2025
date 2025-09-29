
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ProcessTimeline from '../components/ProcessTimeline';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import BlogTeaser from '../components/BlogTeaser';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
    return (
        <>
            <SEO 
                title="Voon | Digitaalisen Markkinoinnin Asiantuntijat"
                description="Olemme täyden palvelun markkinointitoimisto, joka yhdistää luovuuden, teknologian ja datan saavuttaakseen poikkeuksellisia tuloksia."
            />
            <Hero />
            <Services />
            <ProcessTimeline />
            <Testimonials />
            <Portfolio />
            <BlogTeaser />
            <ContactForm />
        </>
    );
};

export default HomePage;