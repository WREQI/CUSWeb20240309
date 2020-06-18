/*!  Copyright 2014 Dassault Systemes. All rights reserved. */
define("DS/3DPlayMesh/FEMLoader",["UWA/Core","UWA/Class","DS/SPYLoader/AbstractLoader"],function(d,b,a){var c=a.singleton({_loadModel:function(g,e,f,h){require(["DS/VisuDataAccess/Ox4StreamLoader","DS/DataAccess/zxXHRWithProxyAbstraction"],function(n,k){if(g.requiredAuth){k.useUWAProxy(g.requiredAuth)}else{if(!g.proxyurl||g.proxyurl==="none"){k.useNoProxy()}else{k.useNoProxy()}}var l=g.physicalid;var i=g.serverurl;var j="";var m={IRPC:true,serverUrl:i,physicalid:l,boType:"FEM",format:"2",role:"EXTENDED",persistancyType:"xml",streamType:"arraybuffer",onStreamLoaded:function(q){e(90);var o;if(window.MSBlobBuilder){var s=new MSBlobBuilder();s.append(q);o=s.getBlob("application/zip")}else{var r=new DataView(q);o=new Blob([r],{type:"application/zip"})}var p=URL.createObjectURL(o);if(j.length>0){j+=";"}j+=p;f(j)},onError:function(o){o="NOSTREAM";h(o)}};e(15);n.Load(m);e(100)})}});return c});define("3DPlayMesh/3DPlayFullFEM",["DS/3DPlayMesh/3DPlayFullFEM"],function(a){console.error("This module is deprecated. use DS/3DPlayMesh/3DPlayFullFEM instead of 3DPlayMesh/3DPlayFullFEM");console.error("This module is deprecated. use DS/3DPlayMesh/3DPlayFullFEM instead of 3DPlayMesh/3DPlayFullFEM");console.error("This module is deprecated. use DS/3DPlayMesh/3DPlayFullFEM instead of 3DPlayMesh/3DPlayFullFEM");return a});define("DS/3DPlayMesh/3DPlayFullFEM",["UWA/Core","DS/3DPlayCommonSimulation/3DPlayCommonSimulation","DS/SimReview/SimReview","DS/3DPlayMesh/FEMLoader"],function(e,a,b,d){var c=a.extend({init:function(g){this._parent(g);var h={fullFEMExp:{workbenchs:[{name:"FullMeshingReview",module:"3DPlayMesh"}],visu:{displayGrid:true}}};var f=h.fullFEMExp;this.args=e.extend(g,f,true);this.args.mabModel.speeddial=[{id:"CATSPYMSRAccessCmdHdr",rsc:"SPYUI/SimulationPlayer"},{id:"AnnotationCommands",rsc:"3DPlay/3DPlayExperience3D",hideAB:true,showBack:true},{id:"Share",icon:"3DPlay/assets/icons/32/I_3DSHAREShare.png",flyout:[{id:"ShareTo3DSwYm",rsc:"3DPlay/3DPlay"},{id:"ShareDownload",rsc:"3DPlay/3DPlay"},{id:"SharePrint",rsc:"3DPlay/3DPlay"}]}];this.args.mabModel.sections=[{id:"CATSPYHideShowCmdHdr",rsc:"SPYUI/SimulationPlayer",nls:"SPYUI/SimulationPlayer",hideAB:true,showBack:true},{id:"CATSPYHideShowLegendCmdHdr",rsc:"SPYUI/SimulationPlayer",nls:"SPYUI/SimulationPlayer"},{id:"CATSPYTranspCmdHdr",rsc:"SPYUI/SimulationPlayer",nls:"SPYUI/SimulationPlayer",hideAB:true,showBack:true},{id:"Reframe",rsc:"3DPlay/3DPlayExperience3D",nls:"3DPlay/3DPlayExperience3D",hideAB:true,showBack:true},{id:"ViewSelector",rsc:"3DPlay/3DPlayExperience3D",nls:"3DPlay/3DPlayExperience3D",hideAB:true,showBack:true},{id:"Ambiance",rsc:"3DPlay/3DPlayExperience3D",nls:"3DPlay/3DPlayExperience3D",flyout:[{id:"VisuNoEnv",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuV6Env",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuCleanSpaceEnv",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuDarkBlueEnv",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuDarkGreyEnv",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuShinyEnv",rsc:"ViewerCommands/ViewerCommands"}]},{id:"measureCmdHdr",nls:"DMUBaseCommands/3DPlayPro",rsc:"DMUBaseCommands/3DPlayPro",hideAB:true},{id:"sectionCmdHdr",nls:"DMUBaseCommands/3DPlayPro",rsc:"DMUBaseCommands/3DPlayPro"},{id:"AnnotationTour",nls:"3DPlay/3DPlayExperience3D",rsc:"3DPlay/3DPlayExperience3D",hideAB:true,showBack:true}];this.appSingleton=b;this.expworkbenchName="FullMeshingReview";this.expmodule="3DPlayMesh";this.loader=d}});return e.namespace("3DPlayMesh/3DPlayFullFEM",c)});