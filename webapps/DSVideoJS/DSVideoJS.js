/*! Copyright 2014 Dassault Syst�mes */
(function(){var a=require.toUrl("DS/VENVideoJSPlugins/6.6.0/plugins/");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/DSVideoJS/VENVideoJSPluginResolutionSwitcher":a+"resolutionswitcher/videojs-resolution-switcher.min"}})})();define("DS/DSVideoJS/DSVideoResolutionSwitcherPlugin",["DS/DSVideoJS/VENVideoJSPluginResolutionSwitcher","css!DS/DSVideoJS/VENVideoJSPluginResolutionSwitcher"],function(){return});
/*! Copyright 2014 Dassault Syst�mes */
(function(){var a=require.toUrl("DS/VENVideoJSPlugins/6.6.0/plugins/");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/DSVideoJS/VENVideoJSPluginThumbnail":a+"thumbnail/videojs.thumbnails.min"}})})();define("DS/DSVideoJS/DSVideoThumbnailPlugin",["DS/DSVideoJS/VENVideoJSPluginThumbnail","css!DS/DSVideoJS/VENVideoJSPluginThumbnail"],function(){return});
/*! Copyright 2014 Dassault Syst�mes */
if(typeof window.videojs==="function"){define("DS/VENBrightcoveVideoJS",window.videojs)}else{(function(){var a=require.toUrl("DS/VENBrightcoveVideoJS/6.6.0/");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/VENBrightcoveVideoJS":a+"video.min"},shim:{"DS/VENBrightcoveVideoJS":{exports:"videojs"}}})})()}define("DS/DSVideoJS/DSVideoJS",["DS/VENBrightcoveVideoJS","css!DS/VENBrightcoveVideoJS"],function(a){window.videojs=a;console.log("videojs loaded");return a});