import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CyberCard, SectionTitle } from '../components/ui/CyberComponents';
import { Calendar, Eye, Tag, Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import { Article } from '../types';

const ShareActions = ({ article, className = "" }: { article: Article, className?: string }) => {
  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(`${window.location.origin}?article=${article.slug}`) : '';
  const shareTitle = encodeURIComponent(article.title);

  const handleShare = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
        <Share2 size={12} /> Share
      </span>
      <div className="flex gap-2">
        <button 
            onClick={(e) => handleShare(e, `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`)}
            className="p-1.5 border border-gray-800 bg-black/50 hover:border-cyber-primary text-gray-400 hover:text-[#1DA1F2] transition-all duration-300"
            title="Share on Twitter"
        >
            <Twitter size={14} />
        </button>
        <button 
            onClick={(e) => handleShare(e, `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)}
            className="p-1.5 border border-gray-800 bg-black/50 hover:border-cyber-primary text-gray-400 hover:text-[#0A66C2] transition-all duration-300"
            title="Share on LinkedIn"
        >
            <Linkedin size={14} />
        </button>
        <button 
            onClick={(e) => handleShare(e, `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)}
            className="p-1.5 border border-gray-800 bg-black/50 hover:border-cyber-primary text-gray-400 hover:text-[#1877F2] transition-all duration-300"
            title="Share on Facebook"
        >
            <Facebook size={14} />
        </button>
      </div>
    </div>
  );
};

export default function Blog() {
  const { articles, config } = useCMS();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const publishedArticles = articles.filter(a => a.status === 'published');

  if (selectedArticleId) {
    const article = articles.find(a => a.id === selectedArticleId);
    if (!article) return <div>Article not found</div>;

    return (
      <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
        <button 
          onClick={() => setSelectedArticleId(null)}
          className="mb-8 text-cyber-primary hover:text-white flex items-center gap-2 uppercase text-sm tracking-widest transition-colors"
        >
          ← Return to Data Stream
        </button>

        <article className="prose prose-invert prose-lg max-w-none relative z-10">
          {/* Single View Cover Image */}
          <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden border border-gray-800 group rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <img 
                src={article.coverImage || `https://picsum.photos/seed/${article.id}/1200/600`} 
                alt={article.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-70"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8 border-b border-gray-800 pb-8">
            <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(article.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-2 text-cyber-primary"><Tag size={14} /> {article.category}</span>
            <span className="flex items-center gap-2"><Eye size={14} /> {article.views} reads</span>
          </div>

          {/* AdSense Placement */}
          {config.adsenseId && (
            <div className="my-8 p-8 border border-dashed border-gray-700 bg-gray-900/50 flex flex-col items-center justify-center text-gray-500">
               <span className="text-xs uppercase tracking-widest mb-2">Advertisement System</span>
               <div className="w-full h-24 bg-gray-800 animate-pulse rounded"></div>
            </div>
          )}

          <div className="font-sans text-gray-300 leading-relaxed whitespace-pre-wrap mb-12">
            {article.content}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="bg-cyber-panel border border-gray-800 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-lg font-display font-bold text-white">Share Transmission</h3>
                <ShareActions article={article} />
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Data Streams" subtitle="Thoughts, tutorials, and tech insights" />

        <div className="grid md:grid-cols-2 gap-8">
          {publishedArticles.map(article => (
            <CyberCard key={article.id} className="group hover:border-cyber-secondary cursor-pointer flex flex-col">
              <div onClick={() => setSelectedArticleId(article.id)} className="flex-grow">
                
                {/* Card Cover Image */}
                <div className="relative h-48 mb-4 overflow-hidden border-b border-gray-800 bg-black group-hover:border-cyber-primary/50 transition-colors">
                    <img 
                        src={article.coverImage || `https://picsum.photos/seed/${article.id}/800/400`} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-cyber-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-cyber-primary border border-cyber-primary px-2 py-0.5 rounded-sm uppercase">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-2xl font-display text-white mb-3 group-hover:text-cyber-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">#{tag}</span>
                    ))}
                    {article.tags.length > 2 && <span className="text-[10px] text-gray-500">+{article.tags.length - 2}</span>}
                </div>
                <ShareActions article={article} />
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </div>
  );
}