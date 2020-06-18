/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(i){var m=i.DS;var l=null,c=null,e=null,j=null,o=null,h=null,a=null,b=null,g=250,d="icon",n={created:"created",initializing:"initializing",ready:"ready",accessDisabled:"accessdisabled"},f={select:"select",drilldown:"drilldown",dragged:"itemsdragged"},k={isDragged:"js-dragged",isDraggedOver:"js-dragover",hideDetails:"js-hidedetails"};l=function(p){var q=function(){this._clickTimer=null;if((this.viewState===n.ready)||(this.viewState===n.accessDisabled)){this.fire(f.select,{item:this,ctrlKey:p.ctrlKey,shiftKey:p.shiftKey})}}.bind(this);if(this._clickTimer){i.clearTimeout(this._clickTimer);this._clickTimer=null;if(this.viewState===n.ready){this.fire(f.drilldown,{item:this})}}else{this._clickTimer=i.setTimeout(q,g)}p.preventDefault();p.stopPropagation();p.cancelBubble=true;return false};c=function(p){var q=null;if(this.viewState===n.ready){if(this.$.currentDragObject){if(this._dragDataFunction){q=this._dragDataFunction()}else{q={modelSource:this.modelSource,model:this.model}}this.$.currentDragObject.setValue(JSON.stringify(q))}this.DOM(this.$.main).addClass(k.isDragged);p.dataTransfer.effectAllowed="all";p.dataTransfer.setData("Text",this.model.name);if(q&&q.play3ddata){p.dataTransfer.setData("text",JSON.stringify(q.play3ddata))}}this.fire(f.dragged,{});return true};e=function(){if(this.viewState===n.ready){if(this.$.currentDragObject){this.async(this.$.currentDragObject.setValue.bind(this.$.currentDragObject,""),1)}this.DOM(this.$.main).removeClass(k.isDragged)}return true};j=function(p){var q;if(this.viewState===n.ready){if(this.$.currentDropTarget){if(this._dragDataFunction){q=this._dragDataFunction()}else{q={modelSource:this.modelSource,model:this.model}}this.$.currentDropTarget.setValue(JSON.stringify(q))}this.DOM(this.$.main).addClass(k.isDraggedOver);if(!this.dragOverFunction){p.dataTransfer.dropEffect="none";p.stopPropagation();p.returnValue=false}}};o=function(){if(this.viewState===n.ready){if(this.$.currentDropTarget){this.$.currentDropTarget.setValue("")}this.DOM(this.$.main).removeClass(k.isDraggedOver)}};h=function(p){var q;if(this.viewState===n.ready){if(this.$.currentDropTarget){if(this._dragDataFunction){q=this._dragDataFunction()}else{q={modelSource:this.modelSource,model:this.model}}this.$.currentDropTarget.setValue(JSON.stringify(q))}this.DOM(this.$.main).addClass(k.isDraggedOver);if(this.dragOverFunction){this.dragOverFunction(p)}else{p.dataTransfer.dropEffect="none";p.stopPropagation();p.returnValue=false}}};a=function(p){if(this.dropFunction){this.dropFunction(p);this.DOM(this.$.main).removeClass(k.isDraggedOver)}else{p.preventDefault();p.stopPropagation();p.cancelBubble=true}return false};b=function(){};m.SMAProcADUI=m.SMAProcADUI||{};m.SMAProcADUI.ADMultiviewItem={properties:{dragOverFunction:{type:Object,value:null,},dropFunction:{type:Object,value:null,},expandable:{type:Boolean,value:true},model:{type:Object,value:null,observer:"modelChanged"},modelSource:{type:String,value:""},selected:{type:Boolean,value:false},viewMode:{type:String,value:function(){return d},reflectToAttribute:true},viewState:{type:String,value:function(){return n.initializing},reflectToAttribute:true,observer:"viewStateChanged"},hideDetails:{type:Boolean,value:false}},onClick:function(){return l.apply(this,arguments)},onDragStart:function(){return c.apply(this,arguments)},onDragEnd:function(){return e.apply(this,arguments)},onDragEnter:function(){return j.apply(this,arguments)},onDragLeave:function(){return o.apply(this,arguments)},onDragOver:function(){return h.apply(this,arguments)},onDrop:function(){return a.apply(this,arguments)},onObservableChange:function(){return b.apply(this,arguments)},_computeItemClass:function(q,r){var p="ad-multiview-item item-viewmode-"+q;if(r){p+=" "+k.hideDetails}return p},_computeIconSectionClass:function(q,s,r){var p="item-icon-view item-viewmode-"+q+" item-viewstate-"+s;if(r){p+=" item-selected"}return p},_computeListSectionClass:function(q,s,r){var p="item-list-view item-viewmode-"+q+" item-viewstate-"+s;if(r){p+=" item-selected"}return p},modelChanged:function(p,q){if((typeof q!=="undefined")&&q&&q.unregisterObserver){q.unregisterObserver(this)}if((typeof p!=="undefined")&&p&&p.registerObserver){p.registerObserver(this)}if(this._modelChangedFunction){this._modelChangedFunction()}},viewStateChanged:function(){require(["DS/UIKIT/Spinner"],function(p){if(n.initializing===this.viewState){if(!this._iconSpinner){this._iconSpinner=new p({renderTo:this.$.iconViewSpinner,visible:true})}if(!this._listSpinner){this._listSpinner=new p({renderTo:this.$.listViewSpinner,visible:true})}}else{if(this._iconSpinner){this._iconSpinner.destroy();this._iconSpinner=null}if(this._listSpinner){this._listSpinner.destroy();this._listSpinner=null}}}.bind(this))},listeners:{click:"onClick",dragstart:"onDragStart",dragend:"onDragEnd",dragenter:"onDragEnter",dragleave:"onDragLeave",dragover:"onDragOver",drop:"onDrop"}};m.SMAProcADUI.ADMultiviewItem.VIEWSTATE=m.SMAProcADUI.ADMultiviewItem.VIEWSTATE||n;m.SMAProcADUI.ADMultiviewItem.EVENTS=m.SMAProcADUI.ADMultiviewItem.EVENTS||f;m.SMAProcADUI.ADMultiviewItem.ELEMENT=m.SMAProcADUI.ADMultiviewItem.ELEMENT||k}(this));