(() => {
"use strict";
const C=window.SCHOOL_CONFIG||{},REPO=C.dataRepo||"s18211190154-ux/schoolbyalif",BRANCH=C.dataBranch||"main";
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=v=>/^(https?:|mailto:|tel:|\/|#)/i.test(String(v||""))?String(v):"#";
const dateLabel=v=>{if(!v)return"Date to be confirmed";const d=new Date(v+"T12:00:00");return Number.isNaN(d.getTime())?String(v):d.toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"});};
const dateBox=v=>{const d=new Date((v||"")+"T12:00:00");return Number.isNaN(d.getTime())?{day:"—",month:"TBC"}:{day:d.getDate(),month:d.toLocaleDateString(undefined,{month:"short"})};};
function setTheme(t){const theme=t==="dark"?"dark":"light";document.documentElement.dataset.theme=theme;const b=$("theme-toggle");if(b){b.innerHTML=theme==="dark"?"☀ <span>Light</span>":"☾ <span>Dark</span>";b.setAttribute("aria-label",theme==="dark"?"Switch to light mode":"Switch to dark mode");b.setAttribute("aria-pressed",String(theme==="dark"));}}
try{setTheme(localStorage.getItem("schoolbyalif-theme")||"light")}catch{setTheme("light")}
function header(){return '<div class="container nav-wrap"><a class="brand" href="index.html" aria-label="School by Alif home"><span class="brand-mark">SA</span><span class="brand-copy"><strong data-school-name>School by Alif</strong><small>LEARN · GROW · BELONG</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">☰ <span>Menu</span></button><nav class="nav-links" id="site-nav" aria-label="Main navigation"><a href="index.html">Home</a><a href="notices.html">Notices</a><a href="teachers.html">Teachers</a><a href="students.html">Students</a><a href="guardians.html">Families</a><div class="nav-more"><button type="button" class="nav-more-button" aria-expanded="false">Explore <span aria-hidden="true">⌄</span></button><div class="nav-more-menu"><a href="about.html">About the school</a><a href="academics.html">Academics</a><a href="campus-life.html">Campus life</a><a href="news.html">News & events</a><a href="admissions.html">Admissions</a><a href="complaints.html">Complaints & feedback</a><a href="contact.html">Contact</a></div></div></nav><div class="nav-utility"><button type="button" class="theme-toggle" id="theme-toggle">☾ <span>Dark</span></button><a class="btn btn-sm nav-cta" href="admissions.html">Admissions ↗</a></div></div>';}
function footer(){return '<div class="container"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">SA</span><span class="brand-copy"><strong data-school-name>School by Alif</strong><small>LEARN · GROW · BELONG</small></span></a><p>A clear, welcoming school website for students, teachers and families — all in one place.</p><div class="social-row"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="YouTube">▶</a></div></div><div class="footer-col"><h3>Explore</h3><a href="about.html">About the school</a><a href="academics.html">Academics</a><a href="campus-life.html">Campus life</a><a href="news.html">News & events</a><a href="admissions.html">Admissions</a></div><div class="footer-col"><h3>School community</h3><a href="notices.html">Notice board</a><a href="teachers.html">Teacher directory</a><a href="students.html">Student information</a><a href="guardians.html">Family comments</a><a href="complaints.html">Complaints & feedback</a></div><div class="footer-col"><h3>Contact</h3><a data-contact-address href="contact.html">School address</a><a data-contact-phone href="tel:+8801000000000">School phone</a><a data-contact-email href="mailto:hello@schoolbyalif.example">School email</a><p style="font-size:.69rem;margin-top:10px">Contact details are examples.</p></div></div><div class="footer-bottom"><span>© <span data-year></span> <span data-school-name>School by Alif</span>. Sample website content.</span><span><a href="privacy.html">Privacy</a><a href="accessibility.html">Accessibility</a></span></div></div>';}
function setupShell(){
document.querySelector(".site-header")?.replaceChildren();const h=document.querySelector(".site-header");if(h)h.innerHTML=header();const f=document.querySelector(".site-footer");if(f)f.innerHTML=footer();setTheme(document.documentElement.dataset.theme||"light");
document.querySelectorAll("[data-school-name]").forEach(e=>e.textContent=C.name||"School by Alif");document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());
document.querySelectorAll("[data-contact-phone]").forEach(e=>{e.textContent=C.phone||"Add school phone";if(e.tagName==="A")e.href="tel:"+String(C.phone||"").replace(/[^+0-9]/g,"")});
document.querySelectorAll("[data-contact-email]").forEach(e=>{e.textContent=C.email||"Add school email";if(e.tagName==="A")e.href="mailto:"+C.email});
document.querySelectorAll("[data-contact-address]").forEach(e=>e.textContent=C.address||"Add school address");
$("theme-toggle")?.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";setTheme(next);try{localStorage.setItem("schoolbyalif-theme",next)}catch{}});
const nav=document.querySelector(".nav-links"),menu=document.querySelector(".nav-toggle"),more=nav?.querySelector(".nav-more"),mb=nav?.querySelector(".nav-more-button"),current=location.pathname.split("/").pop()||"index.html";
nav?.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===current){a.setAttribute("aria-current","page");if(a.closest(".nav-more"))mb?.classList.add("current")}a.addEventListener("click",()=>{nav.classList.remove("is-open");menu?.setAttribute("aria-expanded","false");if(menu)menu.innerHTML="☰ <span>Menu</span>"});});
mb?.addEventListener("click",()=>{const open=more.classList.toggle("open");mb.setAttribute("aria-expanded",String(open))});
document.addEventListener("click",e=>{if(more&&!more.contains(e.target)){more.classList.remove("open");mb?.setAttribute("aria-expanded","false")}});
menu?.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav?.classList.toggle("is-open",!open);menu.innerHTML=open?"☰ <span>Menu</span>":"✕ <span>Close</span>"});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){more?.classList.remove("open");mb?.setAttribute("aria-expanded","false");nav?.classList.remove("is-open");menu?.setAttribute("aria-expanded","false")}});
}
function parseCsv(text){
 const rows=[];let row=[],field="",quoted=false;
 for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(quoted){
   if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}
   else if(ch==='"')quoted=false;
   else field+=ch;
  }else if(ch==='"')quoted=true;
  else if(ch===","){row.push(field);field="";}
  else if(ch==="\n"||ch==="\r"){
   if(ch==="\r"&&text[i+1]==="\n")i++;
   row.push(field);field="";
   if(row.some(v=>String(v).trim()!==""))rows.push(row);
   row=[];
  }else field+=ch;
 }
 if(field!==""||row.length){row.push(field);if(row.some(v=>String(v).trim()!==""))rows.push(row);}
 if(rows.length<2)return [];
 const headers=rows.shift().map(h=>String(h).trim().replace(/^\uFEFF/,""));
 return rows.map(values=>{
  const item={};
  headers.forEach((h,i)=>{if(h)item[h]=String(values[i]??"").trim();});
  return item;
 }).filter(item=>Object.values(item).some(v=>v!==""));
}
async function loadCollection(folder){
 const api="https://api.github.com/repos/"+REPO+"/contents/data/"+encodeURIComponent(folder)+"?ref="+encodeURIComponent(BRANCH);
 const response=await fetch(api,{headers:{"Accept":"application/vnd.github+json"},cache:"no-store"});
 if(!response.ok)throw new Error("Data folder request failed: "+response.status);
 const files=await response.json();if(!Array.isArray(files))throw new Error("Data folder listing not available");
 const usable=files.filter(f=>f.type==="file"&&!f.name.toLowerCase().includes("template"));
 const structuredFiles=usable.filter(f=>/\.(json|csv)$/i.test(f.name));
 const records=await Promise.all(structuredFiles.map(async f=>{
  const r=await fetch(f.download_url||("https://raw.githubusercontent.com/"+REPO+"/"+BRANCH+"/data/"+folder+"/"+f.name),{cache:"no-store"});
  if(!r.ok)throw new Error("Cannot load "+f.name);
  return /\.csv$/i.test(f.name)?parseCsv(await r.text()):r.json();
 }));
 const structured=records.flatMap(v=>Array.isArray(v)?v:[v]).filter(Boolean);
 if(folder!=="notices")return structured;
 const attachments=usable.filter(f=>/\.(pdf|png|jpe?g|webp)$/i.test(f.name)).map(f=>{
  const stem=f.name.replace(/\.[^.]+$/,""),rawDate=(f.name.match(/\d{4}-\d{2}-\d{2}/)||[])[0]||"";
  const pretty=stem.replace(/^\d{4}-\d{2}-\d{2}[-_]?/,"").replace(/[-_]+/g," ").replace(/\b\w/g,ch=>ch.toUpperCase());
  const lower=f.name.toLowerCase();
  const category=/urgent|important|emergency/.test(lower)?"urgent":/exam|assessment|result|academic/.test(lower)?"academic":/event|meeting|holiday|sports/.test(lower)?"events":"general";
  const image=/\.(png|jpe?g|webp)$/i.test(f.name);
  return {id:"FILE-"+f.name,title:pretty||f.name,date:rawDate,category,priority:category==="urgent"?"important":"normal",label:image?"Notice image":"Notice attachment",summary:image?"Image notice uploaded to this folder. Add a JSON or CSV row if you want a longer description.":"Document uploaded to this folder. Open the attachment to read the full notice.",audience:"School community",attachment:f.download_url||f.html_url,image:image?(f.download_url||f.html_url):"",fileName:f.name};
 });
 return [...structured,...attachments];
}
function dataError(root,folder){if(root)root.innerHTML='<div class="demo-alert"><strong>Could not load this data folder.</strong> Check the JSON files or <a class="text-link" href="https://github.com/'+esc(REPO)+'/tree/'+esc(BRANCH)+'/data/'+esc(folder)+'">open the folder on GitHub ↗</a>, then reload this page.</div>';}
function noticeHtml(n){
const cat=String(n.category||"general").toLowerCase();
const cls=cat==="urgent"||n.priority==="urgent"?"urgent":cat==="events"?"event":cat==="academic"?"academic":"";
const image=n.image?'<a href="'+esc(safeUrl(n.attachment||n.image))+'" target="_blank" rel="noopener"><img src="'+esc(safeUrl(n.image))+'" alt="'+esc(n.title||"Uploaded school notice")+'" loading="lazy" style="width:100%;max-height:240px;object-fit:contain;background:var(--surface-soft);border-radius:11px;margin:13px 0"></a>':"";
const attachment=n.attachment?'<p style="margin-top:11px"><a class="text-link" href="'+esc(safeUrl(n.attachment))+'" target="_blank" rel="noopener">'+esc(n.fileType==="pdf"||String(n.attachment).toLowerCase().includes(".pdf")?"Open notice PDF ↗":(n.image?"Open full-size notice image ↗":"Open notice attachment ↗"))+'</a></p>':n.link?'<p style="margin-top:11px"><a class="text-link" href="'+esc(safeUrl(n.link))+'">Read more ↗</a></p>':"";
return '<article class="notice-card reveal" data-filter-card data-category="'+esc(cat)+'"><div class="notice-card-top"><span class="notice-label '+cls+'">'+esc(n.label||cat)+'</span><span class="notice-date">'+esc(dateLabel(n.date))+'</span></div><h3>'+esc(n.title||n.fileName||"School notice")+'</h3><p>'+esc(n.summary||n.description||"")+'</p>'+image+'<div class="notice-meta"><span>'+esc(n.audience||"School community")+'</span><span>'+esc(n.id||"Sample notice")+'</span></div>'+attachment+'</article>';
}
function teacherHtml(t){return '<article class="teacher-card reveal" data-filter-card data-category="'+esc(String(t.department||t.subject||"general").toLowerCase())+'"><img src="'+esc(safeUrl(t.photo||C.images?.teacher1||""))+'" alt="'+esc("Example portrait of "+(t.name||"teacher"))+'" loading="lazy"><div class="teacher-info"><span class="tag">'+esc(t.department||"Faculty")+'</span><h3>'+esc(t.name||"Example Teacher")+'</h3><div class="role">'+esc(t.role||t.subject||"Teacher")+'</div><p>'+esc(t.bio||"")+'</p></div></article>';}
function studentHtml(s){const initials=String(s.name||"Example Student").split(/\s+/).slice(0,2).map(v=>v[0]).join("").toUpperCase();const cat=String(s.grade||"other").toLowerCase().replace(/[^a-z0-9]+/g,"-");return '<article class="student-record reveal" data-filter-card data-category="'+esc(cat)+'"><div class="student-record-head"><span class="student-avatar">'+esc(initials)+'</span><div><h3>'+esc(s.name||"Example Student")+'</h3><p>'+esc(s.student_id||"DEMO-ID")+' · '+esc(s.grade||"Class —")+'</p></div></div><div class="student-metrics"><div class="student-metric"><span>Section / roll</span><b>'+esc(s.section||"—")+' / '+esc(s.roll||"—")+'</b></div><div class="student-metric"><span>Attendance</span><b>'+esc(s.attendance??"—")+(s.attendance!==undefined?"%":"")+'</b></div><div class="student-metric"><span>Learning status</span><b>'+esc(s.status||"Example")+'</b></div><div class="student-metric"><span>Focus area</span><b>'+esc(s.focus||"General learning")+'</b></div></div><p style="font-size:.73rem;margin:12px 0 0">'+esc(s.note||"Fictional demo data only.")+'</p></article>';}
function commentHtml(c){return '<article class="comment-card"><div class="comment-top"><div class="comment-author"><span class="comment-avatar">'+esc(String(c.author||"G").slice(0,1).toUpperCase())+'</span><span><b>'+esc(c.author||"Example Guardian")+'</b><small>'+esc(c.date||"Sample comment")+'</small></span></div><span class="tag blue">'+esc(c.category||"Community")+'</span></div><p>'+esc(c.comment||c.message||"")+'</p>'+(c.response?'<div class="comment-response"><b>Example school response</b>'+esc(c.response)+'</div>':"")+'</article>';}
function filters(scope){
if(!scope)return;
scope.querySelectorAll("[data-filter-group]").forEach(group=>{
 const region=group.closest("[data-filter-scope]")||group.parentElement||document;
 if(group.dataset.handlers!=="1"){
   group.dataset.activeFilter="all";group.dataset.activeQuery="";
   group.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
     group.querySelectorAll("[data-filter]").forEach(item=>item.classList.toggle("active",item===button));
     group.dataset.activeFilter=button.dataset.filter||"all";
     filters(region);
   }));
   const search=region.querySelector("[data-search-input]");
   if(search&&!search.dataset.filterHooked){
     search.dataset.filterHooked="1";
     search.addEventListener("input",()=>{group.dataset.activeQuery=search.value.trim().toLowerCase();filters(region);});
   }
   group.dataset.handlers="1";
 }
 const activeFilter=group.dataset.activeFilter||"all",query=group.dataset.activeQuery||"";
 const cards=[...region.querySelectorAll("[data-filter-card]")];let visible=0;
 cards.forEach(card=>{
   const category=String(card.dataset.category||"general").toLowerCase();
   const content=(card.innerText||"").toLowerCase();
   const categoryMatch=activeFilter==="all"||category===activeFilter||(activeFilter==="urgent"&&!!card.querySelector(".notice-label.urgent"));
   const matches=categoryMatch&&(!query||content.includes(query));
   card.hidden=!matches;if(matches)visible++;
 });
 const empty=region.querySelector("[data-empty-state]");if(empty)empty.hidden=visible!==0;
});
}
async function populate(folder,id,renderer,limit){const root=$(id);if(!root)return[];try{let list=await loadCollection(folder);list.sort((a,b)=>String(b.date||b.name||"").localeCompare(String(a.date||a.name||"")));if(limit)list=list.slice(0,limit);root.innerHTML=list.length?list.map(renderer).join(""):'<div class="empty-state">No items yet. Add JSON files in data/'+esc(folder)+'/.</div>';filters(root.closest("[data-filter-scope]")||root.parentElement);reveals(root);const count=$(id+"-count");if(count)count.textContent=list.length;return list}catch(e){console.error("Unable to load "+folder,e);dataError(root,folder);return[]}}
function reveals(scope=document){const items=scope.querySelectorAll(".reveal:not(.in-view)");if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){items.forEach(x=>x.classList.add("in-view"));return}const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in-view");io.unobserve(en.target)}}),{threshold:.08,rootMargin:"0px 0px -15px 0px"});items.forEach(x=>io.observe(x));}
function initForms(){document.querySelectorAll("form[data-demo-form]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const msg=form.querySelector(".form-message");if(msg)msg.textContent=form.dataset.demoMessage||"Preview only: nothing was sent or saved. Connect a secure school service before using this form.";form.reset()}));
const form=$("guardian-comment-form");form?.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form),item={author:d.get("author")||"Example Guardian",date:"Just now · local preview",category:d.get("category")||"General",comment:d.get("comment")||""};const root=$("guardian-comments");if(root){const wrap=document.createElement("div");wrap.innerHTML=commentHtml(item);root.prepend(wrap.firstElementChild)}const status=$("guardian-comment-status");if(status)status.textContent="Preview added to this page only. It has not been saved or sent to the school.";form.reset()});}
function extras(){if(!$("scroll-progress")){const p=document.createElement("div");p.id="scroll-progress";p.setAttribute("aria-hidden","true");document.body.append(p)}if(!$("back-to-top")){const b=document.createElement("button");b.id="back-to-top";b.type="button";b.setAttribute("aria-label","Back to top");b.textContent="↑";document.body.append(b);b.addEventListener("click",()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}))}const scroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;$("scroll-progress").style.width=(max>0?scrollY/max*100:0)+"%";$("back-to-top").classList.toggle("visible",scrollY>450)};window.addEventListener("scroll",scroll,{passive:true});scroll();reveals();}
document.addEventListener("DOMContentLoaded",()=>{setupShell();document.querySelectorAll("[data-image]").forEach(img=>{const url=C.images?.[img.dataset.image];if(url)img.src=url;img.addEventListener("error",()=>{img.alt=(img.alt||"Example image")+" — change its URL in assets/js/site-config.js";},{once:true})});document.querySelectorAll("[data-config]").forEach(el=>{if(C[el.dataset.config])el.textContent=C[el.dataset.config]});filters(document);initForms();extras();if($("notice-list"))populate("notices","notice-list",noticeHtml);if($("home-notices"))populate("notices","home-notices",noticeHtml,3);if($("teacher-list"))populate("teachers","teacher-list",teacherHtml);if($("home-teachers"))populate("teachers","home-teachers",teacherHtml,3);if($("student-list"))populate("students","student-list",studentHtml);if($("guardian-comments"))populate("guardian-comments","guardian-comments",commentHtml);});
})();