define("UWA/Storage/Adapter/Dom",["UWA/Core","UWA/Storage/Adapter/Abstract"],function(f,e){function b(g){var h=false;try{g.setItem("uwa-test",1);g.removeItem("uwa-test");h=true}catch(i){}return h}function c(){return !!window.sessionStorage&&b(window.sessionStorage)}function a(){return !!(window.localStorage||window.globalStorage)&&b(!window.globalStorage?window.localStorage:window.globalStorage[location.hostname])}var d=e.extend({type:"Dom",limit:5*1024*1024,connect:function(g){this.database=g;if(window.localStorage||window.globalStorage){this.db=!window.globalStorage?window.localStorage:window.globalStorage[location.hostname]}else{if(window.sessionStorage){this.db=window.sessionStorage}}this.storage.isReady=true},isAvailable:function(){return c()||a()},get:function(h){this.interruptAccess();var g=this.db.getItem(this.database+"-"+h),i=(g&&g.value!==undefined?g.value:g);return i||undefined},set:function(g,h){this.interruptAccess();this.db.setItem(this.database+"-"+g,h);return h},rem:function(h){this.interruptAccess();var g=this.get(h);this.db.removeItem(this.database+"-"+h);return g}});return f.namespace("Storage/Adapter/Dom",d,f)});