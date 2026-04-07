import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Clock, User, BookOpen, CheckCircle, ArrowRight, Shield, Star, Share2, PlayCircle, Award, Eye, Type, MessageSquare, Mail, ExternalLink } from 'lucide-react';
import { type Page, type Course } from '../types';
import { cn } from '../lib/utils';

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
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
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

  React.useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  React.useEffect(() => {
    if (isEditingName && studentName.trim()) {
      const timer = setTimeout(() => {
        createCertificateDoc();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isEditingName, studentName]);

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
    const subject = encodeURIComponent(`Withdrawal Request: ${course.title}`);
    const body = encodeURIComponent(`Hello DAARUL FALAAH Islamic Institution,\n\nI would like to withdraw from the course "${course.title}".\n\nStudent Name: ${studentName || 'Not Provided'}\n\nThank you.`);
    
    // Open mailto link
    window.location.href = `mailto:ismailabdulazeez536@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset local state after a short delay to allow mailto to trigger
    setTimeout(() => {
      setIsEnrolled(false);
      setCompletedModules([]);
      localStorage.removeItem(`enrolled_${course.id}`);
      localStorage.removeItem(`progress_${course.id}`);
    }, 500);
  };

  const createCertificateDoc = async () => {
    setIsGenerating(true);
    try {
      // Wait for fonts to load
      await Promise.all([
        document.fonts.load('1em Amiri'),
        document.fonts.load('1em "Noto Serif"'),
        document.fonts.load('1em Cinzel'),
        document.fonts.load('1em "Playfair Display"'),
        document.fonts.load('1em "Great Vibes"')
      ]);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // A4 Landscape dimensions at 300 DPI
      canvas.width = 3508;
      canvas.height = 2480;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Background: Parchment Texture
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 1.5);
      bgGradient.addColorStop(0, '#fdfbf7');
      bgGradient.addColorStop(1, '#f5f0e6');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle paper texture (noise)
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const opacity = Math.random() * 0.03;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(x, y, 2, 2);
      }

      // 2. Intricate Islamic Geometric Border
      const drawIslamicPattern = (x: number, y: number, size: number, color: string) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.strokeRect(-size / 2, -size / 2, size, size);
        }
        ctx.restore();
      };

      // Main Gold Border
      const goldGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      goldGradient.addColorStop(0, '#d4af37'); // Gold
      goldGradient.addColorStop(0.5, '#f9f295'); // Light Gold
      goldGradient.addColorStop(1, '#b8860b'); // Dark Gold

      ctx.strokeStyle = goldGradient;
      ctx.lineWidth = 60;
      ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

      // Inner Decorative Border
      ctx.lineWidth = 10;
      ctx.setLineDash([20, 10]);
      ctx.strokeRect(130, 130, canvas.width - 260, canvas.height - 260);
      ctx.setLineDash([]);

      // Corner Ornaments
      const cornerSize = 150;
      const corners = [
        [130, 130],
        [canvas.width - 130, 130],
        [130, canvas.height - 130],
        [canvas.width - 130, canvas.height - 130]
      ];

      corners.forEach(([cx, cy]) => {
        drawIslamicPattern(cx, cy, cornerSize, '#d4af37');
      });

      // 3. Watermark: Large Islamic Pattern
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.translate(centerX, centerY);
      for (let i = 0; i < 12; i++) {
        ctx.rotate(Math.PI / 6);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.strokeRect(-600, -600, 1200, 1200);
      }
      ctx.restore();

      // 4. Header Section
      const headerY = 400;
      
      // English Name
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 70px "Cinzel"';
      ctx.textAlign = 'right';
      ctx.fillText('DAARUL FALAAH', centerX - 200, headerY - 40);
      ctx.font = 'normal 45px "Playfair Display"';
      ctx.fillText('Islamic Institution', centerX - 200, headerY + 20);

      // Logo / Emblem
      ctx.save();
      ctx.translate(centerX, headerY - 20);
      
      // Outer Glow
      const emblemGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
      emblemGlow.addColorStop(0, 'rgba(152, 218, 39, 0.2)');
      emblemGlow.addColorStop(1, 'rgba(152, 218, 39, 0)');
      ctx.fillStyle = emblemGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 100, 0, Math.PI * 2);
      ctx.fill();

      // Emblem Circle
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fillStyle = goldGradient;
      ctx.fill();
      ctx.strokeStyle = '#151b2b';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Emblem Letter
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 80px "Cinzel"';
      ctx.textAlign = 'center';
      ctx.fillText('D', 0, 25);
      ctx.restore();

      // Arabic Name
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 90px "Amiri"';
      ctx.textAlign = 'left';
      ctx.fillText('مؤسسة دار الفلاح', centerX + 200, headerY - 20);
      ctx.font = 'normal 60px "Amiri"';
      ctx.fillText('الإسلامية', centerX + 200, headerY + 50);

      // 5. Main Content
      // Title
      ctx.fillStyle = goldGradient;
      ctx.font = 'bold 180px "Cinzel"';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE', centerX, 750);
      ctx.font = 'bold 100px "Cinzel"';
      ctx.fillText('OF COMPLETION', centerX, 880);
      
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 140px "Amiri"';
      ctx.fillText('شهادة إتمام', centerX, 1050);

      // Certification Text
      ctx.font = 'italic 65px "Playfair Display"';
      ctx.textAlign = 'center';
      ctx.fillText('This is to certify that', centerX, 1200);
      ctx.font = 'normal 80px "Amiri"';
      ctx.fillText('نشهد أن', centerX, 1300);

      // Student Name
      ctx.fillStyle = '#151b2b';
      ctx.font = 'bold 220px "Great Vibes"';
      ctx.fillText(studentName, centerX, 1550);
      
      // Underline for name
      ctx.strokeStyle = goldGradient;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - 800, 1580);
      ctx.lineTo(centerX + 800, 1580);
      ctx.stroke();

      // Achievement Text
      ctx.fillStyle = '#151b2b';
      ctx.font = 'normal 60px "Playfair Display"';
      ctx.fillText('has successfully completed the prescribed course of study in', centerX, 1720);
      ctx.font = 'normal 70px "Amiri"';
      ctx.fillText('قد أكمل بنجاح دورة', centerX, 1820);

      // Course Title
      ctx.fillStyle = goldGradient;
      ctx.font = 'bold 130px "Cinzel"';
      ctx.fillText(course.title.toUpperCase(), centerX, 2000);

      // 6. Footer Section
      const footerY = 2250;
      
      // Date
      const today = new Date();
      const gregorianDate = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const hijriDateAr = new Intl.DateTimeFormat('ar-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(today);

      ctx.fillStyle = '#151b2b';
      ctx.font = 'normal 45px "Playfair Display"';
      ctx.textAlign = 'left';
      ctx.fillText(`Date: ${gregorianDate}`, 400, footerY);
      ctx.font = 'normal 55px "Amiri"';
      ctx.textAlign = 'right';
      ctx.fillText(`التاريخ: ${hijriDateAr}`, canvas.width - 400, footerY);

      // Signatures
      const sigLineY = 2320;
      ctx.strokeStyle = '#151b2b';
      ctx.lineWidth = 2;
      
      // Left Signature
      ctx.beginPath();
      ctx.moveTo(400, sigLineY);
      ctx.lineTo(1000, sigLineY);
      ctx.stroke();
      ctx.font = 'bold 40px "Cinzel"';
      ctx.textAlign = 'center';
      ctx.fillText(course.instructor.toUpperCase(), 700, sigLineY + 50);
      ctx.font = 'normal 30px "Playfair Display"';
      ctx.fillText('Course Instructor', 700, sigLineY + 90);

      // Right Signature
      ctx.beginPath();
      ctx.moveTo(canvas.width - 1000, sigLineY);
      ctx.lineTo(canvas.width - 400, sigLineY);
      ctx.stroke();
      ctx.font = 'bold 40px "Cinzel"';
      ctx.fillText('REGISTRAR', canvas.width - 700, sigLineY + 50);
      ctx.font = 'normal 30px "Playfair Display"';
      ctx.fillText('Academic Affairs', canvas.width - 700, sigLineY + 90);

      // Official Seal (Bottom Center)
      ctx.save();
      ctx.translate(centerX, footerY + 50);
      
      // Outer Seal
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.fillStyle = goldGradient;
      ctx.fill();
      ctx.strokeStyle = '#151b2b';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Inner Seal Circle
      ctx.beginPath();
      ctx.arc(0, 0, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Seal Text (Circular)
      ctx.font = 'bold 18px "Cinzel"';
      const sealText = "OFFICIAL SEAL • DAARUL FALAAH •";
      for (let i = 0; i < sealText.length; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / sealText.length);
        ctx.fillText(sealText[i], 0, -80);
        ctx.restore();
      }
      
      // Center Seal Icon
      ctx.font = 'bold 40px "Cinzel"';
      ctx.fillText('DF', 0, 15);
      ctx.restore();

      // QR Code Placeholder (Modern Verification)
      ctx.fillStyle = '#151b2b';
      ctx.fillRect(canvas.width - 250, canvas.height - 250, 120, 120);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "Inter"';
      ctx.textAlign = 'center';
      ctx.fillText('VERIFY', canvas.width - 190, canvas.height - 180);

      // Convert to Blob for Preview
      canvas.toBlob((blob) => {
        if (blob) {
          if (previewImage && previewImage.startsWith('blob:')) {
            URL.revokeObjectURL(previewImage);
          }
          const url = URL.createObjectURL(blob);
          setPreviewImage(url);
        }
        setIsGenerating(false);
      }, 'image/jpeg', 0.98);
    } catch (error) {
      console.error('Error generating certificate:', error);
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
                    <div className="h-2 bg-on-surface/5 rounded-full overflow-hidden">
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
                                : "border-border text-on-surface/40 hover:border-primary/30 hover:text-primary"
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
            <div className="glass p-10 rounded-[40px] space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={24} />
                </div>
                <h2 className="text-3xl font-serif font-bold">Prerequisites</h2>
              </div>
              <p className="text-on-surface/60 leading-relaxed">
                To ensure you get the most out of this course, we recommend the following foundational knowledge or experience:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.prerequisites.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-on-surface/5 border border-border group hover:border-primary/30 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-surface transition-all">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-medium text-on-surface/80">{item}</span>
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
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300`} 
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
                    <div className="text-3xl font-serif font-bold">15,000 Naira</div>
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
                        
                        <div className="space-y-2">
                          <button 
                            onClick={handleUnenroll}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border text-xs text-on-surface/40 hover:text-destructive hover:border-destructive/30 transition-all font-bold uppercase tracking-widest"
                          >
                            <Mail size={14} /> Withdraw from Course
                          </button>
                          <p className="text-[10px] text-on-surface/30 text-center uppercase tracking-widest">Sends withdrawal request via email</p>
                        </div>
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

                  <div className="space-y-4 pt-6 border-t border-border">
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
            ].map((related, i) => {
              const relatedImages = [
                'photo-1591604129939-f1efa4d9f7fa',
                'photo-1585032226651-759b368d7246',
                'photo-1542816417-0983c9c9ad53'
              ];
              return (
                <div key={i} className="glass p-6 rounded-3xl space-y-4 group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-high">
                    <img 
                      src={`https://images.unsplash.com/${relatedImages[i % relatedImages.length]}?auto=format&fit=crop&q=80&w=400&h=300`} 
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
              );
            })}
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
                      className="w-full bg-on-surface/5 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                </div>

                  <button 
                    onClick={() => {
                      const baseUrl = window.location.origin + window.location.pathname;
                      const verificationUrl = `${baseUrl}?page=verify&name=${encodeURIComponent(studentName)}&course=${encodeURIComponent(course.title)}&date=${encodeURIComponent(new Date().toISOString().split('T')[0])}`;
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
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-primary space-y-4">
                      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                      <p className="text-xs font-bold uppercase tracking-widest">Generating Preview...</p>
                    </div>
                  ) : previewImage ? (
                    <img 
                      src={previewImage} 
                      className="w-full h-full object-contain" 
                      alt="Certificate Preview"
                      referrerPolicy="no-referrer"
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
