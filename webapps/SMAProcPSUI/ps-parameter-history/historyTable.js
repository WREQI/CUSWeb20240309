var datagrid,spinner,model,jobObject={},virtualRowID;function clearGrid(){if(datagrid){try{spinner.destroy();spinner=null;document.getElementById("spinner").textContent="";datagrid.getManager().unloadDocument();datagrid.destroy();model=null;datagrid=null;document.getElementById("e1").textContent="";jobObject={};virtualRowID=null}catch(a){window.console.log(a)}}}function headerWidth(c){var a=document.createElement("span");a.style.visibility="hidden";a.style["white-space"]="nowrap";a.style["font-size"]="14px";a.style["font-weight"]="300 !important";a.style["font-family"]="Arial, Helvetica, sans-serif";document.body.appendChild(a);a.innerHTML=c;var b=a.offsetWidth;document.body.removeChild(a);return b+15}function loadDataGrid(a){require(["UWA/Core","UWA/Element","DS/Tree/TreeListView","DS/Tree/TreeDocument","DS/Tree/TreeNodeModel","DS/Utilities/Dom","DS/UIKIT/Spinner"],function(q,n,h,j,l,s,i){try{var m;if(!datagrid){var b=document.getElementById("loading-overlay");b.classList.add("show");spinner=new i();spinner.inject(document.getElementById("spinner"));model=new j({useAsyncPreExpand:true});model.prepareUpdate();var v=a.data;for(var g=0;g<v.length;g+=1){var r=new l({label:g,grid:v[g]});model.addRoot(r);r=null}model.pushUpdate();delete a.data;a.show={rowHeaders:false,columnHeaders:true};a.defaultCellHeight=30;a.resize={columns:true,rows:false};a.showVerticalLines=true;a.apiVersion=2;a.enableActiveUI=true;a.enableDragAndDrop=false;a.enableKeyboardNavigation=false;a.performances={buildLinks:false};a.onContextualEvent={callback:function u(z){var y=[];if(z&&z.treeview){var x=z.treeview;if(x.cellModel&&!x.isHeader){if((jobObject.jobExecutionStatus==="Failed"||jobObject.jobExecutionStatus==="Aborted"||jobObject.jobExecutionStatus==="Completed")&&jobObject.isWebInWin){if(virtualRowID){datagrid.getManager().unhighlightRow(virtualRowID)}virtualRowID=x.virtualRowID;var w=model.getNthRoot(virtualRowID);datagrid.getManager().setActiveNode(w);y.push({type:"PushItem",title:"Set Process Parameter Values",icon:"",action:{callback:function(){if(virtualRowID){var C=datagrid.getNthRoot(virtualRowID);datagrid.getManager().unsetActiveNode(C)}var A=datagrid.getManager().getRowModel(x.virtualRowID);if(A){var B=A["RUN ID"];if(B){if(window.dscef){window.dscef.sendString("SetAsInput",jobObject.selectedActivityPath,B)}else{if(window.parent&&window.parent.dscef){window.parent.dscef.sendString("SetAsInput",jobObject.selectedActivityPath,B)}}}}}}})}}}return y}};datagrid=new h(a);m=datagrid.getManager();m.onReady(function(){m.loadDocument(model);var w=m.options.columns[0].dataIndex;m.hideColumn(w)});datagrid.inject(document.getElementById("e1"));s.onNodeRendered(datagrid.getManager().elements.container,function(){a={};setTimeout(function(){var w=datagrid.getManager(),x=w.getNumberOfRows();w.scrollToRow(x);b.classList.remove("show")},1000)});spinner.hide()}else{model.prepareUpdate();var k=model.getAllDescendants().length;var o=model.getNthRoot(k-1);if(o&&o.options&&o.options.grid){if(a.data&&a.data.length>0){var f=a.data[0]["RUN ID"];var c=o.options.grid["RUN ID"];if(f===c){model.removeRoot(o);k=k-1}}}var e;for(e=0;e<a.data.length;e+=1){var t=new l({label:k+e,grid:a.data[e]});model.addRoot(t);t=null}model.pushUpdate();m=datagrid.getManager();var d=m.getNumberOfRows();m.scrollToRow(d,"bottom");a.data=[];a={}}datagrid.getManager().onCellClick(function(A){virtualRowID=A.virtualRowID;var z=model.getNthRoot(virtualRowID);if(z&&z.options&&z.options.grid){var x=z.options.grid;var y=x["RUN ID"].split(".");var w={operation:"highlight",model:x,runId:y[y.length-1]};w=JSON.stringify(w);window.parent.postMessage(w,"*")}})}catch(p){window.console.log(p)}})}function loadData(d){var b=d.data.data;if(b.data){b.data=b.data.map(function(f){for(var e in f){if(f.hasOwnProperty(e)&&typeof f[e]==="string"&&f[e].indexOf("<")>-1){f[e]=f[e].replace(/</g,"&lt;")}}return f})}if(!datagrid){for(var a=0;a<b.columns.length;a++){var c=headerWidth(b.columns[a].text);if(b.columns[a].dataIndex==="RUN ID"){b.columns[a].sortFunction=function(l,j){var k=l.options.grid["RUN ID"].split(".");var e=j.options.grid["RUN ID"].split(".");for(var g=0;g<e.length;g+=1){var h=Number(e[g]);var f=Number(k[g]);if(h===f){continue}else{if(h<f){return -1}else{if(h>f){return 1}}}}return 0}}else{if(b.columns[a].dataIndex==="STATUS"){b.columns[a].sortFunction=function(e,f){f=f.options.grid.STATUS;e=e.options.grid.STATUS;if(f===e){return 0}else{if(f<e){return -1}else{if(f>e){return 1}}}}}else{b.columns[a].sortFunction=(function(){var e=b.columns[a].dataIndex;return function(i,j){var h;var f=j.options.grid[e];var k=i.options.grid[e];if(k===f){h=0}else{var l=Number(k);var g=Number(f);if(isNaN(l)||isNaN(g)){h=k<f?-1:1}else{h=l<g?-1:1}}return h}})()}}if(c>100){if(c<250){b.columns[a].width=c}else{b.columns[a].width=250}}}}loadDataGrid(b);jobObject.jobExecutionStatus=b.jobExecutionStatus;jobObject.selectedActivityPath=b.selectedActivityPath;jobObject.isWebInWin=b.isWebInWin}function receiveMessage(b){var f=b.data.type;switch(f){case"odt-trace":return;case"add":loadData(b);break;case"clear":clearGrid();break;case"rects":var c=document.getElementsByClassName("wux-scroller");if(c.length!==0){var g=c[0].children[0];var i=g.clientWidth;var a=c[0].clientWidth;var h=a-i;try{var d={scrollerContentWidth:i,scrollerClientWidth:a,remainingSpace:h};window.parent.postMessage({type:"rects",data:d},"*")}catch(e){}}break;default:break}}if(window.addEventListener){window.addEventListener("message",receiveMessage,true)}else{window.attachEvent("onmessage",receiveMessage)};