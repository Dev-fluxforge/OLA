import React from 'react';
import { Menu, X, BookOpen, GraduationCap, Phone, Info, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { type Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Info },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'apply', label: 'Apply', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-surface font-serif font-bold text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight tracking-tight">DAARUL FALAAH</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">Islamic Institution</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id as Page)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2",
                  currentPage === item.id ? "text-primary" : "text-on-surface/70"
                )}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
            <button 
              onClick={() => onPageChange('apply')}
              className="btn-primary py-2 px-5 text-sm"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-on-surface/70 hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id as Page);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 w-full px-4 py-4 rounded-xl text-base font-medium transition-colors",
                    currentPage === item.id ? "bg-primary/10 text-primary" : "text-on-surface/70 hover:bg-white/5"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                  <ChevronRight size={16} className="ml-auto opacity-30" />
                </button>
              ))}
              <div className="pt-4 px-4">
                <button 
                  onClick={() => {
                    onPageChange('apply');
                    setIsOpen(false);
                  }}
                  className="btn-primary w-full py-3"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
