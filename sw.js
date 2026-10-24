const CACHE='hexrush-v11'; // sube el número al publicar cambios
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./bg1.jpg','./bg2.jpg','./bg3.jpg','./bg4.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('.mp3'))return; // el audio lo gestiona el navegador (soporta rangos)
  if(e.request.mode==='navigate'||u.endsWith('.html')||u.endsWith('/')||u.endsWith('sw.js')){ // primero red: así siempre ves la última versión
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
