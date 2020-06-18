define("DS/ENOGantt/Data/ResourceUtilizationStore",["DS/ENOGantt/Ven/Bryntum"],function(a){Ext.define("DS.ENOGantt.model.UtilizationResource",{extend:"Gnt.model.UtilizationResource",fields:[{name:"Id",mapping:"Id"},{name:"ContextId",mapping:"ContextId"},{name:"Name",mapping:"Name"},{name:"UserName",mapping:"UserName"},{name:"WorkTime",mapping:"WorkTime"},{name:"icon",mapping:"icon"},],inheritableStatics:{getSurrogateIdFor:function(b){var c=b.getId();if(b instanceof a.model.Resource){c="resource-"+c}else{if(b instanceof a.model.Assignment){c="assignment-"+c}else{Ext.Error.raise("Wrong original record type")}}return c}}});Ext.define("DS.ENOGantt.data.ResourceUtilizationStore",{extend:"Gnt.data.ResourceUtilizationStore",model:"DS.ENOGantt.model.UtilizationResource",allowExpandCollapseWhileFiltered:false,sync:{url:"",requestConfig:{timeout:60000}},});Ext.define("DS.ENOGantt.DPMGanttAll.model.utilization.DefaultUtilizationNegotiationStrategy",{extend:"Sch.util.Patch",target:"Gnt.model.utilization.DefaultUtilizationNegotiationStrategy",overrides:{onSourceDataTouchBuffered:function(){var b=Ext.ComponentQuery.query("#dpmresourceutilizationpanel")[0];if(!b.isHidden()){this.callParent(arguments)}},syncResourceUtilizationStore:function(){var i=this,f=i.getResourceUtilizationStore(),j=i.getResourceUtilizationEventStore(),e=f.getRoot(),l=i.getResourceStore(),g=i.getAssignmentStore();if(j.getCount()===0){console.log("*********--------------------New Added*********--------------------");i.fillResourceUtilizationStore()}else{console.log("*********--------------------Existing*********--------------------");i.syncingWithOriginal=true;i.fireEventVia("sync-start",i);f.beginUpdate();j.beginUpdate();i.removeOutdatedSurrogateResources(f,j,l);i.removeOutdatedSurrogateAssignments(f,j,g);i.updatePresentSurrogates(f,j);i.addNewSurrogateResources(f,j,l);i.addNewSurrogateAssignments(f,j,g);e.sort();j.endUpdate();f.endUpdate();i.syncingWithOriginal=false;i.fireEventVia("sync-complete",i)}var m=Ext.ComponentQuery.query("#dpmprojectgantt")[0];var d=m.taskStore.assignmentStore;var c=d.getRemovedRecords();var h=d.getModifiedRecords();if(!((h&&h.length>0)||(c&&c.length>0))){var b=Ext.ComponentQuery.query("#dpmresourceutilizationpanel")[0];var k=b.getStore();k.commitChanges()}},makeSurrogateResource:function(f){var k=this.callParent(arguments);k.set("icon",f.get("icon"));k.set("WorkTime",f.get("WorkTime"));var c=f.get("CalendarInfo");if(c&&c.length>0){if(f.get("CalendarInfo")){var e="Custom:"+f.get("Id");k.set("CalendarId",e);var h=new a.data.calendar.BusinessTime({name:e,calendarId:e,});for(var j=0;j<c.length;j++){var m=c[j];var l=m.Weekday;var n=m.isWorkingDay;var g=[];if(n){g.push(m.availability1);g.push(m.availability2)}var d={Type:"WEEKDAY",Weekday:l,Availability:g,isWorkingDay:n,};var b=Ext.create("Gnt.model.CalendarDay",d);h.add(b)}}}return k},makeSurrogateAssignment:function(d){var b=this.callParent(arguments);b.set("icon",d.get("icon"));b.set("Units",d.get("Units"));b.set("Type",d.get("Type"));b.set("ReadOnly",d.get("isReadOnly"));b.set("TaskId",d.get("TaskId"));var c=b.get("Type");if("External"==c){b.set("cls","externalAssignment")}return b},removeOutdatedSurrogateResources:function(b,c,d){var g=b.getRoot(),f=[],e=[];g.cascadeBy(function(h){var i;if(!h.isRoot()&&h.isSurrogateResource()){i=h.getOriginalResource();if(!d.contains(i)){f.push(h);e=e.concat(h.getEvents())}if(!h.getAssignments().length){e=e.concat(h.getEvents())}}});c.remove(e);Ext.Array.each(f,function(h){h.remove()})},}});Ext.define("DS.ENOGantt.DPMGanttAll.model.UtilizationEvent",{extend:"Sch.util.Patch",target:"Gnt.model.UtilizationEvent",overrides:{inheritableStatics:{getSurrogateIdFor:function(b){var c=b.getId();if(b instanceof a.model.Resource){c="resource-"+c}else{if(b instanceof a.model.Assignment){c="assignment-"+c}else{Ext.Error.raise("Wrong original record type")}}return c}}}})});