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
    await Promise.all([
      document.fonts.load('1em Amiri'),
      document.fonts.load('1em "Noto Serif"'),
      document.fonts.load('1em Cinzel'),
      document.fonts.load('1em "Playfair Display"'),
      document.fonts.load('1em "Great Vibes"')
    ]);

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
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fillStyle = goldGradient;
    ctx.fill();
    ctx.strokeStyle = '#151b2b';
    ctx.lineWidth = 4;
    ctx.stroke();
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
    ctx.fillText(name, centerX, 1550);
    
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
    ctx.fillText(course.toUpperCase(), centerX, 2000);

    // 6. Footer Section
    const footerY = 2250;
    
    // Date
    const d = date ? new Date(date) : new Date();
    const gregorianDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const hijriDateAr = new Intl.DateTimeFormat('ar-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

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
    ctx.fillText('COURSE INSTRUCTOR', 700, sigLineY + 50);

    // Right Signature
    ctx.beginPath();
    ctx.moveTo(canvas.width - 1000, sigLineY);
    ctx.lineTo(canvas.width - 400, sigLineY);
    ctx.stroke();
    ctx.font = 'bold 40px "Cinzel"';
    ctx.fillText('REGISTRAR', canvas.width - 700, sigLineY + 50);

    // Official Seal (Bottom Center)
    ctx.save();
    ctx.translate(centerX, footerY + 50);
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, Math.PI * 2);
    ctx.fillStyle = goldGradient;
    ctx.fill();
    ctx.strokeStyle = '#151b2b';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.font = 'bold 40px "Cinzel"';
    ctx.fillStyle = '#151b2b';
    ctx.textAlign = 'center';
    ctx.fillText('DF', 0, 15);
    ctx.restore();

    // QR Code Placeholder
    ctx.fillStyle = '#151b2b';
    ctx.fillRect(canvas.width - 250, canvas.height - 250, 120, 120);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Inter"';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFIED', canvas.width - 190, canvas.height - 180);
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
