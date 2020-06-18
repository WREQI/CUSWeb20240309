var ldhFilterPath=function(a){return a};var ldhAsyncFilterPath=function(a){if(typeof window=="undefined"||!window.usesLDHAsync){return a}return undefined};var isLDHWorker=false;if(typeof window=="undefined"||this.workerContext!=undefined){isLDHWorker=true}if(isLDHWorker){var whiteList=["DS/SelectiveLoading/LDHJsModule","DS/SelectiveLoading/SelectiveLoadingImpl"];ldhFilterPath=function(a){if(whiteList.indexOf(a)!==-1){return a.substring(3)}else{return undefined}};ldhAsyncFilterPath=ldhFilterPath}define(ldhFilterPath("DS/SelectiveLoading/SelectiveLoadingImpl"),[ldhAsyncFilterPath("DS/SelectiveLoading/LDHJsModule"),ldhFilterPath("DS/CoreEvents/Events")],function(d,a,c){var b={LDHJsModule:d};b.error={sOk:0,eFail:-2147467259|0,sFalse:-4294967295|0,eOutOfMemory:-2147024882|0,eInvalidArg:-2147024809|0,eInvalidState:-2147418113|0,eNotImpl:-2147467263|0,eAlreadyLoading:-13|0};b.errorName=function(f){for(var e in this.error){if(this.error[e]===f){return e}}return""};b.Helpers=function(){};b.Helpers.prototype={};b.Helpers.prototype.constructor=b.Helpers;b.Helpers.prototype.version="0.0.1";b.Helpers.prototype.applyMatrix=function(g,e,f){f.copy(g).applyMatrix4(e)};b.Context=function(h){var e=-1;if(h!=undefined&&h.hashSize!=undefined){e=h.hashSize}if(d!=undefined){this.cppContext=new d.CppContext(new b.Helpers(),e)}var g=this.cppContext;if(h!=undefined&&h.asyncInterface!=undefined){g=h.asyncInterface;this.asyncInterface=g}var f=function(i){if(i.eventType=="ADD"){if(i.fromNode.ldhObjects!=undefined){var j=g.notifyLoad(i.fromNode.ldhObjects);if(j!==b.error.sOk){console.error("notifyLoad failed in autoLoad.")}}else{if(g._addNode!=undefined&&g.sg!=undefined){g._addNode(i.fromNode,i.toNode)}}}};if(typeof a!=="undefined"){this.subscribeToken=a.subscribe({event:"/VISU/onSceneGraphUpdate"},f)}};b.Context.prototype={};b.Context.prototype.constructor=b.Context;b.Context.prototype.version="0.0.1";b.Context.prototype.destructor=function(){if(this.subscribeToken!=undefined){a.unsubscribe(this.subscribeToken)}if(this.cppContext!=undefined){this.cppContext["delete"]();this.cppContext=undefined}};b.Context.prototype.registerObject=function(g,f,e){if(e!=undefined){if(e.elements==undefined||e.elements.length!=16){console.log("Error in Context::registerObject: matrix is invalid!");return b.error.eInvalidArg}if(!(e.elements instanceof Float32Array)){for(var h=0;h!=e.elements.length;h+=1){if(typeof e.elements[h]!="number"){console.log("Error in Context::registerObject: matrix is invalid!");return b.error.eInvalidArg}}}}var j=this.cppContext.registerObject(g,f,e);if(!isLDHWorker&&j==b.error.eAlreadyLoading){if(g.selectiveLoadingParent==undefined||g.selectiveLoadingNode==undefined){console.log("Error in Context::registerObject: object.selectiveLoadingParent or selectiveLoadingNode is invalid!");return b.error.eInvalidArg}g.selectiveLoadingParent.addChild(g.selectiveLoadingNode);return b.error.sOk}return j};b.Context.prototype.updateObject=function(g,f,e){if(e!=undefined){if(e.elements==undefined||e.elements.length!=16){console.log("Error in Context::updateObject: matrix is invalid!");return b.error.eInvalidArg}if(!(e.elements instanceof Float32Array)){for(var h=0;h!=e.elements.length;h+=1){if(typeof e.elements[h]!="number"){console.log("Error in Context::registerObject: matrix is invalid!");return b.error.eInvalidArg}}}}return this.cppContext.updateObject(g,f,e)};b.Context.prototype.unregisterObject=function(e){return this.cppContext.unregisterObject(e)};b.Context.prototype.unregisterAllObjects=function(){return this.cppContext.unregisterAllObjects()};b.Context.prototype.forceLoad=function(f,e){return this.cppContext.forceLoad(f,e)};b.Context.prototype.getLoadCandidates=function(e,f){return this.cppContext.getLoadCandidates(e,f)};b.Context.prototype.getUnloadCandidates=function(e,f){return this.cppContext.getUnloadCandidates(e,f)};b.Context.prototype.notifyLoad=function(e){return this.cppContext.notifyLoad(e)};b.Context.prototype.notifyUnload=function(e){return this.cppContext.notifyUnload(e)};b.Context.prototype.autoLoad=function(g,h,e,i){this._onEachFrame();var f=this.cppContext;var h=this.cppContext.autoLoad(g,h,{load:function(m){if(m.length==undefined){return}var l=new i();for(var k=0;k<m.length;k+=1){var j=m[k];j.selectiveLoadingParent.addChild(l);j.selectiveLoadingNode=l}l.ldhObjects=m;e.loadModel({filename:m[0].uri,proxyurl:"none"},l)}});return h};b.Context.prototype._autoUnloadHelper=function(h,e){var g=0;var f=this;if(h!=undefined){h.forEach(function(q){if(true){var o=q.object;if(o!=undefined){var j=o.length;if(o.length==undefined){j=1}for(var m=0;m<j;m+=1){var p;if(o.length!=undefined){p=o[m]}else{p=o}if(p.selectiveLoadingNode!=undefined){var k=p.selectiveLoadingNode.parents;while(k.length!=0&&k.length!=undefined){k[0].removeChild(p.selectiveLoadingNode)}++g;if(f.asyncInterface._LDHDebug){f.asyncInterface._debug._idLDHLoaded["delete"](p.ldhId)}p.selectiveLoadingNode=null;var n=e.notifyUnload([p]);if(n!==b.error.sOk){console.error("notifyUnload failed in autoUnload.")}}}}}})}return g};b.Context.prototype.autoUnload=function(e,g){var h=[e.viewer.canvas.offsetHeight,e.viewer.canvas.offsetWidth];if(0==h[0]||0==h[1]){return 0}var f=this.cppContext.getUnloadCandidates(e,g);var g=this._autoUnloadHelper(f,this.cppContext);return g};b.Context.prototype.toggleClippingPlanes=function(e){if(typeof e!=="boolean"){return b.error.eInvalidArg}var f=this.cppContext.toggleClippingPlanes(e);return f};b.Context.prototype.addClippingPlane=function(e){if(e==undefined||e.normal==undefined){return b.error.eInvalidArg}if(typeof e.normal.x!=="number"||typeof e.normal.y!=="number"||typeof e.normal.z!=="number"||typeof e.constant!=="number"){return b.error.eInvalidArg}var f=this.cppContext.addClippingPlane(e.normal.x,e.normal.y,e.normal.z,e.constant);return f};b.Context.prototype.removeClippingPlane=function(e){if(e==undefined||e.normal==undefined){return b.error.eInvalidArg}if(typeof e.normal.x!=="number"||typeof e.normal.y!=="number"||typeof e.normal.z!=="number"||typeof e.constant!=="number"){return b.error.eInvalidArg}var f=this.cppContext.removeClippingPlane(e.normal.x,e.normal.y,e.normal.z,e.constant);return f};b.Context.prototype.emptyClippingPlanes=function(){var e=this.cppContext.emptyClippingPlanes();return e};b.Context.prototype.modifyURL=function(f,g){var e=this.cppContext.modifyURL(f,g);return e};b.Context.prototype._onEachFrame=function(){};b.Context.prototype._checkViewpoint=function(f,e,h){var i=new h.Matrix4();i.multiplyMatrices(f.camera.projectionMatrix,f.camera.matrixWorldInverse);var g=new h.Frustum();g.setFromMatrix(i);return this.cppContext._check(g,f)};b.Context.prototype.registerObjectFromTypedArrays=function(e,g,f){return this.cppContext.registerObjectFromTypedArrays(e,g,f)};b.Context.prototype.updateObjectFromTypedArrays=function(f,e,h,g){return this.cppContext.updateObjectFromTypedArrays(f,e,h,g)};return b});