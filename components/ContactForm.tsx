import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';
import { motion, AnimatePresence } from 'framer-motion';

// --- Email Sending Service (Simulation) ---
const sendContactEmail = async (formData) => {
    // --- CRITICAL SECURITY WARNING ---
    // In a real production application, you would NEVER handle email sending
    // or use SMTP credentials on the client-side. This is a major security risk.
    //
    // The correct implementation is to send the form data to a secure backend
    // API endpoint. That endpoint would then use the SMTP credentials (stored
    // securely as environment variables on the server) to send the email.
    //
    // This function simulates that backend call for demonstration purposes only.
    console.warn("SECURITY WARNING: Simulating email sending. In a real app, this MUST be a backend API call.");
    console.log("Form data that would be sent to the backend:", formData);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful response from the server.
    // In a real scenario, you'd check if the form data is valid before assuming success.
    if (formData.name && formData.email && formData.message) {
         return { success: true, message: "Email sent successfully!" };
    } else {
         return { success: false, message: "Required fields are missing." };
    }
};
// --- End Email Sending Service ---


const ContactForm = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    const [status, setStatus] = React.useState('idle');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = {
            name: form.elements.namedItem('name').value,
            email: form.elements.namedItem('email').value,
            company: form.elements.namedItem('company').value,
            message: form.elements.namedItem('message').value,
        };

        try {
            const response = await sendContactEmail(formData);
            if (response.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Lähetys epäonnistui. Tarkista tiedot.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Odottamaton virhe tapahtui. Yritä uudelleen myöhemmin.');
        }
    };

    return (
        <section ref={ref} className="py-20 bg-light-card dark:bg-dark-card">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Valmiina <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">kasvuun?</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 mb-8">Kerro meille projektistasi. Otamme sinuun yhteyttä mahdollisimman pian.</p>
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
                                    <p className="text-light-text/90 dark:text-gray-300 mt-2">Olemme sinuun yhteydessä pian.</p>
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
                                        <label htmlFor="name" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Nimi</label>
                                        <input type="text" name="name" id="name" required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Sähköposti</label>
                                        <input type="email" name="email" id="email" required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Yritys (vapaaehtoinen)</label>
                                        <input type="text" name="company" id="company" className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Viesti</label>
                                        <textarea name="message" id="message" rows={5} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                                    </div>
                                    
                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                                    )}
                                    
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