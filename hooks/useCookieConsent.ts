// FIX: Add missing import for React
import React from 'react';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

const COOKIE_CONSENT_KEY = 'voon_cookie_consent';

export const useCookieConsent = () => {
    const [consentStatus, setConsentStatus] = React.useState<ConsentStatus>('pending');

    React.useEffect(() => {
        const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (storedConsent === 'accepted' || storedConsent === 'rejected') {
            setConsentStatus(storedConsent);
        }
    }, []);

    const acceptConsent = React.useCallback(() => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        setConsentStatus('accepted');
        // Placeholder for initializing analytics scripts
        console.log("Analytics and marketing cookies accepted.");
    }, []);

    const rejectConsent = React.useCallback(() => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
        setConsentStatus('rejected');
        // Placeholder for ensuring non-essential scripts are not loaded
        console.log("Analytics and marketing cookies rejected.");
    }, []);

    return { consentStatus, acceptConsent, rejectConsent };
};