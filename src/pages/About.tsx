import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Book, Globe, Star, ArrowRight } from 'lucide-react';

import { type Page } from '../types';

interface AboutProps {
  onPageChange: (page: Page) => void;
}

export const About: React.FC<AboutProps> = ({ onPageChange }) => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              A Legacy of <span className="text-primary italic">Knowledge</span> and Faith
            </h1>
            <p className="text-lg text-on-surface/70 leading-relaxed">
              Founded in 1998, Daarul Falaah Islamic Institution was established with a singular vision: to bridge the gap between classical Islamic scholarship and the challenges of the modern world.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="text-3xl font-serif font-bold text-primary">25+</div>
                <div className="text-xs text-on-surface/40 uppercase tracking-widest font-bold">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-primary">5000+</div>
                <div className="text-xs text-on-surface/40 uppercase tracking-widest font-bold">Global Alumni</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass p-4">
              <img 
                src="https://picsum.photos/seed/islamic-campus/1000/1000" 
                alt="Institution Grounds" 
                className="w-full h-full object-cover rounded-2xl grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-12 rounded-[40px] space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={28} />
            </div>
            <h2 className="text-3xl font-serif font-bold">Our Mission</h2>
            <p className="text-on-surface/60 leading-relaxed">
              To provide an authentic and rigorous Islamic education that empowers individuals to lead with wisdom, serve with compassion, and contribute meaningfully to their communities through the preservation of sacred knowledge.
            </p>
          </div>
          <div className="glass p-12 rounded-[40px] space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Star size={28} />
            </div>
            <h2 className="text-3xl font-serif font-bold">Our Vision</h2>
            <p className="text-on-surface/60 leading-relaxed">
              To be a global beacon of classical Islamic learning, recognized for academic excellence, spiritual depth, and the cultivation of scholars who embody the prophetic tradition in the contemporary era.
            </p>
          </div>
        </div>

        {/* Motto Section */}
        <div className="glass p-12 rounded-[40px] text-center space-y-8 bg-primary/5 border-primary/20">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <Star size={32} fill="currentColor" />
          </div>
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Our Motto</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold italic leading-tight max-w-4xl mx-auto">
              "When Allah wishes good for anyone, He bestows upon him the fiqh (Comprehension) of the religion."
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Our Core Values</h2>
            <p className="text-on-surface/60 max-w-2xl mx-auto">
              These principles guide every aspect of our institution, from the classroom to our community outreach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Authenticity', desc: 'Adherence to the unbroken chain of transmission (Isnad) in all scholarly pursuits.', icon: Book },
              { title: 'Excellence', desc: 'Striving for the highest standards in both academic research and spiritual practice.', icon: Star },
              { title: 'Community', desc: 'Fostering a supportive environment that values diversity and mutual respect.', icon: Users },
              { title: 'Integrity', desc: 'Upholding the highest ethical standards in all personal and professional conduct.', icon: Shield },
              { title: 'Innovation', desc: 'Utilizing modern pedagogical tools to enhance the delivery of classical knowledge.', icon: Globe },
              { title: 'Service', desc: 'Dedication to the betterment of humanity through education and social responsibility.', icon: ArrowRight },
            ].map((value, i) => (
              <div key={i} className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                  <value.icon size={24} />
                </div>
                <h4 className="text-xl font-serif font-bold">{value.title}</h4>
                <p className="text-sm text-on-surface/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold">Our Leadership</h2>
              <p className="text-on-surface/60 max-w-xl">
                Guided by world-renowned scholars and experienced academic administrators.
              </p>
            </div>
            <button 
              onClick={() => onPageChange('faculty')}
              className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group"
            >
              View All Faculty <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Ahmed Al-Farsi', role: 'Rector & Senior Scholar', seed: 'leader1' },
              { name: 'Shaykha Fatima Zahra', role: 'Dean of Academic Affairs', seed: 'leader2' },
              { name: 'Prof. Yusuf Mansour', role: 'Head of Research', seed: 'leader3' },
              { name: 'Dr. Sarah Khalid', role: 'Director of Student Life', seed: 'leader4' },
            ].map((leader, i) => (
              <div key={i} className="glass p-6 rounded-3xl space-y-4 text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img 
                    src={`https://picsum.photos/seed/islamic-scholar-${i}/400/400`} 
                    alt={leader.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg">{leader.name}</h4>
                  <p className="text-xs text-on-surface/40 uppercase tracking-widest font-bold">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
