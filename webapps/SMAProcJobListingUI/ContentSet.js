define("DS/SMAProcJobListingUI/ContentSet",["UWA/Core","DS/W3DXComponents/Views/Item/SetView"],function(d,c){var b="content-set";var a=c.extend({name:b,defaultOptions:{actions:{},switcher:{},detail:{}},setup:function(){var f=this.getOption("contents"),e=(this.getOption("contents").selectionMode==="nullToMany");this.container.addClassName(this.getClassNames("-container"));this._initDetailView();if(e){this._initMultiselHeaderView()}this._initSwitcherView();this._initContentsViews(f.views)},getSwitcherViewOptions:function(){var e=d.clone(this._parent.apply(this,arguments));e.buttons.pop();return e},onPositionChange:function(e,f){switch(f){case"left":this.minimize();break;case"right":this.maximize();break;default:this.maximize();break}},onMinimized:function(){this.dispatchEvent("onSwitch",[null,"list"])},onMaximized:function(){var e=this.switcherView.getValue();this.dispatchEvent("onSwitch",[null,e])}});return a});