

import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentBannerProps {
    onAccept: () => void;
    onReject: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept, onReject }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-dark-card/90 backdrop-blur-md border-t border-gray-800"
                aria-live="polite"
                role="dialog"
                aria-modal="true"
                aria-label="Evästeiden suostumusbanneri"
            >
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-white">Evästekäytäntömme</h3>
                        <p className="text-sm text-gray-300 max-w-2xl">
                            Käytämme evästeitä parantaaksemme sivustomme käyttökokemusta ja analysoidaksemme liikennettä. Hyväksymällä sallit ei-välttämättömien evästeiden käytön.
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <button
                            onClick={onReject}
                            className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-full transition-colors hover:bg-gray-600"
                        >
                            Vain välttämättömät
                        </button>
                        <button
                            onClick={onAccept}
                            className="bg-brand-teal text-white font-bold py-2 px-6 rounded-full transition-colors hover:bg-opacity-80"
                        >
                            Hyväksy kaikki
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CookieConsentBanner;