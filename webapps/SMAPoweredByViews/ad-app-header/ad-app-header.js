(function(h){var f,a,j={JOBS:0,FILES:1},d=function(){this.$.spSearch.addEventListener("change",function(l){l.stopPropagation();l.cancelBubble=true;this.fire("addreference",l.detail.getSelectedObjects())}.bind(this))},e=function(){this.fire("uploadfiles",{})},c=function(){this.$.spSearch.plmTypes="3DShape, Chapter, DesignSight, FEM, GenerativeStress, Material,PLMCoreRepReference, PLMReference, Part, PlmParameter, Products, Requirement, SpotFastener, Test Case, Use Case, VPMReference, XRep, DOCUMENTS";this.$.spSearch.multiSelect=true;this.$.spSearch.search()},g=function(){this.fire("openstudyproperties")},i=function(){this.fire("refreshapp")},k=function(){this.fire("closestudy",{})},b=function(m){var l=new a({target:m,items:[{text:f.Refresh,fonticon:"reload",handler:i.bind(this)},{className:"divider"},{text:f.AddFiles,name:"AddFiles",fonticon:"plus",items:[{text:f.UploadFiles,fonticon:"upload",handler:e.bind(this)},{text:f.AddReference,fonticon:"search",handler:c.bind(this)}]},{className:"divider"},{text:f.EditProperties,name:"EditProperties",fonticon:"pencil",handler:g.bind(this)},{text:f.CloseStudy,fonticon:"close",handler:k.bind(this)}]});this.dropDwnMenu=l};DS.SMAPoweredByViews=DS.SMAPoweredByViews||{};DS.SMAPoweredByViews.ADAppHeader=h.Polymer({is:"ad-app-header",properties:{study:{type:Object,value:{}},isReadOnly:{type:Boolean,observer:"isReadOnlyChanged"}},createJob:function(){this.fire("createjob",{});this.switchCollection(j.JOBS,true)},collectionFacetClicked:function(m){var l=m.currentTarget.id==="files"?j.FILES:j.JOBS;this.switchCollection(l,true)},switchCollection:function(l,m){if(l===j.FILES){this.$.jobs.classList.remove("selected");this.$.files.classList.add("selected")}else{if(l===j.JOBS){this.$.jobs.classList.add("selected");this.$.files.classList.remove("selected")}else{throw new Error("Unknown collection index")}}if(m){this.fire("switchcollection",{switchto:l})}},ready:function(){var l=this;this.isReady=new Promise(function(m){require(["DS/UIKIT/DropdownMenu","i18n!DS/SMAPoweredByViews/assets/nls/ADAppHeader"],function(n,o){a=n;f=o;b.apply(l,[l.$.menu]);document.addEventListener("mouseleave",function(){l.dropDwnMenu.hide()});d.apply(l);m()})})},onEditStudy:function(){g.apply(this)},_getStudyDescription:function(l){if(l){this.$.description.classList.remove("notSet");return l}else{if(f){this.$.description.classList.add("notSet");return f.StudyDescriptionPlaceholder}else{return""}}},isReadOnlyChanged:function(l){if(l){this.dropDwnMenu.disableItem("AddFiles");this.dropDwnMenu.disableItem("EditProperties")}else{this.dropDwnMenu.enableItem("AddFiles");this.dropDwnMenu.enableItem("EditProperties")}},behaviors:[DS.SMAProcSP.SPBase]});DS.SMAPoweredByViews.ADAppHeader.CollectionIndex=j}(this));