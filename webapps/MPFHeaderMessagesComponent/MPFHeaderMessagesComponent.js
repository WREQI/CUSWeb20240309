define("DS/MPFHeaderMessagesComponent/HeaderErrorMessagesComponent",["UWA/Core","UWA/Class/View"],function(d,c){var a;function b(e){return d.createElement("p",{"class":"mpf-error",text:e})}a=c.extend({className:"mpf-messages",setup:function(e){if(!(d.is(e))){throw new Error("HeaderErrorMessagesComponent options param is required")}this.messages=e.messages},render:function(){var e;e=this.messages.map(b);this.container.setContent(e);return this}});return a});