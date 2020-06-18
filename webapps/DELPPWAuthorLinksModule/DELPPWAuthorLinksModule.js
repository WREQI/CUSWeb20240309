define("DS/DELPPWAuthorLinksModule/AuthorLinksUI",["UWA/Core"],function(b){var a=function a(H,I,i){var J=i.getComponent("Button"),G=i.getComponent("TooltipModel"),e=i.getComponent("Accordeon"),n={dialogTitle:null,parentAccHeader:null,childAccHeader:null,modalFlag:null},l,k=null,d=null,L,q,t,w,B,A,N,C,r,o,D,s,R,E,h,f,M,g;D=function D(T){s();if(b.is(i)){l=i.create("Dialog",{title:n.dialogTitle,domId:"AuthorLinks-UI",content:C,modalFlag:n.modalFlag,resizableFlag:true,buttons:{Cancel:new J({onClick:function(){l.close()}}),Apply:new J({disabled:true,label:I.getNLSValue("AuthorLinks.Switch"),icon:I.getIconURLFromKey("SwitchFromTo"),"class":"AuthorLinksUI-SwitchBtn",tooltipInfos:new G({shortHelp:I.getNLSValue("AuthorLinks.tooltipSwitchFromTo")}),onClick:function(){T()}})}});l.close=function(){if(b.is(C)){C.destroy()}this.destroy();l=null}}else{H.debug("uxFactoryBehavior is not available.")}};s=function s(){C=i.createElement("div",{"class":"AuthorLinksUI-Dialog"});L=i.createElement("div",{"class":"fromToDiv-section"}).inject(C);q=i.createElement("div",{"class":"instanceOrMoveSection-container"}).inject(C);t=i.createElement("div",{"class":"instance-withAccordeon-section"}).inject(q);w=i.createElement("div",{"class":"instance-section"}).inject(t);B=i.createElement("div",{"class":"linkSection-container"}).inject(C);A=i.createElement("div",{"class":"link-withAccordeon-section"}).inject(B);N=i.createElement("div",{"class":"link-section"}).inject(A);r=i.create("SelectionControl",{title:n.parentAccHeader,message:I.getNLSValue("AuthorLinks.SelectAnObject"),renderTo:L,multiSelection:true});o=i.create("SelectionControl",{title:n.childAccHeader,message:I.getNLSValue("AuthorLinks.SelectAnObject"),renderTo:L,multiSelection:true})};R=function R(W,V,T){var U=new e({items:[{header:W,content:V,expandedFlag:true}],style:"filled-separate"}).inject(T);return U};E=function E(U,T){if(b.is(U)){r.updateLabel(U)}if(b.is(T)){o.updateLabel(T)}};h=function h(V,T,U){if(V==="parentSection"){r.updateAccordeon(T,U)}if(V==="childSection"){o.updateAccordeon(T,U)}if(V==="instanceSection"){d.updateItem(T,U)}};f=function f(){M();g();l.buttons.Apply.disabled=true};M=function M(){if(A){A.empty();N.empty();k=null}};g=function g(){if(b.is(t)){t.empty();w.empty();d=null}};return{buildSkeleton:function z(U,T){if(b.is(U)){b.extend(n,U)}if(!b.is(l)){D(T)}},createInstanceOrMoveButton:function O(V){var T,U;if(!b.is(d)){d=R(I.getNLSValue("AuthorLinks.MoveOrCreateInstanceTitle"),w,t)}T=function T(W){new J({label:W.label,icon:W.icon,tooltipInfos:new G({shortHelp:W.tooltipInfos}),onClick:function(){W.callback();l.close()}}).inject(w)};for(U in V){if(b.is(V[U])){T(V[U])}}},createLinkButtons:function v(T,V){var U;if(!b.is(k)){k=R(I.getNLSValue("AuthorLinks.LinksUITitle"),N,A)}T.forEach(function(W){U=I.getNLSValue(W,null,"CreateLink");new J({icon:I.getIconURLFromKey(W),label:U,value:U,tooltipInfos:new G({shortHelp:I.getNLSValue(W,null,"CreateLink")}),onClick:function(){V(W);l.close()}}).inject(N)})},switchLabels:function P(T,U){r.updateLabel(T);o.updateLabel(U)},updateLabels:function m(U,T){E(U,T)},isVisible:function j(){return b.is(l)?l.visibleFlag:false},updateDialogTitle:function y(T){l.title=T},updateAccordeonHeader:function Q(V,T,U){h(V,T,U)},enableSwitchButton:function u(){l.buttons.Apply.disabled=false},disableSwitchButton:function K(){l.buttons.Apply.disabled=true},showMessages:function c(U,T){f();if(T==="info"){l.info(U)}else{if(T==="warning"){l.warning(U)}else{if(T==="error"){l.error(U)}else{H.debug("type of message is invalid")}}}},clearMessages:function p(){l.clearMessages()},destroyDialog:function F(){if(b.is(l)){l.destroy();l=null}},emptyLinkUIContainer:function x(){M()},emptyInstanceUIContainer:function S(){g()}}};return a});define("DS/DELPPWAuthorLinksModule/AuthorLinksUIManager",["UWA/Core","DS/DELPPWAuthorLinksModule/AuthorLinksUI",],function(c,a){var b=function b(w,i,G,K,A,D,C){var l=new a(w,i,G),x={},e={_parameters:[],_isSwitched:false,_isMultiParent:false,set:function p(M){this._parameters=c.is(M,"array")?M.slice(0):[]},get:function H(){return this._parameters||[]},setMultiParent:function n(M){this._isMultiParent=M||false},isMultiParent:function B(){return this._isMultiParent},isUnique:function t(M){return this.getChilds().indexOf(M)<0&&this.getParents().indexOf(M)<0},getChilds:function f(){return this._parameters.map(function(N){return N.referencePID}).filter(function M(P,O,N){return N.indexOf(P)===O})},getParents:function u(){return this._parameters.map(function(N){return N.targetReferencePID}).filter(function M(P,O,N){return N.indexOf(P)===O})},isEmpty:function s(){return c.is(this._parameters)&&this._parameters.length<1},swap:function v(){if(!this.isEmpty()){this._parameters=this._parameters.map(function(M){return{rootReferencePID:M.targetRootReferencePID,referencePID:M.targetReferencePID,instancePID:M.targetInstancePID,instancePIDsArray:M.targetInstancePIDsArray,targetRootReferencePID:M.rootReferencePID,targetReferencePID:M.referencePID,targetInstancePID:M.instancePID,targetInstancePIDsArray:M.instancePIDsArray,allowMove:M.allowMove}});this._isSwitched=!this._isSwitched}},getToFromLabel:function g(){var N={firstFromLabel:"",toLabel:""};this._parameters.forEach(function M(O,P){var R=K.getReference(O.targetReferencePID),Q=K.getReference(O.referencePID),S=(0===P)?"":", ";if(R&&Q){if(0===P){N.firstFromLabel=R.get("V_Name")}N.toLabel+=(S+Q.get("V_Name"))}});return N},reset:function I(){this._parameters=[];this._isSwitched=false},isSwitched:function L(){return this._isSwitched},isParentChildAvailable:function r(){return this._parameters.every(function M(N){return c.is(N.targetReferencePID)&&c.is(N.referencePID)})}},d,o,F,k,m,E,j;d=function d(N){var M=function M(){e.swap();k()};l.destroyDialog();l.buildSkeleton(N,M)};k=function k(){var W=e.get(),R=e.getParents().length>0?true:false,X=R,V=R,M=[],U=[],Q={},N={},O={},P=null,S=null;if(e.isEmpty()){return}W.forEach(function T(Y){var ab=K.getReference(Y.targetReferencePID),aa=K.getReference(Y.referencePID),Z=K.getInstance(Y.targetInstancePID),ac=K.getInstance(Y.instancePID);if(c.is(ab)&&c.is(aa)){R=R&&K.isInstancePossible(ab,aa);X=X&&A.isLinkPossible(ab,aa,Z,ac);V=V&&R&&K.isMovePossible(ab,ac)}if(ab){M.push(ab)}if(aa){U.push(aa)}});if(e.getParents().length>1){l.updateLabels(M,U[0])}else{l.updateLabels(M[0],U)}l.clearMessages();l.emptyInstanceUIContainer();l.emptyLinkUIContainer();if(e.isParentChildAvailable()){l.enableSwitchButton();if((x.isInstanceUI&&R)||(x.isLinkUI&&X)){if(x.isInstanceUI&&R){O={header:i.getNLSValue("AuthorLinks.InstanceUITitle")};P={label:i.getNLSValue("AuthorLinks.tooltipInstanceBtn"),icon:i.getIconURLFromKey("CreateInstance"),tooltipInfos:i.getNLSValue("AuthorLinks.tooltipInstanceBtn"),callback:o};if(V){O={header:i.getNLSValue("AuthorLinks.MoveOrCreateInstanceTitle")};S={label:i.getNLSValue("AuthorLinks.tooltipMoveBtn"),icon:i.getIconURLFromKey("MoveInstance"),tooltipInfos:i.getNLSValue("AuthorLinks.tooltipMoveBtn"),callback:j}}l.createInstanceOrMoveButton({instanceObj:P,moveObj:S});l.updateAccordeonHeader("instanceSection",0,O)}if(x.isLinkUI&&X){m()}}else{l.showMessages(x.errorMsg,"error")}if(x.isDragDrop&&(x.isLinkUI&&X)&&!(x.isInstanceUI&&R)){Q={header:i.getNLSValue("AuthorLinks.From")};N={header:i.getNLSValue("AuthorLinks.To")};l.updateDialogTitle(i.getNLSValue("AuthorLinks.LinksUITitle"));l.updateAccordeonHeader("parentSection",0,Q);l.updateAccordeonHeader("childSection",0,N)}}};o=function o(){var M=e.getToFromLabel();K.createMultipleInstances(e.get(),M.firstFromLabel,M.toLabel)};j=function j(){var M=e.get(),P=e.getToFromLabel(),O={instancesPIDsToReparent:null,formerInstancesParentPIDs:null,newParentPID:null,newParentInstancesOrder:null,};M.forEach(function N(R,S){var T=K.getInstance(R.instancePID),U=c.is(T)?T.get("isAggregatedBy"):null;if(0===S){O.instancesPIDsToReparent=[];O.formerInstancesParentPIDs=[];O.newParentPID=R.targetReferencePID;O.newParentInstancesOrder=K.getInstancesFromCollection(R.targetReferencePID).map(function Q(V){return V.id})}O.instancesPIDsToReparent.push(R.instancePID);O.formerInstancesParentPIDs.push(U);O.newParentInstancesOrder.push(null)});K.moveMultipleInstances(O,P.firstFromLabel,P.toLabel)},m=function m(){var R,Q,O,P,M=[],U=[],N=e.get(),T=function T(V){E(V)};l.emptyLinkUIContainer();N.forEach(function S(Z,Y){var W=K.getReference(Z.targetReferencePID),ae=K.getReference(Z.referencePID),ad=K.getInstance(Z.targetInstancePID),aa=K.getInstance(Z.instancePID),ab=[],X=[];if(0===Y){O=A.getPossibleRelationTypes(W,ae,ad,aa);P=A.getPossibleRelationTypes(ae,W,aa,ad)}else{ab=A.getPossibleRelationTypes(W,ae,ad,aa);X=A.getPossibleRelationTypes(ae,W,aa,ad);O=ab.filter(function V(ag){var af=(O.indexOf(ag)>-1);return af});P=X.filter(function ac(ag){var af=(P.indexOf(ag)>-1);return af})}M.push(W);U.push(ae)});if((O.length===0)&&(P.length>0)){e.swap();Q=U;U=M;M=Q;if(e.getParents().length>1){l.updateLabels(M,U[0])}else{l.updateLabels(M[0],U)}O=P;l.disableSwitchButton()}if(P.length<=0){l.disableSwitchButton()}if(O<1){l.showMessages(i.getNLSValue("AuthorLinks.LinkNotPossible"),"error")}else{l.createLinkButtons(O,T)}return R},E=function E(Q){var T,O,M=[],P=[],R=[],S=e.get();S.forEach(function N(V){var Z=V.targetReferencePID,U=V.referencePID,W=V.targetInstancePID,X=V.instancePID,aa=V.targetInstancePIDsArray,Y=V.instancePIDsArray;if(0<Q.indexOf("_inverse")){Z=V.referencePID;U=V.targetReferencePID;W=V.instancePID;X=V.targetInstancePID;aa=V.instancePIDsArray;Y=V.targetInstancePIDsArray;Q=Q.replace("_inverse","")}if(C.getScopeLinkType()===Q){if(c.is(W)&&c.is(X)){M.push({implementingPID:W,implementedPID:X,implementingAbsPath:aa,implementedAbsPath:Y})}else{M.push({implementingPID:Z,implementedPID:U,implementingAbsPath:aa,implementedAbsPath:Y})}}else{if(C.getImplementLinkType()===Q){P.push({implementingAbsPath:aa,implementedAbsPath:Y})}else{if(Q==="DELLmiTimeConstraintCnx"){O=A.getPathsToCommonParent(aa,Y);T={type:Q,IDFrom:O.fromPath,IDTo:O.toPath}}else{T={type:Q,IDFrom:Z,IDTo:U};if(Q==="DELLmiMaterialPathCnxCust"){if(c.is(X)&&c.is(W)){T.IDTo=X;T.IDFrom=W}}}R.push({type:T.type,idFrom:T.IDFrom,idTo:T.IDTo})}}});if(M.length>0){C.createScopeLink(M)}else{if(P.length>0){C.createImplementLink(P)}else{if(R.length>0){A.createConnection(R)}else{w.debug("Invalid link Creation.")}}}};F=function F(P){var Q=[],O=e.get().slice(0),M=function M(T,S){var R;T=T||{};S=S||{};if(e.isSwitched()){R=S;S=T;T=R}return{targetRootReferencePID:T.targetRootReferencePID||null,targetReferencePID:T.targetReferencePID||T.referenceId,targetInstancePID:T.targetInstancePID||T.instanceId,targetInstancePIDsArray:T.targetInstancePIDsArray||T.path,rootReferencePID:null,referencePID:S.referenceId||S.referencePID,instancePID:S.instanceId||S.instancePID,instancePIDsArray:S.path||S.instancePIDsArray,}};if(c.is(P,"array")&&P.length>0){if(0===O.length){P.forEach(function(R){Q.push(M(R))});e.setMultiParent(Q.length>1)}else{if(e.isMultiParent()){Q=O.map(function N(R){return M(R,P[0])})}else{if(e.isParentChildAvailable()){Q=O;if(e.isUnique(P[0].referenceId)){Q.push(M(O[O.length-1],P[0]))}}else{if(e.isUnique(P[0].referenceId)){Q.push(M(O[0],P[0]))}}}}e.set(Q)}};return{createLinkOrInstanceUI:function z(N){var M={};if(c.is(N,"array")&&N.length>0){x.isLinkUI=true;x.isInstanceUI=true;x.isDragDrop=true;x.errorMsg=i.getNLSValue("AuthorLinks.NoPossibleAction");M={dialogTitle:i.getNLSValue("AuthorLinks.AuthorLinksUITitle"),parentAccHeader:i.getNLSValue("AuthorLinks.FromOrParent"),childAccHeader:i.getNLSValue("AuthorLinks.ToOrChild"),modalFlag:true};e.set(N);d(M);k()}},createLinkUI:function y(N){var M={};x.isLinkUI=true;x.isInstanceUI=false;x.isDragDrop=false;x.errorMsg=i.getNLSValue("AuthorLinks.LinkNotPossible");F(N);M={dialogTitle:i.getNLSValue("AuthorLinks.LinksUITitle"),parentAccHeader:i.getNLSValue("AuthorLinks.From"),childAccHeader:i.getNLSValue("AuthorLinks.To"),modalFlag:false};d(M);k()},createInstanceUI:function q(N){var M={};x.isLinkUI=false;x.isInstanceUI=true;x.isDragDrop=false;x.errorMsg=i.getNLSValue("AuthorLinks.InstanceNotPossible");F(N);M={dialogTitle:i.getNLSValue("AuthorLinks.InstanceUITitle"),parentAccHeader:i.getNLSValue("AuthorLinks.Parent"),childAccHeader:i.getNLSValue("AuthorLinks.Child"),modalFlag:false};d(M);k()},onSelectionUpdateUI:function h(M){F(M);k()},isDialogVisible:function J(){return l.isVisible()},reset:function I(){e.reset()},}};return b});define("DS/DELPPWAuthorLinksModule/AuthorLinksModule",["UWA/Core","DS/DELPPWAuthorLinksModule/AuthorLinksUIManager",],function(c,b){var a=function a(l,u,f,w,n,q,p,s){var m=new b(l,f,u,w,n,q,p),g=function g(C){var y,A,B,x=[];if(c.is(C,"array")){C.forEach(function z(D){y=w.getInstance(D.id);B=c.is(y)?y.get("isInstanceOf"):D.id;A=c.is(y)?y.id:null;x.push({referenceId:B,instanceId:A,path:D.path,})})}return x},k=function k(){var z=s.getSelectionsWithPaths(),y=[],x=[];if(c.is(z,"array")){z.forEach(function A(C){C.forEach(function B(D){y.push({id:D.id,path:D.path})})});x=g(y)}return x},i=function i(){m.reset()},d=function d(z){var x=[],y=[];if(c.is(z,"array")){z.forEach(function A(D){var C=w.getReference(D.referencePID),B=w.getReference(D.targetReferencePID);if(c.is(C)&&c.is(B)){if((C.isProduct()||C.isPart())&&B.isProcess()){x.push(D)}else{y.push(D)}}})}if(y.length>0){m.createLinkOrInstanceUI(y)}if(x.length>0){p.consumeImplementedItems(x)}};return{name:"AuthorLinksModule",listenTo:function j(){return{select:this.onSelect,CreateLinkOrInstance:this.onCreateLinkOrInstance,CreateMultipleLinks:d,CreateLink:this.onCreateLink,CreateInstance:this.onCreateInstance}},onStart:function r(){},onStop:function h(){},onCreateLinkOrInstance:function t(x){if(c.is(x,"array")){i();m.createLinkOrInstanceUI(x)}else{l.debug(this.name,"Invalid input parameters to createLinkorInstance.")}},onCreateLink:function e(){var x=k();i();if(c.is(x)){m.createLinkUI(x)}},onCreateInstance:function o(){var x=k();i();if(c.is(x)){m.createInstanceUI(x)}},onSelect:function v(z){var y={},x=[];if(z&&m.isDialogVisible()&&(z.changed.isSelected===true)){x.push({id:z.changed.nodeId,path:z.changed.absPath});y=g(x);if(y){m.onSelectionUpdateUI(y)}}},}};return{behaviors:["UXFactoryBehavior","ResourceBehavior","ModelBehavior","LinkBehavior","AssignProductBehavior","ImplementBehavior","SelectionBehavior"],creator:a}});