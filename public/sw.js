const CACHE = 'meal-builder-v6'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    await self.clients.claim()
    // Force-reload all open tabs so they pick up the new assets
    const clients = await self.clients.matchAll({ type: 'window' })
    clients.forEach(c => c.navigate(c.url))
  })())
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)

  // Network-first for HTML — index.html must always be fresh
  if (url.pathname.endsWith('/') || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()))
          return res
        })
        .catch(() => caches.match(e.request))
    )
    return
  }

  // Cache-first for everything else (JS/CSS are content-hashed)
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached ?? fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()))
        return res
      })
    )
  )
})
