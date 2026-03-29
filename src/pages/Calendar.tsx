import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Info } from 'lucide-react';

export const Calendar: React.FC = () => {
  const academicTerms = [
    { name: 'Fall Term 2026', start: 'Sept 1, 2026', end: 'Dec 15, 2026', status: 'Upcoming' },
    { name: 'Winter Term 2027', start: 'Jan 10, 2027', end: 'April 20, 2027', status: 'Scheduled' },
    { name: 'Summer Intensive 2027', start: 'June 1, 2027', end: 'July 30, 2027', status: 'Scheduled' },
  ];

  const events = [
    { date: 'Oct 15, 2026', title: 'Annual Scholarly Symposium', time: '9:00 AM - 5:00 PM', location: 'Main Auditorium' },
    { date: 'Nov 5, 2026', title: 'Prophetic Tradition Workshop', time: '2:00 PM - 6:00 PM', location: 'Seminar Room B' },
    { date: 'Dec 1, 2026', title: 'Final Assessment Period Begins', time: 'All Day', location: 'Examination Hall' },
    { date: 'Dec 20, 2026', title: 'Graduation Ceremony', time: '10:00 AM - 1:00 PM', location: 'Grand Hall' },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            Academic Schedule
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">Academic Calendar</h1>
          <p className="text-on-surface/60 max-w-2xl mx-auto">
            Plan your academic journey with our comprehensive schedule of terms, holidays, and scholarly events.
          </p>
        </div>

        {/* Terms Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {academicTerms.map((term, i) => (
            <div key={i} className="glass p-8 rounded-3xl space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <CalendarIcon size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-on-surface/40 border border-white/10">
                  {term.status}
                </span>
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-serif font-bold">{term.name}</h3>
                <div className="flex items-center gap-2 text-sm text-on-surface/60">
                  <Clock size={14} className="text-primary" />
                  <span>{term.start} - {term.end}</span>
                </div>
              </div>
              <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn">
                View Detailed Schedule <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-serif font-bold">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event, i) => (
                <div key={i} className="glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{event.date.split(' ')[0]}</span>
                      <span className="text-xl font-serif font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-lg">{event.title}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface/40">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-outline py-2 px-6 text-xs whitespace-nowrap">Register</button>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h4 className="font-serif font-bold text-xl">Important Dates</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Application Deadline', date: 'Aug 1, 2026' },
                  { label: 'Scholarship Deadline', date: 'July 15, 2026' },
                  { label: 'Orientation Week', date: 'Aug 24-28, 2026' },
                  { label: 'Late Registration', date: 'Sept 1-7, 2026' },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-on-surface/60">{item.label}</span>
                    <span className="font-bold text-primary">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Info size={20} />
                <h4 className="font-serif font-bold">Holiday Notice</h4>
              </div>
              <p className="text-xs text-on-surface/60 leading-relaxed">
                The institution will be closed during major Islamic holidays. Specific dates will be announced 30 days in advance based on the lunar calendar.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
