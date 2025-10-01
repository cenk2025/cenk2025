import React from 'react';

// FIX: Added IntersectionObserverInit type for options to improve type safety.
export const useScrollAnimation = (options?: IntersectionObserverInit) => {
    // FIX: Specified HTMLElement for the ref to ensure type compatibility with the 'ref' prop.
    const ref = React.useRef<HTMLElement>(null);
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

    // FIX: Added 'as const' to ensure a tuple type is inferred, resolving destructuring assignment errors.
    return [ref, isVisible] as const;
};
