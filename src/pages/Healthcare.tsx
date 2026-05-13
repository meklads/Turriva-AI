import { Link } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

function ImgPlaceholder({ icon, label, height = 200 }: { icon: string; label: string; height?: number }) {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center gap-3 w-full overflow-hidden"
      style={{ height, background: 'linear-gradient(135deg, #0d5c63 0%, #1a8a94 60%, #2ab5c2 100%)' }}>
      <div className="text-4xl opacity-60">{icon}</div>
      <div className="text-white/50 text-xs font-medium tracking-widest uppercase text-center px-4">{label}</div>
    </div>
  )
}

export default function Healthcare() {
  const { isAr } = useLang()
  const ar = isAr

  return (
    <div className="bg-white" dir={ar ? 'rtl' : 'ltr'}>

      {/* ── HERO ── */}
      <section className="pt-44 pb-20" style={{ background: 'linear-gradient(160deg, #f0fafa 0%, #ffffff 60%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-6">{ar ? 'الحلول الصحية' : 'Healthcare Solutions'}</div>
              <h1 className="hero-title text-gray-900 mb-5">
                {ar ? 'أنظمة التجربة الصحية الذكية' : 'Healthcare Smart Experience'}{' '}
                <span className="gradient-text">
                  {ar ? 'تُحسّن رحلة المريض عبر أنظمة رقمية تفاعلية' : 'Improving Patient Journey Through Interactive Digital Systems'}
                </span>
              </h1>
              <p className="subtitle text-gray-500 mb-10 max-w-lg">
                {ar
                  ? 'نبني بيئات مستشفيات ذكية تُحسّن تجربة المريض وتُقلل الضغط وتُولّد بيانات قابلة للتنفيذ.'
                  : 'We build intelligent hospital environments that improve patient experience, reduce stress, and generate actionable data.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  {ar ? 'طلب استشارة' : 'Request Consultation'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link to="/plans" className="btn-outline">{ar ? 'الخطط والباقات' : 'Plans & Packages'}</Link>
              </div>
            </div>
            <ImgPlaceholder icon="🏥" label={ar ? 'مستشفى ذكي — شاشات تفاعلية + واجهة مريض' : 'Smart Hospital — Digital Screens + Patient Interface'} height={420} />
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-5">{ar ? 'التحدي' : 'The Challenge'}</div>
              <h2 className="section-title text-gray-900 mb-6">
                {ar ? 'واقع تجربة المريض' : 'The Reality of'}{' '}
                <span className="gradient-text">{ar ? 'اليوم في المستشفيات' : 'Patient Experience Today'}</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '😵', title: ar ? 'ارتباك المريض داخل المستشفى' : 'Patient confusion inside hospitals', desc: ar ? 'غياب الإرشاد الواضح يُسبب ضغطاً نفسياً ويُضيع وقتاً ثميناً للمريض وأسرته' : 'Lack of clear wayfinding causes psychological stress and wastes valuable time for patients and families' },
                  { icon: '📉', title: ar ? 'غياب تجربة منظمة وممنهجة' : 'Lack of structured experience', desc: ar ? 'المريض لا يعرف ما ينتظره في كل خطوة مما يُضاعف القلق والغموض' : 'Patients don\'t know what to expect at each step, doubling anxiety and uncertainty' },
                  { icon: '🔍', title: ar ? 'لا بيانات عن رحلة المريض' : 'No data about the patient journey', desc: ar ? 'المستشفيات لا تملك رؤية واضحة لكيفية تنقل المريض وأين تنشأ نقاط الاحتكاك' : 'Hospitals lack clear visibility into how patients move and where friction points arise' },
                  { icon: '⚙️', title: ar ? 'عدم الكفاءة التشغيلية' : 'Operational inefficiency', desc: ar ? 'الموظفون يقضون وقتاً طويلاً في الإرشاد والإجابة على أسئلة يمكن أتمتتها بسهولة' : 'Staff spend excessive time on guidance and answering questions that can easily be automated' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white">
                    <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ImgPlaceholder icon="📊" label={ar ? 'بيانات رحلة المريض — نقاط الاحتكاك' : 'Patient Journey Data — Friction Points'} height={480} />
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'الحل' : 'The Solution'}</div>
            <h2 className="section-title text-gray-900 mb-4">
              {ar ? 'ما نبنيه' : 'What We'}{' '}
              <span className="gradient-text">{ar ? 'في مستشفياتكم' : 'Build in Your Hospital'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '🚶', img: '🗺', title: ar ? 'أنظمة رحلة المريض التفاعلية' : 'Interactive Patient Journey Systems', desc: ar ? 'خرائط تفاعلية وإرشاد ذكي يقود المريض من لحظة الدخول حتى انتهاء الزيارة بسلاسة تامة' : 'Interactive maps and intelligent guidance leading the patient from entry to departure end-to-end' },
              { icon: '🖥', img: '🏥', title: ar ? 'تجربة تسجيل وصول ذكية' : 'Smart Check-in Experience', desc: ar ? 'أكشاك تسجيل ذاتية بواجهة عربية/إنجليزية تقلل الانتظار وتُحسّن الانطباع الأول' : 'Self-service check-in kiosks with Arabic/English interface reducing waiting and improving first impressions' },
              { icon: '🧭', img: '📍', title: ar ? 'نظام ملاحة داخلية رقمية' : 'Digital Hospital Navigation', desc: ar ? 'شاشات توجيهية ذكية في كل نقطة تحول تضمن وصول المريض لوجهته بثقة' : 'Smart directional screens at every turning point ensuring patients reach their destination confidently' },
              { icon: '💬', img: '🤖', title: ar ? 'أنظمة معلومات بمساعدة الذكاء الاصطناعي' : 'AI-Assisted Information Systems', desc: ar ? 'مساعد ذكاء اصطناعي يجيب على استفسارات المرضى عن الخدمات والمواعيد والإجراءات' : 'AI assistant answering patient inquiries about services, appointments, and procedures' },
            ].map((item) => (
              <div key={item.title} className="premium-card p-0 overflow-hidden flex">
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 160, background: 'linear-gradient(135deg, #0d5c63 0%, #2ab5c2 100%)' }}>
                  <div className="text-white/50 text-5xl">{item.img}</div>
                </div>
                <div className="p-6">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA VALUE ── */}
      <section className="section-padding" style={{ background: 'linear-gradient(160deg, #f0fafa 0%, #ffffff 100%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ImgPlaceholder icon="📈" label={ar ? 'لوحة تحليلات تجربة المريض' : 'Patient Experience Analytics Dashboard'} height={400} />
            <div>
              <div className="tag mb-5">{ar ? 'قيمة البيانات' : 'Data Value'}</div>
              <h2 className="section-title text-gray-900 mb-6">
                {ar ? 'نولّد بيانات' : 'We Generate'}{' '}
                <span className="gradient-text">{ar ? 'قابلة للتنفيذ' : 'Actionable Intelligence'}</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '🔍', label: ar ? 'رؤى سلوك المريض' : 'Patient Behavior Insights', desc: ar ? 'أين يتوقف، ماذا يقرأ، وأين يشعر بالارتباك' : 'Where they stop, what they read, where they feel confused' },
                  { icon: '🗺', label: ar ? 'تتبع بيانات الرحلة' : 'Journey Tracking Data', desc: ar ? 'مسار كل مريض من الدخول للخروج مع التوقيتات والنقاط الحرجة' : 'Each patient\'s path from entry to exit with timings and critical points' },
                  { icon: '⚙️', label: ar ? 'بيانات تحسين الخدمة' : 'Service Optimization Data', desc: ar ? 'اكتشاف اختناقات العمليات وفرص تحسين تدفق العمل' : 'Discovering operational bottlenecks and workflow improvement opportunities' },
                  { icon: '📊', label: ar ? 'مقاييس تحسين التجربة' : 'Experience Improvement Metrics', desc: ar ? 'قياس رضا المريض ومقارنته عبر الزمن لاتخاذ قرارات مبنية على الواقع' : 'Measuring patient satisfaction and tracking it over time for evidence-based decisions' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl hover:bg-teal-pale/30 transition-colors">
                    <div className="text-xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'الأثر' : 'Impact'}</div>
            <h2 className="section-title text-gray-900">
              {ar ? 'ما يتغير' : 'What Changes'}{' '}
              <span className="gradient-text">{ar ? 'في مستشفاكم' : 'in Your Hospital'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '😌', val: ar ? 'أقل توتراً' : 'Less Stress', desc: ar ? 'تقليل قلق الانتظار من خلال معلومات واضحة وبيئة مريحة' : 'Reduce waiting anxiety through clear information and comfortable environment' },
              { icon: '⭐', val: ar ? 'رضا أعلى' : 'Higher Satisfaction', desc: ar ? 'تحسين رضا المرضى ومؤشرات تجربة الرعاية الصحية المقاسة' : 'Improved patient satisfaction and measured healthcare experience indicators' },
              { icon: '⚡', val: ar ? 'كفاءة أكبر' : 'Greater Efficiency', desc: ar ? 'تحسين كفاءة المستشفى وتقليل الوقت المهدر في الإرشاد اليدوي' : 'Improve hospital efficiency and reduce time wasted in manual guidance' },
              { icon: '💡', val: ar ? 'قرارات مبنية على البيانات' : 'Data-Driven Decisions', desc: ar ? 'تمكين القيادة من تحسين الخدمات بناءً على بيانات حقيقية وليس تخمينات' : 'Enable leadership to improve services based on real data rather than guesswork' },
            ].map((item) => (
              <div key={item.val} className="premium-card p-7 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="font-bold text-gray-900 mb-2 gradient-text text-lg">{item.val}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-10">
            <div className="tag mb-4">{ar ? 'مرجع تنفيذي' : 'Execution Reference'}</div>
            <h2 className="section-title text-gray-900 mb-4">
              {ar ? 'المركز الطبي الدولي' : 'International Medical Center'}{' '}
              <span className="gradient-text">{ar ? '— جدة' : '— Jeddah'}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {[
                { val: '97%', label: ar ? 'رضا المرضى' : 'Patient Satisfaction' },
                { val: '-42%', label: ar ? 'تقليل التوتر' : 'Stress Reduction' },
                { val: '+35%', label: ar ? 'كفاءة تشغيلية' : 'Operational Efficiency' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-5 text-center min-w-[140px]" style={{ background: 'var(--gray-warm)' }}>
                  <div className="text-2xl font-bold gradient-text">{s.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="container-xl relative z-10 text-center">
          <h2 className="section-title text-white mb-5">
            {ar ? 'حوّل تجربة المريض في مستشفاكم' : "Let's Transform Your Hospital's Patient Experience"}
          </h2>
          <p className="subtitle text-white/75 max-w-xl mx-auto mb-10">
            {ar ? 'نعمل مع فرق المستشفيات لتصميم وتنفيذ أنظمة التجربة من الفكرة حتى التشغيل.' : 'We work with hospital teams to design and implement experience systems from concept to operation.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="px-10 py-4 bg-white rounded-full font-semibold text-sm hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--teal-deep)' }}>
              {ar ? 'طلب استشارة مجانية' : 'Request Free Consultation'}
            </Link>
            <Link to="/plans" className="px-10 py-4 bg-white/15 rounded-full font-semibold text-sm text-white border border-white/30 hover:bg-white/25 transition-all">
              {ar ? 'الخطط والباقات' : 'View Plans & Packages'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
