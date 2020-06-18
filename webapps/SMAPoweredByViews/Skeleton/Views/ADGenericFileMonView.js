define("DS/SMAPoweredByViews/Skeleton/Views/ADGenericFileMonView",["UWA/Core","DS/Redux/Redux","DS/UIKIT/Alert","DS/W3DXComponents/Views/Temp/TempItemView","DS/SMAPoweredByMonitors/ad-monitor-work-data","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByState/ad-state-domain-work-data/selectors","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors","DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-stream-utils","DS/SMAPoweredByViews/Utils/ADMonitorUtils","DS/SMAPoweredByState/ad-state-redux-observer","DS/UIKIT/Spinner","DS/SMAPoweredByState/ad-state-app-alerts/actions","DS/SMAPoweredByState/ad-state-defs","i18n!DS/SMAPoweredByViews/assets/nls/ADGenericFileMonView","DS/SMAPoweredByViews/ad-job-tail-file/ad-job-tail-file","css!DS/SMAPoweredByViews/Skeleton/Views/ADGenericFileMonView"],function(p,e,d,i,m,o,s,u,l,c,b,r,j,t,h,f){var n="logs-view";var q=0;function a(x){var y=[],w;for(w=0;w<x.domain.workData.objects.length;w++){if(x.domain.workData.objects[w].type==="file"){var z=x.domain.workData.objects[w].name;if(z.indexOf(this.fileType)>0){var v=x.domain.workData.objects[w];y.push(v)}}}return y}function k(x,y){var z=true;if(x&&y&&x.length===y.length){for(var w=0;w<y.length;w++){if(x[w].id===y[w].id){z=false}else{z=true;break}}}var v=!z;return v}var g=i.extend({name:n,tagName:"div",template:function(){return"<div class="+this.getClassNames("-subcontainer")+"></div>"},domEvents:{},init:function(v){["container","template","tagName","domEvents"].forEach(function(w){delete v[w]});this._parent(v)},setup:function(){this.container.addClassName(this.getClassNames("-container"));this._initComponent();this._loadingSpinner=new j({renderTo:this.comp.getTailSpinnerHolder(),visible:true});this._reduxObserver=new r()},stopTailMonitor:function(){m.stopAllTailMonitors();this.tailstarted=false},startTailMonitor:function(){var v=o.jobWorkDirectory(l.getStore().getState(),this.model.get("id"));if(v===null){return}var y=null;var C=a.call(this.options,l.getStore().getState());if(C.length>0){for(var A=0;A<C.length;A++){if(v&&C[A].id.indexOf(v.id)>-1){y=C[A];break}}}var D=o.isJobDone(l.getStore().getState(),this.model.get("id"));var w=o.isJobSuccessful(l.getStore().getState(),this.model.get("id"));var x=o.jobDRMMode(l.getStore().getState(),this.model.get("id"));var B=(x==="Cloud"&&!D)||x!=="Cloud";var z=s.workDataPersistenceOperation(l.getStore().getState(),v.id);z=z===h.PersistenceOperation.READING;if(y&&!this.tailstarted&&v&&B){this.comp.updateMsg("");this.comp.showMsg();this.initializeEditor();b.startTailMonitor(v,y,this._onComplete.bind(this),this._onFailure.bind(this));this.tailstarted=true}else{if(!z&&D&&x==="Cloud"){this._loadingSpinner.hide();this.comp.updateMsg(f.FileNotFoundCloud)}else{if(!z&&!y&&w){this._loadingSpinner.hide();this.comp.updateMsg(f.FileNotFoundCompletedJob)}else{if(!z&&!y&&D){this._loadingSpinner.hide();this.comp.updateMsg(f.FileNotFound)}}}}},onFacetUnselect:function(){this.stopTailMonitor();this._reduxObserver.unsubscribeAll()},onFacetSelect:function(){this.renderFile()},_initComponent:function(){this.comp=p.createElement("ad-job-tail-file");this.comp.addEventListener("change",function(){this.renderFile()}.bind(this));this.comp.store=l.getStore()},_onComplete:function(w){this._loadingSpinner.hide();var v=o.isJobDone(l.getStore().getState(),this.model.get("id"));if(v||w.eof){this.stopTailMonitor()}this.comp.updateTailContent(w.contents)},_onFCSComplete:function(v){this._loadingSpinner.hide();this.comp.updateTailContent(v);this.comp.hideMsg()},_onFailure:function(){q=q+1;this.stopTailMonitor();if(q<=3){this.startTailMonitor()}else{var v=e.bindActionCreators(t,l.getStore().dispatch);v.addAlert("startTail","error",null,"SMAPoweredByViews.ad-generic-file-monitor-view.FILE_STREAM_ERROR")}},_onFCSStreamFailure:function(){var v=e.bindActionCreators(t,l.getStore().dispatch);v.addAlert("streamfile","error",null,"SMAPoweredByViews.ad-generic-file-monitor-view.FILE_STREAM_ERROR")},_filesListChanged:function(){this.startTailMonitor()},_displayFile:function(z){var y=this.getMCSLogFile(z);if(y){this.initializeEditor();c.getFileContent(l.getStore().getState(),y.id,this._onFCSComplete.bind(this),this._onFCSStreamFailure.bind(this))}else{var v=o.jobWorkDirectory(l.getStore().getState(),this.model.get("id"));if(v){var E=o.isJobDone(l.getStore().getState(),this.model.get("id"));var x=o.jobWithID(l.getStore().getState(),this.model.get("id"));if(E||o.JobStatus.RUNNING===x.status){this.comp.updateMsg(f.MonitoringDataLoading)}else{this.comp.updateMsg(f.LookingForLogFile)}this._loadingSpinner.show();var C=a.call(this.options,l.getStore().getState());if(C.length>0){this._filesListChanged(C)}this._reduxObserver.observeStore({store:l.getStore(),select:a.bind(this.options),onChange:this._filesListChanged.bind(this),compareFunc:k})}else{this._loadingSpinner.hide();var w=o.isJobSuccessful(l.getStore().getState(),this.model.get("id")),B=o.jobExecutionOptions(l.getStore().getState(),this.model.get("id")),D=B.removeWorkDir;if(w&&D){this.comp.updateMsg(f.FileNotFoundMsg);var A=e.bindActionCreators(t,l.getStore().dispatch);A.addAlert("workDir","error",this.options.fileType,"SMAPoweredByViews.ad-generic-file-monitor-view.FILE_NOT_AVAILABLE");this.comp.hideEditor();return}this.comp.updateMsg(f.WorkDirNotFound)}}},onRender:function(){var v=this.getElement(".logs-view-subcontainer");v.addContent(this.comp);v.render=function(){};v.container=v;if(this.model){this.comp.jobId=this.model.get("id")}},renderFile:function(){var v=null;if(o.isBatchJob(l.getStore().getState(),this.model.get("id"))){v=this.comp.selectedBatchIteration}if(!v||(v>=0)){this.comp.updateMsg("");this._displayFile(v)}else{this.comp.hideEditor();this.comp.updateMsg(f.SelectBatchIteration);this._loadingSpinner.hide()}},getMCSLogFile:function(x){var v=o.jobOutputObjects(l.getStore().getState(),this.model.get("id"),false,x);var w=this.fileSelectorFromManagedData(v);return w},fileSelectorFromManagedData:function(v){for(var w=0;w<v.length;w++){var x=u.managedDataWithID(l.getStore().getState(),v[w].id);if(!x){continue}var y=x.name;if(y&&y.indexOf(this.options.fileType)>0){return x}}return null},initializeEditor:function(){if(this.editorInit){return}this.comp.initializeEditor();this.editorInit=true},onDestroy:function(){this._loadingSpinner.hide();if(this.editorInit){this.comp.editorRelease()}this.stopTailMonitor();this._reduxObserver.unsubscribeAll()}});return g});