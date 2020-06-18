/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
define(["UWA/Promise","DS/SMAPoweredByState/ad-state-redux-observer","DS/SMAPoweredByState/ad-state-utils","DS/SMAPoweredByState/ad-state-defs","DS/SMAPoweredByState/ad-state-wc-adapter","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByState/ad-state-domain-job-types/selectors","DS/SMAPoweredByState/ad-state-app/selectors"],function(e,k,b,f,s,l,h,i){var r={},d=25000,g=[],n=new k();var c=window.Promise||e;function p(t,u){if(("upload"===t.type)||(t.title&&(t.title.indexOf(l.DATA_TRANSFER_KEY)===0)&&(t.description.indexOf("Upload")===0))){u.kind=l.JobKind.UPLOAD}else{if(("download"===t.type)||(t.title&&(t.title.indexOf(l.DATA_TRANSFER_KEY)===0)&&(t.description.indexOf("Download")===0))){u.kind=l.JobKind.DOWNLOAD}else{if(t.title&&(t.title.indexOf(l.DATA_TRANSFER_KEY)===0)){u.kind=l.JobKind.GENERATE_RESULT}else{u.kind=l.JobKind.TOOL}}}}function q(t,u){return new c(function(w,v){n.waitFor({store:u,timeout:d,select:function(x){return l.jobWithID(x,t)},isResolved:function(x){return((x!==null)&&(x.jobType!==null))}}).then(w,v)})}function o(u){var t=h.jobTypeWithID(u.store.getState(),u.jobTypeId),v=null;if(t&&t.handler){v=t.handler}else{v=(i.hasLicense(u.store.getState(),i.AppLicenses.SIMULATION_COMPANION))?"DS/SMAPoweredByHandler/default/ADDefaultHandler":"DS/SMAPoweredByHandler/abaqus/ADAbaqusHandler"}return new c(function(w){if(g[v]){if(g[v].store!==u.store){g[v].store=u.store}w(g[v])}else{require([v],function(x){g[v]=new x(u.store);w(g[v])})}})}function a(u,v){var t=v.attributes.definition.flowItem.ActivityConfig.properties.jobType;return h.jobTypeWithTitleRevision(u,t.title,t.revision).id}function j(u,t){return new c(function(w){var v=l.jobWithID(u.getState(),t).jobType;if(v===null){q(t,u).then(function(){w(l.jobWithID(u.getState(),t).jobType)})}else{w(v)}})}function m(t){return new c(function(u){if(t.jobTypeId){u(t)}else{if(t.plmActivity){t.jobTypeId=a(t.store.getState(),t.plmActivity);u(t)}else{if(t.jobId){j(t.store,t.jobId).then(function(v){t.jobTypeId=v;u(t)})}else{u(t)}}}})}r.createTempJobFromPLMJob=function(t){var u={persistenceStatus:f.PersistenceStatus.CLEAN,id:(t.physicalId&&(t.physicalId.length>0))?t.physicalId:null,eedJobID:(t.eedJobId&&(t.eedJobId.length>0))?t.eedJobId:null,owner:t.owner,kind:l.JobKind.TOOL,jobType:null,title:(t.title&&(t.title.length>0))?t.title:"",description:(t.description&&(t.description.length>0))?t.description:"",ready:true,started:t.startTimeMillis?parseInt(t.startTimeMillis):0,ended:t.endTimeMillis?parseInt(t.endTimeMillis):0,status:t.status,inputs:[],mainInputFile:null,outputs:[],configuration:{},resultsOptions:{},executionOptions:{}};p(t,u);if(t.eedServerName&&(t.eedServerName.length>0)){u.executionOptions.server=t.eedServerName}u._plmJob=t;return u};r.getHandler=function(t){return n.waitFor({store:t.store,select:h.jobTypesPersistenceOperation,isResolved:function(u){return(u===null)}}).then(function(){return m(t)}).then(o)};r.createProgressFromCOSJobSummary=function(v){var u={},t;if(v&&v["@nFinished"]){u.totalSteps=5;t=parseInt(v["@nFinished"],10);u.stepsCompleted=!isNaN(t)?t:0;u.currentStepProgress=0;if(u.totalSteps){u.overallProgress=Math.round((u.stepsCompleted/u.totalSteps)*100)}else{u.overallProgress=0}}return u};r.createProgressFromMCSJobSummary=function(){var t={totalSteps:5,currentStepProgress:0,overallProgress:100};return t};r.clearCache=function(){g=[]};return r});