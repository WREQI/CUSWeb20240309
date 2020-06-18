define("DS/CSIViewModelWebProcessor/CSIVMClientTransactionOnIdent",["DS/CSIViewModelWebInterfaces/CSIVMClientTransaction","DS/CSIViewModelWebImplement/CSIVMClientObject","DS/CSIViewModelWebInterfaces/CSIVMClientOperation","DS/CSIViewModelWebInterfaces/CSIViewModelWebEnv","DS/CSIViewModelWebInterfaces/CSIVMClientTreeKey"],function(b,f,e,d,a){function c(){}c.prototype.setData=function(i,h,j,g){this._nameSpace=i.getOrCreateNameSpace(h);this._createdObjects={};this._reusedObjects={};this._treeKey=h;this._viewTransac=j;this._Processor=g;this._errManager=i.getErrorManager()};c.prototype.getTreatedObject=function(g){var h=this._createdObjects[g];if(h==undefined){h=this._reusedObjects[g]}return h};c.prototype.completeOperationWithObjects=function(u){this._errManager.addContext({name:"completeOperationWithObjects","arguments":arguments});var m=u.getType();if(u._IdOperatedObject!=undefined){var l=undefined;if(u._IdOperatedObject._ShortId!=undefined){l=this.getTreatedObject(u._IdOperatedObject._ShortId)}else{if(u._IdOperatedObject._GlobalId!=undefined){var v=this._nameSpace.decodeGlobalId({Node:null,Id:u._IdOperatedObject._GlobalId});if(m==e.prototype.OperationType.ApplyGP||m==e.prototype.OperationType.AddExistingCell){if(v==undefined||v.length==0){v=this._nameSpace.decodeGlobalIdInternal({Node:null,Id:u._IdOperatedObject._GlobalId,State:f.prototype.stateMode.TempoOrPermanent})}var x=v[v.length-1];if(x.isLeaf(this._treeKey)&&x.getIdPattern()._shared&&v.length>1){var h=v[v.length-2];if(h.getIdPattern()._idContext==x.getIdPattern()._idContext){l=h;u._SubElement=x.getAssociatedViewElt(this._treeKey)}else{l=x}}else{l=x}}else{if(v!=undefined&&v.length!=0){l=v[v.length-1]}}}}if(u._IdOperatedSubElements!==undefined){var A=0;var y=0;var p=u._IdOperatedSubElements.length;var q=l.getChildren(this._treeKey,f.prototype.stateMode.TempoOrPermanent);var n=q.length;for(A=0;A<p;A++){var w=u._IdOperatedSubElements[A];for(y=0;y<n;y++){var s=q[y];if(s.getLocalId()===w){u._OperatedSubElements.push(s.getAssociatedViewElt(this._treeKey))}}}u._IdOperatedSubElements=undefined}u._OperatedObject=l.getAssociatedViewElt(this._treeKey);u._IdOperatedObject=undefined}if(u._ShortIdOperand!=undefined){if(m==e.prototype.OperationType.AddExistingNode){var k=this.getTreatedObject(u._ShortIdOperand);k.getAssociatedViewElt(this._treeKey);u._OperandObject=k.getAssociatedViewElt(this._treeKey);u._ShortIdOperand=undefined}}if(u._GlobalIdOperand!=undefined){var k=undefined;var v=this._nameSpace.decodeGlobalId({Node:null,Id:u._GlobalIdOperand});if(m==e.prototype.OperationType.RemoveExistingCell||m==e.prototype.OperationType.AddExistingCell){if(v==undefined||v.length==0){v=this._nameSpace.decodeGlobalIdInternal({Node:null,Id:u._GlobalIdOperand,State:f.prototype.stateMode.TempoOrPermanent})}}if(v!=undefined&&v.length!=0){k=v[v.length-1]}u._OperandObject=k.getAssociatedViewElt(this._treeKey);u._GlobalIdOperand=undefined}if(u._IdPreviousObject!=undefined){var o=undefined;if(u._IdPreviousObject._ShortId!=undefined){o=this.getTreatedObject(u._IdPreviousObject._ShortId)}else{if(u._IdPreviousObject._GlobalId!=undefined){var v=this._nameSpace.decodeGlobalId({Node:null,Id:u._IdPreviousObject._GlobalId});if(v!=undefined&&v.length!=0){o=v[v.length-1]}}}u._PreviousObject=o.getAssociatedViewElt(this._treeKey);u._IdPreviousObject=undefined}if((u._GeometricalData!=undefined)&&(u._GeometricalData._initializers!=undefined)){var A=0;var r=[];for(A=0;A<u._GeometricalData._initializers.length;A++){var z=u._GeometricalData._initializers[A];if(z!=undefined){var k=undefined;var v=this._nameSpace.decodeGlobalId({Node:null,Id:z});if(v==undefined||v.length==0){v=this._nameSpace.decodeGlobalIdInternal({Node:null,Id:z,State:f.prototype.stateMode.TempoOrPermanent})}if(v!=undefined&&v.length!=0){k=v[v.length-1]}r.push(k.getAssociatedViewElt(this._treeKey))}}u._GeometricalData._initializers=r}if(u._Groups!=undefined){var A=0;for(A=0;A<u._Groups.length;A++){var t=u._Groups[A];var y=0;t._groupedElements=[];for(y=0;y<t._stringElements.length;y++){var g=t._stringElements[y];var v=this._nameSpace.decodeGlobalIdInternal({Node:null,Id:g,State:f.prototype.stateMode.Tempo});var B=v[v.length-1];(t._groupedElements).push(B.getAssociatedViewElt(this._treeKey))}}}this._errManager.cleanContext(arguments)};c.prototype.doOperation=function(h){this._errManager.addContext({name:"doOperation","arguments":arguments});if(d.isPerformanceTracesActivated()){d.startPerfo("CSIVMClientTransactionOnIdent.doOperation")}this.completeOperationWithObjects(h);var g=this._Processor.checkCompletedOperation(h);this._viewTransac.doOperation(g);this.internalDoOperation(g);if(d.isPerformanceTracesActivated()){d.endPerfo("CSIVMClientTransactionOnIdent.doOperation")}this._errManager.cleanContext(arguments)};c.prototype.executeEnd=function(){var g=undefined;if(this._viewTransac.executeEnd!=undefined){g=this._viewTransac.executeEnd()}return g};c.prototype.internalDoOperation=function(w){this._errManager.addContext({name:"internalDoOperation","arguments":arguments});if(d.isPerformanceTracesActivated()){d.startPerfo("CSIVMClientTransactionOnIdent.internalDoOperation")}var m=w.getType();if(m===e.prototype.OperationType.RemoveAll){this._nameSpace.clear(this._treeKey)}else{var h=undefined;if(w._IdNewObject!==undefined){var B=this._nameSpace.getObjects(w._IdNewObject._IdPattern,w._IdNewObject._LocalId);var p=B.length;var A;if(p){if(w._OperatedObject!==undefined){if(w._OperatedObject.getIdentificationObject().getIdPattern()._idContext!==w._IdNewObject._IdPattern._idContext&&w._OperatedObject.getIdentificationObject().getIdPattern()._idContext===w._IdNewObject._IdPattern._idSpace){A=w._OperatedObject.getIdentificationObject()}else{var x=w._OperatedObject.getIdentificationObject().getFirstParentsDefiningNameSpaceOfThis();if(x.length){A=x[0]}}}if(A){for(var G=0;G<p&&h===undefined;G++){if(B[G].getFirstParentsDefiningNameSpaceOfThis().indexOf(A)>=0){h=B[G]}}}else{if(p>1){throw"Several objects with same ID without any Parent defining a NameSpace to allow such a situation"}h=B[0]}}if(h!==undefined){if(h.getViewData(this._treeKey)){throw"we try to create a view of an object which already has a representation in this view"}this._reusedObjects[w._IdNewObject._ShortId]=h}else{h=this._nameSpace.createObject(w._IdNewObject._IdPattern,w._IdNewObject._LocalId);this._createdObjects[w._IdNewObject._ShortId]=h;if(w._IdNewObject._LocalIdDual){var o=this._Processor.getModel();if(o!==undefined){var H=this._treeKey.getViewType();var u=[];if(H===a.prototype.ViewType.ViewSpecTree||H===a.prototype.ViewType.ViewSpecTree2){u.push(a.prototype.ViewType.View3D)}else{if(H===a.prototype.ViewType.View3D){u.push(a.prototype.ViewType.ViewSpecTree,a.prototype.ViewType.ViewSpecTree2)}}for(var D=0;D<u.length;++D){var l=u[D];var n=h.getDualObject(l);if(n&&n.getLocalId()!==w._IdNewObject._LocalIdDual){break}else{n=o.getDualObject(l,w._IdNewObject._IdPattern,w._IdNewObject._LocalIdDual);if(n!==undefined){h.setDualObject(l,n);n.setDualObject(H,h);break}}}}}}w._CreatedObject.setIdentificationObject(h);h.associateViewElt(this._treeKey,w._CreatedObject);if(m===e.prototype.OperationType.CreateRoot||m===e.prototype.OperationType.CreateSemanticRoot){h.setRoot()}}if(m===e.prototype.OperationType.AddNode||m===e.prototype.OperationType.AddBody||m===e.prototype.OperationType.AddCustomNode||m===e.prototype.OperationType.AddSemanticNode){var v=w._OperatedObject.getIdentificationObject();v.addChild(this._treeKey,h);if((w._GeometricalData!==undefined)&&(w._GeometricalData._initializers!==undefined)){var G=0;for(G=0;G<w._GeometricalData._initializers.length;G++){var F=w._GeometricalData._initializers[G];var r=F.getIdentificationObject();var E=0;var s=r.getChildren(this._treeKey,r.stateMode.Tempo);if(s!==undefined){h.addChildren(this._treeKey,s)}}}}else{if(m===e.prototype.OperationType.AddCells){var p=w._CreatedObjectsWithID.length;var C=0;var G=0;var E=0;var v=w._OperatedObject.getIdentificationObject();var h=null;var z=null;var I=[];var g=false;if(w._MultipleViewElts!==undefined){C=w._MultipleViewElts.length}for(G=0;G<p;G++){h=undefined;z=w._CreatedObjectsWithID[G];g=false;for(E=0;E<C&&!g;E++){if(w._MultipleViewElts[E]===z.ident){g=true}}if(g){var B=this._nameSpace.getObjects(w._IdPattern,z.ident);var q=B.length;if(q){var y=v.getFirstParentsDefiningNameSpaceOfThis();var A;if(y.length){A=y[0]}if(!A){if(q>1){throw"Several cells with same ID without any Parent defining a NameSpace to allow such a situation"}h=B[0]}else{for(var D=0;D<q&&h===undefined;D++){if(B[D].getFirstParentsDefiningNameSpaceOfThis().indexOf(A)>=0){h=B[D]}}}}if(h!==undefined){h=h.addObject()}}if(h===undefined){h=this._nameSpace.createObject(w._IdPattern,z.ident);this._createdObjects["cell"+z.ident]=h}z.object.setIdentificationObject(h);h.associateViewElt(this._treeKey,z.object);I.push(h)}v.addChildren(this._treeKey,I)}else{if(m===e.prototype.OperationType.AddExistingNode||m===e.prototype.OperationType.AddExistingCell){var v=w._OperatedObject.getIdentificationObject();var t=w._OperandObject.getIdentificationObject();v.addChild(this._treeKey,t)}else{if(m===e.prototype.OperationType.RemoveExistingNode||m===e.prototype.OperationType.RemoveExistingCell){var v=w._OperatedObject.getIdentificationObject();var t=w._OperandObject.getIdentificationObject();v.removeChild(this._treeKey,t)}}}}}if(d.isPerformanceTracesActivated()){d.endPerfo("CSIVMClientTransactionOnIdent.internalDoOperation")}this._errManager.cleanContext(arguments)};c.prototype.commit=function(){this._errManager.addContext({name:"commit","arguments":arguments});var g=undefined;this._viewTransac.commit();g=this._nameSpace.commit(this._treeKey);this._errManager.cleanContext(arguments);return g};c.prototype.abort=function(){this._errManager.addContext({name:"abort","arguments":arguments});var j=undefined;var h=0;var g=0;for(h in this._createdObjects){this._nameSpace.removeObject(this._createdObjects[h])}j=this._nameSpace.abort(this._treeKey);this._viewTransac.abort();this._errManager.cleanContext(arguments);return j};return c});