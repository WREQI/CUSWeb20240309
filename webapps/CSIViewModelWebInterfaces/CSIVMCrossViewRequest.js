define("DS/CSIViewModelWebInterfaces/CSIVMCrossViewRequest",["DS/CSIViewModelWebInterfaces/CSIVMClientManagerList","DS/CSIViewModelWebInterfaces/CSIVMClientTreeKey"],function(e,b){function c(i){var h;if(i){if(i.getIdentificationObject!=undefined){h=i.getIdentificationObject()||undefined}else{if(i.sgNode!=undefined){if(i.sgNode.getIdentificationObject!=undefined){h=i.sgNode.getIdentificationObject()||undefined}else{if(i.sgNode.getFirstPrimitive!=undefined){var j=i.sgNode.getFirstPrimitive();h=j.getIdentificationObject()||undefined}}}}}return h}function f(k){var j=[];if(k!==undefined){var i=k.getNameSpace();j=i.getAllTreeKeys();var h=k.getDualObject();if(h!==undefined){i=h.getNameSpace();j=j.concat(i.getAllTreeKeys())}}return j}function a(j,k,i){if(j===undefined){false}var l={belongs:false,index:k.indexOf(j)};if(l.index!==-1){l.belongs=true}else{var h=j.getParents(i,j.stateMode.Tempo);h.forEach(function(n){var m=a(n,k,i);if(m.belongs){l.belongs=true;if((l.index===-1)||(m.index<l.index)){l.index=m.index}}})}return l}function g(C,l,x,y,m,t){if(C===undefined){return}var o=t;x.push(C);var p=C.getMainObject();if(!p){p=C}else{o=false}var r=p.getAdditionalObjects();var s=[];if(Array.isArray(r)&&r.length){s=r.concat(p);o=false}else{s.push(p)}var v;var n=s.length;var B=0,A=0;for(B=0;B<n;B++){v=s[B];if(v.getViewData(m)){var D=v.getParents(m,v.stateMode.Tempo);if(D&&D.length){var E=[];if(D.length>1&&o){var z=-1;D.forEach(function(i){var j=a(i,l,m);if(j.belongs&&(z===-1||j.index<=z)){if(j.index<z){E=[i]}else{E.push(i)}z=j.index}})}else{E=D}for(A=0;A<E.length;A++){g(E[A],l,x,y,m,o)}}else{if(!(v.isRoot())){throw"error : ident object with no parent but not root"}var h=[];for(A=x.length-1;A>=0;A--){var u=x[A].getAssociatedViewElt(m,v.stateMode.Tempo);if(u===undefined){throw"error : no view object associated with ident object"}h.push(u)}if(!h.length){throw"error : path vide"}var w;for(A=0;A<e._Managers.length&&!w;A++){var q=e._Managers[A]._impl.getModel();if((q.getTreeKey(m.getUUID()))!=undefined){w=e._Managers[A]._impl.getNotifier(m.getViewType())}}if(w===undefined){throw"error : no notifier found"}var k=w.createPathElement(h);if(k===undefined){throw"error : no pathElement returned by the notifier"}y.push(k)}}}x.pop()}function d(h){Object.defineProperty(this,"_pathElt",{value:h,configurable:false,writable:false})}Object.defineProperty(d.prototype,"diagnosisValues",{value:{succeeded:1,failed:2,noRepresentationInView:3},configurable:false,writable:false});Object.defineProperty(d.prototype,"getAvailableTreeKeys",{value:function(){var h,l;var n=this._pathElt.getLength();var k=0;for(k=0;(k<n)&&(l===undefined);k++){h=this._pathElt.getElement(k);l=c(h)}var m=f(l);if(m.length===1&&k<n){var j=m[0];if(j.getViewType()===b.prototype.ViewType.View3D){h=this._pathElt.getElement(k);l=c(h);if(l!==undefined){m=f(l)}}}return m},configurable:false,writable:false});Object.defineProperty(d.prototype,"getPathElementsInView",{value:function(m){var i=[];var h=[];var k=[];var o=this.diagnosisValues.failed;var l=m.treeKey.getViewType();var j,r,q;var n=this._pathElt.getLength();var p=n-1;while(j=this._pathElt.getElement(p)){r=c(j);if(r!==undefined){q=r.getDualObject(l);if(q!==undefined){r=q}k.push(r)}else{if(p===n-1){break}}p--}if(k.length){g(k.shift(),k,h,i,m.treeKey,true);if(i.length){o=this.diagnosisValues.succeeded}else{o=this.diagnosisValues.noRepresentationInView}}m.onAnswer({diagnosisValues:o,pathElements:i})},configurable:false,writable:false});return d});