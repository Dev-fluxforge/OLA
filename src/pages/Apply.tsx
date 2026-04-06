import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, MapPin, GraduationCap, ChevronRight, ChevronLeft, CheckCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export const Apply: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    qualification: '',
    previousEducation: '',
    statementOfPurpose: '',
  });

  const steps = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Academic Background', icon: GraduationCap },
    { id: 3, label: 'Review & Submit', icon: CheckCircle },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `As salaam alaikum warahmatullah wabarkatuhuuuuu, my name is ${formData.fullName}.
I want to make enquires about Daarul Falaah online Academy.

Application Details:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- DOB: ${formData.dob}
- Address: ${formData.address}
- Qualification: ${formData.qualification}
- Previous Education: ${formData.previousEducation}
- Statement of Purpose: ${formData.statementOfPurpose}`;

    const whatsappUrl = `https://wa.me/2347047594864?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full glass rounded-[40px] p-12 text-center space-y-8"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
            <CheckCircle size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Application Received</h2>
            <p className="text-on-surface/60 leading-relaxed">
              Thank you for applying to Daarul Falaah Islamic Institution. Our admissions team will review your application and contact you within 5-7 business days.
            </p>
          </div>
          <div className="pt-8 flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 text-left">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone size={20} />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">WhatsApp Sent</div>
                <div className="text-sm">Your application details have been sent via WhatsApp.</div>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary w-full"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold">Application Form</h1>
              <p className="text-on-surface/60 max-w-xl">
                Please provide accurate information to help us process your application efficiently.
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-between relative mb-12">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0" />
              {steps.map((s, i) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    step >= s.id ? "bg-primary border-primary text-surface" : "bg-surface border-white/10 text-on-surface/20"
                  )}>
                    <s.icon size={20} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    step >= s.id ? "text-primary" : "text-on-surface/20"
                  )}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12 space-y-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20" size={18} />
                          <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50" 
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20" size={18} />
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50" 
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20" size={18} />
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+234 704 759 4864" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50" 
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Date of Birth</label>
                        <input 
                          type="date" 
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Residential Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-on-surface/20" size={18} />
                        <textarea 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Street, City, Country" 
                          rows={3} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50" 
                          required 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Highest Qualification</label>
                      <select 
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50 appearance-none" 
                        required
                      >
                        <option value="">Select Qualification</option>
                        <option value="high-school">High School Diploma</option>
                        <option value="bachelors">Bachelor's Degree</option>
                        <option value="masters">Master's Degree</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Previous Islamic Education</label>
                      <textarea 
                        name="previousEducation"
                        value={formData.previousEducation}
                        onChange={handleInputChange}
                        placeholder="List any previous Islamic studies or institutions attended..." 
                        rows={4} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Statement of Purpose</label>
                      <textarea 
                        name="statementOfPurpose"
                        value={formData.statementOfPurpose}
                        onChange={handleInputChange}
                        placeholder="Why do you wish to join Daarul Falaah? (Min 200 words)" 
                        rows={6} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50" 
                        required 
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-6">
                      <h4 className="font-serif font-bold text-xl flex items-center gap-3">
                        <Info size={20} className="text-primary" />
                        Final Review
                      </h4>
                      <p className="text-sm text-on-surface/60 leading-relaxed">
                        By submitting this application, you confirm that all information provided is accurate and truthful. You agree to abide by the rules and regulations of Daarul Falaah Islamic Institution.
                      </p>
                      <div className="flex items-center gap-4">
                        <input type="checkbox" id="terms" className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" required />
                        <label htmlFor="terms" className="text-sm text-on-surface/80">I agree to the terms and conditions</label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-on-surface/40 hover:text-on-surface"
                  )}
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary flex items-center gap-2"
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>

          <aside className="space-y-8">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h4 className="font-serif font-bold text-xl">Need Help?</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Call Support</div>
                    <div className="text-sm">+234 704 759 4864</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface/40">Email Support</div>
                    <div className="text-sm">ismailabdulazeez536@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
