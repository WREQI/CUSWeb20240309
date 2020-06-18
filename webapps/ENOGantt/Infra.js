define("DS/ENOGantt/Infra",["UWA/Class","DS/Foundation2/FoundationV2Data","DS/E6WCommonUI/UIHelper","DS/ENOGantt/Ven/Ext","DS/ENOGantt/Ven/Bryntum","DS/ENOGantt/Nls/Eno/"+window.languageGlobalVar,"DS/ENOGantt/Nls/Ext/"+window.languageGlobalVar,"DS/ENOGantt/Nls/Sch/"+window.languageGlobalVar,"DS/ENOGantt/Nls/Gnt/"+window.languageGlobalVar,],function(b,g,c,a,d,f){a.ns("App");App.Gantt={};App.csrf={name:"",value:"",};App.Gantt.filter={fields:{},filterBy:{},};App.Nls=f;var e={isReadOnly:function(h){var n=h["current.access[modify]"];var j=h.current;var k="TRUE"==h["type.kindof[Experiment]"];var l=h.routeId;if(n){if(c.isMobile()){return true}if(j=="Complete"||j=="Archive"||j=="Cancel"){return true}if(k&&l){return true}return false}return true},getColumnsInfo:function(n){var o={};var w=JSON.parse(n);var r={};var h=[];var p={};var k=[];o.customeColumnEditableData=p;o.customeColumnDataIndex=h;o.columns=k;o.columnsIndex=r;for(i=0,m=w.length;i<m;i++){var l=w[i];if(l.customColumn){if("datecolumn"==l.xtype){h.push(l.dataIndex)}var s=l.name;var y=l.editable;p[s]={isEditable:y,xtype:l.xtype}}var v=l.name;if(v==undefined){r[l.text]=i}r[v]=i;if(l.columnIndex&&l.columnIndex>0){k.splice(l.columnIndex,0,l)}else{k.push(l)}}var t=r.Name;var u=w[t];u.width=350;if(App.Infra.ViewId==App.Infra.Views.VIEW_WBS||App.Infra.ViewId==App.Infra.Views.VIEW_TEMPLATE_WBS){u.width=200;u.layout="vbox";u.items=[{xtype:"textfield",width:"100%",emptyText:App.Nls["emxProgramCentral.Common.Filter"],enableKeyEvents:true,reference:"filterByName",}]}var q=r.Status;var j=w[q];j.renderer=function(C,D,A){var z=A.get("Status");var B=App.Nls["emxProgramCentral.Gantt.TaskStatus."+z];if(B){return'<div title="'+B+'" class="status '+z+'">&nbsp;</div>'}};var x=r.Dependency;w[x].useSequenceNumber=true;delete w[x].editor;return o},};return b.extend({init:function(k){App.Gantt.filter={fields:{},filterBy:{},};var l=this;var n=[];if(!enoviaServer.viewId){enoviaServer.viewId="WBSView"}var h=enoviaServer.projectId?enoviaServer.projectId:enoviaServer.physicalId;var j="/resources/v1/modeler/projects/"+h+"?$indexBasedImages=false&$include=none&$fields=none,columns,estimatedStartDate,dueDate,modifyAccess,isDPM,kindofBaseline,kindofExperiment,kindofTemplate,policy,title,PALId,sequenceOrder,state,policy,modifyAccess,isDPM,estimatedFinishDate,actualStartDate,actulFinishDate,percentComplete,estimatedDurationInputValue,estimatedDurationInputUnit,actualDuration,constraintDate,defaulConstraintType,scheduleFrom,scheduleBasedOn,typeicon&$definition=true&viewId="+enoviaServer.viewId;g.ajaxRequest({url:j,dataType:"json",callback:function(o){l.setupInfra(o);k.loadWidget()}})},setupInfra:function(h){var t=h.data;var w=t[0].dataelements;var k=t[0].relelements;var E=("TRUE"==w.kindofTemplate);var x=("TRUE"==w.kindofBaseline);var A=("TRUE"==w.kindofExperiment);var v=("TRUE"==w.modifyAccess);var y=c.isMobile();v=v&&(!y);var u=true;var s=true;var o=false;var l=true;var n=true;var r={VIEW_WBS:"WBSView",VIEW_ACTUAL:"ActualWBSView",VIEW_PLAN_VERSUS_ACTUAL:"PlannedVsActualView",VIEW_BASELINE_WBS:"ProjectBaselineView",VIEW_BASELINE_VERSUS_CURRENT_BASELINE:"BaselineVsCurrentBaselineView",VIEW_BASELINE_VERSUS_CURRENT_BASELINE2:"BaselineVsCurrentBaselineView2",VIEW_EXPERIMENT_VERSUS_PROJECT:"ExperimentVsProjectView",VIEW_TEMPLATE_WBS:"ProjectTemplateView",VIEW_STATUS_REPORT:"StatusReportViewer"};if(!enoviaServer.viewId){enoviaServer.viewId=r.VIEW_WBS}var D=enoviaServer.viewId;if(r.VIEW_WBS==D){u=!v;s=false;if(A){var C=w.routeId;if(C){u=true}s=true}}else{if(r.VIEW_TEMPLATE_WBS==D){u=!v}else{if(r.VIEW_PLAN_VERSUS_ACTUAL==D){s=false;o=true}else{if(r.VIEW_BASELINE_VERSUS_CURRENT_BASELINE==D){s=false;o=true}else{if(r.VIEW_BASELINE_VERSUS_CURRENT_BASELINE2==D){o=true}else{if(r.VIEW_EXPERIMENT_VERSUS_PROJECT==D){o=true}else{if(r.VIEW_STATUS_REPORT==D){s=false;n=false}}}}}}}App.Infra={ViewId:enoviaServer.viewId,ReadOnly:u,HideView:s,BaselineRequired:o,ToolbarRequired:l,NameFilterRequired:n,TypeOf:{ProjectTemplate:E,ProjectBaseline:x,Experiment:A,},Views:r,};var j=w.columns;delete w.columns;var B=e.getColumnsInfo(j);var p=B.columns;var z=B.columnsIndex;App.Infra.CustomeColumnDataIndex=B.customeColumnDataIndex;App.Infra.customeColumnEditableData=B.customeColumnEditableData;App.Infra.Columns=p,App.Infra.ColumnIndex=z,App.Infra.ExtTaskArray=new Array();App.Infra.expandStatus={};App.Infra.Load={};App.Infra.projectDataElements=w;App.Infra.RootProjectname=w.title;App.Infra.projectRelElements=k;App.Infra.isCustomizedEnvironment=false;var q=false;for(i=0,m=h.definitions.length;i<m;i++){if(h.definitions[i].name==="hasDPMAccess"){q=true}}App.Infra.hasDPMLicense=q;a.Ajax.request({url:"../../programcentral/gantt/data/emxGanttService.jsp?mode=getCustomizationFlag",async:false,success:function(F){var G=JSON.parse(F.responseText.trim());if(G.isCustomizedEnvironment){App.Infra.isCustomizedEnvironment=G.isCustomizedEnvironment}}});return App}})});