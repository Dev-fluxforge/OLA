import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Clock, User, ChevronRight, BookOpen } from 'lucide-react';
import { COURSES } from '../constants';
import { type Page, type Course } from '../types';
import { cn } from '../lib/utils';

interface ProgramsProps {
  onPageChange: (page: Page) => void;
  onCourseSelect: (course: Course) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onPageChange, onCourseSelect }) => {
  const [selectedLevel, setSelectedLevel] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = COURSES.filter(course => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold">Academic Programs</h1>
            <p className="text-on-surface/60 max-w-xl">
              Explore our diverse range of courses designed to provide a deep understanding of classical Islamic sciences.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40" size={20} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high border border-white/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                <Filter size={16} />
                <span>Filter by Level</span>
              </div>
              <div className="flex flex-col gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                      selectedLevel === level 
                        ? "bg-primary text-surface" 
                        : "bg-surface-container-low text-on-surface/60 hover:bg-white/5"
                    )}
                  >
                    {level}
                    <ChevronRight size={14} className={cn(
                      "transition-transform",
                      selectedLevel === level ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )} />
                  </button>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-3xl space-y-4">
              <h4 className="font-serif font-bold text-lg">Need Guidance?</h4>
              <p className="text-xs text-on-surface/60 leading-relaxed">
                Not sure which level is right for you? Our academic advisors are here to help you choose the best path.
              </p>
              <button 
                onClick={() => onPageChange('contact')}
                className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
              >
                Book a Consultation
              </button>
            </div>
          </aside>

          {/* Course List */}
          <div className="lg:col-span-3 space-y-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
                  onClick={() => onCourseSelect(course)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-grow gap-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                            {course.level}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">
                            {course.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-on-surface/60 text-sm leading-relaxed line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-xs text-on-surface/40">
                            <Clock size={14} className="text-primary" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-on-surface/40">
                            <User size={14} className="text-primary" />
                            <span>{course.instructor}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          View Details <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 glass rounded-3xl space-y-4">
                <BookOpen size={48} className="mx-auto text-on-surface/20" />
                <h3 className="text-xl font-serif font-bold">No courses found</h3>
                <p className="text-on-surface/60">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => { setSelectedLevel('All'); setSearchQuery(''); }}
                  className="text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
