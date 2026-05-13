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

export default function AITransformation() {
  const { isAr } = useLang()
  const ar = isAr

  return (
    <div className="bg-white" dir={ar ? 'rtl' : 'ltr'}>

      {/* ── HERO ── */}
      <section className="pt-44 pb-20" style={{ background: 'linear-gradient(160deg, #f0fafa 0%, #ffffff 60%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-6">{ar ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'}</div>
              <h1 className="hero-title text-gray-900 mb-5">
                {ar ? 'أنظمة الذكاء الاصطناعي' : 'AI Experience Systems'}{' '}
                <span className="gradient-text">
                  {ar ? 'من التفاعل إلى الأتمتة الذكية' : 'From Interaction to Intelligent Automation'}
                </span>
              </h1>
              <p className="subtitle text-gray-500 mb-10 max-w-lg">
                {ar
                  ? 'نبني أنظمة ذكاء اصطناعي مدمجة في تجارب العملاء الفعلية — وكلاء المبيعات والروبوتات الصوتية وأنظمة الأتمتة الذكية.'
                  : 'We build AI systems embedded in real customer experiences — sales agents, voice bots, and intelligent automation systems.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  {ar ? 'طلب عرض تجريبي' : 'Request a Demo'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link to="/plans" className="btn-outline">{ar ? 'الخطط والباقات' : 'Plans & Packages'}</Link>
              </div>
            </div>
            <ImgPlaceholder icon="🤖" label={ar ? 'واجهة وكيل الذكاء الاصطناعي — رسم بياني الأتمتة' : 'AI Agent Interface — Automation Flow Diagram'} height={420} />
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'ما نبنيه' : 'What We Build'}</div>
            <h2 className="section-title text-gray-900 mb-4">
              {ar ? 'أنظمة الذكاء الاصطناعي' : 'AI Systems'}{' '}
              <span className="gradient-text">{ar ? 'التي نبنيها' : 'We Deploy'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '🧠', img: '💬', title: ar ? 'وكلاء المبيعات بالذكاء الاصطناعي' : 'AI Sales Agents', desc: ar ? 'وكلاء ذكاء اصطناعي يتحدثون باللغة العربية والإنجليزية ويجيبون على استفسارات المشترين ويقترحون المنتجات المناسبة على مدار الساعة' : 'AI agents speaking Arabic and English, answering buyer inquiries and suggesting suitable products around the clock' },
              { icon: '📞', img: '🎙', title: ar ? 'أنظمة الروبوت الصوتي' : 'Call Bot Systems', desc: ar ? 'روبوتات صوتية تستقبل المكالمات وترد على الاستفسارات الشائعة وتحجز المواعيد دون تدخل بشري' : 'Voice robots receiving calls, answering common inquiries, and booking appointments without human intervention' },
              { icon: '⚙️', img: '🔄', title: ar ? 'أتمتة تفاعل العملاء' : 'Customer Interaction Automation', desc: ar ? 'أتمتة رحلات التواصل مع العملاء من الاستفسار الأول حتى ما بعد البيع عبر منصات متعددة' : 'Automating customer communication journeys from first inquiry through post-sale across multiple platforms' },
              { icon: '📚', img: '🔍', title: ar ? 'مساعدو المعرفة بالذكاء الاصطناعي' : 'Knowledge-Based AI Assistants', desc: ar ? 'مساعدون ذكيون مدربون على قاعدة معرفة مؤسستكم للإجابة على الأسئلة الداخلية وأسئلة العملاء بدقة' : 'Intelligent assistants trained on your organization\'s knowledge base to accurately answer internal and customer questions' },
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

      {/* ── USE CASES ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'حالات الاستخدام' : 'Use Cases'}</div>
            <h2 className="section-title text-gray-900 mb-4">
              {ar ? 'نظم الذكاء الاصطناعي' : 'AI Systems'}{' '}
              <span className="gradient-text">{ar ? 'في قطاعات حقيقية' : 'in Real Sectors'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏘',
                tag: ar ? 'عقارات' : 'Real Estate',
                title: ar ? 'مساعد مبيعات عقاري بالذكاء الاصطناعي' : 'Real Estate AI Sales Assistant',
                points: ar
                  ? ['يرد على استفسارات الوحدات والأسعار', 'يرتب جولات افتراضية ومواعيد الزيارة', 'يقترح الوحدة الأنسب بناءً على التفضيلات', 'يتابع مع العملاء المحتملين تلقائياً']
                  : ['Answers unit and pricing inquiries', 'Arranges virtual tours and visit appointments', 'Suggests best unit based on preferences', 'Automatically follows up with leads'],
              },
              {
                icon: '🏥',
                tag: ar ? 'رعاية صحية' : 'Healthcare',
                title: ar ? 'موظف استقبال مستشفى بالذكاء الاصطناعي' : 'Hospital AI Receptionist',
                points: ar
                  ? ['حجز المواعيد وإدارتها', 'الإجابة على أسئلة الخدمات والتأمين', 'إرشاد المريض داخل المستشفى', 'التذكير بالمواعيد وتعليمات ما قبل الزيارة']
                  : ['Appointment booking and management', 'Answering service and insurance questions', 'Patient wayfinding inside hospital', 'Appointment reminders and pre-visit instructions'],
              },
              {
                icon: '🏢',
                tag: ar ? 'مؤسسات' : 'Enterprise',
                title: ar ? 'وكيل دعم مؤسسي بالذكاء الاصطناعي' : 'Corporate AI Support Agent',
                points: ar
                  ? ['دعم الموظفين بالأسئلة الشائعة والسياسات', 'معالجة الطلبات الداخلية تلقائياً', 'تدريب الموظفين الجدد عبر المعرفة التفاعلية', 'تقارير وتحليلات الطلبات والاستفسارات']
                  : ['Employee support for FAQs and policies', 'Automatic processing of internal requests', 'New employee onboarding via interactive knowledge', 'Request and inquiry reporting and analytics'],
              },
            ].map((uc) => (
              <div key={uc.title} className="premium-card p-0 overflow-hidden">
                <div className="flex items-center justify-center" style={{ height: 140, background: 'linear-gradient(135deg, #0d5c63 0%, #2ab5c2 100%)' }}>
                  <div className="text-center">
                    <div className="text-5xl opacity-60">{uc.icon}</div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'var(--teal-pale)', color: 'var(--teal-deep)' }}>{uc.tag}</span>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm leading-snug">{uc.title}</h3>
                  <ul className="space-y-2">
                    {uc.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--teal-mid)' }}></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE ── */}
      <section className="section-padding" style={{ background: 'linear-gradient(160deg, #f0fafa 0%, #ffffff 100%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-5">{ar ? 'القيمة المؤسسية' : 'Enterprise Value'}</div>
              <h2 className="section-title text-gray-900 mb-6">
                {ar ? 'ما الذي تحققه' : 'What You'}{' '}
                <span className="gradient-text">{ar ? 'للمؤسسة' : 'Actually Gain'}</span>
              </h2>
              <div className="space-y-5">
                {[
                  { icon: '💰', title: ar ? 'تقليل التكاليف التشغيلية' : 'Reduce Operational Cost', desc: ar ? 'أتمتة المهام المتكررة تُحرر فريقك للتركيز على العمل ذي القيمة العالية' : 'Automating repetitive tasks frees your team to focus on high-value work' },
                  { icon: '⚡', title: ar ? 'تسريع زمن الاستجابة' : 'Increase Response Speed', desc: ar ? 'استجابة فورية على مدار 24 ساعة دون انتظار وبلا تأخير' : 'Instant response 24 hours a day with no waiting and no delay' },
                  { icon: '📊', title: ar ? 'التقاط البيانات وتحليلها' : 'Capture and Analyze Data', desc: ar ? 'كل تفاعل يولد بيانات قيمة عن احتياجات عملائك ونقاط ضعف تجربتهم' : 'Every interaction generates valuable data about your customers\' needs and experience pain points' },
                  { icon: '⭐', title: ar ? 'تحسين تجربة العميل' : 'Improve Customer Experience', desc: ar ? 'تجربة متسقة ودقيقة ومتاحة دائماً تُعزز رضا العملاء وولاءهم' : 'Consistent, accurate, and always-available experience that enhances customer satisfaction and loyalty' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl hover:bg-teal-pale/30 transition-colors border border-gray-100">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <ImgPlaceholder icon="💬" label={ar ? 'واجهة الدردشة بالذكاء الاصطناعي' : 'AI Chat Interface'} height={190} />
              <ImgPlaceholder icon="📊" label={ar ? 'لوحة تحكم مركز الاتصال بالذكاء الاصطناعي' : 'AI Call Center Dashboard'} height={190} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="container-xl relative z-10 text-center">
          <h2 className="section-title text-white mb-5">
            {ar ? 'أضف الذكاء الاصطناعي إلى تجربة عملائك' : 'Add AI Intelligence to Your Customer Experience'}
          </h2>
          <p className="subtitle text-white/75 max-w-xl mx-auto mb-10">
            {ar ? 'نبني الأنظمة من الصفر وندمجها في بيئتك التشغيلية الحالية.' : 'We build systems from scratch and integrate them into your existing operational environment.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="px-10 py-4 bg-white rounded-full font-semibold text-sm hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--teal-deep)' }}>
              {ar ? 'ابدأ المحادثة' : 'Start the Conversation'}
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
