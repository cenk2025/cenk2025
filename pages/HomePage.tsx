

import React, { useEffect } from 'react';
import Hero from '../components/Hero.tsx';
import Services from '../components/Services.tsx';
import ProcessTimeline from '../components/ProcessTimeline.tsx';
import Testimonials from '../components/Testimonials.tsx';
import Portfolio from '../components/Portfolio.tsx';
import VideoDemos from '../components/VideoDemos.tsx';
import BlogTeaser from '../components/BlogTeaser.tsx';
import ContactForm from '../components/ContactForm.tsx';
import SEO from '../components/SEO.tsx';

const HomePage: React.FC = () => {
    useEffect(() => {
        const structuredData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "Voon Marketing Agency",
                    "url": "https://voon.fi",
                    "logo": "https://picsum.photos/seed/voon-logo/200/60",
                    "description": "Olemme täyden palvelun markkinointitoimisto, joka yhdistää luovuuden, teknologian ja datan saavuttaakseen poikkeuksellisia tuloksia.",
                    "sameAs": [] 
                },
                {
                    "@type": "WebSite",
                    "url": "https://voon.fi",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://voon.fi/#/search?q={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    }
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            // Clean up the script when the component unmounts
            document.head.removeChild(script);
        };
    }, []);


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
            <VideoDemos />
            <BlogTeaser />
            <ContactForm />
        </>
    );
};

export default HomePage;