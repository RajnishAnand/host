const cacheName='v1';

const cacheAssets=[
  './index.html',
  './main.js' 
  ];

//sw install
self.addEventListener('install',e=>{
  alert('sw-installed');
  
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache=>{
        alert('sw-catching-files');
        cache.addAll(cacheAssets);
      })
      .then(_=>self.skipWaiting())
    )
});

//sw activate
self.addEventListener('activate',e=>{
  alert('Sw-activated')
  //remove old caches
  e.waitUntil(
    caches.keys().then(cacheName=>{
      return Promise.all(
        cacheName.map(cache=>{
          if(cache!=cacheName){
            alert('sw-clearing-cache')
            return caches.delete(cache);
          };
        })
      ); 
    })
  );
});

self.addEventListener('fetch',e=>{
  alert('sw-fectching');
  e.respondWith(
    fetch(e.request).catch(()=>{
      caches.match(e.request);
    })
  );
}) 
