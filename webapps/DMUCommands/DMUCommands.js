define("DS/DMUCommands/DMU3DCompareCmd",["DS/DMUBaseCommands/EXPStateCommand","DS/DMUBaseUI/DMUTools3DCompare","DS/DMUMeasurable/DMUToolsSceneGraph","DS/DMUBaseExperience/EXPUtils","DS/StateCommandEngine/PathElementAgent","DS/Visualization/ThreeJS_DS","DS/Mesh/MeshUtils","DS/LevelSelector/LevelSelector","DS/DMUBaseExperience/EXPToolsVisualization","DS/DMUBaseExperience/DMUContextManager","DS/Effects/CompareModelsEffect","DS/WebappsUtils/WebappsUtils","DS/DMUControls/panels/DMU3DComparePanel","DS/DMUBaseCommands/EXPToolsWUX","DS/ApplicationFrame/CommandsManager","i18n!DS/DMUCommands/assets/nls/DMUCommands"],function(c,d,h,b,m,q,i,k,g,r,s,f,p,l,a,e){var o,n=null;var j=c.extend({init:function(v){this._parent(v,"exclusive",true);var t;var u=r.getContextViewer({viewer:this.getFrameWindow().getViewer()});if(u.getViewer().mobile){var w=a.getCommand(v.ID,u.getCommandContext());w.disable();w.isPermanentlyDisabled=true}this._parentEndExecute=this.endExecute;this.endExecute=function(){if(t){t()}this._parentEndExecute()};this.buildGraph=function(){var T=h.createSceneGraphOverrideSet(this._viewer);var V,ao;var D=r.getReviewContext({viewer:this.getFrameWindow().getViewer()});var ar=this._viewer,ab=this._frmWindow,an=D?D.getCurrentReview():null;var C=this;var Q,P,O,N;var M=new q.Color(16711680),E=new q.Color(65280),U=new q.Color(15658734);if(navigator.appVersion.indexOf("Win")!==-1||navigator.appVersion.indexOf("Mac")!==-1){if(!n){n=new s(ar.renderer.renderer,ar.renderer.renderTargetPool);o=ar.renderer.addCustomEffect(n)}}if(o!==undefined){ar.renderer.setCustomEffect(o,false)}C.emptyHSO();C.emptyCSO();var ag=new m({agentId:"_pathElementAgentWithCSO",frameWindow:ab,engWithPSOHSO:true,valuedFromCSO:true,saveToCSO:false});var z=[];var X=[];var ad=null,H=null,x=null;var L=0.2;var K;var au=null;var ak=ar.useSSAO;if(ak){ar.setSSAO(false)}ar.setRenderMode("Face",true);ar.render();var aq=a.getCommand("VisuNoShadingEdges",u.getCommandContext());var G=false;if(aq&&aq.isEnabled()){G=true;aq.disable()}function y(){if(V){V.destroy()}V=C.sendNotify("info",e.notifynew)}function A(ax){var aw=false;if(ax.length<3){var ay=ax[0].pathElement;var az=h.getLastReference(ay);aw=ay!==undefined&&az&&az.getBoundingSphere(ar)!==null&&(!an||an&&!an.getDMUObjectFromPathElement(ay,true));if(ax.length===2){ay=ax[1].pathElement;az=h.getLastReference(ay);aw=aw&&ay!==undefined&&az&&az.getBoundingSphere(ar)!==null&&(!an||an&&!an.getDMUObjectFromPathElement(ay,true))}}return aw}function at(ax,aw){var ay=h.getLastReference(aw[0].pathElement);if(ay){z.push(ay);X.push(ay)}if(aw.length>1){au=h.getLastReference(aw[1].pathElement)}ax()}function aa(){if(au){C.emptyCSO();C.addInCSO({path:au})}}function am(){ap(X[0]);if(V){V.destroy()}V=C.sendNotify("info",e.notifyold);ai(true)}function ae(ax){var aw=false;if(ax.length<2){if(ax[0].pathElement!==undefined&&(!an||an&&!an.getDMUObjectFromPathElement(ax[0].pathElement,true))){aw=!z[0].isEqual(h.getLastReference(ax[0].pathElement))}}return aw}function Y(ax,aw){if(au){z.push(au);X.push(au)}else{var ay=h.getLastReference(aw[0].pathElement);if(ay){z.push(ay);X.push(ay)}}ax()}function R(){B(X[0]);aj()}function af(){if(V){V.destroy()}V=C.sendNotify("info",e.notifydisplay);if(!ao){ao=new p();ao.buildPanel({icon:f.getWebappsAssetUrl("DMUBaseCommands","icons/32/")+"I_NavCompare.png",immersiveFrame:ab.getImmersiveFrame(),newStyleColor:b.colorToHex(E),oldStyleColor:b.colorToHex(M),commonStyleColor:b.colorToHex(U),onClickCB:function(){C.publish({event:"selectOK",data:null})}})}F();if(D){D._nNode.setPickable(i.NODRAWHL)}ai(false);C.emptyHSO();al(X[0],X[1]);K=ar.renderer.renderer.materialMode;ar.setMaterialMode(true);ar.render()}function F(aw){if(ao){if(aw===true||aw===undefined){h.getName([X[0].getLastElement(true)],function(ax){ao.updatePanel({firstLabel:ax[0]})},u,"")}if(!aw){h.getName([X[1].getLastElement(true)],function(ax){ao.updatePanel({secondLabel:ax[0]})},u,"")}}}t=function(){if(G){var aw=a.getCommand("VisuNoShadingEdges",u.getCommandContext());if(aw){aw.enable()}}if(ao){ao.clean()}if(D){D._nNode.setPickable(i.PICKABLE)}aj();Z();ar.setMaterialMode(K);if(ak){ar.setSSAO(true)}h.removeSceneGraphOverrideSet(ar,T);if(V){V.destroy()}Q=P=O=N=null;K=L=null;ad=H=x=null;ag=null;z.length=0;z=null;X.length=0;X=null;T=null;V=ao=null;au=null;ab=C=null;if(o!==undefined){ar.renderer.setCustomEffect(o,false)}ar.render();ar=null};function ap(aw){var ax=aw.getLastElement(true);ax.tmpOverride=T.createOverride({pathes:[aw]});if(ax.tmpOverride){ax.tmpOverride.setOpacity(L,"FORCE_INHERIT");ax.tmpOverride.setPickability("NOT_PICKABLE");ar.render()}}function B(aw){var ax=aw.getLastElement(true);T.deleteOverride(ax.tmpOverride);ax.tmpOverride=undefined}function al(aw,az){var aA=h.getRenderables(aw);var aC=h.getRenderables(az);if(T){var ax=h.getAllOthers([aw,az]);var aB=aw.externalPath[0];for(var aE=ax.length-1;aE>=0;aE--){if(aB!==ax[aE].externalPath[0]){ax.splice(aE,1)}}var ay;if(ax.length){ay=T.createOverride({pathes:ax});ay.setOpacity(L,"FORCE_INHERIT")}ay=T.createOverride({pathes:[aw,az]});if(ay){ay.setVisibility(false)}}if(o!==undefined){ar.renderer.setCustomEffect(o,true)}ad=new q.MeshLambertMaterial({color:U,side:q.DoubleSide});ad.force=true;H=new q.MeshLambertMaterial({color:E,side:q.DoubleSide});H.force=true;x=new q.MeshLambertMaterial({color:M,side:q.DoubleSide});x.force=true;var aD=h.getSceneRoot(ar);if(aD){Q=d.addGeometryToPass(aD,aC,ad,["compareOld"]);P=d.addGeometryToPass(aD,aC,x);O=d.addGeometryToPass(aD,aA,ad,["compareNew"]);N=d.addGeometryToPass(aD,aA,H)}ar.render()}function Z(){if(!T){return}var ax=T.getOverrides();T.deleteOverrides(ax);if(o!==undefined){ar.renderer.setCustomEffect(o,false)}var aw=h.getSceneRoot(ar);if(aw){aw.remove(Q);aw.remove(O);aw.remove(P);aw.remove(N)}ad=null;H=null;x=null}function ai(aD){var az=aD?0:1;var aC=[];var ay=function(aG){aC=[];var aK=z[az];var aM=h.getLastReference(aK);if(aM){var aL=[];var aJ=aM.externalPath.length;for(var aI=0;aI<aJ;++aI){var aH=aM.getLastElement(true);if(h.isReference(aH)){aC.push({pathElement:aM.clone(),name:aH.name,internalLevel:aJ-aI});aL.push(aH)}aM=aM.getParentPath()}h.getName(aL,function(aO){for(var aN=0;aN<aO.length;++aN){aC[aN].name=aO[aN]}aG()},u,"")}return aC};var ax=function(){};var aw=function(aJ){if(aD){B(X[0]);X[0]=aJ.pathElement;ap(X[0])}else{Z();X[1]=aJ.pathElement;al(X[0],X[1])}F(aD);var aK=aD?X[0]:X[1];var aI=aK.getBoundingSphere(ar);if(aI){var aH=g.getWindowPositionFromPoint(ar,aI.center,ab);var aG={positionX:aH.left,positionY:aH.top,uiFrame:ab.getUIFrame(),selectedPath:ay,getLevels:ay,onHover:ax,onSelect:aw};aj();k.createView(aG)}ar.render()};var aF=aD?X[0]:X[1];var aA=aF.getBoundingSphere(ar);if(aA){var aB=g.getWindowPositionFromPoint(ar,aA.center,ab);var aE={positionX:aB.left,positionY:aB.top,uiFrame:ab.getUIFrame(),selectedPath:ay,getLevels:ay,onHover:ax,onSelect:aw};aj();k.createView(aE)}}function aj(){var aw=k._noAnim;k._noAnim=true;k.destroyView();k._noAnim=aw}var av=this.createInitialState("newSelState");this.setEnterStateAction(av,y);this.setExitStateAction(av,aa);var I=this.getFinalState();var ah=this.createState("oldSelState");this.setEnterStateAction(ah,am);this.setExitStateAction(ah,R);var J=this.createState("displayDifferenceState");this.setEnterStateAction(J,af);this.setExitStateAction(J,function(){});var ac={iEvent:ag,iInitialState:av,iFinalState:ah,iCondition:A,iAction:at};this.addTransition(ac);var W={iEvent:ag,iInitialState:ah,iFinalState:J,iCondition:ae,iAction:Y};this.addTransition(W);var S={iSender:this,iEvent:"selectOK",iInitialState:J,iFinalState:I,iCondition:null};this.addTransition(S)}},});return j});define("DS/DMUCommands/DMUColorOpacityOverloadCmd",["DS/ApplicationFrame/Command","DS/DMUControls/EXPColorPicker","DS/Selection/CSOManager","DS/DMUBaseExperience/DMUContextManager","DS/Visualization/ThreeJS_DS","i18n!DS/DMUCommands/assets/nls/DMUCommands"],function(f,a,c,e,d,b){var g;return f.extend({init:function(h){this._parent(h,"shared")},beginExecute:function(v){this._parent(v);var p=this;function o(){if(g){g.clean()}g=null}var h=e.getReviewContext({viewer:this.getFrameWindow().getViewer()});if(h&&!h.isReadOnly()&&h.getCurrentReview()&&!h.getCurrentReview().isReadOnly()){var r=c.get();var u=[];for(var t=0;t<r.length;t++){u.push(r[t].pathElement.clone())}var n=h.getCurrentReview();var i,q=[];for(var t=0;t<u.length;t++){i=n.getDMUObjectFromPathElement(u[t],false,false);if(!i){q.push({color:null,opacity:null})}else{q.push({color:i.getAttribute("cColor"),opacity:i.getAttribute("fOpacity")})}}var j,s,m,k=true,l=true;for(var t=0;t<q.length;t++){if(l){if(j===undefined){j=q[t].color}else{if((j!==null&&q[t].color!==null&&!j.equals(q[t].color))||(j===null&&q[t].color!==null)||(j!==null&&q[t].color===null)){j=null;m=false;l=false}}}if(k){if(s===undefined){s=q[t].opacity}else{if(s!==q[t].opacity){s=null;m=false;k=false}}}}if(m===undefined){m=s===null&&j===null}if(g){g.setVisibleFlag(!g.getVisibleFlag())}else{o();g=new a({frameWindow:this.getFrameWindow(),onDestroyCB:function(){g=null}});g.build({displayColorSlider:true,displayOpacitySlider:true,displayResetButton:true,defaultColor:j,onColorChangedCB:function(x){for(var y=0;y<u.length;y++){var w=n.getDMUObjectFromPathElement(u[y],false,true);if(w){w.setAttribute("cColor",new d.Color(x.color));w.refreshNode();p.getFrameWindow().getViewer().render()}}},defaultOpacity:s,minOpacity:0,maxOpacity:1,onOpacityChangedCB:function(x){for(var y=0;y<u.length;y++){var w=n.getDMUObjectFromPathElement(u[y],false,true);if(w){w.setAttribute("fOpacity",x.opacity);w.refreshNode();p.getFrameWindow().getViewer().render()}}},defaultResetState:m,resetButtonLabel:b.resetLabel,onResetButtonPressedCB:function(){for(var x=0;x<u.length;x++){var w=n.getDMUObjectFromPathElement(u[x],false,true);if(w){w.setAttribute("cColor",null);w.setAttribute("fOpacity",null);w.refreshNode();p.getFrameWindow().getViewer().render()}}}})}}this.end()}})});define("DS/DMUCommands/DMUNormalViewCmd",["DS/DMUBaseCommands/EXPGenericCmdOneSelThenOperation","DS/DMUBaseCommands/EXPToolsWUX","DS/DMUMeasurable/DMUToolsMaths","DS/DMUMeasurable/DMUGeometryEnums","DS/Visualization/ThreeJS_DS","DS/DMUBaseExperience/EXPToolsVisualization","i18n!DS/DMUCommands/assets/nls/DMUCommands"],function(f,c,h,e,d,a,b){var g=f.extend({init:function(i){this._parent(i,this._applyViewpoint,b.normalViewTargetLabel,{engWithPSOHSO:true,multiAcquisition:false,multiAcquisitionCtrl:false,valuedFromCSO:true,pickingMode:"primHybrid",prePickingMode:"primHybrid"},true)},beginExecute:function(){c.emptyCSO();c.emptyHSO();this._parent()},_applyViewpoint:function(m){var q=m[0].normal;var o=m[0].position;if(((q!==null)&&(q!==undefined))&&((o!==null)&&(o!==undefined))){var j=a.getViewpointInfo(this._viewer.currentViewpoint);var l=q.angleTo(j.sight);if((l>Math.PI/2)&&(l<3*(Math.PI/2))){q.negate()}var n=h.computeTransformationBetweenTwoLines(j.position,j.sight,o,q);var i=(j.sight).transformDirection(n.transformation);var k=(j.position).applyMatrix4(n.transformation);var r=j.distance;var p=(j.up).transformDirection(n.transformation);a.moveViewpoint(this._viewer,null,k,i,p,r,400);this._viewer.render()}c.emptyCSO()}});return g});define("DS/DMUCommands/DMUCommands",[],function(){});define("DS/DMUCommands/DMULevelSelectorCmd",["DS/ApplicationFrame/Command","DS/LevelSelector/LevelSelector","DS/Selection/CSOManager","DS/Selection/HSOManager","DS/DMUMeasurable/DMUToolsSceneGraph","DS/DMUBaseExperience/DMUContextManager"],function(d,f,a,c,e,b){return d.extend({init:function(h){this._parent(h,{mode:"shared",isAsynchronous:true});this.setRepeatMode(false);var m=this;var k;var j=false;var g={x:0,y:0};var l=[];var i=0;this.beginExecute=function(){i=a.onEmpty(function(){if(m._isRunning&&!j){m.end()}});var n=m.getFrameWindow().getContextualUIManager().getContextualBar();g=n?n.getPosition():{x:0,y:0};if(g&&n){g.x=g.x+n.elements.container.getDimensions().width-40*window.devicePixelRatio;g.y=g.y-n.elements.container.getDimensions().height/2-10*window.devicePixelRatio}if(n){n.hide()}},this.execute=function(){var o=k?k[0]:null;if(!o){var s=a.get();k=s.length>0?[s[s.length-1]]:undefined;o=k?k[0]:null;if(s.length>1){for(var q=0;q<s.length-1;q++){l.push({pathElement:s[q].pathElement})}}}if(o.pathElement){var r=o.pathElement;var p=function(A){var z=[];var x=[];var v=r;while(v){var y=v.getLastElement(true);if(e.isReference(y)){var u={pathElement:v,idRef:e.getNodeID(y)};z.push(u);x.push(u.idRef);var t=v.externalPath.length>1?v.externalPath[v.externalPath.length-2]:null;if(e.isInstance(t)){x.push(u.idInst=e.getNodeID(y))}}v=v.getParentPath()}var w=b.getContextViewer({viewer:m.getFrameWindow().getViewer()});if(w&&w.getController){w.getController().getAttributes({ids:x,attributes:["ds6w:label","type_icon_url"],callbacks:{onComplete:function(B){z.forEach(function(C){C.name=B[C.idRef]?B[C.idRef]["ds6w:label"]:"";if(C.idInst&&B[C.idInst]&&B[C.idInst]["ds6w:label"]){C.name+=" ("+B[C.idInst]["ds6w:label"]+")"}C.icon=B[C.idRef]?B[C.idRef].type_icon_url:undefined;delete C.idRef;delete C.idInst});A(z)},onFailure:function(){A(z)}}})}return z};var n={positionX:g.x,positionY:g.y,uiFrame:m.getFrameWindow().getUIFrame(),getLevels:p,onHover:function(t){c.empty();c.add(t)},onLeave:function(t){if(k){c.remove(t);c.add(l.concat(k))}},onSelect:function(u){j=true;a.empty();c.empty();k[0].pathElement=u.pathElement;var t=l.concat(k);setTimeout(function(){m.end();a.add(t);c.add(t);m.getFrameWindow().getContextualUIManager().showContextualBar({hideWithDistance:true})},0);j=false}};f.createView(n)}else{m.end()}};this.endExecute=function(){if(this._isRunning){k=undefined;l.length=0;f.destroyView()}a.unsubscribe(i)}}})});define("DS/DMUCommands/DMURemoveOverloadCmd",["DS/ApplicationFrame/Command","DS/Selection/CSOManager","DS/DMUBaseExperience/DMUContextManager"],function(c,a,b){return c.extend({init:function(d){this._parent(d,"shared")},beginExecute:function(e){this._parent(e);var h=b.getReviewContext({viewer:this.getFrameWindow().getViewer()});if(h&&!h.isReadOnly()&&h.getCurrentReview()&&!h.getCurrentReview().isReadOnly()){var d=a.get();for(var g=0;g<d.length;g++){var f=h.getCurrentReview().getDMUObjectFromPathElement(d[g].pathElement,false,false);if(f){f.setAttributes([{name:"bVisible",value:undefined},{name:"fOpacity",value:undefined},{name:"cColor",value:undefined},{name:"sLineStylePattern",value:undefined},{name:"fLineStyleThickness",value:undefined},{name:"mPosition",value:undefined}]);f.refreshNode()}this.getFrameWindow().getViewer().render()}}this.end()}})});