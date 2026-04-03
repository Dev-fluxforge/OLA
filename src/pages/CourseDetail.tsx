import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Clock, User, BookOpen, CheckCircle, ArrowRight, Shield, Star, Share2, PlayCircle, Award, Eye, Type, MessageSquare, Mail, ExternalLink } from 'lucide-react';
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
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

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

  const createCertificateDoc = async () => {
    setIsGenerating(true);
    try {
      // Wait for fonts to load
      await document.fonts.load('1em Amiri');
      await document.fonts.load('1em "Noto Serif"');

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // A4 Landscape dimensions at 300 DPI
      // 297mm x 210mm
      // 3508 x 2480 pixels
      canvas.width = 3508;
      canvas.height = 2480;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Border
      ctx.strokeStyle = '#98da27'; // Primary color
      ctx.lineWidth = 40;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
      ctx.lineWidth = 10;
      ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);

      const centerX = canvas.width / 2;

      // Header: Institution Name (English - Logo - Arabic)
      const headerY = 350;
      
      // English Name
      ctx.fillStyle = '#98da27';
      ctx.font = 'bold 60px "Noto Serif"';
      ctx.textAlign = 'right';
      ctx.fillText('DAARUL FALAAH', centerX - 150, headerY - 40);
      ctx.font = 'normal 40px "Noto Serif"';
      ctx.fillText('Islamic Institution', centerX - 150, headerY + 10);

      // Logo Placeholder (Simple geometric shape for now)
      ctx.beginPath();
      ctx.arc(centerX, headerY - 25, 60, 0, Math.PI * 2);
      ctx.fillStyle = '#98da27';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px "Noto Serif"';
      ctx.textAlign = 'center';
      ctx.fillText('D', centerX, headerY - 5);

      // Arabic Name
      ctx.fillStyle = '#98da27';
      ctx.font = 'bold 80px "Amiri"';
      ctx.textAlign = 'left';
      ctx.fillText('مؤسسة دار الفلاح', centerX + 150, headerY - 20);
      ctx.font = 'normal 50px "Amiri"';
      ctx.fillText('الإسلامية', centerX + 150, headerY + 40);

      // Certificate Title
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 160px "Noto Serif"';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF COMPLETION', centerX, 650);
      
      ctx.font = 'bold 140px "Amiri"';
      ctx.fillText('شهادة إتمام', centerX, 820);

      // This is to certify that
      ctx.font = 'normal 70px "Noto Serif"';
      ctx.textAlign = 'left';
      ctx.fillText('This is to certify that', 400, 1050);

      ctx.font = 'normal 80px "Amiri"';
      ctx.textAlign = 'right';
      ctx.fillText('نشهد أن', canvas.width - 400, 1050);

      // Student Name
      ctx.fillStyle = '#98da27';
      ctx.font = 'bold 180px "Amiri"';
      ctx.textAlign = 'center';
      ctx.fillText(studentName.toUpperCase(), centerX, 1300);

      // has successfully completed
      ctx.fillStyle = '#151b2b';
      ctx.font = 'normal 70px "Noto Serif"';
      ctx.textAlign = 'left';
      ctx.fillText('has successfully completed the course', 400, 1500);

      ctx.font = 'normal 80px "Amiri"';
      ctx.textAlign = 'right';
      ctx.fillText('قد أكمل بنجاح دورة', canvas.width - 400, 1500);

      // Course Title
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 120px "Noto Serif"';
      ctx.textAlign = 'center';
      ctx.fillText(course.title, centerX, 1700);

      // Dates
      const dateY = 2000;
      const today = new Date();
      const gregorianDate = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const hijriDateEn = new Intl.DateTimeFormat('en-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(today);
      const hijriDateAr = new Intl.DateTimeFormat('ar-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(today);

      ctx.font = 'normal 60px "Noto Serif"';
      ctx.textAlign = 'left';
      ctx.fillText(`Date: ${gregorianDate} / ${hijriDateEn}`, 400, dateY);

      ctx.font = 'normal 70px "Amiri"';
      ctx.textAlign = 'right';
      ctx.fillText(`التاريخ: ${hijriDateAr}`, canvas.width - 400, dateY);

      // Signatures
      const sigY = 2200;
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(400, sigY);
      ctx.lineTo(1000, sigY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 1000, sigY);
      ctx.lineTo(canvas.width - 400, sigY);
      ctx.stroke();

      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 50px "Noto Serif"';
      ctx.textAlign = 'center';
      ctx.fillText(course.instructor, 700, sigY + 80);
      ctx.fillText('Registrar', canvas.width - 700, sigY + 80);

      // Motto
      ctx.fillStyle = '#151b2b';
      ctx.font = 'italic 40px "Noto Serif"';
      ctx.textAlign = 'center';
      ctx.fillText('"When Allah wishes good for anyone, He bestows upon him the fiqh (Comprehension) of the religion."', centerX, 2320);
      
      ctx.font = 'italic 50px "Amiri"';
      ctx.fillText('"مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ"', centerX, 2400);

      // Convert to PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);

      const url = doc.output('datauristring');
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updatePreview = () => {
    if (studentName) {
      createCertificateDoc();
    }
  };

  const generateCertificate = () => {
    if (!studentName) {
      setIsEditingName(true);
      return;
    }
    setIsEditingName(true);
    updatePreview();
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
                            View & Request Certificate <Award size={18} />
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

      {/* Name Input & Customization Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass max-w-4xl w-full p-8 rounded-[32px] space-y-8 border-primary/20 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-3">
                  <Award className="text-primary" size={28} />
                  Customize Your Certificate
                </h3>
                <p className="text-sm text-on-surface/60">Personalize your achievement before downloading.</p>
              </div>
              <button 
                onClick={() => setIsEditingName(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <ChevronLeft className="rotate-180" size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Customization Controls */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 ml-1 flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      type="text" 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Abdullah Ibn Yusuf"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                  <button 
                    onClick={() => {
                      const baseUrl = window.location.origin + window.location.pathname;
                      const verificationUrl = `${baseUrl}?page=verify&name=${encodeURIComponent(studentName)}&course=${encodeURIComponent(course.title)}&date=${encodeURIComponent(new Date().toISOString())}`;
                      const subject = encodeURIComponent(`Certificate Verification Request: ${studentName}`);
                      const body = encodeURIComponent(`Hello DAARUL FALAAH Islamic Institution,\n\nI have successfully completed the course "${course.title}".\n\nPlease verify my certificate for ${studentName}.\n\nVerification Link: ${verificationUrl}\n\nThank you.`);
                      window.location.href = `mailto:ismailabdulazeez536@gmail.com?subject=${subject}&body=${body}`;
                    }}
                    disabled={isGenerating || !studentName.trim()}
                    className="w-full px-4 py-3 rounded-xl bg-primary text-surface text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Mail size={16} /> Request Official Certificate
                  </button>

                  <div className="pt-4">
                    <button 
                      onClick={updatePreview}
                      disabled={isGenerating || !studentName.trim()}
                      className="w-full px-4 py-3 rounded-xl border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Eye size={16} /> {isGenerating ? 'Generating...' : 'Refresh Preview'}
                    </button>
                  </div>
              </div>

              {/* Preview Area */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 ml-1 flex items-center gap-2">
                  <Eye size={12} /> Live Preview
                </label>
                <div className="aspect-[1.414/1] w-full glass rounded-2xl overflow-hidden border-white/10 relative bg-white/5">
                  {previewUrl ? (
                    <iframe 
                      src={previewUrl} 
                      className="w-full h-full border-none scale-[1.01]" 
                      title="Certificate Preview"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface/30 space-y-4">
                      <Award size={48} className="opacity-20" />
                      <p className="text-xs font-bold uppercase tracking-widest">Enter name to preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
