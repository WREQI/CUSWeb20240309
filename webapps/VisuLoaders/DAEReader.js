define("DS/VisuLoaders/DAEReader",["DS/Visualization/Node3D","DS/Visualization/Mesh3D","DS/Visualization/MaterialManager","DS/Visualization/ThreeJS_DS","DS/VisuLoaders/ColladaLoader","DS/VisuLoaders/SceneGraphConverter"],function(b,f,i,e,c,a){var g=function(k){var m,j,l,n;j=document.getElementsByTagName("script");for(m=0;m<j.length;m++){l=j.item(m);n=l.getAttribute("src");if(n&&n.match(k)){return n.substring(0,n.lastIndexOf("/")+1)}}return"scripts/ThreeDS/Visualization/"};var d="scripts/ThreeDS/Visualization/";var h=function(m,q){var p,t,s,k,r,j,o,u,l;p=m;t=(q!==undefined)?q:null;s=null;k=null;j=null;l=null;function n(){s=null;k=null;j=null;r="";o=null;u=null}this.loadFromSpec=function(w,y,x,v){this.load(w,y,x,v,true)};this.load=function(x,A,z,v,w){n();r=x;if(A!==undefined){s=A}if(v!==undefined){k=v}o=new b();if(j===null){j=new c();j.options.convertUpAxis=true;if(this.waitMaterial){j.options.waitMaterial=this.waitMaterial}var y=w?j.loadFromSpec:j.load;y(x,function(B){l=new a(p,B.scene);o.addChild(l.getRootNode());u=B.skins[0];if(t!==null){t({hack:true,updateInfinitePlane:true})}if(k!==null){k()}});if(s){s(o)}}};this.setWaitMaterial=function(v){this.waitMaterial=v}};return h});