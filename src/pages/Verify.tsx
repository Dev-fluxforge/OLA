import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Shield, Calendar, Book, User, ExternalLink, Mail } from 'lucide-react';

export const Verify: React.FC = () => {
  const [params, setParams] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const p: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      p[key] = value;
    });
    setParams(p);
  }, []);

  const { name, course, date } = params;

  useEffect(() => {
    if (name && course && canvasRef.current) {
      renderCertificate();
    }
  }, [name, course]);

  const renderCertificate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Wait for fonts
    await document.fonts.load('1em Amiri');
    await document.fonts.load('1em "Noto Serif"');

    // A4 Landscape dimensions at 300 DPI
    canvas.width = 3508;
    canvas.height = 2480;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#98da27';
    ctx.lineWidth = 40;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    ctx.lineWidth = 10;
    ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);

    const centerX = canvas.width / 2;
    const headerY = 350;

    // Header
    ctx.fillStyle = '#98da27';
    ctx.font = 'bold 60px "Noto Serif"';
    ctx.textAlign = 'right';
    ctx.fillText('DAARUL FALAAH', centerX - 150, headerY - 40);
    ctx.font = 'normal 40px "Noto Serif"';
    ctx.fillText('Islamic Institution', centerX - 150, headerY + 10);

    // Logo
    ctx.beginPath();
    ctx.arc(centerX, headerY - 25, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px "Noto Serif"';
    ctx.textAlign = 'center';
    ctx.fillText('D', centerX, headerY - 5);

    // Arabic Header
    ctx.fillStyle = '#98da27';
    ctx.font = 'bold 80px "Amiri"';
    ctx.textAlign = 'left';
    ctx.fillText('مؤسسة دار الفلاح', centerX + 150, headerY - 20);
    ctx.font = 'normal 50px "Amiri"';
    ctx.fillText('الإسلامية', centerX + 150, headerY + 40);

    // Title
    ctx.fillStyle = '#151b2b';
    ctx.font = 'bold 160px "Noto Serif"';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', centerX, 650);
    ctx.font = 'bold 140px "Amiri"';
    ctx.fillText('شهادة إتمام', centerX, 820);

    // Certify
    ctx.font = 'normal 70px "Noto Serif"';
    ctx.textAlign = 'left';
    ctx.fillText('This is to certify that', 400, 1050);
    ctx.font = 'normal 80px "Amiri"';
    ctx.textAlign = 'right';
    ctx.fillText('نشهد أن', canvas.width - 400, 1050);

    // Name
    ctx.fillStyle = '#98da27';
    ctx.font = 'bold 180px "Amiri"';
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), centerX, 1300);

    // Completed
    ctx.fillStyle = '#151b2b';
    ctx.font = 'normal 70px "Noto Serif"';
    ctx.textAlign = 'left';
    ctx.fillText('has successfully completed the course', 400, 1500);
    ctx.font = 'normal 80px "Amiri"';
    ctx.textAlign = 'right';
    ctx.fillText('قد أكمل بنجاح دورة', canvas.width - 400, 1500);

    // Course
    ctx.fillStyle = '#151b2b';
    ctx.font = 'bold 120px "Noto Serif"';
    ctx.textAlign = 'center';
    ctx.fillText(course, centerX, 1700);

    // Dates
    const dateY = 2000;
    const d = date ? new Date(date) : new Date();
    const gregorianDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const hijriDateEn = new Intl.DateTimeFormat('en-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
    const hijriDateAr = new Intl.DateTimeFormat('ar-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

    ctx.font = 'normal 60px "Noto Serif"';
    ctx.textAlign = 'left';
    ctx.fillText(`Date: ${gregorianDate} / ${hijriDateEn}`, 400, dateY);
    ctx.font = 'normal 70px "Amiri"';
    ctx.textAlign = 'right';
    ctx.fillText(`التاريخ: ${hijriDateAr}`, canvas.width - 400, dateY);

    // Motto
    ctx.fillStyle = '#151b2b';
    ctx.font = 'italic 40px "Noto Serif"';
    ctx.textAlign = 'center';
    ctx.fillText('"When Allah wishes good for anyone, He bestows upon him the fiqh (Comprehension) of the religion."', centerX, 2320);
    ctx.font = 'italic 50px "Amiri"';
    ctx.fillText('"مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ"', centerX, 2400);
  };

  if (!name || !course) {
    return (
      <div className="pt-32 pb-24 px-4 text-center">
        <div className="max-w-md mx-auto glass p-12 rounded-3xl space-y-6">
          <Shield size={64} className="mx-auto text-primary/20" />
          <h1 className="text-2xl font-serif font-bold">Invalid Verification Link</h1>
          <p className="text-on-surface/60">The link you followed appears to be incomplete or invalid. Please contact the institution for a valid verification link.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Go to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <CheckCircle size={14} />
            <span>Verified Certificate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Credential Verification</h1>
          <p className="text-on-surface/60">This certificate has been issued and verified by DAARUL FALAAH Islamic Institution.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl overflow-hidden aspect-[1.414/1] relative">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-on-surface/40 uppercase tracking-widest font-bold">
              <Shield size={14} />
              <span>Secure Digital Credential</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl space-y-8">
              <h3 className="font-serif font-bold text-xl">Recipient Details</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Student Name</div>
                    <div className="font-serif font-bold">{name}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Book size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Course Completed</div>
                    <div className="font-serif font-bold">{course}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Issue Date</div>
                    <div className="font-serif font-bold">{new Date(date || Date.now()).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent(`Certificate Verification: ${name}`);
                    const body = encodeURIComponent(`I am verifying the certificate for ${name} who completed ${course}.\n\nVerification Link: ${window.location.href}`);
                    window.location.href = `mailto:ismailabdulazeez536@gmail.com?subject=${subject}&body=${body}`;
                  }}
                  className="w-full btn-outline flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Email Institution
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                  className="w-full btn-outline flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  Copy Share Link
                </button>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl bg-primary/5 border-primary/20">
              <p className="text-sm text-on-surface/70 italic leading-relaxed">
                "When Allah wishes good for anyone, He bestows upon him the fiqh (Comprehension) of the religion."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
