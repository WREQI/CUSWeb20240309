/*! Copyright 2016 Dassault Systèmes */
if(typeof customElements!=="undefined"){define("DS/SMAProcSP/CustomElements",[],function(){return customElements})}else{if(require.toUrl("DS/SMAProcSP/VENCustomElements").indexOf("webcomponents-ce")===-1){(function(){var a=require.toUrl(window.CUSTOMELEMENTS_JS_VERSION||"DS/webcomponentsjs-2.2.7/bundles/webcomponents-ce");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/SMAProcSP/VENCustomElements":a},shim:{"DS/SMAProcSP/VENCustomElements":{exports:"customElements"}}})})()}}define("DS/SMAProcSP/CustomElements",["DS/SMAProcSP/VENCustomElements"],function(a){return a});