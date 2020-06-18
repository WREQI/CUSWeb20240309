define("DS/Selection/XSO",["UWA/Core","UWA/Event","DS/CoreEvents/ModelEvents","UWA/Class"],function(h,p,b,a){var n="/WEBAPP/";var d="UPDATE";var c="ADD";var l="PRE_ADD";var e="REMOVE";var f="EMPTY";var g="PRE_EMPTY";var j="POST_ADD";var q="POST_REMOVE";var i=false;var m=-1;var k=function(){var r={};this.add=function(s){var v=s.hash();var w=r[v];if(w){var u=false;for(var t=0;t<w.length;++t){if(w[t].isEqual(s)){u=true}}if(!u){w.push(s)}}else{w=[];w.push(s);r[v]=w}};this.remove=function(s){var v=s.hash();var w=r[v];if(w){var u=false;for(var t=0;t<w.length;++t){if(w[t].isEqual(s)){u=true;w.splice(t,1);break}}return u}};this.contains=function(s){var v=s.hash();var w=r[v];if(w){var u=false;for(var t=0;t<w.length;++t){if(w[t].isEqual(s)){u=true}}return u}else{return false}};this.empty=function(){r={}}};var o=a.extend({init:function(r){this.options={areEquals:function s(t,v){if(t&&t.pathElement&&v&&v.pathElement){return t.pathElement.isEqual(v.pathElement)}if(t instanceof Function){if(v instanceof Function){return t.toString()===v.toString()}return false}if(t===null||t===undefined||v===null||v===undefined){return t===v}if(t===v){return true}else{if(typeof t.valueOf==="function"&&typeof v.valueOf==="function"&&t.valueOf()===v.valueOf()){return true}}if(t instanceof Date){return false}if(v instanceof Date){return false}if(!(t instanceof Object)||!(v instanceof Object)){return false}var u=Object.keys(t);return Object.keys(v).every(function(w){return u.indexOf(w)!==-1})?u.every(function(w){return s(t[w],v[w])}):false},useUniqueID:false,publishOnlyPrePostEvents:false};h.extend(this.options,r);this._modelEvents=new b();this._xsoUuid=h.Utils.getUUID();if(this.options.useUniqueID){this._items={}}else{this._items=[]}this.hashSetPathElement=new k()},_getXsoID:function(r){return r.__xso__!==undefined?r.__xso__[this._xsoUuid]:undefined},_setXsoID:function(s,r){if(s.__xso__===undefined){s.__xso__={}}s.__xso__[this._xsoUuid]=r},_subscribe:function(t){var r={event:null,arrayOutput:false,callback:null};h.extend(r,t);if(r.callback){var s=n+this.options.eventChannel+r.event;return this._modelEvents.subscribe({event:s},function(v){if(r.arrayOutput){var u=[];if(v instanceof "Array"){u.concat(v)}else{u.push(v)}r.callback.call(window,u)}else{r.callback.call(window,v)}})}},unsubscribe:function(r){return this._modelEvents.unsubscribe(r)},get:function(){if(this.options.useUniqueID){if(!this._cachedItems||this._needUpdateCachedItems){var r=this;this._cachedItems=Object.keys(this._items).map(function(s){return r._items[s]});this._needUpdateCachedItems=false}return this._cachedItems}else{return this._items}},isIn:function(u){var s=false;var t=this;if(this.options.useUniqueID){if(this.options.getElementID){var r=this.options.getElementID(u);if(r!==null&&r!==undefined){return this._items[r]!==undefined}else{throw"XSO: getElementID return something null or undefined"}}else{return this._getXsoID(u)!==undefined}}else{if(u&&u.pathElement){return this.hashSetPathElement.contains(u.pathElement)}else{this._items.forEach(function(v){if(t.options.areEquals(v,u)){s=true}})}}return s},isEmpty:function(){if(this.options.useUniqueID){for(var r in this._items){if(Object.prototype.hasOwnProperty.call(this._items,r)){return false}}return true}else{return !(this._items.length>0)}},isBeingEmptied:function(){return this._isBeingEmptied},empty:function(v){var t=[];if(!this.isEmpty()){if(v===undefined){v=true}var s=this;if(v){this._modelEvents.publish({event:n+this.options.eventChannel+g,data:this.get()})}if(this.options.useUniqueID){this._isBeingEmptied=true;for(var u in this._items){var r=this._items[u];t.push(r);if(r){this.remove(r)}}this._isBeingEmptied=false}else{while(this._items.length){var r=s._items.shift();t.push(r);this._modelEvents.publish({event:n+s.options.eventChannel+e,data:r});this._modelEvents.publish({event:n+s.options.eventChannel+d,data:r})}this.hashSetPathElement.empty()}this._modelEvents.publish({event:n+s.options.eventChannel+q,data:t});if(v){this._modelEvents.publish({event:n+this.options.eventChannel+f,data:null})}}},unique:function(r){var s=this;if(this.options.useUniqueID){if(!this.isIn(r)||this.get().length>1){this.empty(true);s.add(r)}}else{if(!this.isIn(r)||this.get().length>1){this.empty(false);s.add(r)}}},_addUnit:function(x,y){var v=true;var u=this;if(this.options.useUniqueID){v=false;if(this.options.getElementID){var r=this.options.getElementID(x);if(r!==null&&r!==undefined){if(this._items[r]===undefined){this._needUpdateCachedItems=true;this._items[r]=x;y.call(this,x);v=true}}else{throw"XSO: getElementID return something null or undefined"}}else{var w=this._getXsoID(x);if((w===undefined&&this._items[w]===undefined)){this._needUpdateCachedItems=true;m++;this._setXsoID(x,m);this._items[m]=x;y.call(this,x);v=true}}}else{if(x&&x.pathElement){v=!this.hashSetPathElement.contains(x.pathElement)}else{for(var s=0;s<this._items.length;s++){var t=this._items[s];if(u.options.areEquals(t,x)){v=false;break}}}if(v){if(x&&x.pathElement){this.hashSetPathElement.add(x.pathElement)}this._items.push(x);y.call(this,x)}}return v},add:function(u){var s=[];var t=this;var r=function(v){if(t.options.publishOnlyPrePostEvents){return}t._modelEvents.publish({event:n+t.options.eventChannel+c,data:v});t._modelEvents.publish({event:n+t.options.eventChannel+d,data:v})};this._modelEvents.publish({event:n+t.options.eventChannel+l,data:u});if(i){console.time("add in xso")}if(u instanceof Array){u.forEach(function(v){if(t._addUnit(v,r)){s.push(v)}})}else{if(t._addUnit(u,r)){s.push(u)}}if(i){console.timeEnd("add in xso")}this._modelEvents.publish({event:n+t.options.eventChannel+j,data:s})},_removeUnit:function(w,s){var t=this;var v=false;if(this.options.useUniqueID){if(this.options.getElementID){var r=this.options.getElementID(w);if(r!==null&&r!==undefined){if(this._items[r]!==undefined){this._needUpdateCachedItems=true;delete this._items[r];s.call(this,w);v=true}}else{throw"XSO: getElementID return something null or undefined"}}else{var u=this._getXsoID(w);if((u!==undefined&&this._items[u]!==undefined)){this._needUpdateCachedItems=true;delete this._items[u];this._setXsoID(w,undefined);s.call(this,w);v=true}}}else{if(w&&w.pathElement){v=this.hashSetPathElement.remove(w.pathElement)}this._items.some(function(y,x){if(t.options.areEquals(y,w)){t._items.splice(x,1);s.call(this,w);v=true;return true}})}return v},remove:function(v){var t=[];var s=this;var r=function(w){if(s.options.publishOnlyPrePostEvents){return}s._modelEvents.publish({event:n+s.options.eventChannel+e,data:w});s._modelEvents.publish({event:n+s.options.eventChannel+d,data:w})};if(v instanceof Array){v.forEach(function(w){var x=s._removeUnit(w,r);if(x&&!s._isBeingEmptied){t.push(w)}})}else{var u=s._removeUnit(v,r);if(u&&!s._isBeingEmptied){t.push(v)}}if(!this._isBeingEmptied){this._modelEvents.publish({event:n+s.options.eventChannel+q,data:t})}},onChange:function(s,r){if(r===undefined){r={arrayOutput:false}}return this._subscribe({event:d,arrayOutput:r.arrayOutput,callback:s})},onAdd:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+c},function(s){r.call(window,s)})}},onPreAdd:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+l},function(s){r.call(window,s)})}},onPostAdd:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+j},function(s){r.call(window,s)})}},onPostRemove:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+q},function(s){r.call(window,s)})}},onUpdate:function(r){if(r){this.onEmpty(r);this.onRemove(r);this.onAdd(r)}},onRemove:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+e},function(s){r.call(window,s)})}},onEmpty:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+f},function(s){r.call(window,s)})}},onPreEmpty:function(r){if(r){return this._modelEvents.subscribe({event:n+this.options.eventChannel+g},function(s){r.call(window,s)})}}});return o});define("DS/Selection/CSOManager",["UWA/Core","UWA/Event","DS/CoreEvents/Events","DS/Selection/XSO"],function(f,b,a,e){var d="CSO/";var c=e.singleton({init:function(g){g={eventChannel:d,};this._parent(g)}});return f.namespace("WUX/Selection/CSOManager",c)});define("DS/Selection/HSOManager",["UWA/Core","UWA/Event","DS/CoreEvents/Events","DS/Selection/XSO"],function(f,b,a,e){var c="HSO/";var d=e.singleton({init:function(g){g={eventChannel:c,};this._parent(g)}});return f.namespace("WUX/Selection/HSOManager",d)});define("DS/Selection/PSOManager",["UWA/Core","UWA/Event","DS/CoreEvents/Events","DS/Selection/XSO"],function(f,b,a,e){var d="PSO/";var c=e.singleton({init:function(g){g={eventChannel:d,};this._parent(g)}});return f.namespace("WUX/Selection/PSOManager",c)});