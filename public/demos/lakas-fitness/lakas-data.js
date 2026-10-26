/* Lakas Fitness demo: deterministic SAMPLE data shared by the member portal and admin dashboard.
   Nothing here is real business or personal information. A live system would load these
   records from the gym's database through authenticated, role-checked API calls. */
(function(){
  const NOW=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Manila'}));
  const DAY=864e5;
  let seed=20261026;
  const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const pick=a=>a[Math.floor(rnd()*a.length)];
  const FIRST=['Juan','Maria','Jose','Ana','Mark','Kim','Paolo','Carla','Miguel','Bea','Rafael','Trisha','Josh','Nicole','Gab','Andrea','Carlo','Patricia','Enzo','Sofia','Luis','Camille','Ryan','Isabel','Kevin','Jasmine','Arvin','Denise','Marco','Ella'];
  const LAST=['Santos','Reyes','Cruz','Bautista','Garcia','Mendoza','Torres','Flores','Ramos','Villanueva','Aquino','Castillo','Navarro','Domingo','Salazar','Pascual','Lim','Tan','Dizon','Manalo'];
  const PLANS=[
    {id:'month',n:'Monthly',p:1500,days:30,w:.46},
    {id:'quarter',n:'Quarterly',p:4000,days:90,w:.24},
    {id:'annual',n:'Annual',p:14000,days:365,w:.12},
    {id:'pt',n:'Personal Training',p:6000,days:60,w:.08},
    {id:'day',n:'Day Pass',p:300,days:1,w:.10}
  ];
  const planPick=()=>{let r=rnd(),a=0;for(const p of PLANS){a+=p.w;if(r<=a)return p;}return PLANS[0];};
  const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

  /* members */
  const members=[];
  for(let i=0;i<214;i++){
    let p=planPick();if(p.id==='day')p=PLANS[0];
    const joined=new Date(NOW-Math.floor(rnd()*420+1)*DAY);
    const startAgo=Math.floor(rnd()*(p.days+40));
    const start=new Date(NOW-startAgo*DAY);
    const exp=new Date(+start+p.days*DAY);
    const left=Math.ceil((exp-NOW)/DAY);
    const status=left<0?'Expired':left<=7?'Expiring':'Active';
    const fn=pick(FIRST),ln=pick(LAST);
    members.push({id:'LF-'+(1000+i),name:`${fn} ${ln}`,first:fn,plan:p.n,planId:p.id,price:p.p,joined:iso(joined<start?joined:start),start:iso(start),exp:iso(exp),left,status,
      phone:'09'+String(Math.floor(rnd()*1e9)).padStart(9,'0').replace(/(\d{2})(\d{3})(\d{4})/,'$1X XXX $3'),visits:Math.floor(rnd()*14)});
  }
  members.sort((a,b)=>a.name.localeCompare(b.name));

  /* sales: one record per payment over the last 13 months */
  const sales=[];
  for(let d=395;d>=0;d--){
    const date=new Date(NOW-d*DAY);
    const season=1+.25*Math.sin((date.getMonth()-0.5)/12*2*Math.PI)+(date.getMonth()===0?.35:0);
    const n=Math.round((1+rnd()*2.4)*season*(1+(395-d)/900));
    for(let k=0;k<n;k++){const p=planPick();const renew=p.id!=='day'&&rnd()<.42;
      sales.push({date:iso(date),t:+date,plan:p.n,planId:p.id,amount:p.p,type:p.id==='day'?'Day pass':renew?'Renewal':'New',member:pick(FIRST)+' '+pick(LAST)[0]+'.',method:pick(['GCash','GCash','Cash','Card','Maya'])});}
  }

  /* attendance: daily totals for the last 60 days + today's check-ins */
  const attendance=[];
  for(let d=59;d>=0;d--){const date=new Date(NOW-d*DAY);const dow=date.getDay();
    const base=dow===0?58:dow===6?84:dow===1?132:112;attendance.push({date:iso(date),t:+date,count:Math.round(base*(.85+rnd()*.3)*(d===0?Math.min(1,NOW.getHours()/22):1))});}
  const today=[];const act=members.filter(m=>m.status!=='Expired');
  const nIn=Math.min(act.length,attendance[attendance.length-1].count);
  for(let i=0;i<Math.min(nIn,40);i++){const m=act[Math.floor(rnd()*act.length)];
    const tin=new Date(NOW);tin.setHours(5+Math.floor(rnd()*Math.max(1,NOW.getHours()-5)),Math.floor(rnd()*60),0,0);
    const out=rnd()<.6?new Date(+tin+(50+rnd()*70)*60000):null;
    today.push({id:m.id,name:m.name,plan:m.plan,in:+tin,out:out&&out<NOW?+out:null});}
  today.sort((a,b)=>b.in-a.in);

  /* the demo member account */
  const ms=new Date(NOW-19*DAY),me=new Date(+ms+90*DAY);
  const demoMember={id:'LF-DEMO',name:'Juan Dela Cruz',first:'Juan',email:'juan.demo@example.com',phone:'0917 XXX 4567',plan:'Quarterly',price:4000,start:iso(ms),exp:iso(me),left:Math.ceil((me-NOW)/DAY),total:90,
    visits:[...Array(40)].map((_,i)=>{const d=new Date(NOW-(i+1)*DAY);if(rnd()<.45)return null;const tin=new Date(d);tin.setHours(pick([6,6,7,18,18,19]),Math.floor(rnd()*60));return {t:+tin,out:+tin+(55+rnd()*50)*60000};}).filter(Boolean),
    payments:[{date:iso(ms),item:'Quarterly membership',amount:4000,method:'GCash',ref:'GC-8841'},{date:iso(new Date(+ms-90*DAY)),item:'Quarterly membership',amount:4000,method:'Card',ref:'CD-2210'},{date:iso(new Date(+ms-120*DAY)),item:'Monthly membership',amount:1500,method:'Cash',ref:'CS-0193'}]};

  window.LAKAS={nowT:()=>+new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Manila'})),NOW,DAY,PLANS,members,sales,attendance,today,demoMember,iso,
    peso:n=>'₱'+Math.round(n).toLocaleString('en-PH'),
    fmt:(d,o)=>new Intl.DateTimeFormat('en-PH',o).format(new Date(typeof d==='string'?d+'T00:00':d)),
    time:t=>new Intl.DateTimeFormat('en-PH',{hour:'numeric',minute:'2-digit'}).format(new Date(t)),
    bookings:()=>{try{return JSON.parse(localStorage.getItem('lakas-demo-bookings'))||[]}catch(e){return []}},
    /* decorative QR-style pattern for demo passes; a live system signs a short-lived token server-side */
    qr:(svg,s0)=>{let s=s0||7,out='';const r=()=>(s=(s*9301+49297)%233280)/233280;
      const fin=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="#000"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#000"/>`;
      for(let y=0;y<29;y++)for(let x=0;x<29;x++){const f=(x<8&&y<8)||(x>20&&y<8)||(x<8&&y>20);if(!f&&r()>.52)out+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#000"/>`;}
      svg.innerHTML=`<rect width="29" height="29" fill="#fff"/>`+out+fin(0,0)+fin(22,0)+fin(0,22);}
  };
})();
