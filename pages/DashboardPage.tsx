import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        // This is a fallback, ProtectedRoute should handle redirection
        return null;
    }

    return (
        <>
            <SEO 
                title="Hallintapaneeli | Voon Marketing Agency"
                description="Tervetuloa henkilökohtaiseen hallintapaneeliisi."
            />
            <div className="bg-dark-bg min-h-screen">
                <div className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Hallintapaneeli</h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Tervetuloa, <span className="font-bold text-brand-teal">{user.email}</span>!
                        </p>
                        <p className="text-gray-400 mb-12">Tämä on suojattu alue vain kirjautuneille käyttäjille. Tulevaisuudessa täällä voit hallinnoida kampanjoitasi, tarkastella analytiikkaa ja paljon muuta.</p>
                        
                        <button
                            onClick={handleLogout}
                            className="bg-brand-coral text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-opacity-80 transform hover:scale-105"
                        >
                            Kirjaudu ulos
                        </button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
