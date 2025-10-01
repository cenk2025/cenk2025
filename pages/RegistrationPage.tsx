import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import SEO from '../components/SEO.tsx';
import { motion } from 'framer-motion';

const RegistrationPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Salasanat eivät täsmää.');
            return;
        }
        
        setIsLoading(true);
        try {
            await register(email, password);
            setSuccess('Rekisteröinti onnistui! Ohjataan kirjautumiseen...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Rekisteröinti epäonnistui. Yritä uudelleen.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SEO 
                title="Rekisteröidy | Voon Marketing Agency"
                description="Luo Voon-tili päästäksesi käsiksi eksklusiivisiin ominaisuuksiin."
            />
            <div className="bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 py-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-md mx-auto bg-light-card dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-brand-purple/20"
                    >
                        <h1 className="text-3xl font-black text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Luo uusi tili</h1>
                        <p className="text-center text-light-text/80 dark:text-gray-400 mb-8">Aloita matkasi kanssamme.</p>

                        {success ? (
                             <p className="text-green-400 text-center mb-4">{success}</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Sähköposti</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                        className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" 
                                        placeholder="sinun@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Salasana</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                        className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                        placeholder="••••••••"
                                    />
                                </div>
                                 <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Vahvista salasana</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required 
                                        className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                        placeholder="••••••••"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm text-center">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-brand-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-brand-teal disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105"
                                >
                                    {isLoading ? 'Rekisteröidytään...' : 'Rekisteröidy'}
                                </button>
                            </form>
                        )}
                        <p className="text-sm text-center text-gray-500 mt-6">
                            Onko sinulla jo tili?{' '}
                            <Link to="/login" className="font-semibold text-brand-teal hover:underline">
                                Kirjaudu sisään
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default RegistrationPage;