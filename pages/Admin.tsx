import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CyberButton, StatCard } from '../components/ui/CyberComponents';
import { BarChart, Users, FileText, Settings, Shield, Plus, Trash, Save, Cpu, Eye, X, Calendar, Tag, Image as ImageIcon } from 'lucide-react';
import { Article } from '../types';

const LoginForm = () => {
  const { login } = useCMS();
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(pass)) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-50">
      <div className="max-w-md w-full bg-cyber-panel border border-cyber-primary p-8 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        <h2 className="text-3xl font-display font-bold text-center mb-2 text-white">ADMIN ACCESS</h2>
        <p className="text-center text-cyber-primary text-xs uppercase tracking-widest mb-8">Restricted Area • Level 5 Clearance</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Access Key</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 text-white p-3 focus:border-cyber-primary focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm animate-pulse">Access Denied. Invalid Key.</p>}
          <CyberButton className="w-full">Authenticate</CyberButton>
          <div className="text-center text-xs text-gray-600 mt-4">
             Hint: use 'admin123'
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Admin() {
  const { isAuthenticated, logout, config, updateConfig, articles, deleteArticle, addArticle, pageViews } = useCMS();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'settings'>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', category: '' });

  if (!isAuthenticated) return <LoginForm />;

  return (
    <div className="pt-20 min-h-screen bg-cyber-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-cyber-panel/50 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-display font-bold text-white tracking-wider">COMMAND<br/><span className="text-cyber-primary">CENTER</span></h2>
        </div>
        <nav className="mt-6 space-y-1">
          {[
            { id: 'dashboard', icon: BarChart, label: 'Overview' },
            { id: 'articles', icon: FileText, label: 'Content Manager' },
            { id: 'settings', icon: Settings, label: 'System Config' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-sm uppercase tracking-wider transition-colors ${
                activeTab === item.id 
                  ? 'bg-cyber-primary/10 text-cyber-primary border-r-2 border-cyber-primary' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button onClick={logout} className="w-full flex items-center gap-3 px-6 py-4 text-sm uppercase tracking-wider text-red-500 hover:bg-red-500/10 mt-auto">
            <Shield size={18} /> Terminate Session
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-display font-bold text-white uppercase">{activeTab}</h1>
            <div className="md:hidden">
                <button onClick={logout} className="text-red-500 text-sm">Logout</button>
            </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={Users} label="Total Views" value={pageViews.toLocaleString()} />
              <StatCard icon={FileText} label="Articles" value={articles.length} />
              <StatCard icon={Shield} label="Security Status" value="SECURE" />
            </div>
            
            <div className="bg-cyber-panel border border-gray-800 p-6">
                <h3 className="text-white font-bold mb-4">System Notifications</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm p-3 bg-green-900/20 border border-green-900/50 text-green-400">
                        <span>Database backup completed successfully.</span>
                        <span className="opacity-50">2m ago</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 bg-blue-900/20 border border-blue-900/50 text-blue-400">
                        <span>New traffic spike detected from US region.</span>
                        <span className="opacity-50">1h ago</span>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            {!isEditing ? (
              <>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-400">Manage your digital publications.</p>
                  <CyberButton onClick={() => setIsEditing(true)}><Plus size={16} className="inline mr-2"/> New Entry</CyberButton>
                </div>
                <div className="bg-cyber-panel border border-gray-800">
                  {articles.map(article => (
                    <div key={article.id} className="flex items-center justify-between p-4 border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors">
                      <div>
                        <h4 className="text-white font-bold">{article.title}</h4>
                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                            <span>{article.category}</span>
                            <span>•</span>
                            <span className={article.status === 'published' ? 'text-green-500' : 'text-yellow-500'}>{article.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => deleteArticle(article.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-cyber-panel border border-gray-800 p-6 max-w-2xl relative">
                <h3 className="text-xl text-white font-bold mb-6">Create New Article</h3>
                <div className="space-y-4">
                  <input 
                    placeholder="Article Title"
                    className="w-full bg-black border border-gray-700 p-3 text-white focus:border-cyber-primary outline-none"
                    value={newArticle.title}
                    onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                  />
                  <input 
                    placeholder="Category (e.g. Tech, Tutorial)"
                    className="w-full bg-black border border-gray-700 p-3 text-white focus:border-cyber-primary outline-none"
                    value={newArticle.category}
                    onChange={e => setNewArticle({...newArticle, category: e.target.value})}
                  />
                  <textarea 
                    placeholder="Write content (Markdown supported)..."
                    className="w-full h-64 bg-black border border-gray-700 p-3 text-white focus:border-cyber-primary outline-none font-mono"
                    value={newArticle.content}
                    onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                  />
                  <div className="flex gap-4 flex-wrap">
                    <CyberButton onClick={() => {
                        addArticle({
                            title: newArticle.title || 'Untitled',
                            content: newArticle.content,
                            category: newArticle.category || 'General',
                            slug: newArticle.title.toLowerCase().replace(/ /g, '-'),
                            excerpt: newArticle.content.substring(0, 100) + '...',
                            tags: [],
                            status: 'published'
                        });
                        setIsEditing(false);
                        setNewArticle({ title: '', content: '', category: ''});
                    }}>Publish</CyberButton>
                    
                    <CyberButton variant="secondary" onClick={() => setShowPreview(true)}>
                        <Eye size={16} className="inline mr-2" /> Live Preview
                    </CyberButton>

                    <CyberButton variant="secondary" onClick={() => setIsEditing(false)}>Cancel</CyberButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-8">
                <div className="bg-cyber-panel border border-gray-800 p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Settings size={18}/> General Configuration</h3>
                    <div className="space-y-4">
                        {/* Avatar Settings */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase mb-1">Profile Photo (URL)</label>
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyber-primary shrink-0 relative group">
                                    <img src={config.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                                <input 
                                    value={config.avatarUrl} 
                                    onChange={(e) => updateConfig({ avatarUrl: e.target.value })}
                                    className="flex-1 bg-black border border-gray-700 p-2 text-white focus:border-cyber-primary outline-none"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 uppercase mb-1">Website Name</label>
                            <input 
                                value={config.name} 
                                onChange={(e) => updateConfig({ name: e.target.value })}
                                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase mb-1">Adsense ID</label>
                            <input 
                                value={config.adsenseId} 
                                onChange={(e) => updateConfig({ adsenseId: e.target.value })}
                                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-cyber-panel border border-gray-800 p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Cpu size={18}/> Visual Performance</h3>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-300">Enable 3D Background</span>
                        <button 
                            onClick={() => updateConfig({ enable3D: !config.enable3D })}
                            className={`w-12 h-6 rounded-full transition-colors relative ${config.enable3D ? 'bg-cyber-primary' : 'bg-gray-700'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${config.enable3D ? 'left-7' : 'left-1'}`}></div>
                        </button>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 uppercase mb-2">Graphic Fidelity</label>
                        <select 
                            value={config.performanceMode}
                            onChange={(e) => updateConfig({ performanceMode: e.target.value as any })}
                            className="w-full bg-black border border-gray-700 p-2 text-white"
                        >
                            <option value="high">High (Shadows + Particles + Bloom)</option>
                            <option value="medium">Medium (No Particles)</option>
                            <option value="low">Low (Basic Geometry)</option>
                        </select>
                    </div>
                </div>
            </div>
        )}

        {/* Live Preview Modal */}
        {showPreview && (
            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto p-4 flex justify-center">
                <div className="max-w-4xl w-full bg-cyber-black border border-cyber-primary/30 min-h-[80vh] md:h-fit md:my-10 relative shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                    <button 
                        onClick={() => setShowPreview(false)}
                        className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors z-50"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-6 md:p-12">
                        <div className="mb-4 text-cyber-primary text-xs uppercase tracking-[0.2em] border-b border-cyber-primary/30 pb-2 inline-block">
                            Live Preview Mode
                        </div>
                        
                        {/* Mock Cover */}
                        <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden border border-gray-800 group rounded-sm">
                            <img 
                                src={`https://picsum.photos/seed/${newArticle.title || 'preview'}/1200/600`} 
                                alt="Preview"
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-70"></div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            {newArticle.title || "Untitled Article"}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8 border-b border-gray-800 pb-8">
                            <span className="flex items-center gap-2"><Calendar size={14} /> {new Date().toLocaleDateString()}</span>
                            <span className="flex items-center gap-2 text-cyber-primary"><Tag size={14} /> {newArticle.category || "General"}</span>
                            <span className="flex items-center gap-2"><Eye size={14} /> 0 reads</span>
                        </div>

                        <div className="font-sans text-gray-300 leading-relaxed whitespace-pre-wrap mb-12 text-lg">
                            {newArticle.content || "Start writing content to see it appear here..."}
                        </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}