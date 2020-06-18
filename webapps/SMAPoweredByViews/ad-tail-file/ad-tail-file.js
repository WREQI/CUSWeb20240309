(function(){var A,d,t,r,g,f,u,j,B,k={uploading:"uploading",in3dx:"in3dx",onDisk:"onDisk",bothInSync:"bothInSync",bothOutOfSync:"bothOutOfSync"},m={TAILFILEERROR:"SMAPoweredByViews.ad-generic-file-monitor-view.FILE_STREAM_ERROR",EXCEEDS_SIZE_LIMIT:"SMAPoweredByViews.ad-tail-file.EXCEEDS_SIZE_LIMIT"},w={hidden:"hidden",add:"add",remove:"remove"},e=50000000,l=function(){var C=this;return new Promise(function(D){require(["DS/SMAPoweredByState/ad-state-domain-work-data/selectors","DS/SMAPoweredByViews/Utils/ADMonitorUtils","DS/SMAPoweredByMonitors/ad-monitor-work-data","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors","DS/SMAPoweredByState/ad-state-stream-utils","DS/SMAPoweredByState/ad-state-app-alerts/actions","DS/SMAPoweredByState/ad-state-app-alerts/selectors","DS/UIKIT/Spinner"],function(K,I,G,H,L,M,F,J,E){A=K;d=I;t=G;r=H;g=L;f=M;u=F;j=J;B=new E({renderTo:C.$.tailSpinnerContainer,visible:true});D()})})},p=function(){return new Promise(function(C){this.boundAlertActions=this.getBoundActions(u);this.fire("reduxready",{});C()}.bind(this))},y=function(C,D){C.classList[D]("show");C.classList[D]("in")},b=function(C){C.classList.toggle("hidden");C.classList.toggle("show");C.classList.toggle("in")},v=function(){B.hide()},s=function(){B.show()},n=function(E){var D="tailFile",G=j.Level.ERROR,C=m.TAILFILEERROR,F="";E.message?F=E.message:F="";this.boundAlertActions.addAlert(D,G,F,C)},a=function(){if(typeof(this._currentTailFileObject)!=="undefined"){t.stopTailMonitor({id:this._currentTailFileObject.file})}},o=function(C){this.$.adTailLogView.updateTailContent(C.contents);v.call(this)},i=function(C){v.call(this);n.call(this,C);this._tailAttempts=this._tailAttempts+1;a.call(this);if(this._tailAttempts<3){this.startTailMonitor(this._currentTailFileObject)}},h=function(C){v.call(this);this.$.adTailLogView.updateTailContent(C)},q=function(){n.call(this,{});v.call(this)},c=function(C){return(C.status===k.in3dx||C.status===k.bothInSync)},x=function(C){return(C.status===k.onDisk||C.status===k.bothOutOfSync)},z=function(D){var E,C=null;if(D){this._currentTailFileObject=D;s.call(this);this.$.adTailLogView.initializeEditor();this._editorInit=true;this.$.adTailLogView.updateTailContent("");if(c(D)){C=g.managedDataWithID(this.store.getState(),D.file);if(C){this.tailFileName=C.name;this.tailFileVersion=C.version}if(C&&parseInt(C.size)>e){this.boundAlertActions.addAlert("tailFile",j.Level.ERROR,this.tailFileName,m.EXCEEDS_SIZE_LIMIT)}else{this.showDialog();f.getFileContent(this.store.getState(),D.file,h.bind(this),q.bind(this))}}else{if(x(D)){this.showDialog();E=r.jobWorkDirectory(this.store.getState(),D.jobId);this._currentTailObject=A.workDataWithID(this.store.getState(),D.file);if(this._currentTailObject){this.tailFileName=this._currentTailObject.name;this.tailFileVersion=0;d.startTailMonitor(E,this._currentTailObject,o.bind(this),i.bind(this))}else{n.call(this,{})}}}}else{n.call(this,{})}};DS.SMAPoweredByViews=DS.SMAPoweredByViews||{};DS.SMAPoweredByViews.ADTailFile=window.Polymer({is:"ad-tail-file",properties:{tailFileName:{type:String},tailFileVersion:{type:Number,value:0}},ready:function(){this.isReady=Promise.resolve().then(this.initReduxBehavior.bind(this)).then(l.bind(this)).then(p.bind(this))},showDialog:function(){y(this.$.tailModal,w.add);b(this.$.modalOverlay)},hideDialog:function(){y(this.$.tailModal,w.remove);b(this.$.modalOverlay);a.call(this)},onClose:function(){this.hideDialog()},startTailMonitor:function(C){z.call(this,C)},_formatVersion:function(C){if(C&&C!==0){return" - Version "+C}else{return""}},behaviors:[DS.SMAProcSP.SPBase,DS.SMAPoweredByViews.ADReduxBehaviour]})}(this));