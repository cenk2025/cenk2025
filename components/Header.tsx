import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { useAuth } from '../contexts/AuthContext';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

const MenuIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


const NavLinks = ({ onClick, isUser }: { onClick?: () => void, isUser: boolean }) => {
    const activeLinkStyle = {
        background: 'linear-gradient(to right, #6f42c1, #20c997)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    return (
        <>
            <NavLink to="/palvelut" onClick={onClick} className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Palvelut</NavLink>
            <NavLink to="/referenssit" onClick={onClick} className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Referenssit</NavLink>
            <NavLink to="/blogi" onClick={onClick} className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Blogi</NavLink>
            {isUser && <NavLink to="/dashboard" onClick={onClick} className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Dashboard</NavLink>}
        </>
    );
};


const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };
    
    return (
        <header className={`sticky top-0 z-40 w-full backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-lg bg-light-bg/95 dark:bg-dark-bg/95 border-b border-gray-200 dark:border-gray-800' : 'bg-light-bg/80 dark:bg-dark-bg/80 border-b border-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">
                    Voon
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLinks isUser={!!user} />
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
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Avaa valikko">
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                 <div className="md:hidden absolute top-full left-0 w-full bg-light-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex flex-col items-center space-y-4">
                        <NavLinks onClick={() => setIsMenuOpen(false)} isUser={!!user} />
                        {user ? (
                             <button onClick={handleLogout} className="w-full text-center bg-brand-coral text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">
                                Kirjaudu ulos
                            </button>
                        ) : (
                             <>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-600">
                                    Kirjaudu sisään
                                </Link>
                                <Link to="/yhteys" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-brand-purple text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">
                                    Ota yhteyttä
                                </Link>
                             </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;