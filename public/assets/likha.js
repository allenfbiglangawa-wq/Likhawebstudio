/* Likha Web Studio homepage behaviour. Static site: no backend, nothing is stored or sent except via the visitor's own Messenger. */
(()=>{
const MSG='https://m.me/61595731580054';
const $=id=>document.getElementById(id);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const peso=n=>'₱'+n.toLocaleString('en-PH');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=(n,c='ic')=>`<svg class="${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* ---------- Data ---------- */
const PROJECTS={
  kape:{name:'Kape Pinagpala',kind:'live',url:'https://kapepinagpala.pages.dev/',host:'kapepinagpala.pages.dev',type:'Specialty coffee house',filter:['food'],cat:'restaurants',
    desc:'Specialty coffee house with SM mall pop-up stalls. Menu, pre-ordering for pick-up, and event coffee cart booking.',
    feats:['Menu with pre-ordering for pick-up','Event coffee cart booking','Mobile-friendly design'],web:['pages','order'],mods:['booking']},
  sleep:{name:'SleepScienzzz',kind:'live',url:'https://sleepscienzzz-pi.vercel.app/',host:'sleepscienzzz-pi.vercel.app',type:'Sleep care clinic platform',filter:['health'],cat:'clinics',embed:false,tone:'#123A5C',
    desc:'Sleep care clinic platform. Sleep study booking, CPAP shop, machine registration, servicing reminders, and staff tools for stock and scheduling.',
    feats:['Sleep study booking','CPAP online shop and patient accounts','Staff tools for stock and scheduling'],web:['pages','custom'],mods:['booking','shop','inventory']},
  pabango:{name:'Pabango de Manila',kind:'live',url:'https://pabangodemanila.pabangodemanilaph.workers.dev/',host:'pabangodemanila…workers.dev',type:'Perfume shop',filter:['shop'],cat:'online',embed:false,tone:'#4A2638',
    desc:'Perfume shop website with customer accounts.',
    feats:['Online product catalog','Customer accounts','Mobile-friendly shopping'],web:['pages'],mods:['shop']},
  brew:{name:'Brew & Co.',kind:'demo',url:'demos/brew-and-co/',slug:'brew-and-co',host:'brewandco.com',type:'Coffee shop',filter:['food'],cat:'restaurants',
    desc:'Specialty coffee shop with a cinematic homepage, an interactive menu, online ordering for pickup or dine-in, and table reservations.',
    feats:['Filterable menu with drink customization','Online ordering for pickup or dine-in, with status tracking','Table reservations that block booked slots'],web:['pages','order'],mods:['booking']},
  kusina:{name:'Kusina ni Lola',kind:'demo',url:'demos/kusina-ni-lola/',slug:'kusina-ni-lola',host:'kusinanilola.com',type:'Filipino home cooking and delivery',filter:['food'],cat:'restaurants',
    desc:'Home-cooked Filipino ulam, party bilao and kakanin, with delivery areas, order cut-offs and GCash or COD checkout.',
    feats:["Today's menu plus party trays and bilao",'Delivery areas with fees and order cut-offs','GCash QR or COD checkout with an order tracker'],web:['pages','order'],mods:[]},
  lakas:{name:'Lakas Fitness',kind:'demo',url:'demos/lakas-fitness/',slug:'lakas-fitness',host:'lakasfitness.com',type:'Commercial gym',filter:['fitness'],cat:'gyms',
    desc:'Commercial gym with membership plans, class booking, trainer profiles, online registration, a member portal and an admin dashboard.',
    feats:['Membership plans and online registration','Class booking and trainer profiles','Sample member portal and admin dashboard'],web:['pages'],mods:['booking','dashboard']},
  ganda:{name:'Ganda Studio',kind:'demo',url:'demos/ganda-studio/',slug:'ganda-studio',host:'gandastudio.com',type:'Beauty salon',filter:['health'],cat:'salons',
    desc:'Beauty salon for hair, nails, facials and makeup, with a service menu, photo gallery, stylist profiles and online booking.',
    feats:['Service menu and photo gallery','Booking by service, stylist, date and time','Booking history with cancel'],web:['pages'],mods:['booking']}
};
const WORK_FILTERS=[['all','All'],['live','Client projects'],['demo','Sample sites'],['food','Food & drinks'],['shop','Shops'],['health','Health & beauty'],['fitness','Fitness']];

const CATS=[
  {id:'restaurants',name:'Restaurants & Cafes',ic:'cup',blurb:'Show your menu and let customers order ahead for pick-up or delivery.',ex:['kape','brew','kusina'],feats:['Menu with photos and prices','Online ordering with GCash QR','Pick-up and delivery options','Event or table reservations','Google Maps and opening hours'],pkg:'business',web:['pages','order'],mods:[]},
  {id:'retail',name:'Retail Stores',ic:'store',blurb:'Keep stock and sales organized while customers browse your products online.',ex:['pabango'],feats:['Product catalog','Inventory with low-stock alerts','POS with daily sales reports','Barcode and QR labels','Store location and hours'],pkg:'premium',web:['pages'],mods:['inventory','pos','reports']},
  {id:'online',name:'Online Shops',ic:'bag',blurb:'A real shop with cart, checkout and customer accounts, not just a chat inbox.',ex:['pabango','brew'],feats:['Cart and checkout','Customer accounts and order history','Order status tracking','Discount codes','Payment instructions or verified gateway'],pkg:'premium',web:['pages'],mods:['shop','inventory']},
  {id:'salons',name:'Salons & Spas',ic:'spark',blurb:'Let clients pick a service, date and time without the back-and-forth.',ex:['ganda'],feats:['Service menu with prices','Appointment booking','Staff availability','Booking reminders','Photo gallery'],pkg:'business',web:['pages'],mods:['booking']},
  {id:'clinics',name:'Clinics & Healthcare',ic:'heart',blurb:'Appointments, patient accounts and staff tools in one secure platform.',ex:['sleep','ganda'],feats:['Appointment booking','Patient accounts','Services and doctor profiles','Staff scheduling','Secure, role-based staff access'],pkg:'premium',web:['pages','custom'],mods:['booking','team']},
  {id:'gyms',name:'Gyms & Fitness Centers',ic:'dumbbell',blurb:'Show rates and schedules, and turn visitors into free-trial bookings.',ex:['lakas'],feats:['Membership rates','Class schedule','Free trial booking','Coach profiles','Messenger inquiry button'],pkg:'business',web:['pages'],mods:['booking']},
  {id:'realestate',name:'Real Estate',ic:'home',blurb:'Showcase properties and collect serious buyer inquiries.',ex:[],feats:['Property listings with photos','Inquiry and viewing request form','Google Maps per property','Agent profiles','Lead tracking (custom)'],pkg:'business',web:['pages'],mods:['crm']},
  {id:'services',name:'Professional Services',ic:'brief',blurb:'Look established and make it easy to book a consultation.',ex:[],feats:['Services and pricing pages','About and credentials','Consultation booking','Contact form and Messenger','Client management (custom)'],pkg:'business',web:['pages'],mods:['booking']},
  {id:'events',name:'Events & Reservations',ic:'party',blurb:'Take reservations and event bookings with clear dates and availability.',ex:['kape','ganda'],feats:['Event and package pages','Reservation calendar','Booking approval','Inquiry form','Gallery of past events'],pkg:'business',web:['pages'],mods:['booking']},
  {id:'other',name:'Other Businesses',ic:'dots',blurb:'Tell us how your business works and we will suggest the right setup.',ex:[],feats:['Professional homepage','Contact form and Messenger','Google Maps','Mobile-friendly design','Room to add systems later'],pkg:'starter',web:[],mods:[]}
];

const PKG={starter:{n:'Starter',p:3500,days:'5–7 days'},business:{n:'Business',p:5499,days:'7–10 days'},premium:{n:'Premium',p:7999,days:'14–21 days'}};
const WEB_FEATS=[
  {id:'pages',n:'More than one page',d:'About, menu, gallery, contact'},
  {id:'order',n:'Online ordering',d:'Customers order and pay with your GCash QR'},
  {id:'custom',n:'Fully custom design',d:'Made from scratch for your brand'}
];

/* Business system modules. tier: 'basic' = included in a website package, 'custom' = quoted separately. */
const MODS=[
  {id:'web',g:'sell',ic:'web',n:'Business Website',tier:'Every package',lvl:'pkg',desc:'A fast, mobile-friendly site with your products, services, location and contact.',
    feats:['Professional homepage','Business information','About Us','Products and services','Contact form','Messenger integration','Google Maps','Mobile responsive design','Basic SEO setup','HTTPS','Domain connection','Social media links'],
    benefit:'Build a professional online presence that helps customers discover and contact your business.',for:'Every business',demo:{label:'View sample',href:'demos/kusina-ni-lola/'}},
  {id:'shop',g:'sell',ic:'cart',n:'E-Commerce & Online Ordering',tier:'Premium',lvl:'premium',desc:'Product catalog, cart and checkout so customers can order without a long chat.',
    feats:['Online product catalog','Product categories','Product photos','Product descriptions','Product variations','Product pricing','Shopping cart','Checkout','Customer accounts','Guest checkout','Order history','Order status tracking','Pickup and delivery options','Discount codes','Stock availability','Payment instructions','Optional verified payment gateway integration','Order confirmation notifications'],
    benefit:'Let customers browse products and place orders online without relying entirely on manual chat conversations.',for:'Cafés, restaurants, online sellers, retail',demo:{label:'Try ordering demo',href:'demos/brew-and-co/'}},
  {id:'booking',g:'sell',ic:'cal',n:'Appointment Booking & Events',tier:'Business',lvl:'business',desc:'Customers pick a service, date and time. You approve and manage it all in one place.',
    feats:['Booking calendar','Available dates and times','Service selection','Appointment request form','Booking approval','Appointment cancellation','Staff availability','Event scheduling','Reservation management','Optional reminders','Booking history','Admin booking dashboard'],
    benefit:'Reduce scheduling conflicts and make appointments easier for customers and staff.',for:'Salons, clinics, gyms, events, services',demo:{label:'Try booking demo',tab:'book'}},
  {id:'pos',g:'ops',ic:'pos',n:'Point of Sale (POS)',tier:'Basic in Premium',lvl:'premium',desc:'A simple cashier screen that records every sale and keeps your totals organized.',
    feats:['Cashier interface','Product search','Barcode scanning','Shopping cart','Cash payment recording','Other supported payment methods','Discounts','Receipt generation','Transaction history','Returns and refunds','Cashier activity tracking','Daily sales summary','POS and inventory synchronization'],
    benefit:'Process transactions efficiently and maintain organized sales records.',for:'Retail stores, cafés, restaurants',demo:{label:'Try POS demo',tab:'pos'}},
  {id:'inventory',g:'ops',ic:'box',n:'Inventory Management',tier:'Basic in Premium',lvl:'premium',desc:'Know what you have, what is running low, and where every item went.',
    feats:['Product database','SKU generation','QR code generator','Barcode generator','Barcode scanner support','Camera-based scanning where compatible','Stock-in and stock-out','Stock adjustment','Low-stock alerts','Supplier information','Purchase records','Product movement history','Inventory reports','Optional multi-location inventory'],
    benefit:'Track available stock, reduce manual encoding, and improve inventory visibility.',for:'Retail, online shops, pharmacies, hardware',demo:{label:'Try inventory demo',tab:'inv'}},
  {id:'reports',g:'ops',ic:'chart',n:'Sales Reports & Analytics',tier:'Basic in Premium',lvl:'premium',desc:'Clear daily, weekly and monthly numbers so you can see how the business is doing.',
    feats:['Daily sales report','Weekly sales report','Monthly sales report','Yearly sales report','Revenue tracking','Expense tracking','Estimated profit reporting','Best-selling products','Sales trends','Customer purchase analytics','Order statistics','Date filters','Dashboard charts','CSV export','PDF report export','Optional branch performance reports'],
    benefit:'Understand business performance using organized, easy-to-read reports.',for:'Any business with daily sales'},
  {id:'dashboard',g:'ops',ic:'dash',n:'Admin Dashboard',tier:'Basic in Premium',lvl:'premium',desc:'One home screen for sales, stock, orders, bookings and alerts.',
    feats:['Centralized overview','Sales summary','Inventory summary','Customer summary','Employee overview','Pending orders','Upcoming bookings','Pending tasks','Recent activity','Business alerts','Reports and analytics','Custom dashboard widgets'],
    benefit:'Manage important business operations from one central platform.',for:'Owners and managers'},
  {id:'team',g:'team',ic:'lock',n:'Team Access & Role-Based Permissions',tier:'Custom quote',lvl:'custom',desc:'Individual staff logins with roles, so everyone sees only what they need.',
    feats:['Secure employee login','Individual user accounts','Admin role','Manager role','Supervisor role','Staff role','Cashier role','Custom roles','Role-based access control','View, create, edit, and delete permissions','Team invitations','Account activation/deactivation','Department assignments','Activity logs','Audit trails','Optional multi-branch permissions'],
    benefit:'Give employees the access they need while protecting sensitive business information.',for:'Teams of 3 or more, multi-branch businesses'},
  {id:'tasks',g:'team',ic:'task',n:'Task Assignment & Team Productivity',tier:'Custom quote',lvl:'custom',desc:'Assign work, set deadlines and see what is done, without chasing people in group chats.',
    feats:['Task creation and assignment','Due dates and priorities','Task status board','Checklists and subtasks','Comments and file attachments','Recurring tasks','Team workload view','Overdue task alerts','Task history','Productivity summary reports'],
    benefit:'Keep everyone clear on who is doing what, and by when.',for:'Service teams, agencies, offices, multi-branch stores'},
  {id:'attendance',g:'team',ic:'clock',n:'Employee Attendance & Timesheet',tier:'Custom quote',lvl:'custom',desc:'Time-in and time-out records your staff and managers can both trust.',
    feats:['Time-in and time-out','Shift schedules','Late and undertime tracking','Overtime tracking','Leave requests and approvals','Timesheet summaries','Manager approval','Optional location or device restrictions','Attendance reports','CSV export for payroll'],
    benefit:'Replace paper logbooks with accurate, organized attendance records.',for:'Restaurants, retail, clinics, any team with shifts'},
  {id:'payroll',g:'team',ic:'pay',n:'Payroll Management',tier:'Custom quote',lvl:'custom',desc:'Compute pay from attendance with your rates, deductions and payslips in one place.',
    feats:['Employee pay profiles','Daily, semi-monthly or monthly pay periods','Attendance-based computation','Overtime and holiday pay settings','Allowances and deductions','Government contribution fields (set up with your accountant)','Cash advance tracking','Payslip generation','Payroll history','Payroll summary reports'],
    benefit:'Reduce manual payroll computation and keep clear records for every pay period.',for:'Businesses with regular employees'},
  {id:'crm',g:'cust',ic:'users',n:'Customer Management (CRM)',tier:'Custom quote',lvl:'custom',desc:'Every customer, inquiry and follow-up in one organized list.',
    feats:['Customer database','Customer profiles','Contact information','Customer purchase history','Customer inquiries','Lead tracking','Sales pipeline','Follow-up reminders','Notes and tags','Customer segments'],
    benefit:'Remember every customer and never lose track of a lead.',for:'Real estate, services, retail, B2B sellers'},
  {id:'workflow',g:'cust',ic:'flow',n:'Custom Workflow Automation',tier:'Custom quote',lvl:'custom',desc:'Turn your repetitive steps into a guided process that runs the same way every time.',
    feats:['Custom forms and approval steps','Automatic status updates','Email or in-app notifications','Document and request tracking','Rules based on your process','Integrations where supported','Activity history','Custom reports'],
    benefit:'Spend less time on repetitive admin and more time on the business.',for:'Any business with repeated manual processes'}
];
const MOD_FILTERS=[['all','All systems'],['sell','Website & selling'],['ops','Sales & stock'],['team','Team & HR'],['cust','Customers & automation']];
const MOD=Object.fromEntries(MODS.map(m=>[m.id,m]));
const SYS_MODS=MODS.filter(m=>m.id!=='web');

const WHEN=['As soon as possible','Within a month','In 1–3 months','Just exploring'];
const BUDGET=['Under ₱5,000','₱5,000–₱10,000','₱10,000–₱25,000','₱25,000+','Not sure yet'];

/* ---------- Quote state ---------- */
const S={need:'website',cat:'restaurants',web:new Set(['pages','order']),mods:new Set(),logo:false,maint:false,when:WHEN[1],budget:BUDGET[4],step:1};
const TOTAL_STEPS=5;

/* ---------- Header + mobile menu ---------- */
const head=document.querySelector('.site-head'),nav=$('mainNav'),menuBtn=$('menuBtn');
const onScroll=()=>head.classList.toggle('scrolled',window.scrollY>8);
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
function setMenu(open){nav.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',open);menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');menuBtn.innerHTML=icon(open?'x':'menu');}
menuBtn.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});

/* ---------- Category selector ---------- */
const catGrid=$('catGrid'),catPanel=$('catPanel');
catGrid.innerHTML=CATS.map((c,i)=>`<button type="button" class="cat" role="tab" id="cat-${c.id}" data-cat="${c.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${icon(c.ic)}${esc(c.name)}</button>`).join('');
function exCard(k){const p=PROJECTS[k];const img=`<span class="ph" aria-hidden="true">${esc(p.name.replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join(''))}</span>`;
  return `<a class="ex" href="${p.url}" ${p.kind==='live'?'target="_blank" rel="noopener"':''}>${img}<span><b>${esc(p.name)}</b><small><span class="badge ${p.kind}">${p.kind==='live'?'Client project':'Sample site'}</span></small></span></a>`;}
function showCat(id){
  const c=CATS.find(x=>x.id===id);
  $$('.cat',catGrid).forEach(b=>{const on=b.dataset.cat===id;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});
  catPanel.setAttribute('aria-labelledby','cat-'+id);
  const pk=PKG[c.pkg];
  catPanel.innerHTML=`<div><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p>
      <div class="ex-list">${c.ex.length?c.ex.map(exCard).join(''):`<p class="fine" style="margin:0">No sample for this category yet. We'll show you a design draft during your free consultation.</p>`}</div></div>
    <div><h4>Recommended features</h4><ul class="ticks">${c.feats.map(f=>`<li>${icon('check')}${esc(f)}</li>`).join('')}</ul></div>
    <div class="pkg-box"><h4 style="margin:0">Suitable package</h4><b style="font-size:20px">${pk.n}</b><div class="amt">${peso(pk.p)}</div><p>Ready in ${pk.days}. Add custom modules any time.</p>
      <a class="btn" href="#quote" data-cat-quote="${c.id}">Get a quote for this</a></div>`;
  catPanel.style.animation='none';void catPanel.offsetWidth;catPanel.style.animation='';
}
catGrid.addEventListener('click',e=>{const b=e.target.closest('.cat');if(b)showCat(b.dataset.cat);});
catGrid.addEventListener('keydown',e=>{
  const btns=$$('.cat',catGrid),i=btns.indexOf(document.activeElement);if(i<0)return;
  const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(!d)return;
  e.preventDefault();const n=btns[(i+d+btns.length)%btns.length];n.focus();showCat(n.dataset.cat);
});
showCat(CATS[0].id);

/* ---------- Portfolio slideshow ---------- */
const track=$('showTrack'),dots=$('showDots'),count=$('showCount');
let workFilter='all',visible=[];
function liveFrame(url,name,w,h,label){return `<div class="cover"><b>${esc(name)}</b><small>Loading preview…</small></div><iframe data-src="${url}" title="${label}${esc(name)}" width="${w}" height="${h}" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer"></iframe>`;}
function slideHTML(k){
  const p=PROJECTS[k],live=p.kind==='live';
  // Sites that refuse to be embedded get a branded card instead of a live preview.
  const card=(sm)=>`<a class="cover brand" href="${p.url}" target="_blank" rel="noopener" style="--tone:${p.tone}" tabindex="-1"><small>${esc(p.type)}</small><b>${esc(p.name)}</b>${sm?'':`<span class="visit">Visit the live site ↗</span>`}</a>`;
  const desk=p.embed===false?card(false):liveFrame(p.url,p.name,1280,800,'Live preview of ');
  const mob=p.embed===false?card(true):liveFrame(p.url,p.name,390,800,'Mobile preview of ');
  return `<article class="slide" data-k="${k}" role="group" aria-roledescription="slide" aria-label="${esc(p.name)}">
    <div class="stage"><div class="browser"><div class="bar"><i></i><i></i><i></i><span>${esc(p.host)}</span></div><div class="vp" data-w="1280">${desk}</div></div>
      <div class="mob"><div class="vp" data-w="390">${mob}</div></div></div>
    <div class="slide-info">
      <div class="meta-row"><span class="badge ${p.kind}">${live?'Client project · Live':'Sample site · Concept demo'}</span><span class="kind">${esc(p.type)}</span></div>
      <h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>
      <ul class="ticks">${p.feats.map(f=>`<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
      <div class="ctas"><a class="btn" href="${p.url}" ${live?'target="_blank" rel="noopener"':''}>${live?'View live site':'Open live demo'} ${icon('arrow')}</a>
        <a class="btn ghost" href="#quote" data-like="${k}">I want a website like this</a></div>
    </div></article>`;
}
function renderWork(){
  visible=Object.keys(PROJECTS).filter(k=>{const p=PROJECTS[k];return workFilter==='all'||p.kind===workFilter||p.filter.includes(workFilter);});
  track.innerHTML=visible.map(slideHTML).join('');
  dots.innerHTML=visible.map((k,i)=>`<button type="button" aria-label="Go to ${esc(PROJECTS[k].name)}" data-i="${i}"></button>`).join('');
  track.scrollLeft=0;fitFrames();setActive(0);
}
$('workFilters').innerHTML=WORK_FILTERS.map(([v,l],i)=>`<button type="button" data-f="${v}" aria-pressed="${i===0}">${l}</button>`).join('');
$('workFilters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;workFilter=b.dataset.f;$$('#workFilters button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderWork();});
function fitFrames(){$$('.vp[data-w]').forEach(vp=>{const f=vp.querySelector('iframe');if(!f)return;const s=vp.clientWidth/(+vp.dataset.w);f.style.transform=`scale(${s})`;f.style.height=(vp.clientHeight/s)+'px';});}
let active=0;
function setActive(i){
  active=Math.max(0,Math.min(i,visible.length-1));
  $$('button',dots).forEach((d,j)=>d.setAttribute('aria-current',j===active));
  count.textContent=visible.length?`${active+1} / ${visible.length}`:'';
  $('prevSlide').disabled=active===0;$('nextSlide').disabled=active>=visible.length-1;
  const s=track.children[active];
  if(s)$$('iframe[data-src]',s).forEach(loadFrame);
}
function go(i){const s=track.children[i];if(s)track.scrollTo({left:s.offsetLeft-track.offsetLeft,behavior:'smooth'});}
let st;track.addEventListener('scroll',()=>{clearTimeout(st);st=setTimeout(()=>setActive(Math.round(track.scrollLeft/track.clientWidth)),60);},{passive:true});
$('prevSlide').addEventListener('click',()=>go(active-1));
$('nextSlide').addEventListener('click',()=>go(active+1));
dots.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i);});
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(active+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(active-1);}});
window.addEventListener('resize',()=>{fitFrames();},{passive:true});
/* Hero mockups show the live sample sites. Load them after the page so they never slow the first paint. */
function loadFrame(f){f.addEventListener('load',()=>f.classList.add('loaded'),{once:true});f.src=f.dataset.src;f.removeAttribute('data-src');}
window.addEventListener('load',()=>setTimeout(()=>{fitFrames();$$('.devices iframe[data-src]').forEach(f=>{if(f.closest('.vp').offsetParent!==null)loadFrame(f);});},600));
renderWork();

/* ---------- Business systems catalog ---------- */
const solGrid=$('solGrid');let solFilter='all';
function solHTML(m){
  const added=m.id==='web'?S.need!=='system':S.mods.has(m.id);
  const demo=m.demo?(m.demo.tab?`<a class="btn ghost" href="#showroom" data-tab="${m.demo.tab}">${icon('eye')}${m.demo.label}</a>`:`<a class="btn ghost" href="${m.demo.href}">${icon('eye')}${m.demo.label}</a>`):'';
  return `<article class="sol${added?' added':''}" data-m="${m.id}">
    <div class="sol-top"><span class="sol-ic">${icon(m.ic)}</span><span class="tier${m.lvl==='custom'?' custom':''}">${esc(m.tier)}</span></div>
    <h3>${esc(m.n)}</h3><p>${esc(m.desc)}</p>
    <details><summary>See all ${m.feats.length} features</summary><ul>${m.feats.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></details>
    <p class="benefit">“${esc(m.benefit)}”</p>
    <p class="for-biz"><b>Best for:</b> ${esc(m.for)}</p>
    <div class="sol-act"><button type="button" class="btn add-btn" data-add="${m.id}" aria-pressed="${added}">${added?icon('check')+'Added':icon('plus')+'Add to my quotation'}</button>${demo}</div>
  </article>`;
}
const SOL_CTA=`<article class="sol sol-cta"><h3>Need something that's not listed?</h3><p>Tell us how your business runs today. We'll suggest a system that fits, with a written scope and price before any work starts.</p><div class="sol-act"><a class="btn gold" href="#quote" data-preset="system">Request a custom quotation</a><a class="btn ghost-dark" href="https://m.me/61595731580054" target="_blank" rel="noopener">${icon('chat')}Ask on Messenger</a></div></article>`;
function renderSol(){solGrid.innerHTML=MODS.filter(m=>solFilter==='all'||m.g===solFilter).map(solHTML).join('')+SOL_CTA;solGrid.scrollLeft=0;revealIn(solGrid);syncSol();}
$('solFilters').innerHTML=MOD_FILTERS.map(([v,l],i)=>`<button type="button" data-f="${v}" aria-pressed="${i===0}">${l}</button>`).join('');
$('solFilters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;solFilter=b.dataset.f;$$('#solFilters button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderSol();});
solGrid.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(!a)return;const id=a.dataset.add;
  if(id==='web'){S.need=S.need==='system'?'both':S.need==='both'?'system':'website';}
  else{S.mods.has(id)?S.mods.delete(id):S.mods.add(id);if(MOD[id].lvl==='custom'&&S.mods.has(id)&&S.need==='website')S.need='both';}
  syncAll();
});

/* ---------- Showroom demos (sample data only) ---------- */
const tabs=$$('.tabs [role=tab]');const DEMO_NAMES={pos:'Café POS',inv:'Inventory',book:'Salon booking'};
function openTab(t){tabs.forEach(b=>{const on=b.id==='tab-'+t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;$(b.getAttribute('aria-controls')).hidden=!on;});$('demoName').textContent=DEMO_NAMES[t];}
tabs.forEach(b=>b.addEventListener('click',()=>openTab(b.id.slice(4))));
$$('.tabs')[0].addEventListener('keydown',e=>{const i=tabs.indexOf(document.activeElement);const d={ArrowRight:1,ArrowLeft:-1}[e.key];if(i<0||!d)return;const n=tabs[(i+d+tabs.length)%tabs.length];n.focus();n.click();});

const POS_ITEMS=[['Iced Latte',120],['Americano',100],['Spanish Latte',140],['Matcha Latte',150],['Croissant',95],['Ensaymada',65],['Chicken Pesto Sandwich',185],['Ube Cheesecake',160],['Bottled Water',35]];
const sale=new Map();
function renderPosItems(){const q=$('posSearch').value.trim().toLowerCase();$('posItems').innerHTML=POS_ITEMS.filter(([n])=>n.toLowerCase().includes(q)).map(([n,p])=>`<button type="button" data-item="${esc(n)}">${esc(n)}<small>${peso(p)}</small></button>`).join('')||'<p class="demo-note">No match.</p>';}
function posTotal(){let t=0;sale.forEach((q,n)=>t+=q*POS_ITEMS.find(x=>x[0]===n)[1]);return $('posDisc').checked?Math.round(t*.8):t;}
function renderSale(){
  $('posLines').innerHTML=sale.size?[...sale].map(([n,q])=>`<div class="ln"><span>${esc(n)} × ${q}</span><span><b>${peso(q*POS_ITEMS.find(x=>x[0]===n)[1])}</b> <button type="button" data-minus="${esc(n)}" aria-label="Remove one ${esc(n)}">−</button></span></div>`).join(''):'<span class="empty">Tap a product to add it.</span>';
  $('posTotal').textContent=peso(posTotal());$('posCharge').disabled=!sale.size;
}
$('posSearch').addEventListener('input',renderPosItems);
$('posItems').addEventListener('click',e=>{const b=e.target.closest('[data-item]');if(!b)return;sale.set(b.dataset.item,(sale.get(b.dataset.item)||0)+1);$('posReceipt').hidden=true;renderSale();});
$('posLines').addEventListener('click',e=>{const b=e.target.closest('[data-minus]');if(!b)return;const n=b.dataset.minus,q=sale.get(n)-1;q?sale.set(n,q):sale.delete(n);renderSale();});
$('posDisc').addEventListener('change',renderSale);
let rcpt=1041;
$('posCharge').addEventListener('click',()=>{
  const lines=[...sale].map(([n,q])=>`${(n+' x'+q).padEnd(26).slice(0,26)}${peso(q*POS_ITEMS.find(x=>x[0]===n)[1]).padStart(8)}`).join('\n');
  const r=$('posReceipt');r.hidden=false;
  r.textContent=`DEMO CAFÉ · SAMPLE RECEIPT\nTxn #${rcpt++} · ${new Date().toLocaleString('en-PH',{dateStyle:'medium',timeStyle:'short'})}\n${'-'.repeat(34)}\n${lines}\n${$('posDisc').checked?'Senior/PWD discount 20%\n':''}${'-'.repeat(34)}\nTOTAL${peso(posTotal()).padStart(29)}\n\nDemo only. Not an official receipt.`;
  sale.clear();renderSale();
});
renderPosItems();renderSale();

const INV=[['CAF-001','Arabica beans 1kg',14],['CAF-002','Fresh milk 1L',6],['CAF-003','Oat milk 1L',3],['PKG-010','16oz cups (50s)',22],['PKG-011','Dome lids (50s)',4],['BAK-020','Croissant (frozen, 12s)',9]];
function renderInv(){
  $('invRows').innerHTML=INV.map(([s,n,q],i)=>`<tr><td>${s}</td><td>${esc(n)}</td><td class="${q<=5?'low':''}">${q}${q<=5?' · low':''}</td><td><div class="adj"><button type="button" data-inv="${i}" data-d="-1" aria-label="Stock out ${esc(n)}">−</button><button type="button" data-inv="${i}" data-d="1" aria-label="Stock in ${esc(n)}">+</button></div></td></tr>`).join('');
  const low=INV.filter(x=>x[2]<=5);const a=$('invAlert');a.classList.toggle('ok',!low.length);
  a.textContent=low.length?`Low-stock alert: ${low.map(x=>x[1]).join(', ')}`:'All items are above the low-stock level.';
}
$('invRows').addEventListener('click',e=>{const b=e.target.closest('[data-inv]');if(!b)return;const r=INV[+b.dataset.inv];r[2]=Math.max(0,r[2]+(+b.dataset.d));renderInv();});
renderInv();

const SVCS=[['Haircut',350,'45 min'],['Hair color',1500,'2 hrs'],['Manicure',250,'40 min'],['Foot spa',400,'1 hr']];
const TIMES=['10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const days=[...Array(6)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i+1);return d;});
const B={svc:0,day:0,time:null,sent:false};
const taken=(d,t)=>((d*7+t*3)%5)===0;
function chipsHTML(name,items,sel,dis=()=>false){return items.map((l,i)=>`<label class="chip"><input type="radio" name="${name}" value="${i}" ${i===sel?'checked':''} ${dis(i)?'disabled':''}><span>${esc(l)}</span></label>`).join('');}
function renderBook(){
  $('bookSvc').innerHTML=chipsHTML('bsvc',SVCS.map(s=>s[0]),B.svc);
  $('bookDays').innerHTML=chipsHTML('bday',days.map(d=>d.toLocaleDateString('en-PH',{weekday:'short',month:'short',day:'numeric'})),B.day);
  $('bookTimes').innerHTML=chipsHTML('btime',TIMES,B.time,i=>taken(B.day,i));
  const s=SVCS[B.svc];
  $('bookSum').innerHTML=`<span class="q-label" style="margin:0">Booking summary</span><b>${esc(s[0])}</b><span>${s[2]} · ${peso(s[1])}</span><span>${days[B.day].toLocaleDateString('en-PH',{weekday:'long',month:'long',day:'numeric'})}</span><span>${B.time==null?'Pick a time':TIMES[B.time]}</span>
    <button type="button" class="btn" id="bookGo" ${B.time==null?'disabled':''}>Request booking</button>
    ${B.sent?'<p class="demo-note">Demo: in a real system this request appears on the admin booking dashboard for approval, and the time slot is reserved.</p>':'<p class="demo-note">Greyed-out times are already booked in this demo.</p>'}`;
}
$('demo-book').addEventListener('change',e=>{const n=e.target.name;if(n==='bsvc')B.svc=+e.target.value;if(n==='bday'){B.day=+e.target.value;B.time=null;}if(n==='btime')B.time=+e.target.value;B.sent=false;renderBook();});
$('demo-book').addEventListener('click',e=>{if(e.target.id==='bookGo'){B.sent=true;renderBook();}});
renderBook();

/* ---------- Quotation wizard ---------- */
$('wizCats').innerHTML=CATS.map(c=>`<label class="chip"><input type="radio" name="wcat" value="${c.id}"><span>${esc(c.name)}</span></label>`).join('');
$('webFeatList').innerHTML=WEB_FEATS.map(f=>`<label><input type="checkbox" data-web="${f.id}"><span><b>${esc(f.n)}</b><small>${esc(f.d)}</small></span></label>`).join('');
$('sysFeatList').innerHTML=SYS_MODS.map(m=>`<label><input type="checkbox" data-mod="${m.id}"><span><b>${esc(m.n)}${m.lvl==='custom'?'<span class="t">Custom</span>':''}</b><small>${esc(m.desc)}</small></span></label>`).join('');
$('wizWhen').innerHTML=WHEN.map(w=>`<label class="chip"><input type="radio" name="wwhen" value="${esc(w)}"><span>${esc(w)}</span></label>`).join('');
$('wizBudget').innerHTML=BUDGET.map(w=>`<label class="chip"><input type="radio" name="wbud" value="${esc(w)}"><span>${esc(w)}</span></label>`).join('');
$('itype').innerHTML=CATS.map(c=>`<option>${esc(c.name)}</option>`).join('');

function calc(){
  const hasWeb=S.need!=='system',mods=[...S.mods],web=[...S.web].filter(()=>hasWeb);
  const custom=mods.filter(m=>MOD[m].lvl==='custom');
  const prem=mods.filter(m=>MOD[m].lvl==='premium').concat(web.filter(f=>f==='custom'));
  const bus=mods.filter(m=>MOD[m].lvl==='business').concat(web.filter(f=>f==='pages'||f==='order'));
  const name=id=>(MOD[id]||WEB_FEATS.find(f=>f.id===id)).n.toLowerCase();
  let key=null,why,label,total;
  if(hasWeb){
    key=prem.length?'premium':bus.length?'business':'starter';
    why=key==='premium'?`You picked ${prem.map(name).join(', ')}, which come with Premium.`:key==='business'?`You picked ${bus.map(name).join(', ')}, which come with Business.`:'A one-page site gets you found online and shows customers how to reach you.';
    if(custom.length)why+=` ${custom.map(name).join(', ')} ${custom.length>1?'are':'is'} quoted separately after a free consultation.`;
    const base=PKG[key].p+(S.logo?800:0);
    label=PKG[key].n+' package'+(custom.length?' + custom modules':'');
    total=(custom.length?'From ':'')+peso(base);
  }else{
    label='Custom business system';total='Custom quote';
    why=!mods.length?'Pick the modules you need in step 3 and we will scope a system for you.'
      :custom.length?'Advanced modules are scoped to how your business works, then quoted after a free consultation.'
      :'Basic inventory, POS, reports and an admin dashboard are included in our ₱7,999 Premium package, which comes with a website. A standalone system is quoted after a free consultation.';
  }
  return {hasWeb,key,why,label,total,mods,web,custom};
}
const catName=()=>CATS.find(c=>c.id===S.cat).name;
function renderResult(){
  const q=calc();
  $('rPk').textContent=q.label;$('rTotal').textContent=q.total;$('rWhy').textContent=q.why;
  const rows=[['Business',catName()]];
  if(q.key){rows.push(['Package',`${PKG[q.key].n} · ${peso(PKG[q.key].p)}`]);rows.push(['Domain and hosting','Free for 1 year']);rows.push(['Ready in',PKG[q.key].days]);}
  if(q.mods.length)rows.push(['Systems',q.mods.map(m=>MOD[m].n.replace(/ \(.*\)/,'')).join(', ')]);
  if(S.logo)rows.push(['Logo design','₱800 (free for first 5 clients)']);
  if(S.maint)rows.push(['Maintenance','₱499 / month']);
  rows.push(['Timeline',S.when],['Budget',S.budget]);
  if(q.key&&!q.custom.length)rows.push(['To start','50% = '+peso(Math.round((PKG[q.key].p+(S.logo?800:0))/2))]);
  $('rRows').innerHTML=rows.map(([a,b])=>`<div><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join('');
}
function syncForm(){
  $$('input[name=need]').forEach(r=>r.checked=r.value===S.need);
  $$('input[name=wcat]').forEach(r=>r.checked=r.value===S.cat);
  $$('[data-web]').forEach(c=>c.checked=S.web.has(c.dataset.web));
  $$('[data-mod]').forEach(c=>c.checked=S.mods.has(c.dataset.mod));
  $$('input[name=wwhen]').forEach(r=>r.checked=r.value===S.when);
  $$('input[name=wbud]').forEach(r=>r.checked=r.value===S.budget);
  $('a-logo').checked=S.logo;$('a-maint').checked=S.maint;
  $('wizWebFeats').hidden=S.need==='system';$('wizSysFeats').hidden=false;
}
function showStep(n){
  S.step=Math.max(1,Math.min(TOTAL_STEPS,n));
  $$('.wiz-step').forEach(f=>f.hidden=+f.dataset.step!==S.step);
  $('wizBar').style.width=(S.step/TOTAL_STEPS*100)+'%';
  $('wizStepLabel').textContent=`Step ${S.step} of ${TOTAL_STEPS}`;
  $('wizBack').hidden=S.step===1;
  $('wizNext').innerHTML=S.step===TOTAL_STEPS?icon('chat')+'Send on Messenger':'Next '+icon('arrow');
}
function updateBasket(){
  const n=S.mods.size+(S.need!=='system'?1:0);
  const touched=S.mods.size>0;
  $('basket').hidden=!touched;$('basketN').textContent=n;
}
function syncSol(){$$('.sol[data-m]',solGrid).forEach(el=>{const id=el.dataset.m,on=id==='web'?S.need!=='system':S.mods.has(id);el.classList.toggle('added',on);const b=el.querySelector('[data-add]');b.setAttribute('aria-pressed',on);b.innerHTML=on?icon('check')+'Added':icon('plus')+'Add to my quotation';});}
function syncAll(){syncForm();renderResult();syncSol();updateBasket();}
function applyCat(id,{resetFeats=true}={}){
  S.cat=id;const c=CATS.find(x=>x.id===id);
  if(resetFeats){S.web=new Set(c.web);if(!S.mods.size)c.mods.forEach(m=>S.mods.add(m));if(S.mods.size&&S.need==='website'&&c.mods.some(m=>MOD[m].lvl==='custom'))S.need='both';}
}
$('wiz').addEventListener('change',e=>{
  const t=e.target;
  if(t.name==='need'){S.need=t.value;}
  else if(t.name==='wcat'){applyCat(t.value);}
  else if(t.dataset.web){t.checked?S.web.add(t.dataset.web):S.web.delete(t.dataset.web);}
  else if(t.dataset.mod){t.checked?S.mods.add(t.dataset.mod):S.mods.delete(t.dataset.mod);}
  else if(t.name==='wwhen')S.when=t.value;
  else if(t.name==='wbud')S.budget=t.value;
  else if(t.id==='a-logo')S.logo=t.checked;
  else if(t.id==='a-maint')S.maint=t.checked;
  syncAll();
});
$('wiz').addEventListener('submit',e=>e.preventDefault());
$('wizBack').addEventListener('click',()=>showStep(S.step-1));
$('wizNext').addEventListener('click',()=>{if(S.step===TOTAL_STEPS){sendQuote();return;}showStep(S.step+1);});

function quoteText(){
  const q=calc(),name=$('qName').value.trim(),biz=$('qBiz').value.trim(),notes=$('qNotes').value.trim();
  const need={website:'A website',system:'A business system',both:'A website and a business system'}[S.need];
  return ['Hi Likha Web Studio! I\'d like a quote.',
    name||biz?`Name: ${name||'-'}${biz?' ('+biz+')':''}`:null,
    `I need: ${need}`,`Business type: ${catName()}`,
    q.key?`Package: ${PKG[q.key].n} (${peso(PKG[q.key].p)})`:null,
    q.hasWeb?`Website features: ${q.web.length?q.web.map(f=>WEB_FEATS.find(x=>x.id===f).n).join(', '):'Basic website'}`:null,
    q.mods.length?`Business systems: ${q.mods.map(m=>MOD[m].n).join(', ')}`:null,
    S.logo?'Add-on: Logo design':null,S.maint?'Add-on: Monthly maintenance':null,
    `Timeline: ${S.when}`,`Budget: ${S.budget}`,`Estimate: ${q.total}`,notes?`Notes: ${notes}`:null].filter(Boolean).join('\n');
}
function copyThen(text,out,msg){
  const fail=()=>{$(out).textContent='Messenger is opening. Type your message there.';};
  try{navigator.clipboard.writeText(text).then(()=>{$(out).textContent=msg;},fail);}catch(e){fail();}
}
function sendQuote(){copyThen(quoteText(),'qCopied','Quote copied. Paste it in the Messenger chat that just opened.');window.open(MSG,'_blank','noopener');}
$('sendQuote').addEventListener('click',()=>copyThen(quoteText(),'qCopied','Quote copied. Paste it in the Messenger chat that just opened.'));

/* Presets from buttons across the page */
document.addEventListener('click',e=>{
  const p=e.target.closest('[data-preset]'),c=e.target.closest('[data-cat-quote]'),l=e.target.closest('[data-like]'),t=e.target.closest('[data-tab]');
  if(t){openTab(t.dataset.tab);return;}
  if(p){const v=p.dataset.preset;
    if(v==='website'){S.need='website';showStep(2);}
    else if(v==='system'){S.need='system';showStep(S.mods.size?3:2);}
    else{S.need='website';S.web=new Set(v==='business'?['pages']:v==='premium'?['pages','custom']:[]);showStep(3);}
  }else if(c){applyCat(c.dataset.catQuote);if(S.need==='system')S.need='both';showStep(3);}
  else if(l){const pr=PROJECTS[l.dataset.like];S.cat=pr.cat;S.need=pr.mods.some(m=>MOD[m].lvl==='custom')?'both':'website';S.web=new Set(pr.web);pr.mods.forEach(m=>S.mods.add(m));showStep(3);}
  else return;
  syncAll();
});

/* Contact form */
$('copyPhone').addEventListener('click',()=>{try{navigator.clipboard.writeText('09762796572').then(()=>$('copyPhone').textContent='Copied',()=>{});}catch(e){}});
$('inq').addEventListener('submit',e=>{
  e.preventDefault();
  const t=`Hi Likha Web Studio! I'm ${$('iname').value} from ${$('ibiz').value} (${$('itype').value}).\n${$('imsg').value||'I would like to ask about a website.'}`;
  copyThen(t,'iCopied','Message copied. Paste it in the Messenger chat that just opened.');
  window.open(MSG,'_blank','noopener');
});

/* ---------- Reveal on scroll ---------- */
const io='IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{rootMargin:'0px 0px -8% 0px'}):null;
function revealIn(root){if(!io)return;$$('.why-card,.plan,.sol,.steps li,.trust-card,.proof',root).forEach(el=>{if(el.classList.contains('in'))return;el.classList.add('reveal');io.observe(el);});}
revealIn(document);

/* Init */
renderSol();
applyCat(S.cat,{resetFeats:false});
syncAll();showStep(1);
})();
