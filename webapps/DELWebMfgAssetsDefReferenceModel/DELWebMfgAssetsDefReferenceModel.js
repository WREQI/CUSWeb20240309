define("DS/DELWebMfgAssetsDefReferenceModel/ReferenceModel",["UWA/Core","DS/Logger/Logger","DS/DELWebMfgAssetsDefModelServices/AbstractIRPCModel","DS/DELWebMfgAssetsDefModelServices/ModelUtils"],function(i,d,e,c){var j=e.extend({name:"ReferenceModel",_logger:null,urlRoot:function b(){return c.getWebServicesURL()+"/reference"},defaults:{queriedForDocuments:false,queriedForChildren:false,queriedForConnections:false},setup:function f(n,o){this._parent.apply(this,arguments);this.listenTo(this,this._modelEvents);this._additionalInfo={};if(i.is(o)&&i.is(o.ds6w)){this.setAdditionalInfo({ds6w:o.ds6w})}if(i.is(c.referenceModelSetup)){c.referenceModelSetup(this,o)}},isSystem:function l(){var o,n=this.get("PPRTYPE");if(i.is(n)){if(n==="SYSTEM"||n==="OPERATION"){o=true}else{o=false}}return o},isProcess:function k(){var o,n=this.get("PPRTYPE");if(i.is(n)){if(n==="PROCESS"){o=true}else{o=false}}return o},isResource:function a(){var o,n=this.get("PPRTYPE");if(i.is(n)){if(n==="RESOURCE"){o=true}else{o=false}}return o},isProduct:function h(){var o=false,n=this.get("PPRTYPE");if(i.is(n)&&(n==="PRODUCT")){o=true}return o},isPart:function m(){var o=false,n=this.get("PPRTYPE");if(i.is(n)&&(n==="PART")){o=true}return o},parse:function g(p,r){var t,s,o=this._parent.apply(this,arguments),q,n;if(i.is(d)){this._logger=d.getLogger(j)}if(!o){return}if(i.is(c.referenceModelParse)){c.referenceModelParse(this,o,r)}if(i.is(r.queriedForDocuments)){o.queriedForDocuments=r.queriedForDocuments}if(i.is(r.queriedForChildren)){o.queriedForChildren=r.queriedForChildren}if(i.is(r.queriedForConnections)){o.queriedForConnections=r.queriedForConnections}if(c.isStandAlone()===true){if(i.is(r.data)){t=i.Json.decode(r.data);for(s in t){if(t.hasOwnProperty(s)&&s.contains(".")){q=s.split(".")[1];o[q]=t[s]}}}}if(!o.PID){n=c.translatePredicateToAttribute(o,{type:"entity",fromExpandService:o._results});o=i.merge(o,n)}return o}});j.setDisplayModelClass=function(n){this._DisplayModelClass=n};return j});define("DS/DELWebMfgAssetsDefReferenceModel/AbstractReferenceDisplayModel",["UWA/Core","DS/Logger/Logger","UWA/Class/Debug","DS/DELWebMfgAssetsDefModelServices/AbstractDisplayModel","DS/DELWebMfgAssetsDefModelServices/CollectionUtils","DS/DELWebMfgAssetsDefModelServices/ModelUtils"],function(h,b,g,f,d,c){var e=f.extend(g,{defaults:{asRootInTableView:false,selectedFor3DView:false},_modelEvents:{"onChange:selectedFor3DView":function(i,j){if(j){d.add3DContentFromMBOM(i._referenceModel.id)}else{d.remove3DContentFromMBOM(i._referenceModel.id)}}},setup:function a(i,j){this._parent(i,j);if(j&&j.model){this._referenceModel=j.model}this.listenTo(this,this._modelEvents);if(h.is(c.referenceDisplayModelSetup)){c.referenceDisplayModelSetup(this,j)}}});return e});define("DS/DELWebMfgAssetsDefReferenceModel/ReferenceCollection",["UWA/Core","DS/Logger/Logger","DS/DELWebMfgAssetsDefReferenceModel/ReferenceModel","DS/DELWebMfgAssetsDefModelServices/ModelUtils","DS/DELWebMfgAssetsDefModelServices/AbstractIRPCCollection"],function(f,b,e,c,a){var d=a.extend({name:"ReferenceCollection",_logger:null,model:e,_collectionEvents:{onRemove:function(h){var j,l,k=widget.CollectionUtils.getInstancesFromCollection(h.id),g=widget.CollectionUtils.getInstancesOfReference(h.id);for(j=0;j<g.length;j++){widget.CollectionUtils.instances.remove(g[j],{reason:"fromInstanceRemoval"})}for(j=0;j<k.length;j++){widget.CollectionUtils.instances.remove(k[j],{reason:"fromInstanceRemoval"})}l=widget.CollectionUtils.getImpactedConnections(h.id);if(f.is(l)){for(j=0;j<l.length;j++){widget.CollectionUtils.connections.remove(l[j].id,{reason:"fromConnectionRemoval"})}}return this}},setup:function(){if(f.is(b)){this._logger=b.getLogger(d)}this.listenTo(this,this._collectionEvents)},url:function(){return c.getWebServicesURL()+"/reference"}});return d});define("DS/DELWebMfgAssetsDefReferenceModel/ReferenceDisplayModel",["UWA/Core","UWA/Class/Debug","DS/Logger/Logger","DS/DELWebMfgAssetsDefReferenceModel/AbstractReferenceDisplayModel","DS/DELWebMfgAssetsDefModelServices/ModelPreferences","DS/DELWebMfgAssetsDefModelServices/CollectionUtils"],function(g,n,c,k,e,l){var h=k.extend(n,{defaults:{nodesInTableView:0,nodesInLeftBloc:0,nodesInRightBloc:0,refCountLeftBloc:0,refCountRightBloc:0,asRootInAuxiliaryView:false,selectedInAuxiliaryView:false,connectionModelInfo:[],documentIDList:[]},_modelEvents:{"onChange:nodesInTableView":function(p){this.handleLinkedObjectsCounter(p._referenceModel,"nodesInTableView",true);return this},"onChange:asRootInTableView":function(p){this.handleLinkedObjectsCounter(p._referenceModel,"asRootInTableView",false);return this}},setup:function f(p,q){this._parent(p,q)},validate:function m(p){var s,r,q={};if(g.is(this._referenceModel)){s=this._referenceModel.get("V_Name");r=this._referenceModel.get("PPRTYPE")}if(p.asRootInTableView){if(!this._referenceModel.isSystem()){q.key="PPRType";q.param="referencePPRType";q.paramValue=r;return q}}if((this.get("asRootInTableView")&&p.asRootInTableView)||(this.get("asRootInAuxiliaryView")&&p.asRootInAuxiliaryView)){q.key="AlreadyRoot";q.param="referenceName";q.paramValue=s;return q}},getInt:function b(p){var q=this.get(p);if(p==="asRootInTableView"){if(q){q=1}else{q=0}}return q},previousInt:function i(p){var q=this.previous(p);if(p==="asRootInTableView"){if(q){q=1}else{q=0}}return q},incrementCounter:function a(s,q){var r=this.get(s),p={};q=q||{};r++;p[s]=r;if(g.is(q.silent)&&q.silent){this.set(p,q)}else{this._referenceModel.setDisplayModel(p,q)}},decrementCounter:function j(s,q){var r=this.get(s),p={};q=q||{};if(r>0){r--;p[s]=r;if(g.is(q.silent)&&q.silent){this.set(p)}else{this._referenceModel.setDisplayModel(p,q)}}},handleLinkedObjectsCounter:function d(p,r,s,q){q=q||{};if(g.is(e)){if(g.is(e.LeftBloc)){if(e.LeftBloc.considerAllNodes===s){this._handleRefCountOfLinkedObjects(p,"refCountLeftBloc",r,e.LeftBloc.ConnectionTypes,q)}}if(g.is(e.RightBloc)){if(e.RightBloc.considerAllNodes===s){this._handleRefCountOfLinkedObjects(p,"refCountRightBloc",r,e.RightBloc.ConnectionTypes,q)}}}},_handleRefCountOfLinkedObjects:function o(t,r,q,y,x){var w,u,s,p;if(g.is(y)&&t.isSystem()){u=this.getInt(q);s=this.previousInt(q);if((s>0&&u===0)||(s===0&&u>0)){l.getConnectionsByModel(t,null,null,true,function v(z){z.forEach(function A(B){w=B.get("type");if(y.hasOwnProperty(w)){p=l.references.get(B.get("to"));if(g.is(p)){if(s>0&&u===0){p.decrementDisplayModelCounter(r,x)}else{if(u>0){p.incrementDisplayModelCounter(r,x)}}}}})})}}},});return h});