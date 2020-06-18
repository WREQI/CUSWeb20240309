define("DS/LifecycleCmd/ImageUtil",["DS/LifecycleServices/LifecycleServicesSettings",],function(b){function a(){this.data={}}a.prototype={getTypeIconUrl:function(d){var e="";var c=d.options||d.object.options;if(c&&c.icons){e=c.icons[0];if(e!=null&&e.startsWith("/")){e=b.getServerURL()+e}}return e},getTypeIconUrlFromExpandedAssembly:function(d){var e="";var c=null;if(d!==undefined&&d!==null&&d.hasOwnProperty("options")||(d.hasOwnProperty("object")&&d.object.hasOwnProperty("options"))){c=d.options||d.object.options}else{if(d!==undefined&&d!==null&&d.hasOwnProperty("attributes")){c=d.attributes}}if(c&&c.icons){e=c.icons[0];if(e!=null&&e.startsWith("/")){e=b.getServerURL()+e}}else{if(c&&c.type_icon_url){e=c.type_icon_url;if(e!=null&&e.startsWith("/")){e=b.getServerURL()+e}}}return e},createElement:function(e,c){var d=document.createElement("img");d.src=e;if(c){c.appendChild(d)}return d}};return new a()});define("DS/LifecycleCmd/Dictionary",["UWA/Class"],function(a){return a.extend({init:function(){this.data={}},add:function(b,c){this.data[b]=c},find:function(b){return this.data[b]},remove:function(b){delete this.data[b]},contains:function(b){return this.data[b]==null?false:true},count:function(){var b=0;Object.keys(this.data).map(function(c){++b});return b},clear:function(){this.data={}},each:function(b){var c=this.data;Object.keys(this.data).map(function(d){b(d,c[d])})}})});define("DS/LifecycleCmd/MessageMediator",["UWA/Class","UWA/Controls/Abstract"],function(a,c){var b=a.singleton({init:function(){var d=c.extend({});this.mediator=new d()},addEvent:function(e,f,d){this.mediator.addEvent(e,f,d)},removeEvent:function(e,f,d){this.mediator.removeEvent(e,f,d)},hasEvent:function(d){return this.mediator.hasEvent(d)},dispatchEvent:function(d,e){this.mediator.dispatchEvent(d,e)},clear:function(){var d=c.extend({});this.mediator=new d()}});return b});define("DS/LifecycleCmd/Queue",["UWA/Class"],function(a){return a.extend({init:function(){this.data=[]},enqueue:function(b){this.data.push(b)},dequeue:function(){return this.data.shift()},front:function(){return this.data[0]},back:function(){return this.data[this.data.length-1]},length:function(){return this.data.length},clear:function(){this.data=[]}})});define("DS/LifecycleCmd/TargetFolderUtil",["UWA/Class","DS/LifecycleServices/LifecycleServicesSettings","DS/LifecycleServices/LifecycleServices",],function(b,d,c){var a=b.extend({getTargetFolderId:function(e){if(this._isTargetFolderEnforced()||this._isContextFolderEditor(e)){return d.getCurrentFolderID()}return null},_isTargetFolderEnforced:function(){return d.getEnforceFolderLinkSetting()},_isContextFolderEditor:function(g){if(!g){return false}var f=false;var e=c.getCurrentAppName(g);console.log(e);if(e!=null&&e.indexOf("ENOFOL")>=0){f=true}return(f)}});return new a()});define("DS/LifecycleCmd/Set",["UWA/Class"],function(b){return b.extend({init:function(){this._values={};this._size=0;this._hashFn=JSON.stringify},add:function f(g){if(!this.contains(g)){this._values[this._hashFn(g)]=g;this._size++}},remove:function a(g){if(this.contains(g)){delete this._values[this._hashFn(g)];this._size--}},contains:function d(g){return typeof this._values[this._hashFn(g)]!=="undefined"},size:function c(){return this._size},each:function e(h,g){for(var i in this._values){h.call(g,this._values[i])}}})});define("DS/LifecycleCmd/PatchDisplayNotification",["DS/LifecycleServices/LifecycleServices"],function(b){function a(){}a.prototype={createFunction:function(d){var c=b.getCurrentAppName(d);if(c==="DELMFN_AP"){if(!d.displayNotification){d.displayNotification=function(e){if(typeof d.getAlertManager==="function"){d.getAlertManager().add({className:e.eventID,message:e.msg})}}}}else{if(c==="DELMGA_AP"){if(!d.displayNotification&&require.defined("DS/DELWebMfgAssetsDefUIServices/UIUtils")){d.displayNotification=function(e){var f=require("DS/DELWebMfgAssetsDefUIServices/UIUtils");if(f&&f.AlertManager){f.AlertManager.add({className:e.eventID,message:e.msg})}}}}}}};return new a()});define("DS/LifecycleCmd/Stack",["UWA/Class"],function(a){return a.extend({init:function(){this.data=[];this.top=0},push:function(b){this.data[this.top++]=b},pop:function(){if(this.top<=0){throw new Error("Stack empty!")}return this.data[--this.top]},peek:function(){if(this.top<=0){throw new Error("Stack empty!")}return this.data[this.top-1]},length:function(){return this.top},clear:function(){this.data=[];this.top=0}})});define("DS/LifecycleCmd/LifecycleCmd",[],function(){return{}});define("DS/LifecycleCmd/CommandAPI",["DS/ApplicationFrame/CommandsManager","DS/WebappsUtils/WebappsUtils","i18n!DS/LifecycleWidget/assets/nls/LifecycleWidgetNls"],function(c,e,f){var a={Properties:{fw:undefined,icon:"I_CATSSEditorDisplayProperties.png",title:f.properties},DeleteHdr:{fw:"LifecycleCmd",icon:"I_Delete.png",title:f.delete_},MaturityHdr:{fw:"LifecycleCmd",icon:"I_Maturity.png",title:f.maturity},RevisionHdr:{fw:"LifecycleCmd",icon:"I_Revise.png",title:f.newRevision},NewBranchHdr:{fw:"LifecycleCmd",icon:"I_NewBranch.png",title:f.newBranch},ReviseFromHdr:{fw:"LifecycleCmd",icon:"I_ReviseFrom.png",title:f.newRevisionFrom},DuplicateHdr:{fw:"LifecycleCmd",icon:"I_Duplicate.png",title:f.duplicate}};function d(g,h){var j=e.getWebappsBaseUrl();var i=h||"RevisionFamily";return j+i+"/assets/icons/32/"+g}function b(h,i){var g={_context:i,_selection:[{getID:function(){return h}}],getSecurityContext:function(){return this._context},getSelectedNodes:function(){return this._selection},displayNotification:function(){}};require(["DS/LifecycleControls/EditPropDialog"],function(k){var j=new k();j.launchProperties(g)})}return{checkAvailability:function(l,h,i,j){if(l==="Properties"){return true}var g=false,k;for(k in a){if(k===l){g=true;break}}if(g){k=c.getCommand(l,i);g=(k&&k.isTypesSupported([h[0].type]))}return g},runCommand:function(k,g,h,i){if(k==="Properties"){b(g[0].physicalid,i)}else{var j=c.getCommand(k,h);j&&j.execute(g)}},getIcon:function(g){return"url("+d(a[g].icon,a[g].fw)+")"},getIconPath:function(g){return d(a[g].icon,a[g].fw)},getTitle:function(g){return a[g].title},commands:Object.keys(a),getCallbackFunction:function(j,n,i,g){var l=this;var k=j,p=n,o=i,m=g;return function(){l.runCommand(k,p,o,m)}}}});define("DS/LifecycleCmd/AssemblySelectionUtil",["UWA/Class","DS/LifecycleCmd/ImageUtil"],function(b,c){var a=b.extend({_context:null,getSelection:function(e,h){var f=[];if(!e){return f}this._context=e;var d=h;var g=null;if(d){g=this._createSelObj4Node.bind(this)}else{if(typeof e.getSelectedNodes!=="function"){return f}d=e.getSelectedNodes();if(!d){return f}g=this._createSelObj.bind(this)}d.forEach(function(i){var j=g(i);f.push(j)},this);return f},_createSelObj:function(g){var d=this._getRevision(g);var f=this._getType(g);var i=undefined;var e=undefined;if(g.getAttribute){i=g.getAttribute("ds6w:type");e=g.getAttribute("ds6w:status")}if(i==undefined){i=f}if(e==undefined&&g.hasOwnProperty("object")&&g.object){e=g.object.current}var h={physicalid:g.getID(),name:g.getLabel(),displayName:this._getDisplayName(g,d),type:f,typeDisplayName:i,current:e,revision:d,tenant:this._getTenant(g),imageUrl:c.getTypeIconUrl(g)};return h},_createSelObj4Node:function(d){var f=d.Title;if(d.revision){f+=" "+d.revision}var e={physicalid:d.id||d.nodeID||d.physicalid,name:d.Title,displayName:f,type:d.type,revision:d.revision,tenant:this._getTenant(d),imageUrl:c.getTypeIconUrlFromExpandedAssembly(d)};return e},_getType:function(f){var e=null;try{e=f.options.type;if(e===undefined){e=f.options.grid["ds6w:type"]}if(e===undefined){e=f.options.grid["ds6wg:type"]}}catch(d){if(f.object&&f.object.type){e=f.object.type}else{if(f.type){e=f.type}}}if(e==null&&f.getType!=null){e=f.getType()}return e},_getRevision:function(f){var d;try{d=f.object.revision}catch(e){d=f.options.grid["ds6wg:revision"];if(d===undefined){d=f.options.grid["ds6w:revision"]}}if(d==null){d=""}return d},_getDisplayName:function(f,e){var d;if(typeof f.getDisplayName==="function"){d=f.getDisplayName()}else{if(f.options.display){d=f.options.display}else{d=f.getLabel()}if(e!==""){d=d+" "+e}}return d},_getTenant:function(e){var f=null;try{if(e.getTenant){f=e.getTenant()}else{f=widget.getValue("x3dPlatformId")}}catch(d){}return f}});return a});define("DS/LifecycleCmd/SelectionUtil",["UWA/Class","DS/LifecycleCmd/ImageUtil"],function(b,c){var a=b.extend({_context:null,getSelection:function(e,h){var f=[];if(!e){return f}this._context=e;var d=h;var g=null;if(d){g=this._createSelObj4Node.bind(this)}else{if(typeof e.getSelectedNodes!=="function"){return f}d=e.getSelectedNodes();if(!d){return f}g=this._createSelObj.bind(this)}d.forEach(function(i){var j=g(i);f.push(j)},this);return f},_getAttValue:function(f,e){var d=undefined;if(f.getAttribute){d=f.getAttribute(e)}else{if(f.options&&f.options.grid){d=f.options.grid[e]}}return d},_createSelObj:function(g){var d=this._getRevision(g);var f=this._getType(g);var i=this._getAttValue(g,"ds6w:type");var e=this._getAttValue(g,"ds6w:status");if(i==undefined){i=f}if(e==undefined&&g.hasOwnProperty("object")&&g.object){e=g.object.current}var h={physicalid:g.getID(),name:g.getLabel(),displayName:this._getDisplayName(g,d),type:f,typeDisplayName:i,current:e,revision:d,tenant:this._getTenant(g),imageUrl:c.getTypeIconUrl(g)};return h},_createSelObj4Node:function(d){var f=d.displayName;if(d.revision){f+=" "+d.revision}var e={physicalid:d.id||d.nodeID||d.physicalid,name:d.displayName,displayName:f,type:d.type,revision:d.revision,tenant:this._getTenant(d),imageUrl:null};return e},_getType:function(f){var e=null;try{e=f.options.type;if(e===undefined){e=f.options.grid["ds6w:type"]}if(e===undefined){e=f.options.grid["ds6wg:type"]}}catch(d){if(f.object&&f.object.type){e=f.object.type}else{if(f.type){e=f.type}}}if(e==null&&f.getType!=null){e=f.getType()}return e},_getRevision:function(f){var d;try{d=f.object.revision}catch(e){d=f.options.grid["ds6wg:revision"];if(d===undefined){d=f.options.grid["ds6w:revision"]}}if(d==null){d=""}return d},_getDisplayName:function(f,e){var d;if(typeof f.getDisplayName==="function"){d=f.getDisplayName()}else{if(f.options.display){d=f.options.display}else{d=f.getLabel()}if(e!==""){d=d+" "+e}}return d},_getTenant:function(e){var f=null;try{if(e.getTenant){f=e.getTenant()}else{f=widget.getValue("x3dPlatformId")}}catch(d){}return f}});return a});define("DS/LifecycleCmd/CommandMgr",["UWA/Class","DS/LifecycleCmd/SelectionUtil","DS/LifecycleCmd/MessageMediator","DS/LifecycleCmd/Dictionary","DS/LifecycleCmd/Queue","DS/LifecycleServices/Refresh","DS/LifecycleCmd/PatchDisplayNotification","DS/LifecycleServices/LifecycleServicesSettings","DS/PlatformAPI/PlatformAPI"],function(a,g,f,h,c,e,j,b,i){var d=a.singleton({_initialized:false,currentLocation:null,init:function(){this._commands=new h();this._runningCommands=new h();this.selUtil=new g();this._UIUpdateQueue=new c();this._PSEContextWithDisabledEdit=false;e.init()},registerCommand:function(l,k){this._commands.add(l.name,l);this._initContext(k)},executeCmd:function(p,k,m){this._runningCommands.add(p.name,p);this._updateCmdUI(m.context);var l=function(){if(typeof m.onCompletedCallback==="function"){m.onCompletedCallback()}};try{e.setContext(m.context);f.dispatchEvent("LC_CmdMgr_preExecCmd",{cmd:p});var o=this;var n=this.selUtil.getSelection(m.context,m.targetNodes);k.executeCmd(n,m,function(){o._postCmdExec(p,m.context);l()})}catch(q){this._handleError(q,m.context);this._postCmdExec(p,m.context);l()}},_initContext:function(k){if(this._initialized){return}this._initialized=true;if(k){this._initCmdMgr(k);f.dispatchEvent("LC_CmdMgr_Init")}else{this._initPADContextAsync()}},_initCmdMgr:function(k){b.app_initialization(function(){});b.setFolderCommunicationChannel(k);j.createFunction(k);f.addEvent("LC_CmdMgr_UpdateUI",function(l){if(!l||typeof l.getSelectedNodes!=="function"){return}var m=l.getSelectedNodes();this._updateUIState(m)},this);setTimeout(function(){this._updateUIState([])}.bind(this))},_initPADContextAsync:function(){var k=this;require(["DS/PADUtils/PADContext"],function(m){var l=m.get();k._initCmdMgr(l);l.getPADTreeDocument().getXSO().onPostAdd(function(n){k._onSelChangePAD(l)});l.getPADTreeDocument().getXSO().onPostRemove(function(n){k._onSelChangePAD(l)});l.getPADTreeDocument().getXSO().onEmpty(function(n){k._onSelChangePAD(l)});i.subscribe("FolderEditor.CurrentFolder",function(n){k._onCurrentFolderChange(l,n)}.bind(k));l.addEvent("editModeModified",function(o){var n=!o;if(n!==k._PSEContextWithDisabledEdit){k._PSEContextWithDisabledEdit=n;k._onSelChangePAD(l)}});k._setCurrentLocation(l);k._PSEContextWithDisabledEdit=typeof(l.getEditMode)==="function"?l.getEditMode()!==true:false;f.dispatchEvent("LC_CmdMgr_Init")})},_getFolderSelectionObject:function(k){var l=this.selUtil.getSelection(k);if(l.length===1){return l[0]}return null},_inspectFolderLocation:function(n){var k={isTrashFolder:false,isFavorite:false};var l=typeof n.getCurrentFolder==="function"?n.getCurrentFolder():null;var m=JSON.parse(l);if(m){k.isTrashFolder=m.IsInDeletedItems?m.IsInDeletedItems:false;k.isFavorite=m.IsFavorite?m.IsFavorite:false}return k},_setCurrentLocation:function(l){var k=this._inspectFolderLocation(l);this.currentLocation=this._getFolderSelectionObject(l);if(this.currentLocation){this.currentLocation.IsInDeletedItems=k.isTrashFolder;this.currentLocation.IsLink=k.isFavorite}},_onSelChangePAD:function(k){var l=k.getPADTreeDocument().getXSO().get();this._UIUpdateQueue.enqueue(l);setTimeout(function(){this._queuedUpdateUIState()}.bind(this))},_onCurrentFolderChange:function(l,k){this._setCurrentLocation(l);this._UIUpdateQueue.enqueue([]);setTimeout(function(){this._queuedUpdateUIState();f.dispatchEvent("LC_CmdMgr_CurrentFolderChanged",k)}.bind(this))},_postCmdExec:function(l,k){this._runningCommands.remove(l.name,l);this._updateCmdUI(k);f.dispatchEvent("LC_CmdMgr_postExecCmd",{cmd:l})},_queuedUpdateUIState:function(){if(this._UIUpdateQueue.length()===0){return}var k=this._UIUpdateQueue.dequeue();this._updateUIState(k)},_updateUIState:function(o){var r="none";if(this.currentLocation){if(this.currentLocation.IsInDeletedItems){r="trash"}else{if(this.currentLocation.type){if(this._selectionContainsFolder([this.currentLocation.type])){r="standard"}}}}var m=false;if(o.length===0&&r==="standard"){o=[this.currentLocation];if(this.currentLocation.IsLink){m=true}}var n=o.length;var q=this.getSelTypeArray(o);var l=this._selectionContainsFolder(q);var p=this._PSEContextWithDisabledEdit;var k=function(s){return s.isSelCountSupported(n)&&(l===false||s.isFolderSelSupported())&&s.isFolderContextSupported(r)&&s.isTypesSupported(q)&&(p===false||s.isEnabledWhenPSEEditModeDisabled())&&!(m&&s.isLinkSupported()===false)&&s.remainEnabled()};this._commands.each(function(t,s){var w=s.getAsyncUpdate(o);var u=w?false:k(s);if(u){s.enable()}else{s.disable()}if(w){w.then(function(){u=k(s);if(u){s.enable()}else{s.disable()}})}})},getSelTypeArray:function(k){var l=[];k.forEach(function(n){var m=n.type?n.type:this.selUtil._getType(n);if(l.indexOf(m)===-1){l.push(m)}},this);return l},_selectionContainsFolder:function(l){var k=false;l.every(function(m){if(["Workspace","Workspace Vault","Personal Workspace","Folder","Personal Folder","RootFolder"].indexOf(m)>=0){k=true;return false}return true},this);return k},_updateCmdUI:function(k){var m=false;this._runningCommands.each(function(o,n){if(n.options.isAsynchronous===false){m=true}});if(m){this._commands.each(function(o,n){n.disable();n.commandRunningNotify(true)})}else{var l=this.selUtil.getSelection(k);this._updateUIState(l);this._commands.each(function(o,n){n.commandRunningNotify(false)})}},_handleError:function(m,l){console.log(m);if(!l){return}if(typeof l.displayNotification==="function"){var n=m;if(m.hasOwnProperty("message")){n=m.message}var k={eventID:"error",msg:n};l.displayNotification(k)}}});return d});define("DS/LifecycleCmd/CommandBase",["DS/LifecycleCmd/CommandMgr","DS/LifecycleCmd/TargetFolderUtil","DS/ApplicationFrame/Command"],function(c,b,a){var d=a.extend({name:"",context:null,init:function(f,e){this.name=e;f=f||{ID:"dummyID",context:{}};if(f.context===null){this._setPADContextAsync()}else{this.context=f.context}this._parent(f,{mode:"exclusive",isAsynchronous:false});c.registerCommand(this,f.context)},beginExecute:function(){},execute:function(){},endExecute:function(){},executeCmd:function(h,e,g){var f=null;if(typeof this.getTargetFolderId==="function"){f=this.getTargetFolderId(this.context)}else{f=b.getTargetFolderId(this.context)}if(e&&typeof e.forEach!=="function"){e=[e]}c.executeCmd(this,h,{context:this.context,targetFolderId:f,name:this.name,onCompletedCallback:g,targetNodes:e})},isSelCountSupported:function(e){return false},isFolderSelSupported:function(){return false},isTypesSupported:function(e){return true},isFolderContextSupported:function(e){return e==="trash"?false:true},isEnabledWhenPSEEditModeDisabled:function(){return false},isLinkSupported:function(){return true},getAsyncUpdate:function(e){return null},_setPADContextAsync:function(){var e=this;require(["DS/PADUtils/PADContext"],function(f){e.context=f.get()})},remainEnabled:function(){return true},commandRunningNotify:function(e){}});return d});define("DS/LifecycleCmd/DeleteDeletedItemsCmd",["DS/LifecycleCmd/CommandBase","DS/LifecycleServices/LifecycleServicesSettings","DS/LifecycleServices/LifecycleServices"],function(c,b,a){return c.extend({init:function(d){this._parent(d,"delete_deleteditems_command")},execute:function(){var d=this;require(["DS/DeleteWidget/DeleteWidget"],function(e){d.executeCmd(new e("destroy"))})},isSelCountSupported:function(d){return d===1},isTypesSupported:function(e){var d=true;e.every(function(f){if(["CATIA Embedded Component","CATAnalysisResults","CATAnalysisComputations"].indexOf(f)>=0){d=false;return false}return true},this);return d},isFolderContextSupported:function(d){return true}})});define("DS/LifecycleCmd/OSLCConsumerCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"oslc_command")},setup:function(b){this.oslcConsumerOptions=b},execute:function(){var b=this;require(["DS/OSLCConsumer/OSLCConsumer"],function(c){b.executeCmd(new c(b.oslcConsumerOptions))})},isSelCountSupported:function(b){return b===1},isFolderSelSupported:function(){return false}})});define("DS/LifecycleCmd/ReviseFromCmd",["DS/LifecycleCmd/CommandBase","DS/LifecycleCmd/CommandMgr","DS/LifecycleServices/DictionaryServices"],function(c,b,a){return c.extend({init:function(d){this._parent(d,"reviseFrom_command")},refTypeArray:["CATPart","CATProduct","VPMReference"],execute:function(d){var e=this;require(["DS/ReviseFromWidget/ReviseFromWidget"],function(f){e.executeCmd(new f(),d)})},isSelCountSupported:function(d){return d===1},_isRefType:function(d){return this.refTypeArray.some(function(e){return e===d})},isTypesSupported:function(f){var e=this;var d=f.every(function(g){if(e._isRefType(g)){return true}else{return a.isKindOfFromCache(e.refTypeArray,g)}});return d},getAsyncUpdate:function(f){var g=this;var i=b.getSelTypeArray(f);var h=i.every(function(j){if(g._isRefType(j)){return true}else{return a.isTypeInCache(j)}});if(h){return null}var d=[];i.forEach(function(j){d.push(a.getIsKindOfPromise(f[0].tenant,g.refTypeArray,j))},this);var e=false;return UWA.Class.Promise.all(d).then(function(j){e=j.every(function(k){return k},this);return e})},})});define("DS/LifecycleCmd/DuplicateCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"duplicate_command")},execute:function(c){var b=this;require(["DS/DuplicateWidget/DuplicateWidget"],function(d){b.executeCmd(new d(),c)})},isSelCountSupported:function(b){return b===1},isTypesSupported:function(c){var b=true;b=c.every(function(d){if(["Route Template","ENOCLG_LibraryReference"].indexOf(d)>=0){return false}else{return true}},this);return b},})});define("DS/LifecycleCmd/DeleteCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"delete_command")},execute:function(b){var c=this;require(["DS/DeleteWidget/DeleteWidget"],function(d){c.executeCmd(new d("delete"),b)})},isSelCountSupported:function(b){return b===1},isFolderSelSupported:function(){return true},isTypesSupported:function(c){var b=true;c.every(function(d){if(["CATIA Embedded Component","CATAnalysisResults","CATAnalysisComputations","Personal Workspace"].indexOf(d)>=0){b=false;return false}return true},this);return b},isLinkSupported:function(){return false},})});define("DS/LifecycleCmd/MaturityCmd",["DS/LifecycleCmd/CommandBase","UWA/Class/Promise"],function(b,a){return b.extend({init:function(c){this._parent(c,"maturity_command")},executeAsync:function(c){var d=this;return new UWA.Class.Promise(function(f,e){d.execute(c,function(){f()})})},execute:function(c,d){var e=this;require(["DS/MaturityWidget/MaturityWidget"],function(f){e.executeCmd(new f(),c,d)})},isSelCountSupported:function(c){return c>=1},isFolderSelSupported:function(){return true},getTargetFolderId:function(){return null},isTypesSupported:function(d){var c=true;return c},})});define("DS/LifecycleCmd/NewBranchCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"newbranch_command")},execute:function(b){var c=this;require(["DS/NewBranchWidget/NewBranchWidget"],function(d){c.executeCmd(new d(),b)})},isSelCountSupported:function(b){return b>=1},})});define("DS/LifecycleCmd/HistoryCmd",["DS/LifecycleCmd/CommandBase","DS/LifecycleServices/LifecycleServices","DS/ENOXVersionExplorerUtils/VersionExplorerSettings"],function(c,a,b){return c.extend({init:function(d){var e=this;this.isEditMode=true;this.lastEditModeFromPadContext=true;this._parent(d,"history_command");if(e.context==null){require(["DS/PADUtils/PADContext"],function(g){var f=g.get();if((f!==undefined)&&(f!==null)){if(f.getEditMode!=undefined&&f.getEditMode()!==true){e.isEditMode=false;e.lastEditModeFromPadContext=false}f.addEvent("editModeModified",function(h){if(h===true){e.isEditMode=true;e.lastEditModeFromPadContext=true}else{e.isEditMode=false;e.lastEditModeFromPadContext=false}})}else{}})}a.getHistoryConfigPromise().then(function(f){b.historyConfig=f},function(){b.historyConfig=null})},execute:function(){var e=this,d;if(!this.historyDlg){this.disable();require(["DS/HistoryExplorer/HistoryDialog"],function(f){e.historyDlg=new f();e.historyDlg.addEvent("onComplete",d=function(g){e.historyDlg.removeEvent("onComplete",d);e.historyDlg=null});e.executeCmd(e.historyDlg)})}},isSelCountSupported:function(d){return d===1},isFolderSelSupported:function(){return false},isEnabledWhenPSEEditModeDisabled:function(){return true},remainEnabled:function(){return this.historyDlg==null},commandRunningNotify:function(d){if(this.lastEditModeFromPadContext){this.isEditMode=!d}}})});define("DS/LifecycleCmd/ReviseCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"revise_command")},execute:function(b){var c=this;require(["DS/ReviseWidget/ReviseWidget"],function(d){c.executeCmd(new d(),b)})},isSelCountSupported:function(b){return b>=1},isTypesSupported:function(c){var b=false;if(Array.isArray(c)&&c.length>0){b=c.every(function(d){if(!d){return false}if(["ENOCLG_LibraryReference"].indexOf(d)>=0){return false}else{return true}})}return b},})});define("DS/LifecycleCmd/RestoreDeletedItemsCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"restore_deleteditems_command")},execute:function(){var b=this;require(["DS/DeleteWidget/DeleteWidget"],function(c){b.executeCmd(new c("restore"))})},isSelCountSupported:function(b){return b===1},isTypesSupported:function(c){var b=true;c.every(function(d){if(["CATIA Embedded Component","CATAnalysisResults","CATAnalysisComputations"].indexOf(d)>=0){b=false;return false}return true},this);return b},isFolderContextSupported:function(b){return b==="trash"?true:false}})});define("DS/LifecycleCmd/IterationsCmd",["DS/LifecycleCmd/CommandBase"],function(a){return a.extend({init:function(b){this._parent(b,"iterations_command")},execute:function(){var b=this;require(["DS/IterationsWidget/IterationsWidget"],function(c){b.executeCmd(new c())})},isSelCountSupported:function(b){return b===1},isTypesSupported:function(c){var b=false;c.every(function(d){if(["CATPart","3DShape"].indexOf(d)>=0){b=true}},this);return b},})});