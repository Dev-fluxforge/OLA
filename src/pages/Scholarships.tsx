import React from 'react';
import { motion } from 'motion/react';
import { Star, Shield, GraduationCap, CheckCircle, Info, ArrowRight } from 'lucide-react';

export const Scholarships: React.FC = () => {
  const scholarshipTypes = [
    { 
      title: 'Academic Excellence', 
      desc: 'For students who have demonstrated exceptional scholarly achievement in their previous studies.',
      amount: 'Up to 100% Tuition',
      icon: GraduationCap
    },
    { 
      title: 'Need-Based Support', 
      desc: 'Dedicated to ensuring that financial barriers do not prevent dedicated seekers from accessing sacred knowledge.',
      amount: 'Variable Support',
      icon: Shield
    },
    { 
      title: 'Community Leadership', 
      desc: 'For students who have shown significant leadership and service within their local communities.',
      amount: '50% Tuition',
      icon: Star
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            Financial Aid
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">Scholarships & Aid</h1>
          <p className="text-on-surface/60 max-w-2xl mx-auto">
            We are committed to making classical Islamic education accessible to all qualified students, regardless of their financial background.
          </p>
        </div>

        {/* Scholarship Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scholarshipTypes.map((type, i) => (
            <div key={i} className="glass p-12 rounded-[40px] space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative z-10">
                <type.icon size={32} />
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-serif font-bold">{type.title}</h3>
                <p className="text-on-surface/60 leading-relaxed text-sm">{type.desc}</p>
                <div className="pt-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Award Amount</div>
                  <div className="text-xl font-serif font-bold text-primary italic">{type.amount}</div>
                </div>
              </div>
              <button className="btn-outline w-full py-3 text-xs relative z-10">Apply for this Aid</button>
            </div>
          ))}
        </div>

        {/* Application Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold">How to Apply</h2>
              <p className="text-on-surface/60">
                The scholarship application process is integrated with our standard admissions procedure.
              </p>
            </div>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Complete Admission Form', desc: 'Submit your standard application for admission to your chosen program.' },
                { step: '02', title: 'Submit Financial Documents', desc: 'Provide necessary proof of income or academic transcripts as required.' },
                { step: '03', title: 'Personal Statement', desc: 'Write a brief essay explaining your need for aid and your scholarly goals.' },
                { step: '04', title: 'Interview', desc: 'Shortlisted candidates will be invited for a brief interview with the aid committee.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-3xl font-serif font-bold text-primary italic shrink-0">{item.step}</div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-serif font-bold">{item.title}</h4>
                    <p className="text-sm text-on-surface/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-4">
              <img 
                src="https://images.unsplash.com/photo-1584281729155-3c99bb4990ca?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Student studying" 
                className="w-full h-full object-cover rounded-2xl grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Eligibility & Requirements */}
        <div className="glass p-12 md:p-20 rounded-[40px] space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Eligibility & Requirements</h2>
            <p className="text-on-surface/60 max-w-2xl mx-auto">
              Please review the general requirements for all scholarship applicants.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Minimum GPA of 3.5 (for Academic Aid)',
              'Full-time enrollment status',
              'Demonstrated financial need',
              'Strong letters of recommendation',
              'Commitment to community service',
              'Active participation in seminars',
              'Adherence to code of conduct',
              'Annual progress review',
            ].map((req, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <CheckCircle size={18} className="text-primary shrink-0" />
                <span className="text-xs text-on-surface/80">{req}</span>
              </div>
            ))}
          </div>
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Info size={24} className="text-primary shrink-0" />
              <p className="text-sm text-on-surface/60 leading-relaxed">
                Have questions about your specific situation? Our financial aid advisors are available for private consultations.
              </p>
            </div>
            <button className="btn-primary whitespace-nowrap">Book a Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};
