import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AIChatWidget from './components/AIChatWidget.jsx';
import { useCookieConsent } from './hooks/useCookieConsent.js';
import CookieConsentBanner from './components/CookieConsentBanner.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';


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
                                <Route path="/meista" element={<AboutUsPage />} />
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