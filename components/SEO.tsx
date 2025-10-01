import React from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://voon.fi';
const DEFAULT_IMAGE_URL = `https://picsum.photos/seed/voon-og-image/1200/630`;
const SITE_NAME = 'Voon Marketing Agency';

const SEO = ({ 
    title, 
    description, 
    imageUrl = DEFAULT_IMAGE_URL,
    type = 'website'
}) => {
    const location = useLocation();
    const canonicalUrl = `${SITE_URL}/#${location.pathname}`;

    React.useEffect(() => {
        document.title = title;

        const setMetaTag = (attr, value, content) => {
            const selector = `meta[${attr}='${value}']`;
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, value);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard Meta Tags
        setMetaTag('name', 'description', description);
        
        // Open Graph Tags
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:type', type);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('property', 'og:site_name', SITE_NAME);
        setMetaTag('property', 'og:image', imageUrl);

        // Twitter Card Tags
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setMetaTag('name', 'twitter:image', imageUrl);

    }, [title, description, imageUrl, type, canonicalUrl]);

    return null;
};

export default SEO;