

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import AIChatWidget from './components/AIChatWidget.tsx';
import { useCookieConsent } from './hooks/useCookieConsent.ts';
import CookieConsentBanner from './components/CookieConsentBanner.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import BlogDetailPage from './pages/BlogDetailPage.tsx';


// --- Theme Provider Logic ---
interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Fix: Refactored ThemeProvider to use React.FC for more explicit and robust typing to resolve the 'missing children' error.
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (userPrefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
// --- End Theme Provider Logic ---


const ScrollToTop = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    const { consentStatus, acceptConsent, rejectConsent } = useCookieConsent();

    return (
        <ThemeProvider>
            <AuthProvider>
                <HashRouter>
                    <ScrollToTop />
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/palvelut" element={<ServicesPage />} />
                                <Route path="/referenssit" element={<PortfolioPage />} />
                                <Route path="/blogi" element={<BlogPage />} />
                                <Route path="/blogi/:postId" element={<BlogDetailPage />} />
                                <Route path="/yhteys" element={<ContactPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/rekisteroidy" element={<RegistrationPage />} />
                                <Route 
                                    path="/dashboard" 
                                    element={
                                        <ProtectedRoute>
                                            <DashboardPage />
                                        </ProtectedRoute>
                                    } 
                                />
                            </Routes>
                        </main>
                        <Footer />
                        <AIChatWidget />
                        {consentStatus === 'pending' && (
                            <CookieConsentBanner
                                onAccept={acceptConsent}
                                onReject={rejectConsent}
                            />
                        )}
                    </div>
                </HashRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;