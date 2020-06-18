define("DS/MPFMap/Map",["UWA/Class"],function(b){var a=b.extend({init:function(c){this._type="Map";if(c&&(c._type===this._type)){this._map=c._map}else{this._map={}}},get:function(c,e){var d;if(!(this.containsKey(c))){d=e}else{d=this._map[c]}return d},put:function(d,e){var c;c=false;if(!(this.containsKey(d))){this._map[d]=e;c=true}return c},containsKey:function(c){var d;d=this._map.hasOwnProperty(c);return d},containsValue:function(e){var d;var c;d=false;for(c in this._map){if(this._map.hasOwnProperty(c)&&(this._map[c]===e)){d=true;break}}return d}});return a});define("DS/MPFMap/UnmodifiableMap",["DS/MPFMap/Map"],function(a){var b=a.extend({put:function(){throw new Error("Unmodifiable Map")}});return b});define("DS/MPFMap/BiMap",["DS/MPFMap/Map","DS/MPFMap/UnmodifiableMap"],function(a,c){var b=a.extend({init:function(){this._parent();this._inverseMap=new a()},put:function(e,f){var d;d=false;if(!(this.containsKey(e))&&!(this._inverseMap.containsKey(f))){this._parent(e,f);this._inverseMap.put(f,e);d=true}return d},inverse:function(){return new c(this._inverseMap)}});return b});