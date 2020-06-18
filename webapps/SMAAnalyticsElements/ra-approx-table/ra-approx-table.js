require(["UWA/Core","DS/Tree/TreeListView","DS/Tree/TreeNodeModel","DS/UIKIT/DropdownMenu","i18n!DS/SMAAnalyticsNLS/assets/nls/SMAAnalyticsNLSfile"],function(e,I,w,m,q){var v;var l;var B={};var n=[];var K=[];var C=0.005;var h=undefined;var o="wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-full approx-em rmse-success",a="wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-shield-1 approx-em rmse-success",c="wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-shield-2 approx-em rmse-success",A="wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-full approx-em rmse-fail";var i=function(L){Object.keys(L).forEach(function(O){if(L.hasOwnProperty(O)){B[O]=[];var N=L[O];if(typeof N.measures!=="undefined"&&N.measures!==null&&Object.keys(N.measures).length>0){var M=Object.keys(N.measures);if(typeof N.measures[M[0]].cv_RMSE!="undefined"&&N.measures[M[0]].cv_RMSE!=null){M.forEach(function(P){B[O].push(parseFloat(N.measures[P].cv_RMSE)<=C)},this)}}}},this)};var r=function(L){var P=typeof L.getManager==="function"?L.getManager():L.manager;var M=P.getSelectedRows();var N=M.map(function(Q){return P.getTreeNodeModelFromRowID(Q).options.grid.approx_id});if(N.length===0){return}var O=!(n instanceof Array)||n.length!==N.length;if(!O){O=n.some(function(Q,R){return Q!==N[R]},this)}if(O){n=N;this.fire("onApproximationSelectionChange",n)}};var j=function(L){console.log("EDIT button click");l.fire("onEditApproximationSelect",L.nodeModel.options.grid.approx_id)};var y=function(L){console.log("CLONE button click");l.fire("onCloneApproximationSelect",L.nodeModel.options.grid.approx_id)};var f=function(L){console.log("REFRESH button click");l.fire("onRefreshApproximationSelect",L.nodeModel.options.grid.approx_id)};var s=function(L){console.log("DELETE button click");l.fire("onDeleteApproximationSelect",L.nodeModel.options.grid.approx_id)};var F=function(L){console.log("Export button click");l.fire("onExportApproximationSelect",L.nodeModel.options.grid.approx_id)};var z=function(L){console.log("Set up Optimization");l.fire("onOptimizeApproximationSelect",L.nodeModel.options.grid.approx_id)};var x=function(L){console.log("Fit cell click");l.fire("onFitCellClick",L.nodeModel.options.grid)};var D=function(N){if(!N.isHeader){var M=N.nodeModel.options.grid.approx_color||"#000000";var L=document.createElement("div");L.classList.add("approx-color-cell");L.style.width="100%";L.style.height="100%";L.style["background-color"]=M;N.cellView.getContent().setContent(L);N.cellView.getContent().title=M}};var b=function(P){if(!P.isHeader){var L=P.nodeModel.options.grid.status,N="",M=document.createElement("div");if("INITIALIZATION"===L||"VALIDATION"===L){M.className="approx-loading";M.innerHTML="<span>.</span><span>.</span><span>.</span>";M.id=P.nodeModel.options.grid.name+"_loading"}else{switch(L){case"READY":N="wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-check";break;case"ERROR_NO_PARAMETERS":case"ERROR_NO_INPUTS":case"ERROR_NO_OUTPUTS":case"ERROR_NO_DATA":case"OUT_OF_DATE":case"CREATION_FAILED":case"NOT_AVAILABLE":N="wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-issue";break;default:N="";break}M.className="approx-status-container";var O=document.createElement("span");O.id=P.nodeModel.options.grid.name+"-status-icon";O.className=N;M.appendChild(O)}M.setAttribute("title",q.get("ASTAT_"+L));P.cellView.getContent().setContent(M);P.cellView.getContent().title=L}};var G=function(N){if(!N.isHeader){var L=N.nodeModel.options.grid.status,M=document.createElement("div");if("INITIALIZATION"===L||"VALIDATION"===L){M.className="approx-loading";M.innerHTML="<span>.</span><span>.</span><span>.</span>";M.id=N.nodeModel.options.grid.name+"_loading";M.setAttribute("title",q.get("ASTAT_"+L))}else{var P=B[N.nodeModel.options.grid.approx_id];if(!Array.isArray(P)||P.length===0){return}var S=N.nodeModel.options.grid.name;var Q=document.createElement("span");M.className="approx-fit-container";M.id=S+"-emicon";Q.id=S+"_em";var R=P.filter(function(T){return T}).length,O=R/P.length;if(O===0){Q.setAttribute("title",q.get("FAIL_FOR_ALL"));Q.className=A}else{if(O===1){Q.setAttribute("title",q.get("GOOD_FIT_FOR_ALL"));Q.className=o}else{if(O<0.3){Q.setAttribute("title",q.get("GOOD_FIT_FOR")+R+"/"+P.length+q.get("_OUTPUTS"));Q.className=a}else{if(O>0.3){Q.setAttribute("title",q.get("GOOD_FIT_FOR")+R+"/"+P.length+q.get("_OUTPUTS"));Q.className=c}}}}M.appendChild(Q);M.addEventListener("click",x.bind(this,N))}N.cellView.getContent().setContent(M)}};var u=function(O,M,N){var L=[],P=M.nodeModel.options.grid.status;L=L.concat([{name:"delete",text:q.get("DELETE"),title:q.get("DELETE"),fonticon:"trash",handler:s.bind(this,M)},{name:"export",text:q.get("EXPORT"),title:q.get("EXPORT"),fonticon:"export",handler:F.bind(this,M)}]);if(N&&N.toLowerCase()!=="multimethod"){L.push({name:"edit",text:q.get("Edit"),title:q.get("Edit"),fonticon:"pencil",handler:j.bind(this,M)});L.push({name:"duplicate",text:q.get("DUPLICATE"),title:q.get("DUPLICATE"),fonticon:"copy",handler:y.bind(this,M)});if(P==="OUT_OF_DATE"||P==="NOT_AVAILABLE"||P==="CREATION_FAILED"){L.push({name:"retrain",text:q.get("RETRAIN"),title:q.get("RETRAIN"),fonticon:"refresh",handler:f.bind(this,M)})}}if(P==="READY"){L.push({name:"optimize",text:"Optimize",title:"Optimize",fonticon:"lamp",handler:z.bind(this,M)})}new m({target:O,items:L})};var k=function(N){if(!N.isHeader){var M=document.createElement("div");M.className="approx-actions-container";var O=document.createElement("span");O.id=N.nodeModel.options.grid.name+"-action-icon";O.className="wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-chevron-down";O.setAttribute("title",q.get("OPTIONS"));M.appendChild(O);var L=N.nodeModel.options.grid.status;if("INITIALIZATION"===L||"VALIDATION"===L){O.classList.add("approx-table-disabled")}else{O.classList.remove("approx-table-disabled");if(!window.dscef){u(O,N,N.nodeModel.options.grid.approx_type)}}N.cellView.getContent().setContent(M)}};var J=function(Q){if(!e.is(Q)||!e.is(Q.value)){console.error("Could not create the approximation selector table. No usable data was received.");return}var S=(e.is(Q.value,"string")?JSON.parse(Q.value):Q.value)||{};var P=Object.keys(S);var R=v.getDocument();var L=[];var M=n;if(K.length>0){K=K.filter(function(T){return P.indexOf(T)!==-1});var O=R.search({match:function(T){return(K.indexOf(T.nodeModel.options.grid.approx_id)===-1)}});O.forEach(function(U){U.remove();var T=U.options.grid.approx_id;delete B[T];n.splice(T,1)});if(M.length===0||M.length!==n.length){L=K.length>0?[K[0]]:[]}else{var N=M.every(function(U,T){U===n[T]});L=!N?n:[]}P=P.filter(function(T){return K.indexOf(T)===-1})}if(P.length>0){L=[P[0]];i(S);R.prepareUpdate();P.forEach(function(U){K.push(U);var T=new w({grid:{approx_id:U,name:S[U].displayName,status:S[U].status,approx_color:S[U].approx_color,approx_type:S[U].type}});R.addRoot(T);T.show()});R.pushUpdate();R.expandAll()}if(L.length>0){R.unselectAll();n=[];p(L,true);this.fire("onApproximationSelectionChange",n)}};var p=function(L,M){var N=v.getDocument().getAllDescendants();if(Array.isArray(L)&&L.length>0){L.forEach(function(O){if(n.indexOf(O)<0){n.push(O);N.forEach(function(P){if(O===P.options.grid.approx_id){P.select(M)}})}},this)}};var d=function(M){if(e.is(M)){var L=(e.is(M,"string")?JSON.parse(M):M)||{};h=e.extend((h||{}),L)}};var E=function(M){var L=parseFloat(M);C=(!isNaN(L))?L:C};var g=function(L){i(L);var M=v.getDocument();M.withTransactionUpdate(function(){M.getChildren().forEach(function(O){var P=O.options.grid.approx_id;var N=O.options.grid.em_actions;O.updateOptions({grid:{status:L[P].status}})})}())};var t=function(){l=this;var L=document.querySelector("#approxtablecontainer");if(typeof L!=="undefined"&&L!==null){v=new I(H);v.onNodeClick(function(M){if(!M.isHeader){if(M.event){var N=M.event.srcElement||M.event.target;if((N.id.indexOf("-action-icon")===-1&&!N.classList.contains("approx-em"))||M.event.ctrlKey||M.event.shiftKey){r.call(this,M)}}}}.bind(this));v.getDocument().addEventListener("unselect",function(){r.call(this,v)}.bind(this));v.inject(document.querySelector("#approxtablecontainer"));this.fire("onComponentReady")}};var H={resize:{columns:false},apiVersion:2,height:"auto",width:"auto",expanderStyle:"none",shouldAcceptDrag:function(){return false},selection:{unselectAllOnEmptyArea:true,toggle:false,canMultiSelect:true},show:{rowHeaders:false,columnHeaders:true},defaultCellHeight:32,columns:[{dataIndex:"tree",isHidden:true,isEditable:false,width:"0%",isDraggable:false},{dataIndex:"approx_color",width:"7%",isEditable:false,isSortable:false,isDraggable:false,onCellRequest:D},{dataIndex:"approx_type",width:"0%",isHidden:true,isDraggable:false,isEditable:false},{text:q.get("NAME"),dataIndex:"name",width:(function(){return window.dscef?"45%":"35%"}()),isEditable:false,isDraggable:false,isSortable:true,},{text:q.get("Status"),dataIndex:"status",width:(function(){return window.dscef?"30%":"20%"}()),isEditable:false,isSortable:false,isDraggable:false,onCellRequest:b},{text:q.get("Fit"),dataIndex:"fit",width:"20%",isEditable:false,isSortable:false,isDraggable:false,onCellRequest:G},{dataIndex:"approx_actions",width:(function(){return window.dscef?"0%":"20%"}()),isEditable:false,isSortable:false,isDraggable:false,onCellRequest:k}]};Polymer({is:"ra-approx-table",properties:{approximations:{type:Object,notify:true},selectedApproximations:{type:"Array",notify:true,observer:"onSelectedApproximationsUpdate"},rmsemax:{type:Number,notify:true,value:C,observer:"onRMSEMaxUpdate"},tableOptions:{type:Object,notify:true,observer:"onTableOptionsUpdate"}},observers:["onApproximationsUpdate(approximations.*)"],ready:t,onApproximationsUpdate:J,onSelectedApproximationsUpdate:p,onRMSEMaxUpdate:E,onTableOptionsUpdate:d,getRMSEMaxBound:function(){return C},updateStatus:g,__getWuxTree:function(){return v}})});