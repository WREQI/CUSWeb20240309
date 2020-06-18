/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
define("DS/CAT3DAnnotSemanticUI/CAT3DAnnotSemanticUI",[],function(){});define("DS/CAT3DAnnotSemanticUI/CAT3DAnnotSemBrowserListItem",["UWA/Class","DS/Tree/TreeNodeModel"],function(b,c){var a=b.extend({init:function(g){var r=g||{};this._parent(r);var k=r.displayFlag===true||r.displayFlag===false?r.displayFlag:null;var h;var p=false;var n,f,o=false,e=false;var i,j;var m=this;this.getIDPath=function(){return r.idPath};this.setActiveState=function(u){if(u!==p){e=false;o=true;p=u;if(p){m.setDisplayFlag(true);if(m.getParent()){m.getParent().lock()}h.select();var s=h.getPath();if(s&&s.length){for(var t=0;t<s.length-1;t++){if(!s[t].isExpanded()){s[t].expand()}}}}else{h.unselect()}o=false}};this.isAStructuralItem=function(){return r.isAStructuralItem};this.getActiveState=function(){return p};this.getChildren=function(){return r.children};this.setDisplayFlag=function(s){if(!r.isRootNode&&!r.isAStructuralItem){if(s!==k){k=s;if(r.onDisplayHistoryFlagChangeCB){r.onDisplayHistoryFlagChangeCB(m)}}}};this.getDisplayFlag=function(s){var u=true,t;if((r.isRootNode||r.isAStructuralItem)&&r.children){for(t=0;t<r.children.length;t++){if(!r.children[t].getDisplayFlag(s)){u=false;break}}}else{if(s&&r.children&&k){for(t=0;t<r.children.length;t++){if(!r.children[t].getDisplayFlag(s)){u=false;break}}}else{u=k}}return u};this.isRootNode=function(){return r.isRootNode};this.setRootParentNode=function(t){i=t;if(h){h.parentNode=i}if(r.children){for(var s=0;s<r.children.length;s++){r.children[s].setRootParentNode(t)}}};this.lock=function(){e=true;if(j){j.lock()}};this.setParent=function(s){j=s};this.getParent=function(){return j};this.getRootParentNode=function(){return i};this.getContent=function(){return h};this.clear=function(){if(n){h.removeEventListener(n)}if(f){h.removeEventListener(f)}f=n=h=null};var d={};if(r.attributes&&r.attributes.length){for(var l=0;l<r.attributes.length;l++){d[r.attributes[l].colID]=r.attributes[l].value}}if(r.type){d.type=r.type}o=true;if(r.createTreeModelNode!==false){h=new c({label:r.name,icons:r.icon?[r.icon.replace(" ","\\ ")]:undefined,grid:d});h.setDisplayFlag=this.setDisplayFlag;h.getDisplayFlag=this.getDisplayFlag;h.getActiveState=this.getActiveState;h.isRootNode=this.isRootNode;h.isAStructuralItem=this.isAStructuralItem;h.getRootParentNode=this.getRootParentNode;if(r.children){for(var q=0;q<r.children.length;q++){if(!m.isAStructuralItem()){r.children[q].setParent(m)}h.addChild(r.children[q].getContent())}}if(r.callback){n=h.onSelect(function(){if(!o&&!e){if(m.getParent()){m.getParent().lock()}p=true;m.setDisplayFlag(true);r.callback(m)}e=false});f=h.onUnselect(function(){if(!o){p=false;r.callback(m)}})}}if(k!==null){this.setDisplayFlag(k)}this.setActiveState(typeof r.activeState==="boolean"?r.activeState:false);o=false}});return a});define("DS/CAT3DAnnotSemanticUI/CAT3DAnnotSemAttrThumbnail",["UWA/Core","DS/CAT3DAnnotationBaseUI/CAT3DAnnotationAttrDiv","css!DS/CAT3DAnnotSemanticUI/CAT3DAnnotSemanticUI.css"],function(c,a){var b=a.extend({init:function(e){var d=e||{};this._parent(d);this.thumbnailID=d.id},buildThumbnailContent:function(d){var e=this.build([d],true,d.callback);if(e){var f=c.createElement("div",{id:"AnnotSemAttrThumb_"+this.thumbnailID,"class":"CAT3DAnnotSemAttrThumbContainer"});f.appendChild(e);e=f}return e}});return b});