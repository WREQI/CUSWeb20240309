/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(d){var a=d.Polymer,f=d.DS;var e=null,g=null,c=null,b=null;e=function(){};g=function(){var h={id:this.model.modelID,type:this.model.type,mdType:this.model.mdType,name:this.model.name};var i={modelSource:this.modelSource,model:h};return i};b=function(h){h.item=this};c=function(){this.viewMode="list";this._modelChangedFunction=e.bind(this);this._dragDataFunction=g.bind(this)};f.SMAProcADUI=f.SMAProcADUI||{};f.SMAProcADUI.ADAdditionalFileView=a({is:"ad-additional-file-view",ready:function(){return c.apply(this,arguments)},dragOverFunction:function(){},dropFunction:function(){return b.apply(this,arguments)},_computeTitle:function(h){var i="";if(h){if(h.name){i+=h.name}if(h.details&&h.details.version){i+=" (ver"+h.details.version+")"}}return i},_computeListSectionClass:function(i,k,j){var h="item-list-view item-viewmode-list item-viewstate-"+k;if(j){h+=" item-selected"}return h},behaviors:[f.SMAProcSP.SPBase,f.SMAProcADUI.ADMultiviewItem,f.SMAProcADUI.FormatUtilities]})}(this));