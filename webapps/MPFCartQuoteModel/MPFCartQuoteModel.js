define("DS/MPFCartQuoteModel/CartQuoteDataProxy",["UWA/String","DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(c,b,a){var d=b.extend({init:function(e,f){this._parent(e,"/mdcart/carts/{0}/quote",f)},buildPath:function(f,e){return c.format(this.resourcePath,f.parentResourceId)},urlPatch:b.delegate,doPatch:b.delegate,urlPost:a.emit,urlPut:a.emit,urlDelete:a.emit,doPost:a.emit,doPut:a.emit,doDelete:a.emit});return d});define("DS/MPFCartQuoteModel/CartQuoteModel",["UWA/Core","DS/MPFModel/MPFModel"],function(d,a){var c;var b={};b.NUMBER="quoteNumber";b.URL="quoteUrl";b.STATE="quoteState";c=a.extend({defaults:function(){var e={};e[b.NUMBER]=null;e[b.URL]=null;e[b.STATE]=null;return e},setup:function(e,f){this._parent(e,f);this._type="CartQuoteModel"},parse:function(e){var g;var f;g=this._parent(e);f=g[b.URL];if(typeof f==="string"){g[b.URL]=f.replace(/^"(.*)"$/,"$1")}return g},getNumber:function(){return this.get(b.NUMBER)},setNumber:function(e){return this.set(b.NUMBER,e)},getUrl:function(){return this.get(b.URL)},setUrl:function(e){return this.set(b.URL,e)},getState:function(){return this.get(b.STATE)},setState:function(e){return this.set(b.STATE,e)}});c.Fields=Object.freeze(b);return c});define("DS/MPFCartQuoteModel/QuoteDataProxy",["DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(b,a){var c;c=b.extend({init:function(d,e){this._parent(d,"/mdquote/quotes",e)},urlGet:a.emit,urlPost:a.emit,urlPut:a.emit,urlDelete:a.emit,doGet:a.emit,doPost:a.emit,doPut:a.emit,doDelete:a.emit});return c});