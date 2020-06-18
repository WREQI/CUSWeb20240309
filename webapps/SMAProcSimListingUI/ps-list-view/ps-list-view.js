require(["UWA/Core","UWA/Class","UWA/Class/Options","UWA/Class/Events"],function(o,q,p,l){var k,r,i,h,m,c,f,j,b,d,a,s="SIMWDIS_AP",e="OnPremise",n={variable:"sp-variable"};function g(){}g.prototype.createSimulation=function(x,t){this.configMap=o.extend(this.configMap,{context:x});var z=new DOMParser();var v=this.configMap.runInfo;var w=z.parseFromString(v,"text/xml");var u=w.getElementsByTagName("RunInfo");u[0].setAttribute("logLevel",t);var y=u[0].outerHTML||new XMLSerializer().serializeToString(u[0]);this.configMap.runInfo=y.toString();return new this.Simulation(this.configMap)};g.prototype.configMap={jobXMLURL:null,cosPubkeyURL:null,encryptURL:null,mcsTicketURL:null,runInfo:null,context:null,timeout:150000};g.prototype.configureFactory=function(t){var u={eedBaseURL:t.eedBaseURL,runURL:t.eedBaseURL+"/execution/run/workflow",jobXMLURL:t.mcsWSBaseURL+"/jobs",cosPubkeyURL:t.eedBaseURL+"/execution/pubkey",encryptURL:t.mcsWSBaseURL+"/data/getEncryptedCreds",mcsTicketURL:t.mcsBaseURL+"/ticket/get",runInfo:"<RunInfo logLevel='Debug' submissionHost=''></RunInfo>",mcsURL:t.mcsBaseURL};o.extend(this.configMap,u)};g.prototype.Simulation=(function(){var t=q.extend(p,l,{init:function(u){u.tenantID=window.widget.getValue("tenantId");this.setOptions(u);this.alive=false;this._runSimulation(this.options)},_runSimulation:function(u){var w=new SPRun(),v=this;if(!w||!this.options){t.dispatchEvent("onError","error: Could not initialize sp-run.");return}w.runURL=u.runURL;w.jobXMLURL=u.jobXMLURL;w.cosPubkeyURL=u.cosPubkeyURL;w.encryptURL=u.encryptURL;w.mcsTicketURL=u.mcsTicketURL;w.runInfo=u.runInfo;w.mcsURL=u.mcsURL;w.simOID=u.context.id;w.timeout=u.timeout;w.tenantID=u.tenantID;w.addEventListener("success",function(x){v.dispatchEvent("onSuccess",x.detail)});w.addEventListener("error",function(x){v.dispatchEvent("onError",x.detail)});w.runSimulation(u.context,u.context.id,"",false)},onSuccess:function(v){var u=v.result;this.alive=true;this.id=u.EEDJobID;this.plmid=u.MCSJobID;this.ticket=u.EEDTicket;this.context=u.context;this.dispatchEvent("simulation:create",{id:this.id,context:this.context})},onError:function(u){this.alive=false;this.dispatchEvent("simulation:create:fail",{result:u,context:this.options.context})}});return t}());a=function(){var v=new XMLHttpRequest(),u=this.$.eedBaseURL.getValue(),t=u+"/admin/runAsEnabled";v.parent=this;if(u){v.open("GET",t,true);v.setRequestHeader("Accept","application/json, */*; q=0.01");v.setRequestHeader("EEDTicket",this.eedTicket);v.onreadystatechange=function(){if(v.readyState!==4){return}switch(v.status){case 200:appData.isRunAsEnabled=v.response;break;default:break}};v.send()}};d=function(){if(this.eedTicketData.ticket){this.eedTicket=this.eedTicketData.ticket;a.call(this)}};k=function(){var v,u;v=this.$.dashboard.getMcsUri();this.$.mcsBaseURL.setValue(v);u=v+"/resources/slmservices";this.$.mcsWSBaseURL.setValue(u);this.$.inDashBoard.setValue(this.$.dashboard.isInDashboard());var w=function(){var y=this,x=this.$.cosServer.getUrlForDefaultServer();y.$.eedBaseURL.setValue(x);this.$.eedTicketWs.getData();y.DOM(y).find(n.variable).forEach(function(z){y.globals[z.name]=z.getValue()});y.simulationFactory=new g();y.simulationFactory.configureFactory(y.globals)}.bind(this),t=function(){console.log("unable to get eedBaseUrl")};if(!this.$.cosServer.getUrlForDefaultServer()){this.$.cosServer.getCosConfiguration({onComplete:w,onFailure:t})}else{w.call(this)}};f=function(){if(!this.activeitem){return}var u=this;if(this.activeitem&&this.view==="maximized"){window.Polymer.dom(this.$.psSimulationProp).classList.add("active")}var t={protocol:"3DXContent",version:"1.0",source:s,data:{items:[{envId:u.$.platformid.getValue(),serviceId:"3DSpace",contextId:u.$.dashboard.getSecurityContext(),objectId:u.activeitem.id,objectType:"Simulation",displayName:u.activeitem.attributes.title}]}};window.require(["DS/i3DXCompassServices/i3DXCompassPubSub"],function(v){v.publish("setObject",t.data.items[0]);v.publish("set3DXContent",t)})};i=function(t){this.view="maximized";this.setStyle("height",t-10);window.Polymer.dom(this.$.psSimulationList).classList.add("maximized");if(this.activeitem){window.Polymer.dom(this.$.psSimulationProp).classList.add("active")}};h=function(t){this.view="minimized";this.setStyle("height",t);window.Polymer.dom(this.$.psSimulationList).classList.remove("maximized");window.Polymer.dom(this.$.psSimulationProp).classList.remove("active")};j=function(t){this.$.psSimulationList.setOwner(t.filter);this.$.psSimulationList.setMaxSimulations(t.limit);this.$.psSimulationList.onSettingsChange()};b=function(t){this.asyncFire("event-manager",{name:"collabspace-changed",data:t})};m=function(){this.$.psSimulationList.onRefresh()};c=function(u){var t=this;this.storages=u.detail.response.cstorage;window.require(["UWA/Utils"],function(w){var v=t.storages,x,z,y;for(x=0;x<v.length;x++){z=v[x];z.url=w.composeUrl(w.parseUrl(z.url))}t.$.platformid.setValue(v[0].id);t.$._3DSpaceServiceURL.setValue(v[0].url);y=v[0].id;if(y===e){t.DOM(t.$.psSimulationList).removeClass("de-featured");t.DOM(t).find(n.variable).forEach(function(A){t.globals[A.name]=A.getValue()})}})};r=function(t){var u=t.detail;require(["DS/TransientWidget/TransientWidget"],function(v){v.showWidget("SIMDISB_AP","Performance Study",JSON.parse(JSON.stringify({mode:"compare",simulations:u})))})};Polymer({is:"ps-list-view",properties:{activeitem:{type:Object,observer:"activeitemChanged",notify:true},globals:{type:Object,value:function(){return{}}},view:{type:String,value:"minimized",notify:true}},ready:function(){return k.apply(this,arguments)},attached:function(){this.$.licenseData.setValue(this.licenseDataCmn);this.globals[this.$.licenseData.name]=this.licenseDataCmn},setMaximizedView:function(){return i.apply(this,arguments)},setMinimizedView:function(){return h.apply(this,arguments)},onRefresh:function(){return m.apply(this,arguments)},initStorages:function(){return c.apply(this,arguments)},applyPreferences:function(){return j.apply(this,arguments)},collabSpaceChanged:function(){return b.apply(this,arguments)},activeitemChanged:function(){return f.apply(this,arguments)},onSimlistCompare:function(){return r.apply(this,arguments)},_computeEEDTicketUri:function(){return this.$.mcsBaseURL.getValue()+"/resources/slmservices/cos/ticket"},setEEDTicket:function(){return d.apply(this,arguments)},behaviors:[window.DS.SMAProcSP.SPBase]})});