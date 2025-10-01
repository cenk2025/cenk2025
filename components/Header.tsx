// FIX: Add missing import for React
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
// FIX: Import 'Variants' type to fix type errors with framer-motion animations
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

const MenuIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const activeLinkStyle = {
    background: 'linear-gradient(to right, #6f42c1, #20c997)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
};

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const coreServices = SERVICES_DATA.slice(0, 3);
    const aiServices = SERVICES_DATA.slice(3, 6);

    // Scroll detection for header style
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Body scroll lock for mobile menu
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };
    
    // Animation variants for Framer Motion
    const mobileMenuVariants: Variants = {
        hidden: { opacity: 0, transition: { when: "afterChildren" } },
        visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
    };

    const mobileNavItemVariants: Variants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
    };

    return (
        <header className={`sticky top-0 z-40 w-full backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-lg bg-light-bg/95 dark:bg-dark-bg/95 border-b border-gray-200 dark:border-gray-800' : 'bg-light-bg/80 dark:bg-dark-bg/80 border-b border-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">
                    Voon
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                     <div 
                        className="relative"
                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                        <NavLink 
                            to="/palvelut" 
                            className="font-semibold transition-colors hover:text-brand-teal flex items-center gap-1"
                            style={({isActive}) => isActive ? activeLinkStyle : {}}
                        >
                            Palvelut
                            <ChevronDownIcon />
                        </NavLink>
                        
                        <AnimatePresence>
                            {isMegaMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-4xl z-50"
                                >
                                    <div className="overflow-hidden rounded-2xl shadow-2xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 p-8">
                                            <div>
                                                <h3 className="text-sm font-semibold tracking-wider text-brand-purple uppercase mb-4">Asiakashankinta & Myynti</h3>
                                                <div className="space-y-1">
                                                    {coreServices.map(service => (
                                                        <Link 
                                                            key={service.title} 
                                                            to="/palvelut" 
                                                            className="group flex items-start p-3 -m-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                                            onClick={() => setIsMegaMenuOpen(false)}
                                                        >
                                                            <div className="flex-shrink-0 text-brand-teal bg-brand-teal/10 p-3 rounded-lg group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                                                                {service.icon}
                                                            </div>
                                                            <div className="ml-4">
                                                                <p className="font-bold text-light-text dark:text-dark-text">{service.title}</p>
                                                                <p className="text-sm text-light-text/70 dark:text-dark-text/70 mt-1">{service.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                 <h3 className="text-sm font-semibold tracking-wider text-brand-coral uppercase mb-4">Konversio & Mittaus</h3>
                                                <div className="space-y-1">
                                                    {aiServices.map(service => (
                                                        <Link 
                                                            key={service.title} 
                                                            to="/palvelut" 
                                                            className="group flex items-start p-3 -m-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                                            onClick={() => setIsMegaMenuOpen(false)}
                                                        >
                                                            <div className="flex-shrink-0 text-brand-coral bg-brand-coral/10 p-3 rounded-lg group-hover:bg-brand-coral group-hover:text-white transition-colors duration-300">
                                                                {service.icon}
                                                            </div>
                                                            <div className="ml-4">
                                                                <p className="font-bold text-light-text dark:text-dark-text">{service.title}</p>
                                                                <p className="text-sm text-light-text/70 dark:text-dark-text/70 mt-1">{service.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <NavLink to="/referenssit" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Referenssit</NavLink>
                    <NavLink to="/meista" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Meistä</NavLink>
                    <NavLink to="/blogi" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Blogi</NavLink>
                    {user && <NavLink to="/dashboard" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Dashboard</NavLink>}
                </nav>
                <div className="flex items-center space-x-4">
                     <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <button onClick={handleLogout} className="bg-brand-coral text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">
                                Kirjaudu ulos
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="font-semibold transition-colors hover:text-brand-teal">
                                    Kirjaudu sisään
                                </Link>
                                <Link to="/yhteys" className="bg-brand-purple text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">
                                    Ota yhteyttä
                                </Link>
                            </>
                        )}
                     </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Vaihda teemaa">
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Avaa valikko" className="relative z-50">
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="md:hidden fixed inset-0 bg-light-card dark:bg-dark-bg z-30 pt-24"
                    >
                        <div className="container mx-auto px-6 h-full flex flex-col">
                            <nav className="flex flex-col items-center space-y-6">
                                <motion.div variants={mobileNavItemVariants}>
                                    <NavLink to="/palvelut" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Palvelut</NavLink>
                                </motion.div>
                                <motion.div variants={mobileNavItemVariants}>
                                    <NavLink to="/referenssit" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Referenssit</NavLink>
                                </motion.div>
                                <motion.div variants={mobileNavItemVariants}>
                                    <NavLink to="/meista" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Meistä</NavLink>
                                </motion.div>
                                <motion.div variants={mobileNavItemVariants}>
                                    <NavLink to="/blogi" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Blogi</NavLink>
                                </motion.div>
                                {user && (
                                    <motion.div variants={mobileNavItemVariants}>
                                        <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Dashboard</NavLink>
                                    </motion.div>
                                )}
                            </nav>

                            <div className="mt-auto pb-8 space-y-4">
                                {user ? (
                                    <motion.div variants={mobileNavItemVariants}>
                                        <button onClick={handleLogout} className="w-full text-center bg-brand-coral text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">
                                            Kirjaudu ulos
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <motion.div variants={mobileNavItemVariants}>
                                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-gray-200 dark:bg-gray-800 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700">
                                                Kirjaudu sisään
                                            </Link>
                                        </motion.div>
                                        <motion.div variants={mobileNavItemVariants}>
                                            <Link to="/yhteys" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-brand-purple text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">
                                                Ota yhteyttä
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;