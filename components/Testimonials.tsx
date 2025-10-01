import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';
import { Link } from 'react-router-dom';

const PilotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const RiskFreeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
);

const Testimonials = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
                        Aloita kanssamme, <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">riskittä</span>
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        
                        <div className={`bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col transition-transform duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: `0ms`}}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 text-brand-teal bg-brand-teal/10 p-3 rounded-lg">
                                    <PilotIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-2xl">Pilottikumppaneita haussa</h3>
                                </div>
                            </div>
                            <p className="text-light-text/80 dark:text-gray-400 mb-6 flex-grow">
                                “Etsimme kahta pilottikumppania testaamaan tekoälypohjaisia markkinointiratkaisuja. Tavoite: mitattava vaikutus 30 päivässä (liidit, konversio tai sisältönopeus).”
                            </p>
                            <div className="mt-auto">
                                <p className="text-sm text-light-text/80 dark:text-gray-400 mb-4">Anna mahdollisuus: Varaa 20 min sparraus &darr;</p>
                                <Link to="/yhteys" className="w-full text-center block bg-brand-purple text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">
                                    Pyydä pilotti
                                </Link>
                            </div>
                        </div>

                        <div className={`bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col transition-transform duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: `200ms`}}>
                             <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 text-brand-coral bg-brand-coral/10 p-3 rounded-lg">
                                    <RiskFreeIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-2xl">Nopean kokeilun lupaus</h3>
                                </div>
                            </div>
                            <p className="text-light-text/80 dark:text-gray-400 mb-6 flex-grow">
                                “Aloitamme viikossa. Jos ensimmäisen sprintin (7–10 pv) jälkeen emme tuota sovittua hyötyä, et maksa sprintistä.”
                            </p>
                            <div className="mt-auto">
                                <p className="text-sm text-light-text/80 dark:text-gray-400 mb-4">Toimitus: min. 1 AI-agentti + 1 automaatio + raportti &darr;</p>
                                <Link to="/yhteys" className="w-full text-center block bg-brand-coral text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">
                                    Aloita riskittä
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;