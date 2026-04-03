import React from 'react';
import { motion } from 'motion/react';
import { Mail, Book, Award, Globe, Search, Filter } from 'lucide-react';

export const Faculty: React.FC = () => {
  const facultyMembers = [
    {
      name: 'Dr. Ahmed Al-Farsi',
      role: 'Rector & Senior Scholar',
      specialization: 'Islamic Jurisprudence (Fiqh)',
      education: 'Ph.D. in Islamic Law, Al-Azhar University',
      bio: 'Dr. Al-Farsi has over 30 years of experience in classical Islamic scholarship and has authored numerous works on the principles of jurisprudence.',
      seed: 'scholar-0'
    },
    {
      name: 'Shaykha Fatima Zahra',
      role: 'Dean of Academic Affairs',
      specialization: 'Hadith Sciences & Women\'s Studies',
      education: 'M.A. in Hadith Studies, University of Madinah',
      bio: 'A specialist in the transmission of prophetic traditions, Shaykha Fatima leads our efforts in preserving the scholarly heritage of female scholars.',
      seed: 'scholar-1'
    },
    {
      name: 'Prof. Yusuf Mansour',
      role: 'Head of Research',
      specialization: 'Islamic Intellectual History',
      education: 'Ph.D. in History, Oxford University',
      bio: 'Professor Mansour focuses on the development of Islamic thought during the golden age and its impact on modern intellectual movements.',
      seed: 'scholar-2'
    },
    {
      name: 'Dr. Sarah Khalid',
      role: 'Director of Student Life',
      specialization: 'Islamic Psychology & Ethics',
      education: 'Ph.D. in Psychology, Stanford University',
      bio: 'Dr. Khalid bridges the gap between traditional Islamic ethics and modern psychological frameworks to support student well-being.',
      seed: 'scholar-3'
    },
    {
      name: 'Shaykh Ibrahim Mansour',
      role: 'Senior Instructor',
      specialization: 'Quranic Exegesis (Tafsir)',
      education: 'Ijazah in Ten Qira\'at, Cairo',
      bio: 'Shaykh Ibrahim is a world-renowned reciter and exegete, specializing in the linguistic miracles of the Quran.',
      seed: 'scholar-4'
    },
    {
      name: 'Dr. Maryam Al-Zahra',
      role: 'Assistant Professor',
      specialization: 'Classical Theology (Aqidah)',
      education: 'Ph.D. in Theology, University of Jordan',
      bio: 'Dr. Maryam specializes in the historical development of Islamic creed and its defense against modern philosophical challenges.',
      seed: 'scholar-5'
    }
  ];

  const scholarImages = [
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1544005313-94ddf0286df2',
    'photo-1500648767791-00dcc994a43e',
    'photo-1554151228-14d9def656e4',
    'photo-1472099645785-5658abf4ff4e',
    'photo-1494790108377-be9c29b29330'
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Our Scholars
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold">Faculty of Scholars</h1>
            <p className="text-on-surface/60 max-w-xl">
              Our faculty comprises world-renowned scholars who hold authentic authorizations (ijazahs) in their respective fields.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40" size={20} />
            <input 
              type="text" 
              placeholder="Search faculty..." 
              className="w-full bg-surface-container-high border border-white/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[40px] overflow-hidden group hover:border-primary/30 transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/${scholarImages[i % scholarImages.length]}?auto=format&fit=crop&q=80&w=800&h=1000`} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-serif font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-on-surface/60">
                    <Book size={16} className="text-primary" />
                    <span>{member.specialization}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface/60">
                    <Award size={16} className="text-primary" />
                    <span>{member.education}</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface/60 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <button className="p-2 rounded-xl bg-white/5 text-on-surface/40 hover:bg-primary hover:text-surface transition-all">
                    <Mail size={18} />
                  </button>
                  <button className="p-2 rounded-xl bg-white/5 text-on-surface/40 hover:bg-primary hover:text-surface transition-all">
                    <Globe size={18} />
                  </button>
                  <button className="text-primary text-xs font-bold uppercase tracking-widest ml-auto hover:underline">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visiting Scholars */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Visiting Scholars</h2>
            <p className="text-on-surface/60 max-w-2xl mx-auto">
              We regularly host distinguished scholars from around the world for intensive seminars and research collaborations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Shaykh Hamza Yusuf', institution: 'Zaytuna College' },
              { name: 'Dr. Ingrid Mattson', institution: 'Huron University' },
              { name: 'Shaykh Abdal Hakim Murad', institution: 'Cambridge Muslim College' },
              { name: 'Dr. Yasir Qadhi', institution: 'The Islamic Seminary of America' },
            ].map((scholar, i) => (
              <div key={i} className="glass p-6 rounded-3xl text-center space-y-2">
                <h4 className="font-serif font-bold">{scholar.name}</h4>
                <p className="text-[10px] text-on-surface/40 uppercase tracking-widest font-bold">{scholar.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
