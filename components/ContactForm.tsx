import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => {
            // Mock submission
            setStatus('success');
        }, 1500);
    };

    return (
        <section ref={ref} className="py-20 bg-dark-card">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Valmiina <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">kasvuun?</span></h2>
                        <p className="text-lg text-gray-400 mb-8">Kerro meille projektistasi. Otamme sinuun yhteyttä mahdollisimman pian.</p>
                    </div>

                     <div className="max-w-lg mx-auto">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center p-8 bg-brand-teal/10 border border-brand-teal rounded-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-brand-teal">Kiitos viestistäsi!</h3>
                                    <p className="text-gray-300 mt-2">Olemme sinuun yhteydessä pian.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nimi</label>
                                        <input type="text" name="name" id="name" required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Sähköposti</label>
                                        <input type="email" name="email" id="email" required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Yritys (vapaaehtoinen)</label>
                                        <input type="text" name="company" id="company" className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Viesti</label>
                                        <textarea name="message" id="message" rows={5} required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-brand-purple text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-brand-teal disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105"
                                    >
                                        {status === 'submitting' ? 'Lähetetään...' : 'Lähetä viesti'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;