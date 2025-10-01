import React from 'react';
import BlogTeaser from '../components/BlogTeaser.tsx';
import SEO from '../components/SEO.tsx';

const BlogPage = () => {
  return (
    <>
      <SEO 
        title="Blogi | Voon Marketing Agency"
        description="Pysy ajan tasalla digitaalisen markkinoinnin viimeisimmistä trendeistä, vinkeistä ja strategioista. Täältä löydät asiantuntijoidemme näkemyksiä."
      />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Blogi</h1>
          <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-16">Pysy ajan tasalla digitaalisen markkinoinnin viimeisimmistä trendeistä, vinkeistä ja strategioista. Täältä löydät asiantuntijoidemme näkemyksiä.</p>
          <BlogTeaser fullPage={true} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;