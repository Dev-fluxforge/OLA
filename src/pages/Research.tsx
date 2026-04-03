import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, FileText, Globe, Search, Filter, ArrowRight, Download, ExternalLink } from 'lucide-react';

export const Research: React.FC = () => {
  const publications = [
    {
      title: 'The Methodology of Hadith Authentication in the Early Classical Period',
      author: 'Prof. Yusuf Mansour',
      date: 'Feb 2026',
      category: 'Hadith Sciences',
      desc: 'A comprehensive study on the rigorous standards used by early scholars to authenticate prophetic traditions.',
      seed: 'research-1'
    },
    {
      title: 'Islamic Jurisprudence in the Digital Age: Challenges and Opportunities',
      author: 'Dr. Ahmed Al-Farsi',
      date: 'Jan 2026',
      category: 'Jurisprudence',
      desc: 'Exploring the application of classical Fiqh principles to modern technological advancements and digital interactions.',
      seed: 'research-2'
    },
    {
      title: 'The Role of Women Scholars in the Preservation of Sacred Knowledge',
      author: 'Shaykha Fatima Zahra',
      date: 'Dec 2025',
      category: 'History',
      desc: 'Tracing the historical contributions of female scholars to the transmission and interpretation of Islamic sciences.',
      seed: 'research-3'
    },
    {
      title: 'Classical Theology and Modern Philosophical Challenges',
      author: 'Dr. Maryam Al-Zahra',
      date: 'Nov 2025',
      category: 'Theology',
      desc: 'An analysis of how classical Aqidah frameworks can address contemporary philosophical questions and existential concerns.',
      seed: 'research-4'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Scholarly Output
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold">Research & Publications</h1>
            <p className="text-on-surface/60 max-w-xl">
              Daarul Falaah is committed to advancing Islamic scholarship through rigorous research and the publication of high-quality scholarly works.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40" size={20} />
            <input 
              type="text" 
              placeholder="Search publications..." 
              className="w-full bg-surface-container-high border border-white/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Classical Sciences', desc: 'In-depth research into the foundational disciplines of Fiqh, Aqidah, and Hadith.', icon: BookOpen },
            { title: 'Contemporary Issues', desc: 'Applying traditional wisdom to modern challenges in ethics, law, and society.', icon: Globe },
            { title: 'Historical Studies', desc: 'Exploring the intellectual and social history of the Islamic world through primary sources.', icon: FileText },
          ].map((area, i) => (
            <div key={i} className="glass p-12 rounded-[40px] space-y-6 group hover:border-primary/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                <area.icon size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold">{area.title}</h3>
              <p className="text-on-surface/60 leading-relaxed text-sm">{area.desc}</p>
              <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn">
                Explore Research Area <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Featured Publications */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Featured Publications</h2>
            <p className="text-on-surface/60 max-w-2xl mx-auto">
              Our latest scholarly works, peer-reviewed and published in international academic journals.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((pub, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[40px] flex flex-col md:flex-row gap-8 group hover:border-primary/30 transition-all"
              >
                <div className="md:w-48 h-64 md:h-auto overflow-hidden rounded-2xl shrink-0 relative">
                  <img 
                    src={`https://picsum.photos/seed/islamic-${pub.seed}/400/600`} 
                    alt={pub.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="text-primary" size={32} />
                  </div>
                </div>
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                        {pub.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">
                        {pub.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-on-surface/60 leading-relaxed line-clamp-3">
                      {pub.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="text-xs text-on-surface/40">
                      By <span className="text-primary font-bold">{pub.author}</span>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                      <button className="p-2 rounded-xl bg-white/5 text-on-surface/40 hover:bg-primary hover:text-surface transition-all">
                        <Download size={16} />
                      </button>
                      <button className="p-2 rounded-xl bg-white/5 text-on-surface/40 hover:bg-primary hover:text-surface transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <button className="btn-outline py-4 px-12 text-sm font-bold uppercase tracking-widest">
              View All Publications
            </button>
          </div>
        </div>

        {/* Research Collaborations */}
        <div className="glass rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
          <div className="space-y-6 lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-primary">Global Research Network</h2>
            <p className="text-on-surface/60 max-w-md leading-relaxed">
              We collaborate with leading academic institutions and research centers worldwide to foster a global scholarly community.
            </p>
            <div className="flex flex-wrap gap-8 pt-4">
              {['Al-Azhar University', 'Zaytuna College', 'Cambridge Muslim College', 'University of Madinah'].map((inst) => (
                <div key={inst} className="text-xs font-bold uppercase tracking-widest text-on-surface/40">{inst}</div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-video rounded-3xl overflow-hidden glass p-4">
              <img 
                src="https://picsum.photos/seed/islamic-manuscript-research/1200/800" 
                alt="Research Collaboration" 
                className="w-full h-full object-cover rounded-2xl grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
