
import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const StatCounter: React.FC<{ value: number; label: string; suffix: string }> = ({ value, label, suffix }) => {
    const [ref, count] = useAnimatedCounter(value, 1500);
    return (
        <div className="text-center">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">
                <span ref={ref}>{count}</span>{suffix}
            </p>
            <p className="text-gray-400 mt-2">{label}</p>
        </div>
    );
};

const Testimonials: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-dark-bg">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Mitä asiakkaamme <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">sanovat?</span></h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {TESTIMONIALS_DATA.map((testimonial, index) => (
                            <div key={index} className={`bg-dark-card border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center transition-transform duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: `${index * 200}ms`}}>
                                <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-24 h-24 rounded-full mb-6 border-4 border-brand-purple" />
                                <p className="text-lg italic text-gray-300 mb-6">"{testimonial.quote}"</p>
                                <h4 className="font-bold text-xl">{testimonial.author}</h4>
                                <p className="text-brand-teal mb-8">{testimonial.role}</p>
                                <StatCounter value={testimonial.kpi.value} label={testimonial.kpi.label} suffix={testimonial.kpi.suffix} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
