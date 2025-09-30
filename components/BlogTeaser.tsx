

import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { BlogPost } from '../types';

interface BlogTeaserProps {
    fullPage?: boolean;
}

export const getCategoryColor = (category: BlogPost['category']) => {
    switch(category) {
        case 'Some': return 'bg-brand-teal text-white';
        case 'Kampanjat': return 'bg-brand-coral text-white';
        case 'Strategia': return 'bg-brand-purple text-white';
        default: return 'bg-gray-500 text-white';
    }
}

const BlogTeaser: React.FC<BlogTeaserProps> = ({ fullPage = false }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
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
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>{post.category}</span>
                                    <p className="text-sm text-gray-500">{post.publishDate}</p>
                                </div>
                                <h3 className="text-xl font-bold mb-2 flex-grow">{post.title}</h3>
                                <p className="text-light-text/80 dark:text-gray-400 mb-4">{post.excerpt}</p>
                                <Link to={`/blogi/${post.id}`} className="font-bold text-brand-teal hover:underline mt-auto">Lue lisää &rarr;</Link>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </section>
    );
};

export default BlogTeaser;