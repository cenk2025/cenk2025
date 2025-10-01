import React from 'react';
import SEO from '../components/SEO.jsx';
import { motion } from 'framer-motion';
import { VALUES_DATA, TEAM_DATA } from '../constants.jsx';
import TeamMemberCard from '../components/TeamMemberCard.jsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

const AboutUsPage = () => {
    const [valuesRef, valuesInView] = useScrollAnimation({ threshold: 0.2 });
    const [teamRef, teamInView] = useScrollAnimation({ threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <SEO 
                title="Meistä | Voon Marketing Agency"
                description="Opi tuntemaan Voonin tarina, tiimi ja arvot. Olemme dataohjattu ja luova markkinointitoimisto, joka on sitoutunut asiakkaidemme menestykseen."
            />
            <div className="bg-light-bg dark:bg-dark-bg">
                {/* Hero Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="py-24 text-center bg-light-card dark:bg-dark-card"
                >
                    <div className="container mx-auto px-6">
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal"
                        >
                            Keitä me olemme?
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto"
                        >
                            Olemme joukko intohimoisia markkinoinnin ammattilaisia, teknologia-asiantuntijoita ja luovia sieluja, jotka uskovat dataohjautuvan ja ihmisläheisen markkinoinnin voimaan.
                        </motion.p>
                    </div>
                </motion.section>

                {/* Mission & Vision Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-3xl font-bold mb-4 text-brand-purple">Missiomme</h2>
                                <p className="text-lg leading-relaxed text-light-text/90 dark:text-gray-300">
                                    Auttaa yrityksiä hyödyntämään uusinta teknologiaa ja tekoälyä markkinoinnissaan, luoden mitattavaa kasvua ja syvempiä asiakassuhteita.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-3xl font-bold mb-4 text-brand-teal">Visiomme</h2>
                                <p className="text-lg leading-relaxed text-light-text/90 dark:text-gray-300">
                                    Olla Suomen johtava tekoälypohjaisen markkinoinnin strateginen kumppani, joka tunnetaan innovatiivisuudesta, tuloksellisuudesta ja läpinäkyvyydestä.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section ref={valuesRef} className="py-20 bg-light-card dark:bg-dark-card">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-black mb-12">Arvomme</h2>
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate={valuesInView ? "visible" : "hidden"}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {VALUES_DATA.map((value) => (
                                <motion.div 
                                    key={value.title} 
                                    variants={itemVariants}
                                    className="p-8 rounded-2xl bg-light-bg dark:bg-dark-bg border border-gray-200 dark:border-gray-800"
                                >
                                    <div className="inline-block text-brand-coral bg-brand-coral/10 p-4 rounded-full mb-6">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-light-text/80 dark:text-gray-400">{value.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section ref={teamRef} className="py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-black mb-12">Tapaa <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">tiimimme</span></h2>
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate={teamInView ? "visible" : "hidden"}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {TEAM_DATA.map((member) => (
                                <motion.div key={member.id} variants={itemVariants}>
                                    <TeamMemberCard member={member} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutUsPage;