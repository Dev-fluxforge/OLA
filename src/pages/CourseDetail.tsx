import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Clock, User, BookOpen, CheckCircle, ArrowRight, Shield, Star, Share2, PlayCircle, Download, Award } from 'lucide-react';
import { type Page, type Course } from '../types';
import { cn } from '../lib/utils';
import { jsPDF } from 'jspdf';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onApply: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onApply }) => {
  const [isEnrolled, setIsEnrolled] = React.useState(() => {
    const saved = localStorage.getItem(`enrolled_${course.id}`);
    return saved === 'true';
  });
  
  const [completedModules, setCompletedModules] = React.useState<number[]>(() => {
    const saved = localStorage.getItem(`progress_${course.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [studentName, setStudentName] = React.useState(() => {
    return localStorage.getItem('student_name') || '';
  });

  const [isEditingName, setIsEditingName] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(`enrolled_${course.id}`, isEnrolled.toString());
  }, [isEnrolled, course.id]);

  React.useEffect(() => {
    localStorage.setItem(`progress_${course.id}`, JSON.stringify(completedModules));
  }, [completedModules, course.id]);

  React.useEffect(() => {
    localStorage.setItem('student_name', studentName);
  }, [studentName]);

  const toggleModule = (index: number) => {
    if (!isEnrolled) return;
    setCompletedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const progress = Math.round((completedModules.length / course.syllabus.length) * 100);
  const isComplete = progress === 100;

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  const handleUnenroll = () => {
    if (window.confirm('Are you sure you want to unenroll? Your progress will be reset.')) {
      setIsEnrolled(false);
      setCompletedModules([]);
    }
  };

  const generateCertificate = () => {
    if (!studentName) {
      setIsEditingName(true);
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background border
    doc.setDrawColor(184, 158, 101); // Primary color (approx)
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

    // Header
    doc.setTextColor(184, 158, 101);
    doc.setFont('times', 'bold');
    doc.setFontSize(40);
    doc.text('CERTIFICATE', pageWidth / 2, 45, { align: 'center' });
    doc.setFontSize(20);
    doc.text('OF COMPLETION', pageWidth / 2, 55, { align: 'center' });

    // Body
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('This is to certify that', pageWidth / 2, 80, { align: 'center' });

    doc.setFontSize(32);
    doc.setFont('times', 'bold');
    doc.text(studentName.toUpperCase(), pageWidth / 2, 100, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the course', pageWidth / 2, 120, { align: 'center' });

    doc.setFontSize(24);
    doc.setFont('times', 'bold');
    doc.text(course.title, pageWidth / 2, 135, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Completed on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 155, { align: 'center' });

    // Footer
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    doc.setTextColor(184, 158, 101);
    doc.text('AL-HIKMAH INSTITUTE', pageWidth / 2, 175, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    doc.text('Classical Knowledge for the Modern World', pageWidth / 2, 182, { align: 'center' });

    // Signatures
    doc.setDrawColor(200, 200, 200);
    doc.line(40, 170, 100, 170);
    doc.line(pageWidth - 100, 170, pageWidth - 40, 170);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(course.instructor, 70, 175, { align: 'center' });
    doc.text('Registrar', pageWidth - 70, 175, { align: 'center' });

    doc.save(`${course.title.replace(/\s+/g, '_')}_Certificate.pdf`);
  };

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
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <h2 className="text-3xl font-serif font-bold">Course Syllabus</h2>
                {isEnrolled && (
                  <div className="space-y-2 w-full md:w-64">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface/40">
                      <span>Course Progress</span>
                      <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {course.syllabus.map((item, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "glass p-6 rounded-2xl flex items-start gap-6 group transition-all",
                      isEnrolled && completedModules.includes(i) ? "border-primary/30 bg-primary/5" : "hover:border-primary/30"
                    )}
                  >
                    <div 
                      onClick={() => isEnrolled && toggleModule(i)}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold transition-all shrink-0",
                        isEnrolled && completedModules.includes(i) 
                          ? "bg-primary text-surface" 
                          : "bg-surface-container-high text-primary group-hover:bg-primary group-hover:text-surface",
                        isEnrolled && "cursor-pointer"
                      )}
                    >
                      {isEnrolled && completedModules.includes(i) ? <CheckCircle size={20} /> : i + 1}
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-serif font-bold text-lg">{item}</h4>
                        {isEnrolled && (
                          <button 
                            onClick={() => toggleModule(i)}
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all",
                              completedModules.includes(i) 
                                ? "bg-primary/10 border-primary/20 text-primary" 
                                : "border-white/10 text-on-surface/40 hover:border-primary/30 hover:text-primary"
                            )}
                          >
                            {completedModules.includes(i) ? 'Completed' : 'Mark Complete'}
                          </button>
                        )}
                      </div>
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
                    {isEnrolled ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                          <CheckCircle className="text-primary" size={20} />
                          <span className="text-sm font-bold text-primary">You are enrolled</span>
                        </div>
                        
                        {isComplete ? (
                          <button 
                            onClick={generateCertificate}
                            className="btn-primary w-full py-4 flex items-center justify-center gap-2 bg-primary text-surface hover:bg-primary/90"
                          >
                            Download Certificate <Download size={18} />
                          </button>
                        ) : (
                          <button className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                            Continue Learning <PlayCircle size={18} />
                          </button>
                        )}
                        
                        <button 
                          onClick={handleUnenroll}
                          className="text-xs text-on-surface/40 hover:text-destructive transition-colors w-full text-center font-bold uppercase tracking-widest"
                        >
                          Unenroll from Course
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={handleEnroll}
                        className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                      >
                        Enroll in Course <ArrowRight size={18} />
                      </button>
                    )}
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

        {/* Student Reviews Section */}
        <div className="mt-24 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold">Student Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold">4.9 Average Rating</span>
              </div>
            </div>
            <button className="text-primary text-sm font-bold uppercase tracking-widest hover:underline">Write a Review</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Abdullah Hassan', date: '2 months ago', text: 'This course provided the clarity I was looking for in my studies of Fiqh. The instructor\'s depth of knowledge is unparalleled.', rating: 5 },
              { name: 'Mariam Yusuf', date: '3 months ago', text: 'The structured approach to classical texts made it easy to follow along, even for someone at an intermediate level.', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="glass p-8 rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{review.name}</div>
                      <div className="text-[10px] text-on-surface/40 uppercase tracking-widest">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-primary">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-sm text-on-surface/70 leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="mt-24 space-y-12">
          <h2 className="text-3xl font-serif font-bold">Related Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Advanced Fiqh Studies', level: 'Advanced', duration: '12 Weeks' },
              { title: 'Principles of Hadith', level: 'Intermediate', duration: '8 Weeks' },
              { title: 'Islamic Ethics', level: 'Beginner', duration: '6 Weeks' },
            ].map((related, i) => (
              <div key={i} className="glass p-6 rounded-3xl space-y-4 group cursor-pointer hover:border-primary/30 transition-all">
                <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-high">
                  <img 
                    src={`https://picsum.photos/seed/related-${i}/400/300`} 
                    alt={related.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{related.level}</div>
                  <h4 className="font-serif font-bold text-lg group-hover:text-primary transition-colors">{related.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-on-surface/40">
                    <Clock size={12} />
                    <span>{related.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Name Input Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass max-w-md w-full p-8 rounded-[32px] space-y-6 border-primary/20"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold">Certificate Details</h3>
              <p className="text-sm text-on-surface/60">Please enter your full name as you would like it to appear on your certificate of completion.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Abdullah Ibn Yusuf"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsEditingName(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (studentName.trim()) {
                      setIsEditingName(false);
                      generateCertificate();
                    }
                  }}
                  disabled={!studentName.trim()}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary text-surface text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Generate
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
