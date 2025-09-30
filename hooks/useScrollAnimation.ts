// FIX: Add missing import for React
import React from 'react';

export const useScrollAnimation = <T extends HTMLElement,>(options?: IntersectionObserverInit): [React.RefObject<T>, boolean] => {
    const ref = React.useRef<T>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};