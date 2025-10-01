import React from 'react';
// FIX: Imported Variants type from framer-motion.
import { motion, useInView, Variants } from 'framer-motion';
import { PROCESS_DATA } from '../constants.jsx';

const ProcessTimeline = () => {
    const ref = React.useRef(null);
    // Trigger animation when 20% of the component is in view, and only run it once.
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const timelineVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.4, // Each step animates after the previous one
            },
        },
    };

    // Animate the vertical line growing from the top
    // FIX: Explicitly typed variants with Variants to fix type incompatibility issues with framer-motion's API.
    const lineVariants: Variants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: { duration: 1, ease: 'easeOut' },
        },
    };

    // Variants for each step container, animating from left or right based on position
    // FIX: Explicitly typed variants with Variants to fix type incompatibility issues with framer-motion's API.
    const stepVariants: Variants = {
        hidden: (index) => ({
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
        }),
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    // Variants for the circle number indicator
    // FIX: Explicitly typed variants with Variants to fix type incompatibility issues with framer-motion's API.
    const circleVariants: Variants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
    };

    return (
        <section className="py-20 bg-light-card dark:bg-dark-card">
            {/* The ref on the outer container triggers the animation for the whole section */}
            <div ref={ref} className="container mx-auto px-6">
                 {/* The main motion container that controls the animation sequence */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
                        Meidän <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">prosessimme</span>
                    </h2>
                    <div className="relative">
                        {/* The timeline line container (desktop only) */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800 hidden md:block">
                            {/* The animated part of the line that "draws" itself */}
                            <motion.div
                                className="w-full h-full bg-gradient-to-b from-brand-purple to-brand-teal"
                                style={{ originY: 0 }}
                                variants={lineVariants}
                            />
                        </div>

                        <motion.div variants={timelineVariants}>
                            {PROCESS_DATA.map((item, index) => (
                                // This motion component wraps each step, applying staggered animations
                                <motion.div
                                    key={item.step}
                                    custom={index}
                                    variants={stepVariants}
                                    // This class creates the zig-zag layout on desktop and a simple stack on mobile
                                    className={`mb-8 flex justify-between items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="w-full md:w-5/12">
                                        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-light-bg dark:bg-dark-bg transition-all duration-300 hover:border-brand-teal hover:shadow-lg hover:shadow-brand-teal/10">
                                            <h3 className="font-bold text-2xl mb-2 text-brand-teal">{item.title}</h3>
                                            <p className="text-light-text/80 dark:text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="z-10 hidden md:flex items-center">
                                        {/* Animate the circle to pop into view */}
                                        <motion.div
                                            variants={circleVariants}
                                            className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-dark-text"
                                        >
                                            <span className="font-bold">{item.step}</span>
                                        </motion.div>
                                    </div>
                                    <div className="hidden md:block w-5/12"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
