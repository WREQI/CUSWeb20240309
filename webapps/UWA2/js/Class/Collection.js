define("UWA/Class/Collection",["UWA/Core","UWA/Array","UWA/Utils","UWA/Class","UWA/Class/Debug","UWA/Class/Events","UWA/Class/Listener","UWA/Class/Model"],function(f,c,g,a,j,l,k,d){var h,i,b,e;h={add:true,remove:true,merge:true};i={add:true,remove:false};b=function(m){return f.is(m,"function")?m:function(n){return n.get(m)}};e=a.extend(l,k,{init:function(n,m){if(!f.is(m)){m={}}if(m.url){this.url=m.url}if(m.model){this.model=m.model}if(m.comparator!==undefined){this.comparator=m.comparator}this._reset();this._modelListener=function(q,p,r,o){return this._onModelEvent(q,p,r,o)};this.setup(n,m);if(n){this.reset(n,f.extend({silent:true},m))}},clone:function(){return new this.constructor(this._models)},setup:function(){return},sync:function(){return d.prototype.sync.apply(this,arguments)},parse:function(m){return m},model:d,add:function(n,m){return this.set(n,f.extend(f.extend({merge:false},m),i))},push:function(n,m){return this.add(n,f.merge({at:this.length},m))},unshift:function(n,m){return this.add(n,f.merge({at:0},m))},remove:function(s,p){var o,n,q,m,r;if(!f.is(p)){p={}}r=!Array.isArray(s);s=r?[s]:f.clone(s,false);for(q=0,m=s.length;q<m;q++){n=s[q]=this.get(s[q]);if(n){delete this._byId[n.id];delete this._byId[n.cid];o=this.indexOf(n);this._models.splice(o,1);this.length--;if(!p.silent){p.index=o;n.dispatchEvent("onRemove",[n,this,p])}this._removeReference(n)}}return r?s[0]:s},pop:function(n){var m;m=this.at(this.length-1);this.remove(m,n);return m},shift:function(n){var m;m=this.at(0);this.remove(m,n);return m},sort:function(m){if(!f.is(m)){m={}}if(!this.comparator){throw new Error("Cannot sort a collection without a comparator")}if(f.is(this.comparator,"string")||this.comparator.length===1){this._models=this.sortBy(this.comparator,this)}else{this._models.sort(this.comparator.bind(this))}if(!m.silent){this.dispatchEvent("onSort",[this,m])}return this},set:function(I,n){var v,m,F,J,B,z,w,p,K,D,E,C,y,G,o,A,x,H,u,t,s,r,q=this;n=f.merge(f.merge({},n),h);if(n.parse){I=q.parse(I,n)}r=!Array.isArray(I);I=r?(I?[I]:[]):f.clone(I,false);v=n.at;G=q.model;m=q.comparator&&(!f.is(v))&&n.sort!==false;F=(f.typeOf(q.comparator)==="string")?q.comparator:null;J=[];B=[];z={};w=n.add;p=n.merge;K=n.remove;D=!m&&w&&K?[]:false;for(E=0,C=I.length;E<C;E++){A=I[E];if(A instanceof d){y=o=A}else{y=A[G.prototype.idAttribute]}x=q.get(y);if(x){if(K){z[x.cid]=true}if(p){A=A===o?o._attributes:A;if(n.parse){A=x.parse(A,n)}x.set(A,n);if(m&&!H&&x.hasChanged(F)){H=true}}I[E]=x}else{if(w){o=I[E]=q._prepareModel(A,n);if(o){I[E]=o;J.push(o);o.addEvent("onAnyEvent",q._modelListener,q);q._byId[o.cid]=o;if(f.is(o.id)){q._byId[o.id]=o}}}}if(D&&(x||o)){D.push(x||o)}}if(K){for(E=0,C=q.length;E<C;++E){o=q._models[E];if(!z[o.cid]){B.push(o)}}if(B.length){q.remove(B,n)}}if(J.length||(D&&D.length)){if(m){H=true}q.length+=J.length;if(f.is(v)){for(t=0,s=J.length;t<s;t++){q._models.splice(v+t,0,J[t])}}else{if(D){q._models.length=0}u=D||J;for(t=0,s=u.length;t<s;t++){q._models.push(u[t])}}}if(H){q.sort({silent:true})}if(!n.silent){for(E=0,C=J.length;E<C;E++){o=J[E];o.dispatchEvent("onAdd",[o,q,n])}if(H||(D&&D.length)){q.dispatchEvent("onSort",[q,n])}}return r?I[0]:I},reset:function(r,p){var o,q,m,n;p=p?f.clone(p,false):{};n=this._models;for(q=0,m=n.length;q<m;q++){o=n[q];this._removeReference(o)}p.previousModels=this._models;this._reset();r=this.add(r,f.extend({silent:true},p));if(!p.silent){this.dispatchEvent("onReset",[this,p])}return r},get:function(m){if(f.is(m)){return this._byId[m.id]||this._byId[m.cid]||this._byId[m]}},at:function(m){return this._models[m]},first:function(o,m){if(f.is(o)&&!m){return this._models.slice(0,o)}return this._models[0]},last:function(o,m){if(f.is(o)&&!m){return this._models.slice(Math.max(this._models.length-o,0))}return this._models[this._models.length-1]},toArray:function(){return this.slice()},slice:function(n,m){return this._models.slice(n,m)},rest:function(o,m){return this._models.slice(((!f.is(o))||m?1:o))},initial:function(o,m){return this._models.slice(0,this._models.length-((!f.is(o))||m?1:o))},without:function(){var m;m=Array.prototype.concat.apply([],Array.prototype.slice.call(arguments));return this._models.filter(function(n){return(m.indexOf(n))===-1})},indexOf:function(m,n){return this._models.indexOf(m,n)},lastIndexOf:function(m,n){return this._models.lastIndexOf(m,n)},contains:function(m){return this.indexOf(m)!==-1},size:function(){return this._models.length},isEmpty:function(){return this._models.length===0},toJSON:function(m){return this.map(function(n){return n.toJSON(m)})},pluck:function(m){return this._models.map(function(n){return n.get(m)})},shuffle:function(){var n,m;m=[];this.forEach(function(p,o){n=g.random(o);m[o]=m[n];m[n]=p});return m},where:function(m,n){if(!f.is(m)){return(n?undefined:[])}return this[n?"find":"filter"](function(o){var p;for(p in m){if(m[p]!==o.get(p)){return false}}return true})},findWhere:function(m){return this.where(m,true)},invoke:function(){var m=Array.prototype.slice.call(arguments);m.unshift(this._models);return c.invoke.apply(null,m)},forEach:function(n,m){return this._models.forEach(n,m)},map:function(n,m){return this._models.map(n,m)},every:function(n,m){return this._models.every(n,m)},some:function(n,m){return this._models.some(n,m)},sortBy:function(n,m){var p,o;p=b(n);o=this._models.map(function(r,q,s){return{model:r,index:q,criteria:p.call(m,r,q,s)}});o.sort(function(t,s){var r,q;r=t.criteria;q=s.criteria;if(r!==q){if(r>q||r===undefined){return 1}if(r<q||q===undefined){return -1}}if(t.index<s.index){return -1}return 1});return o.map(function(q){return q.model})},groupBy:function(p,n){var o,m,q=this._models;o=b(p);m={};this.forEach(function(s,r){var t=o.call(n,s,r,q);if(!f.owns(m,t)){m[t]=[]}m[t].push(s)});return m},countBy:function(p,n){var o,m,q=this._models;o=b(p);m={};this.forEach(function(s,r){var t=o.call(n,s,r,q);if(!f.owns(m,t)){m[t]=0}m[t]++});return m},find:function(o,n){var m;this.some(function(q,p,r){if(o.call(n,q,p,r)){m=q;return true}});return m},filter:function(n,m){return this._models.filter(n,m)},reject:function(n,m){return this.filter(function(p,o,q){return !n(p,o,q)},m)},reduce:function(p,m,o){var n=p;if(o){n=n.bind(o)}if(arguments.length>1){return this._models.reduce(n,m)}return this._models.reduce(n)},reduceRight:function(p,m,o){var n=p;if(o){n=n.bind(o)}if(arguments.length>1){return this._models.reduceRight(n,m)}return this._models.reduceRight(n)},max:function(o,n){var m,p;if(!o||this.isEmpty()){return undefined}p=b(o);m={computed:-Infinity,model:undefined};this.forEach(function(r,q,t){var s;s=p.call(n,r,q,t);if(s>=m.computed){m={model:r,computed:s};return m}});return m.model},min:function(o,n){var m,p;if(!o||this.isEmpty()){return undefined}p=b(o);m={computed:Infinity,model:undefined};this.forEach(function(r,q,t){var s;s=p.call(n,r,q,t);if(s<m.computed){m={model:r,computed:s};return m}});return m.model},fetch:function(m){var p,n,o=this;m=m?f.clone(m,false):{};if(m.parse===undefined){m.parse=true}p=m.onComplete;m.onComplete=function(q){var r;r=m.reset?"reset":"set";o[r](q,m);if(p){p(o,q,m)}return o.dispatchEvent("onSync",[o,q,m])};n=m.onFailure;m.onFailure=function(q){if(n){n(o,q,m)}o.dispatchEvent("onError",[o,q,m])};return o.sync("read",o,m)},create:function(m,o){var n,q,p=this;o=o?f.clone(o,false):{};n=p._prepareModel(m,o);if(!n){return false}if(!o.wait){p.add(n,o)}q=o.onComplete;o.onComplete=function(r,s){if(o.wait){p.add(r,o)}if(q){return q(r,s,o)}};n.save(null,o);return n},_reset:function(){this.length=0;this._models=[];this._byId={};return this._byId},_prepareModel:function(o,n){var m;if(o instanceof d){if(!o.collection){o.collection=this}return o}n=f.is(n)?f.clone(n,false):{};n.collection=this;m=new this.model(o,n);if(!m.validationError){return m}this.dispatchEvent("onValidationFailure",[this,m.validationError,n]);return false},_removeReference:function(m){if(this===m.collection){delete m.collection}return m.removeEvent("onAnyEvent",this._modelListener,this)},_onModelEvent:function(o,n,p,m){if((o==="onAdd"||o==="onRemove")&&p!==this){return}if(o==="onDestroy"){this.remove(n,m)}if(n&&o===("onChange:"+n.idAttribute)){delete this._byId[n.previous(n.idAttribute)];if(f.is(n.id)){this._byId[n.id]=n}}return this.dispatchEvent(o,[n,p,m])}});return f.namespace("Collection",e,a)});