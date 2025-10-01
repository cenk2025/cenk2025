import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants.tsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts';

export const getCategoryColor = (category) => {
    switch(category) {
        case 'Some': return 'bg-brand-teal text-white';
        case 'Kampanjat': return 'bg-brand-coral text-white';
        case 'Strategia': return 'bg-brand-purple text-white';
        default: return 'bg-gray-500 text-white';
    }
}

const BlogTeaser = ({ fullPage = false }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const posts = fullPage ? BLOG_POSTS_DATA : BLOG_POSTS_DATA.slice(0, 3);

    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                 {!fullPage && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Uusimmat <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">näkemykset</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-2xl mx-auto">Pysy kärryillä markkinoinnin uusimmista tuulista asiantuntijoidemme blogista.</p>
                    </div>
                 )}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div 
                           key={post.id} 
                           className={`bg-light-card dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-500 hover:border-brand-purple hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                           style={{transitionDelay: `${index * 150}ms`}}
                        >
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-4">
                                    <span className={`text-sm font-bold px-3 py-1 rounded-full self-start ${getCategoryColor(post.category)}`}>
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.publishDate}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 flex-grow">
                                    <Link to={`/blogi/${post.id}`} className="hover:text-brand-purple transition-colors">
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-light-text/70 dark:text-gray-400 mb-4">{post.excerpt}</p>
                                <div className="mt-auto">
                                    <Link to={`/blogi/${post.id}`} className="font-bold text-brand-teal hover:underline">
                                        Lue lisää &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 {!fullPage && (
                    <div className="text-center mt-16">
                        <Link to="/blogi" className="inline-block bg-brand-purple text-white font-bold text-lg py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-purple/50">
                            Kaikki artikkelit
                        </Link>
                    </div>
                 )}
            </div>
        </section>
    );
};

export default BlogTeaser;