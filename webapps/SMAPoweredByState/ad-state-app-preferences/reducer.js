/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-app-preferences/action-types","DS/SMAPoweredByState/ad-state-utils"],function(e,c){var b={};const a={defaultJobType:(window.widget&&window.widget.getValue("defaultJobType")?window.widget.getValue("defaultJobType").value:null)};function d(g,f){var h={};if(typeof g==="undefined"){h=c.deepCopy(a)}else{switch(f.type){case e.SET_DEFAULT_JOB_TYPE:if(g.defaultJobType!==f.id){h.defaultJobType=f.id}else{h=g}break;default:h=g;break}}return h}b["default"]=d;return b});