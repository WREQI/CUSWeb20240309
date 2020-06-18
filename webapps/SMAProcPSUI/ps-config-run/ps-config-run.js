(function(j){var e=5;var n=function(){var r=this.$.dashboard.getMcsUri();this.globals.mcsBaseURL=r;this.$.mcsBaseURL.setValue(r);var q=r+"/resources/slmservices";this.globals.mcsWSBaseURL=q;this.$.mcsWSBaseURL.setValue(q);this.credFields=[{label:"Domain Name",name:"domainName",type:"text"},{label:"Windows Username",name:"windowsUser",type:"text"},{label:"Windows Password",name:"windowsPass",type:"password"},{label:"Linux Username",name:"linuxUser",type:"text"},{label:"Linux Password",name:"linuxPass",type:"password"},{label:"Isight Username",name:"isightV5User",type:"text"},{label:"Isight Password",name:"isightV5Password",type:"password"}];this.fire("configrunready")},k=function(){if(this.$.ws.data){this.$.eedBaseURL.setValue(this.$.ws.data.url);this.globals.eedBaseURL=this.$.ws.data.url}},m=function(){this.errorText="";this.$.errorMsgContent.style.visibility="hidden"},l=function(){var q=this.$.ConfigureAndRun,r=q.querySelectorAll("[credential]"),s="";s=h.call(this,r);if(s!==""){this.errorText=s;this.$.errorMsgContent.style.visibility="visible";return}else{this.$.errorMsgContent.style.visibility="hidden"}f.call(this)},f=function(){var v=this.$.ConfigureAndRun,t,s,y=v.querySelectorAll("[credential]");this.credentials={};for(var r=0;r<y.length;r+=1){var q=y[r].getAttribute("id"),x=y[r].value;if(x&&x.length>0){this.credentials[q]=x}}var w=this.simulations.length>5?5:this.simulations.length;e=5;for(t=0;t<w;t+=1){s=this.simulations[t];this.$.simOptionsWs.uri=this.$.mcsBaseURL.getValue()+"/resources/e6w/service/SMA_SimExeOption?objectId="+s;this.$.simOptionsWs.getData()}var u=this.getParents("ps-simulation-list")[0];this.selectedSimUIItems.forEach(function(z){z.parentElement.update("run-started");z.simitem.isJobQueued=true;u.removeDragEvent(z);u.addDragEvent(z)});v.hide()},d=function(){if(this.simulations.length>5&&e<this.simulations.length){console.log("calling runAs---------------------------------------------------------",e);var q=this.simulations[e];this.$.simOptionsWs.uri=this.$.mcsBaseURL.getValue()+"/resources/e6w/service/SMA_SimExeOption?objectId="+q;this.$.simOptionsWs.getData();e=e+1}},o=function(){if(j.widget){return j.widget.getValue("tenantId")}else{return appData.WUPlatformId}},p=function(){var x=this.$.simOptionsWs.data,w="Information",u=x.objectId,v=new j.DS.SMAProcSP.SPRun(),t=this;var q=x.datarecords.datagroups[0].dataelements;if(q&&q.logLevel&&q.logLevel.value[0]&&q.logLevel.value[0].value){w=q.logLevel.value[0].value}v.runURL=this.globals.eedBaseURL+"/execution/run/workflow";v.jobXMLURL=this.globals.mcsWSBaseURL+"/jobs";v.cosPubkeyURL=this.globals.eedBaseURL+"/execution/pubkey";v.encryptURL=this.globals.mcsWSBaseURL+"/data/getEncryptedCreds";v.mcsTicketURL=this.globals.mcsBaseURL+"/ticket/get";v.tenantID=o();if(w){if(w==="SysError"){v.runInfo="<RunInfo logLevel='System Error' submissionHost=''></RunInfo>"}else{v.runInfo="<RunInfo logLevel='"+w+"' submissionHost=''></RunInfo>"}}else{v.runInfo="<RunInfo logLevel='Information' submissionHost=''></RunInfo>"}v.mcsURL=this.globals.mcsBaseURL;v.simOID=u;v.timeout="150000";var s={context:{id:u}};v.addEventListener("success",function(y){b.call(t,y);t.asyncFire("event-manager",{name:"job-started",data:s})});v.addEventListener("error",function(y){a.call(t,y)});var r={simulationId:u};if(JSON.stringify(this.credentials)==="{}"){v.runSimulation(r,u,"")}else{v.runSimulationAs(r,u,"",false,this.credentials)}},h=function(w){var v=0,q={},t={},y="",s,u,r;for(s=0;s<w.length;s+=1){if(w[s].value!==""&&w[s].value!==undefined){t[w[s].id]=w[s].value}else{t[w[s].id]=null}}q.windows=g(t.windowsUser,t.windowsPass);q.linux=g(t.linuxUser,t.linuxPass);q.isightV5=g(t.isightV5User,t.isightV5Password);if(t.isightV5Password){var x=this.$.spEncryption.encryptAESCBC("ENCYPTION2345",t.isightV5Password);sessionStorage.setItem("IsightPwd",x);sessionStorage.setItem("isightV5User",t.isightV5User)}for(u in q){if(q.hasOwnProperty(u)){for(r in q[u]){if(q[u].hasOwnProperty(r)){if(r==="isEntered"&&q[u][r]===true){v=v+1}else{if(r==="isValid"&&q[u][r]===false){y="Username or Password is missing"}}}}}}this.$.credentials.setValue(t);if(v>0){return y}else{return""}},g=function(u,r){var s=false,t=false,q={};if(u===null&&r===null){s=true;t=false}if(u!==null&&r!==null){s=true;t=true}if(u===null&&r!==null||u!==null&&r===null){t=true}q={isValid:s,isEntered:t};return q},b=function(r){var q,s={};this.runNextSimulation();if(r.detail.result){q=r.detail.result;s.simId=q.context.simulationId,s.MCSJobID=q.MCSJobID,s.eedjobId=q.EEDJobID;s.state="Initializing";this.fire("simulationstarted",s)}r.stopPropagation()},a=function(v){var u,s,r="Unexpected character '%' (code 37) in prolog; expected '<'",s=v.detail.result.context,t;t=s.simulationId;if(v.detail.status===0){u="Your job failed to start.Please contact your administrator to confirm that the execution engine is running, then abort your job to try starting it again."}else{if(v.detail.status===404){u="Your job failed to start.Please contact your administrator to confirm that web services are deployed, then abort your job to try starting it again."}else{if(v.detail.status===500){u=v.detail.response;if(r===u.substring(0,r.length)){u="Your job failed to start.Please rename your job if it contains non latin characters, then abort your job to try starting it again."}}}}if(u&&u.length>500){u=u.substring(0,500)}var q={simId:t,error:u};this.fire("simulationfailed",q);v.stopPropagation()},i=function(){var q={};q=this.$.credentials.getValue();if(q){this.querySelector("#domainName").value=q.domainName;this.querySelector("#windowsUser").value=q.windowsUser;this.querySelector("#windowsPass").value=q.windowsPass;this.querySelector("#linuxUser").value=q.linuxUser;this.querySelector("#linuxPass").value=q.linuxPass;this.querySelector("#isightV5User").value=q.isightV5User;this.querySelector("#isightV5Password").value=q.isightV5Password}},c=function(q,s){if(q){this.simulations=q;this.selectedSimUIItems=s}if(!this.simulations){alert("Simulation ID's are not passed");return}var r=this.simulations.length;this.modalHeader="Configure And Run ("+r+" Simulations)";this.settingStoredCredetialsFromSession();this.$.ConfigureAndRun.show();this.errorText="";this.$.errorMsgContent.style.visibility="hidden"};Polymer({is:"ps-config-run",properties:{globals:{type:Object,value:function(){return{}}},simulations:{type:Array,value:function(){return[]}},modalHeader:{type:String,value:""}},behaviors:[DS.SMAProcSP.SPBase],ready:n,useSimOptionsLogLevel:p,cosURLReady:k,getWUTenantId:o,showConfigDialog:c,configureAndRun:l,onFocusRunAsTextField:m,onRunStarted:b,onRunError:a,settingStoredCredetialsFromSession:i,runNextSimulation:d,errorForSimOptions:function(s){if(s.detail.status){var r=s.detail.uri.split("?")[1].split("&")[0].replace("objectId=","");var t=this.getParents("ps-simulation-list")[0];var u;var q=t.querySelectorAll("ps-simulation-item");[].forEach.call(q,function(v){if(v.simitem.id===r){u=v;return false}});u.parentElement.done();u.set("simitem.$state","is-failingtorun");u.set("simitem.message","Simulation failed to run");setTimeout(function(){u.set("simitem.$state","")},5000)}}})}(this));