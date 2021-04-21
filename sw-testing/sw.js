const cacheName='v1';

const cacheAssets=[
  './index.html',
  './main.js' 
  ];

//sw install
self.addEventListener('install',e=>{
  console.log('sw-installed');
  
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache=>{
        console.log('sw-catching-files');
        cache.addAll(cacheAssets);
      })
      .then(_=>self.skipWaiting())
    )
});

//sw activate
self.addEventListener('activate',e=>{
  console.log('Sw-activated')
  //remove old caches
  e.waitUntil(
    caches.keys().then(cacheName=>{
      return Promise.all(
        cacheName.map(cache=>{
          if(cache!=cacheName){
            console.log('sw-clearing-cache')
            return caches.delete(cache);
          };
        })
      ); 
    })
  );
});

self.addEventListener('fetch',e=>{
  console.log('sw-fectching');
  e.respondWith(
    fetch(e.request).catch(()=>{
      caches.match(e.request);
    })
  );
}) 
