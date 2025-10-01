import React from 'react';

export const useAnimatedCounter = (targetValue, duration = 2000) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = targetValue;
                    if (start === end) return;

                    const incrementTime = (duration / end);
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start === end) {
                            clearInterval(timer);
                        }
                    }, incrementTime);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [targetValue, duration, ref]);

    return [ref, count];
};