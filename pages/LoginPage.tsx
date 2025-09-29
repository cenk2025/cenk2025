import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Kirjautuminen epäonnistui.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SEO 
                title="Kirjaudu sisään | Voon Marketing Agency"
                description="Kirjaudu sisään Voon-tilillesi päästäksesi hallintapaneeliin."
            />
            <div className="bg-dark-bg min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 py-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-md mx-auto bg-dark-card p-8 rounded-2xl border border-gray-800 shadow-2xl shadow-brand-purple/20"
                    >
                        <h1 className="text-3xl font-black text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Tervetuloa takaisin</h1>
                        <p className="text-center text-gray-400 mb-8">Kirjaudu sisään jatkaaksesi.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Sähköposti</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" 
                                    placeholder="user@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Salasana</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"
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
                                {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
                            </button>
                            <p className="text-sm text-center text-gray-500">
                                (Testitunnukset: user@example.com / password123)
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
