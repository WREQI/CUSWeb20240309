/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(){var d,k,f={loading:"loading",error:"error",ready:"ready"},j="Released",m="Abaqus",i=["Abaqus/CAE Launcher","Import Simulation Results"],e=function(){return new Promise(function(o){require(["DS/SMAPoweredByState/ad-state-app/selectors","DS/SMAPoweredByState/ad-state-domain-job-types/selectors"],function(p,q){d=p;k=q;o()})})},g=function(){this.observeStore({select:k.jobTypesPersistenceOperation,onChange:"_jobTypesPersistenceOperationChanged"})},a=function(q){var o,p=[m];this.hasAbaqusStudyLicense=d.hasLicense(q,d.AppLicenses.ABAQUS_STUDY);this.hasSimulationCompanionLicense=d.hasLicense(q,d.AppLicenses.SIMULATION_COMPANION);o=q.domain.jobTypes.objects.filter(function(r){var s=(p.indexOf(r.title)!==-1);if(s){if(this.hasAbaqusStudyLicense){return true}else{return false}}else{if(this.hasSimulationCompanionLicense){return true}else{return false}}}.bind(this));return o},c=function(o){return i.indexOf(o.title)===-1},b=function(q,o){var p=q.title.localeCompare(o.title);if(p===0){if(q.lifecycleState!==o.lifecycleState){if(q.lifecycleState===j){p=-1}else{if(o.lifecycleState===j){p=1}}}}if(p===0){if(q.isLatestRevision){p=-1}else{if(o.isLatestRevision){p=1}}}if(p===0){p=q.lifecycleState.localeCompare(o.lifecycleState)}if(p===0){p=q.revision.localeCompare(o.revision)}return p},h=function(o){this.jobTypes={status:f.loading,items:[]};this.isReady.then(function(){var q=k.isJobTypesInitialized(this.store.getState()),p=!q||(o!==null&&typeof o!=="undefined");if(!p){this.waitFor({select:d.appPersistenceOperation}).then(function(){var r=a.call(this,this.store.getState());if(r.length>0){this.jobTypes={status:f.ready,items:r.filter(c).sort(b)}}else{this.jobTypes={status:f.error,items:[]}}this.fire("jobtypesready",{})}.bind(this))}}.bind(this))},n=function(){h.apply(this);this.$.adSelectApplication.showDialog()},l=function(){this.$.adSelectApplication.hideDialog()};DS.SMAPoweredByViews=DS.SMAPoweredByViews||{};DS.SMAPoweredByViews.ADSelectApplicationContainer=window.Polymer({is:"ad-select-application-container",properties:{jobTypes:{type:Object},isCreating:{type:Boolean,value:false,observer:"_isCreatingChanged"},hasAbaqusStudyLicense:{type:Boolean,value:false},hasSimulationCompanionLicense:{type:Boolean,value:false}},ready:function(){this.isReady=Promise.resolve().then(this.initReduxBehavior.bind(this)).then(e.bind(this)).then(g.bind(this))},_jobTypesPersistenceOperationChanged:function(){h.apply(this,arguments)},_isCreatingChanged:function(o){this.$.adSelectApplication.isCreating=o},showDialog:function(){return n.apply(this,arguments)},hideDialog:function(){return l.apply(this,arguments)},behaviors:[DS.SMAProcSP.SPBase,DS.SMAPoweredByViews.ADReduxBehaviour]})}(this));