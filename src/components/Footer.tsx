import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-surface font-serif font-bold text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight tracking-tight">DAARUL FALAAH</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">Islamic Institution</span>
              </div>
            </div>
            <p className="text-on-surface/60 text-sm leading-relaxed max-w-xs">
              Preserving the classical Islamic scholarly tradition through rigorous academic excellence and spiritual cultivation.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface/40 hover:bg-primary hover:text-surface transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Academic Calendar', 'Scholarships', 'Student Portal', 'News & Events'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-on-surface/60 hover:text-primary text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Programs</h4>
            <ul className="space-y-4">
              {['Islamic Jurisprudence', 'Theology & Creed', 'Hadith Sciences', 'Arabic Linguistics', 'Quranic Exegesis'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-on-surface/60 hover:text-primary text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-on-surface/60">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>123 Scholarly Way, Academic District, Knowledge City</span>
              </li>
              <li className="flex gap-3 text-sm text-on-surface/60">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 text-sm text-on-surface/60">
                <Mail size={18} className="text-primary shrink-0" />
                <span>admissions@daarulfalaah.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface/40 text-xs">
            © 2026 Daarul Falaah Islamic Institution. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-on-surface/40 hover:text-primary text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-on-surface/40 hover:text-primary text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
