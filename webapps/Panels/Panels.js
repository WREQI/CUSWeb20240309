define("DS/Panels/PanelBase",["UWA/Core","UWA/Event","UWA/Controls/Abstract","DS/Core/Core"],function(e,a,d,c){var b=d.extend({defaultOptions:{},init:function(f){this._parent(f);this._buildView()},appendChild:function(g){var f=new e.Element("div",{styles:{width:"inherit"},html:g});this.elements.content.appendChild(f);return f},_buildView:function(){this.elements.container=e.Element("div",{"class":"wux-layouts-panel wux-panels-panelbase",styles:{minWidth:0,minHeight:0}});this.elements.panel=e.Element("div",{"class":"wux-panels-panelbase",styles:{display:"block"}});if(this.options.title){this.elements.title=e.Element("div",{"class":"wux-panels-panelbase-title",html:this.options.title}).inject(this.elements.panel)}this.elements.panel.inject(this.elements.container);this.elements.content=e.Element("div",{"class":"wux-panels-panelbase-content",styles:{display:"block"}}).inject(this.elements.panel)},});return b});define("DS/Panels/SidePanel",["UWA/Core","UWA/Event","UWA/Controls/Abstract","DS/Core/Core","DS/Panels/PanelBase","DS/Utilities/Css","DS/CoreEvents/ModelEvents","DS/Core/PointerEvents"],function(c,j,f,h,k,b,a,d){var g={left:"&#9664;",right:"&#9654;"};var i={right:"&#9664;",left:"&#9654;"};var e=k.extend({defaultOptions:{side:"left",isDockable:true},init:function(m){this._parent(m);this._modelEvents=new a();var o={transition:"all 0.2s ease-in-out",position:"absolute",top:0,bottom:0};var l={height:"100%"};if(this.options.side==="right"){o.right=0;l.right=-1}else{o.left=0;l.left=-1}this.elements.panel.setStyles(o);this.elements.panel.addClassName("wux-panels-sidepanel wux-panels-sidepanel-"+this.options.side);var n=this;this.elements.lateralHandle=new c.Element("div",{"class":"wux-panels-sidepanel-lateral-handle wux-panels-sidepanel-lateral-handle-"+this.options.side,styles:l});this.elements.lateralHandle.addEvent(d.POINTERUP,function(p){p.stopPropagation();p.preventDefault();n.slideToggle()});if(this.options.isDockable){this.elements.lateralHandle.inject(this.elements.container)}this.slideIn()},slideToggle:function(){if(!this.elements.panel.hasClassName("wux-ui-effects-slide-"+this.options.side)){this.slideOut()}else{this.slideIn()}},slideIn:function(){this.elements.container.setAttribute("data-isOpen","true");this.elements.panel.removeClassName("wux-ui-effects-slide-"+this.options.side);this._modelEvents.publish({event:"/PANEL/SLIDE_IN",data:this})},slideOut:function(){this.elements.container.setAttribute("data-isOpen","false");this.elements.panel.addClassName("wux-ui-effects-slide-"+this.options.side);this._modelEvents.publish({event:"/PANEL/SLIDE_OUT",data:this})},onSlideIn:function(l){return this._modelEvents.subscribe({event:"/PANEL/SLIDE_IN"},l)},onSlideOut:function(l){return this._modelEvents.subscribe({event:"/PANEL/SLIDE_OUT"},l)}});return e});