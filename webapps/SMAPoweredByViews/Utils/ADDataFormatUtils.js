define("DS/SMAPoweredByViews/Utils/ADDataFormatUtils",["UWA/Utils/InterCom","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByState/ad-state-defs","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors","i18n!DS/SMAPoweredByViews/assets/nls/ADJobCollection"],function(q,g,l,c,p){var e={},j={standalone:"Standalone",optionValue:"Option-Value",standaloneValue:"Standalone-Value"},o={folder:"Simulation Folder",vDocument:"Simulation Document - Versioned",nvDocument:"Simulation Document - NonVersioned",file:"file",fileversion:"fileversion",rdocument:"Document",core_reference:"PLMCoreReference",rep_reference:"PLMCoreRepReference",vpm_reference:"VPMReference",physical_product:"Physical Product",designsight:"DesignSight",physics_simulation:"Physics Simulation"},b=null,f=function(r){return typeof r.name!=="undefined"?r.name:r.title},k=function(){var r=null,t=null,s="com.ds.compass";if(!b){if(window.widget){r="com.ds."+window.widget.id;t=window.parent}else{r="compassEventSocket";t=window.getTopWindow?window.getTopWindow():window}b=new q.Socket(r);b.subscribeServer(s,t)}return b},n=function(r,t){var s=null;if(r.claimed===false){s=p.WaitingForStation}else{if(typeof r.stepsCompleted!=="undefined"){s=t[r.stepsCompleted+1]}}return s},m=function(r){var s={};switch(r){case g.JobStatus.ATTEMPTING_RUN:s.icon="progress-0";s.status=s.tooltip=p.Starting;break;case g.JobStatus.RUN_ACCEPTED:case g.JobStatus.CREATED:case g.JobStatus.INITIALIZING:s.icon="progress-1";s.status=s.tooltip=p.Starting;break;case g.JobStatus.NOTSTARTED:s.status=s.tooltip=p.NotStarted;s.icon="cancel-circled";break;case g.JobStatus.STARTED:case g.JobStatus.RUNNING:s.icon="progress-2";s.status=s.tooltip=p.Running;break;case g.JobStatus.DONE:case g.JobStatus.COMPLETED:s.icon="check";s.status=s.tooltip=p.Completed;break;case g.JobStatus.DEFERRED:case g.JobStatus.QUEUED:s.icon="pause";s.status=s.tooltip=p.Queued;break;case g.JobStatus.PAUSED:s.icon="pause";s.status=s.tooltip=p.Paused;break;case g.JobStatus.STOPPING:s.icon="minus";s.status=s.tooltip=p.Stopping;break;case g.JobStatus.ABORTED:s.icon="minus";s.status=s.tooltip=p.Aborted;break;case g.JobStatus.FAILED:case g.JobStatus.SYSTEM_FAILED:s.icon="cancel-circled";s.status=s.tooltip=p.Failed;break;default:s.status=s.tooltip=p.Unknown;break}return s},i=function(t,s,u){var v=(t.progress&&u.length>0)?n(t.progress,u):null,r=t.status===g.JobStatus.STARTED||t.status===g.JobStatus.RUNNING||t.status===g.JobStatus.DEFERRED||t.status===g.JobStatus.QUEUED||t.status===g.JobStatus.PAUSED;if(v&&r){s.status=s.tooltip=s.tooltip+": "+v}return s},h=function(u,t){var r=e.timeAgo(u.ended!==null?u.ended:u.started),s=u.status===g.JobStatus.DONE||u.status===g.JobStatus.COMPLETED||u.status===g.JobStatus.ABORTED||u.status===g.JobStatus.FAILED||u.status===g.JobStatus.SYSTEM_FAILED;if(r&&s){t.status=t.tooltip=t.tooltip+" ("+r+")"}return t},d=function(t,s,r){switch(r){case"custom":return t.getElementsByClassName(s)[0].actualValue;case"text":return t.getElementsByClassName(s)[0].innerHTML.toLowerCase().replace(",",".");default:return t.getElementsByClassName(s)[0].innerHTML.toLowerCase().replace(",",".")}};e.getFileIconBkg=function(r){switch(r.type){case o.folder:return"file-type-inputs file-type-folder";case o.file:return r.latestVersionInvalid?"file-type-inputs file-type-invalidfile":"file-type-inputs file-type-file";case o.core_reference:case o.rep_reference:case o.vpm_reference:case o.physical_product:return"file-type-inputs file-type-part";case o.designsight:case o.physics_simulation:return"file-type-inputs file-type-simulation";default:return"file-type-inputs file-type-file"}};var a=function(r){var t=this._NLS.File,s=[];if(r.latestVersionInvalid){t=t+" - "+this._NLS.InvalidLatest}else{if(r.referenced){s.push(this._NLS.Referenced)}if(!Array.isArray(r.versions)){s.push(this._NLS.NonVersioned)}if(s.length>0){t=t+" ("+s.join(", ")+")"}}return t};e.getTypeToolTip=function(r){switch(r.type){case o.file:case o.fileversion:return a.call(this,r);case o.folder:return this._NLS.Folder;case o.rdocument:return this._NLS.Document;case o.core_reference:case o.rep_reference:case o.vpm_reference:case o.physical_product:return this._NLS.Part;case o.designsight:case o.physics_simulation:return this._NLS.Simulation;default:return null}};e.formatFileSize=function(s){if(typeof s===undefined||!s){s=0}var r=s/1000;r=Number(r.toFixed(2));var u=r/1000;u=Number(u.toFixed(2));var t=u/1000;t=Number(t.toFixed(2));if(t>=1){return t+" "+p.GB}else{if(u>=1){return u.toString()+" "+p.MB}else{return r.toString()+" "+p.KB}}};e.timeAgo=function(s){var u=new Date().getTime();if(typeof s===undefined||!s){s=u}var r=u-s,v=Math.round(r/1000),t=Math.round(v/60),z=Math.round(t/60),y=Math.round(z/24),w=Math.round(y/30),x=Math.round(w/12);if(r<0){return p.JustNow}else{if(v<10){return p.JustNow}else{if(v<45){return v+" "+p.SecondsAgo}else{if(v<90){return p.AMinuteAgo}else{if(t<45){return t+" "+p.MinutesAgo}else{if(t<90){return p.AnHourAgo}else{if(z<24){return z+" "+p.HoursAgo}else{if(z<36){return p.ADayAgo}else{if(y<30){return y+" "+p.DaysAgo}else{if(y<45){return p.AMonthAgo}else{if(w<12){return w+" "+p.MonthsAgo}else{if(w<18){return p.AYearAgo}else{return x+" "+p.YearsAgo}}}}}}}}}}}}};e.getFileExtension=function(t){var r=".";if(!t||t.indexOf(r)===-1){return""}var s=t.split(".").pop().toUpperCase();return s==="undefined"?"":s};e.getFileType=function(r){var s=r.type;if(r.type===c.Types.FILE||r.type===c.Types.FILEVERSION){s=e.getFileExtension(f(r))}else{if(r.type===c.Types.SIMULATION_OBJECT){s=p.SimulationObject}}return s};e.sortTable=function(v,x,y,t,w){var D,u,C,B,A,z;if(this._lastColumnSorted&&this._lastColumnSorted===x&&this._lastAscend===true){v=false}else{v=true}D=y.getElementsByTagName("tr");u=true;if(v){this.DOM(t.children[1]).removeClass("hidden");this.DOM(t.children[0]).addClass("hidden")}else{this.DOM(t.children[0]).removeClass("hidden");this.DOM(t.children[1]).addClass("hidden")}while(u){u=false;for(var s=0;s<D.length-1;s++){C=D[s];B=D[s+1];A=d(C,x,w);z=d(B,x,w);if(!isNaN(A)){A=parseFloat(A);z=parseFloat(z)}if(v?A>z:A<z){y.insertBefore(B,C);u=true}}}this._lastColumnSorted=x;this._lastAscend=v};e.formatTimestamp=function(t){var s="";if(t){var r=new Date(t);s=r.toLocaleString()}return s};e.getFormattedJobData=function(s,t){var r=m(s.status);r=i(s,r,t);r=h(s,r);if(s.persistenceOperation===l.PersistenceOperation.DELETING){r.icon="trash";r.status=r.tooltip=p.Deleting}if(s.uninitialized){r.icon="hourglass";r.status=r.tooltip=p.Loading}return r};e.getLoadingJobData=function(){return{image:"",status:"Loading",displayStatus:p.Loading,icon:"hourglass"}};e.format3DPlayData=function(r,s){return{protocol:"3DXContent",version:"0.1",source:"X3DCSMA_AP",data:{items:[{envId:window.widget&&window.widget.getValue("x3dPlatformId")?window.widget.getValue("x3dPlatformId"):"OnPremise",serviceId:"3DSpace",contextId:window.widget?window.widget.getValue("collabspaces"):"",objectId:r.id,objectType:s?s:"DesignSight",displayName:r.title}]}}};e.setCompassContext=function(s){var r=k();if(s){r.dispatchEvent("onSetObject",{objectId:s})}else{r.dispatchEvent("onResetObject",{})}};e.getCommandLinePreview=function(u){var t="";if(u.command){t=u.command}else{if(u.arguments&&u.arguments.length>0){var r=[],s=null;u.arguments.forEach(function(v){switch(v.optionType){case j.standalone:s=v.name;break;case j.standaloneValue:s=v.value?v.value.trim():"";break;case j.optionValue:s=v.name+(v.separatorValue||"=")+(v.value?v.value.trim():"");break;default:s=null;break}if(s){r.push(s)}});t=r.join(" ")}}return t};return e});