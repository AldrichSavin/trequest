function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=/*#__PURE__*/t(require("axios"));function e(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,o(t,n)}function r(t){return r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},r(t)}function o(t,n){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},o(t,n)}function i(t,n,e){return i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct.bind():function(t,n,e){var r=[null];r.push.apply(r,n);var i=new(Function.bind.apply(t,r));return e&&o(i,e.prototype),i},i.apply(null,arguments)}function u(t){var n="function"==typeof Map?new Map:void 0;return u=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return i(t,arguments,r(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o(e,t)},u(t)}var c="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function s(t,n,e){if(!t.s){if(e instanceof f){if(!e.s)return void(e.o=s.bind(null,t,n));1&n&&(n=e.s),e=e.v}if(e&&e.then)return void e.then(s.bind(null,t,n),s.bind(null,t,2));t.s=n,t.v=e;var r=t.o;r&&r(t)}}var f=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,e){var r=new t,o=this.s;if(o){var i=1&o?n:e;if(i){try{s(r,1,i(this.v))}catch(t){s(r,2,t)}return r}return this}return this.o=function(t){try{var o=t.v;1&t.s?s(r,1,n?n(o):o):e?s(r,1,e(o)):s(r,2,o)}catch(t){s(r,2,t)}},r},t}();function a(t){return t instanceof f&&1&t.s}var l=/*#__PURE__*/function(t){function n(n){var e;return void 0===n&&(n={}),(e=t.call(this)||this).coreContext=void 0,e.coreContext=n,e}e(n,t);var r=n.prototype;return r.register=function(t){var n=this;(Array.isArray(t)?t:[t]).forEach(function(t){n.add(t),null==t.onRegister||t.onRegister(n.coreContext)})},r.initPluginContext=function(t,n){(Array.isArray(t)?t:[t]).forEach(function(t){null==t.setContext||t.setContext(n)}),this.run("onInit")},r.unregister=function(t){this.delete(t)},r.filters=function(t){return Array.from(this).map(function(n){if(n[t]&&"function"==typeof n[t])return n[t].bind(n)}).filter(Boolean)},r.run=function(t){var n=arguments;this.filters(t).forEach(function(t){t.apply(t,[].slice.call(n,1))})},r.runAsync=function(t){var n=arguments,e=this.filters(t);return Promise.all(e.map(function(t){return t.apply(t,[].slice.call(n,1))}))},r.runSync=function(t){try{var n=arguments,e=function(t,n,e){if("function"==typeof t[c]){var r,o,i,u=t[c]();if(function t(e){try{for(;!(r=u.next()).done;)if((e=n(r.value))&&e.then){if(!a(e))return void e.then(t,i||(i=s.bind(null,o=new f,2)));e=e.v}o?s(o,1,e):o=e}catch(t){s(o||(o=new f),2,t)}}(),u.return){var l=function(t){try{r.done||u.return()}catch(t){}return t};if(o&&o.then)return o.then(l,function(t){throw l(t)});l()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var h=[],p=0;p<t.length;p++)h.push(t[p]);return function(t,n,e){var r,o,i=-1;return function e(u){try{for(;++i<t.length;)if((u=n(i))&&u.then){if(!a(u))return void u.then(e,o||(o=s.bind(null,r=new f,2)));u=u.v}r?s(r,1,u):r=u}catch(t){s(r||(r=new f),2,t)}}(),r}(h,function(t){return n(h[t])})}(this.filters(t),function(t){return Promise.resolve(t.apply(t,[].slice.call(n,1))).then(function(){})});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},r.runOnion=function(t){var n=arguments;return this.filters(t).reduce(function(t,e){var r;return null!=(r=e.apply(e,[].slice.call(n,1)))?r:t},void 0)},r.runOnionAsync=function(t){return this.filters(t).reduce(function(t,n){try{var e=arguments;return Promise.resolve(t).then(function(t){var r;return null!=(r=n.apply(n,[].slice.call(e,1)))?r:t})}catch(t){return Promise.reject(t)}},Promise.resolve(void 0))},r.getPluginByName=function(t){return Array.from(this).find(function(n){return n.name===t})},n}(/*#__PURE__*/u(Set)),h=function(t){return"[object Object]"===Object.prototype.toString.call(t)},p=/*#__PURE__*/function(t){function r(e){var r;return void 0===e&&(e={}),(r=t.call(this)||this).coreConfig=void 0,r.instance=void 0,r.coreConfig=e,r.mountPlugins(),r.instance=n.default.create({}),r.registerRequestInterceptor(),r.registerResponseInterceptor(),r}e(r,t);var o=r.prototype;return o.mountPlugins=function(){var t=this.coreConfig.plugins,n=void 0===t?[]:t;this.register(n),this.initPluginContext(n,this)},o.registerRequestInterceptor=function(){var t=this,n=this;this.instance.interceptors.request.use(function(n){try{return t.run("onRequest",n),Promise.resolve(n)}catch(t){return Promise.reject(t)}},function(t){try{return Promise.resolve(n.runOnionAsync("onError",t)).then(function(e){return n.run("onFinally",e||t),Promise.reject(e||t)})}catch(t){return Promise.reject(t)}})},o.registerResponseInterceptor=function(){var t=this,n=this;this.instance.interceptors.response.use(function(n){try{return Promise.resolve(t.runOnionAsync("onResponse",n)).then(function(e){var r=e||n.data;return t.run("onFinally",r),r})}catch(t){return Promise.reject(t)}},function(t){try{return Promise.resolve(n.runOnionAsync("onError",t)).then(function(e){return n.run("onFinally",t),Promise.reject(e||t)})}catch(t){return Promise.reject(t)}})},o.isProtocol=function(t){return/(http|https|ws|wss):\/\/([\w.]+\/?)\S*/.test(t)},o.getBaseURL=function(t){var n,e;return t?this.isProtocol(t)?t:h(this.coreConfig.baseURL)&&(null==(e=this.coreConfig.baseURL)?void 0:e[t])||t:"string"==typeof this.coreConfig.baseURL?this.coreConfig.baseURL:h(this.coreConfig.baseURL)&&Reflect.has(this.coreConfig.baseURL||{},"default")?Reflect.get(this.coreConfig.baseURL||{},"default"):(null==(n=this.instance)||null==(n=n.defaults)?void 0:n.baseURL)||""},o.request=function(t){var n;if(null==(n=this.instance)||!n.request)throw new Error("HttpCore instance is not initialized");return this.runOnionAsync("onBeforeRequest",t),this.instance.request(this.mergeConfig(t,{baseURL:this.getBaseURL(t.baseURL)}))},o.mergeConfig=function(t,n){return Object.assign({},t,n)},r}(l),v=/*#__PURE__*/function(t){function n(){return t.call(this)||this}e(n,t);var r=n.prototype;return r.on=function(t,n){return this.set(t,n),this},r.emit=function(t){var n=this.get(t);return!!n&&(n.apply(this,[].slice.call(arguments,1)),!0)},r.off=function(t){return this.delete(t),this},n}(/*#__PURE__*/u(Map));exports.AbstractPlugin=/*#__PURE__*/function(t){function n(){var n;return(n=t.call(this)||this)._context={},n.version=void 0,n}e(n,t);var r=n.prototype;return r.setContext=function(t){this._context=t},r.getContext=function(){return this._context},n}(v),exports.Core=p,exports.EventEmitter=v,exports.PluginEventEmitter=l,exports.PluginFactory=function(){};
//# sourceMappingURL=index.cjs.map
