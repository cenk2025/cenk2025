
import React from 'react';
import { PORTFOLIO_DATA } from '../constants.tsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts';

interface PortfolioProps {
    fullPage?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ fullPage = false }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
    const itemsToShow = fullPage ? PORTFOLIO_DATA : PORTFOLIO_DATA.slice(0, 4);

    return (
        <section ref={ref} className="py-20 bg-light-card dark:bg-dark-card">
            <div className="container mx-auto px-6">
                {!fullPage && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Meidän <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">töitämme</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-2xl mx-auto">Emme vain puhu tuloksista – me luomme niitä. Katso, miten olemme auttaneet asiakkaitamme menestymään.</p>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {itemsToShow.map((item, index) => (
                        <div 
                            key={item.id}
                            className={`group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            style={{transitionDelay: `${index * 150}ms`}}
                        >
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className="text-sm font-semibold bg-brand-teal text-white px-3 py-1 rounded-full self-start mb-2">{item.category}</span>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/90 mb-4">{item.excerpt}</p>
                                <div className="flex space-x-6">
                                    {item.metrics.map(metric => (
                                        <div key={metric.label}>
                                            <p className="text-2xl font-bold text-white">{metric.value}</p>
                                            <p className="text-sm text-white/70">{metric.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
