define("DS/DELWebMfgAssetsDefDocumentModel/DocumentModel",["UWA/Core","UWA/Class/Model"],function(g,f){var a=f.extend({name:"DocumentModel",idAttribute:"id",init:function e(j,i){var h=Array.prototype.slice.call(arguments,0);if(j&&j.dataelements&&!(i&&i.parse)){this.collection=i&&i.collection;var k=this.parse(j);h[0]=k}this._parent.apply(this,h)},addFile:function c(h){this.get("relateddata").files.push(h)},modifyFile:function d(h,i){var j,k=this.get("relateddata").files;k.forEach(function(l){if(l.id===h){j=k.indexOf(l);k[j]=i}})},removeFile:function b(h){var i,j=this.get("relateddata").files;j.forEach(function(k){if(k.id===h){i=j.indexOf(k);j.splice(i,1)}})},});return a});define("DS/DELWebMfgAssetsDefDocumentModel/DocumentModelUtility",["UWA/Core","UWA/Class","DS/DELWebMfgAssetsDefModelServices/DocumentUtility","DS/DELWebMfgAssetsDefModelServices/ModelUtils","DS/DELWebMfgAssetsDefModelServices/IndexedDBUtils"],function(f,a,m,b,c){var d=a.singleton({appendDocIDsToDisplayModel:function j(r,q,s){var p,o=r.get("displayModel");if(f.is(o)){p=o.get("documentIDList");if(!Array.isArray(q)){q=[q]}p=JSON.parse(JSON.stringify(p));p=p.concat(q);p=p.filter(function(t,u){return p.indexOf(t)===u});r.setDisplayModel({documentIDList:p},s)}},deleteDocIDsFromDisplayModel:function i(s,q){var p,r,o=s.get("displayModel");if(f.is(o)){p=o.get("documentIDList");r=0;if(!f.is(q)){s.setDisplayModel({documentIDList:[]});return}if(!Array.isArray(q)){q=[q]}p=JSON.parse(JSON.stringify(p));for(r=0;r<q.length;r++){p.splice(p.indexOf(q[r]),1)}s.setDisplayModel({documentIDList:p})}},fetchDocumentUsingModel:function h(o){if(b.isStandAlone()||o.get("queriedForDocuments")){return}m.getDocumentID(o.id,{onComplete:function p(q){m.getDocumentInfo(q,{onComplete:function r(v){var u=0,s=v.data,t=[];m.collectionUtils.documentsConnection.remove(m.collectionUtils.documentsConnection.where({irpcID:o.id}));for(u=0;u<s.length;u++){m.collectionUtils.documents.add(s[u],{silent:true});m.collectionUtils.documentsConnection.add({ID:o.id+"|"+s[u].id,irpcID:o.id,docID:s[u].id},{silent:true});t.push(s[u].id)}d.appendDocIDsToDisplayModel(o,t);o.set("queriedForDocuments",true)}})}})},addDocumentToCollection:function l(p){var o=m.collectionUtils.documents.add(p);c.storeModel(o)},removeDocumentFromCollection:function n(p){var o=m.collectionUtils.documents.remove(p);c.removeModel(o)},addDocumentConnectionToCollection:function g(r,q,p){var o=m.collectionUtils.documentsConnection.add({ID:r,irpcID:p,docID:q});c.storeModel(o)},removeDocumentConnectionFromCollection:function e(p){var o=m.collectionUtils.documentsConnection.remove(p);c.storeModel(o)},isConnectionsExistsForDoc:function k(p){var o=m.collectionUtils.documentsConnection.where({docID:p});return o.length!==0}});return d});define("DS/DELWebMfgAssetsDefDocumentModel/DocumentModelCollection",["UWA/Core","UWA/Class/Collection","DS/DELWebMfgAssetsDefDocumentModel/DocumentModel"],function(f,d,c){var b=d.extend({model:c,init:function e(i,h){var g=Array.prototype.slice.call(arguments,0);if(i&&i.data&&!(h&&h.parse)){var j=this.parse(i);g[0]=j}this._parent.apply(this,g)},setup:function a(g,h){if(h){this._objectType=h.objectType}if(!this._dictionary){this._dictionary={}}if(this._objectType){this._dictionary[this._objectType]=this}return this._parent.apply(this,arguments)},});return b});