import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle, Info, Scale, Gavel } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            Legal Information
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">Terms of Service</h1>
          <p className="text-on-surface/60 max-w-2xl mx-auto">
            Last updated: March 29, 2026. Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Content */}
        <div className="glass p-12 md:p-20 rounded-[40px] space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <Scale size={24} className="text-primary" />
              1. Acceptance of Terms
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              By accessing or using the services provided by Daarul Falaah Islamic Institution, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you may not access or use our services.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <Gavel size={24} className="text-primary" />
              2. Use of Services
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              Our services are intended for educational and scholarly purposes. You agree to use our services only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the services.
            </p>
            <ul className="space-y-4">
              {[
                'Provide accurate and truthful information during registration.',
                'Maintain the confidentiality of your account credentials.',
                'Respect the intellectual property of the institution and its scholars.',
                'Comply with the institution\'s code of conduct and academic integrity policies.',
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
              <Shield size={24} className="text-primary" />
              3. Intellectual Property
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              All content provided through our services, including but not limited to course materials, lectures, research papers, and website design, is the property of Daarul Falaah Islamic Institution or its content suppliers and is protected by intellectual property laws.
            </p>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex items-center gap-4">
              <Info size={24} className="text-primary shrink-0" />
              <p className="text-xs text-on-surface/60 leading-relaxed">
                You are granted a limited, non-exclusive, non-transferable license to access and use the materials for your personal, non-commercial educational use only.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <Lock size={24} className="text-primary" />
              4. Termination
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              We reserve the right to terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including but not limited to a breach of these Terms of Service.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
              <FileText size={24} className="text-primary" />
              5. Limitation of Liability
            </h2>
            <p className="text-on-surface/60 leading-relaxed">
              In no event shall Daarul Falaah Islamic Institution be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center space-y-4">
          <p className="text-xs text-on-surface/40 uppercase tracking-widest font-bold">
            Have questions about our terms?
          </p>
          <button className="btn-outline py-3 px-8 text-xs">Contact Legal Team</button>
        </div>
      </div>
    </div>
  );
};
