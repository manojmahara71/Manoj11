import React, { useState, useEffect } from 'react';
import Scene from './components/3d/Scene';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Layout, Hexagon } from 'lucide-react';

const Navigation = ({ currentPage, setPage }: { currentPage: string, setPage: (p: string) => void }) => {
    const { config } = useCMS();
    
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-cyber-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div 
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setPage('home')}
                >
                    <Hexagon className="text-cyber-primary group-hover:rotate-180 transition-transform duration-700" />
                    <span className="font-display font-bold text-xl tracking-wider text-white">
                        {config.name.toUpperCase()}
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    {['home', 'blog', 'admin'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setPage(item)}
                            className={`text-sm font-bold uppercase tracking-widest transition-colors relative group ${
                                currentPage === item ? 'text-cyber-primary' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {item}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-primary transform origin-left transition-transform duration-300 ${
                                currentPage === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}></span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

const Footer = () => {
    const { config } = useCMS();
    return (
        <footer className="border-t border-gray-800 bg-cyber-black py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div className="col-span-2">
                    <h2 className="font-display font-bold text-2xl text-white mb-4">{config.name}</h2>
                    <p className="text-gray-500 max-w-sm">{config.subtitle}</p>
                </div>
                <div>
                    <h3 className="text-cyber-primary font-bold uppercase tracking-widest mb-4 text-sm">Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-white cursor-pointer">Projects</li>
                        <li className="hover:text-white cursor-pointer">About</li>
                        <li className="hover:text-white cursor-pointer">Blog</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-cyber-primary font-bold uppercase tracking-widest mb-4 text-sm">Social</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href={config.socials.github} className="hover:text-white">GitHub</a></li>
                        <li><a href={config.socials.linkedin} className="hover:text-white">LinkedIn</a></li>
                        <li><a href={config.socials.twitter} className="hover:text-white">Twitter / X</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-600 text-xs mt-12">
                © {new Date().getFullYear()} {config.name}. SYSTEM.ONLINE.
            </div>
        </footer>
    )
}

const MainLayout = () => {
    const [page, setPage] = useState('home');

    // Simple scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="min-h-screen text-white font-sans selection:bg-cyber-primary selection:text-black">
             {/* Background 3D Scene */}
             {page !== 'admin' && <Scene />}
             
             <Navigation currentPage={page} setPage={setPage} />
             
             <main className="relative z-10">
                {page === 'home' && <Home />}
                {page === 'blog' && <Blog />}
                {page === 'admin' && <Admin />}
             </main>

             {page !== 'admin' && <Footer />}
        </div>
    );
}

export default function App() {
  return (
    <CMSProvider>
        <MainLayout />
    </CMSProvider>
  );
}