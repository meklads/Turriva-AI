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
    <div className="relative rounded-3xl overflow-hidden" style={{ height: 460, background: 'linear-gradient(135deg, #0f1923 0%, #1a2840 50%, #0f2535 100%)' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(42,181,194,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,181,194,0.08) 0%, transparent 40%)'
      }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute inset-5 flex flex-col gap-3">
        {/* AI Booth visual */}
        <div className="rounded-2xl p-5 flex-1" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: '#2ab5c2' }} />
            <span className="text-white/50 text-xs">{isAr ? 'كشك الذكاء الاصطناعي — المعرض الوطني' : 'AI CALL BOOTH — National Exhibition'}</span>
            <span className="ms-auto text-xs font-bold" style={{ color: '#2ab5c2' }}>● {isAr ? 'نشط' : 'Active'}</span>
          </div>
          {/* Chat conversation */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs" style={{ background: 'rgba(42,181,194,0.2)', color: '#7ee8ef' }}>👤</div>
              <div className="rounded-xl rounded-tl-none px-3 py-2 text-xs max-w-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                {isAr ? 'ما هي خدمات الاستثمار المتاحة؟' : 'What investment services are available?'}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="rounded-xl rounded-tr-none px-3 py-2 text-xs max-w-xs" style={{ background: 'rgba(42,181,194,0.25)', color: 'rgba(255,255,255,0.9)' }}>
                {isAr ? 'لدينا ثلاثة برامج استثمار رئيسية تبدأ من...' : 'We have three main investment programs starting from...'}
              </div>
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs" style={{ background: 'rgba(42,181,194,0.3)', color: '#7ee8ef' }}>🤖</div>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs" style={{ background: 'rgba(42,181,194,0.2)', color: '#7ee8ef' }}>👤</div>
              <div className="rounded-xl rounded-tl-none px-3 py-2 text-xs max-w-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                {isAr ? 'أريد حجز موعد' : 'I want to book an appointment'}
              </div>
            </div>
            <div className="flex items-center gap-2 px-2">
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2ab5c2', animationDelay: `${i * 0.2}s` }} />)}
              </div>
              <span className="text-xs" style={{ color: 'rgba(42,181,194,0.6)' }}>{isAr ? 'يكتب...' : 'Typing...'}</span>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: '4,200', l: isAr ? 'محادثة اليوم' : "Today's Chats" },
            { v: '98%', l: isAr ? 'دقة الإجابات' : 'Answer Accuracy' },
            { v: '< 1s', l: isAr ? 'زمن الرد' : 'Response Time' },
          ].map(s => (
            <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="font-bold text-lg" style={{ color: '#7ee8ef' }}>{s.v}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── SERVICE CARD ─────────────────────────────────────────────────────────── */
function ServiceCard({ icon, title, desc, tags }: { icon: string; title: string; desc: string; tags: string[] }) {
  return (
    <div className="rounded-3xl p-7 flex flex-col gap-4 transition-all hover:shadow-lg" style={{ background: 'white', border: '1px solid #e9ecef' }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'var(--teal-pale)' }}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(t => (
          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: '#f0fafa', color: 'var(--teal-deep)', border: '1px solid rgba(13,92,99,0.12)' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function AITransformation() {
  const { lang, isAr } = useLang()
  const ar = isAr

  const services = [
    {
      icon: '🗣️',
      title: ar ? 'كشك الاتصال بالذكاء الاصطناعي' : 'AI Call Booth',
      desc: ar ? 'كشك مادي راقٍ يُمكّن الزوار من التحدث مع نظام ذكاء اصطناعي — يُجيب على الأسئلة، يُقدّم الخدمات، ويُحجز المواعيد بالصوت.' : 'A premium physical booth enabling visitors to speak with an AI system — answering questions, presenting services, and booking appointments by voice.',
      tags: ar ? ['تفاعل صوتي', 'حجز مواعيد', 'متعدد اللغات'] : ['Voice interaction', 'Appointment booking', 'Multilingual'],
    },
    {
      icon: '🤖',
      title: ar ? 'وكيل خدمة العملاء الذكي' : 'AI Customer Service Agent',
      desc: ar ? 'وكيل رقمي مدرَّب على بيانات شركتك — يُجيب على كل سؤال بدقة، على مدار الساعة، دون ضغط على الفريق.' : 'A digital agent trained on your company data — answers every question accurately, around the clock, without burdening your team.',
      tags: ar ? ['24/7', 'مدرَّب على بياناتك', 'تكامل مع الأنظمة'] : ['24/7 availability', 'Trained on your data', 'System integration'],
    },
    {
      icon: '🧠',
      title: ar ? 'مساعد المعرفة الذكي' : 'AI Knowledge Assistant',
      desc: ar ? 'أداة داخلية تُساعد فريقك على الوصول الفوري لأي معلومة — سياسات، إجراءات، بيانات المشاريع — بسؤال بسيط.' : 'An internal tool giving your team instant access to any information — policies, procedures, project data — with a simple question.',
      tags: ar ? ['للفرق الداخلية', 'بحث فوري', 'قابل للتخصيص'] : ['For internal teams', 'Instant search', 'Fully customizable'],
    },
    {
      icon: '🎙️',
      title: ar ? 'نظام التفاعل الصوتي' : 'AI Voice Interaction System',
      desc: ar ? 'نقاط تواصل صوتية في مساحاتك الفيزيائية — في المداخل، قاعات الانتظار، المعارض — تُجيب وتُرشد باللغتين.' : 'Voice interaction points in your physical spaces — entrances, waiting areas, exhibitions — guiding and answering in both languages.',
      tags: ar ? ['عربي وإنجليزي', 'تركيب فيزيائي', 'دون لمس'] : ['Arabic & English', 'Physical installation', 'Touchless'],
    },
    {
      icon: '🖥️',
      title: ar ? 'كشك المعلومات الذكي' : 'AI Information Kiosk',
      desc: ar ? 'شاشة لمسية ذكية تعمل بالذكاء الاصطناعي — تُقدّم خدمات مؤسستك، تُرشد الزوار، وتجمع البيانات بصمت.' : 'An AI-powered smart touchscreen presenting your organization\'s services, guiding visitors, and silently gathering data.',
      tags: ar ? ['لمسي', 'بيانات سلوكية', 'هوية بصرية مخصصة'] : ['Touch interface', 'Behavioral data', 'Custom branding'],
    },
    {
      icon: '📊',
      title: ar ? 'أتمتة سير العمل الداخلي' : 'AI Workflow Automation',
      desc: ar ? 'أنظمة تُؤتمت المهام المتكررة — تقارير، جدولة، تصنيف الطلبات — حتى يتفرغ فريقك لما يستحق الاهتمام.' : 'Systems that automate repetitive tasks — reports, scheduling, request classification — freeing your team for what matters.',
      tags: ar ? ['توفير الوقت', 'تقليل الأخطاء', 'سهل التطبيق'] : ['Time-saving', 'Error reduction', 'Easy to deploy'],
    },
  ]

  const boothFeatures = ar ? [
    { icon: '🎤', t: 'تفاعل صوتي طبيعي', d: 'محادثة سلسة بالعربية والإنجليزية دون أي خبرة تقنية من المستخدم' },
    { icon: '📚', t: 'معرفة كاملة بخدماتك', d: 'مدرَّب على كل محتوى شركتك، جاهز للإجابة على أي سؤال' },
    { icon: '📅', t: 'حجز المواعيد مباشرة', d: 'يُنجز حجز الاجتماعات والمواعيد في نفس المحادثة' },
    { icon: '📊', t: 'بيانات كل تفاعل', d: 'كل محادثة تُولّد بيانات تُساعدك على فهم احتياجات عملائك' },
  ] : [
    { icon: '🎤', t: 'Natural voice interaction', d: 'Fluid conversation in Arabic and English with no technical skill required' },
    { icon: '📚', t: 'Full knowledge of your services', d: 'Trained on all your company content, ready to answer any question' },
    { icon: '📅', t: 'Appointment booking', d: 'Completes meeting and appointment bookings within the same conversation' },
    { icon: '📊', t: 'Data from every interaction', d: 'Every conversation generates data helping you understand customer needs' },
  ]

  const problems = ar ? [
    { problem: 'موظفو الاستقبال يُجيبون على نفس الأسئلة عشرات المرات يومياً', solution: 'الذكاء الاصطناعي يُجيب لحظياً دون إرهاق' },
    { problem: 'المعلومات المقدَّمة تتباين من موظف لآخر', solution: 'إجابة موحدة ودقيقة في كل مرة' },
    { problem: 'الزوار ينتظرون للحصول على أبسط المعلومات', solution: 'خدمة فورية دون طوابير انتظار' },
    { problem: 'بيانات تفاعل العملاء لا تُجمَع ولا تُحلَّل', solution: 'تحليلات تفصيلية لكل محادثة' },
  ] : [
    { problem: 'Reception staff answer the same questions dozens of times daily', solution: 'AI responds instantly without fatigue' },
    { problem: 'Information varies between staff members', solution: 'Consistent, accurate answer every single time' },
    { problem: 'Visitors wait for even the simplest information', solution: 'Instant service with no queues' },
    { problem: 'Customer interaction data is never collected or analyzed', solution: 'Detailed analytics for every conversation' },
  ]

  const useCases = ar ? [
    { icon: '🏢', title: 'العقارات', desc: 'مساعد في مراكز المبيعات يُرشد المشترين ويُقدم الوحدات' },
    { icon: '🏥', title: 'الرعاية الصحية', desc: 'إرشاد المرضى والإجابة على استفساراتهم دون ضغط الطاقم' },
    { icon: '🏛️', title: 'الحكومة', desc: 'خدمة المراجعين وتوجيههم للخدمات الصحيحة' },
    { icon: '🎪', title: 'المعارض', desc: 'نقطة تفاعل ذكية في كل جناح وكشك' },
  ] : [
    { icon: '🏢', title: 'Real Estate', desc: 'Sales center assistant guiding buyers and presenting units' },
    { icon: '🏥', title: 'Healthcare', desc: 'Patient guidance and inquiry response without staff overhead' },
    { icon: '🏛️', title: 'Government', desc: 'Visitor service and direction to the right services' },
    { icon: '🎪', title: 'Exhibitions', desc: 'Smart interaction point at every pavilion and booth' },
  ]

  const differentiators = ar ? [
    { icon: '🏗️', t: 'تجارب فيزيائية', d: 'نصمّم الكشك والبيئة المحيطة — لا مجرد برمجيات' },
    { icon: '🎨', t: 'تصميم بصري متكامل', d: 'كل شيء يحمل هوية علامتك التجارية بدقة' },
    { icon: '🔗', t: 'أنظمة تفاعلية', d: 'الذكاء الاصطناعي مُدمج مع شاشات، صوت، وبيانات' },
    { icon: '🧩', t: 'منطق مخصص لك', d: 'مدرَّب على بياناتك الخاصة لا نماذج عامة' },
  ] : [
    { icon: '🏗️', t: 'Physical experiences', d: 'We design the booth and surrounding environment — not just software' },
    { icon: '🎨', t: 'Integrated visual design', d: 'Everything carries your brand identity with precision' },
    { icon: '🔗', t: 'Interactive systems', d: 'AI integrated with screens, voice, and data layers' },
    { icon: '🧩', t: 'Custom-trained logic', d: 'Trained on your specific data, not generic models' },
  ]

  const process = ar
    ? ['الاكتشاف', 'تصميم التجربة', 'تدريب النموذج', 'بناء النظام', 'التركيب', 'التشغيل والدعم']
    : ['Discovery', 'Experience Design', 'Model Training', 'System Build', 'Installation', 'Launch & Support']

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #f4fbfc 0%, #e8f7f9 50%, #f0f4f8 100%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionTag text={ar ? 'الذكاء الاصطناعي داخل عملك' : 'AI Inside Your Business'} />
              <h1 className="hero-title text-gray-900 mb-6 leading-tight">
                {ar
                  ? <><span className="gradient-text">تجارب ذكاء اصطناعي عملية</span><br />مبنية للعمليات الحقيقية</>
                  : <><span className="gradient-text">Practical AI Experiences</span><br />Built For Real Operations</>
                }
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                {ar
                  ? 'أنظمة ذكاء اصطناعي مصمَّمة لتحسين التواصل، وأتمتة المهام المتكررة، وخلق تفاعلات أذكى مع العملاء — في بيئات فيزيائية راقية.'
                  : 'AI systems designed to improve communication, automate repetitive tasks, and create smarter customer interactions — embedded in premium physical environments.'
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">{ar ? 'جدول جلسة استراتيجية' : 'Schedule Strategy Session'}</Link>
                <Link to="/portfolio" className="btn-outline">{ar ? 'مشاهدة المشاريع' : 'View Projects'}</Link>
              </div>
            </div>
            <HeroVisual isAr={ar} />
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-14">
              <SectionTag text={ar ? 'ما ستحصل عليه' : 'What You Receive'} />
              <h2 className="section-title text-gray-900 mb-4">
                {ar
                  ? <>ستة أنظمة ذكاء اصطناعي <span className="gradient-text">جاهزة للتطبيق</span></>
                  : <>Six AI Systems <span className="gradient-text">Ready to Deploy</span></>
                }
              </h2>
              <p className="subtitle text-gray-500 max-w-2xl mx-auto">
                {ar
                  ? 'لا مبالغة ولا وعود فضفاضة. أنظمة ملموسة تحل مشاكل حقيقية في عمليات يومية.'
                  : 'No hype, no empty promises. Tangible systems that solve real problems in daily operations.'
                }
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI BOOTH SPOTLIGHT ───────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <SectionTag text={ar ? 'المنتج الأبرز' : 'Featured Product'} />
                <h2 className="section-title text-gray-900 mb-4">
                  {ar
                    ? <>كشك الاتصال بالذكاء الاصطناعي<br /><span className="gradient-text">نقطة التفاعل المادية</span></>
                    : <>The AI Call Booth<br /><span className="gradient-text">Your Physical Interaction Point</span></>
                  }
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {ar
                    ? 'كشك راقٍ يُوضع في أي مساحة — معرض، مستشفى، مركز مبيعات، جهة حكومية — يُتيح للزوار التحدث مباشرة مع مساعد ذكي يعرف كل شيء عن خدماتك.'
                    : 'A premium booth placed in any space — exhibition, hospital, sales center, government entity — allowing visitors to speak directly with an intelligent assistant that knows everything about your services.'
                  }
                </p>
                <div className="space-y-4">
                  {boothFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white" style={{ border: '1px solid var(--gray-soft)' }}>
                      <span className="text-2xl flex-shrink-0">{f.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm mb-0.5">{f.t}</div>
                        <div className="text-xs text-gray-500 leading-relaxed">{f.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {useCases.map(uc => (
                  <div key={uc.title} className="rounded-2xl p-6 bg-white" style={{ border: '1px solid var(--gray-soft)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                    <span className="text-3xl block mb-3">{uc.icon}</span>
                    <div className="font-bold text-gray-900 text-sm mb-1">{uc.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{uc.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS → SOLUTIONS ─────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-14">
              <SectionTag text={ar ? 'المشكلة والحل' : 'Problem & Solution'} />
              <h2 className="section-title text-gray-900 mb-4">
                {ar
                  ? <>تحديات يومية <span className="gradient-text">تحلها أنظمتنا</span></>
                  : <>Daily Challenges <span className="gradient-text">Our Systems Solve</span></>
                }
              </h2>
            </div>
          </Reveal>
          <div className="space-y-4 max-w-4xl mx-auto">
            {problems.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden" style={{ border: '1px solid #e9ecef' }}>
                  <div className="flex items-start gap-3 p-5 bg-white">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#fee2e2' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.problem}</p>
                  </div>
                  <div className="flex items-start gap-3 p-5" style={{ background: 'var(--teal-pale)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--teal-deep)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--teal-deep)' }}>{p.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DIFFERENT ────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f1923, #1a2840)' }}>
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(42,181,194,0.2)', color: '#7ee8ef' }}>
                {ar ? 'لماذا توريفا مختلفة' : 'Why Turriva is Different'}
              </div>
              <h2 className="section-title text-white mb-4">
                {ar
                  ? <>هذا ليس برنامج ذكاء اصطناعي عادياً</>
                  : <>This Is Not Generic AI Software</>
                }
              </h2>
              <p className="subtitle max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {ar
                  ? 'توريفا تجمع بين التجارب الفيزيائية، التصميم البصري، الأنظمة التفاعلية، ومنطق الذكاء الاصطناعي — في بيئة واحدة متكاملة تحمل هوية علامتك.'
                  : 'Turriva combines physical experiences, visual design, interactive systems, and AI logic — into one integrated branded environment.'
                }
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {differentiators.map((d, i) => (
              <Reveal key={d.t} delay={i * 80}>
                <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="text-3xl mb-3">{d.icon}</div>
                  <div className="font-bold text-white text-sm mb-2">{d.t}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{d.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-12">
              <SectionTag text={ar ? 'خبرة مُثبتة' : 'Proven Experience'} />
              <h2 className="section-title text-gray-900 mb-4">
                {ar
                  ? <>تنفيذ في أكبر <span className="gradient-text">المعارض والمشاريع</span></>
                  : <>Deployed at <span className="gradient-text">Major Exhibitions & Projects</span></>
                }
              </h2>
              <p className="subtitle text-gray-500 max-w-2xl mx-auto">
                {ar
                  ? 'أنظمة الذكاء الاصطناعي التفاعلية من توريفا اختُبرت في بيئات حقيقية — معارض وطنية، مستشفيات، مراكز مبيعات.'
                  : "Turriva's interactive AI systems have been tested in real environments — national exhibitions, hospitals, and sales centers."
                }
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { v: '15+', l: ar ? 'سنة خبرة تنفيذية' : 'Years of execution' },
              { v: '4,200+', l: ar ? 'تفاعل يومي في أنظمتنا' : 'Daily interactions across systems' },
              { v: '21', l: ar ? 'يوماً لتسليم معرض رابطة العالم الإسلامي' : 'Days to deliver Muslim World League Exhibition' },
            ].map(s => (
              <Reveal key={s.l}>
                <div className="premium-card p-8 text-center">
                  <div className="stat-number gradient-text mb-2">{s.v}</div>
                  <div className="text-sm text-gray-500">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="rounded-3xl p-8" style={{ background: 'var(--gray-warm)' }}>
              <div className="text-xs text-gray-400 text-center mb-5">{ar ? 'من بين عملائنا' : 'Among our clients'}</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Al Rajhi', 'Toyota', 'Int\'l Medical Center', 'Rafal', 'Makkiyoon', 'Al Eisai', 'Saudi Aramco', 'Muslim World League'].map(c => (
                  <div key={c} className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white" style={{ border: '1px solid #e5e7eb', color: '#374151' }}>{c}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-12">
              <SectionTag text={ar ? 'كيف نعمل' : 'How We Work'} />
              <h2 className="section-title text-gray-900">
                {ar ? <>من الفكرة إلى <span className="gradient-text">التشغيل</span></> : <>From Concept to <span className="gradient-text">Live Operation</span></>}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {process.map((step, i) => (
              <Reveal key={step} delay={i * 70}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-3" style={{ background: 'white', color: 'var(--teal-deep)', border: '1.5px solid var(--gray-soft)' }}>
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
            {ar ? 'أدخل الذكاء الاصطناعي في تجارب عملائك الحقيقية' : 'Bring AI Into Real Customer Experiences'}
          </h2>
          <p className="subtitle text-white/75 max-w-xl mx-auto mb-10">
            {ar
              ? 'لسنا موردي برمجيات. نحن نبني التجربة الكاملة — من التصميم المادي حتى منطق الذكاء الاصطناعي.'
              : "We're not software vendors. We build the full experience — from physical design to AI logic."
            }
          </p>
          <Link to="/contact" className="inline-block px-12 py-4 bg-white rounded-full font-semibold text-sm hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--teal-deep)' }}>
            {ar ? 'جدول جلسة استراتيجية' : 'Schedule Strategy Session'}
          </Link>
        </div>
      </section>

    </div>
  )
}
