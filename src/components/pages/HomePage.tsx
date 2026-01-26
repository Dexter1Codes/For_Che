// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Volume2, VolumeX, Sparkles, ArrowRight, Music, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import type { AffectionMessages } from '@/entities';

// --- Types ---
interface SectionProps {
  onComplete?: () => void;
  onNext?: (data?: any) => void;
  data?: any;
}

// --- Utility Components ---

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply">
    <div className="absolute inset-0 bg-repeat w-full h-full" style={{ backgroundImage: 'url("https://static.wixstatic.com/media/5adf54_c9d834326f934a80baa7da1aeb38cc1c~mv2.png?originWidth=1920&originHeight=1024")' }}></div>
  </div>
);

const FloatingHeart = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.8, 0],
      scale: [0.5, 1, 0.8],
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{ left: `${x}%` }}
    className="absolute top-0 pointer-events-none"
  >
    <Heart className="w-8 h-8 text-primary/40 fill-primary/20" />
  </motion.div>
);

// --- Main Component ---

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [playfulAnswer, setPlayfulAnswer] = useState('');
  const [proposalAnswer, setProposalAnswer] = useState('');
  const [messages, setMessages] = useState<AffectionMessages[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Data Fidelity Protocol: Preserving original data fetching logic
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const result = await BaseCrudService.getAll<AffectionMessages>('affectionmessages');
      const sortedMessages = result.items.sort((a, b) => 
        (a.displayOrder || 0) - (b.displayOrder || 0)
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Navigation Handlers
  const handleBegin = () => setCurrentSection(1);
  
  const handlePlayfulSubmit = (answer: string) => {
    setPlayfulAnswer(answer);
    setTimeout(() => {
      setCurrentSection(2);
      if (audioRef.current && isMuted) {
        setIsMuted(false);
      }
    }, 1500);
  };

  const handleMessagesComplete = () => setCurrentSection(3);

  const handleProposalAnswer = (answer: string) => {
    setProposalAnswer(answer);
    setTimeout(() => {
      setCurrentSection(4);
    }, 800);
  };

  // Audio Logic
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Autoplay prevented", e));
      }
    }
  }, [isMuted]);

  const toggleAudio = () => setIsMuted(!isMuted);

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary/30 overflow-x-clip">
      <GrainOverlay />
      <Header onToggleAudio={toggleAudio} isMuted={isMuted} />
      
      {/* Crash Prevention: Audio element always rendered */}
      <audio ref={audioRef} loop className="hidden">
        <source src="https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3" type="audio/mpeg" />
      </audio>

      <main className="relative w-full">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <OpeningSection key="opening" onNext={handleBegin} />
          )}
          {currentSection === 1 && (
            <PlayfulSection key="playful" onNext={handlePlayfulSubmit} />
          )}
          {currentSection === 2 && (
            <AffectionSection 
              key="affection" 
              messages={messages} 
              isLoading={isLoadingMessages} 
              onComplete={handleMessagesComplete} 
            />
          )}
          {currentSection === 3 && (
            <ProposalSection key="proposal" onNext={handleProposalAnswer} />
          )}
          {currentSection === 4 && (
            <CelebrationSection key="celebration" />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// --- Section Components ---

function OpeningSection({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-accent-lavender/20 to-transparent rounded-tr-[100px]" />
      </div>

      <div className="container relative z-10 max-w-[100rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-5 flex flex-col items-start text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-deep-muted text-sm font-semibold tracking-wider uppercase mb-4">
              A little something
            </span>
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground mb-6">
              For You
            </h1>
            <div className="h-px w-24 bg-foreground/20 mb-6" />
            <p className="font-paragraph text-lg md:text-xl text-deep-muted leading-relaxed max-w-md">
              I've made something not so crazily special but yeah something that will surely add a smile to your face
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              onClick={onNext}
              className="group relative overflow-hidden rounded-full bg-foreground text-background px-10 py-8 text-lg transition-all hover:bg-foreground/90 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                wanna start? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Visual Content */}
        <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="relative w-full h-full"
          >
             {/* Main Hero Image */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl">
               <Image 
                 src="https://static.wixstatic.com/media/5adf54_0584a39dc1a44b14be6d69c3d32a911e~mv2.png?originWidth=1280&originHeight=704" 
                 alt="Soft romantic atmosphere" 
                 className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]"
               />
               <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>

            {/* Floating Decorative Element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -left-12 w-64 h-64 bg-background rounded-full p-4 shadow-xl hidden md:block"
            >
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-secondary">
                 <Image 
                   src="https://static.wixstatic.com/media/5adf54_31f8bf259e3b46f6ac4f2b22a1ea22b8~mv2.png?originWidth=1280&originHeight=704" 
                   alt="Detail texture" 
                   className="w-full h-full object-cover"
                 />
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function PlayfulSection({ onNext }: { onNext: (ans: string) => void }) {
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (ans: string) => {
    setHasAnswered(true);
    onNext(ans);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex items-center justify-center bg-secondary/20 relative overflow-hidden px-6"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      
      <div className="max-w-4xl w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!hasAnswered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="bg-background/80 backdrop-blur-md rounded-[3rem] p-12 md:p-20 shadow-xl border border-white/50 text-center"
            >
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-accent-lavender flex items-center justify-center">
                  <Stars className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
                Ek Chhota Sa Sawal
              </h2>
              
              <p className="font-paragraph text-xl md:text-2xl text-deep-muted mb-12 leading-relaxed max-w-2xl mx-auto">
                Aap mujhe kabhi kabhi pyaar se <span className="font-bold text-primary">"bandar"</span> bulate hain... 
                <br className="hidden md:block" />
                <span className="italic mt-2 block text-foreground">Kya aap sochte hain main cute bandar hoon?</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  onClick={() => handleAnswer('yes')}
                  className="min-w-[200px] bg-accent-blush text-foreground hover:bg-accent-blush/80 rounded-full px-8 py-6 text-lg font-paragraph font-semibold transition-all hover:-translate-y-1 shadow-sm"
                >
                  Haan, bilkul
                </Button>
                <Button
                  onClick={() => handleAnswer('very')}
                  className="min-w-[200px] bg-accent-lavender text-foreground hover:bg-accent-lavender/80 rounded-full px-8 py-6 text-lg font-paragraph font-semibold transition-all hover:-translate-y-1 shadow-sm"
                >
                  Bahut cute
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block"
              >
                <Heart className="w-24 h-24 text-primary fill-primary mx-auto mb-8 drop-shadow-lg" />
              </motion.div>
              <h3 className="font-heading text-5xl md:text-6xl text-foreground">
                Shukriya ❤️
              </h3>
              <p className="font-paragraph text-xl text-deep-muted mt-4">
                Dil khush kar diya aapne...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function AffectionSection({ 
  messages, 
  isLoading, 
  onComplete 
}: { 
  messages: AffectionMessages[]; 
  isLoading: boolean; 
  onComplete: () => void; 
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive disclosure logic
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const interval = setInterval(() => {
        setVisibleCount(prev => {
          if (prev < messages.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 2500); // Slower, more deliberate pace
      return () => clearInterval(interval);
    }
  }, [isLoading, messages.length]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-background py-24 px-6 relative"
    >
      <div className="max-w-[100rem] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-4">Kuch Baatein</h2>
          <div className="h-1 w-20 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {!isLoading && messages.slice(0, visibleCount).map((msg, idx) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group"
            >
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-secondary/50 h-full flex flex-col justify-between hover:shadow-md transition-shadow duration-500 relative overflow-hidden">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-lavender/20 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                
                <div className="relative z-10">
                  <Sparkles className="w-6 h-6 text-primary/60 mb-6" />
                  <p className="font-paragraph text-xl md:text-2xl text-foreground leading-relaxed">
                    "{msg.messageText}"
                  </p>
                </div>
                
                {msg.senderName && (
                  <div className="mt-8 pt-6 border-t border-secondary/30">
                    <p className="font-heading text-lg text-deep-muted italic text-right">
                      — {msg.senderName}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion State */}
        {visibleCount === messages.length && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-24 text-center"
          >
            <p className="font-paragraph text-deep-muted mb-8 text-lg">Aur ab, ek aakhri baat...</p>
            <Button
              onClick={onComplete}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-12 py-6 text-lg font-paragraph font-semibold transition-all hover:scale-105 shadow-lg"
            >
              Aage Badhein
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

function ProposalSection({ onNext }: { onNext: (ans: string) => void }) {
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (ans: string) => {
    setHasAnswered(true);
    onNext(ans);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-accent-lavender/20 px-6 py-20"
    >
      <div className="max-w-[100rem] w-full mx-auto text-center relative">
        <AnimatePresence mode="wait">
          {!hasAnswered ? (
            <motion.div
              key="proposal-q"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-12 inline-block"
              >
                <div className="relative">
                  <Heart className="w-32 h-32 text-accent-blush fill-accent-blush/50" />
                  <Heart className="w-32 h-32 text-primary absolute top-0 left-0 animate-pulse" />
                </div>
              </motion.div>

              <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl text-foreground mb-12 tracking-tight">
                Kya aap meri <br />
                <span className="text-primary italic">Valentine</span> banogi?
              </h2>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-16">
                <Button
                  onClick={() => handleAnswer('yes')}
                  className="min-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-xl font-paragraph font-semibold transition-all hover:-translate-y-1 shadow-lg hover:shadow-primary/30"
                >
                  Haan
                </Button>
                <Button
                  onClick={() => handleAnswer('absolutely')}
                  className="min-w-[220px] bg-accent-lavender text-foreground hover:bg-accent-lavender/90 rounded-full px-10 py-6 text-xl font-paragraph font-semibold transition-all hover:-translate-y-1 shadow-lg hover:shadow-accent-lavender/30"
                >
                  Bilkul Haan
                </Button>
                <Button
                  onClick={() => handleAnswer('ofcourse')}
                  className="min-w-[220px] bg-accent-blush text-foreground hover:bg-accent-blush/90 rounded-full px-10 py-6 text-xl font-paragraph font-semibold transition-all hover:-translate-y-1 shadow-lg hover:shadow-accent-blush/30"
                >
                  Zaroor
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="proposal-a"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10"
            >
              <Heart className="w-40 h-40 text-primary fill-primary mx-auto mb-8" />
              <h2 className="font-heading text-6xl md:text-7xl text-foreground">
                Mera Naseeb ❤️
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function CelebrationSection() {
  // Generate hearts for animation
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5
  }));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden px-6"
    >
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} delay={heart.delay} x={heart.x} />
      ))}

      <div className="max-w-[100rem] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center lg:text-left"
        >
          <h2 className="font-heading text-7xl md:text-8xl lg:text-9xl text-foreground mb-8 leading-none">
            Happy <br />
            <span className="text-primary">Valentine's</span> <br />
            Day
          </h2>
          <div className="h-1 w-32 bg-secondary mx-auto lg:mx-0 mb-8" />
          <p className="font-paragraph text-xl md:text-2xl text-deep-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
            Aap mere liye bahut khaas hain. Har din aap ke saath special hai, 
            lekin aaj ka din aur bhi zyada special hai.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-secondary inline-block"
          >
            <p className="font-heading text-2xl text-foreground">
              ❤️ With all my love ❤️
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 1.2, type: "spring", bounce: 0.4 }}
          className="relative h-[50vh] lg:h-[70vh] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
        >
          <Image 
            src="https://static.wixstatic.com/media/5adf54_19c2625c2b9848da9a0643ee53d3fe26~mv2.png?originWidth=1152&originHeight=640" 
            alt="Celebration of love" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-overlay" />
        </motion.div>
      </div>
    </motion.section>
  );
}