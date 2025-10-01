import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../constants.jsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

const Portfolio = ({ fullPage = false }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const [activeFilter, setActiveFilter] = React.useState('Kaikki');

    const categories = ['Kaikki', ...Array.from(new Set(PORTFOLIO_DATA.map(item => item.category)))];

    const filteredItems = fullPage
        ? PORTFOLIO_DATA.filter(item => activeFilter === 'Kaikki' || item.category === activeFilter)
        : PORTFOLIO_DATA.slice(0, 4);

    const gridVariants = {
        visible: {
            transition: { staggerChildren: 0.1 }
        },
        hidden: {}
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    return (
        <section ref={ref} className="py-20 bg-light-card dark:bg-dark-card">
            <div className="container mx-auto px-6">
                {!fullPage && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Meidän <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">töitämme</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-2xl mx-auto">Emme vain puhu tuloksista – me luomme niitä. Katso, miten olemme auttaneet asiakkaitamme menestymään.</p>
                    </div>
                )}

                {fullPage && (
                    <div className="flex justify-center flex-wrap gap-4 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ease-in-out ${
                                    activeFilter === category
                                        ? 'bg-brand-teal text-white shadow-lg'
                                        : 'bg-light-bg dark:bg-dark-bg text-light-text/80 dark:text-dark-text/80 hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                <motion.div
                    layout
                    variants={gridVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <AnimatePresence>
                        {filteredItems.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                variants={itemVariants}
                                exit="exit"
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800"
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;