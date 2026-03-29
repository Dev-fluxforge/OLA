import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Clock, User, BookOpen, CheckCircle, ArrowRight, Shield, Star, Share2 } from 'lucide-react';
import { type Page, type Course } from '../types';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onApply: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onApply }) => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-on-surface/40 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={18} /> Back to Programs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {/* Hero Section */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                  {course.level}
                </span>
                <span className="text-xs uppercase tracking-widest text-on-surface/40 font-bold">
                  {course.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-on-surface/70 leading-relaxed max-w-2xl">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-12 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
                    <Clock size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Duration</div>
                    <div className="text-sm font-medium">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Instructor</div>
                    <div className="text-sm font-medium">{course.instructor}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
                    <BookOpen size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Curriculum</div>
                    <div className="text-sm font-medium">Classical Text-Based</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Syllabus */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold">Course Syllabus</h2>
              <div className="space-y-4">
                {course.syllabus.map((item, i) => (
                  <div key={i} className="glass p-6 rounded-2xl flex items-start gap-6 group hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary font-serif font-bold group-hover:bg-primary group-hover:text-surface transition-all">
                      {i + 1}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-lg">{item}</h4>
                      <p className="text-sm text-on-surface/60 leading-relaxed">
                        Detailed exploration of the foundational concepts and scholarly debates surrounding this topic.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold">Prerequisites</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.prerequisites.map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <CheckCircle size={20} className="text-primary shrink-0" />
                    <span className="text-sm text-on-surface/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="glass p-10 rounded-[40px] space-y-8">
              <h2 className="text-3xl font-serif font-bold">Meet Your Instructor</h2>
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${course.instructor}/300/300`} 
                    alt={course.instructor} 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold">{course.instructor}</h3>
                  <p className="text-on-surface/60 leading-relaxed">
                    A renowned scholar with over 20 years of experience in the field of {course.category}. {course.instructor} has studied under some of the most prestigious scholars in the Muslim world and holds multiple ijazahs in classical texts.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View Profile</button>
                    <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Recent Publications</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="glass p-8 rounded-[40px] space-y-8">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-serif font-bold">Free</div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold">4.9 (128 reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={onApply}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                    >
                      Enroll in Course <ArrowRight size={18} />
                    </button>
                    <button className="btn-outline w-full py-4 flex items-center justify-center gap-2">
                      Save for Later <Share2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface/40">This course includes:</h4>
                    <ul className="space-y-3">
                      {[
                        '24 hours on-demand video',
                        '12 downloadable resources',
                        'Full lifetime access',
                        'Access on mobile and TV',
                        'Certificate of completion',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-on-surface/60">
                          <CheckCircle size={16} className="text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-[40px] space-y-6">
                <h4 className="font-serif font-bold text-xl">Accreditation</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Shield size={24} />
                  </div>
                  <p className="text-xs text-on-surface/60 leading-relaxed">
                    This course is accredited by the Global Islamic Education Council and meets international standards for classical studies.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
