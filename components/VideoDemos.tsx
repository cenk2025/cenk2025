import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const VideoDemos: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                         <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Tekoälyllä <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">Toteutetut Videot</span>
                        </h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto">
                            Näytämme, miten muunnamme staattiset kuvat dynaamisiksi, huomiota herättäviksi videomainoksiksi tekoälyn avulla.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <video
                                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                aria-label="Esimerkki tekoälyllä luodusta videomainoksesta 1"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                             <video
                                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                aria-label="Esimerkki tekoälyllä luodusta videomainoksesta 2"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoDemos;