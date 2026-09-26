import {apps,dock} from "./data.js";
import {load,save} from "./store.js";
const root=document.querySelector("#app");
const status=document.querySelector("#status");
let data=load();

const fmtTime=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
const fmtDate=()=>new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
function statusTick(){status.innerHTML=`<span>${fmtTime()}</span><span>●　5G　▮</span>`}
setInterval(statusTick,1000);statusTick();

function button(a){return `<button class="app-button" data-id="${a.id}"><div class="icon">${a.icon}</div><div class="label">${a.name}</div></button>`}
function home(){
 root.innerHTML=`<section class="page home">
  <div class="hello">${fmtDate()}</div>
  <div class="hero"><div class="clock">${fmtTime()}</div><div class="mini-weather"><b>18°</b><small>Clear · Shimane</small></div></div>
  <div class="search">⌕　Search</div>
  <div class="grid">${apps.map(button).join("")}</div>
  <nav class="dock">${dock.map(id=>button(apps.find(a=>a.id===id))).join("")}</nav>
 </section>`;
 root.querySelectorAll("[data-id]").forEach(x=>x.onclick=()=>openApp(x.dataset.id));
}
function shell(title,body){
 root.innerHTML=`<section class="page sheet"><header class="sheet-head"><button class="back" id="back">‹</button><h1>${title}</h1></header>${body}</section>`;
 root.querySelector("#back").onclick=home;
}
function openApp(id){
 if(id==="journal"||id==="notes"){
  const title=id==="journal"?"Journal":"Notes";
  const value=data[id];
  shell(title,`<div class="card"><div class="muted">${id==="journal"?"TODAY · "+fmtTime():"QUICK NOTE"}</div><textarea id="editor" class="editor" placeholder="${id==="journal"?"What is worth remembering today?":"Keep a thought here…"}>${value.replaceAll("&","&amp;").replaceAll("<","&lt;")}</textarea><button id="save" class="save">Save</button><span id="saved" class="saved"></span></div>`);
  root.querySelector("#save").onclick=()=>{data=save({[id]:root.querySelector("#editor").value});root.querySelector("#saved").textContent="Saved locally";};
  return;
 }
 if(id==="photos"){shell("Photos",`<div class="card"><div class="muted">LIBRARY</div><div class="photo-empty">No photos yet</div></div>`);return}
 if(id==="music"){shell("Music",`<div class="album">♪</div><div class="card"><b>Nothing playing</b><div class="muted" style="margin-top:6px">Your library is quiet.</div></div>`);return}
 if(id==="weather"){shell("Weather",`<div class="card"><div class="muted">SHIMANE · TODAY</div><div class="big-degree">18°</div><div class="muted">Clear skies · Feels like 17°</div></div><div class="card"><div class="week"><div class="day"><b>Sat</b><span>18°</span></div><div class="day"><b>Sun</b><span>20°</span></div><div class="day"><b>Mon</b><span>17°</span></div><div class="day"><b>Tue</b><span>19°</span></div><div class="day"><b>Wed</b><span>16°</span></div></div></div>`);return}
 if(id==="files"){shell("Files",`<div class="card"><div class="list-row"><span>Documents</span><span>0</span></div><div class="list-row"><span>Audio</span><span>0</span></div><div class="list-row"><span>Images</span><span>0</span></div><div class="list-row"><span>Other</span><span>0</span></div></div>`);return}
 if(id==="today"){shell("Today",`<div class="card"><div class="muted">${fmtDate().toUpperCase()}</div><h2 style="font-weight:600">No plans today</h2><div class="muted">The day is open.</div></div>`);return}
 if(id==="settings"){shell("Settings",`<div class="card"><div class="list-row"><span>Appearance</span><span>Light</span></div><div class="list-row"><span>Sound</span><span>Quiet</span></div><div class="list-row"><span>Storage</span><span>Local</span></div><div class="list-row"><span>Version</span><span>1.0</span></div></div><div class="card"><div class="list-row danger"><span>Reset local data</span><span>›</span></div></div>`);return}
}
home();