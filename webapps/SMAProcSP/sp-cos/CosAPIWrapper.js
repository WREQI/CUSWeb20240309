/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
define("DS/SMAProcSP/sp-cos/CosAPIWrapper",[],function(){var a={};var d=function(f){var e=/^[0-9A-z\u00C0-\u00ff\s'"\.,-\/#!$%\^&\*;:{}=\-_`~()<>]+$/.test(f)?f:encodeURIComponent(f);return e};var b=function(f,e){require(["DS/WAFData/WAFData"],function(g){var h={headers:{},type:e&&e.type,onComplete:e.onComplete,onFailure:e.onFailure};if(e&&e.eedTicket){h.headers.EEDTICKET=e.eedTicket}for(var i in h.headers){if(h.headers.hasOwnProperty(i)){h.headers[i]=d(h.headers[i])}}g.request(f,h)})};var c=function(f,e){return f+e};a.request=b;a.isRunAsAsEnabled=function(h,g,e){var f=e||{};f.type="text";f.eedTicket=g;b(c(h,"/admin/runAsEnabled"),f)};a.getCosVersion=function(g,e){var f=e||{};f.type="json";b(c(g,"/admin"),f)};a.getStationList=function(g,e){var f=e||{};f.type="json";b(c(g,"/admin/station/query"),f)};return a});