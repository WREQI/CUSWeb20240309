/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
(function(e){var b,h,g,d,a,c,f;d="SecurityContext";a=new RegExp("\\?.*"+d+"=.+");c="tenant";f=new RegExp("\\?.*"+c+"=.+");b=function(j,l){var i="",k=null;if(j.isInDashboard()&&!a.test(l)){k=j.$.dashboard.getSecurityContext(j);if(k){i=(l.indexOf("?")>-1?"&":"?")+d+"="+encodeURIComponent(k)}}return i};h=function(i,j){var k="",l=null;if((i.isInDashboard()||e.dscef)&&!f.test(j)){l=i.$.dashboard.getCurrentPlatform()}if(l){k=(j.indexOf("?")>-1?"&":"?")+c+"="+encodeURIComponent(l)}return k};DS.SMAProcSP=DS.SMAProcSP||{};DS.SMAProcSP.SPMCSService=Polymer({is:"sp-mcsservice",behaviors:[e.DS.SMAProcSP.SPBase,e.DS.SMAProcSP.SPWebservice],properties:{checkTimeout:{type:Boolean,value:true},securityContext:{value:null,notify:true}},ready:function(){require(["DS/PlatformAPI/PlatformAPI"],function(i){g=i})},parseUri:function(j){var i,k,l;l=e.DS.SMAProcSP.SPWebservice.parseUri.call(this,j);i=b(this,l.postfix);l.postfix+=i;l.href+=i;k=h(this,l.postfix);l.postfix+=k;l.href+=k;return l},sendRequest:function(j){var i,m,k;var l=j.onComplete;var n=function(o){if(j&&j.physicalId){if(j.verb==="PUT"||j.verb==="POST"||j.verb==="DELETE"){g.publish("DS/SMAProcSP/mcsservice/modify",{physicalId:j.physicalId})}}if(l){l(o)}};j=j||{};k=j.uri||this.uri||"";i=b(this,k);k+=i;m=h(this,k);k+=m;j.uri=k;j.onSessionTimeout=j.onSessionTimeout||null;j.headersPreparedPromise=this.$.csrf.prepareHeaders(j);j.onComplete=n;return e.DS.SMAProcSP.SPWebservice.sendRequest.call(this,j)},getSecurityContext:function(i){return this.$.dashboard.getSecurityContext.call(this,i)}})}(this));