(function(){var f=this;function k(a,c,b){return a.call.apply(a.bind,arguments)}function l(a,c,b){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,e);return a.apply(c,b)}}return function(){return a.apply(c,arguments)}}function p(a,c,b){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?k:l;return p.apply(null,arguments)};var q=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function r(a,c){return a<c?-1:a>c?1:0}function t(a){var c=Number(a);return 0==c&&/^[\s\xa0]*$/.test(a)?NaN:c};var u={};var v;a:{var w=f.navigator;if(w){var x=w.userAgent;if(x){v=x;break a}}v=""};var y=-1!=v.indexOf("Opera"),z=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),A=-1!=v.indexOf("Edge"),B=-1!=v.indexOf("Gecko")&&!(-1!=v.toLowerCase().indexOf("webkit")&&-1==v.indexOf("Edge"))&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"))&&-1==v.indexOf("Edge"),C=-1!=v.toLowerCase().indexOf("webkit")&&-1==v.indexOf("Edge");function D(){var a=f.document;return a?a.documentMode:void 0}var E;
a:{var F="",G=function(){var a=v;if(B)return/rv\:([^\);]+)(\)|;)/.exec(a);if(A)return/Edge\/([\d\.]+)/.exec(a);if(z)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(C)return/WebKit\/(\S+)/.exec(a);if(y)return/(?:Version)[ \/]?(\S+)/.exec(a)}();G&&(F=G?G[1]:"");if(z){var H=D();if(null!=H&&H>parseFloat(F)){E=String(H);break a}}E=F}var I={};
function J(a){if(!I[a]){for(var c=0,b=q(String(E)).split("."),e=q(String(a)).split("."),d=Math.max(b.length,e.length),g=0;0==c&&g<d;g++){var h=b[g]||"",T=e[g]||"",U=RegExp("(\\d*)(\\D*)","g"),V=RegExp("(\\d*)(\\D*)","g");do{var m=U.exec(h)||["","",""],n=V.exec(T)||["","",""];if(0==m[0].length&&0==n[0].length)break;c=r(0==m[1].length?0:parseInt(m[1],10),0==n[1].length?0:parseInt(n[1],10))||r(0==m[2].length,0==n[2].length)||r(m[2],n[2])}while(0==c)}I[a]=0<=c}}
var K=f.document,L=K&&z?D()||("CSS1Compat"==K.compatMode?parseInt(E,10):5):void 0;var M;if(!(M=!B&&!z)){var N;if(N=z)N=9<=Number(L);M=N}M||B&&J("1.9.1");z&&J("9");function O(a){return window.matchMedia("(-webkit-min-device-pixel-ratio: "+a+"),(min--moz-device-pixel-ratio: "+a+"),(min-resolution: "+a+"dppx)").matches?a:0};function P(a,c){this.a=a;this.b=c}function Q(a){this.c=a;this.b=0;this.a=[]}function R(){this.a=[]}function S(a,c){var b=new Image;b.onload=function(){a.src=c};b.src=c}
R.prototype.b=function(){var a;a=document.documentElement.clientWidth/window.innerWidth;var c=window;a=(void 0!==c.devicePixelRatio?c.devicePixelRatio:c.matchMedia?O(.75)||O(1.5)||O(2)||O(3)||1:1)*a;for(var c=this.a.length,b=0;b<c;++b){var e=this.a[b],d=a;if(d>e.b)for(var g=e.a.length,h=0;h<g;++h)if(d<=e.a[h].a){e.b=e.a[h].a;S(e.c,e.a[h].b);break}}};function W(a,c){var b=a.search(c);return-1==b?a.length:b}var X=/[ \t\n\f\r]/,Y=/[^ \t\n\f\r]/,aa=/[ \t\n\f\r,]/,Z=/[^ \t\n\f\r,]/;
function ba(a,c,b){a=new Q(a);var e=!1,d=W(b,Z);for(b=b.slice(d);0<b.length;){var d=W(b,X),g=b.slice(0,d);b=b.slice(d);if(","==g[g.length-1])return null;d=W(b,Y);b=b.slice(d);var d=W(b,aa),h=b.slice(0,d);b=b.slice(d);if(1<h.length&&"x"==h[h.length-1]){d=t(h.slice(0,-1));if(isNaN(d))return null;a.a.push(new P(d,g));1==d&&(e=!0)}else return null;d=W(b,Y);b=b.slice(d);if(0<b.length&&","!=b[0])return null;b=b.slice(1);d=W(b,Z);b=b.slice(d)}!e&&c&&a.a.push(new P(1,c));a.a.sort(function(a,b){return a.a-
b.a});return a}(function(){for(var a=new R,c=u.getElementsByTagName("IMG"),b=0,e;e=c[b];++b){var d=e.getAttribute("src"),g=e.getAttribute("srcset");g&&(e=ba(e,d,g),null!=e&&a.a.push(e))}window.addEventListener("resize",p(a.b,a));window.addEventListener("touchmove",p(function(a){1<a.touches.length&&this.b()},a));a.b()})();})();
