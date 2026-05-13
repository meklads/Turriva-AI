import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, v] as const
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useInView()
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {children}
    </div>
  )
}

function SectionTag({ text }: { text: string }) {
  return <div className="tag mb-4">{text}</div>
}

/* ── HERO VISUAL ─────────────────────────────────────────────────────────── */
function HeroVisual({ isAr }: { isAr: boolean }) {
  return (
    <div className="relative rounded-3xl overflow-hidden" style={{ height: 460, background: 'linear-gradient(135deg, #1e3a4c 0%, #0d5c63 45%, #1a7a84 100%)' }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
        backgroundSize: '36px 36px'
      }} />
      <div className="absolute inset-5 flex flex-col gap-3">
        <div className="rounded-2xl flex-1 flex flex-col p-5" style={{ background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.18)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-white/50 text-xs">{isAr ? 'مركز المبيعات الذكي' : 'SMART SALES CENTER'}</div>
              <div className="text-white font-bold text-sm mt-0.5">Al Nakheel Tower — Riyadh</div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(42,181,194,0.3)', color: '#7ee8ef' }}>● LIVE</span>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <svg viewBox="0 0 460 150" className="w-full h-full" fill="none">
              <rect x="8" y="8" width="90" height="134" rx="4" stroke="rgba(42,181,194,0.7)" strokeWidth="1.5" fill="rgba(42,181,194,0.06)" />
              <rect x="108" y="8" width="140" height="62" rx="4" stroke="rgba(42,181,194,0.6)" strokeWidth="1.5" fill="rgba(42,181,194,0.06)" />
              <rect x="108" y="80" width="140" height="62" rx="4" stroke="rgba(42,181,194,0.5)" strokeWidth="1.5" fill="rgba(42,181,194,0.08)" />
              <rect x="258" y="8" width="90" height="134" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
              <rect x="358" y="8" width="94" height="134" rx="4" stroke="rgba(42,181,194,0.5)" strokeWidth="1.5" fill="rgba(42,181,194,0.06)" />
              <circle cx="178" cy="39" r="7" fill="rgba(42,181,194,0.9)" /><circle cx="178" cy="39" r="12" fill="none" stroke="rgba(42,181,194,0.4)" strokeWidth="1.5" />
              <text x="112" y="65" fill="rgba(255,255,255,0.45)" fontSize="9">LOBBY</text>
              <text x="112" y="110" fill="rgba(255,255,255,0.45)" fontSize="9">GALLERY</text>
              <text x="363" y="76" fill="rgba(255,255,255,0.35)" fontSize="9">VR ZONE</text>
            </svg>
          </div>
          <div className="text-right mt-2 text-xs" style={{ color: 'rgba(42,181,194,0.8)' }}>Floor 1 · Interactive Map</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: '147', l: isAr ? 'وحدة مباعة' : 'Units Sold' },
            { v: '38', l: isAr ? 'استفسار نشط' : 'Live Enquiries' },
            { v: '24m', l: isAr ? 'متوسط الزيارة' : 'Avg. Visit' },
          ].map(s => (
            <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.11)', backdropFilter: 'blur(10px)' }}>
              <div className="text-white font-bold text-xl">{s.v}</div>
              <div className="text-white/50 text-xs">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── DELIVERABLE CARD ────────────────────────────────────────────────────── */
function DeliverCard({ gradient, icon, title, desc, points }: {
  gradient: string; icon: string; title: string; desc: string; points: string[]
}) {
  return (
    <div className="rounded-3xl overflow-hidden flex flex-col" style={{ border: '1px solid #e9ecef', background: 'white' }}>
      <div className="h-44 relative flex items-end p-5" style={{ background: gradient }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.5) 0%, transparent 60%)'
        }} />
        <span className="text-5xl relative z-10" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>{icon}</span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
        <ul className="space-y-1.5 mt-auto">
          {points.map(p => (
            <li key={p} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--teal-mid)' }} />{p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── MAIN ────────────────────────────────────────────────────────────────── */
export default function RealEstate() {
  const { lang, isAr } = useLang()
  const ar = isAr

  const deliverables = [
    {
      gradient: 'linear-gradient(135deg, #1e3a4c, #0d5c63)',
      icon: '🏛️',
      title: ar ? 'النماذج المعمارية التفاعلية' : 'Interactive Architectural Models',
      desc: ar ? 'نماذج فيزيائية بمقياس ضخم مدمجة مع تقنية رقمية — إضاءة تفاعلية وتمييز للوحدات وعرض لحظي للتوفر.' : 'Large-scale physical models integrated with digital technology — interactive lighting, unit highlighting, and real-time availability display.',
      points: ar ? ['تمييز الوحدات لحظياً', 'تحكم بالإضاءة', 'ربط بالعرض الرقمي'] : ['Real-time unit highlighting', 'Interactive lighting control', 'Connected digital display'],
    },
    {
      gradient: 'linear-gradient(135deg, #2d1b69, #4a2da8)',
      icon: '🖐️',
      title: ar ? 'شاشات اللمس التفاعلية' : 'Interactive Touch Screens',
      desc: ar ? 'استعراض المخططات والمرافق والإطلالات بلمسة إصبع. تصفية وحدات، جولات ثلاثية الأبعاد، وأدوات مقارنة مباشرة.' : 'Browse floor plans, amenities, and views with a fingertip. Unit filtering, 3D tours, and live comparison tools.',
      points: ar ? ['تصفح المخططات', 'مقارنة الوحدات', 'جولة ثلاثية الأبعاد'] : ['Floor plan exploration', 'Unit comparison', '3D tour integration'],
    },
    {
      gradient: 'linear-gradient(135deg, #1a3a2a, #2d6a4f)',
      icon: '🎬',
      title: ar ? 'مقاطع فيديو ثلاثية الأبعاد سينمائية' : 'Cinematic 3D Video Content',
      desc: ar ? 'أفلام احترافية تُجسّد المشروع قبل البناء — بأسلوب حياة، وعرض للمستثمرين، وجولات بصرية غامرة.' : 'Professional films that bring unbuilt projects to life — lifestyle storytelling, investor presentations, and immersive visual tours.',
      points: ar ? ['سرد قصة المشروع', 'تصور أسلوب الحياة', 'أفلام للمستثمرين'] : ['Project storytelling', 'Lifestyle visualization', 'Investor presentation films'],
    },
    {
      gradient: 'linear-gradient(135deg, #3a1a1a, #6b2d2d)',
      icon: '📺',
      title: ar ? 'أنظمة العرض الذكية' : 'Smart Presentation Systems',
      desc: ar ? 'شاشات عرض سينمائية عالية الدقة مع إدارة محتوى مباشرة وتكامل بيانات لحظي.' : 'High-resolution cinematic display systems with live content management and real-time data integration.',
      points: ar ? ['عروض متزامنة', 'إدارة المحتوى عن بُعد', 'ربط البيانات لحظياً'] : ['Synchronized presentations', 'Remote content management', 'Real-time data integration'],
    },
    {
      gradient: 'linear-gradient(135deg, #1a2a4a, #2d4a8a)',
      icon: '🎨',
      title: ar ? 'تجربة الهوية المكانية للمبيعات' : 'Branded Spatial Identity',
      desc: ar ? 'كل جدار وأرضية وسقف وسطح يُصمَّم كجزء من تجربة متكاملة — منسجمة مع هوية العلامة التجارية.' : 'Every wall, floor, ceiling, and surface designed as part of one integrated experience — aligned with your brand identity.',
      points: ar ? ['ديكور معماري مخصص', 'هوية داخلية للمشروع', 'تصميم المسار التجريبي'] : ['Custom architectural decor', 'Interior project identity', 'Experience journey design'],
    },
    {
      gradient: 'linear-gradient(135deg, #0f2027, #203a43)',
      icon: '🤖',
      title: ar ? 'مساعد المبيعات الذكي' : 'AI Sales Assistant',
      desc: ar ? 'كشك ذكي ومساعد افتراضي يُجيب على أسئلة المشترين ويعرض تفاصيل الوحدات ويحجز المواعيد.' : 'Smart kiosk and virtual assistant that answers buyer questions, shows unit details, and books appointments.',
      points: ar ? ['إجابة لحظية على الأسئلة', 'حجز المواعيد', 'تأهيل العملاء المحتملين'] : ['Instant question answering', 'Appointment booking', 'Lead qualification'],
    },
  ]

  const problems = ar ? [
    'فريق المبيعات يكرر نفس الشرح لكل عميل',
    'العملاء يجدون صعوبة في تصور المشروع من مخططات جامدة',
    'تفضيلات العملاء لا تُسجَّل ولا تُحلَّل',
    'عروض المبيعات تبدو تقليدية ومملة',
    'المطور يفقد بيانات سلوكية قيّمة',
  ] : [
    'Sales teams repeat the same explanations to every visitor',
    'Clients struggle to visualize the project from static floor plans',
    'Customer preferences are never captured or analyzed',
    'Sales presentations feel outdated and unconvincing',
    'Developers miss valuable behavioral data from every visit',
  ]

  const outcomes = ar ? [
    { icon: '⚡', t: 'تفاعل أعمق', d: 'الزوار يستكشفون الوحدات بأنفسهم بدلاً من الاستماع فقط' },
    { icon: '🎯', t: 'فهم أسرع', d: 'عرض بصري يُجسّد المشروع ويزيل كل التساؤلات' },
    { icon: '📊', t: 'بيانات حقيقية', d: 'كل تفاعل يُغذّي لوحة تحليلات المبيعات' },
    { icon: '🏆', t: 'تموضع متميز', d: 'مركز مبيعات يُعكس مستوى المشروع ويُقنع بالجودة' },
  ] : [
    { icon: '⚡', t: 'Deeper Engagement', d: 'Visitors explore units themselves instead of just listening' },
    { icon: '🎯', t: 'Faster Understanding', d: 'Visual presentation answers questions before they are asked' },
    { icon: '📊', t: 'Real Data', d: 'Every interaction feeds your sales intelligence dashboard' },
    { icon: '🏆', t: 'Premium Positioning', d: 'The sales center reflects and reinforces the project quality' },
  ]

  const process = ar
    ? ['الاكتشاف', 'تصميم التجربة', 'إنتاج المحتوى', 'التكامل التقني', 'التركيب', 'دعم الإطلاق']
    : ['Discovery', 'Experience Design', 'Content Production', 'Technical Integration', 'Installation', 'Launch Support']

  const clients = ['Al Rajhi', 'Toyota', 'Int\'l Medical Center', 'Rafal', 'Makkiyoon', 'Al Eisai', 'Saudi Aramco', 'Emaar']

  return (
    <div className="bg-white">

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #f4fbfc 0%, #e8f7f9 50%, #f7f9fc 100%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionTag text={ar ? 'تجربة المبيعات العقارية' : 'Smart Sales Center'} />
              <h1 className="hero-title text-gray-900 mb-6 leading-tight">
                {ar ? <>حوّل مركز مبيعاتك إلى<br /><span className="gradient-text">تجربة شراء تفاعلية</span></> : <>Transform Your Sales Center Into an<br /><span className="gradient-text">Interactive Buying Experience</span></>}
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                {ar ? 'نماذج معمارية تفاعلية، شاشات ذكية، عروض غامرة، وتجارب رقمية — مُصمَّمة لمساعدة المطورين على بيع مشاريعهم بفعالية أكبر.' : 'Architectural models, interactive screens, immersive presentations, and digital experiences designed to help developers sell projects more effectively.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">{ar ? 'طلب استشارة' : 'Request Consultation'}</Link>
                <Link to="/portfolio" className="btn-outline">{ar ? 'مشاهدة المشاريع' : 'View Previous Projects'}</Link>
              </div>
            </div>
            <HeroVisual isAr={ar} />
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER ─────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-14">
              <SectionTag text={ar ? 'ما ستحصل عليه' : 'What We Deliver'} />
              <h2 className="section-title text-gray-900 mb-4">
                {ar ? <>ستة عناصر تُشكّل <span className="gradient-text">مركز مبيعات استثنائي</span></> : <>Six Elements That Create an <span className="gradient-text">Exceptional Sales Center</span></>}
              </h2>
              <p className="subtitle text-gray-500 max-w-2xl mx-auto">
                {ar ? 'ليست منتجات منفصلة — بل بيئة متكاملة تعمل معاً لخلق تجربة شراء لا تُنسى.' : 'Not separate products — an integrated environment designed to work together and create an unforgettable buying experience.'}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <DeliverCard {...d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <SectionTag text={ar ? 'الواقع الحالي' : 'The Problem'} />
                <h2 className="section-title text-gray-900 mb-4">
                  {ar ? <>معظم مراكز المبيعات <span className="gradient-text">لا تزال تقليدية</span></> : <>Most Sales Centers Still Rely on <span className="gradient-text">Traditional Methods</span></>}
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {ar ? 'في عالم يتوقع فيه المشتري تجربة متميزة، تقدّم معظم مراكز المبيعات نفس التجربة التقليدية التي كانت موجودة قبل عشر سنوات.' : 'In a world where buyers expect premium experiences, most sales centers still deliver the same traditional presentation that existed a decade ago.'}
                </p>
                <div className="space-y-3">
                  {problems.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white" style={{ border: '1px solid #f0f0f0' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#fee2e2' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #1e3a4c, #0d5c63)' }}>
                <div className="text-white/60 text-sm mb-6">{ar ? 'النتيجة في معظم المشاريع' : 'The result in most projects'}</div>
                {[
                  { v: ar ? 'فرص ضائعة' : 'Missed opportunities', desc: ar ? 'زوار يغادرون دون اهتمام حقيقي' : 'Visitors leave without genuine interest' },
                  { v: ar ? 'قرارات بطيئة' : 'Slow decisions', desc: ar ? 'العميل يحتاج زيارات متعددة للتقرير' : 'Buyers need multiple visits before deciding' },
                  { v: ar ? 'بيانات صفرية' : 'Zero data', desc: ar ? 'لا تعرف ماذا اهتم به الزائر' : 'You never know what interested the visitor' },
                ].map(item => (
                  <div key={item.v} className="mb-5 p-5 rounded-2xl text-right" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <div className="text-white font-bold text-lg mb-1">{item.v}</div>
                    <div className="text-white/50 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-14">
              <SectionTag text={ar ? 'عندما تعمل العناصر معاً' : 'The Smart Sales Center'} />
              <h2 className="section-title text-gray-900 mb-4">
                {ar ? <>القيمة الحقيقية في <span className="gradient-text">التكامل</span></> : <>The Real Value Is in <span className="gradient-text">Integration</span></>}
              </h2>
              <p className="subtitle text-gray-500 max-w-2xl mx-auto">
                {ar ? 'التكامل بين النموذج التفاعلي والشاشات الذكية والمحتوى الرقمي ومساعد الذكاء الاصطناعي هو ما يُنشئ مركز مبيعات يعمل أكثر من أي معرض ثابت.' : 'The integration of interactive models, smart displays, digital content, and AI assistance creates a sales center that works harder than any static showroom.'}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {outcomes.map((o, i) => (
              <Reveal key={o.t} delay={i * 100}>
                <div className="premium-card p-6 text-center">
                  <div className="text-3xl mb-3">{o.icon}</div>
                  <div className="font-bold text-gray-900 mb-2">{o.t}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{o.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Integration flow */}
          <Reveal>
            <div className="rounded-3xl p-8" style={{ background: 'var(--gray-warm)' }}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {(ar
                  ? ['نموذج تفاعلي', 'شاشات ذكية', 'محتوى رقمي', 'مساعد ذكي', 'تحليلات']
                  : ['Architectural Model', 'Smart Displays', 'Digital Content', 'AI Assistant', 'Analytics']
                ).map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="px-5 py-3 rounded-full text-sm font-semibold" style={{ background: 'white', border: '1.5px solid var(--gray-soft)', color: 'var(--teal-deep)' }}>{step}</div>
                    {i < arr.length - 1 && <span className="text-gray-300 font-bold text-lg">→</span>}
                  </div>
                ))}
                <div className="w-full text-center mt-4">
                  <span className="text-lg font-bold" style={{ color: 'var(--teal-deep)' }}>= {ar ? 'مركز مبيعات ذكي' : 'Smart Sales Center'}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(42,181,194,0.2)', color: '#7ee8ef' }}>
                {ar ? 'خبرة حقيقية. تنفيذ مُثبت.' : 'Real Experience. Proven Execution.'}
              </div>
              <h2 className="section-title text-white mb-4">
                {ar ? 'معرض رابطة العالم الإسلامي — مكة المكرمة' : 'Muslim World League Exhibition — Makkah'}
              </h2>
              <p className="subtitle text-white/60 max-w-2xl mx-auto">
                {ar ? 'نماذج معمارية تفاعلية، شاشات عرض ضخمة، أنظمة بصرية مدعومة بالذكاء الاصطناعي، وتجارب زوار تفاعلية — تم تنفيذه في 21 يوماً.' : 'Interactive architectural models, giant presentation screens, AI-powered visual systems, and interactive visitor experiences — executed in only 21 days.'}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-5 mb-12">
            {[
              { v: '2,000+', l: ar ? 'زائر' : 'Visitors' },
              { v: '1,000+', l: ar ? 'تفاعل مسجّل' : 'Recorded Interactions' },
              { v: '21', l: ar ? 'يوم تنفيذ' : 'Days to Execute' },
            ].map(s => (
              <Reveal key={s.l}>
                <div className="premium-card p-7 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="stat-number gradient-text mb-1">{s.v}</div>
                  <div className="text-white/60 text-sm">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div>
              <div className="text-white/40 text-xs text-center mb-5">{ar ? 'من بين عملائنا' : 'Among our clients'}</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {clients.map(c => (
                  <div key={c} className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>{c}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-12">
              <SectionTag text={ar ? 'كيف نعمل' : 'How We Work'} />
              <h2 className="section-title text-gray-900">
                {ar ? 'من الفكرة إلى <span class="gradient-text">الافتتاح</span>' : <>From Concept to <span className="gradient-text">Opening Day</span></>}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {process.map((step, i) => (
              <Reveal key={step} delay={i * 70}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-3" style={{ background: 'var(--teal-pale)', color: 'var(--teal-deep)' }}>
                    {i + 1}
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{step}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, rgba(255,255,255,0.6) 0%, transparent 60%)' }} />
        <div className="container-xl relative z-10 text-center">
          <h2 className="section-title text-white mb-5">
            {ar ? 'ابنِ مركز مبيعات يتذكره الناس' : 'Build a Sales Center People Remember'}
          </h2>
          <p className="subtitle text-white/75 max-w-xl mx-auto mb-10">
            {ar ? 'توريفا تجمع بين العرض المعماري، التفاعل الرقمي، وسرد القصة الغامر في تجربة مبيعات متكاملة واحدة.' : 'Turriva combines architectural presentation, digital interaction, and immersive storytelling into one integrated sales experience.'}
          </p>
          <Link to="/contact" className="inline-block px-12 py-4 bg-white rounded-full font-semibold text-sm hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--teal-deep)' }}>
            {ar ? 'جدول استشارة' : 'Schedule Consultation'}
          </Link>
        </div>
      </section>

    </div>
  )
}
