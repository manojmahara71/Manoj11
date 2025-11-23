export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published';
  views: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  subtitle: string;
  aboutText: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  adsenseId: string;
  enable3D: boolean;
  performanceMode: 'high' | 'medium' | 'low';
}

export interface CMSContextType {
  config: SiteConfig;
  updateConfig: (config: Partial<SiteConfig>) => void;
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'views' | 'publishedAt'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  projects: Project[];
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  pageViews: number;
}