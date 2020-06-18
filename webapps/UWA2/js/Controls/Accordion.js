define("UWA/Controls/Accordion",["UWA/Core","UWA/Controls/Segmented"],function(c,b){var a=b.extend({name:"uwa-accordion",defaultOptions:{title:null,multiSelect:false,constantItemWidth:false,contentPosition:"bottom"},init:function(d){this._parent(d)},hasItem:function(d){if(this.elements.items[d]){return true}return false},addItem:function(f,e){var h=this.elements,d=h.items=h.items||{},g=h.containers=h.containers||{};this._parent(f,e);g[f]=c.createElement("div",{"class":this.getClassNames("-content")}).inject(d[f],(this.options.contentPosition==="top")?"top":"bottom");if(e.content){this.setContent(f,e.content)}},removeItem:function(e){var f=this.elements,d=f.items;if(d[e]){d[e].destroy();d[e]=null}},updateContent:function(e,f,g){var d=this.elements.containers[e];if(g){d.empty()}if(c.is(f,"string")){f=c.createElement("div",{html:f})}d.addContent(f);return d},buildSkeleton:function(){var d=this.elements;d.container=c.createElement("ul",{"class":this.getClassNames()});d.itemContainer=d.container},onClick:function(d){this.toggleItem(d)},onChange:function(d,e){if(e&&!this.options.multiSelect){this.unselectItems(false,d)}},setContent:function(d,e){return this.updateContent(d,e,true)},addContent:function(d,e){return this.updateContent(d,e,false)}});return c.namespace("Controls/Accordion",a,c)});