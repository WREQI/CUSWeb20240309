/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(h){var e=h.Polymer,j=h.DS;var k=null,l=null,i=null,a=null,m=null,b=null,f=null,n=null,c=null,g=null,d={cancel:"cancel",accept:"accept"};a=function(){this.hideDialog();this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).addClass("show");this.DOM(this.$.myModalOverlay).removeClass("hidden");this.fire("toggleSpinner",{});f.call(this)};m=function(){this.hideDialog();this.fire(d.cancel,{})};k=function(o){o.stopPropagation();o.cancelBubble=true;if(this.$.getProcessName.value===""){this.$.okButton.disabled=true}else{this.$.okButton.disabled=false;if(o.keyCode===13){a.call(this,o)}}};l=function(){this.DOM(this.$.myModal).toggleClass("in");this.DOM(this.$.myModal).addClass("show");this.DOM(this.$.myModal).removeClass("hidden");this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).addClass("show");this.DOM(this.$.myModalOverlay).removeClass("hidden");if(this.$.getProcessName.value===""){this.$.okButton.disabled=true}else{this.$.okButton.disabled=false}h.onkeydown=function(o){if(o.keyCode===27){this.hideDialog();h.onkeydown=null}}.bind(this);this.$.getProcessName.focus()};i=function(){this.DOM(this.$.myModal).toggleClass("in");this.DOM(this.$.myModal).removeClass("show");this.DOM(this.$.myModal).addClass("hidden");this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).removeClass("show");this.DOM(this.$.myModalOverlay).addClass("hidden")};g=function(p){var o={};o.type="error";o.text=p;o.autoRemove=true;if(h.widget){h.widget.dispatchEvent("onAppMessage",o)}};c=function(t,u,s){var p=this.$.spDash.getMcsUri();var r,o,q;r=function(w){this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).removeClass("show");this.DOM(this.$.myModalOverlay).addClass("hidden");this.fire("toggleSpinner",{});var v=JSON.parse(w.response);if(v[0]["Instantiated Process"]){this.fire("onObjectInstantiate",{processId:v[0]["Instantiated Process"],processName:t})}else{g.call(this,"Unable to create new study. Please verify the collaborative space selection in the preferences and try again.")}}.bind(this);o=function(){this.fire("toggleSpinner",{});this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).removeClass("show");this.DOM(this.$.myModalOverlay).addClass("hidden");g.call(this,"Web service error whilte creating new study. Please refresh the application or the browser and try again.")}.bind(this);q={verb:"POST",uri:p+"/resources/slmservices/templates/"+s+"/instantiate",headers:{"Content-Type":"application/json"},onComplete:r,onError:o,data:JSON.stringify(u)};this.$.templatesWS.sendRequest(q)};n=function(t,s){var p=this.$.spDash.getMcsUri();var r,o,q;r=function(u){var x=JSON.parse(u.response);var y=[];for(var w=0;w<x.length;w++){if(w!==2){y.push(x[w])}else{var v=x[w];v.value=t;v.modified="true";y.push(v)}}c.call(this,t,y,s)}.bind(this);o=function(){this.fire("toggleSpinner",{});this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).removeClass("show");this.DOM(this.$.myModalOverlay).addClass("hidden");g.call(this,"Unable to create new study. Please verify the collaborative space selection in the preferences and try again.")}.bind(this);q={varb:"GET",uri:p+"/resources/slmservices/templates/"+s+"/options",headers:{Accept:"application/json"},onComplete:r,onError:o};this.$.templatesWS.sendRequest(q)};f=function(){var q,o,p;var r,t;if(this.templatetype&&this.usage){r=this.templatetype;t=this.usage}this.$.okButton.disabled=true;var u=this.$.spDash.getMcsUri();var s=u+"/resources/slmservices/templates?templateType="+r+"&usage="+t;q=function(w){var v=JSON.parse(w.response);this.processes=v;for(var x=0;x<v.length;x++){if(v[x].title==="Empty Process"){this.emptyProcessId=v[x].id;if(this.$.getProcessName.value!==""){this.$.okButton.disabled=false}}else{this.$.okButton.disabled=true}}if(typeof this.emptyProcessId!=="undefined"){n.call(this,this.$.getProcessName.value,this.emptyProcessId)}else{this.fire("toggleSpinner",{});this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).removeClass("show");this.DOM(this.$.myModalOverlay).addClass("hidden");g.call(this,"The simulation experience that is required by Abaqus/Study was not installed on the 3DEXPERIENCE platform. Contact your Platform Manager for assistance.");console.log("No empty process")}}.bind(this);o=function(){this.$.okButton.disabled=true;this.fire("toggleSpinner",{});this.DOM(this.$.myModalOverlay).toggleClass("in");this.DOM(this.$.myModalOverlay).removeClass("show");this.DOM(this.$.myModalOverlay).addClass("hidden");g.call(this,"Failed to instantiate. Please refresh the application or the browser and try again.")}.bind(this);p={verb:"GET",uri:s,headers:{"Content-Type":"application/json"},onComplete:q,onError:o};this.$.getTemplatesWS.sendRequest(p)};b=function(o){o.stopPropagation();return false};j.SMAProcADUI=j.SMAProcADUI||{};j.SMAProcADUI.ADAddProcess=e({is:"ad-add-process",properties:{templatetype:{value:"",type:String},usage:{value:"",type:String},processes:{type:Array,value:[]},emptyProcessId:{type:String},dialogtitle:{type:String,value:"Process"}},onAccept:function(){return a.apply(this,arguments)},onCancel:function(){return m.apply(this,arguments)},showDialog:function(){return l.apply(this,arguments)},hideDialog:function(){return i.apply(this,arguments)},onProcessNameChange:function(){return k.apply(this,arguments)},onDragOver:function(){return b.apply(this,arguments)},onDrop:function(){return b.apply(this,arguments)},_computePlaceHolder:function(o){return o+" Name (Ex : My "+o+")"},behaviors:[j.SMAProcSP.SPBase]})}(this));