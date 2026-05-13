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

function HeroVisual({ isAr }: { isAr: boolean }) {
  return (
    <div className="relative rounded-3xl overflow-hidden" style={{ height: 460, background: 'linear-gradient(135deg, #e8f7f9 0%, #c5e8ed 50%, #d4f0f4 100%)' }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(13,92,99,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(13,92,99,0.1) 0%, transparent 40%)'
      }} />
      <div className="absolute inset-5 flex flex-col gap-3">
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(14px)', border: '1px solid rgba(13,92,99,0.12)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: 'var(--teal-pale)' }}>🏥</div>
            <div>
              <div className="text-xs text-gray-400">{isAr ? 'لوحة تجربة المريض' : 'PATIENT EXPERIENCE'}</div>
              <div className="text-sm font-bold text-gray-900">{isAr ? 'المركز الطبي الدولي' : 'International Medical Center'}</div>
            </div>
            <span className="ms-auto px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(42,181,194,0.15)', color: 'var(--teal-deep)' }}>● Live</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { v: '94%', l: isAr ? 'رضا المرضى' : 'Patient Satisfaction' },
              { v: '41%', l: isAr ? 'تقليص وقت الانتظار المُدرَك' : 'Reduced Wait Perception' },
              { v: '380', l: isAr ? 'تفاعل اليوم' : "Today's Interactions" },
            ].map(s => (
              <div key={s.l} className="p-3 rounded-xl text-center" style={{ background: 'var(--teal-pale)' }}>
                <div className="text-xl font-bold" style={{ color: 'var(--teal-deep)' }}>{s.v}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {(isAr ? ['🚪 الاستقبال', '⏰ الانتظار', '👨‍⚕️ الاستشارة', '📋 التسريح'] : ['🚪 Reception', '⏰ Waiting', '👨‍⚕️ Consultation', '📋 Discharge']).map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                  <div className="h-full rounded-full" style={{ width: `${[90, 72, 88, 65][i]}%`, background: 'var(--teal-mid)' }} />
                </div>
                <div className="text-xs text-gray-500 w-24 text-right">{step}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(13,92,99,0.1)' }}>
          <div className="text-xs text-gray-400 mb-2">{isAr ? 'المساعد الذكي للمرضى' : 'AI Patient Assistant'}</div>
          <div className="flex gap-2 flex-wrap">
            {(isAr ? ['أين قسم الطوارئ؟', 'متى موعدي؟', 'نتائج التحاليل'] : ['Where is radiology?', 'My appointment time?', 'Lab results']).map(q => (
              <span key={q} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'white', border: '1px solid #e5e7eb', color: 'var(--teal-deep)' }}>{q}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DeliverCard({ gradient, icon, title, desc, points }: { gradient: string; icon: string; title: string; desc: string; points: string[] }) {
  return (
    <div className="rounded-3xl overflow-hidden flex flex-col" style={{ border: '1px solid #e9ecef', background: 'white' }}>
      <div className="h-40 relative flex items-end p-5" style={{ background: gradient }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.6) 0%, transparent 60%)' }} />
        <span className="text-5xl relative z-10" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>{icon}</span>
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

export default function Healthcare() {
  const { lang, isAr } = useLang()
  const ar = isAr

  const deliverables = [
    { gradient: 'linear-gradient(135deg, #0d4f5c, #1a8a94)', icon: '🚪', title: ar ? 'تجربة الاستقبال التفاعلية' : 'Interactive Reception Experience', desc: ar ? 'استقبال ذكي يُرشد المرضى فور وصولهم — تسجيل سهل، توجيه فوري، وانطباع أول لا يُنسى.' : 'Smart reception that guides patients the moment they arrive — easy check-in, instant direction, and an unforgettable first impression.', points: ar ? ['تسجيل وصول ذكي', 'توجيه لحظي', 'تجربة ترحيبية'] : ['Smart patient check-in', 'Instant wayfinding', 'Premium welcome experience'] },
    { gradient: 'linear-gradient(135deg, #1a2a4a, #2d4a8a)', icon: '📺', title: ar ? 'شاشات الانتظار والإرشاد الذكي' : 'Smart Queue & Guidance Screens', desc: ar ? 'تحويل وقت الانتظار إلى تجربة منتجة. مخصصة بالمحتوى الطبي، تتبع الأرقام، وإرشاد تفاعلي للأقسام.' : 'Turn waiting time into a productive experience. Personalized medical content, queue tracking, and interactive department guidance.', points: ar ? ['تتبع الأرقام لحظياً', 'محتوى صحي تثقيفي', 'خريطة تفاعلية'] : ['Real-time queue display', 'Health education content', 'Interactive facility map'] },
    { gradient: 'linear-gradient(135deg, #1a3a2a, #2d6a4f)', icon: '💡', title: ar ? 'شاشات التثقيف الصحي' : 'Health Education Displays', desc: ar ? 'محتوى مرئي منظّم لتثقيف المرضى عن أمراضهم، خياراتهم العلاجية، وأهمية الوقاية.' : 'Curated visual content that educates patients about their conditions, treatment options, and the importance of prevention.', points: ar ? ['محتوى مصوّر احترافي', 'مخصص لكل قسم', 'قابل للتحديث عن بُعد'] : ['Professional visual content', 'Department-specific content', 'Remote update capability'] },
    { gradient: 'linear-gradient(135deg, #2d1b69, #4a2da8)', icon: '🤖', title: ar ? 'المساعد الذكي للمرضى' : 'AI-Assisted Patient Support', desc: ar ? 'كشك ذكي يُجيب على أسئلة المرضى، يُرشدهم، ويُساعدهم في استكشاف الخدمات دون الحاجة إلى طاقم بشري إضافي.' : 'Smart kiosk that answers patient questions, provides guidance, and helps them navigate services without requiring additional staff.', points: ar ? ['إجابة متعددة اللغات', 'ربط بالأنظمة الطبية', 'متاح 24/7'] : ['Multilingual responses', 'Medical system integration', 'Available 24/7'] },
    { gradient: 'linear-gradient(135deg, #3a1a1a, #6b2d2d)', icon: '🎨', title: ar ? 'جدران التجربة الرقمية' : 'Digital Experience Walls', desc: ar ? 'جدران عرض ضخمة تُجسّد هوية المستشفى، وتُعرض رسائله، وتخلق بيئة تُشعر المريض بالطمأنينة والثقة.' : 'Large-scale display walls that embody the hospital identity, communicate its message, and create an environment of calm and trust.', points: ar ? ['عرض ضخم عالي الدقة', 'محتوى حركي منظّم', 'تعزيز هوية المؤسسة'] : ['Large high-resolution display', 'Curated motion content', 'Institutional identity reinforcement'] },
    { gradient: 'linear-gradient(135deg, #0f2027, #203a43)', icon: '📊', title: ar ? 'بيانات السلوك والرؤى' : 'Behavioral Insights & Analytics', desc: ar ? 'كل تفاعل يُغذّي لوحة تحليلات تُساعد المستشفى على فهم مسار المريض، نقاط الألم، وفرص التحسين.' : 'Every interaction feeds an analytics dashboard that helps the hospital understand the patient journey, pain points, and improvement opportunities.', points: ar ? ['لوحة تحليلات لحظية', 'خريطة مسار المريض', 'تقارير أسبوعية تلقائية'] : ['Real-time analytics dashboard', 'Patient journey mapping', 'Automated weekly reports'] },
  ]

  const problems = ar ? [
    'تشوش المرضى في التنقل داخل المرفق',
    'شعور بوقت انتظار طويل حتى مع قِصَره',
    'ضعف التواصل وعدم استيعاب المعلومات الطبية',
    'غياب البيانات السلوكية لتحسين تجربة المريض',
    'صورة مؤسسية لا تعكس مستوى الرعاية الفعلي',
  ] : [
    'Patients get confused navigating the facility',
    'Perceived wait time feels long even when it isn\'t',
    'Medical information doesn\'t get communicated effectively',
    'Lack of behavioral data to improve patient experience',
    'Institutional image doesn\'t reflect actual care quality',
  ]

  const benefits = ar ? [
    { icon: '🏥', t: 'للمستشفى', pts: ['تجربة مريض أفضل', 'صورة مؤسسية متميزة', 'بيانات قابلة للقياس', 'تواصل أفضل'] },
    { icon: '🧑‍⤴️', t: 'للمريض', pts: ['فهم أسهل وأوضح', 'ضغط وتوتر أقل', 'تجربة أكثر إنسانية', 'تنقل سلس'] },
  ] : [
    { icon: '🏥', t: 'For the Hospital', pts: ['Better patient experience', 'Premium institutional image', 'Measurable interaction data', 'Improved communication'] },
    { icon: '🧑‍⤴️', t: 'For the Patient', pts: ['Clearer understanding', 'Reduced stress & anxiety', 'More human experience', 'Smoother navigation'] },
  ]

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #f0fbfd 0%, #e2f4f7 50%, #f4fbfc 100%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionTag text={ar ? 'تجربة الرعاية الصحية الذكية' : 'AI Care Companion'} />
              <h1 className="hero-title text-gray-900 mb-6 leading-tight">
                {ar ? <>حوّل تجربة المريض إلى<br /><span className="gradient-text">رحلة صحية أكثر ذكاءً</span></> : <>Transform Patient Experience Into a<br /><span className="gradient-text">Smarter Healthcare Journey</span></>}
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                {ar ? 'تجارب صحية تفاعلية تُحسّن التفاعل، وتُبسّط التواصل، وتُساعد المستشفيات على فهم احتياجات المرضى بشكل أعمق.' : 'Interactive healthcare experiences that improve engagement, simplify communication, and help hospitals better understand patient needs.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">{ar ? 'حجز استشارة' : 'Book Consultation'}</Link>
                <Link to="/portfolio" className="btn-outline">{ar ? 'مشاهدة المشاريع' : 'View Projects'}</Link>
              </div>
            </div>
            <HeroVisual isAr={ar} />
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-14">
              <SectionTag text={ar ? 'ما ستحصل عليه' : 'What the Hospital Receives'} />
              <h2 className="section-title text-gray-900 mb-4">
                {ar ? <>ستة أنظمة تُحوّل <span className="gradient-text">تجربة المريض</span></> : <>Six Systems That Transform <span className="gradient-text">Patient Experience</span></>}
              </h2>
              <p className="subtitle text-gray-500 max-w-2xl mx-auto">
                {ar ? 'من الاستقبال حتى التسريح — كل نقطة تواصل مع المريض مُصمَّمة بعناية.' : 'From reception to discharge — every patient touchpoint carefully designed.'}
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

      {/* THE PROBLEM */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <SectionTag text={ar ? 'الواقع الحالي' : 'The Problem'} />
                <h2 className="section-title text-gray-900 mb-4">
                  {ar ? <>المستشفيات تفتقر إلى <span className="gradient-text">تجربة المريض الحديثة</span></> : <>Hospitals Still Miss <span className="gradient-text">Modern Patient Experience</span></>}
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {ar ? 'مستوى الرعاية الطبية قد يكون ممتازاً — لكن التجربة المحيطة بالمريض لا تعكس ذلك المستوى.' : 'The medical care quality may be excellent — but the surrounding patient experience doesn\'t reflect that standard.'}
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
              <div className="space-y-4">
                {benefits.map(b => (
                  <div key={b.t} className="rounded-3xl p-7 bg-white" style={{ border: '1px solid #e9ecef', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl">{b.icon}</span>
                      <div className="font-bold text-gray-900">{b.t}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {b.pts.map(pt => (
                        <div key={pt} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--teal-mid)' }} />{pt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DATA & INSIGHTS */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #0d4f5c, #1a8a94)' }}>
                <div className="text-white/60 text-xs mb-6">{ar ? 'لوحة تحليلات تجربة المريض' : 'PATIENT EXPERIENCE ANALYTICS'}</div>
                {[
                  { label: ar ? 'رضا المرضى' : 'Patient Satisfaction', val: '94%', w: 94 },
                  { label: ar ? 'معدل التفاعل' : 'Engagement Rate', val: '84%', w: 84 },
                  { label: ar ? 'سهولة التنقل' : 'Navigation Ease', val: '91%', w: 91 },
                  { label: ar ? 'جودة التواصل' : 'Communication Quality', val: '88%', w: 88 },
                ].map(row => (
                  <div key={row.label} className="mb-4">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-white/70 text-xs">{row.label}</span>
                      <span className="text-white font-bold text-xs">{row.val}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${row.w}%`, background: 'rgba(126,232,239,0.8)' }} />
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/40">
                  {ar ? 'بيانات تجريبية توضيحية' : 'Illustrative sample data'}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <SectionTag text={ar ? 'البيانات والرؤى' : 'Data & Insights'} />
                <h2 className="section-title text-gray-900 mb-4">
                  {ar ? <>ليست فقط عن الشكل — <span className="gradient-text">بل عن الفهم</span></> : <>Not Just About Looks — <span className="gradient-text">About Understanding</span></>}
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  {ar ? 'النظام لا يُحسّن المظهر فقط. بل يُساعد المستشفيات على فهم سلوك المرضى، نقاط الألم، وفرص التحسين الفعلية.' : 'The system doesn\'t only improve visuals. It helps hospitals genuinely understand patient behavior, service pain points, and real improvement opportunities.'}
                </p>
                <div className="space-y-3">
                  {(ar ? ['مسار المريض داخل المنشأة', 'نقاط الاحتكاك والتشوش', 'معدلات التفاعل مع المحتوى', 'الخدمات الأكثر استفساراً', 'مستوى الرضا الفوري'] : ['Patient journey inside the facility', 'Confusion and friction points', 'Content interaction rates', 'Most-asked-about services', 'Immediate satisfaction scores']).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: 'var(--teal-pale)' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--teal-deep)', color: 'white' }}>{i + 1}</div>
                      <span className="text-sm font-medium text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0a1628, #1a2a4a, #2d4a8a)' }}>
        <div className="container-xl">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(42,181,194,0.2)', color: '#7ee8ef' }}>
                {ar ? 'دراسة حالة' : 'Case Study'}
              </div>
              <h2 className="section-title text-white mb-4">
                {ar ? 'المركز الطبي الدولي' : 'International Medical Center'}
              </h2>
              <p className="subtitle text-white/60 max-w-2xl mx-auto">
                {ar ? 'تكامل كامل لأنظمة التجربة التفاعلية — من الاستقبال حتى قاعات العروض الطبية. تنفيذ احترافي يعكس مستوى المركز.' : 'Full integration of interactive experience systems — from reception to medical presentation halls. Professional execution that reflects the center\'s standard.'}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { v: '15+', l: ar ? 'سنة خبرة' : 'Years Experience' },
              { v: '200+', l: ar ? 'مشروع مُنجز' : 'Projects Delivered' },
              { v: '40+', l: ar ? 'عميل مؤسسي' : 'Enterprise Clients' },
              { v: '6', l: ar ? 'دول خليجية' : 'GCC Countries' },
            ].map(s => (
              <Reveal key={s.l}>
                <div className="premium-card p-6 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="stat-number gradient-text mb-1">{s.v}</div>
                  <div className="text-white/60 text-sm">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Al Rajhi', 'Int\'l Medical Center', 'Toyota', 'Rafal', 'Makkiyoon', 'Al Eisai', 'Aramco', 'Dr. Sulaiman Al Habib'].map(c => (
                <div key={c} className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>{c}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, rgba(255,255,255,0.6) 0%, transparent 60%)' }} />
        <div className="container-xl relative z-10 text-center">
          <h2 className="section-title text-white mb-5">
            {ar ? 'اخلق تجربة صحية يتذكرها المرضى' : 'Create a Healthcare Experience Patients Actually Remember'}
          </h2>
          <p className="subtitle text-white/75 max-w-xl mx-auto mb-10">
            {ar ? 'توريفا تُحوّل المنشآت الصحية إلى بيئات ذكية تُحسّن تجربة المريض وتُعزّز مكانة المؤسسة.' : 'Turriva transforms healthcare facilities into intelligent environments that improve patient experience and strengthen institutional reputation.'}
          </p>
          <Link to="/contact" className="inline-block px-12 py-4 bg-white rounded-full font-semibold text-sm hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--teal-deep)' }}>
            {ar ? 'حجز استشارة' : 'Book Consultation'}
          </Link>
        </div>
      </section>

    </div>
  )
}
