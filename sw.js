const CACHE='hexrush-v7'; // sube el número al publicar cambios
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./bg1.jpg','./bg2.jpg','./bg3.jpg','./bg4.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('.m4a'))return; // el audio lo gestiona el navegador (soporta rangos)
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
