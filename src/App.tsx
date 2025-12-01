import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Brain, Heart, Star, Video, 
  Users, Zap, MessageCircle, 
  ChevronDown, ChevronUp,
  Feather, Sun, ArrowLeft, PlayCircle,
  Gem, Loader2, Moon, ArrowRight, Shield, FileText,
  Infinity
} from 'lucide-react';

const WHATSAPP_LINK = "https://chat.whatsapp.com/HqjcH2GgzL9Hqy666R0HDc";

// --- Components ---

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => (
  <section className={`py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-10 ${className}`}>
    {children}
  </section>
);

interface GoldButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GoldButton: React.FC<GoldButtonProps> = ({ children, className = "", onClick }) => {
  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className={`
          inline-flex items-center gap-3 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 
          text-slate-900 font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)]
          hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300 
          text-lg md:text-xl group ${className}
        `}
      >
        {children}
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      </button>
    );
  }
  return (
    <a 
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-3 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 
        text-slate-900 font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)]
        hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300 
        text-lg md:text-xl group ${className}
      `}
    >
      {children}
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
    </a>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-right hover:text-amber-400 transition-colors group"
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-amber-400' : 'text-slate-200'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp className="text-amber-400" /> : <ChevronDown className="text-slate-500 group-hover:text-amber-400" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-300 leading-relaxed pl-4">{answer}</p>
      </div>
    </div>
  );
};

interface BonusCardProps {
  title: string;
  sub: string;
  icon: React.ElementType;
  delay: number;
}

const BonusCard: React.FC<BonusCardProps> = ({ title, sub, icon: Icon, delay }) => {
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleInteraction = () => {
    if (loading || isSecretRevealed) return;
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setIsSecretRevealed(true);
      // Optional: Reset after 5 seconds
      setTimeout(() => {
        setIsSecretRevealed(false);
        setClickCount(0);
      }, 5000);
    }
  };

  return (
    <div 
      onClick={handleInteraction}
      className={`
        relative p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 h-full justify-center min-h-[200px] select-none cursor-pointer
        ${isSecretRevealed 
          ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-amber-500 border-2 border-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.5)] transform scale-105' 
          : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-amber-500/30 hover:shadow-[0_0_25px_rgba(124,58,237,0.2)]'
        }
      `}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <span className="text-xs text-purple-300/70">טוען בונוס...</span>
        </div>
      ) : isSecretRevealed ? (
        <div className="animate-fade-in-up">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-5 text-white mx-auto animate-spin">
            <Infinity className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-xl text-white mb-2">מסר מהיקום</h3>
          <p className="text-amber-100 font-medium">התדר שלך גבוה היום! ✨</p>
        </div>
      ) : (
        <div className="animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-5 text-amber-300 mx-auto ring-1 ring-white/10 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Icon className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
          <p className="text-slate-400">{sub}</p>
        </div>
      )}
    </div>
  );
};

// --- Page Components ---

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, onBack }) => (
  <div className="min-h-screen bg-[#050511] font-sans text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-amber-200 py-12 px-4 md:px-8">
    <div className="fixed inset-0 pointer-events-none z-0">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f0c29] to-[#02020a]"></div>
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
    </div>
    
    <div className="relative z-10 max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
      >
        <ArrowRight size={20} />
        חזרה לדף הבית
      </button>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white border-b border-white/10 pb-6">{title}</h1>
      
      <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-6">
        {children}
      </div>

       <button 
        onClick={onBack}
        className="mt-12 flex items-center justify-center w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-slate-300 font-medium"
      >
        סגור וחזור לאתר
      </button>
    </div>
  </div>
);

const TermsOfUse = ({ onBack }: { onBack: () => void }) => (
  <PageLayout title="תנאי שימוש" onBack={onBack}>
    <p>ברוכים הבאים לוובינר "תקשור - הצעד הראשון". השימוש באתר ובתכנים המוצעים בו כפוף לתנאים הבאים:</p>
    
    <h3 className="text-xl font-bold text-white mt-6">1. כללי</h3>
    <p>האתר והוובינר מציעים תכנים לימודיים וחווייתיים בתחום ההתפתחות האישית והרוחנית. ההרשמה לוובינר מהווה הסכמה לקבלת דיוור, עדכונים ותכנים שיווקיים הקשורים לפעילותנו.</p>
    
    <h3 className="text-xl font-bold text-white mt-6">2. הסרת אחריות (Disclaimer)</h3>
    <p>התכנים המועברים בוובינר, בקורסים ובאתר נועדו למטרות לימוד, העשרה והתפתחות אישית בלבד. הם <strong>אינם מהווים תחליף</strong> לייעוץ פסיכולוגי, רפואי, פיננסי או משפטי מקצועי.</p>
    <p>המשתתפת מצהירה כי היא בריאה בנפשה ולוקחת אחריות מלאה על השתתפותה בתרגולים. במידה וקיים רקע של בעיות נפשיות או רגשיות מורכבות, יש להיוועץ באיש מקצוע לפני יישום הכלים.</p>
    
    <h3 className="text-xl font-bold text-white mt-6">3. קניין רוחני</h3>
    <p>כל התכנים, המצגות, הסרטונים, הטקסטים והשיטות המועברים בוובינר הינם קניינה הרוחני הבלעדי של בעלי האתר. אין להעתיק, לשכפל, להפיץ, לצלם או לעשות שימוש מסחרי בתכנים אלו ללא אישור בכתב ומראש.</p>
    
    <h3 className="text-xl font-bold text-white mt-6">4. התנהגות במרחב הווירטואלי</h3>
    <p>הוובינר מתקיים במרחב מכבד ובטוח. אנו שומרים לעצמנו את הזכות להוציא מהמפגש משתתפת שתתנהג בצורה פוגענית, מטרידה או בלתי הולמת כלפי המנחה או משתתפות אחרות, ללא החזר כספי (במידה ושולם).</p>
  </PageLayout>
);

const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => (
  <PageLayout title="מדיניות פרטיות" onBack={onBack}>
    <p>אנו מכבדים את פרטיותך ומחויבים להגן על המידע האישי שאת משתפת איתנו. מסמך זה מפרט כיצד אנו אוספים ומשתמשים במידע.</p>
    
    <h3 className="text-xl font-bold text-white mt-6">1. איסוף מידע</h3>
    <p>בעת ההרשמה לוובינר, אנו אוספים פרטים כגון: שם מלא, כתובת דואר אלקטרוני ומספר טלפון. מידע זה נדרש לצורך שליחת קישור לזום, תזכורות ומידע רלוונטי על הקורס.</p>
    
    <h3 className="text-xl font-bold text-white mt-6">2. שימוש במידע</h3>
    <p>המידע שנאסף ישמש אך ורק למטרות הבאות:</p>
    <ul className="list-disc list-inside mr-4 space-y-2">
      <li>יצירת קשר ומתן שירות לקוחות.</li>
      <li>שליחת עדכונים, תזכורות וחומרי העשרה הקשורים לוובינר.</li>
      <li>הצעות למוצרים או שירותים נוספים שעשויים לעניין אותך (ניתן להסיר את עצמך מרשימת התפוצה בכל עת).</li>
    </ul>
    
    <h3 className="text-xl font-bold text-white mt-6">3. אבטחת מידע</h3>
    <p>אנו נוקטים באמצעי זהירות מקובלים על מנת לשמור על סודיות המידע. המידע שלך אינו מועבר לצדדים שלישיים, למעט ספקים טכנולוגיים (כגון מערכות דיוור) המסייעים לנו בתפעול השירות, וגם זאת תחת התחייבות לסודיות.</p>
    
    <h3 className="text-xl font-bold text-white mt-6">4. עוגיות (Cookies)</h3>
    <p>האתר עשוי להשתמש ב"עוגיות" לצורך שיפור חווית המשתמש וסטטיסטיקה. באפשרותך לשנות את הגדרות הדפדפן שלך כדי לחסום עוגיות אם תרצי בכך.</p>
  </PageLayout>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<'HOME' | 'TERMS' | 'PRIVACY'>('HOME');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (page === 'TERMS') return <TermsOfUse onBack={() => setPage('HOME')} />;
  if (page === 'PRIVACY') return <PrivacyPolicy onBack={() => setPage('HOME')} />;

  return (
    <div className="min-h-screen bg-[#050511] font-sans text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-amber-200">
      
      {/* Background Stars/Nebula Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f0c29] to-[#02020a]"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
        {/* Tiny stars */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* 1. Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-10 mt-10 md:mt-0">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-100 tracking-wide">וובינר מיוחד לקהילת המטפלות</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight md:leading-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-slate-300">
              תקשור היא לא
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300">
               יכולת על טבעית
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="absolute inset-x-0 bottom-2 h-4 bg-purple-600/50 -skew-x-12 transform -z-10 blur-sm"></span>
               היא מיומנות
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
            גלו איך להיכנס למצב תודעתי עמוק ולהתחיל לקבל מסרים – <span className="text-amber-300 font-medium">גם אם מעולם לא עשיתן זאת לפני כן</span>
          </p>

          <div className="flex flex-col items-center gap-5 mt-6 animate-bounce-subtle">
            <GoldButton className="text-xl px-12 py-5">
              להרשמה לוובינר
            </GoldButton>
            <p className="text-sm text-slate-400 font-medium tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></span>
              חינם | בזום
            </p>
          </div>
        </div>
      </div>

      {/* 2. Intro Section */}
      <div className="relative border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <Section className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-amber-500 rounded-2xl transform rotate-3 scale-105 opacity-30 group-hover:opacity-50 transition-opacity blur-md" />
            <img 
              src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800" 
              alt="Cosmic Connection" 
              className="relative rounded-2xl shadow-2xl w-full h-[450px] object-cover ring-1 ring-white/20 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Floating Icons */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#1a1638] border border-purple-500/30 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center animate-float">
              <Moon className="w-8 h-8 text-purple-400" />
            </div>
            <div className="absolute bottom-10 -left-6 w-14 h-14 bg-[#1a1638] border border-amber-500/30 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center animate-float-delayed">
              <Star className="w-7 h-7 text-amber-400 fill-amber-400/20" />
            </div>
          </div>

          <div className="md:col-span-7 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-purple-900/40 border border-purple-500/30 text-purple-200 rounded-lg text-sm font-semibold mb-2 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              מה מחכה לך בוובינר?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              לגלות את <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">השפה הסודית</span> של הנשמה
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                המסע בנוי על <span className="font-bold text-amber-300">תרגול חי, בשטח</span>. 
                כבר בתחילת הדרך את נכנסת למצב תודעתי של גלי מוח איטיים, מתרגלת עם שותפה, מקבלת ומעבירה מסרים ולומדת לזהות אנרגיות.
              </p>
              <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <Brain className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-200 leading-relaxed">
                  אין צורך "להאמין" – פשוט מרגישים שזה אמיתי. הגישה מחברת בין רוחניות לבין פרקטיקה.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* 3. Zoom / Digital Spaces */}
      <Section className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="order-2 md:order-1 space-y-10">
           <h2 className="text-3xl md:text-4xl font-bold text-white">
            מרחבי התקשור הדיגיטליים<br/>
            <span className="text-slate-400 text-2xl font-light">(ZOOM)</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-indigo-300 transition-colors">שפה של הנשמה</h3>
                <p className="text-slate-400 leading-relaxed">הקשבה אמיתית היא שפה של הנשמה. בוובינר תגלי איך מתחילים לדבר אותה מהסלון שלך, בתדר שחוצה מסכים.</p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-purple-900 via-amber-500/30 to-transparent" />

            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-indigo-300 transition-colors">מרחב תומך גלובלי</h3>
                <p className="text-slate-400 leading-relaxed">נוצר כאן מרחב שמאפשר לך להתקדם מכל מקום בעולם. קבוצה תומכת + הדרכה עדינה + תרגול אמיתי.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl transform rotate-6 opacity-20 blur-lg" />
          <img 
            src="https://images.unsplash.com/photo-1614726365723-49cfae92782f?auto=format&fit=crop&q=80&w=800" 
            alt="Galaxy Atmosphere" 
            className="relative rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      </Section>

      {/* 4. Syllabus / What Happens */}
      <div className="relative py-24 overflow-hidden bg-black/40 border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <Section className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              מה קורה בפועל במפגש?
            </h2>
            <p className="text-purple-300 text-lg">טעימה מהמסע הגדול שמחכה לך</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, text: "כניסה לתודעה עמוקה של גלי מוח איטיים" },
              { icon: Users, text: "תרגול חי עם שותפה למסע" },
              { icon: MessageCircle, text: "קבלה והעברה של מסרים בזמן אמת" },
              { icon: Zap, text: "זיהוי אנרגיות ותדרים דקים" },
              { icon: Video, text: "תרגול פרקטי חי בכל מפגש" },
              { icon: Sparkles, text: "רוב המשתתפות מתחילות לתקשר כבר במפגש הראשון" },
            ].map((item, i) => (
              <div key={i} className="group flex items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-white/5 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 group-hover:text-amber-300 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">{item.text}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* 5. Bonuses - Loading State Implemented */}
      <Section className="">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            הבונוסים במסלול המלא
          </h2>
          <p className="text-lg text-slate-400">העשרה לוובינר ולדרך שתבוא אחריו</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "קורס דיגיטלי מוקלט", sub: "12 הדרכים", icon: PlayCircle },
            { title: "קורס קריאה בקלפים", sub: "+ מאחורי הקלעים", icon: Gem },
            { title: "הקלטות מלאות", sub: "של כל השיעורים", icon: Video },
            { title: "תוכן מתעדכן", sub: "במסלול ההכשרה", icon: Zap },
            { title: "פידבק אישי", sub: "בזמן אמת בלייב", icon: MessageCircle },
            { title: "ליווי צמוד", sub: "בקבוצת ווטסאפ", icon: Users },
          ].map((bonus, i) => (
            <BonusCard 
              key={i} 
              title={bonus.title}
              sub={bonus.sub}
              icon={bonus.icon}
              delay={1000 + (i * 200)}
            />
          ))}
        </div>
      </Section>

      {/* 6. Who fits */}
      <Section>
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-14 shadow-2xl border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">למי המסע הזה מתאים?</h2>
          
          <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
            {[
              "למי שרוצה להפוך אינטואיציה לאומנות תקשור",
              "למטפלות שרוצות להרחיב את ארגז הכלים",
              "למי שרוצה לפתוח קליניקה לתקשור",
              "למי שמחפשת בהירות פנימית בחיים",
              "למי שמרגישה עומק ורוצה לגעת בו",
              "למי שהלב שלה מדבר והיא רוצה להקשיב",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-900/50 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/50 transition-colors">
                  {i % 2 === 0 ? <Feather className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
                </div>
                <span className="text-lg text-slate-200 group-hover:text-white transition-colors">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. CTA */}
      <div className="py-24 px-6 text-center relative overflow-hidden">
        {/* Glow effect behind button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-xl">
            אם את מרגישה שזה קורא לך – <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">זה לא במקרה</span>
          </h2>
          <p className="text-2xl text-purple-200 font-light">
            זהו צעד קטן שפותח דלת גדולה לעולם שתמיד היה בתוכך.
          </p>
          <GoldButton className="text-xl px-16 py-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]">
            להרשמה לוובינר החינמי
          </GoldButton>
        </div>
      </div>

      {/* 8. FAQ */}
      <Section className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">שאלות נפוצות</h2>
        <div className="space-y-2 bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <AccordionItem 
            question="האם צריך ניסיון קודם בתקשור?" 
            answer="ממש לא. הוובינר בנוי כך שהוא מתאים גם למתחילות גמורות וגם למי שכבר התנסתה בעבר. אנחנו לומדים את היסודות מההתחלה." 
          />
          <AccordionItem 
            question="איך מתחברים לזום?" 
            answer="לאחר ההרשמה תקבלי קישור אישי למייל ולקבוצת הווטסאפ. ביום הוובינר פשוט לוחצים על הקישור ונכנסים." 
          />
          <AccordionItem 
            question="האם התרגול הוא אישי או קבוצתי?" 
            answer="הוובינר כולל הסברים לקבוצה כולה, אך התרגול המעשי נעשה לרוב בזוגות בחדרים פרטיים (Breakout Rooms) או בעבודה אישית מודרכת." 
          />
        </div>
      </Section>

      {/* 9. Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 text-center text-slate-500 text-sm backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2023 כל הזכויות שמורות לוובינר תקשור.</p>
          <div className="flex gap-8">
            <button onClick={() => setPage('TERMS')} className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">תנאי שימוש</button>
            <button onClick={() => setPage('PRIVACY')} className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">מדיניות פרטיות</button>
            <a href={WHATSAPP_LINK} className="hover:text-amber-400 transition-colors">צור קשר</a>
          </div>
        </div>
      </footer>

    </div>
  );
}