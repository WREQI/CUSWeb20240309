define("DS/ENOXPageToolBar/js/PageToolBar",["UWA/Class/View","DS/Handlebars/Handlebars","DS/Core/ModelEvents","text!DS/ENOXPageToolBar/html/PageToolBar.html","i18n!DS/ENOXPageToolBar/assets/nls/PageToolBar","css!DS/ENOXPageToolBar/css/PageToolBar","css!DS/UIKIT/UIKIT.css"],function(a,b,c,g,m,j,i){var e=b.compile(g);var h=false;var l=false;var k="fonticon-open-left";var f="fonticon-open-right";var d=a.extend({name:"page-toolbar-view",className:function(){return this.getClassNames("-container")},tagName:"div",domEvents:{"click .welcome-panel":"welcomePanelIconClick","click .information-panel":"informationIconClick","click .mobile-menu":"mobileMenuClick"},init:function(n){var p=this;n._self=this;n.withInformationButton=n.withInformationButton===false||n.withInformationButton===true?n.withInformationButton:true;n.withWelcomePanelButton=n.withWelcomePanelButton?n.withWelcomePanelButton:false;n.isWelcomePanelCollapsed=n.isWelcomePanelCollapsed?n.isWelcomePanelCollapsed:false;this._informationOpen=n.informationOriginalState&&n.informationOriginalState==="open"?true:false;n._informationOpen=this._informationOpen;this._welcomePanelCollapsed=n.isWelcomePanelCollapsed;this._withWelcomePanelMenuMobile=n.withWelcomePanelButton;n.withWelcomePanelMenuMobile=this._withWelcomePanelMenuMobile;this._modelEvents=n.modelEvents?n.modelEvents:new c();for(var o in n){this[o]=n[o]}this._parent(n);h=n.isWelcomePanelCollapsed?n.isWelcomePanelCollapsed:false},setup:function(n){var o=this;if(UWA.is(n.className)){this.container.addClassName(n.className)}n.collapse_nls_name=m.collapse;n.expand_nls_name=m.expand;n.information_nls_name=m.information;this.container.setHTML(e(n));this._collaspe_expander=o.container.getElement(".welcome-panel");this._modelEvents.subscribe({event:"top-toolbar-update-body"},function(){});this._modelEvents.subscribe({event:"welcome-panel-expanded"},function(){var p=o.container.getElement(".welcome-panel");if(p){p=p.getElement(".fonticon");p.classList.add(k);p.classList.remove(f);p.setAttribute("title",m.collapse)}});this._modelEvents.subscribe({event:"welcome-panel-collapsed"},function(){var p=o.container.getElement(".welcome-panel");if(p){p=p.getElement(".fonticon");p.classList.remove(k);p.classList.add(f);p.setAttribute("title",m.expand)}});this._modelEvents.subscribe({event:"information-panel-visible"},function(){var p=o.container.getElement(".information-panel");if(p){p=p.getElement(".fonticon");p.classList.add("selected")}});this._modelEvents.subscribe({event:"information-panel-hidden"},function(){var p=o.container.getElement(".information-panel");if(p){p=p.getElement(".fonticon");p.classList.remove("selected")}});this._modelEvents.subscribe({event:"hide-welcomepanel-icon"},function(){var q=o.container.getElement(".welcome-panel");var p=o.container.getElement(".body-content");if(q){q.classList.add("displaynone");p.classList.add("noleftshift")}var r=o.container.getElement(".mobile-menu");if(r){r.classList.add("displaynone");p.classList.add("noleftshift")}});this._modelEvents.subscribe({event:"show-welcomepanel-icon"},function(){var q=o.container.getElement(".welcome-panel");var p=o.container.getElement(".body-content");if(q){q.classList.remove("displaynone");p.classList.remove("noleftshift")}var r=o.container.getElement(".mobile-menu");if(r){r.classList.remove("displaynone");p.classList.remove("noleftshift")}})},render:function(o){var n=this;return this},welcomePanelIconClick:function(){var n=this.container.getElement(".welcome-panel");if(n){n=n.getElement(".fonticon");if(n.classList.contains(k)){h=false}else{h=true}}if(h){this._modelEvents.publish({event:"welcome-panel-expand"})}else{this._modelEvents.publish({event:"welcome-panel-collapse"})}},informationIconClick:function(){var n=this.container.getElement(".information-panel");if(n){n=n.getElement(".fonticon");if(n.classList.contains("selected")){l=true;n.classList.remove("selected")}else{l=false;n.classList.add("selected")}}if(l){this._modelEvents.publish({event:"information-panel-close"})}else{this._modelEvents.publish({event:"information-panel-open"})}},mobileMenuClick:function(){this._modelEvents.publish({event:"welcome-panel-expand"})},getBodyContent:function(){return this.container.getElement(".body-content")}});return d});