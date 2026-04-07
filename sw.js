self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const delay = url.searchParams.get('delay');
  if (!delay)
    return;
  event.respondWith((async () => {
    const response = fetch(event.request);
    await new Promise(resolve => setTimeout(resolve, +delay));
    return response;
  })());
});
