

import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-dark-bg dark:via-brand-purple/20 dark:to-dark-bg dark:animate-background-pan dark:bg-[length:400%_400%] z-0"></div>
            <div className="absolute inset-0 bg-light-bg/80 dark:bg-dark-bg/70 z-10"></div>
            
            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">Kasvatamme</span>
                        <br />
                        Brändejä. Tuloksia.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-light-text/80 dark:text-gray-300 mb-10">
                        Olemme täyden palvelun markkinointitoimisto, joka yhdistää luovuuden, teknologian ja datan saavuttaakseen poikkeuksellisia tuloksia.
                    </p>
                    <Link to="/yhteys" className="inline-block bg-brand-purple text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-brand-purple/50 animate-pulse-glow">
                        Aloita Kasvu
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;