/* ============================================================
   مفكرة المهبط · Ramp Notes — طبقة الترخيص وحماية الملكية
   © __OWNER__. جميع الحقوق محفوظة. استخدام شخصي مصرّح به فقط.
   إعادة التوزيع أو النشر أو النسب للمؤلف الأصلي ممنوعة.
   ============================================================ */
(function(){
"use strict";
var OWNER   = "Mohamed Sayed";
var PUBKEY  = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAENnDmt13XK4sqYPC7ofXcG5udbMipBVFV3p80jBbvrdrNcYL063VPTV4IXIlQSbqwx6c0kjyWAdj0fvJs1djesA==";
var REVOKED = [];
var APPURL  = "https://mohamed122-122.github.io/rn-x7k2/";
var LSK = "rn.license.v1";
var enc = new TextEncoder(), dec = new TextDecoder();
var subtle = (window.crypto && crypto.subtle) ? crypto.subtle : null;

function b64u(bytes){var s="",a=new Uint8Array(bytes);for(var i=0;i<a.length;i++)s+=String.fromCharCode(a[i]);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function unb64u(s){s=String(s).replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";var raw=atob(s),a=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)a[i]=raw.charCodeAt(i);return a}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function today(){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function fpArr(){
  var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
  return [String(navigator.platform||""),String(screen.width)+"x"+String(screen.height)+"x"+String(screen.colorDepth||0),tz,String(navigator.language||""),String(navigator.hardwareConcurrency||0),String(navigator.maxTouchPoints||0)];
}
function fpDiff(a,b){if(!Array.isArray(a)||!Array.isArray(b))return 9;var n=0;for(var i=0;i<Math.max(a.length,b.length);i++)if(a[i]!==b[i])n++;return n}
function store(o){try{localStorage.setItem(LSK,JSON.stringify(o))}catch(e){}}
function readLic(){try{return JSON.parse(localStorage.getItem(LSK))}catch(e){return null}}

/* ---------- الثيم ---------- */
function theme(){
  var t="day";
  try{var d=JSON.parse(localStorage.getItem("rn")||"{}");var s=(d.set&&d.set.theme)||"auto";
    t = s==="auto" ? (matchMedia("(prefers-color-scheme: dark)").matches?"night":"day") : s;
  }catch(e){}
  return t;
}

/* ---------- الواجهة ---------- */
var host=null,cloak=null;
function injectCloak(){
  cloak=document.createElement("style");
  cloak.textContent="body>*:not(#rnGuard){visibility:hidden!important}html,body{overflow:hidden!important}";
  document.head.appendChild(cloak);
}
function release(){
  if(cloak&&cloak.parentNode)cloak.parentNode.removeChild(cloak);cloak=null;
  if(host&&host.parentNode)host.parentNode.removeChild(host);host=null;
  document.documentElement.style.overflow="";document.body.style.overflow="";
}
function css(){
  var n=theme()==="night";
  return "#rnGuard{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:1rem;overflow:auto;font-family:'Noto Sans Arabic','Segoe UI',Tahoma,system-ui,sans-serif;font-weight:600;line-height:1.55;"+
    "background:"+(n?"#05070a":"#e9ecf1")+";color:"+(n?"#f5f7fa":"#000")+"}"+
  "#rnGuard *{box-sizing:border-box}"+
  "#rnGuard .bx{width:100%;max-width:460px;background:"+(n?"#10151c":"#fff")+";border:2px solid "+(n?"#46556c":"#1e293b")+";border-radius:18px;padding:1.3rem;box-shadow:0 18px 50px #0007}"+
  "#rnGuard .lg{display:flex;align-items:center;gap:.6rem;margin-bottom:.9rem}"+
  "#rnGuard .lg .ic{width:44px;height:44px;flex:none;border-radius:13px;display:grid;place-items:center;font-size:1.5rem;background:"+(n?"#161d26":"#f4f6f9")+";border:2px solid "+(n?"#46556c":"#1e293b")+"}"+
  "#rnGuard .lg b{font-size:1.15rem;display:block}"+
  "#rnGuard .lg small{font-size:.72rem;font-weight:800;letter-spacing:1.5px;color:"+(n?"#ffb21f":"#0b3bd6")+"}"+
  "#rnGuard h2{margin:.2rem 0 .4rem;font-size:1.25rem}"+
  "#rnGuard p{margin:0 0 .8rem;font-size:.88rem;color:"+(n?"#b6c1d1":"#2b3646")+"}"+
  "#rnGuard label{display:block;font-size:.8rem;font-weight:800;color:"+(n?"#b6c1d1":"#2b3646")+";margin-bottom:.3rem}"+
  "#rnGuard textarea{width:100%;min-height:5.5rem;padding:.6rem;border:2px solid "+(n?"#46556c":"#1e293b")+";border-radius:11px;background:"+(n?"#05070a":"#f4f6f9")+";color:inherit;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.72rem;direction:ltr;text-align:left;resize:vertical;line-height:1.5}"+
  "#rnGuard textarea:focus{outline:3px solid "+(n?"#ffb21f":"#0b3bd6")+";outline-offset:1px}"+
  "#rnGuard button{width:100%;min-height:3.1rem;margin-top:.7rem;border:2px solid "+(n?"#ffb21f":"#0b3bd6")+";background:"+(n?"#ffb21f":"#0b3bd6")+";color:"+(n?"#1a1100":"#fff")+";border-radius:12px;font:inherit;font-weight:900;font-size:1rem;cursor:pointer}"+
  "#rnGuard button:active{transform:scale(.98)}"+
  "#rnGuard button:disabled{opacity:.5;cursor:wait}"+
  "#rnGuard button.o{background:transparent;color:inherit;border-color:"+(n?"#46556c":"#1e293b")+";font-size:.88rem;min-height:2.6rem}"+
  "#rnGuard .msg{border-radius:11px;padding:.6rem .75rem;font-size:.85rem;font-weight:800;margin:.7rem 0;border:2px solid}"+
  "#rnGuard .msg.e{border-color:"+(n?"#ff8f9a":"#b3001b")+";background:"+(n?"#3d0c14":"#ffdadd")+";color:"+(n?"#ff8f9a":"#b3001b")+"}"+
  "#rnGuard .msg.s{border-color:"+(n?"#5ce58a":"#0a6b25")+";background:"+(n?"#0b2a17":"#d2f4da")+";color:"+(n?"#5ce58a":"#0a6b25")+"}"+
  "#rnGuard .msg.w{border-color:"+(n?"#ffc857":"#8a4b00")+";background:"+(n?"#3a2a04":"#ffe8a3")+";color:"+(n?"#ffc857":"#8a4b00")+"}"+
  "#rnGuard .ft{margin-top:1rem;padding-top:.8rem;border-top:2px dashed "+(n?"#2c3949":"#c3ccd8")+";font-size:.72rem;font-weight:700;color:"+(n?"#b6c1d1":"#2b3646")+";text-align:center;line-height:1.8}"+
  "#rnGuard .ft b{color:"+(n?"#ffb21f":"#0b3bd6")+"}"+
  "#rnGuard .who{display:flex;align-items:center;gap:.5rem;background:"+(n?"#0b2a17":"#d2f4da")+";border:2px solid "+(n?"#5ce58a":"#0a6b25")+";border-radius:11px;padding:.55rem .7rem;margin-bottom:.7rem;font-size:.88rem;font-weight:800}"+
  "#rnGuard::-webkit-scrollbar{width:11px}#rnGuard::-webkit-scrollbar-track{background:"+(n?"#10151c":"#f4f6f9")+"}"+
  "#rnGuard::-webkit-scrollbar-thumb{background:"+(n?"#46556c":"#1e293b")+";border-radius:8px}";
}
function paint(inner){
  if(!host){
    var st=document.createElement("style");st.id="rnGuardCss";st.textContent=css();document.head.appendChild(st);
    host=document.createElement("div");host.id="rnGuard";document.body.appendChild(host);
  }else{var s=document.getElementById("rnGuardCss");if(s)s.textContent=css()}
  host.innerHTML='<div class="bx"><div class="lg"><div class="ic">🛡</div><div><b>مفكرة المهبط</b><small>RAMP NOTES · LICENSED</small></div></div>'+inner+
    '<div class="ft">© '+esc(OWNER)+' — جميع الحقوق محفوظة<br>نسخة مصرّح بها للاستخدام الشخصي فقط · <b>إعادة التوزيع أو النسب ممنوعة</b></div></div>';
}
function ask(reason,keepCode){
  var msg = reason ? '<div class="msg '+reason.k+'">'+esc(reason.m)+'</div>' : '';
  paint('<h2>تفعيل النسخة</h2><p>البرنامج ده مصرّح به لمستخدمين محدّدين. الصق كود التفعيل اللي وصلك من المالك — هيتربط بالجهاز ده تلقائيًا.</p>'+msg+
    '<label>كود التفعيل</label><textarea id="rnCode" placeholder="RN1.…" spellcheck="false">'+esc(keepCode||"")+'</textarea>'+
    '<button id="rnGo">🔓 تفعيل</button>'+
    '<button class="o" id="rnHelp">مش عارف الكود؟</button>');
  var ta=document.getElementById("rnCode"),btn=document.getElementById("rnGo");
  btn.onclick=function(){btn.disabled=true;btn.textContent="جارٍ التحقق…";activate(ta.value.trim(),function(err){btn.disabled=false;btn.textContent="🔓 تفعيل";if(err)ask({k:"e",m:err},ta.value.trim())})};
  ta.onkeydown=function(e){if(e.key==="Enter"&&(e.ctrlKey||e.metaKey))btn.click()};
  document.getElementById("rnHelp").onclick=function(){
    paint('<h2>إزاي تجيب الكود؟</h2><p>كود التفعيل بيصدره مالك البرنامج لكل مستخدم باسمه. اطلبه منه وابعتله اسمك، وهو هيبعتلك رابط تفعيل على واتساب تدوس عليه وخلاص.</p>'+
      '<div class="msg w">الكود مربوط بجهاز واحد. لو غيّرت الموبايل أو المتصفح، اطلب تفعيل تاني من المالك.</div>'+
      '<button class="o" id="rnBack">← رجوع</button>');
    document.getElementById("rnBack").onclick=function(){ask(null,ta.value)};
  };
  setTimeout(function(){try{ta.focus()}catch(e){}},60);
}

/* ---------- التحقق ---------- */
function importPub(){
  return subtle.importKey("spki",unb64u(PUBKEY),{name:"ECDSA",namedCurve:"P-256"},false,["verify"]);
}
function verify(code){
  if(!subtle)return Promise.reject("المتصفح ده مش بيدعم التحقق المشفّر — افتح الرابط من Chrome أو Safari حديث.");
  var parts=String(code||"").trim().split(".");
  if(parts.length!==3||parts[0]!=="RN1")return Promise.reject("صيغة الكود مش صحيحة. انسخه كامل زي ما وصلك.");
  var pb=parts[1],sb=parts[2],data;
  try{data=JSON.parse(dec.decode(unb64u(pb)))}catch(e){return Promise.reject("الكود تالف أو ناقص.")}
  if(!data||!data.i||!data.n||!data.e)return Promise.reject("بيانات الترخيص ناقصة.");
  return importPub().then(function(key){
    return subtle.verify({name:"ECDSA",hash:"SHA-256"},key,unb64u(sb),enc.encode(pb));
  }).then(function(ok){
    if(!ok)throw "الكود ده مش صادر من مالك البرنامج.";
    if(REVOKED.indexOf(data.i)>=0)throw "الترخيص ده اتبطل من المالك. كلّمه لو ده غلط.";
    if(String(data.e)<today())throw "انتهت صلاحية الترخيص بتاريخ "+data.e+". اطلب تجديد من المالك.";
    return data;
  }).catch(function(e){throw (typeof e==="string")?e:"تعذّر التحقق من الكود."});
}
function activate(code,cb){
  verify(code).then(function(d){
    store({code:code,id:d.i,name:d.n,exp:d.e,fp:fpArr(),at:Date.now()});
    paint('<div class="who">✓ اتفعّل باسم: '+esc(d.n)+'</div><h2>أهلًا بيك 👋</h2><p>الترخيص صالح لحد <b>'+esc(d.e)+'</b> ومربوط بالجهاز ده. التطبيق هيفتح دلوقتي.</p>');
    setTimeout(function(){release();stamp();},900);
    cb(null);
  }).catch(function(err){cb(err)});
}
function boot(){
  injectCloak();
  var fromHash="";
  try{
    var h=location.hash||"";
    var m=/[#&]lic=([^&]+)/.exec(h);
    if(m)fromHash=decodeURIComponent(m[1]);
  }catch(e){}
  if(fromHash){
    try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}
    paint('<h2>جارٍ التفعيل…</h2><p>لحظة واحدة، بنتأكد من الكود.</p>');
    activate(fromHash,function(err){if(err)ask({k:"e",m:err},fromHash)});
    return;
  }
  var s=readLic();
  if(!s||!s.code){ask(null);return}
  if(fpDiff(s.fp,fpArr())>=2){
    paint('<h2>جهاز مختلف</h2><p>الترخيص مربوط بجهاز تاني. لو ده جهازك الجديد، دوس تفعيل عشان يتربط بيه.</p>');
    activate(s.code,function(err){
      if(err)ask({k:"w",m:"الجهاز اتغيّر — "+err},s.code);
    });
    return;
  }
  verify(s.code).then(function(d){
    s.name=d.n;s.exp=d.e;store(s);release();stamp();
  }).catch(function(err){
    ask({k:"e",m:err},s.code);
  });
}

/* ---------- توقيع الملكية في المخرجات ---------- */
function sig(){return "\n─────────────\n© "+OWNER+" — مفكرة المهبط · Ramp Notes\nنسخة مصرّح بها. إعادة التوزيع أو النسب ممنوعة."}
function stamp(){
  try{
    if(typeof window.summary==="function"&&!window.summary.__rn){
      var os=window.summary;
      window.summary=function(f){return os(f)+sig()};
      window.summary.__rn=1;
    }
    if(typeof window.csv==="function"&&!window.csv.__rn){
      var oc=window.csv;
      window.csv=function(){
        var out=oc();
        return out+"\r\n\"# © "+String(OWNER).replace(/"/g,'""')+" — مفكرة المهبط · Ramp Notes — نسخة مصرّح بها، إعادة التوزيع ممنوعة\"\r\n";
      };
      window.csv.__rn=1;
    }
    if(typeof window.backup==="function"&&!window.backup.__rn){
      var ob=window.backup;
      window.backup=function(k){
        try{
          var lic=readLic()||{};
          if(k!=="csv"){
            var of=window.fileDl;
            if(typeof of==="function"){
              window.fileDl=function(n,txt,ty){
                try{var o=JSON.parse(txt);o.license={owner:OWNER,to:lic.name||"—",id:lic.id||"—",exp:lic.exp||"—"};txt=JSON.stringify(o)}catch(e){}
                return of(n,txt,ty);
              };
            }
            ob(k);
            window.fileDl=of;
          }else ob(k);
        }catch(e){ob(k)}
      };
      window.backup.__rn=1;
    }
    if(!document.getElementById("rnOwnerBadge")){
      var lic=readLic()||{};
      var b=document.createElement("div");
      b.id="rnOwnerBadge";
      b.style.cssText="max-width:720px;margin:.5rem auto;padding:.5rem .8rem;font-size:.75rem;font-weight:700;text-align:center;opacity:.85;line-height:1.7";
      b.innerHTML="© "+esc(OWNER)+" — جميع الحقوق محفوظة<br>مرخّص لـ: <b>"+esc(lic.name||"—")+"</b> · صالح حتى "+esc(lic.exp||"—");
      var mn=document.querySelector("main");
      if(mn&&mn.parentNode)mn.parentNode.insertBefore(b,mn.nextSibling);
    }
    try{console.log("%c© "+OWNER+" — مفكرة المهبط · Ramp Notes","font-size:14px;font-weight:bold");console.log("%cنسخة مصرّح بها. إعادة التوزيع أو النشر أو النسب للمؤلف الأصلي ممنوعة.","font-size:12px")}catch(e){}
  }catch(e){}
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);
else boot();
window.addEventListener("load",function(){if(!host)stamp()});
})();
