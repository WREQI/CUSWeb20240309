define("DS/MPFMyProfileComponent/MyProfileComponent",["UWA/Core","UWA/Class/View","DS/UIKIT/Modal","DS/MPFDataProxy/MarketplaceConnector","i18n!DS/MPFMyProfileComponent/assets/nls/MyProfileComponent","css!DS/MPFUI/MPFUI"],function(c,f,b,a,d){var e=f.extend({setup:function(g){this._parent(g)},render:function(g){var h=this;return a.get3DPassportUrl().then(function(i){h.iframe=c.createElement("iframe",{src:i});h.modal=h._createModal();h.modal.inject(g);return h})},_createModal:function(){var g;var h;h=d.get("myProfile");g=new b({className:"mpf-myprofile",visible:true,closable:true,header:h,body:this.iframe});return g}});return e});