define("DS/WAfrTweakers/TweakerUtilities",["UWA/Core","DS/Controls/TooltipModel","DS/WebappsUtils/WebappsUtils","DS/WAfrUIStandardComponents/mod_UIComponent","DS/WebUAUtils/WebUAUtils","DS/Utilities/Dom"],function(g,b,f,e,d,a){var c={computeIconPath:function(h){var j,o;var m=h.value;var l=/(?:\.([^.]+))?$/;var k=l.exec(m)[1];if(k===undefined){m+=".png"}var o=f.getWebappsBaseUrl();var i="";var n=m.split("/");if(n.length>0){i=n[0];n.shift();o+=i+"/assets/icons/"+n.join("/")}else{console.error("Impossible to retrieve icon uri information")}return o},applyResources:function(i){var k=i.elem;var h=i.view;if(k===undefined||h===undefined){return}if(k.getI18n!==undefined&&k.getI18n()!==undefined){if(i.title){c.applyTitle({elem:k,view:h})}if(i.tooltipInfos){var j={elem:k,view:h};if(i&&i.tooltipOptionsPosition){j.tooltipOptionsPosition=i.tooltipOptionsPosition}c.applyTooltipInfos(j)}}if(i.icon){c.applyIcon({elem:k,view:h})}},applyTitle:function(i){var j=i.elem;var h=i.view;if(j===undefined||h===undefined){return}if(i.view.displayStyle==="flyout"){h.label=j.getI18n().title}else{h.label=a.createEllipsisText({label:j.getI18n().title,nbLinesVisible:2,maxWidth:"67px",lineHeight:14,allowUnsafeHTMLLabel:false});if(!h.elements.text){h.elements.text=g.createElement("span");h.elements.text.inject(h.getContent())}h.elements.text.setContent(h.label)}},applyTooltipInfos:function(i){var l=i.elem;var h=i.view;if(l===undefined||h===undefined){return}if(h.tooltipInfos!==undefined){c.applyNewTooltipInfos({elem:l,view:h.tooltipInfos})}else{var m=l.getId();var j=JSON.parse(JSON.stringify(l.getI18n()));var n={helpid:m,content:{}};n.content[m+".WebHelp"]=j.webHelp;n.content[m+".PanelHelp"]=j.panelHelp;delete j.webHelp;delete j.panelHelp;j.mouseRelativePosition=false;j.position="top";if(i&&i.tooltipOptionsPosition){j.position=i.tooltipOptionsPosition}h.tooltipInfos=new b(j);var k=d.getMoreHelpCallback(n);if(k){h.tooltipInfos.moreHelpCB=k}}},applyIcon:function(i){var j=i.elem;var h=i.view;if(j!==undefined&&h!==undefined&&j.getIcon!==undefined&&j.getIcon()!==undefined){h.icon=c.computeIconPath({value:j.getIcon().uri,elem:j})}},applyNewTooltipInfos:function(i){var j=i.elem;var h=i.view;if(j.getI18n!==undefined&&j.getI18n()!==undefined&&h!==undefined){this.replaceTooltipInfos({elem:j,source:j.getI18n(),target:h})}},replaceTooltipInfos:function(h){var j=h.source;var k=h.target;if(j!==undefined&&k!==undefined){(j.title!==undefined)?k.title=j.title:null;(j.shortHelp!==undefined)?k.shortHelp=j.shortHelp:null;(j.longHelp!==undefined)?k.longHelp=j.longHelp:null;(j.shortHelpImage!==undefined)?k.shortHelpImage=j.shortHelpImage:null;(j.longHelpImage!==undefined)?k.longHelpImage=j.longHelpImage:null;(j.shortHelpImageDimension!==undefined)?k.shortHelpImageDimension=j.shortHelpImageDimension:null;(j.longHelpImageDimension!==undefined)?k.longHelpImageDimension=j.longHelpImageDimension:null;if(h.elem&&(j.panelHelp||j.webHelp)){var l=h.elem.getId();var i=JSON.parse(JSON.stringify(h.elem.getI18n()));var m={helpid:l,content:{}};m.content[l+".WebHelp"]=i.webHelp;m.content[l+".PanelHelp"]=i.panelHelp;k.moreHelpCB=d.getMoreHelpCallback(m)}else{if(k.moreHelpCB){k.moreHelpCB=undefined}}}}};return c});define("DS/WAfrTweakers/TweakerHandlerSimple",["UWA/Core","DS/Tweakers/TweakerBase","DS/Controls/Button","DS/Controls/TooltipModel","DS/WAfrTweakers/TweakerUtilities","DS/WAfrDebug/mod_Performances"],function(e,j,g,i,f,d){var k=d.Performances,c="[DS/WAfrTweakers/TweakerHandlerSimple]",h=new k();var a=h.start([c,"[Sync] TweakerBase.inherit"].join(" "));var b=j.inherit({name:"tweakerHandlerSimple",publishedProperties:{displayStyle:{defaultValue:"",type:"string"},showLabelFlag:{defaultValue:false,type:"boolean"}},init:function(m){var l=h.start([c,"[Unknown] init"].join(" "));this._parent(m);h.stop(l)},_build:function(){this._parent();if(this.elements.container!==undefined){this.elements.container.addClassName("wafr-tweakers-simple");this.elements.container.addClassName("wafr-tweakers")}},_applyDisplayStyle:function(l){if(this.elements.container!==undefined){switch(this.displayStyle){case"flyout":this.elements.internalView=new g({});break;default:this.elements.internalView=new g({displayStyle:"icon",showLabelFlag:false})}this.elements.internalView.inject(this.elements.container)}this._applyValue();this._applyReadOnly();this._applyTouchMode()},_applyValue:function(){var l=this;if(l.value!==undefined){f.applyResources({elem:l.value,view:l.elements.internalView,title:l.showLabelFlag,tooltipInfos:true,icon:true});l._applyTouchMode();l._registerForCommandLifeCycle({handler:l.value});l._registerForAvailabilityModes()}},_applyTouchMode:function(){var l=this;if(l.displayStyle===""&&l.elements!==undefined&&l.elements.internalView!==undefined&&l.value!==undefined){if(l.touchMode===true){l.elements.internalView.touchMode=true;f.applyResources({elem:l.value,view:l.elements.internalView,title:l.showLabelFlag,tooltipInfos:false,icon:false})}else{l.elements.internalView.touchMode=false}}l._parent()},_applyShowLabelFlag:function(){var l=this;if(l.displayStyle===""&&l.elements!==undefined&&l.elements.internalView!==undefined&&l.value!==undefined){if(l.showLabelFlag===true){l.elements.internalView.showLabelFlag=true;l.elements.container.setAttributeNode(document.createAttribute("showlabel"));f.applyResources({elem:l.value,view:l.elements.internalView,title:l.showLabelFlag,tooltipInfos:false,icon:false})}else{l.elements.internalView.showLabelFlag=false;l.elements.container.removeAttribute("showlabel")}}l._parent()},handleEvents:function(){var m=this;var l=this.elements.internalView;l.addEventListener("buttonclick",function(n){if(m.value!==undefined&&m.value.execute!==undefined){m.value.execute()}})},_registerForCommandLifeCycle:function(m){var o=this;var n=m.handler;if(n!==undefined){var l=o.elements.internalView;if(o._subscriptionBEGIN===undefined&&l!==undefined){o._subscriptionBEGIN=n.onLifeCycleEvent("BEGIN",function(){l.checkFlag=true;if(n.container!==undefined&&n.container.elements!==undefined){n.container.elements.presenterButton.checkFlag=true}})}if(o._subscriptionEND===undefined&&l!==undefined){o._subscriptionEND=n.onLifeCycleEvent("END",function(){l.checkFlag=false;if(n.container!==undefined&&n.container.elements!==undefined&&l===n.container.currentValue.view){n.container.elements.presenterButton.checkFlag=false}})}}},_registerForAvailabilityModes:function(){var n=this.value;var l=this.elements.internalView;if(n&&l){if(!this._subscriptionAVAILABILITY){if(!n.isAvailable()){l.disabled=true}this._subscriptionAVAILABILITY=n.onAvailabilityEvent(function m(o){l.disabled=!o.newValue})}}}});h.stop(a);return b});define("DS/WAfrTweakers/TweakerHandlerRadio",["UWA/Core","DS/Tweakers/TweakerBase","DS/Controls/Button","DS/Controls/TooltipModel","DS/WAfrTweakers/TweakerUtilities","DS/WAfrControls/WAfrFlyout","DS/WAfrDebug/mod_Performances"],function(f,k,h,j,g,d,c){var l=c.Performances,b="[DS/WAfrTweakers/TweakerHandlerRadio]",i=new l();var a=i.start([b,"[Sync] TweakerBase.inherit"].join(" "));var e=k.inherit({name:"tweakerHandlerRadio",btnItems:undefined,publishedProperties:{displayStyle:{defaultValue:"",type:"string"},showLabelFlag:{defaultValue:false,type:"boolean"}},init:function(n){var m=i.start([b,"[Unknown] init"].join(" "));this._parent(n);i.stop(m)},_build:function(){this._parent();this.btnItems=this.btnItems||[];if(this.elements.container!==undefined){this.elements.container.addClassName("wafr-tweakers-radio");this.elements.container.addClassName("wafr-tweakers")}},_applyDisplayStyle:function(m){if(this.elements.container!==undefined){switch(this.displayStyle){case"flyout":this.elements.internalView=new d({selfManagedPresenter:false,touchMode:this.touchMode});break;default:this.elements.internalView=f.Element("div")}if(this.elements.internalView!==undefined){this.elements.internalView.inject(this.elements.container)}}this._applyValue();this._applyReadOnly();this._applyTouchMode()},_applyValue:function(){var p=this;if(p.value!==undefined){if(p.elements.internalView!==undefined){var m=p.value.items;var q=[];if((p.displayStyle===""&&p.elements.internalView.getChildren!==undefined&&p.elements.internalView.getChildren().length===0)||(p.displayStyle==="flyout"&&p.elements.internalView.getElementsList!==undefined&&p.elements.internalView.getElementsList().length===0)){m.forEach(function(s){var r;if(p.displayStyle==="flyout"){r=new h({displayStyle:"flyout",type:"check",showLabelFlag:true});r.getContent().style.width="100%";r.getContent().style.textAlign="left";r.getContent().style.display="block"}else{r=new h({displayStyle:"icon",type:"check",showLabelFlag:false})}p._applyResources({handler:s,internalView:r,displayStyle:p.displayStyle});p.btnItems.push({model:s,view:r});if(p.displayStyle==="flyout"){q.push({identifier:s.getId(),view:r,presenterLink:{type:"type",icon:"icon",tooltipInfos:"tooltipInfos",checkFlag:"checkFlag",title:"label"}})}else{r.inject(p.elements.internalView)}});if(p.displayStyle==="flyout"){p.elements.internalView.addElements({elementsList:q});var n=p._retrieveViewFromElem({elem:p.value.getSelectedItem()});if(n!==undefined){var o=p.elements.internalView.getElement({identifier:p.value.getSelectedItemId()});o.view=n;p.elements.internalView.currentValue=o}}}p._applyTouchMode();p._applyReadOnly();p._registerForAvailabilityModes()}if(!p.enterInHandleEvent){p._internalHandleEvents()}}p._registerForRadioStateChange({})},_applyResources:function(n){var q=this;var p=n.handler;var m=n.internalView;if(p!==undefined&&p.getState!==undefined){if(m.checkFlag!==p.getState()){m.checkFlag=p.getState()}var o;if(p.getState()===false){o=p.onUncheckHandler}else{if(p.getState()===true){o=p.onCheckHandler}}g.applyResources({elem:o,view:m,title:true,tooltipInfos:true,tooltipOptionsPosition:"right",icon:true})}},_applyTouchMode:function(){this._parent();var n=this;var m=n.elements.internalView;if(m!==undefined&&m.getChildren!==undefined&&m.getChildren().length!==0){n.btnItems.forEach(function(p){if(n.touchMode===true){var o;if(p.model.getState()===true){o=p.model.onCheckHandler}else{if(p.model.getState()===false){o=p.model.onUncheckHandler}}p.view.touchMode=true;g.applyResources({elem:o,view:p.view,title:n.showLabelFlag,tooltipInfos:false,icon:false})}else{p.view.touchMode=false}})}else{if(m!==undefined&&n.displayStyle==="flyout"){m.touchMode=n.touchMode}}},_applyShowLabelFlag:function(){this._parent();var n=this;var m=n.elements.internalView;if(m!==undefined&&m.getChildren!==undefined&&m.getChildren().length!==0){n.btnItems.forEach(function(p){if(n.showLabelFlag===true){var o;if(p.model.getState()===true){o=p.model.onCheckHandler}else{if(p.model.getState()===false){o=p.model.onUncheckHandler}}p.view.showLabelFlag=true;g.applyResources({elem:o,view:p.view,title:n.showLabelFlag,tooltipInfos:false,icon:false})}else{p.view.showLabelFlag=false}})}else{if(m!==undefined&&n.displayStyle==="flyout"){if(n.showLabelFlag){m.showLabelFlag=true;n.elements.container.setAttributeNode(document.createAttribute("showlabel"))}else{m.showLabelFlag=false;n.elements.container.removeAttribute("showlabel")}}}},_internalHandleEvents:function(){var n=this;var m=this.elements.internalView;if(m!==undefined){if((m.getChildren!==undefined&&m.getChildren().length!==0)||(n.displayStyle==="flyout"&&m.getElementsList&&m.getElementsList().length!==0)){n.btnItems.forEach(function(o){o.view.addEventListener("buttonclick",function(p){n._executeItem({button:p.dsModel})})});if(n.displayStyle==="flyout"){m.addEventListener("presenterClick",function(o){n._executePresenterItem()})}}n.enterInHandleEvent=true}},_registerForRadioStateChange:function(o){var p=this;var q=p.value;if(q!==undefined){var m=p.elements.internalView;if(p._subscriptionSELECT===undefined&&p._subscriptionUNSELECT===undefined&&m!==undefined){p._subscriptionSELECT=[];p._subscriptionUNSELECT=[];var n=q.items;n.forEach(function(r){p._subscriptionSELECT.push(q.onItemStateEvent("SELECT",r.getId(),function(){var s=p._applyItemStateEvent({elem:r,value:true});if(p.displayStyle==="flyout"){p._updateRadioPresenter({elem:r,newValue:s})}}));p._subscriptionUNSELECT.push(q.onItemStateEvent("UNSELECT",r.getId(),function(){var s=p._applyItemStateEvent({elem:r,value:false});if(p.displayStyle==="flyout"){p._updateRadioPresenter({elem:r,newValue:s})}}))})}}},_applyItemStateEvent:function(n){var q=this;var p=n.elem;var r=n.value;var m=q._retrieveViewFromElem({elem:p});m.checkFlag=r;var o;if(r===false){o=p.onUncheckHandler}else{if(r===true){o=p.onCheckHandler}}g.applyResources({elem:o,view:m,title:true,tooltipInfos:true,icon:true});return m},_executeItem:function(o){var t=this;var n=t.btnItems;var s=t.value;var p=o.button;var r=o.elem;if(n===undefined){return}if(p!==undefined){r=t._retrieveElemFromView({view:p})}else{if(r!==undefined){p=t._retrieveViewFromElem({elem:r})}}if(r!==undefined){if(s!==undefined&&s.getRadioItemState!==undefined&&r!==undefined&&r.getId!==undefined&&p.checkFlag!==s.getRadioItemState(r.getId())){var q;var m;if(s.getRadioItemState(r.getId())===false){q=r.onCheckHandler;m=t._applyCheckStateOnElem({id:r.getId(),state:true})}else{if(s.getRadioItemState(r.getId())===true){q=r.onUncheckHandler;m=t._applyCheckStateOnElem({id:r.getId(),state:false,view:p})}}if(q&&m===false){g.applyResources({elem:r,view:p,title:true,tooltipInfos:true,icon:true});t._updateRadioPresenter({elem:r,newValue:p})}}}},_executePresenterItem:function(){var s=this;var r=s.value;var q=s.elements.internalView.currentValue.view;if(q===undefined){return}if(r===undefined){return}var p=r.getSelectedItem();if(p===undefined){return}if(p!==null&&r.getRadioItemState!==undefined&&p.getId!==undefined&&q.checkFlag!==r.getRadioItemState(p.getId())){var o;var m;if(r.getRadioItemState(p.getId())===false){o=p.onCheckHandler;m=s._applyCheckStateOnElem({id:p.getId(),state:true})}else{if(r.getRadioItemState(p.getId())===true){o=p.onUncheckHandler;m=s._applyCheckStateOnElem({id:p.getId(),state:false,view:q});if(m===true&&s.displayStyle==="flyout"){s.elements.internalView.elements.presenterButton.checkFlag=q.checkFlag}}}if(o&&m===false){g.applyResources({elem:p,view:q,title:true,tooltipInfos:true,icon:true});s._updateRadioPresenter({elem:p,newValue:q})}}else{if(p===null){var n=s._retrieveElemFromView({view:q});var t=s._applyCheckStateOnElem({id:n.getId(),state:true})}}},_retrieveElemFromView:function(o){var q=this;var n=q.btnItems;var m=o.view;var p;n.forEach(function(r){if(r.view===m){p=r.model}});return p},_retrieveViewFromElem:function(n){var q=this;var p=n.elem;var m=q.btnItems;var o;m.forEach(function(r){if(r.model===p){o=r.view}});return o},_applyCheckStateOnElem:function(o){var p=this;var t=o.id;var r=o.state;var m=o.view;var n=false;if(r===false){var q=p.value.isUnselectAuthorized();var s=p.value.getSelectedItemId();if(q===false&&s===t){if(m!==undefined){m.checkFlag=true}n=true}else{if(s===t){p._updateRadioPresenter({elem:p.value.getSelectedItem(),newValue:m})}}}if(!n){p.value.setRadioItemState({radioHdlrItemId:t,state:r})}return n},_updateRadioPresenter:function(m){var p=this;var q=m.newValue;var o=m.elem;if(p.displayStyle==="flyout"&&p.elements.internalView!==undefined){var n=p.elements.internalView.getElement({identifier:o.getId()});n.view=q;p.elements.internalView.currentValue=n}},_applyReadOnly:function(n){var o=this;var m=o.elements.internalView;if(m!==undefined){if(m.getChildren!==undefined&&m.getChildren().length!==0){o.btnItems.forEach(function(p){p.view.disabled=o.readOnly})}else{if(o.displayStyle==="flyout"){o.elements.internalView.disabled=o.readOnly}}}},_registerForAvailabilityModes:function(){var o=this.value;var m=this.elements.internalView;var p=this;if(o&&m){if(!this._subscriptionAVAILABILITY){if(!o.isAvailable()){p.readOnly=true}this._subscriptionAVAILABILITY=o.onAvailabilityEvent(function n(q){p.readOnly=!q.newValue})}}}});i.stop(a);return e});define("DS/WAfrTweakers/TweakerHandlerCommand",["UWA/Core","DS/Tweakers/TweakerBase","DS/Controls/Button","DS/Controls/TooltipModel","DS/WebappsUtils/WebappsUtils","DS/WAfrTweakers/TweakerUtilities","DS/WAfrDebug/mod_Performances"],function(e,k,g,j,c,f,d){var l=d.Performances,b="[DS/WAfrTweakers/TweakerHandlerCommand]",i=new l();var a=i.start([b,"[Sync] TweakerBase.inherit"].join(" "));var h=k.inherit({name:"tweakerHandlerCommand",publishedProperties:{displayStyle:{defaultValue:"",type:"string"},showLabelFlag:{defaultValue:false,type:"boolean"}},init:function(n){var m=i.start([b,"[Unknown] init"].join(" "));this._parent(n);i.stop(m)},_build:function(){this._parent();if(this.elements.container!==undefined){this.elements.container.addClassName("wafr-tweakers-command");this.elements.container.addClassName("wafr-tweakers")}},_applyDisplayStyle:function(m){if(this.elements.container!==undefined){switch(this.displayStyle){case"flyout":this.elements.internalView=new g({type:"check"});break;default:this.elements.internalView=new g({type:"check",displayStyle:"icon",showLabelFlag:false})}if(this._initilizationState===undefined){if(this.value.getState()==="EXECUTING"){this.elements.internalView.checkFlag=true}this._initilizationState=true}this.elements.internalView.inject(this.elements.container)}this._applyValue();this._applyReadOnly();this._applyTouchMode()},_applyValue:function(){var n=this;this._parent();if(n.value!==undefined){var m=Boolean(n.displayStyle===""||n.displayStyle==="flyout");f.applyResources({elem:n.value,view:n.elements.internalView,title:n.showLabelFlag,tooltipInfos:true,icon:m});n._applyTouchMode()}n._registerForCommandLifeCycle({handler:n.value});n._registerForAvailabilityModes()},_applyTouchMode:function(){var m=this;if(m.displayStyle===""&&m.elements!==undefined&&m.elements.internalView!==undefined&&m.value!==undefined){if(m.touchMode===true){m.elements.internalView.touchMode=true;f.applyResources({elem:m.value,view:m.elements.internalView,title:m.showLabelFlag,tooltipInfos:false,icon:false})}else{m.elements.internalView.touchMode=false}}m._parent()},_applyShowLabelFlag:function(){var m=this;if(m.displayStyle===""&&m.elements!==undefined&&m.elements.internalView!==undefined&&m.value!==undefined){if(m.showLabelFlag===true){m.elements.internalView.showLabelFlag=true;m.elements.container.setAttributeNode(document.createAttribute("showlabel"));f.applyResources({elem:m.value,view:m.elements.internalView,title:m.showLabelFlag,tooltipInfos:false,icon:false})}else{m.elements.internalView.showLabelFlag=false;m.elements.container.removeAttribute("showlabel")}}m._parent()},handleEvents:function(){var n=this;var m=this.elements.internalView;m.addEventListener("buttonclick",function(o){if(n.value!==undefined&&n.value.execute!==undefined){n.value.execute()}})},_registerForCommandLifeCycle:function(n){var p=this;var o=n.handler;if(o!==undefined){var m=p.elements.internalView;if(p._subscriptionBEGIN===undefined&&m!==undefined){p._subscriptionBEGIN=o.onLifeCycleEvent("BEGIN",function(q){m.checkFlag=true;if(o.container!==undefined&&o.container.elements!==undefined){o.container.elements.presenterButton.checkFlag=true}})}if(p._subscriptionPAUSE===undefined&&m!==undefined){p._subscriptionPAUSE=o.onLifeCycleEvent("PAUSE",function(q){m.disabled=true;if(o.container!==undefined&&o.container.elements!==undefined){o.container.elements.presenterButton.disabled=true}})}if(p._subscriptionRESUME===undefined&&m!==undefined){p._subscriptionRESUME=o.onLifeCycleEvent("RESUME",function(q){m.disabled=false;if(o.container!==undefined&&o.container.elements!==undefined){o.container.elements.presenterButton.disabled=false}})}if(p._subscriptionCANCEL===undefined&&m!==undefined){p._subscriptionCANCEL=o.onLifeCycleEvent("CANCEL",function(q){m.checkFlag=false;if(o.container!==undefined&&o.container.elements!==undefined){o.container.elements.presenterButton.checkFlag=false}})}if(p._subscriptionEND===undefined&&m!==undefined){p._subscriptionEND=o.onLifeCycleEvent("END",function(q){if(q!==undefined&&q.repeated!==true){m.checkFlag=false;if(o.container!==undefined&&o.container.elements!==undefined&&m===o.container.currentValue.view){o.container.elements.presenterButton.checkFlag=false}}})}}},_registerForAvailabilityModes:function(){var o=this.value;var m=this.elements.internalView;if(o&&m){if(!this._subscriptionAVAILABILITY){if(!o.isAvailable()){m.disabled=true}this._subscriptionAVAILABILITY=o.onAvailabilityEvent(function n(p){m.disabled=!p.newValue})}}}});i.stop(a);return h});define("DS/WAfrTweakers/TweakerHandlerCheck",["UWA/Core","DS/Tweakers/TweakerBase","DS/Controls/Button","DS/Controls/Toggle","DS/Controls/TooltipModel","DS/WebappsUtils/WebappsUtils","DS/WAfrTweakers/TweakerUtilities","DS/WAfrDebug/mod_Performances"],function(f,l,h,j,k,c,g,d){var m=d.Performances,b="[DS/WAfrTweakers/TweakerHandlerCheck]",i=new m();var a=i.start([b,"[Sync] TweakerBase.inherit"].join(" "));var e=l.inherit({name:"tweakerHandlerCheck",publishedProperties:{displayStyle:{defaultValue:"",type:"string"},showLabelFlag:{defaultValue:false,type:"boolean"}},init:function(o){var n=i.start([b,"[Unknown] init"].join(" "));this._parent(o);i.stop(n)},_build:function(){this._parent();if(this.elements.container!==undefined){this.elements.container.addClassName("wafr-tweakers-check");this.elements.container.addClassName("wafr-tweakers")}},_applyDisplayStyle:function(n){if(this.elements.container!==undefined){switch(this.displayStyle){case"Toolbar":this.elements.internalView=new h({type:"check",displayStyle:"icon",showLabelFlag:false});break;case"flyout":this.elements.internalView=new h({type:"check"});break;case"std":this.elements.internalView=new j();break;default:this.elements.internalView=new j()}this.elements.internalView.inject(this.elements.container)}this._applyValue();this._applyReadOnly();this._applyTouchMode()},_applyValue:function(){var q=this;if(q.value!==undefined&&q.value.getState!==undefined&&q.elements.internalView){if(q.elements.internalView.checkFlag!==q.value.getState()){q.elements.internalView.checkFlag=q.value.getState()}var o;if(q.value.getState()===false&&q.value.onUncheckHandler!==undefined){o=q.value.onUncheckHandler}else{if(q.value.getState()===true&&q.value.onCheckHandler!==undefined){o=q.value.onCheckHandler}}var n=Boolean(q.displayStyle==="Toolbar"||q.displayStyle==="flyout");var p=q.showLabelFlag&&Boolean(q.displayStyle==="Toolbar"||q.displayStyle===""||q.displayStyle==="flyout");g.applyResources({elem:o,view:q.elements.internalView,title:p,tooltipInfos:true,icon:n})}q._registerForCheckStateChange({handler:q.value,that:q});q._registerForAvailabilityModes()},_applyTouchMode:function(){var o=this;if(o.displayStyle==="Toolbar"&&o.elements!==undefined&&o.elements.internalView!==undefined&&o.value!==undefined){if(o.touchMode===true){var n;if(o.value.getState()===true){if(o.value.onCheckHandler){n=o.value.onCheckHandler}}else{if(o.value.getState()===false){if(o.value.onUncheckHandler){n=o.value.onUncheckHandler}}}o.elements.internalView.touchMode=true;g.applyResources({elem:n,view:o.elements.internalView,title:o.showLabelFlag,tooltipInfos:false,icon:false})}else{o.elements.internalView.touchMode=false}}this._parent()},_applyShowLabelFlag:function(){var o=this;if(o.displayStyle==="Toolbar"&&o.elements!==undefined&&o.elements.internalView!==undefined&&o.value!==undefined){if(o.showLabelFlag===true){o.elements.container.setAttributeNode(document.createAttribute("showlabel"));var n;if(o.value.getState()===true){if(o.value.onCheckHandler){n=o.value.onCheckHandler}}else{if(o.value.getState()===false){if(o.value.onUncheckHandler){n=o.value.onUncheckHandler}}}o.elements.internalView.showLabelFlag=true;g.applyResources({elem:n,view:o.elements.internalView,title:o.showLabelFlag,tooltipInfos:false,icon:false})}else{o.elements.internalView.showLabelFlag=false;o.elements.container.removeAttribute("showlabel")}}this._parent()},handleEvents:function(){var o=this;var n=this.elements.internalView;n.addEventListener("buttonclick",function(q){if(o.displayStyle!=="Toolbar"){return}var p;if(o.value!==undefined&&o.value.getState!==undefined&&o.elements.internalView.checkFlag!==o.value.getState()){if(o.value.getState()===false){if(o.value.onCheckHandler!==undefined){p=o.value.onCheckHandler}o.value.setState(true);o.fire("change")}else{if(o.value.getState()===true){if(o.value.onUncheckHandler!==undefined){p=o.value.onUncheckHandler}o.value.setState(false);o.fire("change")}}if(p!==undefined){g.applyResources({elem:p,view:o.elements.internalView,title:o.showLabelFlag,tooltipInfos:true,icon:true})}}});n.addEventListener("change",function(q){q.stopPropagation();if(o.value!==undefined&&o.value.getState!==undefined&&o.elements.internalView.checkFlag!==o.value.getState()){var p;if(o.value.getState()===false){if(o.value.onCheckHandler!==undefined){p=o.value.onCheckHandler}o.value.setState(true)}else{if(o.value.getState()===true){if(o.value.onUncheckHandler!==undefined){p=o.value.onUncheckHandler}o.value.setState(false)}}if(p!==undefined){g.applyResources({elem:p,view:o.elements.internalView,title:o.showLabelFlag,tooltipInfos:true})}}o.fire("change")})},_registerForCheckStateChange:function(o){var q=o.that;var p=o.handler;if(p!==undefined){var n=q.elements.internalView;if(q._subscriptionCHECK===undefined&&n!==undefined){q._subscriptionCHECK=p.onStateEvent("CHECK",function(s){n.checkFlag=true;var r=Boolean(q.displayStyle==="Toolbar"||q.displayStyle==="flyout");if(p.container!==undefined&&p.container.elements!==undefined&&n===p.container.currentValue.view){p.container.elements.presenterButton.checkFlag=true}g.applyResources({elem:p.onCheckHandler,view:n,title:q.showLabelFlag,tooltipInfos:true,icon:r})})}if(q._subscriptionUNCHECK===undefined&&n!==undefined){q._subscriptionUNCHECK=p.onStateEvent("UNCHECK",function(s){n.checkFlag=false;var r=Boolean(q.displayStyle==="Toolbar"||q.displayStyle==="flyout");if(p.container!==undefined&&p.container.elements!==undefined&&n===p.container.currentValue.view){p.container.elements.presenterButton.checkFlag=false}g.applyResources({elem:p.onUncheckHandler,view:n,title:q.showLabelFlag,tooltipInfos:true,icon:r})})}}},_registerForAvailabilityModes:function(){var p=this.value;var n=this.elements.internalView;if(p&&n){if(!this._subscriptionAVAILABILITY){if(!p.isAvailable()){n.disabled=true}this._subscriptionAVAILABILITY=p.onAvailabilityEvent(function o(q){n.disabled=!q.newValue})}}}});i.stop(a);return e});define("DS/WAfrTweakers/TweakerFlyout",["UWA/Core","DS/Tweakers/TweakerBase","DS/WAfrTweakers/TweakerUtilities","DS/Tweakers/TypeRepresentationFactory","text!DS/WAfrTweakers/assets/WAfrTypeRepresentations.json","text!DS/WAfrTweakers/assets/WAfrTypeTemplates.json","UWA/Promise","DS/WAfrDebug/mod_Performances"],function(f,k,g,m,a,c,i,e){var l=e.Performances,d="[DS/WAfrTweakers/TweakerFlyout]",h=new l();var b=h.start([d,"[Sync] TweakerBase.inherit"].join(" "));var j=k.inherit({name:"tweakerFlyout",btnItems:undefined,publishedProperties:{displayStyle:{defaultValue:"flyout",type:"string"},showLabelFlag:{defaultValue:false,type:"boolean"}},init:function(o){var n=h.start([d,"[Unknown] init"].join(" "));this._parent(o);h.stop(n)},buildView:function(){var n=this;n._parent();if(this._typeRepFactory===undefined){this._typeRepFactory=new m();this._typeRepFactory.registerTypeRepresentations(a);this._typeRepFactory.registerTypeTemplates(c)}n._applyValue()},_applyValue:function(){var p=this;var o=p.value;var n=[];p.btnItem={};if(o!==undefined){n.push(p._typeRepFactory.generateView(o,{typePath:o.type,touchMode:p.touchMode}).then(function r(s){if(s!==undefined){p.btnItem={model:o,view:s};if(s.elements&&s.elements.internalView&&s.elements.internalView.tooltipInfos){s.elements.internalView.tooltipInfos.position="right"}return i.resolve(s)}else{console.error("Problem generating the view of",o);return i.resolve()}},function q(s){console.error("Problem generating the view of",o);return i.resolve()}));i.all(n).then(function r(s){if(o.container!==undefined&&s!==undefined){var t=s[0].elements.internalView;t.displayStyle="flyout";t.showLabelFlag=true;t.getContent().style.width="100%";t.getContent().style.textAlign="left";t.getContent().style.display="block";var u={identifier:o.getId(),view:t,presenterLink:{type:"type",icon:"icon",tooltipInfos:"tooltipInfos",checkFlag:"checkFlag",title:"label"}};o.container.addElement({element:u});o.container.isAllViewGenerated=false;o.container.elemList.forEach(function(v){if(v.model===o){v.view=t;o.container.viewGenCounter++}if(o.container.viewGenCounter===o.container.elemList.length){o.container.isAllViewGenerated=true}});t.addEventListener("buttonclick",function(v){if(p.value!==undefined){p._updateFlyoutPresenter({elem:u,newValue:v.dsModel,flyout:o.container})}});p._applyResources({handler:o,internalView:u.view});if(o.container.isAllViewGenerated){p._internalHandleEvents({view:t,flyout:o.container,model:o})}p._registerForAvailabilityModes({flyout:o.container,view:t,model:o})}})}},_applyResources:function(n){var p=this;var o=n.handler;if(o.type==="checkHandlerButton"){if(o.getState()===false){o=o.onUncheckHandler}else{if(o.getState()===true){o=o.onCheckHandler}}}g.applyResources({elem:o,view:n.internalView,title:true,tooltipInfos:true,tooltipOptionsPosition:"right",icon:false})},_internalHandleEvents:function(o){var p=this;var n=o.flyout;if(n!==undefined){if((n.getChildren!==undefined&&n.getChildren().length!==0)||(p.displayStyle==="flyout"&&n.getElementsList&&n.getElementsList().length!==0)){if(p.displayStyle==="flyout"){n.addEventListener("presenterClick",function(q){p._executePresenterItem(o)})}}n.enterInHandleEvent=true}},_applyTouchMode:function(){var p=this;p._parent();if(p.value!==undefined){var o=p.value;var n=o.container;if(n!==undefined&&n.getChildren!==undefined&&n.getChildren().length!==0){n.elemList.forEach(function(q){if(p.touchMode!==p.value.container.isTouchApplied){if(p.touchMode===true){q.view.touchMode=true;n.isTouchApplied=true;if(q.model===o){g.applyResources({elem:o,view:q.view,title:p.showLabelFlag,tooltipInfos:false,icon:false})}}else{q.view.touchMode=false;n.isTouchApplied=false}}})}else{if(n!==undefined){n.touchMode=p.touchMode}}}},_applyShowLabelFlag:function(){var p=this;p._parent();if(p.value!==undefined){var o=p.value;var n=o.container;if(n!==undefined&&n.getChildren!==undefined&&n.getChildren().length!==0){n.elemList.forEach(function(q){if(p.showLabelFlag===true){q.view.showLabelFlag=true;if(q.model===o){g.applyResources({elem:o,view:q.view,title:p.showLabelFlag,tooltipInfos:false,icon:false})}}else{q.view.showLabelFlag=false}})}else{if(n!==undefined){if(p.showLabelFlag===true){n.showLabelFlag=true;n.elements.container.setAttributeNode(document.createAttribute("showlabel"))}else{n.showLabelFlag=false;n.elements.container.removeAttribute("showlabel")}}}}},_updateFlyoutPresenter:function(o){var r=this;var s=o.newValue;var q=o.elem;var n=o.flyout;if(r.displayStyle==="flyout"&&n!==undefined){var p=n.getElement({identifier:q.identifier});p.view=s;n.currentValue=p}},_executePresenterItem:function(p){var q=this;var o=p.flyout;var n=o.currentValue.view;o.elemList.forEach(function(r){if(r.view===n){if(r.model.type==="checkHandlerButton"||r.model.type==="checkHandler"){if(r.model.getState()===false){r.model.setState(true);r.view.checkFlag=true}else{r.model.setState(false)}q._applyResources({handler:r.model,view:r.view});o.elements.presenterButton.checkFlag=r.view.checkFlag}else{if(r.model.execute!==undefined){r.model.execute()}}}})},_registerForAvailabilityModes:function(q){var p=q.flyout;var o=p.currentValue.view;var n=p.elements.presenterButton;var r=this;p.elemList.forEach(function(t){if(t.view===o){if(!r._subscriptionAVAILABILITY){if(!t.model.isAvailable()){n.disabled=true}r._subscriptionAVAILABILITY=t.model.onAvailabilityEvent(function s(u){n.disabled=!u.newValue})}}})}});h.stop(b);return j});