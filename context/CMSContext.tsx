import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSContextType, SiteConfig, Article, Project } from '../types';

const defaultConfig: SiteConfig = {
  name: "Manish Mahara",
  title: "Creative Technologist",
  subtitle: "Building the digital future with code & creativity.",
  aboutText: "I am a Full Stack Developer specializing in 3D Web Experiences, futuristic UI/UX, and scalable backend systems. Based in Nepal, available globally.",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  email: "contact@manojmahara.com.np",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  adsenseId: "ca-pub-XXXXXXXXXXXXXXXX",
  enable3D: true,
  performanceMode: 'high'
};

const initialArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of WebGL in 2025',
    slug: 'future-webgl-2025',
    excerpt: 'How Three.js and WebGPU are transforming the browser into a gaming console.',
    content: 'WebGL represents the future...',
    category: 'Tech',
    tags: ['WebGL', 'Three.js', 'Future'],
    publishedAt: new Date().toISOString(),
    status: 'published',
    views: 1204
  },
  {
    id: '2',
    title: 'Optimizing React for High Performance',
    slug: 'optimizing-react',
    excerpt: 'Deep dive into standard hooks and memoization patterns.',
    content: 'React 19 brings new concurrent features...',
    category: 'Development',
    tags: ['React', 'Performance'],
    publishedAt: new Date().toISOString(),
    status: 'published',
    views: 850
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Cyber Dashboard',
    description: 'A React-based admin panel with futuristic aesthetics.',
    techStack: ['React', 'Tailwind', 'Recharts'],
    imageUrl: 'https://picsum.photos/600/400'
  },
  {
    id: '2',
    title: 'Nepal Tourism 3D',
    description: 'Interactive map of Nepal built with Three.js.',
    techStack: ['Three.js', 'GSAP', 'Vite'],
    imageUrl: 'https://picsum.photos/600/401'
  }
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    // Simulate fetching stats
    setPageViews(Math.floor(Math.random() * 5000) + 10000);
  }, []);

  const login = (password: string) => {
    // Hardcoded demo password
    if (password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addArticle = (article: Omit<Article, 'id' | 'views' | 'publishedAt'>) => {
    const newArticle: Article = {
      ...article,
      id: Math.random().toString(36).substr(2, 9),
      views: 0,
      publishedAt: new Date().toISOString(),
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, data: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  return (
    <CMSContext.Provider value={{
      config,
      updateConfig,
      articles,
      addArticle,
      updateArticle,
      deleteArticle,
      projects,
      isAuthenticated,
      login,
      logout,
      pageViews
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
};