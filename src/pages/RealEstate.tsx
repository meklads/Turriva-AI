import { Link } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

function ImagePlaceholder({ icon, label, height = 220 }: { icon: string; label: string; height?: number }) {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden"
      style={{ height, background: 'linear-gradient(135deg, #0d5c63 0%, #1a8a94 60%, #2ab5c2 100%)' }}>
      <div className="text-4xl opacity-60">{icon}</div>
      <div className="text-white/50 text-xs font-medium tracking-widest uppercase text-center px-4">{label}</div>
    </div>
  )
}

function StepBadge({ n }: { n: number }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #0d5c63, #2ab5c2)' }}>
      {n}
    </div>
  )
}

export default function RealEstate() {
  const { lang, isAr } = useLang()
  const ar = isAr

  return (
    <div className="bg-white" dir={ar ? 'rtl' : 'ltr'}>

      {/* ── HERO ── */}
      <section className="pt-44 pb-20" style={{ background: 'linear-gradient(160deg, #f0fafa 0%, #ffffff 60%)' }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-6">{ar ? 'الحلول العقارية' : 'Real Estate Solutions'}</div>
              <h1 className="hero-title text-gray-900 mb-5">
                {ar ? 'مركز المبيعات الذكي' : 'Smart Sales Center'}{' '}
                <span className="gradient-text">
                  {ar ? 'يحوّل صالة البيع إلى نظام قرار تفاعلي' : 'Turning Sales Offices into Interactive Decision Systems'}
                </span>
              </h1>
              <p className="subtitle text-gray-500 mb-10 max-w-lg">
                {ar
                  ? 'نصمم بيئات مبيعات عقارية ذكية تجمع بين النموذج المعماري الحقيقي والأنظمة الرقمية التفاعلية لمساعدة العميل على اتخاذ قرار الشراء.'
                  : 'We design intelligent real estate sales environments that combine physical architectural models with interactive digital systems to help buyers make confident purchase decisions.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  {ar ? 'طلب عرض تجريبي' : 'Request a Demo'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link to="/plans" className="btn-outline">{ar ? 'الخطط والباقات' : 'Plans & Packages'}</Link>
              </div>
            </div>
            <div>
              <ImagePlaceholder icon="🏙" label={ar ? 'مركز مبيعات — نموذج + شاشات تفاعلية' : 'Sales Center — Model + Interactive Screens'} height={420} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CLIENT SEES ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="tag mb-4">{ar ? 'تجربة العميل' : 'Client Experience'}</div>
            <h2 className="section-title text-gray-900 mb-4">
              {ar ? 'ما يراه عميلك' : 'What Your Client'}{' '}
              <span className="gradient-text">{ar ? 'فعلاً' : 'Actually Experiences'}</span>
            </h2>
            <p className="subtitle text-gray-500 max-w-2xl mx-auto">
              {ar
                ? 'المطور لا يبيع "تقنية" — العميل يرى تجربة متكاملة تساعده على الاختيار وتثق بقراره.'
                : 'The developer is not selling "technology" — the client sees a complete experience that helps them choose and trust their decision.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: '🏗', img: '🗺', label: ar ? 'نموذج معماري حقيقي' : 'Real Architectural Model', desc: ar ? 'نموذج مادي عالي الدقة للمشروع يُمكّن العميل من رؤية المخطط بشكل ثلاثي الأبعاد' : 'High-precision physical scale model of the project enabling clients to see the layout in 3D' },
              { icon: '📺', img: '🖥', label: ar ? 'شاشات عرض تفاعلية' : 'Interactive Display Screens', desc: ar ? 'شاشات تعرض الوحدات والأسعار والمساقط مع إمكانية التفاعل والاستفسار المباشر' : 'Screens showing units, pricing and floor plans with direct interaction and inquiry capability' },
              { icon: '🎮', img: '🏠', label: ar ? 'جولة ثلاثية الأبعاد' : '3D Walkthrough Experience', desc: ar ? 'تجربة غمر كاملة داخل الوحدة قبل بنائها عبر تصور ثلاثي الأبعاد عالي الجودة' : 'Full immersive experience inside the unit before construction via high-quality 3D visualization' },
              { icon: '🤖', img: '📊', label: ar ? 'توصيات فورية بالذكاء الاصطناعي' : 'Real-Time AI Recommendations', desc: ar ? 'يقترح النظام الوحدة الأنسب بناءً على تفضيلات العميل وسلوكه خلال الزيارة' : 'The system suggests the best unit based on client preferences and behavior during the visit' },
            ].map((item) => (
              <div key={item.label} className="premium-card p-0 overflow-hidden flex flex-col md:flex-row gap-0">
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '100%', maxWidth: 180, minHeight: 140, background: 'linear-gradient(135deg, #0d5c63 0%, #2ab5c2 100%)' }}>
                  <div className="text-center text-white/50">
                    <div className="text-4xl">{item.img}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM COMPONENTS ── */}
      <section className="section-padding" style={{ background: 'var(--gray-warm)' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'مكونات النظام' : 'System Components'}</div>
            <h2 className="section-title text-gray-900 mb-4">
              {ar ? 'منظومة المبيعات الذكية' : 'The Full Smart'}{' '}
              <span className="gradient-text">{ar ? 'المتكاملة' : 'Sales System'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: '🗺', img: '🏛', title: ar ? 'النموذج المعماري المادي' : 'Architectural Physical Model', desc: ar ? 'نموذج مادي عالي الجودة للمشروع بمقياس دقيق مع إضاءة ذكية وعناصر متحركة' : 'High-end scale model of the project with smart lighting and interactive elements' },
              { num: '02', icon: '🖥', img: '📺', title: ar ? 'شاشات العرض التفاعلية' : 'Interactive Display Screens', desc: ar ? 'تعرض الوحدات والأسعار والمساقط بواجهة سهلة وجذابة' : 'Show units, pricing, layouts via intuitive and attractive interface' },
              { num: '03', icon: '🎨', img: '🏠', title: ar ? 'محتوى التصور ثلاثي الأبعاد' : '3D Visualization Content', desc: ar ? 'رسوم متحركة وجولات داخل الوحدات بجودة تصوير سينمائية' : 'Walkthrough animations inside units with cinematic rendering quality' },
              { num: '04', icon: '📊', img: '💡', title: ar ? 'طبقة ذكاء المبيعات' : 'Sales Intelligence Layer', desc: ar ? 'يلتقط تفضيلات العملاء ويولد بيانات المشترين في الوقت الفعلي' : 'Captures customer preferences and generates real buyer data in real time' },
            ].map((item) => (
              <div key={item.num} className="premium-card p-0 overflow-hidden">
                <div className="flex items-center justify-center" style={{ height: 160, background: 'linear-gradient(135deg, #0d5c63 0%, #1a8a94 60%, #2ab5c2 100%)' }}>
                  <div className="text-center text-white/50">
                    <div className="text-5xl">{item.img}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-teal tracking-widest mb-2">{item.num}</div>
                  <div className="text-xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'آلية العمل' : 'How It Works'}</div>
            <h2 className="section-title text-gray-900">
              {ar ? 'رحلة العميل' : 'The Client'}{' '}
              <span className="gradient-text">{ar ? 'خطوة بخطوة' : 'Journey — Step by Step'}</span>
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { n: 1, title: ar ? 'يدخل الزائر إلى صالة المبيعات' : 'Visitor enters the sales center', desc: ar ? 'بيئة مصممة لإيجاد انطباع أول قوي وثقة فورية بالمشروع' : 'An environment designed to create a powerful first impression and immediate project trust' },
              { n: 2, title: ar ? 'يتفاعل مع النموذج والشاشات' : 'Interacts with the model and screens', desc: ar ? 'يستكشف العميل المشروع بشكل فعلي — يلمس ويرى ويتحكم في المعلومات' : 'The client physically explores the project — touching, seeing, and controlling information' },
              { n: 3, title: ar ? 'يحدد تفضيلاته' : 'Selects their preferences', desc: ar ? 'من خلال الواجهة التفاعلية يحدد العميل المساحة والطابق والميزانية المفضلة' : 'Through the interactive interface, the client specifies preferred size, floor, and budget' },
              { n: 4, title: ar ? 'النظام يقترح أفضل الوحدات' : 'System suggests the best units', desc: ar ? 'يقدم الذكاء الاصطناعي الوحدات الأنسب مع مقارنة مباشرة وتصور فوري' : 'AI presents the best matching units with direct comparison and instant visualization' },
              { n: 5, title: ar ? 'البيانات تُحفظ للتحليل' : 'Data stored for analysis', desc: ar ? 'كل تفاعل يولد بيانات قيمة تساعد فريق المبيعات على المتابعة الذكية' : 'Every interaction generates valuable data helping the sales team with intelligent follow-up' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-6 rounded-2xl hover:bg-teal-pale/30 transition-colors border border-gray-100">
                <StepBadge n={step.n} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS VALUE ── */}
      <section className="section-padding" style={{ background: 'linear-gradient(160deg, #f0fafa 0%, #ffffff 100%)' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'القيمة التجارية' : 'Business Value'}</div>
            <h2 className="section-title text-gray-900">
              {ar ? 'لماذا يستثمر المطورون' : 'Why Developers'}{' '}
              <span className="gradient-text">{ar ? 'في هذا النظام' : 'Invest in This System'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📈', title: ar ? 'رفع معدل التحويل' : 'Increase Conversion Rate', desc: ar ? 'صالات المبيعات الذكية تحقق معدلات تحويل أعلى من الصالات التقليدية بفضل تجربة القرار المدعومة بالبيانات' : 'Smart sales centers achieve higher conversion rates than traditional showrooms through data-supported decision experiences' },
              { icon: '🧠', title: ar ? 'فهم أعمق للمشتري' : 'Deeper Buyer Understanding', desc: ar ? 'يفهم العميل المشروع بشكل أعمق ويقل اعتماده على موظف المبيعات مما يسرع دورة القرار' : 'Clients understand the project more deeply with less reliance on sales agents, accelerating the decision cycle' },
              { icon: '🤖', title: ar ? 'تقليل الضغط على فريق المبيعات' : 'Reduce Sales Team Pressure', desc: ar ? 'النظام يجيب على الأسئلة المتكررة ويقدم المقارنات تلقائياً مما يحرر الفريق للعلاقات عالية القيمة' : 'The system answers repetitive questions and provides comparisons automatically, freeing the team for high-value relationships' },
              { icon: '📊', title: ar ? 'بيانات مشترين حقيقية' : 'Generate Real Buyer Data', desc: ar ? 'كل زيارة تولد رؤى عن التفضيلات والمخاوف والدوافع — بيانات لا تقدر بثمن لفريق التسويق' : 'Every visit generates insights on preferences, concerns, and motivations — priceless data for the marketing team' },
              { icon: '🏆', title: ar ? 'تعزيز مكانة المشروع' : 'Improve Project Positioning', desc: ar ? 'صالة مبيعات ذكية تعكس جودة المشروع وتُميّزه عن المنافسين في أذهان المشترين' : 'A smart sales center reflects project quality and differentiates it from competitors in buyers\' minds' },
              { icon: '🌍', title: ar ? 'توافق رؤية 2030' : 'Vision 2030 Aligned', desc: ar ? 'يلبي متطلبات التحول الرقمي في القطاع العقاري ويدعم أهداف الإسكان الوطنية' : 'Meets digital transformation requirements in the real estate sector and supports national housing goals' },
            ].map((item) => (
              <div key={item.title} className="premium-card p-7">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="tag mb-4">{ar ? 'تنفيذ حقيقي' : 'Real Execution'}</div>
            <h2 className="section-title text-gray-900">
              {ar ? 'نفذنا هذا' : 'We\'ve Built'}{' '}
              <span className="gradient-text">{ar ? 'فعلاً' : 'This Before'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: '🏛', label: ar ? 'النموذج المعماري' : 'Architectural Model' },
              { icon: '📺', label: ar ? 'الشاشات التفاعلية' : 'Interactive Screens' },
              { icon: '🤖', label: ar ? 'نظام الذكاء الاصطناعي' : 'AI System' },
              { icon: '📊', label: ar ? 'لوحة بيانات المبيعات' : 'Sales Dashboard' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl flex flex-col items-center justify-center gap-3"
                style={{ height: 180, background: 'linear-gradient(135deg, #0d5c63 0%, #2ab5c2 100%)' }}>
                <div className="text-4xl opacity-60">{item.icon}</div>
                <div className="text-white/50 text-xs text-center px-2">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/case-study/muslim-world-league" className="btn-primary">
              {ar ? 'عرض التنفيذ الحقيقي — معرض رابطة العالم الإسلامي' : 'See Real Implementation — Muslim World League'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="container-xl relative z-10 text-center">
          <h2 className="section-title text-white mb-5">
            {ar ? 'ابدأ بتحويل صالة مبيعاتك' : "Let's Build Your Smart Sales Center"}
          </h2>
          <p className="subtitle text-white/75 max-w-xl mx-auto mb-10">
            {ar
              ? 'نعمل معك من مرحلة التصميم حتى التسليم والتشغيل الكامل.'
              : 'We work with you from design through full delivery and operation.'}
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
