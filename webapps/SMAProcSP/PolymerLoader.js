/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
window.WEBCOMPONENTS_JS_VERSION="DS/Polymer-1.6.1/webcomponents-lite.min";define("DS/SMAProcSP/PolymerLoader",["DS/SMAProcSP/Polymer"],function(b){var a={};a.register=function(d){var c=document.createElement("div");c.innerHTML=d;c.style.display="none";var f=/<dom-module id=["']([^"']+)["']/.exec(d);c.title="registerDomModule: "+(f?f[1]:"unknown");b.dom(document.body).appendChild(c);try{b.dom.flush()}catch(g){}};return a});