define("DS/ENOGantt/Data/ResponseUtil",[],function(){var c={};var a=[];var f={};var d={};var b={};var e={To6WFieldMap:{icon:"typeicon","current.access[modify]":"modifyAccess",Policy:"policy",Type:"type",Name:"title",Id:"objectId",State:"state",PercentDone:"percentComplete",StartDate:"estimatedStartDate",EndDate:"dueDate",Duration:"estimatedDurationInputValue",DurationUnit:"estimatedDurationInputUnit",BaselineStartDate:"actualStartDate",BaselineEndDate:"actualFinishDate",ConstraintType:"constraintType",ConstraintDate:"constraintDate",TaskSequenceId:"sequenceOrder",Lag:"lagTime",Type:"dependencyType",TaskProjectId:"taskProjectId",CriticalTask:"criticalTask",Status:"status",SourceId:"sourceId",ScheduleFrom:"scheduleFrom",Owner:"owner",FreeFloat:"freeFloat",TotalFloat:"totalFloat",Color:"color",},ToGanttFieldMap:{typeicon:"icon",modifyAccess:"current.access[modify]",policy:"Policy",type:"Type",title:"Name",objectId:"Id",state:"State",percentComplete:"PercentDone",estimatedStartDate:"StartDate",dueDate:"EndDate",estimatedDurationInputValue:"Duration",estimatedDurationInputUnit:"DurationUnit",actualStartDate:"BaselineStartDate",actualFinishDate:"BaselineEndDate",constraintType:"ConstraintType",constraintDate:"ConstraintDate",sequenceOrder:"TaskSequenceId",lagTime:"Lag",dependencyType:"Type",taskProjectId:"TaskProjectId",criticalTask:"CriticalTask",status:"Status",sourceId:"SourceId",scheduleFrom:"ScheduleFrom",owner:"Owner",freeFloat:"FreeFloat",totalFloat:"TotalFloat",color:"Color",},convertToGanttKeyValues:function(i){for(var h in i){if(App.Infra.CustomeColumnDataIndex.includes(h)){i[h]=this.formatDate(i[h])}if(i.hasOwnProperty(h)){var g=this.ToGanttFieldMap[h];if(g){i[g]=i[h];delete i[h]}}}},convertTo6WKeyValues:function(i){for(var h in i){if(App.Infra.CustomeColumnDataIndex.includes(h)){i[h]=this.getFormattedDate(new Date(i[h]))}if(i.hasOwnProperty(h)){var g=this.To6WFieldMap[h];if(g){i[g]=i[h];delete i[h]}else{i[h]=""+i[h]}}}},mergeRelDataToBusData:function(i,h){for(var g in h){if(h.hasOwnProperty(g)){i[g]=h[g]}}},filterTaskForStatusReport:function(m,s){var g=s.taskStore.store.toArray();var o=[];var h=m.tasks?m.tasks.rows:m;var n=enoviaServer.objectId;var q=[];if(enoviaServer.initGantt){for(var k=1;k<g.length;k++){var p=g[k].data.Id;q.push(p)}}else{q=n.split(",")}for(var l=0;l<h.length;l++){var p=h[l].Id;if(q.indexOf(p)!=-1){o.push(h[l])}if(h[l].children.length>0){var r=this.filterTaskForStatusReport(h[l].children,s);o=o.concat(r)}}return o},formatAssignees:function(k){var l=[];for(var h=0,g=k.length;h<g;h++){var m=k[h].dataelements.fullname;l.push(m)}return l.join()},setLastSequence:function(j){var h=j.TaskProjectId;if(!h){if(c[j.Id]){var i=c[j.Id].LastSequence;j.LastSequence=i}c[j.Id]=j}else{if(h){if(!c[h]){c[h]={}}if(j.TaskSequenceId){if(c[h].LastSequence==undefined){c[h].LastSequence=j.TaskSequenceId}else{var g=parseInt(c[h].LastSequence);var k=parseInt(j.TaskSequenceId);if(g==undefined||k>g){c[h].LastSequence=j.TaskSequenceId}}}}}},formatStatus:function(i){var g=i.Status;var h=App.Nls["emxProgramCentral.Gantt.TaskStatus."+g];if(g){i.Status='<div title="'+h+'" class="status '+g+'">&nbsp;</div>'}},formatDate:function(g){return g},getEnglishType:function(i){var h=i.Type||i.type;var g="Task";var j={Experiment:"Experiment","Project Space":"ProjectSpace","Project Concept":"ProjectConcept","Project Template":"ProjectTemplate",Gate:"Gate",Milestone:"Milestone",Phase:"Phase"};if(j[h]){g=j[h]}return g},isEqualObject:function(i,h){var g=true;for(key in i){if(i[key]==h[key]){continue}else{g=false;break}}return g},mergeExternalDep:function(q,h){for(var n=h.length-1;n>=0;n--){var o=h[n];var k=true;for(var l=q.length-1;l>=0;l--){var p=q[l];if(p.predProjectName==o.predProjectName&&p.From==o.From&&p.To==o.To){k=false;if(this.isEqualObject(o,p)){continue}else{h[n]=p}q.splice(l,1)}}if(k){h.splice(n,1)}}if(q.length>0){for(var g=0;g<q.length;g++){h.push(q[g])}}return h},setRawExternalDependency:function(l,g,p){var r=l.get("ExternalRawDependencies");r={};r.updated=[];r.added=[];r.removed=[];for(var q=0;q<p.length;q++){var h=p[q];var k=true;for(var o=g.length-1;o>=0;o--){var s=g[o];if(s.predProjectName==h.predProjectName&&s.From==h.From&&s.To==h.To){k=false;if(this.isEqualObject(h,s)){continue}else{r.updated.push(s)}g.splice(o,1)}}if(k){r.removed.push(h)}}if(g.length>0){for(var n=0;n<g.length;n++){r.added.push(g[n])}}l.set("ExternalRawDependencies",r)},formatDependencies:function(l,y){var n=new Array();var x=y.TaskProjectId;var w=new Array();var i=new Array();var r=l.length;for(var o=0;o<r;o++){var s=l[o];var t=s.relelements;t.Id=s.relId;this.convertToGanttKeyValues(t);var q=t.predTaskSeqNumber;if(q){t.predTaskSeqNumber=parseInt(q)}var z=t.Type;var g=t.To;var u=t.predTaskSeqNumber;var k=t.predProjectName;var m=t.predProjectId;var p=t.Lag;var j=t.LagUnit;var v="";var h=true;if(k&&!a.includes(k)){v=k+":";h=false}else{if(k&&a.includes(k)&&x!=m){v=k+":"}else{delete t.predProjectName}}v=v+u+":"+z+"+"+p+" "+j;if(!h){t.isExtDep=true;i.push(t)}if(z!=undefined){switch(z){case"SS":z="0";break;case"SF":z="1";break;case"FS":z="2";break;case"FF":z="3";break}t.Type=z}if(h){n.push(t)}}i.sort();y.ExternalDependencies=i;return n},formatDeliverableForStatusReport:function(m,l){var h=[];for(var k=0;k<m.length;k++){var n=m[k];var g={};g.Id=n.id;var j=n.dataelements;g.Name=j.name;g.leaf=true;h.push(g)}return h},getsourceIdData:function(o,p){var n=[];if(p){n=o}else{n=o.relateddata.tasks}if(n.length>0){for(var l=0,k=n.length;l<k;l++){var m=n[l].dataelements;this.convertToGanttKeyValues(m);var h=m.SourceId;var q={};q[h]=m;b[h]=m;if(n[l].children.length>0){var g=this.getsourceIdData(n[l].children,true);this.mergeRelDataToBusData(b,g)}}}return b},populateProjectNames:function(k){var l=k.length;for(var g=0;g<l;g++){var h=k[g];var j=h.dataelements;var i=this.getEnglishType(h);if(i=="ProjectTemplate"||i=="ProjectSpace"||i=="ProjectConcept"||i=="Experiment"){a.push(j.name||j.title)}if(h.children&&h.children.length>0){this.populateProjectNames(h.children)}}},loadFormat:function(n,y){var m=n[0];var H=enoviaServer.viewId||App.Infra.ViewId;if(H==App.Infra.Views.VIEW_STATUS_REPORT){if(m.relateddata&&m.relateddata.tasks&&m.relateddata.tasks.length>0){n=[];n=n.concat(m.relateddata.tasks)}}else{if(!y){if(App.Infra.projectDataElements){m.dataelements=App.Infra.projectDataElements;m.dataelements.expanded="true";m.dataelements.FreeFloat="0.0";m.dataelements.TotalFloat="0.0";delete App.Infra.projectDataElements}if(App.Infra.projectRelElements){m.relelements=App.Infra.projectRelElements;delete App.Infra.projectRelElements}if(m.relateddata&&m.relateddata.tasks&&m.relateddata.tasks.length>0){m.children=m.children.concat(m.relateddata.tasks)}if(!m.relelements){m.relelements={}}}}var x=n.length;if(!y){this.populateProjectNames(n)}var v=new Array();var q=new Array();var j=new Array();var p=[];var z=[];for(var t=0;t<x;t++){var C=n[t];var u=C.id;var D=C.dataelements;D.type=C.type;var l=C.relelements;this.mergeRelDataToBusData(D,l);this.convertToGanttKeyValues(D);D.Id=u;var E=C.children;if(E&&E.length>0){var o=this.loadFormat(E,true);o.predActualStartDate.sort();o.predActualEndDate.sort();D.BaselineStartDate=o.predActualStartDate[0];D.BaselineEndDate=o.predActualEndDate[o.predActualEndDate.length-1];D.children=o.tasks.rows;q=q.concat(o.dependencies.rows)}else{D.children=[]}D.hasEditAccess=D["current.access[modify]"];D.ReadOnly="TRUE"==D.hasEditAccess?false:true;var F=D.isSummaryTask;if(F){if("true"==F.toLowerCase()&&H!=App.Infra.Views.VIEW_STATUS_REPORT){D.leaf=false}else{D.leaf=true}}this.setLastSequence(D);var r=D.Policy;if(r=="Project Review"){D.Rollup=true}else{D.Rollup=false}if(D.ConstraintDate==""){D.ConstraintType=""}else{var w=D.ConstraintType?D.ConstraintType:D.defaultConstraintType;if(w){w=w.replace(/ /g,"");w=w.toLowerCase();if("assoonaspossible"==w){w=""}D.ConstraintType=w}}D.State=App.Nls[D.State];D.ExternalDependencies=[];if(App.Infra.expandStatus[u]){D.expanded=true}var i=b[D.SourceId];if(n.length>1&&i){var A=i.StartDate;var g=i.EndDate;D.BaselineStartDate=this.formatDate(A);D.BaselineEndDate=this.formatDate(g)}else{D.BaselineStartDate=this.formatDate(D.BaselineStartDate);D.BaselineEndDate=this.formatDate(D.BaselineEndDate)}if(H!=App.Infra.Views.VIEW_EXPERIMENT_VERSUS_PROJECT&&H!=App.Infra.Views.VIEW_BASELINE_VERSUS_CURRENT_BASELINE&&H!=App.Infra.Views.VIEW_BASELINE_VERSUS_CURRENT_BASELINE2){if(!D.BaselineStartDate||D.BaselineStartDate==""){D.BaselineStartDate=D.StartDate}if(!D.BaselineEndDate||D.BaselineEndDate==""){if(D.predictiveActualFinishDate){D.predictiveActualFinishDate=this.formatDate(D.predictiveActualFinishDate);D.BaselineEndDate=D.predictiveActualFinishDate}else{D.BaselineEndDate=D.EndDate}}p.push(D.BaselineStartDate);z.push(D.BaselineEndDate)}var k=D.TaskSequenceId;if(k){D.TaskSequenceId=parseInt(k)}D.Type=C.type;D.EnglishType=this.getEnglishType(D);D.ExternalProjectDepRawData=[];if(C.relateddata&&C.relateddata.assignees&&H!=App.Infra.Views.VIEW_STATUS_REPORT){if(C.relateddata.assignees.length>0){var G=this.formatAssignees(C.relateddata.assignees);D.Assignee=G}}if(C.relateddata&&C.relateddata.deliverables&&C.relateddata.deliverables.length>0&&H==App.Infra.Views.VIEW_STATUS_REPORT&&!enoviaServer.initGantt){var B=this.formatDeliverableForStatusReport(C.relateddata.deliverables,D);D.leaf=false;D.children=B}v.push(D);if(C.relateddata&&C.relateddata.predecessors&&H!=App.Infra.Views.VIEW_STATUS_REPORT){var s=this.formatDependencies(C.relateddata.predecessors,D);q=q.concat(s)}}var h={success:true,tasks:{rows:v},dependencies:{rows:q},predActualStartDate:p,predActualEndDate:z};return h},syncFormat:function(V,M,J,s){if(!M){var al=s.taskStore.store.toArray();for(var ah=0,af=al.length;ah<af;ah++){var x=al[ah].data.EnglishType;if(x=="ProjectTemplate"||x=="ProjectSpace"||x=="ProjectConcept"||x=="Experiment"){a.push(al[ah].data.Name)}}var R=V[0];if(R.relateddata&&R.relateddata.tasks&&R.relateddata.tasks.length>0){R.children=R.children.concat(R.relateddata.tasks)}if(R.relateddata&&R.relateddata.performRollup&&R.relateddata.performRollup.length>0){var F=R.relateddata.performRollup[0].children;R.children=R.children.concat(F)}var x=this.getEnglishType(R);if(x=="ProjectSpace"||x=="ProjectConcept"||x=="Experiment"){R.dataelements.expanded="true";if(!R.relelements){R.relelements={}}}}var aj=new Array();var ae=[];var k=[];var ao=[];var S=[];var u=[];var W=[];if(J&&J.contextTaskId){u.push(J.contextTaskId)}if(J&&J.deletedTaskArray){ae=ae.concat(J.deletedTaskArray)}if(V){var ab=V[0];var m=[];var q=ab.children;if(q&&q.length>0){var ak=[];var P=[];for(var am=0;am<q.length;am++){var ab=q[am];var Q=true;var Y=ab.id;if(Y=="RemovedTasks"){m=ab.children;for(var af=0;af<m.length;af++){var G=m[af].dataelements;ae.push(G)}}else{var O=true;var B=ab.dataelements;if(B){if(ab.tempId){B.PhantomId=d.TaskPhantomId;delete d.TaskPhantomId}else{var h=s.taskStore.store.getModelById(Y);if(App.Infra.Load.Level!=0&&!h){Q=false}}var ai=ab.relelements;this.mergeRelDataToBusData(B,ai);this.convertToGanttKeyValues(B);B.Id=Y;var r=ab.children;if(r.length>0){var z=this.syncFormat([{children:r}],true);z.predActualStartDate.sort();z.predActualEndDate.sort();B.BaselineStartDate=z.predActualStartDate[0];B.BaselineEndDate=z.predActualEndDate[z.predActualEndDate.length-1];aj=aj.concat(z.tasks.rows)}var O=B.isSummaryTask;if("true"==O.toLowerCase()){B.leaf=false}else{B.leaf=true}if(B.ConstraintDate==""){B.ConstraintType=""}else{var n=B.ConstraintType;if(n){n=n.replace(/ /g,"");n=n.toLowerCase()}if("assoonaspossible"==n){n=""}B.ConstraintType=n;B.ConstraintDate=this.formatDate(B.ConstraintDate)}B.State=App.Nls[B.State];B.StartDate=this.formatDate(B.StartDate);B.EndDate=this.formatDate(B.EndDate);B.BaselineStartDate=this.formatDate(B.BaselineStartDate);B.BaselineEndDate=this.formatDate(B.BaselineEndDate);if(!B.BaselineStartDate||B.BaselineStartDate==""){B.BaselineStartDate=B.StartDate}if(!B.BaselineEndDate||B.BaselineEndDate==""){if(B.predictiveActualFinishDate){B.predictiveActualFinishDate=this.formatDate(B.predictiveActualFinishDate);B.BaselineEndDate=B.predictiveActualFinishDate}else{B.BaselineEndDate=B.EndDate}}ak.push(B.BaselineStartDate);P.push(B.BaselineEndDate);B.Type=ab.type;B.EnglishType=this.getEnglishType(B);if(Q){aj.push(B)}}}var aa=[];if(J&&J.removedDepArray){ao=J.removedDepArray}if(ab.relateddata){var H=ab.relateddata;if(H.predecessors&&H.predecessors.length>0){var A=s.taskStore.store;var T=ab.id;var E=A.getModelById(ab.dataelements.Id);var Z=E.get("TaskProjectId");var U=H.predecessors;var g=new Array();var D=new Array();for(var ah=0;ah<U.length;ah++){var G=U[ah].relelements;G.Id=U[ah].relId;this.convertToGanttKeyValues(G);var an=G.To;var X=G.Type;var w=G.predTaskSeqNumber;var ac=G.Lag;var ad=G.LagUnit;var v=G.predProjectName;var K=G.predProjectId;var y=true;if(v&&!a.includes(v)){y=false}else{if(v&&a.includes(v)&&Z!=K){L=v+":"}else{delete G.predProjectName}}L=L+w+":"+X+"+"+ac+" "+ad;var L=w+":"+X+"+"+ac+" "+ad;g.push(L);var Y=U[ah].id;if(G.Type=="SS"){G.Type="0"}else{if(G.Type=="SF"){G.Type="1"}else{if(G.Type=="FS"){G.Type="2"}else{if(G.Type=="FF"){G.Type="3"}}}}if(!y){G.isExtDep=true;D.push(G)}else{var ag=G.To;var N=G.From;var o=G.$PhantomId;var I=ag+"-"+N;var o=f[I];if(o){delete f[I];G.$PhantomId=o}k.push(G)}}if(E){var t=E.get("ExternalDependencies");var C=this.mergeExternalDep(D,t);var T=ab.dataelements.Id;aj.push({Id:T,ExternalDependencies:C})}g.sort()}if(H.assignees){var p=H.assignees;for(var ah=0;ah<p.length;ah++){var G=p[ah].relelements;G.Id=p[ah].relId;this.convertToGanttKeyValues(G);S.push(G)}}}}}}var l={success:true,tasks:{rows:aj,removed:ae,},dependencies:{rows:k,removed:ao},assignments:{rows:S,removed:u},resources:{rows:[],removed:W},predActualStartDate:ak,predActualEndDate:P};return l},getFormattedDate:function(h){if(h instanceof Date){var g=Ext.Date.format(h,"Y-m-d\\TH:i:s");return g}return h},get6WTaskDataSkeleton:function(){var g={dataelements:{},id:"",updateAction:"",children:[],relelements:{},relateddata:{predecessors:[]}};return g},get6WDependencyDataSkeleton:function(h){var g={id:"",updateAction:h,relelements:{}};return g},formatDeletedTask6WData:function(u,r,F){var s=u.taskStore.store;var t=[];var v=s.getRemovedRecords();var w=[];var l={};for(var z=0,y=v.length;z<y;z++){var B=v[z];var G=B.id;var q=B.data.lastParentId;w.push({Id:G});var o={};o.lastParentId=q;var C=B.data.EnglishType;if(C=="ProjectSpace"||C=="ProjectConcept"||C=="Experiment"){o.isDisconnect=true}l[G]=o}for(var A=0,z=r.length;A<z;A++){var m=r[A];var n=m.Id;var o=l[n];var q=o.lastParentId;var h=s.getModelById(q);if(h){var D=h.parentNode.get("Type");var x="DELETE";if(o.isDisconnect){x="DISCONNECT"}if(undefined!=D){var p=this.get6WTaskDataSkeleton();p.id=q;p.updateAction="NONE";var E=this.get6WTaskDataSkeleton();E.id=n;E.updateAction=x;p.children.push(E);t.push(p)}else{var g=this.get6WTaskDataSkeleton();g.id=n;g.updateAction=x;t.push(g)}}F.push(n)}u.transport.sync.params.deletedTaskArray=w;return t},formatAssignment6WData:function(r,u,y){var q=[];var n=r.taskStore.store.assignmentStore;if(u.updated){var h=u.updated;for(var x=0,w=h.length;x<w;x++){var v=h[x];var z=v.Id;var p=v.Units;var t={};t.relId=z;t.relelements={allocation:""+p};t.updateAction="MODIFY";var m=n.getModelById(z);var l=m.get("TaskId");var g={};g.id=l;g.relateddata={assignees:[]};g.relateddata.assignees.push(t);g.updateAction="MODIFY";q.push(g)}}if(u.removed){var k=u.removed;for(var x=0,w=k.length;x<w;x++){var s=r.transport.sync.params;var v=k[x];var o=v.TaskId;if(y.includes(o)){continue}var z=v.Id;var p=v.Units;var t={};t.relId=z;t.updateAction="DELETE";var g={};g.id=o;g.relateddata={assignees:[]};g.relateddata.assignees.push(t);g.updateAction="NONE";q.push(g)}}return q},formatAddedTask6WData:function(t,o){this.formatTaskDataForSync(t,o,"added");var r=t.taskStore.store;var s=[];var u=t.transport.sync.params.extraParam;for(var z=0,y=o.length;z<y;z++){var m=o[z];m.Duration=""+m.Duration;var C=m.PhantomId;delete m.Name;d.TaskPhantomId=C;var l=u[C];var g=l.addTaskAbove;var v=l.type;var w="";var h="";if(g){h=l.selectedTaskId}else{h=m.parentId}var k=r.getModelById(h);var A=k.parentNode.get("Type");if(g){h=l.selectedTaskId;w=h;if(undefined!=A){var p=this.get6WTaskDataSkeleton();var x=k.parentNode.get("Id");p.id=x;p.updateAction="MODIFY";var B=this.get6WTaskDataSkeleton();B.updateAction="CREATE";B.id=C;B.type=v;this.convertTo6WKeyValues(m);B.dataelements=m;B.relelements={nextTaskId:w};p.children.push(B);s.push(p)}else{var B=this.get6WTaskDataSkeleton();B.updateAction="CREATE";B.id=C;B.type=v;this.convertTo6WKeyValues(m);B.dataelements=m;B.relelements={nextTaskId:w};s.push(B)}}else{var q="";var k=r.getModelById(h);var n=k.childNodes.length;if(n>1){q=k.childNodes[n-2].id}if(undefined!=A){var p=this.get6WTaskDataSkeleton();p.id=h;p.updateAction="MODIFY";var B=this.get6WTaskDataSkeleton();B.updateAction="CREATE";B.id=C;B.type=v;this.convertTo6WKeyValues(m);B.dataelements=m;B.relelements={previousTaskId:q};p.children.push(B);s.push(p)}else{var B=this.get6WTaskDataSkeleton();B.updateAction="CREATE";B.id=C;B.type=v;this.convertTo6WKeyValues(m);B.dataelements=m;B.relelements={previousTaskId:q};s.push(B)}}}return s},formatUpdateTask6WData:function(o,n){this.formatTaskDataForSync(o,n,"updated");var g=[];for(var l=0,h=n.length;l<h;l++){var m=this.get6WTaskDataSkeleton();var k=n[l];if(k.Duration){k.Duration=""+k.Duration}m.id=k.Id;m.updateAction="MODIFY";this.convertTo6WKeyValues(k);m.dataelements=k;g.push(m)}return g},appendPredecessor6WData:function(x,y,r,H){var o=[];var A=x.transport.sync.params;if(y.updated){var z=y.updated;var n=x.taskStore.store.dependencyStore;var g={};for(var F=0,E=z.length;F<E;F++){var q=z[F];var k=q.isExtDep?q:n.getModelById(q.Id).data;var t=k.To;if(q.Lag!=undefined){q.Lag=""+q.Lag}var s=k.From;if(H.includes(t)||H.includes(s)){continue}if(q.Type=="0"){q.Type="SS"}else{if(q.Type=="1"){q.Type="SF"}else{if(q.Type=="2"){q.Type="FS"}else{if(q.Type=="3"){q.Type="FF"}}}}var l="MODIFY";var C=this.get6WDependencyDataSkeleton(l);C.id=k.From;this.convertTo6WKeyValues(q);C.relelements=q;var I={};if(g.hasOwnProperty(t)){g[t].push(C)}else{g[t]=[C]}}for(var F=0,E=r.length;F<E;F++){var G=r[F];var D=G.id;if(g[D]&&g[D].length>0){if(G.updateAction!="DELETE"){G.relateddata.predecessors=G.relateddata.predecessors.concat(g[D])}delete g[D]}}}if(y.added){var B=y.added;var n=x.taskStore.store.dependencyStore;var g={};for(var F=0,E=B.length;F<E;F++){var q=B[F];var t=q.To;var s=q.From;if(q.Lag){q.Lag=""+q.Lag}if(H.includes(t)||H.includes(s)){continue}var m=q.$PhantomId;var J=t+"-"+s;f[J]=m;if(q.Type=="0"){q.Type="SS"}else{if(q.Type=="1"){q.Type="SF"}else{if(q.Type=="2"){q.Type="FS"}else{if(q.Type=="3"){q.Type="FF"}}}}var l="CREATE";var C=this.get6WDependencyDataSkeleton(l);C.id=s;this.convertTo6WKeyValues(q);C.relelements=q;var I={};if(g.hasOwnProperty(t)){g[t].push(C)}else{g[t]=[C]}}for(var F=0,E=r.length;F<E;F++){var G=r[F];var D=G.id;if(g[D]&&g[D].length>0){if(G.updateAction!="DELETE"){G.relateddata.predecessors=G.relateddata.predecessors.concat(g[D])}delete g[D]}}}if(y.removed){var p=y.removed;var n=x.taskStore.store.dependencyStore;var w=[];var g={};for(var F=0,E=p.length;F<E;F++){var q=p[F];if(!q.isExtDep){w.push({Id:q.Id})}var t=q.To;var s=q.From;if(H.includes(t)||H.includes(s)){continue}var l="DELETE";var C=this.get6WDependencyDataSkeleton(l);C.relId=q.Id;var I={};if(g.hasOwnProperty(t)){g[t].push(C)}else{g[t]=[C]}}for(var F=0,E=r.length;F<E;F++){var G=r[F];var D=G.id;if(g[D]&&g[D].length>0){if(G.updateAction!="DELETE"){G.relateddata.predecessors=G.relateddata.predecessors.concat(g[D])}delete g[D]}}x.transport.sync.params.removedDepArray=w}var v=[];for(var J in g){if(g.hasOwnProperty(J)){var u=g[J];var h=this.get6WTaskDataSkeleton();h.id=J;h.updateAction="MODIFY";h.relateddata.predecessors=h.relateddata.predecessors.concat(u);v=v.concat(h)}}return v},format6WData:function(x,u){f={};d={};b={};var q=[];var t=x.taskStore.store.getRoot().childNodes[0].data.Id;var p=[];if(u.tasks){var n=u.tasks;if(n.updated){var h=n.updated;p=p.concat(this.formatUpdateTask6WData(x,h))}if(n.added){var w=n.added;p=p.concat(this.formatAddedTask6WData(x,w))}if(n.removed){var s=n.removed;p=p.concat(this.formatDeletedTask6WData(x,s,q))}if(n.updated){for(var m=0;m<n.updated.length;m++){if(n.updated[m].ExternalRawDependencies){var l=n.updated[m].ExternalRawDependencies;if(!u.dependencies){u.dependencies={};u.dependencies.added=[];u.dependencies.updated=[];u.dependencies.removed=[]}else{if(!u.dependencies.updated){u.dependencies.updated=[]}if(!u.dependencies.added){u.dependencies.added=[]}if(!u.dependencies.removed){u.dependencies.removed=[]}}if(l.updated){var r=u.dependencies.updated;u.dependencies.updated=r.concat(l.updated)}if(l.added){var o=u.dependencies.added;u.dependencies.added=o.concat(l.added)}if(l.removed){var i=u.dependencies.removed;u.dependencies.removed=i.concat(l.removed)}delete n.updated[m].ExternalRawDependencies;delete n.updated[m].ExternalDependencies}}}}if(u.dependencies){p=p.concat(this.appendPredecessor6WData(x,u.dependencies,p,q))}if(u.assignments){var g=u.assignments;p=p.concat(this.formatAssignment6WData(x,g,q))}var k={};var t=x.taskStore.store.getRoot().childNodes[0].data.Id;k.id=t;k.updateAction="MODIFY",k.relateddata={tasks:p};var v=[];v.push(k);return v},formatRequestData:function(h,g){},formatTaskDataForSync:function(r,g,o){if(o=="updated"){for(var l=g.length-1;l>=0;l--){var k=g[l];delete k.index;if(k.StartDate||k.EndDate||k.Duration){var h=k.Id;var m=r.taskStore.store.getModelById(h);if(App.Infra.Load.Level!=0&&!m){console.log("Updated:"+g[l]);delete g[l]}if(k.ConstraintDate&&!k.ConstraintType){k.ConstraintType=m.get("ConstraintType")}if(m){if(m.get("leaf")==false){delete k.StartDate;delete k.EndDate;delete k.Duration}else{if(k.ConstraintType||k.ConstraintDate){var q=k.ConstraintType;if("startnoearlierthan"==q){if(k.EndDate){delete k.EndDate}}else{if("finishnoearlierthan"==q){if(k.StartDate){delete k.StartDate}}}if(k.StartDate){k.StartDate=this.getFormattedDate(new Date(k.StartDate))}if(k.EndDate){k.EndDate=this.getFormattedDate(new Date(k.EndDate))}}else{delete k.StartDate;delete k.EndDate}delete k.ConstraintType;delete k.ConstraintDate;k.TaskProjectId=m.get("TaskProjectId")}}}else{if(k.ConstraintType||k.ConstraintDate){delete k.ConstraintType;delete k.ConstraintDate}}}}if(o=="added"){var j=r.transport.sync.params.extraParam;for(var l=0;l<g.length;l++){var k=g[l];var n=k.PhantomId;var p=j[n];k.addTaskAbove=p.addTaskAbove;k.type=p.type;if(k.addTaskAbove==true){k.selectedTaskId=p.selectedTaskId}if(k.StartDate){k.StartDate=this.getFormattedDate(new Date(k.StartDate))}if(k.EndDate){k.EndDate=this.getFormattedDate(new Date(k.EndDate))}}}},getCriticalTasksArray:function(r,m){var j=new Array();var n=r.length;for(var o=0;o<n;o++){var h=r[o];var i=h.id;var g=h.dataelements;var l=g.criticalTask;if("TRUE"==l){var k=m.getModelById(i);if(k){j.push(k)}}var p=h.children;if(p&&p.length>0){var q=this.getCriticalTasksArray(p,m);j=j.concat(q)}}return j},getGanttTableColumnArray:function(j){var g=Ext.ComponentQuery.query("#dpmprojectgantt")[0];var l=[];if(g){var q=g.columns;for(var n=0;n<q.length;n++){var r=q[n];var p=r.dataIndex;if(r&&r.hidden==true){continue}l.push(r);if(q[n].columns){var s=q[m].columns;for(var m=0,o=s.length;m<o;m++){var h=s[m];l.push(h)}}}}return l}};return e});