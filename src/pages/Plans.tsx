import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

/* ══════════════════════════════════════════════════════
   MICRO ICONS
══════════════════════════════════════════════════════ */
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
function ChkBox({ on }: { on: boolean }) {
  if (!on) return <div style={{ width:16, height:16, borderRadius:4, border:'1.5px solid #d1d5db', flexShrink:0 }} />
  return (
    <div style={{ width:16, height:16, borderRadius:4, background:'var(--teal-deep)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  )
}
function Radio({ on }: { on: boolean }) {
  return (
    <div style={{ width:18, height:18, borderRadius:'50%', border: on ? '5px solid var(--teal-deep)' : '1.5px solid #d1d5db', flexShrink:0, transition:'all .15s' }} />
  )
}

/* ══════════════════════════════════════════════════════
   CHIP (multi-select row)
══════════════════════════════════════════════════════ */
function Chip({ icon, title, on, onClick }: { icon:string; title:string; on:boolean; onClick:()=>void }) {
  return (
    <div onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:12, cursor:'pointer',
      border: on ? '1.5px solid var(--teal-deep)' : '1.5px solid #e9ecef',
      background: on ? 'var(--teal-pale)' : 'white',
      boxShadow: on ? '0 0 0 2px rgba(13,92,99,.07)' : '0 1px 3px rgba(0,0,0,.03)',
      transition:'all .15s', userSelect:'none',
    }}>
      <span style={{ fontSize:18, lineHeight:1, flexShrink:0 }}>{icon}</span>
      <span style={{ fontSize:13, fontWeight:500, color:'#374151', flex:1 }}>{title}</span>
      <ChkBox on={on} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   STACK (single-select full-width)
══════════════════════════════════════════════════════ */
function Stack({ title, sub, badge, on, onClick }: { title:string; sub?:string; badge?:string; on:boolean; onClick:()=>void }) {
  return (
    <div onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:12, cursor:'pointer',
      border: on ? '1.5px solid var(--teal-deep)' : '1.5px solid #e9ecef',
      background: on ? 'var(--teal-pale)' : 'white',
      boxShadow: on ? '0 0 0 2px rgba(13,92,99,.07)' : '0 1px 3px rgba(0,0,0,.03)',
      transition:'all .15s', userSelect:'none',
    }}>
      <Radio on={on} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:'#111827' }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>{sub}</div>}
      </div>
      {badge && (
        <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20, background:'var(--teal-deep)', color:'white', flexShrink:0 }}>{badge}</span>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   STEP HEADER inside expansion
══════════════════════════════════════════════════════ */
function Q({ n, text }: { n:number; text:string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
      <div style={{ width:26, height:26, borderRadius:'50%', background:'var(--teal-deep)', color:'white', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{n}</div>
      <span style={{ fontSize:14, fontWeight:700, color:'#111827' }}>{text}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   SERVICE CARD (top 4 cards — like Calo meal cards)
══════════════════════════════════════════════════════ */
function ServiceCard({ icon, title, desc, tag, on, onClick, isAr }: {
  icon:string; title:string; desc:string; tag:string; on:boolean; onClick:()=>void; isAr:boolean
}) {
  return (
    <div onClick={onClick} style={{
      borderRadius:16, padding:18, cursor:'pointer', userSelect:'none',
      border: on ? '2px solid var(--teal-deep)' : '1.5px solid #e9ecef',
      background: on ? 'var(--teal-pale)' : 'white',
      boxShadow: on ? '0 0 0 4px rgba(13,92,99,.08), 0 4px 12px rgba(0,0,0,.06)' : '0 1px 4px rgba(0,0,0,.05)',
      transition:'all .2s', display:'flex', flexDirection:'column', minHeight:150,
    }}>
      {/* top */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, flex:1 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14, fontWeight:800, color:'#111827', lineHeight:1.3, marginBottom:6 }}>{title}</div>
          <div style={{ fontSize:12, color:'#9ca3af', lineHeight:1.6 }}>{desc}</div>
        </div>
        <div style={{
          width:52, height:52, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:28, flexShrink:0,
          background: on ? 'rgba(13,92,99,.12)' : '#f8fafb',
        }}>{icon}</div>
      </div>
      {/* bottom */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop: on ? '1px solid rgba(13,92,99,.1)' : '1px solid #f3f4f6' }}>
        <span style={{ fontSize:12, fontWeight:500, color:'var(--teal-deep)' }}>
          {isAr ? `${tag} ←` : `→ ${tag}`}
        </span>
        <div style={{
          fontSize:12, fontWeight:700, padding:'5px 12px', borderRadius:8,
          background: on ? 'var(--teal-deep)' : 'white',
          color: on ? 'white' : '#374151',
          border: on ? 'none' : '1.5px solid #e5e7eb',
          display:'flex', alignItems:'center', gap:6, transition:'all .15s',
        }}>
          {on
            ? <><span>✓</span><span>{isAr ? 'تم الاختيار' : 'Selected'}</span></>
            : <span>{isAr ? 'اختر' : 'Select'}</span>
          }
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   ANIMATED EXPAND WRAPPER
══════════════════════════════════════════════════════ */
function Expand({ open, children }: { open:boolean; children:React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    if (!ref.current) return
    if (open) {
      setHeight(ref.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [open])
  // re-measure when content changes
  useEffect(() => {
    if (!ref.current || !open) return
    const ro = new ResizeObserver(() => {
      if (ref.current) setHeight(ref.current.scrollHeight)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [open])

  return (
    <div style={{ overflow:'hidden', height, transition:'height .35s cubic-bezier(.4,0,.2,1)' }}>
      <div ref={ref}>{children}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   PILL TAG
══════════════════════════════════════════════════════ */
function Pill({ label }: { label:string }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600, background:'rgba(13,92,99,.08)', color:'var(--teal-deep)' }}>
      {label}
    </span>
  )
}

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */
interface SidebarRow { label:string; value?:string; tags?:string[] }
interface SidebarProps {
  headline: string
  stepsComplete: number
  totalSteps: number
  rows: SidebarRow[]
  isAr: boolean
}
function Sidebar({ headline, stepsComplete, totalSteps, rows, isAr }: SidebarProps) {
  const ready = stepsComplete >= 2
  return (
    <div style={{ background:'white', border:'1px solid #e9ecef', borderRadius:20, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,.07)' }}>
      {/* header */}
      <div style={{ padding:'20px 20px 16px', borderBottom:'1px solid #f3f4f6' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:'var(--teal-pale)', color:'var(--teal-deep)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <BagIcon />
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:'#111827' }}>{isAr ? 'حزمتك، بطريقتك' : 'Your package, your way'}</div>
            <div style={{ fontSize:12, color:'#9ca3af', marginTop:2, lineHeight:1.4 }}>{headline || (isAr ? 'اختر خدمة للبدء' : 'Select a service to begin')}</div>
          </div>
        </div>
        {/* progress */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ flex:1, height:5, borderRadius:10, background:'#f0f4f5', overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:10, background:'var(--teal-deep)', width:`${(stepsComplete/totalSteps)*100}%`, transition:'width .4s' }} />
          </div>
          <span style={{ fontSize:12, fontWeight:700, color: stepsComplete>0 ? 'var(--teal-deep)' : '#9ca3af', flexShrink:0 }}>{stepsComplete}/{totalSteps}</span>
        </div>
      </div>

      {/* summary rows */}
      <div style={{ padding:'16px 20px' }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:14 }}>
          {isAr ? 'ملخص الطلب' : 'Request Summary'}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, paddingBlock:10, borderBottom: i<rows.length-1 ? '1px solid #f3f4f6' : 'none' }}>
            <span style={{ fontSize:12, color:'#9ca3af', flexShrink:0, width:80, paddingTop:1 }}>{row.label}</span>
            <div style={{ flex:1, textAlign:'end' }}>
              {row.value
                ? <span style={{ fontSize:12, fontWeight:700, color:'#111827' }}>{row.value}</span>
                : row.tags && row.tags.length>0
                  ? <div style={{ display:'flex', flexWrap:'wrap', gap:4, justifyContent:'flex-end' }}>
                      {row.tags.slice(0,3).map((t,ti)=><Pill key={ti} label={t}/>)}
                      {row.tags.length>3 && <span style={{fontSize:11,color:'#9ca3af'}}>+{row.tags.length-3}</span>}
                    </div>
                  : <span style={{ fontSize:12, color:'#d1d5db' }}>—</span>
              }
            </div>
          </div>
        ))}
      </div>

      {/* divider */}
      <div style={{ height:1, background:'#f3f4f6' }} />

      {/* CTA */}
      <div style={{ padding:20 }}>
        <Link to="/contact" style={{
          display:'flex', alignItems:'center', justifyContent:'center', width:'100%',
          padding:'14px 0', borderRadius:12, fontSize:13, fontWeight:800, textDecoration:'none',
          background: ready ? 'var(--teal-deep)' : '#e9ecef',
          color: ready ? 'white' : '#9ca3af',
          boxShadow: ready ? '0 4px 20px rgba(13,92,99,.3)' : 'none',
          pointerEvents: ready ? 'auto' : 'none',
          transition:'all .2s',
        }}>
          {isAr ? 'أرسل طلبك المخصص' : 'Send Custom Request'}
        </Link>
        <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', marginTop:10, lineHeight:1.6 }}>
          {ready
            ? (isAr ? 'سنتواصل معك خلال 24 ساعة — بدون أي التزام' : "We'll respond within 24 hrs — no commitment")
            : (isAr ? `أكمل ${2-stepsComplete} خطوة إضافية على الأقل` : `Complete ${2-stepsComplete} more step${2-stepsComplete===1?'':'s'} to continue`)
          }
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const reElements = [
  { id:'3d',        icon:'🏛️', en:'Interactive 3D Model',      ar:'نموذج ثلاثي الأبعاد تفاعلي' },
  { id:'vr',        icon:'🥽', en:'VR Walkthrough',             ar:'جولة بالواقع الافتراضي' },
  { id:'display',   icon:'📺', en:'Cinematic Display Wall',     ar:'جدار عرض سينمائي' },
  { id:'touch',     icon:'🖐️', en:'Touch Table & Unit Selector',ar:'طاولة لمسية لاختيار الوحدات' },
  { id:'ai',        icon:'🤖', en:'AI Sales Kiosk',             ar:'كشك مبيعات ذكي' },
  { id:'signage',   icon:'🖥️', en:'Digital Signage',            ar:'لافتات رقمية' },
  { id:'branded',   icon:'🎨', en:'Branded Interior Design',    ar:'تصميم داخلي بالهوية البصرية' },
  { id:'analytics', icon:'📊', en:'Visitor Analytics',          ar:'تحليلات الزوار' },
]
const reVisitors = [
  { id:'xs', en:'Under 50 / day',  ar:'أقل من 50 يومياً',   badge:'' },
  { id:'sm', en:'50–200 / day',    ar:'50–200 يومياً',       badge:'الأكثر شيوعاً' },
  { id:'md', en:'200–500 / day',   ar:'200–500 يومياً',      badge:'' },
  { id:'lg', en:'500+ / day',      ar:'أكثر من 500 يومياً',  badge:'Enterprise' },
]
const reTimeline = [
  { id:'urgent',   en:'Under 3 months', ar:'أقل من 3 أشهر', badge:'عاجل' },
  { id:'normal',   en:'3–6 months',     ar:'3–6 أشهر',       badge:'' },
  { id:'relaxed',  en:'6–12 months',    ar:'6–12 شهراً',     badge:'' },
  { id:'planning', en:'Still planning', ar:'في مرحلة التخطيط',badge:'' },
]

const hcTouchpoints = [
  { id:'reception', icon:'🚪', en:'Entrance & Reception',  ar:'المدخل والاستقبال' },
  { id:'waiting',   icon:'⏰', en:'Waiting Areas',          ar:'مناطق الانتظار' },
  { id:'rooms',     icon:'🛏️', en:'Patient Rooms & Wards',  ar:'غرف المرضى' },
  { id:'consult',   icon:'👨‍⚕️', en:'Consultation Rooms',    ar:'غرف الاستشارة' },
  { id:'discharge', icon:'📋', en:'Discharge & Follow-up',  ar:'التسريح والمتابعة' },
  { id:'diag',      icon:'🔎', en:'Diagnostic Areas',       ar:'مناطق التشخيص' },
]
const hcSolutions = [
  { id:'wayfinding', icon:'🗺️', en:'Smart Wayfinding',           ar:'التوجيه الذكي' },
  { id:'edu',        icon:'📺', en:'Patient Education Screens',   ar:'شاشات تثقيف المرضى' },
  { id:'queue',      icon:'🎫', en:'Digital Queue Management',    ar:'إدارة الطابور الرقمي' },
  { id:'tele',       icon:'📱', en:'Telemedicine Stations',       ar:'محطات التطبيب عن بعد' },
  { id:'analytics',  icon:'📊', en:'Operational Analytics',       ar:'تحليلات التشغيل' },
  { id:'ai',         icon:'🤖', en:'AI Patient Assistant',        ar:'المساعد الذكي للمرضى' },
]
const hcScales = [
  { id:'sm', en:{ t:'Small',      s:'Under 50 beds' },    ar:{ t:'صغير',    s:'أقل من 50 سرير' },     badge:'' },
  { id:'md', en:{ t:'Medium',     s:'50–200 beds' },      ar:{ t:'متوسط',   s:'50–200 سرير' },          badge:'الأكثر شيوعاً' },
  { id:'lg', en:{ t:'Large',      s:'200–500 beds' },     ar:{ t:'كبير',    s:'200–500 سرير' },          badge:'' },
  { id:'xl', en:{ t:'Enterprise', s:'500+ / Multi-site' },ar:{ t:'مؤسسي',  s:'500+ / متعدد المواقع' }, badge:'Enterprise' },
]

const aiChallenges = [
  { id:'cx',        icon:'💬', en:'Customer Engagement',         ar:'تفاعل العملاء' },
  { id:'sales',     icon:'📈', en:'Sales & Conversion',          ar:'المبيعات والتحويل' },
  { id:'data',      icon:'📊', en:'Data & Business Intelligence', ar:'البيانات وذكاء الأعمال' },
  { id:'ops',       icon:'⚙️', en:'Operations & Automation',     ar:'العمليات والأتمتة' },
  { id:'content',   icon:'📝', en:'Content & Communications',    ar:'المحتوى والتواصل' },
  { id:'knowledge', icon:'🧠', en:'Knowledge Management',        ar:'إدارة المعرفة' },
]
const aiMaturity = [
  { id:'exploring', en:{ t:'Just Exploring',        s:'No deployment yet' },       ar:{ t:'استكشاف أولي',    s:'لا استخدام حتى الآن' } },
  { id:'basic',     en:{ t:'Basic Tools',            s:'ChatGPT, automations' },    ar:{ t:'أدوات أساسية',    s:'أدوات بسيطة وأتمتة محدودة' } },
  { id:'moderate',  en:{ t:'Moderately Integrated',  s:'AI in select workflows' },  ar:{ t:'متكامل جزئياً',   s:'الذكاء الاصطناعي في بعض العمليات' } },
  { id:'advanced',  en:{ t:'Advanced / Enterprise',  s:'AI-first culture' },        ar:{ t:'متقدم / مؤسسي',   s:'ثقافة AI-first ونماذج مخصصة' } },
]
const aiScopes = [
  { id:'pilot',    en:{ t:'Pilot',        s:'Single use case' },      ar:{ t:'تجريبي',   s:'حالة استخدام واحدة' },       badge:'' },
  { id:'dept',     en:{ t:'Department',   s:'One team or unit' },     ar:{ t:'قسم',      s:'فريق أو وحدة واحدة' },        badge:'' },
  { id:'division', en:{ t:'Division',     s:'Multiple departments' }, ar:{ t:'قطاع',     s:'أقسام متعددة' },               badge:'الأشهر' },
  { id:'org',      en:{ t:'Organization', s:'Company-wide' },         ar:{ t:'مؤسسة كاملة', s:'تطبيق على مستوى الشركة' }, badge:'Enterprise' },
]

const customSectors = [
  { id:'gov',     icon:'🏛️', en:'Government',        ar:'حكومي' },
  { id:'edu',     icon:'🎓', en:'Education',          ar:'تعليمي' },
  { id:'retail',  icon:'🛍️', en:'Retail & Hospitality', ar:'تجزئة وضيافة' },
  { id:'event',   icon:'🎪', en:'Events & Exhibitions', ar:'فعاليات ومعارض' },
  { id:'fin',     icon:'💰', en:'Financial',          ar:'مالي' },
  { id:'other',   icon:'✨', en:'Other',              ar:'أخرى' },
]
const customTimeline = [
  { id:'urgent',   en:'Under 3 months',   ar:'أقل من 3 أشهر',   badge:'عاجل' },
  { id:'normal',   en:'3–6 months',       ar:'3–6 أشهر',         badge:'' },
  { id:'relaxed',  en:'6–12 months',      ar:'6–12 شهراً',       badge:'' },
  { id:'planning', en:'Still planning',   ar:'في مرحلة التخطيط', badge:'' },
]

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
type Svc = 're' | 'hc' | 'ai' | 'custom' | null
interface ReState    { elements: string[]; visitors: string; timeline: string }
interface HcState    { touchpoints: string[]; solutions: string[]; scale: string }
interface AiState    { challenges: string[]; maturity: string; scope: string }
interface CustState  { desc: string; sector: string; timeline: string }

const toggle = (arr: string[], id: string) => arr.includes(id) ? arr.filter(x=>x!==id) : [...arr, id]

export default function Plans() {
  const { lang, isAr } = useLang()
  const ar = isAr

  const [svc,  setSvc]  = useState<Svc>(null)
  const [re,   setRe]   = useState<ReState>({ elements:[], visitors:'', timeline:'' })
  const [hc,   setHc]   = useState<HcState>({ touchpoints:[], solutions:[], scale:'' })
  const [ai,   setAi]   = useState<AiState>({ challenges:[], maturity:'', scope:'' })
  const [cust, setCust] = useState<CustState>({ desc:'', sector:'', timeline:'' })

  /* scroll to expansion when service selected */
  const expansionRef = useRef<HTMLDivElement>(null)
  const prevSvc = useRef<Svc>(null)
  useEffect(() => {
    if (svc && svc !== prevSvc.current) {
      setTimeout(() => {
        expansionRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })
      }, 50)
    }
    prevSvc.current = svc
  }, [svc])

  /* ── sidebar data ── */
  const sidebarData = (): { headline:string; steps:number; total:number; rows: SidebarRow[] } => {
    if (!svc) return { headline:'', steps:0, total:4, rows: [
      { label: ar?'الخدمة':'Service' },
      { label: ar?'التفاصيل':'Details' },
      { label: ar?'النطاق':'Scope' },
      { label: ar?'الجدول الزمني':'Timeline' },
    ]}

    if (svc === 're') {
      const vis = reVisitors.find(v=>v.id===re.visitors)?.[lang]
      const tl  = reTimeline.find(t=>t.id===re.timeline)?.[lang]
      const elL = re.elements.map(id=>reElements.find(e=>e.id===id)?.[lang]??'').filter(Boolean)
      const done = [true, elL.length>0, !!re.visitors, !!re.timeline].filter(Boolean).length
      return {
        headline: ar ? 'صالة البيع الذكية' : 'Smart Sales Center',
        steps: done, total: 4,
        rows: [
          { label: ar?'الخدمة':'Service',     value: ar ? '🏢 صالة البيع الذكية' : '🏢 Smart Sales Center' },
          { label: ar?'العناصر':'Elements',   tags: elL },
          { label: ar?'الزوار':'Visitors',    value: vis },
          { label: ar?'الجدول الزمني':'Timeline', value: tl },
        ],
      }
    }
    if (svc === 'hc') {
      const tpL  = hc.touchpoints.map(id=>hcTouchpoints.find(t=>t.id===id)?.[lang]??'').filter(Boolean)
      const solL = hc.solutions.map(id=>hcSolutions.find(s=>s.id===id)?.[lang]??'').filter(Boolean)
      const sc   = hcScales.find(s=>s.id===hc.scale)?.[lang]
      const done = [true, tpL.length>0, solL.length>0, !!hc.scale].filter(Boolean).length
      return {
        headline: ar ? 'رفيق المريض الذكي' : 'AI Care Companion',
        steps: done, total: 4,
        rows: [
          { label: ar?'الخدمة':'Service',         value: ar ? '🏥 رفيق المريض الذكي' : '🏥 AI Care Companion' },
          { label: ar?'نقاط التواصل':'Touchpoints', tags: tpL },
          { label: ar?'الحلول':'Solutions',        tags: solL },
          { label: ar?'الحجم':'Scale',             value: sc ? `${sc.t} — ${sc.s}` : undefined },
        ],
      }
    }
    if (svc === 'ai') {
      const chL = ai.challenges.map(id=>aiChallenges.find(c=>c.id===id)?.[lang]??'').filter(Boolean)
      const mat = aiMaturity.find(m=>m.id===ai.maturity)?.[lang]
      const sc  = aiScopes.find(s=>s.id===ai.scope)?.[lang]
      const done = [true, chL.length>0, !!ai.maturity, !!ai.scope].filter(Boolean).length
      return {
        headline: ar ? 'الذكاء الاصطناعي داخل عملك' : 'AI Inside Your Business',
        steps: done, total: 4,
        rows: [
          { label: ar?'الخدمة':'Service',     value: ar ? '🤖 الذكاء الاصطناعي داخل عملك' : '🤖 AI Inside Your Business' },
          { label: ar?'التحديات':'Challenges', tags: chL },
          { label: ar?'النضج':'Maturity',     value: mat ? `${mat.t}` : undefined },
          { label: ar?'النطاق':'Scope',       value: sc ? `${sc.t}` : undefined },
        ],
      }
    }
    // custom
    const secL = customSectors.find(s=>s.id===cust.sector)?.[lang]
    const tl   = customTimeline.find(t=>t.id===cust.timeline)?.[lang]
    const done = [true, !!cust.desc, !!cust.sector, !!cust.timeline].filter(Boolean).length
    return {
      headline: ar ? 'مشروع خاص' : 'Custom Project',
      steps: done, total: 4,
      rows: [
        { label: ar?'الخدمة':'Service',     value: ar ? '✏️ مشروع خاص' : '✏️ Custom Project' },
        { label: ar?'الوصف':'Description',  value: cust.desc ? (cust.desc.length>30 ? cust.desc.slice(0,30)+'…' : cust.desc) : undefined },
        { label: ar?'القطاع':'Sector',      value: secL },
        { label: ar?'الجدول الزمني':'Timeline', value: tl },
      ],
    }
  }
  const sd = sidebarData()

  const services = [
    {
      key: 're' as Svc,
      icon: '🏢',
      en: { t:'Smart Sales Center', d:'Interactive real estate experiences that convert visitors into buyers', tag:'Explore' },
      ar: { t:'صالة البيع الذكية', d:'تجارب عقارية تفاعلية تحوّل الزوار إلى مشترين', tag:'استكشف' },
    },
    {
      key: 'hc' as Svc,
      icon: '🏥',
      en: { t:'AI Care Companion', d:'Smart healthcare environments that reduce anxiety and improve outcomes', tag:'Explore' },
      ar: { t:'رفيق المريض الذكي', d:'بيئات صحية ذكية تقلل القلق وتحسّن تجربة المريض', tag:'استكشف' },
    },
    {
      key: 'ai' as Svc,
      icon: '🤖',
      en: { t:'AI Inside Your Business', d:'Enterprise AI agents, kiosks, and intelligent systems for your operations', tag:'Explore' },
      ar: { t:'الذكاء الاصطناعي داخل عملك', d:'أنظمة ذكاء اصطناعي مؤسسية مدمجة في عمليات عملك', tag:'استكشف' },
    },
    {
      key: 'custom' as Svc,
      icon: '✏️',
      en: { t:'Custom Project', d:'Something unique? Tell us about your vision and we will design it from scratch', tag:'Describe it' },
      ar: { t:'مشروع خاص', d:'لديك فكرة مختلفة؟ صِف مشروعك وسنبنيه من الصفر', tag:'صِف مشروعك' },
    },
  ]

  return (
    <div style={{ background:'#f7f9fa', minHeight:'100vh' }}>

      {/* ── page header */}
      <div style={{ background:'white', borderBottom:'1px solid #f0f0f0' }}>
        <div className="container-xl" style={{ paddingTop:112, paddingBottom:28 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:'#111827', marginBottom:6 }}>
            {ar ? 'صمّم حزمتك المثالية' : 'Customize Your Perfect Package'}
          </h1>
          <p style={{ fontSize:13, color:'#9ca3af' }}>
            {ar
              ? 'اختر الخدمة التي تناسبك، أجب على بعض الأسئلة، واحصل على عرض مخصص'
              : 'Select your service, answer a few questions, and receive a tailored proposal'}
          </p>
        </div>
      </div>

      {/* ── two-column grid */}
      <div className="container-xl" style={{ paddingTop:36, paddingBottom:60 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:28, alignItems:'start' }}>

          {/* ══ LEFT column */}
          <div>

            {/* ── Step 1: 4 service cards */}
            <div style={{ marginBottom:4 }}>
              <div style={{ fontSize:13, color:'#9ca3af', marginBottom:14 }}>
                {ar ? 'الخطوة 1 من 4 — اختر الخدمة' : 'Step 1 of 4 — Select your service'}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12 }}>
                {services.map(s => (
                  <ServiceCard
                    key={s.key as string}
                    icon={s.icon}
                    title={ar ? s.ar.t : s.en.t}
                    desc={ar ? s.ar.d : s.en.d}
                    tag={ar ? s.ar.tag : s.en.tag}
                    on={svc === s.key}
                    onClick={() => setSvc(svc === s.key ? null : s.key)}
                    isAr={ar}
                  />
                ))}
              </div>
            </div>

            {/* ── Step 2-4: expansion area */}
            <div ref={expansionRef}>
              <Expand open={!!svc}>
                <div style={{
                  marginTop:20, borderRadius:16, background:'white',
                  border:'1px solid #e9ecef', padding:'28px 24px',
                  boxShadow:'0 2px 12px rgba(0,0,0,.05)',
                }}>
                  {/* connecting arrow */}
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--teal-pale)', color:'var(--teal-deep)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800 }}>✓</div>
                    <span style={{ fontSize:13, fontWeight:700, color:'var(--teal-deep)' }}>
                      {svc && services.find(s=>s.key===svc)?.[ar?'ar':'en'].t} — {ar ? 'أجب على الأسئلة التالية' : 'Answer the following'}
                    </span>
                  </div>

                  {/* ─── REAL ESTATE questions */}
                  {svc === 're' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
                      <div>
                        <Q n={2} text={ar ? 'ما عناصر التجربة التي تحتاجها؟' : 'Which experience elements do you need?'} />
                        <p style={{ fontSize:12, color:'#9ca3af', marginBottom:12, marginTop:-8 }}>{ar ? 'يمكن اختيار أكثر من عنصر' : 'Select all that apply'}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8 }}>
                          {reElements.map(el=>(
                            <Chip key={el.id} icon={el.icon} title={el[lang]}
                              on={re.elements.includes(el.id)}
                              onClick={()=>setRe(s=>({...s,elements:toggle(s.elements,el.id)}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={3} text={ar ? 'كم عدد الزوار المتوقع يومياً؟' : 'Expected daily visitor count?'} />
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {reVisitors.map(v=>(
                            <Stack key={v.id} title={v[lang]} badge={ar&&v.badge==='الأكثر شيوعاً'?'الأكثر شيوعاً':(!ar&&v.badge?v.badge:undefined)}
                              on={re.visitors===v.id} onClick={()=>setRe(s=>({...s,visitors:v.id}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={4} text={ar ? 'ما الجدول الزمني المستهدف؟' : 'Target launch timeline?'} />
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {reTimeline.map(t=>(
                            <Stack key={t.id} title={t[lang]} badge={ar&&t.badge==='عاجل'?'عاجل':(!ar&&t.badge?t.badge:undefined)}
                              on={re.timeline===t.id} onClick={()=>setRe(s=>({...s,timeline:t.id}))}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── HEALTHCARE questions */}
                  {svc === 'hc' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
                      <div>
                        <Q n={2} text={ar ? 'ما نقاط التواصل مع المريض؟' : 'Which patient touchpoints are you focusing on?'} />
                        <p style={{ fontSize:12, color:'#9ca3af', marginBottom:12, marginTop:-8 }}>{ar ? 'يمكن اختيار أكثر من نقطة' : 'Select all that apply'}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8 }}>
                          {hcTouchpoints.map(tp=>(
                            <Chip key={tp.id} icon={tp.icon} title={tp[lang]}
                              on={hc.touchpoints.includes(tp.id)}
                              onClick={()=>setHc(s=>({...s,touchpoints:toggle(s.touchpoints,tp.id)}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={3} text={ar ? 'ما الحلول التي تحتاجها؟' : 'Which solutions do you need?'} />
                        <p style={{ fontSize:12, color:'#9ca3af', marginBottom:12, marginTop:-8 }}>{ar ? 'يمكن اختيار أكثر من حل' : 'Select all that apply'}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8 }}>
                          {hcSolutions.map(sol=>(
                            <Chip key={sol.id} icon={sol.icon} title={sol[lang]}
                              on={hc.solutions.includes(sol.id)}
                              onClick={()=>setHc(s=>({...s,solutions:toggle(s.solutions,sol.id)}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={4} text={ar ? 'ما حجم المنشأة؟' : 'Facility scale?'} />
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {hcScales.map(sc=>(
                            <Stack key={sc.id} title={sc[lang].t} sub={sc[lang].s}
                              badge={ar&&sc.badge==='الأكثر شيوعاً'?'الأكثر شيوعاً':(!ar&&sc.badge?sc.badge:undefined)}
                              on={hc.scale===sc.id} onClick={()=>setHc(s=>({...s,scale:sc.id}))}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── AI questions */}
                  {svc === 'ai' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
                      <div>
                        <Q n={2} text={ar ? 'ما أبرز تحدياتك التجارية؟' : 'What are your main business challenges?'} />
                        <p style={{ fontSize:12, color:'#9ca3af', marginBottom:12, marginTop:-8 }}>{ar ? 'يمكن اختيار أكثر من تحدي' : 'Select all that apply'}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8 }}>
                          {aiChallenges.map(ch=>(
                            <Chip key={ch.id} icon={ch.icon} title={ch[lang]}
                              on={ai.challenges.includes(ch.id)}
                              onClick={()=>setAi(s=>({...s,challenges:toggle(s.challenges,ch.id)}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={3} text={ar ? 'ما مستوى نضج الذكاء الاصطناعي في مؤسستك؟' : 'Your current AI maturity level?'} />
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {aiMaturity.map(m=>(
                            <Stack key={m.id} title={m[lang].t} sub={m[lang].s}
                              on={ai.maturity===m.id} onClick={()=>setAi(s=>({...s,maturity:m.id}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={4} text={ar ? 'ما النطاق المستهدف للتطبيق؟' : 'Intended deployment scope?'} />
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {aiScopes.map(sc=>(
                            <Stack key={sc.id} title={sc[lang].t} sub={sc[lang].s}
                              badge={ar&&sc.badge==='الأشهر'?'الأشهر':(!ar&&sc.badge==='الأشهر'?'Popular':sc.badge&&sc.badge!=='الأشهر'?sc.badge:undefined)}
                              on={ai.scope===sc.id} onClick={()=>setAi(s=>({...s,scope:sc.id}))}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── CUSTOM questions */}
                  {svc === 'custom' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
                      <div>
                        <Q n={2} text={ar ? 'صِف مشروعك بإيجاز' : 'Describe your project briefly'} />
                        <textarea
                          value={cust.desc}
                          onChange={e=>setCust(s=>({...s,desc:e.target.value}))}
                          placeholder={ar ? 'مثال: نريد نظام توجيه ذكي لمطار دولي يدعم اللغة العربية...' : 'e.g. We need a smart wayfinding system for an international airport...'}
                          style={{
                            width:'100%', minHeight:100, padding:'12px 14px', borderRadius:12, fontSize:13,
                            border:'1.5px solid #e9ecef', outline:'none', resize:'vertical', lineHeight:1.6,
                            fontFamily:'inherit', color:'#374151', background:'white',
                            transition:'border .15s',
                          }}
                          onFocus={e=>e.target.style.borderColor='var(--teal-deep)'}
                          onBlur={e=>e.target.style.borderColor='#e9ecef'}
                        />
                      </div>
                      <div>
                        <Q n={3} text={ar ? 'ما قطاع مشروعك؟' : 'What sector is your project in?'} />
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
                          {customSectors.map(s=>(
                            <Chip key={s.id} icon={s.icon} title={s[lang]}
                              on={cust.sector===s.id}
                              onClick={()=>setCust(st=>({...st,sector:st.sector===s.id?'':s.id}))}/>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Q n={4} text={ar ? 'ما الجدول الزمني المستهدف؟' : 'Target timeline?'} />
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {customTimeline.map(t=>(
                            <Stack key={t.id} title={t[lang]} badge={ar&&t.badge==='عاجل'?'عاجل':(!ar&&t.badge?t.badge:undefined)}
                              on={cust.timeline===t.id} onClick={()=>setCust(s=>({...s,timeline:t.id}))}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </Expand>
            </div>

          </div>{/* end left column */}

          {/* ══ RIGHT: sticky sidebar */}
          <div style={{ position:'sticky', top:148, alignSelf:'start' }}>
            <Sidebar
              headline={sd.headline}
              stepsComplete={sd.steps}
              totalSteps={sd.total}
              rows={sd.rows}
              isAr={ar}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
