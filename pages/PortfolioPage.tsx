import React from 'react';
import Portfolio from '../components/Portfolio';
import SEO from '../components/SEO';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Referenssimme | Voon Marketing Agency"
        description="Olemme ylpeitä tekemistämme töistä ja saavuttamistamme tuloksista. Selaa portfolioamme nähdäksesi, miten olemme auttaneet asiakkaitamme menestymään."
      />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Referenssimme</h1>
          <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-16">Olemme ylpeitä tekemistämme töistä ja saavuttamistamme tuloksista. Selaa portfolioamme nähdäksesi, miten olemme auttaneet asiakkaitamme menestymään.</p>
          <Portfolio fullPage={true} />
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;