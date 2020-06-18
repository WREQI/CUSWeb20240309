define("DS/DMUMarker/DMUMarkerBoxContextCmd",["DS/ApplicationFrame/Command","DS/Selection/CSOManager","DS/DMUBaseExperience/DMUContextManager"],function(c,a,b){return c.extend({init:function(e){var d=e||{};d.mode="shared";this._parent(d)},beginExecute:function(l){this._parent(l);var h=a.get();var j=[];for(var k=0;k<h.length;k++){var d=b.getReviewContext({viewer:this.getFrameWindow().getViewer()});var e=d.getCurrentReview().getDMUObjectFromPathElement(h[k].pathElement);if(e){j.push(e)}}switch(this._id){case"Marker_DMUNoLeaderHdr":j.forEach(function(m){m.setAttribute("bHasALeader",false)});break;case"Marker_DMUArrowLeaderHdr":j.forEach(function(m){m.setAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"Arrow"}])});break;case"Marker_DMUBubbleLeaderHdr":j.forEach(function(m){m.setAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"Bubble"}])});break;case"Marker_DMUNoEndLeaderHdr":j.forEach(function(m){m.setAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"No end"}])});break;case"DMUMarkerShortDisplayHdr":var i,g;for(var f=0;f<j.length;f++){g=j[f].getAttribute("bShortDisplay");if(typeof g==="boolean"){if(i===undefined){i=g}else{if(i!==g){i=null;break}}}}j.forEach(function(m){m.setAttribute("bShortDisplay",i===null?true:!i)})}j.forEach(function(m){m.refreshNode()})}})});define("DS/DMUMarker/DMUMarkerTextCreateCmd",["DS/DMUBaseCommands/EXPGenericCmdOneSelThenOperation","DS/DMUMeasurable/DMUToolsSceneGraph","DS/DMUBaseUI/DMUInitialization","DS/Visualization/ThreeJS_DS","DS/DMUBaseExperience/EXPToolsVisualization","DS/DMUBaseExperience/DMUContextManager","DS/DMUPlayMarker/DMUMarker3DText","DS/DMUPlayMarker/DMUMarker2DText","i18n!DS/DMUMarker/assets/nls/DMUMarker"],function(j,g,c,e,b,f,h,d,a){var i=j.extend({init:function(k){var p=k.ID==="markerTextCmdHdr"?"3D":"2D";var r=this;var n=null;var o=false;f.setAuthoringFeatureTypes("Marker");function q(){var t=null;if(r._clickEventData&&r._clickEventData.from&&r._clickEventData.from.length){var u=r._viewer.getMousePosition(r._clickEventData.from[0].getCurrentPosition(r._viewer.canvas));var s=r._viewer.pick(u,"prim",true);if(s&&s.path.length){t=s.path[s.path.length-1]}}return t}function m(w,K){var J=w[0].position;var I=f.getReviewContext({viewer:r.getFrameWindow().getViewer()});n=p==="3D"?new h(r._viewer,I):new d(r._viewer,I);var s=p==="3D"?b.getWindowPositionFromPoint(r._viewer,J,r._frmWindow):b.getViewerPositionFromPoint(r._viewer,J);var A=100;var y=b.getDistanceFromPixel(r._viewer,J,A,r._frmWindow);if(s.top<A){y=-y}var G=b.getViewpointInfo(r._viewer.currentViewpoint);var C=G.up.clone().multiplyScalar(y);var t=J.clone().add(C);if(K){t=K}var F=I.getCurrentReview();n.initComponent({context:F});n._sID=I.computeNewID();n._sName=F.computeNewName(p==="3D"?"TextMarker3D":"TextMarker2D");n.setAttribute("sTextContents",[a.markertext.standard]);var D={bHasALeader:true,sLeaderEndType:"Arrow",cLineStyleColor:new e.Color("#afafaf"),bIsFilled:true,bHasBorder:true,fFontSize:4.23,fBorderRadius:4};if(p==="3D"){D.vLeaderBreakPoint3D=t.clone();D.lLeaderPointingPoints=[J.clone()]}else{var E=b.getViewerPositionFromPoint(r._viewer,t);D.vLeaderBreakPoint2D=new e.Vector2(E.left,E.top);D.lLeaderPointingPoints=[new e.Vector2(s.left,s.top)]}n.setCreationState(D);n.buildNode();if(!o){r.addInCSO(n)}var x=null;if(w[0].pathElement){x=w[0].pathElement}else{if(r._selectedPathElement&&undefined!==K){x=r._selectedPathElement}}var H=true;if(!x){x=q();if(x){H=false}}if(x){var u=function(M){var L=false;if(M&&M.getLastElement(true)&&M.getLastElement(true).getDMUType&&M.getLastElement(true).getDMUType()==="DMUSection"){return true}else{if(M.getParentPath()){return u(M.getParentPath())}}return L};if(H&&u(x)){x=q()}if(x){var v=f.getContextViewer({reviewContext:I});var B=g.getLastReference(x);if(B){var z=B.getLastElement(true);if(z){if(!z.associatedMarkers){z.associatedMarkers=[]}z.associatedMarkers.push(n);g.getName([z],function(N){if(N&&N.length===1&&N[0]){var M=N[0].slice();if(M&&z.associatedMarkers&&z.associatedMarkers.length){for(var L=0;L<z.associatedMarkers.length;L++){if(z.associatedMarkers[L]){z.associatedMarkers[L].setAttribute("sTextContents",[M]);z.associatedMarkers[L].refreshNode()}}z.associatedMarkers=undefined;r._viewer.render()}}},v,"")}}}}}function l(s){if(!o&&!n){m(s)}}k.dragEventCallback=function(t){if(n){if(p==="3D"){n.setAttribute("vLeaderBreakPoint3D",t.vCurrentPosition);n.setNominalState({vLeaderBreakPoint3D:t.vCurrentPosition})}else{var s=b.getViewerPositionFromPoint(r._viewer,t.vCurrentPosition);n.setAttribute("vLeaderBreakPoint2D",new e.Vector2(s.left,s.top));n.setNominalState({vLeaderBreakPoint2D:new e.Vector2(s.left,s.top)})}}else{o=true;m([{position:t.vStartPosition}],t.vCurrentPosition)}if(t.bLastUpdate&&n){r.addInCSO(n)}};this.clean=function(){o=false;n=null};this._parent(k,l,a.textPositionLabel,{},true)},beginExecute:function(){c.createReviewContext({context:f.getContextViewer({viewer:this.getFrameWindow().getViewer()})});this._parent()},endExecute:function(){this._parent();if(this.clean){this.clean()}}});return i});define("DS/DMUMarker/DMUMarkerContextualBar",["DS/DMUBaseUI/DMUContextualBarAdapter"],function(a){var b=a.extend({getSharedContextualCommandList:function(i){var f=[];if(i&&i.length){i.forEach(function(l){if(f.indexOf(l.GetType())===-1){f.push(l.GetType())}})}if(!f.length||f.indexOf("DMUSection")!==-1){return[]}if(f.length===1||(f.length===2&&f.indexOf("DMUMarker2DPicture")!==-1&&f.indexOf("DMUMarker3DPicture")!==-1)||(f.length===2&&f.indexOf("DMUMarker2DText")!==-1&&f.indexOf("DMUMarker3DText")!==-1)){return this.getContextualCommandList(i[0])}var g=[];for(var j=0;j<i.length;j++){var h=false;for(var e=0;e<g.length;e++){if(g[e].type===i[j].GetType()){h=true;break}}if(!h){if(!i[j].getSharedHeaderTypes){return{cmdList:[]}}g.push({sharedTypes:i[j].getSharedHeaderTypes()})}}var c=false,k=false;for(var j=0;j<g.length;j++){for(var j=0;j<g.length;j++){if(g[j].sharedTypes.leaderProperties){c=true}if(g[j].sharedTypes.fontProperties){k=true}}}var d=[];if(c){d.push({name:"Marker_DMULeaderStr",line:1,hdr_list:["Marker_DMUArrowLeaderHdr","Marker_DMUBubbleLeaderHdr","Marker_DMUNoEndLeaderHdr","Marker_DMUNoLeaderHdr"],selectedHdr:"Marker_DMUArrowLeaderHdr"})}if(k){d.push({name:"Marker_DMUStylesStr",line:1,hdr_list:["Marker_DMUDefaultStyleHdr","Marker_DMULightStyleHdr","Marker_DMUMeasureStyleHdr","Marker_DMUPostitStyleHdr","Marker_DMUValidateStyleHdr","Marker_DMUWarningStyleHdr","Marker_DMUCautionStyleHdr"],selectedHdr:"Marker_DMUDefaultStyleHdr"});d.push({name:"Marker_DMUIncreaseFontSizeStr",line:1,hdr_list:["Marker_DMUIncreaseFontSizeHdr"]});d.push({name:"Marker_DMUDecreaseFontSizeStr",line:1,hdr_list:["Marker_DMUDecreaseFontSizeHdr"]})}return d.concat([{name:"Marker_FillGraphicProperties",line:1,hdr_list:["Marker_DMUFillGraphicPropHdr"]},{name:"Marker_BorderLineTypes",line:1,hdr_list:["Marker_DMUNoBorderTypeHdr","Marker_DMUBorder1TypeHdr","Marker_DMUBorder2TypeHdr","Marker_DMUBorder3TypeHdr","Marker_DMUBorder4TypeHdr","Marker_DMUBorder5TypeHdr","Marker_DMUBorder6TypeHdr","Marker_DMUBorder7TypeHdr"],selectedHdr:"Marker_DMUNoBorderTypeHdr"},{name:"Marker_BorderSizes",line:1,hdr_list:["Marker_DMUBorder1SizeHdr","Marker_DMUBorder2SizeHdr","Marker_DMUBorder3SizeHdr","Marker_DMUBorder4SizeHdr","Marker_DMUBorder5SizeHdr","Marker_DMUBorder6SizeHdr","Marker_DMUBorder7SizeHdr","Marker_DMUBorder8SizeHdr"],selectedHdr:"Marker_DMUBorder1SizeHdr"},{name:"Marker_BorderColor",line:1,hdr_list:["Marker_DMUBorderGraphicPropHdr"]}])},getContextualCommandList:function(e){var f=[];if(e&&!e.isReadOnly()&&e.isInEdition()){var c="Marker_DMUNoBorderTypeHdr";if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"1"}])){c="Marker_DMUBorder1TypeHdr"}else{if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"2"}])){c="Marker_DMUBorder2TypeHdr"}else{if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"3"}])){c="Marker_DMUBorder3TypeHdr"}else{if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"4"}])){c="Marker_DMUBorder4TypeHdr"}else{if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"5"}])){c="Marker_DMUBorder5TypeHdr"}else{if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"6"}])){c="Marker_DMUBorder6TypeHdr"}else{if(e.compareAttributes([{name:"bHasBorder",value:true},{name:"sLineStylePattern",value:"7"}])){c="Marker_DMUBorder7TypeHdr"}}}}}}}var d="Marker_DMUBorder1SizeHdr";if(e.compareAttributes([{name:"fLineStyleThickness",value:2},{name:"fLeaderStyleThickness",value:2}])){d="Marker_DMUBorder2SizeHdr"}else{if(e.compareAttributes([{name:"fLineStyleThickness",value:3},{name:"fLeaderStyleThickness",value:3}])){d="Marker_DMUBorder3SizeHdr"}else{if(e.compareAttributes([{name:"fLineStyleThickness",value:4},{name:"fLeaderStyleThickness",value:4}])){d="Marker_DMUBorder4SizeHdr"}else{if(e.compareAttributes([{name:"fLineStyleThickness",value:5},{name:"fLeaderStyleThickness",value:5}])){d="Marker_DMUBorder5SizeHdr"}else{if(e.compareAttributes([{name:"fLineStyleThickness",value:6},{name:"fLeaderStyleThickness",value:6}])){d="Marker_DMUBorder6SizeHdr"}else{if(e.compareAttributes([{name:"fLineStyleThickness",value:7},{name:"fLeaderStyleThickness",value:7}])){d="Marker_DMUBorder7SizeHdr"}else{if(e.compareAttributes([{name:"fLineStyleThickness",value:8},{name:"fLeaderStyleThickness",value:8}])){d="Marker_DMUBorder8SizeHdr"}}}}}}}f=[{name:"fillGraphicProperties",line:1,hdr_list:["Marker_DMUFillGraphicPropHdr"]},{name:"borderLineTypes",line:1,hdr_list:["Marker_DMUNoBorderTypeHdr","Marker_DMUBorder1TypeHdr","Marker_DMUBorder2TypeHdr","Marker_DMUBorder3TypeHdr","Marker_DMUBorder4TypeHdr","Marker_DMUBorder5TypeHdr","Marker_DMUBorder6TypeHdr","Marker_DMUBorder7TypeHdr"],selectedHdr:c},{name:"borderSizes",line:1,hdr_list:["Marker_DMUBorder1SizeHdr","Marker_DMUBorder2SizeHdr","Marker_DMUBorder3SizeHdr","Marker_DMUBorder4SizeHdr","Marker_DMUBorder5SizeHdr","Marker_DMUBorder6SizeHdr","Marker_DMUBorder7SizeHdr","Marker_DMUBorder8SizeHdr"],selectedHdr:d},{name:"borderColor",line:1,hdr_list:["Marker_DMUBorderGraphicPropHdr"]}]}return f},getSharedHeaderTypes:function(){return{}},register:function(c){this._parent({type:"DMUMarker",module:"DMUMarker",workbenchName:"DMUMarkerContextHdr",frmWindow:c.frmWindow})}});return b});define("DS/DMUMarker/DMUMarkerCreatePictureCtxInternalCmd",["DS/ApplicationFrame/Command","DS/ApplicationFrame/CommandsManager"],function(c,a){var b=c.extend({init:function(d){this._parent(d,{mode:"shared"});this.setRepeatMode(false)},beginExecute:function(){var d=a._getCurrent(this.options.context);var e=a.getCommand("markerPictureCmdHdr",this._ctx);if(!e||(e&&!e.isPaused())||(e&&!e.setPictureCreationChoice)){e=a.getCommand("marker2DPictureCmdHdr",this._ctx)}if(!e||(e&&!e.setPictureCreationChoice)){return}if(d==="DMUImportPictureFromFileHdr"){e.setPictureCreationChoice("browser")}else{if(d==="DMUCreateSnapshotHdr"){e.setPictureCreationChoice("webcam")}else{e.setPictureCreationChoice(null)}}this.end()}});return b});define("DS/DMUMarker/DMUMarkerExport",["UWA/Class"],function(a){return a.extend({init:function(b){this.exportData=function(c,d){if(c&&b){c.writeObjectAttributes(b,d)}}}})});define("DS/DMUMarker/DMUMarkerPictureCreateCmd",["UWA/Core","DS/DMUBaseCommands/EXPGenericCmdOneSelThenOperation","DS/DMUBaseExperience/EXPToolsVisualization","DS/DMUControls/EXPSnapshotControl","DS/DMUControls/EXPFileBrowser","DS/Visualization/ThreeJS_DS","DS/StateCommandEngine/PathElementAgent","DS/DMUBaseUI/DMUInitialization","DS/DMUControls/EXPNotify","DS/CoreEvents/Events","DS/ApplicationFrame/ContextualBar","DS/DMUPlayMarker/DMUMarker3DPicture","DS/DMUPlayMarker/DMUMarker2DPicture","DS/DMUBaseExperience/DMUContextManager","i18n!DS/DMUMarker/assets/nls/DMUMarker"],function(e,p,f,k,q,n,h,i,g,b,m,o,j,l,d){var a;var c=p.extend({init:function(r){this.markerType=r.ID==="markerPictureCmdHdr"?"3D":"2D";l.setAuthoringFeatureTypes("Marker");this._parent(r,"exclusive",d.picturePositionLabel,{},true)},beginExecute:function(){i.createReviewContext({context:l.getContextViewer({viewer:this.getFrameWindow().getViewer()})});this._parent()},cancelExecute:function(){if(this._cleanData){this._cleanData()}},buildGraph:function(){var E=this;var G="browser";var J;var w;function F(N){new g({body:E._frmWindow.getUIFrame(),type:"error",duration:"3000",messages:N})}var z=new q({onFileLoadedCB:function(N){C(N);E._cleanData()},onErrorCB:function(){E._cleanData();F(d.markerpicture.FileBrowserInvalidFile)}});var M=new h({agentId:"_pathElementAgent",frameWindow:E._frmWindow});var x=function(O,N){w=N[0].position.clone();O()};var v=function(O,N){var P=E.computeEmptySelectionInformation(N);w=P[0].position.clone();O()};var B=function(){E._frmWindow.getViewerFrame().setStyle("cursor","crosshair");J=E.sendNotify("info",d.markerpicture.notifypictureposition)};function A(){E._frmWindow.getViewerFrame().setStyle("cursor","auto");E.cleanNotify(J);J=null}function y(){var P=E._frmWindow.getViewer().currentViewpoint.project(w);var O=l.getContextViewer({reviewContext:l.getReviewContext({viewer:E.getFrameWindow().getViewer()})});var N={subscribersOptions:[{onContextualBarReady:function(){return{cmdList:[{name:"DMUImportPictureFromFileStr",line:1,hdr_list:["DMUImportPictureFromFileHdr"]},{name:"DMUCreateSnapshotStr",line:1,hdr_list:["DMUCreateSnapshotHdr"]},{name:"DMUCancelPictureCmdStr",line:1,hdr_list:["DMUCancelPictureCmdHdr"]}]}},workbenchName:"DMUCreatePictureCtxCmds",module:"DMUMarker",context:O.getCommandContext(),cmdPrefix:"",fileName:"DMUCreatePictureCtxCmds.xml"}],viewerFrame:E._frmWindow.getViewer(),uiFrame:E._frmWindow.getUIFrame(),Xposition:P.x,Yposition:P.y,hideWithDistance:false};m.show(N);J=E.sendNotify("info",d.markerpicture.notifypicturesource)}function u(){E.cleanNotify(J);J=null}this._cleanData=function(){if(z){z.cleanFileBrowser()}if(J){E.cleanNotify(J)}m.hide();if(a){clearInterval(a)}m.hide();z=J=M=w=null;E._frmWindow.getViewerFrame().setStyle("cursor","auto")};var D=function(N){C(N);E._cleanData()};var H=function(){E._cleanData()};var I=function(){F(d.markerpicture.onSnaphotErrorMsg)};var L=function(N){if(G==="webcam"){new k({immersiveFrame:E._frmWindow.getImmersiveFrame(),onValidateSnapshotCB:D,onCloseSnapshotCB:H,onErrorCB:I})}else{if(G==="browser"){z.openFileBrowser();setTimeout(function(){if(E.isRunning()){var O=b.subscribe({event:"/VISU/"},function(){b.unsubscribe(O);E._cleanData()})}},100)}}N()};var K=this.createInitialState("selectGeometryState");this.setEnterStateAction(K,B);this.setExitStateAction(K,A);var r=this.createState("selectOriginState");var t=this.createState("captureSnapshotState");var s=this.getFinalState();if(navigator.userAgent&&(navigator.userAgent.search("Chrome")!==-1||navigator.userAgent.search("Firefox")!==-1)&&((navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)||navigator.webkitGetUserMedia||navigator.mozGetUserMedia)){this.setPictureCreationChoice=function(N){G=N;m.hide();if(a){clearInterval(a)}a=setInterval(function(){if(E.isRunning()){clearInterval(a);E.publish({event:G?"contextBarOK":"contextBarCancel",data:null})}},10)};this.setEnterStateAction(r,y);this.setExitStateAction(r,u);this.addTransition({iEvent:M,iInitialState:K,iFinalState:r,iAction:x});this.addEmptySelectionTransition(K,r,v);this.addTransition({iEvent:M,iInitialState:r,iFinalState:r,iAction:function(O,N){w=N[0].position.clone();y();O()}});this.addEmptySelectionTransition(r,r,function(O,N){var P=E.computeEmptySelectionInformation(N);w=P[0].position.clone();y();O()})}else{G="browser";this.addTransition({iEvent:M,iInitialState:K,iFinalState:s,iAction:function(O,N){w=N[0].position.clone();L(O)}});this.addEmptySelectionTransition(K,s,function(O,N){var P=E.computeEmptySelectionInformation(N);w=P[0].position.clone();L(O)})}this.addTransition({iSender:this,iEvent:"contextBarOK",iInitialState:r,iFinalState:s,iAction:function(N){L(N)}});this.addTransition({iSender:this,iEvent:"contextBarCancel",iInitialState:r,iFinalState:s,iAction:function(N){E._cleanData();N()}});this.addTransition({iSender:this,iEvent:"ActionOK",iInitialState:t,iFinalState:s,iAction:function(N){E._cleanData();N()}});function C(X){if(X.img){var O=l.getReviewContext({viewer:E.getFrameWindow().getViewer()});var W=O.getCurrentReview();var V=E.markerType==="3D"?new o(E._viewer,O):new j(E._viewer,O);V.initComponent({context:W});V._sType=E.markerType==="3D"?"Marker3DPicture":"Marker2DPicture";V._sID=O.computeNewID();V._sName=W.computeNewName(E.markerType==="3D"?"PictureMarker3D":"PictureMarker2D");var S=300;var Q=X.img.width,ab=X.img.height;if(Q>S){ab=S*ab/Q;Q=S}if(ab>S){Q=S*Q/ab;ab=S}Q=Math.round(Q);ab=Math.round(ab);var U=w;var N=E.markerType==="3D"?f.getWindowPositionFromPoint(E._viewer,U,E._frmWindow):f.getViewerPositionFromPoint(E._viewer,U);var ac=f.getDistanceFromPixel(E._viewer,U,Q,E._frmWindow);if(N.top<Q){ac=-ac}var R=f.getViewpointInfo(E._viewer.currentViewpoint);var T=R.up.clone().multiplyScalar(ac);U=U.clone().add(T);var aa={bHasALeader:true,sLeaderEndType:"Arrow",bIsFilled:true,bHasBorder:false,fFontSize:3.5,fBorderRadius:4,fImageWidth:E.markerType==="3D"?f.convertPixelToModel({sizeInPixels:Q,viewer:E._viewer}):Q,fImageHeight:E.markerType==="3D"?f.convertPixelToModel({sizeInPixels:ab,viewer:E._viewer}):ab};if(E.markerType==="3D"){aa.vLeaderBreakPoint3D=U;aa.lLeaderPointingPoints=[w.clone()]}else{var Z=f.getViewerPositionFromPoint(E._viewer,U);aa.vLeaderBreakPoint2D=new n.Vector2(Z.left,Z.top);var P=f.getViewerPositionFromPoint(E._viewer,w);aa.lLeaderPointingPoints=[new n.Vector2(P.left,P.top)]}V.setCreationState(aa);var Y=new Date().toLocaleDateString();V.setAttribute("sTextContents",[X.name?X.name+" | "+Y:Y]);V.setAttribute("sImageSrc",X.img);V.buildNode();E.addInCSO(V)}}}});return c});define("DS/DMUMarker/DMUMarkerArrowCreateCmd",["DS/DMUBaseCommands/EXPGenericCmdOneSelThenOperation","DS/DMUBaseExperience/EXPToolsVisualization","DS/Visualization/ThreeJS_DS","DS/DMUBaseUI/DMUInitialization","DS/DMUBaseExperience/DMUContextManager","DS/DMUPlayMarker/DMUMarker3DArrow","DS/DMUPlayMarker/DMUMarker2DArrow","i18n!DS/DMUMarker/assets/nls/DMUMarker"],function(i,c,e,d,f,g,b,h){var a=i.extend({init:function(j){var o=j.ID==="markerArrowCmdHdr"||j.ID==="marker3DDoubleArrowCmdHdr"?"3D":"2D";var p=this;var k=null;var m=false;f.setAuthoringFeatureTypes("Marker");function l(v,s){var q=f.getReviewContext({viewer:p.getFrameWindow().getViewer()});var w=q?q.getCurrentReview():null;var x=v[0].position;k=o==="3D"?new g(p._viewer,q):new b(p._viewer,q);k.initComponent({context:w});k._sID=q.computeNewID();k._sName=w.computeNewName(o==="3D"?"ArrowMarker3D":"ArrowMarker2D");var B=100,r,y=x.clone(),C=s;if(o==="3D"){var z=c.getDistanceFromPixel(p._viewer,x,B,p._frmWindow);var t=c.getViewpointInfo(p._viewer.currentViewpoint);var A=t.right.clone().add(t.up).normalize().multiplyScalar(z);if(!C){C=x.clone().add(A);r=z/10}else{r=C.clone().sub(x.clone()).length()}}else{var u=c.getViewerPositionFromPoint(p._viewer,y);y=new e.Vector2(u.left,u.top);if(C){u=c.getViewerPositionFromPoint(p._viewer,C);C=new e.Vector2(u.left,u.top)}else{C=new e.Vector2().copy(y);C.add(new e.Vector2(150,0))}r=C.clone().sub(y).length()/10}k.setCreationState({vFirstPoint:y,vSecondPoint:C,fWidth:r,cLineStyleColor:new e.Color("#cc092f"),cFillStyleColor:new e.Color("#cc092f"),bIsFilled:true,bHasBorder:false,sStyle:j.ID.indexOf("DoubleArrow")===-1?"beginSide":"bothSide"});k.buildNode();if(!m){p.addInCSO(k)}}function n(q){if(!m&&!k){l(q)}}j.dragEventCallback=function(q){if(k){var s,r=q.vCurrentPosition;if(o==="2D"){var t=c.getViewerPositionFromPoint(p._viewer,r);r=new e.Vector2(t.left,t.top)}s=r.clone().sub(k.getAttribute("vFirstPoint")).length()/10;k.setNominalState({fWidth:s,vSecondPoint:r});k.setAttribute("fWidth",s);k.setAttribute("vSecondPoint",r);p._viewer.render()}else{m=true;l([{position:q.vStartPosition}],q.vCurrentPosition)}if(q.bLastUpdate){m=false;p.addInCSO(k)}};this.clean=function(){m=false;k=null};this._parent(j,n,h.arrowPositionLabel,{},true)},beginExecute:function(){d.createReviewContext({context:f.getContextViewer({viewer:this.getFrameWindow().getViewer()})});this._parent()},endExecute:function(){this._parent();if(this.clean){this.clean()}}});return a});define("DS/DMUMarker/DMUMarkerCircleCreateCmd",["DS/DMUBaseCommands/EXPGenericCmdOneSelThenOperation","DS/DMUBaseExperience/EXPToolsVisualization","DS/DMUBaseUI/DMUInitialization","DS/Visualization/ThreeJS_DS","DS/DMUBaseExperience/DMUContextManager","DS/DMUPlayMarker/DMUMarker3DCircle","DS/DMUPlayMarker/DMUMarker2DCircle","i18n!DS/DMUMarker/assets/nls/DMUMarker"],function(i,c,d,e,f,h,b,g){var a=i.extend({init:function(j){var o=j.ID==="markerCircleCmdHdr"?"3D":"2D";var p=this;var l=null;var n=false;f.setAuthoringFeatureTypes("Marker");function k(v,s){var x=f.getReviewContext({viewer:p.getFrameWindow().getViewer()});var r=x?x.getCurrentReview():null;var q=v[0].position;l=o==="3D"?new h(p._viewer,x):new b(p._viewer,x);l.initComponent({context:r});l._sID=x.computeNewID();l._sName=r.computeNewName(o==="3D"?"CircleMarker3D":"CircleMarker2D");var w;if(!s){w=100}else{w=q.clone().sub(s).length()}var t={fRadius:o==="3D"?c.getDistanceFromPixel(p._viewer,q,w,p._frmWindow):w,cLineStyleColor:new e.Color("#cc092f"),cFillStyleColor:new e.Color("#cc092f"),fLineStyleThickness:5,bIsFilled:false,bHasBorder:true};if(o==="3D"){t.vCenter=q.clone()}else{var u=c.getViewerPositionFromPoint(p._viewer,q);t.vCenter=new e.Vector2(u.left,u.top)}l.setCreationState(t);l.buildNode();if(!n){p.addInCSO(l)}}function m(q){if(!n&&!l){k(q)}}j.dragEventCallback=function(q){if(l){var u=q.vStartPosition.clone(),s=q.vCurrentPosition.clone();if(o==="2D"){var t=c.getViewerPositionFromPoint(p._viewer,u);u=new e.Vector2(t.left,t.top);t=c.getViewerPositionFromPoint(p._viewer,s);s=new e.Vector2(t.left,t.top)}var r=u.sub(s);l.setNominalState({fRadius:Math.max(0,r.length())});l.setAttribute("fRadius",Math.max(0,r.length()))}else{n=true;k([{position:q.vStartPosition}],q.vCurrentPosition)}if(q.bLastUpdate){n=false;p.addInCSO(l)}};this.clean=function(){n=false;l=null};this._parent(j,m,g.circlePositionLabel,{},true)},beginExecute:function(){d.createReviewContext({context:f.getContextViewer({viewer:this.getFrameWindow().getViewer()})});this._parent()},endExecute:function(){this._parent();if(this.clean){this.clean()}}});return a});define("DS/DMUMarker/DMUMarkerTextContextualBar",["DS/DMUMarker/DMUMarkerContextualBar","DS/Visualization/ThreeJS_DS"],function(a,b){return a.extend({getContextualCommandList:function(e){var f=[];if(e&&!e.isReadOnly()&&e.isInEdition()){f=this._parent(e);var d="DMUMarkerNoLeaderHdr";if(e.compareAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"Arrow"}])){d="DMUMarkerArrowLeaderHdr"}else{if(e.compareAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"Bubble"}])){d="DMUMarkerBubbleLeaderHdr"}else{if(e.compareAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"No end"}])){d="DMUMarkerNoEndLeaderHdr"}}}var c="Marker_DMUDefaultStyleHdr";if(e.compareAttributes([{name:"fOpacity",value:1},{name:"cFontColor",value:new b.Color("#000000")},{name:"sFontStyle",value:"normal"},{name:"cFillStyleColor",value:new b.Color("#ffffff")},{name:"bIsFilled",value:false},{name:"bHasBorder",value:false},{name:"fLineStyleThickness",value:1},{name:"sLineStylePattern",value:"1"},{name:"cLineStyleColor",value:new b.Color("#3d3d3d")},{name:"fLeaderStyleThickness",value:1},{name:"sLeaderStylePattern",value:"1"},{name:"cLeaderStyleColor",value:new b.Color("#3d3d3d")}])){c="Marker_DMULightStyleHdr"}else{if(e.compareAttributes([{name:"fOpacity",value:1},{name:"cFontColor",value:new b.Color("#ffffff")},{name:"sFontStyle",value:"normal"},{name:"cFillStyleColor",value:new b.Color("#368ec4")},{name:"bIsFilled",value:true},{name:"bHasBorder",value:false},{name:"fLineStyleThickness",value:1},{name:"sLineStylePattern",value:"1"},{name:"cLineStyleColor",value:new b.Color("#3d3d3d")},{name:"fLeaderStyleThickness",value:1},{name:"sLeaderStylePattern",value:"1"},{name:"cLeaderStyleColor",value:new b.Color("#3d3d3d")}])){c="Marker_DMUMeasureStyleHdr"}else{if(e.compareAttributes([{name:"fOpacity",value:1},{name:"cFontColor",value:new b.Color("#000000")},{name:"sFontStyle",value:"italic"},{name:"cFillStyleColor",value:new b.Color("#fee000")},{name:"bIsFilled",value:true},{name:"bHasBorder",value:false},{name:"fLineStyleThickness",value:1},{name:"sLineStylePattern",value:"1"},{name:"cLineStyleColor",value:new b.Color("#ff8a2e")},{name:"fLeaderStyleThickness",value:1},{name:"sLeaderStylePattern",value:"1"},{name:"cLeaderStyleColor",value:new b.Color("#ff8a2e")}])){c="Marker_DMUPostitStyleHdr"}else{if(e.compareAttributes([{name:"fOpacity",value:1},{name:"cFontColor",value:new b.Color("#ffffff")},{name:"sFontStyle",value:"normal"},{name:"cFillStyleColor",value:new b.Color("#57b847")},{name:"bIsFilled",value:true},{name:"bHasBorder",value:false},{name:"fLineStyleThickness",value:1},{name:"sLineStylePattern",value:"1"},{name:"cLineStyleColor",value:new b.Color("#477738")},{name:"fLeaderStyleThickness",value:1},{name:"sLeaderStylePattern",value:"1"},{name:"cLeaderStyleColor",value:new b.Color("#477738")}])){c="Marker_DMUValidateStyleHdr"}else{if(e.compareAttributes([{name:"fOpacity",value:1},{name:"cFontColor",value:new b.Color("#ffffff")},{name:"sFontStyle",value:"normal"},{name:"cFillStyleColor",value:new b.Color("#ff8a2e")},{name:"bIsFilled",value:true},{name:"bHasBorder",value:false},{name:"fLineStyleThickness",value:1},{name:"sLineStylePattern",value:"1"},{name:"cLineStyleColor",value:new b.Color("#8f4c00")},{name:"fLeaderStyleThickness",value:1},{name:"sLeaderStylePattern",value:"1"},{name:"cLeaderStyleColor",value:new b.Color("#8f4c00")}])){c="Marker_DMUWarningStyleHdr"}else{if(e.compareAttributes([{name:"fOpacity",value:1},{name:"cFontColor",value:new b.Color("#ffffff")},{name:"sFontStyle",value:"bold"},{name:"cFillStyleColor",value:new b.Color("#cc092f")},{name:"bIsFilled",value:true},{name:"bHasBorder",value:false},{name:"fLineStyleThickness",value:1},{name:"sLineStylePattern",value:"1"},{name:"cLineStyleColor",value:new b.Color("#6d2828")},{name:"fLeaderStyleThickness",value:1},{name:"sLeaderStylePattern",value:"1"},{name:"cLeaderStyleColor",value:new b.Color("#6d2828")}])){c="Marker_DMUCautionStyleHdr"}}}}}}f.unshift({name:"DMUMarkerLeaderStr",line:1,hdr_list:["Marker_DMUArrowLeaderHdr","Marker_DMUBubbleLeaderHdr","Marker_DMUNoEndLeaderHdr","Marker_DMUNoLeaderHdr"],selectedHdr:d},{name:"Marker_DMUStylesStr",line:1,hdr_list:["Marker_DMUDefaultStyleHdr","Marker_DMULightStyleHdr","Marker_DMUMeasureStyleHdr","Marker_DMUPostitStyleHdr","Marker_DMUValidateStyleHdr","Marker_DMUWarningStyleHdr","Marker_DMUCautionStyleHdr"],selectedHdr:c},{name:"Marker_DMUIncreaseFontSizeStr",line:1,hdr_list:["Marker_DMUIncreaseFontSizeHdr"]},{name:"Marker_DMUDecreaseFontSizeStr",line:1,hdr_list:["Marker_DMUDecreaseFontSizeHdr"]})}return f},getSharedHeaderTypes:function(){return{leaderProperties:true,fontProperties:true}}})});define("DS/DMUMarker/DMUMarkerPictureContextualBar",["DS/DMUMarker/DMUMarkerContextualBar"],function(a){return a.extend({getContextualCommandList:function(c){var d=[];if(c&&!c.isReadOnly()&&c.isInEdition()){d=this._parent(c);var b="Marker_DMUNoLeaderHdr";if(c.compareAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"Arrow"}])){b="Marker_DMUArrowLeaderHdr"}else{if(c.compareAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"Bubble"}])){b="Marker_DMUBubbleLeaderHdr"}else{if(c.compareAttributes([{name:"bHasALeader",value:true},{name:"sLeaderEndType",value:"No end"}])){b="Marker_DMUNoEndLeaderHdr"}}}d.unshift({name:"Marker_DMULeaderStr",line:1,hdr_list:["Marker_DMUArrowLeaderHdr","Marker_DMUBubbleLeaderHdr","Marker_DMUNoEndLeaderHdr","Marker_DMUNoLeaderHdr"],selectedHdr:b});d.unshift({name:"DMUMarkerShortDisplayStr",line:1,hdr_list:["DMUMarkerShortDisplayHdr"]})}return d},getSharedHeaderTypes:function(){return{leaderProperties:true}}})});