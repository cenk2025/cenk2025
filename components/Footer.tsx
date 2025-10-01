import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Voon</h3>
                        <p className="mt-4 text-light-text/70 dark:text-dark-text/70">Kasvatamme brändejä digitaalisessa maailmassa.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Pikavalikko</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/palvelut" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Palvelut</Link></li>
                            <li><Link to="/referenssit" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Referenssit</Link></li>
                            <li><Link to="/meista" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Meistä</Link></li>
                            <li><Link to="/blogi" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Blogi</Link></li>
                            <li><Link to="/yhteys" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Ota yhteyttä</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Seuraa meitä</h4>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-purple transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <a href="#" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-purple transition-colors">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.616 4.22 3.764 4.66-1.037.284-2.153.331-3.26.126.652 2.023 2.523 3.32 4.649 3.369-1.88 1.474-4.249 2.355-6.849 2.053 2.223 1.438 4.862 2.266 7.692 2.266 9.227 0 14.28-7.653 14.03-14.532.937-.677 1.75-1.523 2.4-2.493z"/></svg>
                            </a>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg">Uutiskirje</h4>
                        <p className="mt-4 text-light-text/70 dark:text-dark-text/70 text-sm">Saa uusimmat markkinointivinkit suoraan sähköpostiisi.</p>
                        <form className="mt-4 flex">
                            <input type="email" placeholder="Sähköpostisi" className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-teal"/>
                            <button type="submit" className="bg-brand-teal text-white font-bold px-4 rounded-r-md hover:bg-opacity-80 transition-colors">Tilaa</button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-light-text/50 dark:text-dark-text/50">
                    <p>&copy; {new Date().getFullYear()} Voon Marketing Agency. Kaikki oikeudet pidätetään.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;