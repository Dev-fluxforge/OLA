import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Clock, User, ChevronRight, BookOpen, Mail, CheckCircle, X } from 'lucide-react';
import { COURSES } from '../constants';
import { type Page, type Course } from '../types';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';

interface ProgramsProps {
  onPageChange: (page: Page) => void;
  onCourseSelect: (course: Course) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onPageChange, onCourseSelect }) => {
  const [selectedLevel, setSelectedLevel] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [enrolledCourses, setEnrolledCourses] = React.useState<string[]>(() => {
    return COURSES.filter(c => localStorage.getItem(`enrolled_${c.id}`) === 'true').map(c => c.id);
  });
  const [notification, setNotification] = React.useState<{message: string, type: 'success' | 'info'} | null>(null);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedLevel, searchQuery]);

  const filteredCourses = COURSES.filter(course => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const CourseSkeleton = () => (
    <div className="glass rounded-3xl overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto bg-on-surface/5 shrink-0" />
        <div className="p-8 flex flex-col justify-between flex-grow gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-20 h-6 bg-on-surface/5 rounded-full" />
              <div className="w-24 h-4 bg-on-surface/5 rounded-full" />
            </div>
            <div className="w-3/4 h-8 bg-on-surface/5 rounded-lg" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-on-surface/5 rounded" />
              <div className="w-5/6 h-4 bg-on-surface/5 rounded" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex gap-6">
              <div className="w-20 h-4 bg-on-surface/5 rounded" />
              <div className="w-20 h-4 bg-on-surface/5 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-6 bg-on-surface/5 rounded-full" />
              <div className="w-24 h-4 bg-on-surface/5 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
              className="w-full bg-surface-container-high border border-border rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
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
                        : "bg-surface-container-low text-on-surface/60 hover:bg-on-surface/5"
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

            <div className="glass p-6 rounded-3xl space-y-6">
              <h4 className="font-serif font-bold text-lg">Why Choose Us?</h4>
              <div className="space-y-4">
                {[
                  { title: 'Authenticity', desc: 'Curriculum based on classical texts.' },
                  { title: 'Flexibility', desc: 'Self-paced and live sessions available.' },
                  { title: 'Community', desc: 'Global network of students.' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{item.title}</div>
                    <p className="text-[10px] text-on-surface/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Course List */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "p-4 rounded-2xl flex items-center justify-between gap-4 shadow-lg border",
                    notification.type === 'success' ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 border-white/10 text-on-surface"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <Mail size={20} />}
                    <span className="text-sm font-bold">{notification.message}</span>
                  </div>
                  <button onClick={() => setNotification(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <CourseSkeleton key={i} />)
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course, i) => {
                const isEnrolled = enrolledCourses.includes(course.id);
                const completedModules = JSON.parse(localStorage.getItem(`progress_${course.id}`) || '[]');
                const progress = Math.round((completedModules.length / course.syllabus.length) * 100);
                const studentName = localStorage.getItem('student_name') || '';

                const handleEnroll = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  localStorage.setItem(`enrolled_${course.id}`, 'true');
                  setEnrolledCourses(prev => [...prev, course.id]);
                  setNotification({ message: `Successfully enrolled in ${course.title}!`, type: 'success' });
                };

                const handleUnenroll = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const subject = encodeURIComponent(`Withdrawal Request: ${course.title}`);
                  const body = encodeURIComponent(`Hello DAARUL FALAAH Islamic Institution,\n\nI would like to withdraw from the course "${course.title}".\n\nStudent Name: ${studentName || 'Not Provided'}\n\nThank you.`);
                  window.location.href = `mailto:ismailabdulazeez536@gmail.com?subject=${subject}&body=${body}`;
                  
                  setTimeout(() => {
                    localStorage.removeItem(`enrolled_${course.id}`);
                    localStorage.removeItem(`progress_${course.id}`);
                    setEnrolledCourses(prev => prev.filter(id => id !== course.id));
                    setNotification({ message: `Withdrawal request sent for ${course.title}.`, type: 'info' });
                  }, 500);
                };

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-3xl overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
                    onClick={() => onCourseSelect(course)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto overflow-hidden shrink-0 relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {isEnrolled && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-surface text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                            Enrolled
                          </div>
                        )}
                      </div>
                      <div className="p-8 flex flex-col justify-between flex-grow gap-6">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                                {course.level}
                              </span>
                              <span className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">
                                {course.category}
                              </span>
                            </div>
                            {isEnrolled && (
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "text-[10px] font-bold uppercase tracking-widest",
                                  progress === 100 ? "text-primary" : "text-on-surface/40"
                                )}>
                                  {progress === 100 ? 'Completed' : `${progress}% Complete`}
                                </span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-on-surface/60 text-sm leading-relaxed line-clamp-2">
                            {course.description}
                          </p>
                          
                          {isEnrolled && (
                            <div className="space-y-2 pt-2">
                              <div className="h-1.5 bg-on-surface/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  className={cn(
                                    "h-full transition-all duration-1000",
                                    progress === 100 ? "bg-primary" : "bg-primary/60"
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
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
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-serif font-bold text-primary">15,000 Naira</div>
                              {isEnrolled ? (
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={handleUnenroll}
                                    className="text-[10px] text-on-surface/40 hover:text-destructive transition-colors uppercase tracking-widest flex items-center gap-1 font-bold"
                                  >
                                    <Mail size={12} /> Withdraw
                                  </button>
                                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    Continue Learning <ChevronRight size={16} />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={handleEnroll}
                                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-surface transition-all"
                                  >
                                    Enroll Now
                                  </button>
                                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    View Details <ChevronRight size={16} />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
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
