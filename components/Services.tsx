
import React from 'react';
import { SERVICES_DATA } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Miten me <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">autamme?</span></h2>
                    <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-12">Yhdistämme strategian, luovuuden ja teknologian tuottaaksemme mitattavia tuloksia.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SERVICES_DATA.map((service, index) => (
                            <div 
                                key={index}
                                className={`bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center transform transition-all duration-500 hover:scale-105 hover:border-brand-teal hover:shadow-2xl hover:shadow-brand-teal/20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="inline-block text-brand-teal bg-brand-teal/10 p-4 rounded-full mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-light-text/80 dark:text-gray-400">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;