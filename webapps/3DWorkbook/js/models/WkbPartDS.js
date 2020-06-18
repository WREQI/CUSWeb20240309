define("DS/3DWorkbook/js/models/WkbPartDS",["UWA/Core","UWA/Class","UWA/Utils","UWA/Data","UWA/Promise","DS/3DWorkbook/js/models/WkbAttributeConfig","DS/3DWorkbook/js/models/WkbPart","DS/3DWorkbook/js/WkbUtils"],function(f,o,l,p,n,j,a,c){function k(r){var q={input_physical_ids:r,primitives:[{navigate_from_sr:{id:2,filter:{role:["52"],category:["7"]},mode:"ends"},navigate_to_sr:{id:3,filter:{role:["51"],category:["5"]},mode:"path"}},{navigate_from_sr:{id:4,filter:{role:["52"],category:["7"]},mode:"ends"},navigate_to_sr:{id:5,filter:{role:["51"],category:["5"]},mode:"last"},navigate_to_rel:{id:6,mode:"return_rel"}}],patterns:{instancePaths:[{id:2},{id:3}],instanceToReferenceRelations:[{id:4},{id:5},{id:6}]},fileAttributes:[],flags:[],version:3,label:"instancesJson"};q=JSON.stringify(q);return q}function i(s,q){var r={input_physical_ids:s,primitives:[{navigate_from_sr:{id:2,filter:{role:["52"],category:["7"]},mode:"ends"},navigate_to_sr:{id:3,filter:{role:["51"],category:["5"]},mode:"last"},navigate_to_rel:{id:4,mode:"stop_at_bo"}}],patterns:{references:[{id:2},{id:3},{id:4}]},attributes:q,fileAttributes:[],version:3,label:"partsJson"};var t=JSON.stringify(r);return t}function d(r,t){var s=0,q=0;var v=[];var u=0;var w=t;for(q=0;q<t.length;q+=1){w=t[q].outputs.instanceToReferenceRelations;if(!f.is(w)){continue}for(s=0;s<w.length;s+=1){if(w[s].to.physicalid===r){u+=1;if(u<20){v.push(w[s])}else{v=[];break}}}s+=1;for(s;s<w.length;s+=1){if(w[s].to.physicalid===r){u+=1}}if(u>19){v.quantity=u}}return v}function e(s){var r=0,q=0;var v=null;var t=null;var u=[];for(q;q<s.length;q+=1){v=s[q].outputs.instancePaths;if(!f.is(v)){continue}for(r=0;r<v.length;r+=1){t=v[r].elements;u[t[t.length-1].physicalid]=t}}return u}function h(q){var r=0;if(!f.is(q.result)){return false}for(r=0;r<q.result.length;r+=1){if(f.is(q.result[r].outputs.references)){return true}}return false}var b=o.extend({init:function(q){j.setConfig(q)},getPartsData:function(t,r,q){var s=this;if(!f.is(t)||t.length===0){return new n(function(v,u){v([])})}return new n(function(y,x){var v=j.getAttributes("part");var u=j.addDefaultAttributes(v);var w=i(t,u);y(w)})["then"](function(v){var u=r+"cvservlet/navigate?SecurityContext="+encodeURIComponent(q);return c.serverRequestPromise(u,"json","POST",v)})["then"](function(u){return s.addInstancesData(t,u,r,q)})["then"](function(u){return new n(function(x,w){var v=null;if(u.references.length>0){v=s.transformToPartData(u)}x(v)})})["catch"](function(u){console.log(u)})},addInstancesData:function g(t,q,s,r){return new n(function(B,D){var x=0;var w=null;var y=[];if(!h(q)){w={references:q,instances:{result:[]}};B(w)}var A=q.result;var C=k(t);var u=s+"cvservlet/navigate?SecurityContext="+encodeURIComponent(r);c.serverRequestPromise(u,"json","POST",C).then(function z(E){var F={references:q.result,instances:E.result};B(F)},function v(E){D(E)})})},transformToPartData:function m(z){var x=0;var w=0;var C={};var u,s;var D={config:j.attributeConfig.part};var t={};var r=[];var q={};var v={};var y=e(z.instances);if(!f.is(z.references)||z.references.length===0){return[]}var B=function(E){q=new a(D);v.elements=y[E.physicalid];q.loadWithIndexData(u,E,v,1);r.push(q)};for(var w=0;w<z.references.length;w++){var A=z.references[w].outputs.references;if(!f.is(A)){continue}for(x=0;x<A.length;x+=1){u=A[x];if(f.is(C[u.physicalid])){continue}C[u.physicalid]=1;s=d(u.physicalid,z.instances);if(f.is(s.quantity)){q=new a(D);q.loadWithIndexData(u,t,t,s.quantity);r.push(q)}else{s.forEach(B)}}}return r}});return b});