define("DS/DELPPWActionModule/ActionViewUI",["UWA/Core"],function(b){var a=function a(l,i,j,s,f){var m="ActionViewUI",q,t,n,k,g,e=s.getComponent("WUXDockAreaEnum"),h=s.getComponent("WUXFrameWindowsManager"),c=h.getFrameWindow(l.getAppContext()),d=c.getImmersiveFrame();q=function q(y,x){var w=l.getElement(),z=s.createElement("div",{"class":"tree-list-container"}),v=b.is(f)?f.getIconURLFromKey(x):"";z.inject(w);k=f.getNLSValue("View."+y+".Title")||"";i.loadDocument(j.getWUXNodeModel());i.getContent().inject(z);t=s.create("Panel",{position:{at:"right"},minWidth:300,minHeight:250,height:250,title:k,icon:v,side:e.RightDockArea,currentDockArea:e.RightDockArea,identifier:"panel-"+n,content:w,resizableFlag:true,closeButtonFlag:true,useBordersFlag:true,visibleFlag:false,collapsibleFlag:true,verticallyStretchableFlag:false});t.close=function(){if(b.is(n)){l.notify("toggleCmdCheckHeaderState",{cmdName:n,cmdState:false})}else{t.hide()}}};return{init:function p(v,x,w){if(b.is(v,"string")){n=v;q(x,w)}else{l.debug(m,"Command name is not defined to create action UI.")}},destroy:function u(){j.emptyNodeModel();if(b.is(t)){t.destroy();t=void 0}},toggle:function o(w){var v;g=w.state;if(g&&!t.visibleFlag){t.immersiveFrame=d;v=d.getDockingElement(t.currentDockArea);if(b.is(v)){v.collapseDockingZoneFlag=false}t.show()}else{t.hide()}},updateTitle:function r(v){if(b.is(v)&&v!==""){t.title=k+" - "+v}else{t.title=k}}}};return a});define("DS/DELPPWActionModule/ActionModule",["UWA/Core","DS/DELPPWActionModule/ActionViewUI"],function(c,b){var a=function(t,j,r,E,x,H,B,g,f,J,v){var F=[],u=[],h,w,p,o=function o(K){if(!c.is(K)||!c.is(K.get)){return false}return u.indexOf(K.get("type"))>-1},m=function m(){return F.indexOf("PROCESS")>-1},s=function s(){return F.indexOf("RESOURCE")>-1},G=function G(L){var M={action:[],parameters:[]};if(c.is(L,"array")&&L.length>0){L.forEach(function K(N,O){M.action[O]="addRoot";M.parameters[O]={rootReferencePID:N.id}});j.processDropEffect(M)}else{t.debug("No search results")}},d=function d(){var Q,M,L=0,P,K,O,N=B.getSelections();r.emptyNodeModel();if(c.is(N,"array")&&N[1].length===1){K=N[1][0];if(c.is(K)){Q=H.getReferenceModel(K);if(c.is(Q)){w.updateTitle(Q.get("V_Name"));x.getConnectionsByModel(Q,null,{silentMode:true,onComplete:function(R){for(M=0,L=R.length;M<L;M++){P=R[M].get("type");if(u.indexOf(P)>-1){if(R[M].get("from")===Q.id){O=H.getReference(R[M].get("to"));if(c.is(O)){if(!r.isNodeAdded(O.id)){r.addNode(O,{loadChildren:false})}}}}}}})}else{t.debug("Reference Model is empty for PID:"+K)}}else{t.debug("No selection in mbom to load action view data.")}}else{w.updateTitle("")}};return{listenTo:function n(){return{changeReference:this.onChangeIRPC,addConnection:this.onAddConnection,changeConnection:this.onChangeIRPC,removeConnection:this.onRemoveConnection,select:this.relaodUI,AlternateBL:this.onAlternateBL,CapableResourceBL:this.onCapableResourceBL,ActionRemove:this.onActionRemove,SearchAndAddCommand:this.onSearchAndAddCommand,refreshImpacted:this.relaodUI}},onStart:function z(L){var K;L=L||{};F=L.pprTypes;u=L.linkTypes;h=L.relatedCmdId;p=L.moduleIcon;K=f.getNLSValue(h);w=new b(t,j,r,E,f);w.init(h,K,p);d();w.toggle({state:true})},onStop:function l(){if(c.is(w)){w.destroy();w=void 0}},onBLCommands:function I(N,K,L){var M,O=B.getSelections();if(c.is(O,"array")&&O.length>0&&O[1].length===1){M={url:N,method:"POST",context:this,onComplete:K,onFailure:L,data:c.Json.encode({pid:O[1]})};x.webServiceRequest(M)}},onAlternateBL:function A(){var K=this,L="modeler/ppr/getalternatefrombl",N=function(O){if(0===O.referenceIDS.length){t.warn(f.getNLSValue("AlternateBL.Info.Empty"))}else{g.activate("Alternate search",G.bind(K),[],O.referenceIDS)}},M=function(O){t.debug(O);t.warn(f.getNLSValue("AlternateBL.Error.Failure"))};K.onBLCommands(L,N,M)},onCapableResourceBL:function D(){var K=this,L="modeler/ppr/getResourcesFromBL",N=function(O){if(0===O.resourceIDS.length){t.warn(f.getNLSValue("CapableResourceBL.Info.Empty"))}else{g.activate("Capable resource search",G.bind(K),[],O.resourceIDS)}},M=function(O){t.debug(O);t.warn(f.getNLSValue("CapableResourceBL.Error.Failure"))};K.onBLCommands(L,N,M)},onSearchAndAddCommand:function e(){if(m()){g.activate(f.getNLSValue("InContextSearch.MBOM.Title"),G.bind(this))}else{if(s()){g.activate(f.getNLSValue("InContextSearch.EBOM.Title"),G.bind(this))}}},onActionRemove:function C(){var K,M,L=B.getSelections();if(c.is(L,"array")&&L[0].length>0&&c.is(1===L[1].length)){M=H.getReferenceModel(L[1]);x.getConnectionsByModel(M,null,{onComplete:function(N){if(c.is(N,"array")&&N.length>0){for(K=0;K<L[0].length;K++){N.forEach(function(O){if(O.get("to")===L[0][K]){x.deleteConnection(O.id)}})}}},onFailure:function(){t.debug("Getting connections failed")}})}},onChangeIRPC:function i(K){var L;if(!m(K)){return}L=B.getSelections();if(c.is(L,"array")&&L.length>0&&L[1].length===1){r.updateAttributes(K)}},onAddConnection:function q(M){var L,K;K=function K(O){var P,R,N,Q;if(!o(O)){return}N=O.get("to");P=B.getSelections();if(c.is(P,"array")&&P[1].length===1){R=H.getReferenceModel(P[1][0]);if(c.is(R)&&R.id!==N){Q=H.getReferenceModel(N);if(c.is(Q)){if(!r.isNodeAdded(Q.id)){r.addNode(Q,{loadChildren:false})}}}}};if(c.is(M,"array")){for(L=0;L<M.length;L++){K(M[L])}}else{K(M)}},onRemoveConnection:function k(L){var K=L.get("to"),M;if(!o(L)){return}M=H.getReferenceModel(K);if(c.is(M)){r.removeNode(M.id)}},relaodUI:function y(K){if(c.is(K)){d()}}}};return{behaviors:["TreeListViewBehavior","WUXNodeModelBehavior","UXFactoryBehavior","LinkBehavior","ModelBehavior","SelectionBehavior","SearchBehavior","ResourceBehavior","ViewBehavior","TaggerBehavior"],creator:a}});