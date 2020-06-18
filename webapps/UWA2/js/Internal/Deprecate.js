define("UWA/Internal/Deprecate",["UWA/Core"],function(d){var c={};var b={};b.warn=function e(h,g,f){if(!f){f="warn"}if(d.debug&&!c.hasOwnProperty(h)){d.log(h+" is deprecated."+(g?" "+g:""),f);c[h]=true}};b.alias=function a(g,i,h){if(!d.debug){return h}var f=function(){b.warn(g,i);return h&&h.apply(this,arguments)};if(h){f.prototype=h.prototype}return f};b.property=function(h,j,g){var i=g?g.value:undefined;if(d.debug){var f=(g&&g.name)||j;Object.defineProperty(h,j,{get:function(){b.warn(f,g&&g.message);return i},set:function(k){b.warn(f,g&&g.message);i=k}})}else{h[j]=i}};b.uncurryAlias=function(g,h,f,i){Object.keys(g).forEach(function(j){var k=g[j];Object.defineProperty(h,j,{value:function(o,m,l){b.warn(i+"#"+j,"Use "+f+"."+j+"(value, ...) instead");switch(arguments.length){case 0:return k.call(g,this);case 1:return k.call(g,this,o);case 2:return k.call(g,this,o,m);case 3:return k.call(g,this,o,m,l);default:var n=[].slice.call(arguments);n.unshift(this);return k.apply(g,n)}},writable:true})})};return b});