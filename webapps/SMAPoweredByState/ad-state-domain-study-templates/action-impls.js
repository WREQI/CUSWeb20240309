/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-utils","DS/SMAPoweredByState/ad-state-wc-adapter","DS/SMAPoweredByState/ad-state-domain-study-templates/selectors","UWA/Class/Promise"],function(f,b,d,c){var a={};var e=window.Promise||c;a.getStudyTemplates=function(){return new e(function(i,h){var j=function(l){var k=JSON.parse(l.response),m=[];if(k){m=k.map(function(n){return{id:n.id,title:n.title,description:n.description,lifecycleState:n.currentState,revision:n.revision,revisionComments:n.revisionComments,isLatestRevision:n.isLatestrevision}})}i(m)},g=function(k){h(f.buildError(d.ErrorCodes.STUDY_TEMPLATES_WS_ERROR,k))};b.callSMAProcService({uri:"/templates?templateType=type_Simulation&usage=Adhoc",onComplete:j,onError:g,sessionTimeoutInfo:{handler:h,context:null}})})};a.getTemplateOptions=function(g){return new e(function(j,i){var k=function(l){var m=JSON.parse(l.response);if(m){g.studyTemplate.options=m}j(g.studyTemplate)},h=function(l){i(f.buildError(d.ErrorCodes.STUDY_TEMPLATE_OPTIONS_WS_ERROR,l))};b.callSMAProcService({uri:"/templates/"+g.studyTemplate.id+"/options",onComplete:k,onError:h,sessionTimeoutInfo:{handler:i,context:null}})})};return a});