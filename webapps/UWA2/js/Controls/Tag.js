define("UWA/Controls/Tag",["UWA/Core","UWA/Event","UWA/Controls/Input"],function(d,a,c){var b=c.Button.extend({name:"uwa-tag",options:{closable:false},buildSkeleton:function(){this._parent();var e=this.elements.input.getText();this.elements.input.empty();this.elements.input=d.createElement("div",{"class":this.getClassNames("-title"),text:e});this.elements.content.addContent([this.elements.input,d.createElement("div",{"class":this.getClassNames("-close")+" uwa-icon","data-icon":",",events:{click:this._close.bind(this)}})]);this.setClosable(this.options.closable)},setClosable:function(e){this.elements.container.toggleClassName("closable",e!==false)},_close:function(f){this.dispatchEvent("onClose");a.stop(f)},buildInput:function(){return d.createElement("div",{tabindex:"0"})}});return d.namespace("Controls/Tag",b,d)});