
import React from 'react';
import { PROCESS_DATA } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProcessTimeline: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

    return (
        <section ref={ref} className="py-20 bg-dark-card">
            <div className="container mx-auto px-6">
                 <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Meidän <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">prosessimme</span></h2>
                    <div className="relative">
                        {/* The timeline line */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-800 hidden md:block"></div>

                        {PROCESS_DATA.map((item, index) => (
                            <div key={item.step} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : 'md:flex-row-reverse'}`}>
                               <div className="w-full md:w-5/12">
                                     <div className={`p-8 rounded-2xl border border-gray-800 bg-dark-bg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: `${index * 200}ms`}}>
                                        <h3 className="font-bold text-2xl mb-2 text-brand-teal">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                               </div>
                               <div className="z-10 hidden md:flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isVisible ? 'bg-brand-purple scale-100' : 'bg-gray-700 scale-0'}`} style={{transitionDelay: `${index * 200}ms`}}>
                                        <span className="font-bold">{item.step}</span>
                                    </div>
                               </div>
                                <div className="hidden md:block w-5/12"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
