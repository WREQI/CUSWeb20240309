define("DS/VRModels/ControllerModel",["UWA/Core","DS/Visualization/ThreeJS_DS","DS/WebappsUtils/WebappsUtils","DS/Visualization/Node3D","DS/Visualization/ModelLoader","DS/Mesh/MeshUtils"],function(f,c,e,d,b){var a=f.Class.singleton({loadControllersModel:function(l,m,h){var g=new b();var j=l[0].getType();var k;if(j==="ViveController"){k=e.getWebappsAssetUrl("Devices","models/vr_controller_vive_1_5/OpenVR_ControllerMesh.cgr")}else{if(j==="OculusTouch"){}else{return}}var i=new d("ControllerModel");i.intersectable=false;g.setOnLoadedCallback(function(){var q=i.getChildren()[0];q.intersectable=false;q.setShadow(false,true);for(var o=0;o<l.length;++o){var n=l[o];var p=n.getNode();if(!p.getChildByName("ControllerModel")){p.addChild(i);m.addChild(p)}}if(h){h()}});g.loadModel(k,i)}});return a});