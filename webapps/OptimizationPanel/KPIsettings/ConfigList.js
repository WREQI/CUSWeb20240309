define("DS/OptimizationPanel/KPIsettings/ConfigList",["DS/OptimizationPanel/KPIsettings/ConfigComponent","DS/CoreEvents/ModelEvents","css!DS/OptimizationPanel/KPIsettings/PanelKPI.css"],function(a,c){var b=function(d){this._parentModelEvents=d&&d.modelEvents?d.modelEvents:"other";this._id=d&&d.id?d.id:"other";this._myModelEvents=new c();this._myModelEvents.id=d.id;this._meExt=d&&d.meExt?d.meExt:"other ext channel";this._init(d)};b.prototype._init=function(d){this._configList=d&&d.modelC0.tabId[this._id].configList?d.modelC0.tabId[this._id].configList:[];this._initDom(d)};b.prototype._initDom=function(e){this._content=document.createElement("div");this._content.classList.add("config-list");this._subscribeEvents(e);if(this._configList.length===0){e.modelC0.tabId[this._id].configList=[]}else{for(var d=0;d<this._configList.length;d++){this._config[d]=new a({name:e.modelC0.defConfig[this._configList[d]].name,modelEvents:this._parentModelEvents,current:this._configList[d]===e.modelC0.current,myME:this._myModelEvents,id:this._configList[d],modelC0:e.modelC0});this._config[d].inject(this._content);this._activeConfig=e.modelC0.current}}};b.prototype._subscribeEvents=function(e){this._listSubscription=[];this._listSubscription2=[];this._config=[];var d=this;d._listSubscription.push(d._parentModelEvents.subscribe({event:"optimkpipresenter-create-config"},function(l){var h=document.querySelectorAll(".config-content");var n=h.length;var k=[];var f;if(n){for(var j=0;j<h.length;j++){k[j]=parseInt(h[j].id.substring(6,8))}f=Math.max.apply(null,k);f=f+1}else{f=0}if(l.id===d._myModelEvents.id){var m="config"+(l.config+""+f).substring(14,16);d._config[f]=new a({name:l.config+""+f,modelEvents:d._parentModelEvents,current:true,myME:d._myModelEvents,id:m,modelC0:e.modelC0});d._config[f].inject(d._content);var g=d._content.querySelector("#"+m);e.modelC0.tabId[d._id].configList.push(m);e.modelC0.defConfig[m]={id:m,name:g.firstChild.lastChild.innerHTML,definition:l.def};d._parentModelEvents.publish({event:"config-created",data:e.modelC0.defConfig[m]})}}));d._listSubscription.push(d._parentModelEvents.subscribe({event:"config-current-change"},function(f){if(f!="zeroActive"){e.modelC0.current=f;d._activeConfig=f;d._meExt.publish({event:"current-config-active",data:d._activeConfig})}else{d._activeConfig=null;d._meExt.publish({event:"current-config-active",data:d._activeConfig})}}));d._listSubscription2.push(d._myModelEvents.subscribe({event:"delete-config"},function(h){var g=d._content.querySelector("#"+h);d._content.removeChild(g);d._parentModelEvents.publish({event:"delete-config",data:h});delete e.modelC0.defConfig[h];for(var f=0;f<e.modelC0.tabId[d._id].configList.length;f++){if(e.modelC0.tabId[d._id].configList[f]==h){e.modelC0.tabId[d._id].configList.splice(f,1)}}var j=g.lastChild.firstChild.getAttribute("checked");if(j==="true"){d._activeConfig=null;d._meExt.publish({event:"current-config-active",data:d._activeConfig});e.modelC0.current=null}}));d._listSubscription.push(d._parentModelEvents.subscribe({event:"config-name-change"},function(f){d._meExt.publish({event:"config-name-change",data:f})}))};b.prototype.inject=function(d){d.appendChild(this._content)};b.prototype.destroy=function(){var e=0;this._length=this._listSubscription.length;for(e=0;e<this._length;e++){this._parentModelEvents.unsubscribe(this._listSubscription[e])}this._length2=this._listSubscription2.length;for(e=0;e<this._length2;e++){this._myModelEvents.unsubscribe(this._listSubscription2[e])}this._length3=this._content.children.length;for(e=0;e<this._length3;e++){for(var d=0;d<this._config.length;d++){if(this._config[d]!=undefined){this._config[d].destroy()}}}this._content=null};return b});