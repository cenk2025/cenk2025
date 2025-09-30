

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
        return <Navigate to="/blogi" replace />;
    }

    const pageUrl = window.location.href;

    // A simple markdown-to-HTML parser for demonstration
    const renderContent = (content: string) => {
        const paragraphs = content.trim().split('\n').filter(p => p.trim() !== '');
        
        const elements: React.ReactNode[] = [];
        let listItems: React.ReactNode[] = [];

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-lg leading-relaxed text-light-text/90 dark:text-gray-300">{listItems}</ul>);
                listItems = [];
            }
        };

        paragraphs.forEach((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
                flushList();
                elements.push(<h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-brand-teal">{paragraph.substring(4)}</h3>);
            } else if (paragraph.match(/^(\d+\.|-|\*)\s/)) {
                listItems.push(<li key={index}>{paragraph.replace(/^(\d+\.|-|\*)\s/, '')}</li>);
            } else {
                flushList();
                elements.push(<p key={index} className="mb-6 text-lg leading-relaxed text-light-text/90 dark:text-gray-300">{paragraph}</p>);
            }
        });

        flushList(); // Add any remaining list items
        return elements;
    };

    return (
        <>
            <SEO 
                title={`${post.title} | Voon Blogi`}
                description={post.excerpt}
                imageUrl={post.imageUrl}
                type="article"
            />
            <div className="bg-light-bg dark:bg-dark-bg py-20">
                <div className="container mx-auto px-6">
                    <motion.article 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto bg-light-card dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg"
                    >
                        <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
                        <div className="p-6 md:p-12">
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${getCategoryColor(post.category)}`}>
                                        {post.category}
                                    </span>
                                    <p className="text-sm text-gray-500">{post.publishDate}</p>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-light-text dark:text-dark-text leading-tight">
                                    {post.title}
                                </h1>
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                {renderContent(post.content)}
                            </div>

                            <hr className="my-12 border-gray-200 dark:border-gray-700" />
                            
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <SocialShareButtons url={pageUrl} title={post.title} />
                                <Link to="/blogi" className="font-bold text-brand-purple hover:underline">
                                    &larr; Takaisin blogiin
                                </Link>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </div>
        </>
    );
};

export default BlogDetailPage;