define("DS/CSIViewModelWebImplement/CSIVMClientObject",["DS/CSIViewModelWebInterfaces/CSIVMClientStateMode"],function(a){function c(e,d,f){this.clear();this._localId=d;this._idPattern=f;this._nameSpace=e}c.prototype.stateMode=a;function b(){}b.prototype.initTempoChildren=function(){if(this._childrenTempo===undefined){if(this._childrenMapping===true){this._childrenTempo=new Map(this._children)}else{this._childrenTempo=(this._children!==undefined)?this._children.slice():[]}this._withTempoState=true}};b.prototype.initTempoParents=function(){if(this._parentsTempo===undefined){this._parentsTempo=[];if(this._parents!==undefined){var e=this._parents.length;this._parentsTempo.length=e;var d=0;for(d=0;d<e;d++){this._parentsTempo[d]=this._parents[d]}}this._withTempoState=true}};b.prototype.abort=function(){this._childrenTempo=undefined;this._parentsTempo=undefined;this._associatedObjectTempo=undefined;this._withTempoState=false};b.prototype.commit=function(){if(this._withTempoState){if(this._childrenTempo!==undefined){this._children=this._childrenTempo}if(this._parentsTempo!==undefined){this._parents=this._parentsTempo}if(this._associatedObjectTempo!==undefined){this._associatedObject=this._associatedObjectTempo}this.abort()}};b.prototype.getProperty=function(e,d){var f=undefined;switch(d){case c.prototype.stateMode.Tempo:case c.prototype.stateMode.TempoOrPermanent:f=this[e+"Tempo"];if(f===undefined){f=this[e]}break;case c.prototype.stateMode.Permanent:f=this[e];break}return f};b.prototype.setAssociatedObject=function(d){this._withTempoState=true;this._associatedObjectTempo=d};b.prototype.getAssociatedObject=function(d){return this.getProperty("_associatedObject",d)};b.prototype.addChild=function(d){this.initTempoChildren();if(this._childrenMapping===true){this._childrenTempo.set(d.getLocalId(),d)}else{this._childrenTempo.push(d)}};b.prototype.addChildren=function(d){this.initTempoChildren();if(this._childrenMapping===true){var g=d.length;var h;for(var e=0;e<g;++e){h=d[e];this._childrenTempo.set(h.getLocalId(),h)}}else{var g=d.length;var f=this._childrenTempo.length;g+=f;this._childrenTempo.length=g;for(var e=f;e<g;++e){this._childrenTempo[e]=d[e-f]}}};b.prototype.removeChild=function(d){this.initTempoChildren();if(this._childrenMapping===true){this._childrenTempo["delete"](d.getLocalId())}else{var e=this._childrenTempo.indexOf(d);if(e>-1){this._childrenTempo.splice(e,1)}}};b.prototype.getChildren=function(d){var f;var e=this.getProperty("_children",d);if(e!==undefined){f=(this._childrenMapping===true)?Array.from(e.values()):e}return f};b.prototype.getMappedChildren=function(d){return(this._childrenMapping===true)?this.getProperty("_children",d):undefined};b.prototype.addParent=function(d){this.initTempoParents();this._parentsTempo.push(d)};b.prototype.removeParent=function(e){this.initTempoParents();var d=this._parentsTempo.indexOf(e);if(d>-1){this._parentsTempo.splice(d,1)}};b.prototype.getParents=function(d){return this.getProperty("_parents",d)};c.prototype.clear=function(){if(this._ViewDatas!==undefined){delete this._ViewDatas}};c.prototype.getLocalId=function(){return this._localId};c.prototype.getIdPattern=function(){return this._idPattern};c.prototype.getNameSpace=function(){return this._nameSpace};c.prototype.getMainObject=function(){return this._mainObj};c.prototype.addObject=function(){if(this._additionalObjects===undefined){this._additionalObjects=[]}var d=new c(this._nameSpace,this._localId,this._idPattern);d._mainObj=this;d._dualObj=this._dualObj;d._dualViewType=this._dualViewType;this._additionalObjects.push(d);return d};c.prototype.getAdditionalObjects=function(){return this._additionalObjects};c.prototype.getViewData=function(d){var e=undefined;if(this._ViewDatas!==undefined){e=this._ViewDatas[d.getViewType()]}return e};c.prototype.getOrCreateViewData=function(d){var f=undefined;var e=d.getViewType();if(this._ViewDatas!==undefined){f=this._ViewDatas[e]}if(f===undefined){if(this._ViewDatas===undefined){this._ViewDatas={}}f=new b();if(this._childrenMapping===true){f._childrenMapping=true}this._ViewDatas[e]=f}return f};c.prototype.deleteViewData=function(d){if(this._ViewDatas!==undefined&&d!==undefined){delete this._ViewDatas[d.getViewType()];if(Object.keys(this._ViewDatas).length===0){delete this._ViewDatas}if(this._dualObj!==undefined){var e=this._dualObj.getDualObject(d.getViewType());if(e===this){this._dualObj.setDualObject()}this.setDualObject()}}};c.prototype.isEmpty=function(){if(this._additionalObjects!==undefined){var d=0;var e=this._additionalObjects.length;for(d=0;d<e;d++){if(!(this._additionalObjects[d].isEmpty())){return false}}}return((this._ViewDatas===undefined)&&(!this.isRoot()))};c.prototype.isTemporary=function(){var f=undefined;var e=undefined;var d=undefined;if(this._ViewDatas!==undefined){for(f in this._ViewDatas){e=this._ViewDatas[f];if(this.isRoot()){d=e.getChildren(c.prototype.stateMode.Permanent)}else{d=e.getParents(c.prototype.stateMode.Permanent)}if(d!==undefined){return false}}}return true};c.prototype.associateViewElt=function(d,e){var f=this.getOrCreateViewData(d);if(f!==undefined){f.setAssociatedObject(e)}};c.prototype.getAssociatedViewElt=function(d){var f=undefined;var e=this.getViewData(d);if(e!==undefined){f=e.getAssociatedObject(c.prototype.stateMode.TempoOrPermanent)}return f};c.prototype.getKey=function(d){var g=undefined;var f=undefined;if(this._ViewDatas!==undefined){for(var e in this._ViewDatas){f=this._ViewDatas[e].getAssociatedObject(c.prototype.stateMode.Tempo);if(f===d){g=this.getNameSpace().getTreeKeyFromViewType(e);break}f=this._ViewDatas[e].getAssociatedObject(c.prototype.stateMode.Permanent);if(f===d){g=this.getNameSpace().getTreeKeyFromViewType(e);break}}}return g};c.prototype.setRoot=function(){this._isRoot=true;this._nameSpace.setRootObject(this)};c.prototype.isRoot=function(){return(this._isRoot===true)};c.prototype.isLeaf=function(d){var f=true;var e=this.getChildren(d,this.stateMode.TempoOrPermanent);if(e!==undefined&&e.length>0){f=false}return f};c.prototype.activateChildrenMapping=function(){this._childrenMapping=true};c.prototype.addChild=function(e,d){var f=this.getOrCreateViewData(e);if(f!==undefined){f.addChild(d);d.addParent(e,this)}};c.prototype.addChildren=function(d,f){var h=this.getOrCreateViewData(d);if(h!==undefined){h.addChildren(f);var g=f.length;var e=0;for(e=0;e<g;e++){f[e].addParent(d,this)}}};c.prototype.addParent=function(d,f){var e=this.getOrCreateViewData(d);if(e!==undefined){e.addParent(f)}};c.prototype.removeChild=function(e,d){var f=this.getOrCreateViewData(e);if(f!==undefined){f.removeChild(d);d.removeParent(e,this)}};c.prototype.removeParent=function(d,f){var e=this.getOrCreateViewData(d);if(e!==undefined){e.removeParent(f)}};c.prototype.getChildren=function(e,d){var g=undefined;var f=this.getViewData(e);if(f!==undefined){g=f.getChildren(d)}return g};c.prototype.getMappedChildren=function(e,d){var g=undefined;var f=this.getViewData(e);if(f!==undefined){g=f.getMappedChildren(d)}return g};c.prototype.getAllChildren=function(f){var m=[];var l=undefined;var k=undefined;var e=undefined;var h,g,d;if(this._ViewDatas!==undefined){for(l in this._ViewDatas){k=this._ViewDatas[l];e=k.getChildren(f);if(e!==undefined){h=e.length;for(g=0;g<h;g++){d=e[g];if(m.indexOf(d)<0){m.push(d)}}}}}return m};c.prototype.getAllParents=function(d){var m=[];var l=undefined;var k=undefined;var e=undefined;var h,g,f;if(this._ViewDatas!==undefined){for(l in this._ViewDatas){k=this._ViewDatas[l];e=k.getParents(d);if(e!==undefined){h=e.length;for(g=0;g<h;g++){f=e[g];if(m.indexOf(f)<0){m.push(f)}}}}}return m};c.prototype.getFirstParentsDefiningNameSpaceOfThis=function(h){var l=[];var k;if(h===undefined){k=(this.getIdPattern())._idSpace;if(k===(this.getIdPattern())._idContext){return l}}else{k=h}var e=this.getAllParents(this.stateMode.Tempo);var g=e.length;if(g){if((e[0].getIdPattern())._idContext===k){for(var f=0;f<g;f++){if((e[f].getIdPattern())._idContext!==k){return undefined}l.push(e[f])}}else{var d=0;while(!(l.length)&&(d<g)){l=e[d].getFirstParentsDefiningNameSpaceOfThis(k);d++}}}return l};c.prototype.getParents=function(e,d){var g=undefined;var f=this.getViewData(e);if(f!==undefined){g=f.getParents(d)}return g};c.prototype.getChildrenWithId=function(p,n,d){var l=[];if(d===undefined){return l}if(this._childrenMapping===true){var f=this.getMappedChildren(p,n);if(f!==undefined){var q=d.length;if(f.size===q){l=Array.from(f.values())}else{var m,h,e;for(m=0;m<q;++m){e=d[m];if(typeof e==="string"){e=parseInt(e)}h=f.get(e);if(h!==undefined){l.push(h)}}}}}else{var g=this.getChildren(p,n);if(g!==undefined){var o=g.length;var q=d.length;if(o===q){l=g}else{var f=new Map();var m,h;for(m=0;m<o;++m){h=g[i];if(h!==undefined){f.set(h.getLocalId().toString(),h)}}for(m=0;m<q;++m){h=mapChildren.get(d[j]);if(h!==undefined){l.push(h)}}}}}return l};c.prototype.preCommit=function(n){this._nameSpace._errManager.addContext({name:"preCommit","arguments":arguments});if(this._additionalObjects!==undefined){var h=0;var k;var d=this._additionalObjects.length;for(h=0;h<d;h++){k=this._additionalObjects[h];k.preCommit(n)}}var f=this.getViewData(n);if(f!==undefined){var m=f.getParents(c.prototype.stateMode.Tempo);if((!this.isRoot())&&((m===undefined)||(m!==undefined&&m.length==0))){var h=0;var e=f.getChildren(c.prototype.stateMode.Tempo);if(e!==undefined){var g=e.length;var l;for(h=0;h<g;h++){l=e[h];l.removeParent(n,this);l.preCommit(n)}}this.deleteViewData(n)}}this._nameSpace._errManager.cleanContext(arguments)};c.prototype.commit=function(e){this._nameSpace._errManager.addContext({name:"commit","arguments":arguments});if(this._additionalObjects!==undefined){var f=0;var d;var g=this._additionalObjects.length;for(f=0;f<g;f++){d=this._additionalObjects[f];d.commit(e)}}var h=this.getViewData(e);if(h!==undefined){h.commit()}this._nameSpace._errManager.cleanContext(arguments)};c.prototype.abort=function(d){this._nameSpace._errManager.addContext({name:"abort","arguments":arguments});if(this._additionalObjects!==undefined){var e=0;var f=this._additionalObjects.length;for(e=f-1;e>=0;e--){if(this._additionalObjects[e].isTemporary()){this._additionalObjects.splice(e,1)}else{this._additionalObjects[e].abort(d)}}}var g=this.getViewData(d);if(g!==undefined){g.abort()}if(this._dualObj!==undefined){this._dualObj.setDualObject(d.getViewType(),this)}this._nameSpace._errManager.cleanContext(arguments)};c.prototype.setDualObject=function(e,d){this._dualObj=d||undefined;this._dualViewType=e};c.prototype.getDualObject=function(d){var e=undefined;if(d===this._dualViewType||d===undefined){e=this._dualObj}return e};return c});define("DS/CSIViewModelWebImplement/CSIVMErrorManager",[],function(){function a(){this._activeState=false;this._debugContext=[]}a.prototype.setDebugMode=function(c){var b=this;b._activeState=(c==true)?c:false;if(b._activeState){window.onerror=function(h,e,d,g,f){if(b._activeState){console.error("Context",b._debugContext);console.error("StackTrace",f)}}}};a.prototype.addContext=function(b){if(!this._activeState){return}this._debugContext.push(b)};a.prototype.cleanContext=function(c){var b=this;if(!b._activeState||b._debugContext.length==0){return}function d(){for(var e in b._debugContext){if(c==b._debugContext[e].arguments){return e}}return -1}if((index=d())!=-1){b._debugContext.splice(index)}};return a});define("DS/CSIViewModelWebImplement/CSIVMStringMap",[],function(){function a(){this._data=new Map();this.clear()}a.prototype.clear=function(){this._data.clear()};a.prototype.createValue=function(d,e){if(d===undefined){return}var c=d.toString();var b=this._data.get(c);if(Array.isArray(b)){b.push(e)}else{this._data.set(c,[e])}};a.prototype.get=function(b){if(b!==undefined){return this._data.get(b.toString())}};a.prototype.remove=function(e,g){if(e!==undefined){var d=e.toString();var f=true;if(g!==undefined){var b=this._data.get(d);if(Array.isArray(b)){var c=b.indexOf(g);if(c>-1){b.splice(c,1)}if(b.length>0){f=false}}}if(f){this._data["delete"](d)}}};a.prototype.forEachValue=function(g,e){var d,b,f,c;if(e!==undefined){c=this._data.get(e.toString());if(Array.isArray(c)){for(b=c.length,d=0;d<b;++d){f=c[d];g(f)}}}else{this._data.forEach(function(h){if(Array.isArray(h)){for(b=h.length,d=0;d<b;++d){f=h[d];g(f)}}})}};a.prototype.findValue=function(f){var e,c;var b=this._data.values();var d=b.next();while(!d.done&&e===undefined){c=d.value;if(Array.isArray(c)){e=c.find(function(g){return f(g)})}d=b.next()}return e};return a});define("DS/CSIViewModelWebImplement/CSIVMClientNameSpace",["DS/CSIViewModelWebImplement/CSIVMClientObject","DS/CSIViewModelWebImplement/CSIVMStringMap"],function(c,a){function b(e,d){this.clear();this._uuid=e;this._model=d;this._errManager=d.getErrorManager();this._rootObj=undefined}b.prototype.delimiter="#";b.prototype.atomicDelimiter="/";b.prototype.clear=function(d){if(this._objects===undefined){this._objects=new a()}this._objects.clear();if(d===undefined){this._treeKeys={}}else{delete this._treeKeys[d.getViewType()];var e=d.getUUID();this._model.removeTreeKey(e)}};b.prototype.addTreeKey=function(d){if(d!==undefined){this._treeKeys[d.getViewType()]=d}};b.prototype.getTreeKey=function(d){return this._model.getTreeKey(d)};b.prototype.getAllTreeKeys=function(){var e=[];var d;for(d in this._treeKeys){e.push(this._treeKeys[d])}return e};b.prototype.getTreeKeyFromViewType=function(d){return this._treeKeys[d]};b.prototype.isNameSpaceOfTreeKey=function(d){return(d!==undefined&&this._treeKeys[d.getViewType()]===d)};b.prototype.setRootObject=function(d){this._rootObj=d};b.prototype.getRootObject=function(){return this._rootObj};b.prototype.getObjects=function(d,f){var e=[];this._objects.forEachValue(function(g){if(g.getIdPattern()==d){e.push(g)}},f);return e};b.prototype.getObjectsFromCtx=function(d,f){var e=[];this._objects.forEachValue(function(g){if(g.getIdPattern()._idContext==d){e.push(g)}},f);return e};b.prototype.createObject=function(d,g){var f=undefined;var e=this._model.isAnExistingIdPattern(d);if(e){f=new c(this,g,d);this._objects.createValue(g,f)}return f};b.prototype.getOrCreateObject=function(e,g){var f=undefined;var d=this.getObjects(e,g);if(!d.length){f=this.createObject(e,g)}else{f=d[0]}return f};b.prototype.removeObject=function(e){if(e!==undefined){var f=e.getLocalId();this._objects.remove(f,e);var d=e.getDualObject();if(d!==undefined){var g=d.getDualObject();if(g===e){d.setDualObject()}}}};b.prototype.commit=function(h){this._errManager.addContext({name:"commit","arguments":arguments});this._objects.forEachValue(function(k){k.preCommit(h)});var e=[];this._objects.forEachValue(function(k){if(k.isEmpty()){e.push(k)}else{k.commit(h)}});var g;for(var d=e.length,f=0;f<d;++f){g=e[f];this.removeObject(g)}this._errManager.cleanContext(arguments)};b.prototype.abort=function(d){this._errManager.addContext({name:"abort","arguments":arguments});this._objects.forEachValue(function(e){e.abort(d)});this._errManager.cleanContext(arguments)};b.prototype.buildGlobalId=function(l){this._errManager.addContext({name:"buildGlobalId","arguments":arguments});var r="";var n="";var m=l.length;var h=null;var d=null;var p=null;var f=false;var g=true;var q=true;for(var k=m-1;k>=0;k--){var e=l[k];var o=e.getIdPattern();h=o._idSpace;f=o._shared;p=o._idContext;n=p+this.delimiter+e.getLocalId();if(p&&h&&(p===d)){q=true}if(q){if(!g){n+=this.atomicDelimiter}g=false;n+=r;r=n}q=f;if(!q){d=h}}this._errManager.cleanContext(arguments);return r};b.prototype.decodeGlobalId=function(d){if(d.State===undefined){d.State=c.prototype.stateMode.Permanent}return this.decodeGlobalIdInternal(d)};b.prototype.decodeGlobalIdInternal=function(f){this._errManager.addContext({name:"decodeGlobalIdInternal","arguments":arguments});var x=f.Node;var C=f.Id;var n=f.State;var s=f.AuthorizePartialPath;var w=C.split(this.atomicDelimiter);var h=[];var E=null;var g=(x!=undefined)?x:this.getRootObject();h.push(g);for(var A=0;A<w.length&&h!==undefined;A++){var t=w[A];var v=undefined;var e=this.findNodesByIdentifier(t,n);var m=e.length;if(m==1){v=e[0]}else{if(m){for(var y=0;y<m&&v===undefined;y++){var d=e[y].getFirstParentsDefiningNameSpaceOfThis();var o=d.length;for(var z=0;z<o&&v===undefined;z++){if(h.indexOf(d[z])>=0){v=e[y]}}}}}if(v===undefined){h=undefined;break}var q=v.getAdditionalObjects();if(q!==undefined){var r=v;var B;var l;v=undefined;for(var z=-1;z<q.length&&v===undefined;z++){if(z===-1){B=r}else{B=q[z]}l=B.getAllParents(n);for(var y=0;y<l.length&&v===undefined;y++){if(l[y]===g){v=B}}}}var D=v;var u=[];while(v!==g){if(v===undefined){h=undefined;break}E=v.getAllParents(n);u.push(v);v=E[0];if(E.length>1){var p=E.indexOf(g);if(p===-1){console.warn("Impossible to create a full PathElement from the identifier.");if(s!==true){h=undefined}else{h.splice(0,1)}break}else{v=g}}}for(var z=u.length-1;z>=0&&h!==undefined;z--){h.push(u[z])}g=D}this._errManager.cleanContext(arguments);return h};b.prototype.decodeGlobalIdToViewObjects=function(m,h,d,e){this._errManager.addContext({name:"decodeGlobalIdToViewObjects","arguments":arguments});var k;var n=this.decodeGlobalId({Node:m,Id:d,State:e});var l=0;if(n!==undefined){k=[];var f=n.length;var g=null;for(l=0;(l<f)&&(k!=undefined);l++){g=n[l].getAssociatedViewElt(h);if(g==undefined){k=undefined}else{k.push(g)}}}this._errManager.cleanContext(arguments);return k};b.prototype.findNodesByIdentifier=function(h,g){var f=h.split(this.delimiter);var e=f[0];var d=f[1];return this.getObjectsFromCtx(e,d,g)};return b});define("DS/CSIViewModelWebImplement/CSIVMClientModel",["DS/CSIViewModelWebImplement/CSIVMClientNameSpace","DS/CSIViewModelWebInterfaces/CSIVMClientTreeKey","DS/CSIViewModelWebImplement/CSIVMErrorManager"],function(d,b,c){function e(g,f,h){this._idSpace=g;this._idContext=f;this._shared=h}function a(){this.clear()}a.prototype.clear=function(){this._idPatterns=[];this._nameSpaces=[];this._treeKeys={};this._errorManager={}};a.prototype.getOrCreateTreeKey=function(g,f){var h=this.getTreeKey(g);if(h==undefined){h=new b(g,f);this._treeKeys[g]=h}return h};a.prototype.getTreeKey=function(f){return this._treeKeys[f]};a.prototype.getTreeKeysFromViewType=function(g){var k=[];var h;var f=undefined;for(h in this._treeKeys){f=this._treeKeys[h];if(f.getViewType()==g){k.push(f)}}return k};a.prototype.removeTreeKey=function(f){var g=this.getTreeKey(f);if(g!==undefined){delete this._treeKeys[f]}};a.prototype.getIdPattern=function(g,f,m){var n=undefined;if(g!=undefined&&f!=undefined&&m!=undefined){var k=0;var l=this._idPatterns.length;var h=null;for(k=0;k<l&&n==undefined;k++){h=this._idPatterns[k];if(h._idSpace==g&&h._idContext==f&&h._shared==m){n=h}}}return n};a.prototype.isAnExistingIdPattern=function(g){var h=false;if(g!=undefined){var f=this._idPatterns.indexOf(g);if(f>-1){h=true}}return h};a.prototype.getOrCreateIdPattern=function(g,f,h){var k=undefined;if(g!=undefined&&f!=undefined&&h!=undefined){k=this.getIdPattern(g,f,h);if(k==undefined){k=new e(g,f,h);this._idPatterns.push(k)}}return k};a.prototype.getObject=function(g,k,m){var l=undefined;var f=this.getNameSpace(g);if(f!=undefined){var h=f.getObjects(k,m);if(h.length){l=h[0]}}return l};a.prototype.createObject=function(g,h,l){var k=undefined;var f=this.getNameSpace(g);if(f!=undefined){k=f.createObject(h,l)}return k};a.prototype.getOrCreateObject=function(g,h,l){var k=undefined;var f=this.getNameSpace(g);if(f!=undefined){k=f.getOrCreateObject(h,l)}return k};a.prototype.getDualObject=function(h,o,q){var k=undefined;var f=this.getTreeKeysFromViewType(h);var l=0;var g=f.length;for(l=0;l<g&&(k===undefined);l++){var m=f[l];var n=this.getNameSpace(m);if(n!==undefined){var p=n.getObjects(o,q);if(p!==undefined&&p.length===1){k=p[0]}}}return k};a.prototype.getNameSpace=function(g){var m=undefined;var h=0;var k=this._nameSpaces.length;var f=g.getNameSpaceId();for(h=0;h<k&&(m===undefined);h++){var l=this._nameSpaces[h];if(l.isNameSpaceOfTreeKey(g)){m=l}else{if(l._uuid==f){m=l;m.addTreeKey(g)}}}return m};a.prototype.createNameSpace=function(f){var g=new d(f,this);this._nameSpaces.push(g);return g};a.prototype.getOrCreateNameSpace=function(g){var h=undefined;h=this.getNameSpace(g);if(h==undefined){var f=g.getNameSpaceId();if(f.length>0){h=this.createNameSpace(g.getNameSpaceId());h.addTreeKey(g)}}return h};a.prototype.getErrorManager=function(){if(Object.keys(this._errorManager).length){return this._errorManager}this._errorManager=new c();return this._errorManager};return a});