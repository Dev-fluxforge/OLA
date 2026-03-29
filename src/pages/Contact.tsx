import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold">Get in Touch</h1>
              <p className="text-on-surface/60 max-w-xl">
                Have questions about our programs or the application process? Our team is here to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Admissions', icon: Mail, value: 'admissions@daarulfalaah.edu' },
                { title: 'General Inquiry', icon: MessageSquare, value: 'info@daarulfalaah.edu' },
                { title: 'Call Us', icon: Phone, value: '+1 (555) 123-4567' },
                { title: 'Office Hours', icon: Clock, value: 'Mon - Fri, 9am - 5pm' },
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-3xl space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">{item.title}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass p-8 rounded-3xl space-y-6">
              <h4 className="font-serif font-bold text-xl flex items-center gap-3">
                <MapPin size={20} className="text-primary" />
                Our Campus
              </h4>
              <p className="text-sm text-on-surface/60 leading-relaxed">
                123 Scholarly Way, Academic District, Knowledge City, 56789
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden grayscale opacity-50 hover:opacity-100 transition-opacity">
                <img 
                  src="https://picsum.photos/seed/map/800/450" 
                  alt="Campus Map" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="glass rounded-[40px] p-8 md:p-12 space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold">Send an Inquiry</h2>
              <p className="text-on-surface/60 text-sm">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">First Name</label>
                  <input type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50 appearance-none" required>
                  <option value="">Select Subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="programs">Program Information</option>
                  <option value="scholarships">Scholarship Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Message</label>
                <textarea placeholder="How can we help you?" rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
