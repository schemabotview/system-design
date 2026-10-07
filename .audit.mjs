import puppeteer from 'puppeteer'
import fs from 'node:fs'
const m=JSON.parse(fs.readFileSync('scripts/audio-manifest.json','utf8'))
const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox'],headless:true})
const p=await b.newPage(); await p.setViewport({width:1920,height:1080})
const out=[]
for(const e of m.entries){
  await p.goto(`http://localhost:5173/#/${e.course}-${e.section}`,{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,900))
  const r=await p.evaluate(()=>{
    const sc=document.querySelector('.slide-panel__scaler'); const pan=document.querySelector('.slide-panel')
    const flow=document.querySelector('.react-flow')?.getBoundingClientRect()
    const nodes=[...document.querySelectorAll('.react-flow__node')].map(n=>n.getBoundingClientRect())
    let u=null
    for(const n of nodes){ if(!u) u={l:n.left,t:n.top,r:n.right,b:n.bottom}; else {u.l=Math.min(u.l,n.left);u.t=Math.min(u.t,n.top);u.r=Math.max(u.r,n.right);u.b=Math.max(u.b,n.bottom)} }
    const pr=pan.getBoundingClientRect()
    return {slide:sc.scrollHeight/ pr.height, w:u?(u.r-u.l)/flow.width:0, h:u?(u.b-u.t)/flow.height:0, text:document.querySelector('.react-flow')?.innerText||'', slideText:sc.innerText}
  })
  out.push({id:`${e.course}-${e.section}`,...r})
}
fs.writeFileSync(process.argv[2],JSON.stringify(out))
await b.close()
