import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Send, MessageSquare, User, Clock, CheckCircle, Play, Users, ArrowRight } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { cn } from '../lib/utils';

interface Question {
  id: string;
  text: string;
  author: string;
  status: 'pending' | 'answered';
  answer?: string;
}

interface Session {
  id: string;
  title: string;
  instructor: string;
  status: 'live' | 'scheduled';
  questions: Question[];
}

export const LiveQA: React.FC = () => {
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [activeSession, setActiveSession] = React.useState<Session | null>(null);
  const [questionText, setQuestionText] = React.useState('');
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [studentName] = React.useState(() => localStorage.getItem('student_name') || 'Anonymous Student');

  React.useEffect(() => {
    // Fetch initial sessions
    fetch('/api/live-sessions')
      .then(res => res.json())
      .then(data => setSessions(data));

    // Initialize socket
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('session_state', (state: Session) => {
      setActiveSession(state);
    });

    newSocket.on('new_question', (question: Question) => {
      setActiveSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: [...prev.questions, question]
        };
      });
    });

    newSocket.on('question_answered', ({ questionId, answer }: { questionId: string, answer: string }) => {
      setActiveSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: prev.questions.map(q => 
            q.id === questionId ? { ...q, status: 'answered', answer } : q
          )
        };
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinSession = (sessionId: string) => {
    socket?.emit('join_session', sessionId);
  };

  const submitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !activeSession) return;

    socket?.emit('submit_question', {
      sessionId: activeSession.id,
      text: questionText,
      author: studentName
    });
    setQuestionText('');
  };

  if (activeSession) {
    return (
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => setActiveSession(null)}
            className="text-xs font-bold uppercase tracking-widest text-on-surface/40 hover:text-primary transition-colors mb-8 flex items-center gap-2"
          >
            <ArrowRight size={14} className="rotate-180" /> Back to Sessions
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Live Stream Area */}
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video glass rounded-[40px] overflow-hidden relative group shadow-2xl shadow-primary/5">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/islamic-symposium-live/1200/800')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary mx-auto cursor-pointer border border-primary/30 group-hover:bg-primary/30 transition-all"
                    >
                      <Play size={40} fill="currentColor" className="ml-2" />
                    </motion.div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Live Symposium</p>
                      <p className="text-xs text-on-surface/40 uppercase tracking-widest">Click to join the audio stream</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 left-8 flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-destructive text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-destructive/20">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Live
                  </div>
                  <div className="px-4 py-1.5 glass backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2 border border-white/10">
                    <Users size={12} className="text-primary" /> 142 Scholars Online
                  </div>
                </div>

                {/* Stream Controls Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-primary cursor-pointer transition-colors">
                      <Video size={20} />
                    </div>
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-primary cursor-pointer transition-colors">
                      <Users size={20} />
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    HD 1080p • Low Latency
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-serif font-bold">{activeSession.title}</h1>
                <div className="flex items-center gap-4 text-on-surface/60">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="text-sm">{activeSession.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm">Started 45 mins ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A Sidebar */}
            <div className="lg:col-span-1 flex flex-col h-[600px] glass rounded-[40px] overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-serif font-bold text-xl flex items-center gap-2">
                  <MessageSquare size={20} className="text-primary" /> Live Q&A
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
                  {activeSession.questions.length} Questions
                </span>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                <AnimatePresence initial={false}>
                  {activeSession.questions.map((q) => (
                    <motion.div 
                      key={q.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-4 rounded-2xl space-y-3 transition-all",
                        q.status === 'answered' ? "bg-primary/5 border border-primary/20" : "bg-white/5 border border-white/5"
                      )}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                            {q.author[0]}
                          </div>
                          <span className="text-xs font-bold">{q.author}</span>
                        </div>
                        {q.status === 'answered' && (
                          <CheckCircle size={14} className="text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-on-surface/80 leading-relaxed">{q.text}</p>
                      {q.answer && (
                        <div className="pt-3 border-t border-primary/10">
                          <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Answer:</p>
                          <p className="text-xs text-on-surface/60 italic leading-relaxed">{q.answer}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <form onSubmit={submitQuestion} className="p-6 border-t border-white/5 bg-surface-container-low">
                <div className="relative">
                  <input 
                    type="text" 
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!questionText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20"
          >
            <Video size={14} /> Live Sessions
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
            Scholarly Symposiums & <span className="text-primary">Live Q&A</span>
          </h1>
          <p className="text-xl text-on-surface/60 leading-relaxed">
            Engage directly with world-renowned instructors in real-time. Ask questions, participate in debates, and deepen your understanding of classical texts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <motion.div 
              key={session.id}
              whileHover={{ y: -8 }}
              className="glass p-8 rounded-[40px] space-y-8 group"
            >
              <div className="aspect-video rounded-3xl overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${session.id}/600/400`} 
                  alt={session.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                {session.status === 'live' && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-destructive text-[10px] font-bold uppercase tracking-widest rounded-full animate-pulse">Live Now</div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">{session.title}</h3>
                <div className="flex items-center gap-3 text-on-surface/60">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {session.instructor[0]}
                  </div>
                  <span className="text-sm">{session.instructor}</span>
                </div>
                
                <button 
                  onClick={() => joinSession(session.id)}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  {session.status === 'live' ? 'Join Live Session' : 'Set Reminder'} 
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="glass p-12 rounded-[48px] space-y-12">
          <h2 className="text-3xl font-serif font-bold text-center">How Live Sessions Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Join a Session', desc: 'Select an active or upcoming session from the dashboard to enter the virtual lecture hall.' },
              { title: 'Submit Questions', desc: 'Use the live chat to submit your questions. You can also upvote questions from other students.' },
              { title: 'Get Answers', desc: 'Instructors will address questions during the Q&A segment of the live symposium.' }
            ].map((step, i) => (
              <div key={i} className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto font-serif font-bold text-xl">
                  {i + 1}
                </div>
                <h4 className="font-serif font-bold text-xl">{step.title}</h4>
                <p className="text-sm text-on-surface/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
