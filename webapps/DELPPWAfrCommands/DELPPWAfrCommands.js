define("DS/DELPPWAfrCommands/AfrCommand",["DS/ApplicationFrame/Command","DS/Logger/Logger","DS/Core/Events","UWA/Class/Options"],function(d,c,e,b){var a=d.extend(b,{name:"AfrCommand",_logger:null,_context:null,init:function g(h){this._logger=c.getLogger(a);this._parent(h,{mode:"exclusive",isAsynchronous:false,});this._context=this.getOption("context")},execute:function f(){var h={"arguments":arguments};this._logger.log(this._id+" execute");e.publish({event:"DELPPWCommands/"+this._id,data:h})}});return a});define("DS/DELPPWAfrCommands/InsertCmd",["DS/ApplicationFrame/Command","DS/Logger/Logger","DS/Core/Events","UWA/Class/Options"],function(d,c,e,b){var a=d.extend(b,{name:"InsertCmd",_logger:null,_context:null,init:function g(h){this._logger=c.getLogger(a);this._parent(h,{mode:"exclusive",isAsynchronous:false,});this._context=this.getOption("context")},execute:function f(){var h={arguments:this.getArguments(),};this._logger.log(this._id+" execute");e.publish({event:"DELPPWCommands/InsertCmd",data:h})}});return a});define("DS/DELPPWAfrCommands/FilterCommands/ProxyXSO",["UWA/Core","DS/Selection/XSO"],function(e,c){var d=c.extend({init:function b(f){this._parent(f)},onSelectionChange:function a(g){var f;if(e.is(g)&&e.is(g.changed)){f=g.changed.nodeId;if(g.changed.isSelected){this.add(f)}else{this.remove(f)}}}});return d});define("DS/DELPPWAfrCommands/CheckCommand",["UWA/Core","DS/Core/Events","DS/Logger/Logger","DS/ApplicationFrame/CommandCheckHeader","DS/ApplicationFrame/CommandsManager"],function(g,d,a,f,b){var e=f.extend({name:"CheckCommand",_logger:null,_checkGroup:null,init:function(h){this._parent(h,{mode:"exclusive",isAsynchronous:false});this._logger=a.getLogger(e);if(g.is(h.isEnabled)){this.setState(h.isEnabled)}if(g.is(h.arguments)){if(h.arguments.length>0){if(h.arguments[0].ID==="CheckGroup"){this._checkGroup=h.arguments[0].Value}}}this.onStateChange(this._stateChanged)},_stateChanged:function c(){var h=this,m,l=true,i,k,j=h.getState();if(g.is(h._checkGroup)&&!j){i=b.getCommandCheckHeaders(h.options.context);l=Object.keys(i).some(function(n){k=i[n];return(k&&k._checkGroup===h._checkGroup&&k.getState())})}if(true===j){m=h.options.node}h.options.node=null;if(l){d.publish({event:"DELPPWCommands/"+h._id,data:{state:j,node:m}})}else{this.setState(!j)}}});return e});define("DS/DELPPWAfrCommands/FilterCommands/ConfigCommandUtil",["UWA/Core"],function(c){var a=function a(g){return{isRoot:function f(j){var i=true;if(c.is(j.instance.id)){if(c.is(j.instance.absolutePath,"array")&&j.instance.absolutePath.length>0){i=false}}return i},getSelections:function e(j){var i;j=j||false;i=c.is(g.getSelectedNodesInfo,"function")?g.getSelectedNodesInfo(j):[];return i},getData:function d(){var i=this,k,l,j;k=this.getSelections(false);l=[];k.forEach(function(o){var n,m;m=i.isRoot(o);if(m){n={id:o.reference.id,alias:o.label,isRoot:m}}else{n={id:o.instance.id,alias:o.label,isRoot:m,VPMRef:o.reference.type,parentID:o.parent.reference.id,parentalias:o.parent.label}}l.push(n)});j={selectedNodes:l};return j},getPPRType:function h(){var i=this.getSelections(false);return i[0].reference.pprType}}};var b=(function b(){var d;return{getInstance:function e(f){if(!c.is(d)){d=new a(f)}return d}}})();return b});define("DS/DELPPWAfrCommands/RelationalExplorerCmd",["UWA/Core","UWA/Utils","DS/Logger/Logger","DS/ApplicationFrame/Command","UWA/Utils/InterCom"],function(d,h,c,b,k){var j=null;var f=b.extend({name:"RelationalExplorerCmd",_logger:null,_context:null,init:function l(m){var n=this;this._parent(m,{mode:"shared",isAsynchronous:true});this._logger=this._logger?this._logger:c.getLogger(f);this._context=m.context;function o(){n.enable()}o()},setObjectOnCompass:function g(n){var m=d.is(widget)&&widget.id?"padcompassSocket_"+widget.id:"padcompassSocket",o=null;this._logger.log("setObjectOnCompass");if(!d.is(n.nodesToOpen,"array")){throw new Error("setObjectOnCompass: Invalid init parameter nodesToOpen")}if(j===null){j=new k.Socket(m);j.subscribeServer("com.ds.compass",window.parent)}if(n.nodesToOpen.length===0){j.dispatchEvent("onResetX3DContent",{},m)}else{o=this.dropdataFromSelectedNodes(n.nodesToOpen);j.dispatchEvent("onSetX3DContent",o,m)}},openApp:function e(n,p){var m=d.is(widget)&&widget.id?"padcompassSocket_"+widget.id:"padcompassSocket";this._logger.log("open_app");if(j===null){j=new k.Socket(m);j.subscribeServer("com.ds.compass",window.parent)}j.addListener("launchApp",function o(q){if(d.is(p,"function")){p(q)}});j.dispatchEvent("onLaunchApp",n,m)},dropdataFromSelectedNodes:function a(p){var o="ctx::",n="",m,q={protocol:"3DXContent",version:"1.1",source:widget.data.appId,widgetId:widget.id,data:{items:[]}};var s=this._context.getSecurityContext();if(d.is(s)&&d.is(s.SecurityContext,"string")){n=s.SecurityContext.split(o).pop()}m=function m(t){return{envId:s.tenant,serviceId:"3DSpace",contextId:n,objectId:t.getID(),objectType:t.options.type,displayName:t.options.display?t.options.display:t.getLabel(),displayType:t.options.grid["ds6w:type"],path:t.getOccurencePathWithType?t.getOccurencePathWithType():null}};p.forEach(function r(t){q.data.items.push(m(t))});return q},execute:function i(){var n=this._context.getSelectedNodes();this._logger.log("Execute");this.setObjectOnCompass({nodesToOpen:n});this.openApp({appId:"ENORIPE_AP"},function m(){})}});return f});define("DS/DELPPWAfrCommands/FilterCommands/EditConfigContextCmd",["UWA/Core","DS/CfgConfigurationCommands/commands/CfgEditConfigurationContextCmd","DS/DELPPWAfrCommands/FilterCommands/ConfigCommandUtil"],function(f,d,b){var c=d.extend({init:function e(g){this._context=g.context;this._configCmdUtil=b.getInstance(this._context);this._parent(g)},getData:function a(){var g=this,i,j,h;i=this._configCmdUtil.getSelections(false);j=i.map(function(m){var l,k;k=g._configCmdUtil.isRoot(m);if(k){l={id:m.reference.id,alias:m.label,isRoot:k}}else{l={id:m.reference.id,alias:m.label,isRoot:k,parentID:m.parent.reference.id,parentalias:m.parent.label}}return l});h={selectedNodes:j};return h}});return c});define("DS/DELPPWAfrCommands/FilterCommands/EditEvolutionCmd",["UWA/Core","DS/CfgEffectivityCommands/commands/CfgEvolutionCmd","DS/DELPPWAfrCommands/FilterCommands/ConfigCommandUtil"],function(f,b,c){var d=b.extend({init:function e(h){var g=this;g._context=h.context;g._configCmdUtil=c.getInstance(g._context);if(widget.getValue("x3dPlatformId")===""){widget.setValue("x3dPlatformId","OnPremise")}h.postCloseHandler=function(){var i,j=g._context.updateEffectivityCallback,k=g._configCmdUtil.getData();if(f.is(k.selectedNodes)&&f.is(k.selectedNodes[0].isRoot)){if(k.selectedNodes[0].isRoot===true){i={pids:[k.selectedNodes[0].id],relids:[]}}else{i={pids:[],relids:[k.selectedNodes[0].id]}}g._context.updateEffectivityColumns(i,g._configCmdUtil.getPPRType(),j)}};g._parent(h)},getData:function a(){return this._configCmdUtil.getData()}});return d});define("DS/DELPPWAfrCommands/FilterCommands/ExpandFilterCmd",["UWA/Core","DS/ENONextGenFilterCmd/commands/ENONextGenFilterCmd","DS/DELPPWAfrCommands/FilterCommands/ConfigCommandUtil","DS/DELPPWAfrCommands/FilterCommands/ProxyXSO"],function(e,h,b,c){var f=h.extend({_context:null,_proxyXSO:null,_configCmdUtil:null,init:function k(l){this._context=l.context?l.context:null;this._configCmdUtil=b.getInstance(this._context);this._initProxyXSO();this._parent(l)},_initProxyXSO:function j(){var l=this,m=function m(n){l._proxyXSO.onSelectionChange(n)};this._proxyXSO=new c();if(e.is(this._context.subscribeSelectionChange,"function")){this._context.subscribeSelectionChange(m)}},getAppParams:function i(){return{widgetId:this._context.widget.getId(),appId:this._context.widget.data.appId}},getSelectorManager:function a(){return this._proxyXSO},getRoots:function g(){var l=this,o,n;n=l._configCmdUtil.getSelections(false);o=n.reduce(function m(q,r){var p;p=l._configCmdUtil.isRoot(r);if(p){q.push({id:r.reference.id,label:r.label})}return q},[]);return o},getSelection:function d(){var m,o,l=[],n=[];o=this._configCmdUtil.getSelections(true);o.forEach(function(p){l.push(p.occPathWithRefDetail);n.push([p.label])});m={path:l,label:n};return m}});return f});define("DS/DELPPWAfrCommands/FilterCommands/EditVariantCmd",["UWA/Core","DS/CfgEffectivityCommands/commands/CfgVariantEffectivityCmd","DS/DELPPWAfrCommands/FilterCommands/ConfigCommandUtil"],function(f,d,c){var b=d.extend({init:function e(h){var g=this;g._context=h.context;g._configCmdUtil=c.getInstance(g._context);if(widget.getValue("x3dPlatformId")===""){widget.setValue("x3dPlatformId","OnPremise")}h.postOKHandler=function(){var i,j=g._context.updateEffectivityCallback,k=g._configCmdUtil.getData();if(f.is(k.selectedNodes)&&f.is(k.selectedNodes[0].isRoot)){if(k.selectedNodes[0].isRoot===true){i={pids:[k.selectedNodes[0].id],relids:[]}}else{i={pids:[],relids:[k.selectedNodes[0].id]}}g._context.updateEffectivityColumns(i,g._configCmdUtil.getPPRType(),j)}};this._parent(h)},getData:function a(){return this._configCmdUtil.getData()}});return b});