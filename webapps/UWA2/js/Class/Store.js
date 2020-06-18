define("UWA/Class/Store",["UWA/Core","UWA/Utils","UWA/String","UWA/Class","UWA/Class/Debug"],function(f,c,b,a,e){var d;d=a.extend(e,{init:function(j,i,h){var g;f.log(["","*IMPORTANT NOTICE : UWA.Class.Store IS AN EXPERIMENTAL ","FEATURE SUBJECT TO REMOVAL, DEPRECIATION OR CHANGES IN THE ","NEXT RELEASE! IT IS PROVIDED AS A TEMPORARY CONVENIENCE, ","CONSEQUENTLY DO NOT USE THIS IN PRODUCTION CODE!*"].join(""));this._name=i;this._storage=j;this.debugMode=h&&h.debugMode;g=this._storage.get(this._name);this._records=(g&&g.split(","))||[]},log:function(){return this._parent(b.format('Store "{0}": {1}',this._name,b.format.apply(null,arguments)))},_save:function(){return this._storage.set(this._name,this._records.join(","))},_set:function(h,g){return this._storage.set(this._name+"-"+h,JSON.stringify(g))},_rem:function(g){return this._storage.remove(this._name+"-"+g)},_insert:function(h,g){var i=c.getUUID();h[g]=i;if(this._set(i,h)){this._records.push(i);if(!this._save()){if(this._rem(i)){this._records.pop()}else{this._throwError('Unable to rollback failed insertion of model "{0}"',i)}}else{this.log('Successfully inserted model "{0}"',i)}}return this._find(i)},_find:function(h){var g=this._storage.get(this._name+"-"+h);return g&&JSON.parse(g)},_findAll:function(){return this._records.map(function(g){return this._find(g)},this).filter(function(g){return g},this)},_update:function(i,h){var g;g=this._find(i);if(g){g=this._set(i,f.extend(g,h));if(g){g=this._find(i);if(g){this.log('Successfully updated model "{0}"',i)}}}return g},_remove:function(h){var g=this._rem(h);if(g){this._records=this._records.filter(function(i){return i!==h});if(!this._save()){if(this._set(h,g)){this._records.push(h.toString());g=null}else{this._throwError('Unable to rollback failed deletion of model "{0}"',h)}}else{this.log('Successfully removed model "{0}"',h)}}return g},_clear:function(){this._records.forEach(function(g){this._rem(g)},this);this._storage.rem(this._name);this._records.length=0},_throwError:function(){throw new Error(b.format("Store {0}: {1}",this._name,b.format.apply(null,arguments)))},sync:function(g,j,o){var h,n,m,i,k;if(g==="create"||g==="update"||g==="patch"){n=j.toJSON(o)}h=j.id;m=j.idAttribute;try{switch(g){case"read":i=f.is(h)?this._find(h):this._findAll();break;case"create":i=this._insert(n,m);break;case"update":case"patch":i=this._update(h,n);break;case"delete":i=this._remove(h);break;default:this._throwError('Unsupported method "{0}"',g)}}catch(l){k=l.message}if(i){if(o&&o.onComplete){o.onComplete(i)}}else{if(o&&o.onFailure){o.onFailure(k||b.format('Store "{0}": model "{1}" not found',this._name,h))}}return{cancel:function(){return}}}});return f.namespace("Store",d,a)});