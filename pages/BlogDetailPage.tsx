
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants';
import SEO from '../components/SEO';
import { getCategoryColor } from '../components/BlogTeaser';
import SocialShareButtons from '../components/SocialShareButtons';
import { motion } from 'framer-motion';

const BlogDetailPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const post = BLOG_POSTS_DATA.find(p => p.id === Number(postId));

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    const pageUrl = window.location.href;

    // A simple markdown-to-HTML parser for demonstration
    const renderContent = (content: string) => {
        return content
            .split('\n')
            .map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-brand-teal">{paragraph.substring(4)}</h3>;
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('* ')) {
                     return <li key={index} className="ml-6 mb-2 list-disc">{paragraph.substring(2)}</li>
                }
                if (paragraph.trim() === '') {
                    return null;
                }
                return <p key={index} className="mb-6 text-lg leading-relaxed text-gray-300">{paragraph}</p>;
            })
            .filter(Boolean); // Remove nulls from empty lines
    };


    return (
        <>
            <SEO 
                title={`${post.title} | Voon Blogi`}
                description={post.excerpt}
                imageUrl={post.imageUrl}
                type="article"
            />
            <div className="bg-dark-bg text-dark-text py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-6"
                >
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-12 text-center">
                             <Link to="/blogi" className="text-brand-teal hover:underline mb-4 inline-block">&larr; Takaisin blogiin</Link>
                            <div className="flex justify-center items-center gap-4 mb-4">
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                                    {post.category}
                                </span>
                                <span className="text-gray-400 text-sm">{post.publishDate}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">
                                {post.title}
                            </h1>
                        </header>

                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-12 shadow-lg" />
                        
                        <article className="prose prose-invert lg:prose-xl max-w-none">
                            {renderContent(post.content)}
                        </article>

                        <div className="mt-16 pt-8 border-t border-gray-800">
                           <SocialShareButtons url={pageUrl} title={post.title} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default BlogDetailPage;
