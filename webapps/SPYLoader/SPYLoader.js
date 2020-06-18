/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
define("DS/SPYLoader/AbstractLoader",["UWA/Core","UWA/Class","DS/CoreEvents/Events"],function(d,b,c){var a=b.extend({_cleanCompleteCb:function(){if(this._sequenceCreatedCB){c.unsubscribe(this._sequenceCreatedCB);delete this._sequenceCreatedCB}},_cleanErrorCb:function(){if(this._sequenceErrorCB){c.unsubscribe(this._sequenceErrorCB);delete this._sequenceErrorCB}},_loadSequence:function(f){if(f){this._listObjToLoad.push(f)}if(this._loading){return}if(this._listObjToLoad.length===0){return}var e=this._listObjToLoad.shift();this._loading=true;this._dmFactory.createSequence(e,this._spm)},_loadModel:function(){},init:function(){this._parent();this._loading=false;this._listObjToLoad=[];this._blobsToRevoke=[];this._report={}},clean:function(){this._cleanCompleteCb();this._cleanErrorCb();this._spm=null;this._listObjToLoad=[];this._blobsToRevoke.forEach(function(e){URL.revokeObjectURL(e)});this._blobsToRevoke=[];delete this._dmFactory;this._report={}},onUnstreamComplete:function(e,f){this._cleanCompleteCb();this._sequenceCreatedCB=c.subscribe({event:e+"/SPY/SEQUENCE/CREATED"},function(g){if(this._report&&g){this._report.filteredDDNb=g.filteredDDNb}f(g)}.bind(this))},onUnstreamError:function(e,f){this._cleanErrorCb();this._sequenceErrorCB=c.subscribe({event:e+"/SPY/SEQUENCE/ERROR"},function(g){if(this._report){if(g&&g.errorCode==="FILTEREDCONTENT"){this._report.filteredContent=true}else{if(isNaN(this._report.invalidStreamNb)){this._report.invalidStreamNb=0}this._report.invalidStreamNb++}}this._loading=false;f()}.bind(this))},onQueryStart:function(e,f){this._onQueryStart=f},onQueryProgress:function(e,f){this._onQueryProgress=f},onUnstreamStart:function(e,f){this._onUnstreamStart=f},onFileNotSupported:function(e,f){this._onFileNotSupported=f},onQueryError:function(e,f){this._onQueryError=f},onTimeOut:function(e,f){this._onTimeOut=f},load:function(f,e,g){require([e],function(s){var n;var h;var q=function(){};var j=this._onFileNotSupported?this._onFileNotSupported:q;var v=this._onUnstreamStart?this._onUnstreamStart:q;var u=this._onTimeOut?this._onTimeOut:q;this._dmFactory=new s();this._spm=g;var o=this.getReport();o.streamNb=0;if(f.provider==="FILE"){var m=f.filename;var k=new RegExp("[;]+","g");var l=m.split(k);o.streamNb=l.length;for(var p=0;p<l.length;p++){h=l[p];if(h.indexOf("blob",0)!==0&&h.indexOf("simxml",0)<0&&h.indexOf("nas",0)<0&&h.indexOf("inp",0)<0){j()}n={provider:"FILE",filename:h,serverurl:"",proxyurl:"none",requiredAuth:null};v();this._loadSequence(n)}}else{if(f.provider==="BLOB"){if(f.blob instanceof Blob){o.streamNb=1;n={provider:"BLOB",blob:f.blob};v();this._loadSequence(n)}else{}}else{if(f.provider==="EV6"||f.provider==="3DSPACE"){if(this._onQueryStart){this._onQueryStart()}var r=this._onQueryProgress?this._onQueryProgress:q;var t=this._onQueryError?this._onQueryError:q;this._loadModel(f,r,function(w){if(o){if(!isNaN(o.streamTimeOut)){u()}}if(w.length>0){v();var y=new RegExp("[;]+","g");var z=w.split(y);for(var x=0;x<z.length;x++){w=z[x];if(w.indexOf("blob",0)!==0&&w.indexOf("simxml",0)<0){j();return}n={provider:"FILE",filename:w,serverurl:"",proxyurl:"none",requiredAuth:null};this._loadSequence(n)}}}.bind(this),t)}}}}.bind(this))},isLoadingComplete:function(){return(this._listObjToLoad.length===0&&!this._loading&&!this._spm.loading)},continueLoading:function(){this._loading=false;this._loadSequence()},getReport:function(){return this._report},resetReport:function(){this._report={}}});return a});define("DS/SPYLoader/SPYLoader",["UWA/Core","UWA/Class","DS/SPYLoader/AbstractLoader"],function(e,b,a){var d=120000;var c=a.singleton({_loadModel:function(f,i,h,g){this._onFinish=h;var j=this;require(["DS/DataAccess/zxSimuliaLightweightRunner","DS/DataAccess/zxXHRWithProxyAbstraction","DataAccess/zxDataAccessObjectFactory","DataAccess/zxPlanRunner","DataAccess/zxTaskPlanner","DataAccess/zxTreeTarget","DataAccess/zxExpandTask","DataAccess/zxNode"],function(p,x,w,l,n,o,s,u){if(f.requiredAuth){x.useUWAProxy(f)}else{if(!f.proxyurl||f.proxyurl==="none"){x.useNoProxy()}else{x.useNoProxy()}}var t=f.physicalid;var m=document.createElement("a");m.href=f.serverurl;var v={};v.serverurl=f.serverurl;v.tenant=f.tenant;v.hostname=m.hostname;v.rooturi=m.pathname;v.rooturi=v.rooturi.replace("/","");v.protocol=m.protocol;v.protocol=v.protocol.replace(":","");v.port=m.port===""?undefined:m.port;var r=w.createSimLWObjectSpecification(t,v);r.serverurl=f.serverurl;r.tenant=f.tenant;r.requiredAuth=f.requiredAuth;j._finalurl="";var k=new p(r,function(y){if(y.indexOf("SimNavData_")!==-1){return true}return false},function(y){if(y===0){g("NOSTREAM");j._report.noStream=true}else{j._report.streamNb=y;j._streamIdx=1;j._loadTimeOutId=setTimeout(function(){j._report.streamTimeOut=j._streamIdx;clearTimeout(j._loadTimeOutId);j._onFinish(j._finalurl)},d)}},function(A){clearTimeout(j._loadTimeOutId);var y;if(window.MSBlobBuilder){var C=new MSBlobBuilder();C.append(A);y=C.getBlob("application/zip")}else{var B=new DataView(A);y=new Blob([B],{type:"application/zip"})}var z=URL.createObjectURL(y);j._blobsToRevoke.push(z);if(j._finalurl.length>0){j._finalurl+=";"}j._finalurl+=z;if(j._streamIdx<j._report.streamNb){j._streamIdx++;j._loadTimeOutId=setTimeout(function(){j._report.streamTimeOut=j._streamIdx;clearTimeout(j._loadTimeOutId);j._onFinish(j._finalurl)},d)}});var q=function(){var E=new n();var D=new s(r.physicalid,r.serverdefinition);E.addSequentialTask(D);var B=function(){var F=null;var G=null;return{rootNode:F,geometryNodes:G}};E.addEndingTask(B);var y=function(){k.run(function(F){i(F)},function(){clearTimeout(j._loadTimeOutId);h(j._finalurl)},function(F){g(F)})};var C=function(){g("NOACCESS")};var A=new o({},function(F){return F==="Node"?new u():undefined});var z=new l(E,A,function(){},function(){if(A.countObjects()>1){y()}else{C()}},C);z.executePlan()};if(window.HybridApp&&window.HybridApp.isIOS()&&!j.dummyHybridIOS){window.HybridApp.__getHttpNativeDelegate().then(function(z){var y={url:encodeURI(f.serverurl+"/i3dx/services/xmql?tenant="+f.tenant),method:"GET"};z.execute("httpRequest",y).then(function(){q()},function(){q()})},function(){})}else{q()}})}});return c});