import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ChevronRight, Search, Filter, ArrowRight } from 'lucide-react';

export const News: React.FC = () => {
  const newsItems = [
    { 
      title: 'New Program: Quranic Exegesis (Tafsir)', 
      date: 'March 15, 2026', 
      category: 'Academic', 
      author: 'Dr. Ahmed Al-Farsi',
      desc: 'We are proud to announce the launch of our new advanced program in Quranic Exegesis, focusing on classical commentaries and linguistic analysis.',
      seed: 'news1'
    },
    { 
      title: 'Annual Scholarly Symposium 2026', 
      date: 'March 10, 2026', 
      category: 'Events', 
      author: 'Academic Affairs',
      desc: 'Join us for a three-day symposium featuring world-renowned scholars discussing the role of Islamic sciences in the 21st century.',
      seed: 'news2'
    },
    { 
      title: 'Scholarship Applications Now Open', 
      date: 'March 5, 2026', 
      category: 'Admissions', 
      author: 'Financial Aid Office',
      desc: 'Applications for the 2026-2027 academic year scholarships are now being accepted. Deadline for submission is July 15, 2026.',
      seed: 'news3'
    },
    { 
      title: 'New Research Publication: Hadith Sciences', 
      date: 'Feb 28, 2026', 
      category: 'Research', 
      author: 'Prof. Yusuf Mansour',
      desc: 'Our research department has published a new study on the methodology of hadith authentication in the early classical period.',
      seed: 'news4'
    },
    { 
      title: 'Community Outreach Program Success', 
      date: 'Feb 20, 2026', 
      category: 'Community', 
      author: 'Student Life',
      desc: 'Our students recently completed a successful community service project, providing educational support to local youth centers.',
      seed: 'news5'
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Updates & Events
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold">News & Events</h1>
            <p className="text-on-surface/60 max-w-xl">
              Stay informed about the latest academic developments, research publications, and community events at Daarul Falaah.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40" size={20} />
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full bg-surface-container-high border border-white/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="glass rounded-[40px] overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1200&h=800" 
                  alt="Featured News" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-75 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            <div className="p-12 md:p-20 flex flex-col justify-center space-y-8">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                  Featured
                </span>
                <span className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">Academic</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                Expanding Our Horizons: The 2026 Strategic Vision
              </h2>
              <p className="text-on-surface/60 leading-relaxed">
                As we enter our 28th year, Daarul Falaah is embarking on a transformative journey to expand our research capabilities and global scholarly network.
              </p>
              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-on-surface/40">
                  <Calendar size={14} className="text-primary" />
                  <span>March 20, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface/40">
                  <User size={14} className="text-primary" />
                  <span>Dr. Ahmed Al-Farsi</span>
                </div>
              </div>
              <button className="btn-primary w-fit flex items-center gap-2">
                Read Full Article <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                <Filter size={16} />
                <span>Filter by Category</span>
              </div>
              <div className="flex flex-col gap-2">
                {['All Updates', 'Academic', 'Events', 'Admissions', 'Research', 'Community'].map((cat) => (
                  <button
                    key={cat}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group bg-surface-container-low text-on-surface/60 hover:bg-white/5"
                  >
                    {cat}
                    <ChevronRight size={14} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-3xl space-y-4">
              <h4 className="font-serif font-bold text-lg">Newsletter</h4>
              <p className="text-xs text-on-surface/60 leading-relaxed">
                Receive the latest scholarly insights and institution updates directly in your inbox.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-primary/50"
                  required
                />
                <button type="submit" className="btn-primary w-full py-3 text-[10px]">Subscribe Now</button>
              </form>
            </div>
          </aside>

          {/* News List */}
          <div className="lg:col-span-3 space-y-8">
            {newsItems.map((news, i) => {
              const newsImages = [
                'photo-1584551246679-0daf3d275d0f',
                'photo-1519817650390-64a93db51149',
                'photo-1506197603052-3cc9c3a201bd',
                'photo-1597933534024-16492b96324d',
                'photo-1566121317354-69b23183f26f'
              ];
              return (
                <div key={i} className="glass p-8 rounded-3xl flex flex-col md:flex-row gap-8 group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden rounded-2xl shrink-0">
                    <img 
                      src={`https://images.unsplash.com/${newsImages[i % newsImages.length]}?auto=format&fit=crop&q=80&w=600&h=400`} 
                      alt={news.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-75 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                        {news.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">
                        {news.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-on-surface/60 leading-relaxed line-clamp-2">
                      {news.desc}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs text-on-surface/40">
                        <User size={14} className="text-primary" />
                        <span>{news.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold text-sm ml-auto">
                        Read More <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <button className="btn-outline w-full py-4 text-sm font-bold uppercase tracking-widest">
              Load More Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
