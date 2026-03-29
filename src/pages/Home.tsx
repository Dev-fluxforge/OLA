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
              Preserving the <span className="text-primary italic">Sacred</span> Scholarly Tradition
            </h1>
            <p className="text-lg text-on-surface/70 leading-relaxed max-w-xl text-balance">
              Daarul Falaah is a sanctuary for seekers of knowledge, dedicated to the rigorous study of classical Islamic sciences through an unbroken chain of transmission.
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
            </div>
          </div>
        </div>
      </section>

      {/* Scholarly Tradition & History Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-4">
                <img 
                  src="https://picsum.photos/seed/tradition/800/1000" 
                  alt="Ancient Manuscripts" 
                  className="w-full h-full object-cover rounded-2xl grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl max-w-xs space-y-4 hidden md:block">
                <div className="text-primary font-serif font-bold text-4xl italic">1400+</div>
                <p className="text-xs text-on-surface/60 leading-relaxed">
                  Years of preserved scholarly tradition, passed down through generations of dedicated seekers.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                Our Heritage
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">A Legacy of Light</h2>
              <div className="space-y-6 text-on-surface/70 leading-relaxed">
                <p>
                  Daarul Falaah was founded on the principle that true knowledge is a light that must be carefully tended. Our institution traces its pedagogical roots back to the great centers of learning in Baghdad, Cordoba, and Timbuktu.
                </p>
                <p>
                  We believe that the study of the sacred sciences requires more than just intellectual rigor; it requires a transformation of the heart. Our curriculum is designed to facilitate this holistic growth, ensuring that our students emerge not just as scholars, but as beacons of guidance for their communities.
                </p>
                <div className="pt-4 space-y-4">
                  {[
                    'Unbroken chains of transmission (Isnad)',
                    'Emphasis on character development (Adab)',
                    'Integration of classical wisdom with modern context',
                    'A sanctuary for focused spiritual and intellectual growth'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Student Voices</h2>
            <p className="text-on-surface/60 max-w-2xl mx-auto">
              Hear from our global community of students who have embarked on this transformative journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Zaid Al-Mansour', 
                role: 'Graduate Student', 
                text: 'The depth of knowledge and the spiritual atmosphere at Daarul Falaah is truly transformative. It is not just an academic institution, but a community of growth.',
                seed: 'student1'
              },
              { 
                name: 'Aisha Rahman', 
                role: 'Intermediate Scholar', 
                text: 'The focus on classical texts and the direct connection with scholars who hold authentic ijazahs is what sets this institution apart. My understanding of Fiqh has reached new heights.',
                seed: 'student2'
              },
              { 
                name: 'Omar Khalid', 
                role: 'Arabic Linguistics Student', 
                text: 'Mastering the Arabic language was always a dream. The methodology used here made the complex rules of Nahw and Sarf accessible and deeply engaging.',
                seed: 'student3'
              }
            ].map((testimonial, i) => (
              <div key={i} className="glass p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-primary/30 transition-all">
                <div className="space-y-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="italic text-on-surface/80 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20">
                    <img 
                      src={`https://picsum.photos/seed/${testimonial.seed}/100/100`} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{testimonial.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-on-surface/40">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                Our Foundation
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Mission & Vision</h2>
              <div className="space-y-6 text-on-surface/70 leading-relaxed">
                <p>
                  At Daarul Falaah, our mission is to cultivate a new generation of scholars who are deeply rooted in the classical Islamic tradition while being fully engaged with the complexities of the modern world.
                </p>
                <p>
                  We envision an intellectual landscape where the sacred sciences are not merely historical artifacts, but living, breathing traditions that provide guidance, clarity, and spiritual nourishment to humanity.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <div className="text-primary font-serif font-bold text-2xl italic">Authenticity</div>
                  <p className="text-xs text-on-surface/50">Preserving the chain of transmission (Isnad) in every discipline.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-primary font-serif font-bold text-2xl italic">Excellence</div>
                  <p className="text-xs text-on-surface/50">Striving for the highest academic and spiritual standards.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden glass p-4">
              <img 
                src="https://picsum.photos/seed/library/1200/800" 
                alt="Classical Library" 
                className="w-full h-full object-cover rounded-2xl grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
            <div className="space-y-6 lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-serif font-bold">Stay Connected</h2>
              <p className="text-on-surface/60 max-w-md leading-relaxed">
                Join our newsletter to receive scholarly insights, academic updates, and information about upcoming events and seminars.
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe Now
                </button>
              </form>
              <p className="text-[10px] text-on-surface/40 mt-4 uppercase tracking-widest">
                We respect your privacy. Unsubscribe at any time.
              </p>
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
