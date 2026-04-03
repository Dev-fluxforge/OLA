import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';
import { type Page } from '../types';

interface NotFoundProps {
  onPageChange: (page: Page) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onPageChange }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        {/* 404 Visual */}
        <div className="relative inline-block">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12rem] md:text-[18rem] font-serif font-bold leading-none text-white/5 select-none"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary backdrop-blur-sm"
            >
              <Search size={64} className="md:w-24 md:h-24 opacity-50" />
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-serif font-bold"
          >
            Page Not Found
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-on-surface/60 max-w-md mx-auto leading-relaxed"
          >
            The path you are seeking seems to have vanished into the depths of knowledge. Perhaps it was moved, or never existed in this realm.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => onPageChange('home')}
            className="btn-primary w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-3 group"
          >
            <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
            Return Home
          </button>
          <button 
            onClick={() => onPageChange('programs')}
            className="btn-outline w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-3 group"
          >
            <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
            Explore Programs
          </button>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.7 }}
          className="pt-12"
        >
          <p className="text-sm font-serif italic text-on-surface/80">
            "Seek knowledge from the cradle to the grave."
          </p>
        </motion.div>
      </div>
    </div>
  );
};
