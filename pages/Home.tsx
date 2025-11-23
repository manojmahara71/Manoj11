import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CyberButton, CyberCard, SectionTitle } from '../components/ui/CyberComponents';
import { ArrowRight, Code, Cpu, Globe, Terminal } from 'lucide-react';

const SkillBar = ({ skill, level }: { skill: string, level: number }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-cyber-primary font-bold tracking-widest text-sm">{skill}</span>
      <span className="text-gray-400 text-xs">{level}%</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary relative"
        style={{ width: `${level}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-[glitch_2s_infinite]"></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const { config, projects } = useCMS();

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center relative px-4">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center z-10">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 border border-cyber-primary/50 text-cyber-primary text-xs uppercase tracking-[0.2em] bg-cyber-primary/10 backdrop-blur-sm">
              System Online
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
              <span className="block text-white">HELLO, I'M</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary animate-pulse">
                {config.name.split(' ')[0]}
              </span>
            </h1>
            <p className="text-xl text-gray-300 font-sans max-w-lg border-l-2 border-cyber-secondary pl-4">
              {config.subtitle}
            </p>
            <div className="flex gap-4 pt-4">
              <CyberButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})}>
                View Projects
              </CyberButton>
              <CyberButton variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
                Contact Me
              </CyberButton>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center items-center relative">
             {/* Profile Photo Container */}
             <div className="relative group">
                {/* Rotating Rings */}
                <div className="absolute inset-[-20px] border-2 border-cyber-primary/20 rounded-full w-[calc(100%+40px)] h-[calc(100%+40px)] animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-[-10px] border border-cyber-secondary/40 rounded-full w-[calc(100%+20px)] h-[calc(100%+20px)] animate-[spin_7s_linear_infinite_reverse]"></div>
                
                {/* Image Wrapper */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-cyber-primary shadow-[0_0_50px_rgba(0,240,255,0.2)] bg-black">
                    <img 
                        src={config.avatarUrl} 
                        alt={config.name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                    />
                    {/* Glitch Overlay */}
                    <div className="absolute inset-0 bg-cyber-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Tech Deco Elements */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cyber-black border border-cyber-primary px-3 py-1 text-[10px] text-cyber-primary uppercase tracking-widest">
                    Identity Verified
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-cyber-black/80 backdrop-blur-sm relative border-t border-cyber-dim">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="System Analysis" subtitle="Decoding the developer profile" />
          
          <div className="grid md:grid-cols-2 gap-12">
            <CyberCard>
              <h3 className="text-2xl font-display text-white mb-4 flex items-center gap-2">
                <Terminal className="text-cyber-primary" /> About Me
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 font-sans">
                {config.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-800 bg-gray-900/50">
                  <h4 className="text-cyber-secondary font-bold text-2xl">5+</h4>
                  <span className="text-xs text-gray-500 uppercase">Years Exp</span>
                </div>
                <div className="p-4 border border-gray-800 bg-gray-900/50">
                  <h4 className="text-cyber-secondary font-bold text-2xl">50+</h4>
                  <span className="text-xs text-gray-500 uppercase">Projects</span>
                </div>
              </div>
            </CyberCard>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-display text-white mb-6 flex items-center gap-2">
                <Cpu className="text-cyber-secondary" /> Technical Core
              </h3>
              <SkillBar skill="React / TypeScript" level={95} />
              <SkillBar skill="Three.js / WebGL" level={85} />
              <SkillBar skill="Node.js / Backend" level={90} />
              <SkillBar skill="UI / UX Design" level={80} />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Deployed Modules" subtitle="Recent executions and deliverables" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <CyberCard key={project.id} className="group hover:border-cyber-primary transition-colors duration-300">
                <div className="relative h-48 mb-4 overflow-hidden border-b border-gray-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-cyber-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-display text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-1 border border-gray-700 text-gray-300 uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
                <CyberButton variant="primary" className="w-full text-xs">Initialize Demo</CyberButton>
              </CyberCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-t from-cyber-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="w-12 h-12 text-cyber-primary mx-auto mb-6 animate-spin-slow" />
          <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to Initiate Collaboration?</h2>
          <p className="text-gray-300 mb-8">
            My communication channels are open for new opportunities.
          </p>
          <a href={`mailto:${config.email}`}>
             <CyberButton variant="primary" className="text-lg px-8 py-3">
               Establish Connection <ArrowRight className="inline w-4 h-4 ml-2" />
             </CyberButton>
          </a>
        </div>
      </section>
    </div>
  );
}