/*! Copyright 2014 Dassault Syst�mes */
if(typeof window.jwplayer==="function"){define("DS/VENJWPlayer",window.jwplayer)}else{(function(){var a=require.toUrl("DS/VENJWPlayer/jwplayer-7.3.6/");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/VENJWPlayer":a+"jwplayer"},shim:{"DS/VENJWPlayer":{exports:"jwplayer"}}})})()}define("DS/DSJWPlayer/DSJWPlayer",["DS/VENJWPlayer"],function(a){window.jwplayer=a;return a});