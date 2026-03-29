import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle, Info } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            Legal Information
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">Privacy Policy</h1>
          <p className="text-on-surface/60 max-w-2xl mx-auto">
            Last updated: March 29, 2026. Your privacy and the security of your data are of paramount importance to us.
          </p>
        </div>

        {/* Content */}
        <div className="glass p-12 md:p-20 rounded-[40px] space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <Shield size={24} className="text-primary" />
              1. Information We Collect
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              We collect information that you provide directly to us when you apply for admission, register for courses, or subscribe to our newsletter. This may include:
            </p>
            <ul className="space-y-4">
              {[
                'Personal identification (Name, Email, Phone, Address)',
                'Academic history and transcripts',
                'Financial information for scholarship applications',
                'Communication preferences and feedback',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-on-surface/80">
                  <CheckCircle size={18} className="text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <Eye size={24} className="text-primary" />
              2. How We Use Your Information
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              Your information is used solely for academic and administrative purposes, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Academic Processing', desc: 'Managing admissions, course registrations, and academic records.' },
                { title: 'Communication', desc: 'Sending updates about your application, courses, and institution news.' },
                { title: 'Financial Aid', desc: 'Evaluating eligibility for scholarships and financial support.' },
                { title: 'Improvement', desc: 'Enhancing our educational programs and website experience.' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-serif font-bold text-lg">{item.title}</h4>
                  <p className="text-xs text-on-surface/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <Lock size={24} className="text-primary" />
              3. Data Security
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is limited to authorized personnel only.
            </p>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex items-center gap-4">
              <Info size={24} className="text-primary shrink-0" />
              <p className="text-xs text-on-surface/60 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your explicit consent, except as required by law.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <FileText size={24} className="text-primary" />
              4. Your Rights
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              You have the right to access, correct, or request the deletion of your personal information at any time. To exercise these rights, please contact our data protection officer at privacy@daarulfalaah.edu.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center space-y-4">
          <p className="text-xs text-on-surface/40 uppercase tracking-widest font-bold">
            Questions about our privacy practices?
          </p>
          <button className="btn-outline py-3 px-8 text-xs">Contact Privacy Team</button>
        </div>
      </div>
    </div>
  );
};
