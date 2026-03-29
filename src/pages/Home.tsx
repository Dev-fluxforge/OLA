import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Book, Shield, Users, Globe, Star } from 'lucide-react';
import { type Page } from '../types';

interface HomeProps {
  onPageChange: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onPageChange }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(152,218,39,0.15),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#98da27 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <Star size={14} fill="currentColor" />
              <span>Enrollment Open for Fall 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-balance">
              Master the <span className="text-primary italic">Classical</span> Islamic Sciences
            </h1>
            <p className="text-lg text-on-surface/70 leading-relaxed max-w-xl text-balance">
              Join a prestigious institution dedicated to the preservation and mastery of the scholarly manuscript. Our curriculum bridges timeless wisdom with contemporary relevance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onPageChange('programs')}
                className="btn-primary flex items-center gap-2"
              >
                Explore Programs <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => onPageChange('apply')}
                className="btn-outline"
              >
                Start Application
              </button>
            </div>
            
            <div className="pt-8 flex items-center gap-8 border-t border-white/5">
              <div>
                <div className="text-2xl font-serif font-bold">12+</div>
                <div className="text-xs text-on-surface/40 uppercase tracking-widest">Disciplines</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold">500+</div>
                <div className="text-xs text-on-surface/40 uppercase tracking-widest">Scholars</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold">15+</div>
                <div className="text-xs text-on-surface/40 uppercase tracking-widest">Countries</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-4">
              <img 
                src="https://picsum.photos/seed/islamic-art/1000/1000" 
                alt="Classical Manuscript" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Featured Disciplines - Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Featured Disciplines</h2>
            <p className="text-on-surface/60 max-w-2xl mx-auto">
              Our curriculum is meticulously designed to provide a comprehensive understanding of the core Islamic sciences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
              <img 
                src="https://picsum.photos/seed/jurisprudence/800/600" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
                alt="Jurisprudence"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-surface">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold">Islamic Jurisprudence (Fiqh)</h3>
                <p className="text-on-surface/60 max-w-md">
                  Deep dive into the principles and application of Islamic law across various schools of thought.
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  Learn More <ChevronRight size={16} />
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
              <img 
                src="https://picsum.photos/seed/theology/400/600" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
                alt="Theology"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-surface">
                  <Book size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold">Theology & Creed</h3>
                <p className="text-on-surface/60">
                  Exploring the foundational beliefs and theological frameworks of Islam.
                </p>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
              <img 
                src="https://picsum.photos/seed/hadith/400/600" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
                alt="Hadith"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-surface">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold">Hadith Sciences</h3>
                <p className="text-on-surface/60">
                  The study of prophetic traditions and the science of authentication.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
              <img 
                src="https://picsum.photos/seed/arabic/800/600" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
                alt="Arabic"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-surface">
                  <Globe size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold">Arabic Linguistics</h3>
                <p className="text-on-surface/60 max-w-md">
                  Mastering the language of the Quran through grammar, morphology, and rhetoric.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold">The Path to Excellence</h2>
                <p className="text-on-surface/60">
                  We provide a unique learning environment that combines traditional methods with modern pedagogical approaches.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { title: 'Authentic Lineage', desc: 'Our instructors hold ijazahs (authorizations) from renowned scholars worldwide.', icon: Shield },
                  { title: 'Rigorous Curriculum', desc: 'A structured path from foundational concepts to advanced scholarly research.', icon: Book },
                  { title: 'Global Community', desc: 'Connect with students and scholars from diverse backgrounds and cultures.', icon: Users },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                      <feature.icon size={28} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-serif font-bold">{feature.title}</h4>
                      <p className="text-on-surface/60 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-4">
                <img 
                  src="https://picsum.photos/seed/scholar/800/1000" 
                  alt="Scholar studying" 
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl max-w-xs space-y-4 hidden md:block">
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-sm text-on-surface/80">
                  "The depth of knowledge and the spiritual atmosphere at Daarul Falaah is truly transformative."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="text-sm font-bold">Zaid Al-Mansour</div>
                    <div className="text-[10px] uppercase tracking-widest text-on-surface/40">Graduate Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[40px] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold max-w-3xl mx-auto leading-tight">
              Begin Your Academic Journey Today
            </h2>
            <p className="text-on-surface/60 max-w-xl mx-auto text-lg">
              Applications for the 2026 academic year are now being accepted. Secure your place in our prestigious institution.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => onPageChange('apply')}
                className="btn-primary"
              >
                Apply Now
              </button>
              <button 
                onClick={() => onPageChange('contact')}
                className="btn-outline"
              >
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
