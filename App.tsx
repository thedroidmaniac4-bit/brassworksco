import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Capabilities from './pages/Capabilities';
import ProcessPage from './pages/ProcessPage';
import Projects from './pages/Projects';
import Industries from './pages/Industries';
import Materials from './pages/Materials';
import Quality from './pages/Quality';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';

import { Project, Capability, BlogPost, Enquiry, Testimonial } from './types';
import { 
  initialProjects, 
  initialCapabilities, 
  initialBlogs, 
  initialEnquiries, 
  initialTestimonials 
} from './data/initialData';

export default function App() {
  const [view, setView] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // States initialized from localStorage or initialData
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('brassworksco_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [capabilities, setCapabilities] = useState<Capability[]>(() => {
    const saved = localStorage.getItem('brassworksco_capabilities');
    return saved ? JSON.parse(saved) : initialCapabilities;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('brassworksco_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('brassworksco_enquiries');
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [testimonials] = useState<Testimonial[]>(initialTestimonials);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('brassworksco_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('brassworksco_capabilities', JSON.stringify(capabilities));
  }, [capabilities]);

  useEffect(() => {
    localStorage.setItem('brassworksco_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('brassworksco_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  // Handle addition of new quote enquiry
  const handleAddEnquiry = (newEnq: Enquiry) => {
    setEnquiries(prev => [newEnq, ...prev]);
  };

  // Auto-scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-400">
      
      {/* Universal Luxury Navigation */}
      <Navbar currentView={view} setView={setView} />

      {/* Main Routed View Content with Smooth Editorial Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {view === 'home' && (
              <Home 
                projects={projects} 
                capabilities={capabilities} 
                testimonials={testimonials} 
                setView={setView}
                setSelectedProject={setSelectedProject}
              />
            )}
            {view === 'about' && <About />}
            {view === 'capabilities' && <Capabilities capabilities={capabilities} />}
            {view === 'process' && <ProcessPage />}
            {view === 'projects' && (
              <Projects 
                projects={projects} 
                selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject}
              />
            )}
            {view === 'industries' && <Industries />}
            {view === 'materials' && <Materials />}
            {view === 'quality' && <Quality />}
            {view === 'blog' && <Blog blogs={blogs} />}
            {view === 'contact' && <Contact onAddEnquiry={handleAddEnquiry} />}
            {view === 'admin' && (
              <AdminPanel 
                projects={projects} 
                setProjects={setProjects}
                capabilities={capabilities} 
                setCapabilities={setCapabilities}
                blogs={blogs} 
                setBlogs={setBlogs}
                enquiries={enquiries} 
                setEnquiries={setEnquiries}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent mini-banner helper about the CMS features */}
      <div className="bg-neutral-900 border-t border-b border-neutral-800 py-3 text-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center justify-center gap-2">
        <span>Try our custom CMS admin console</span>
        <span>•</span>
        <button 
          onClick={() => setView('admin')} 
          className="text-amber-400 hover:text-amber-300 hover:underline font-bold"
        >
          Open Admin Panel →
        </button>
      </div>

      {/* Universal Luxury Footer */}
      <Footer setView={setView} />
    </div>
  );
}
