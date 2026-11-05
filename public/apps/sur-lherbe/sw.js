'use strict';
var CACHE='sur-lherbe-v1';
var CORE=['sur-lherbe-v1.0.html','offline.html'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(function(r){if(r)return r;return fetch(e.request).then(function(n){var c=n.clone();caches.open(CACHE).then(function(cc){cc.put(e.request,c)});return n}).catch(function(){if(e.request.mode==='navigate')return caches.match('offline.html')})}))});
