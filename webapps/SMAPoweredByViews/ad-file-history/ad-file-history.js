require(["DS/SMAPoweredByViews/Utils/ADDataFormatUtils","DS/SMAPoweredByState/ad-state-defs","i18n!DS/SMAPoweredByViews/assets/nls/ADFileHistory"],function(b,a,d){var c={COMMENTS_CHANGED:"commentsChanged",DOWNLOAD_VERSION:"downloadVersion",DELETE_VERSION:"deleteVersion"};DS.SMAPoweredByViews=DS.SMAPoweredByViews||{};DS.SMAPoweredByViews.ADFileHistory=window.Polymer({is:"ad-file-history",properties:{fileVersions:{type:Array,value:[]},isReadOnly:{type:Boolean,value:false},latestVersion:{type:String,value:null},latestVersionInvalid:{type:Boolean,value:false}},ready:function(){this.fire("polymerready")},_sortByVersion:function(f,e){var h=parseInt(f.version),g=parseInt(e.version);if(!isNaN(h)&&!isNaN(g)){return g-h}else{return 0}},_getFormattedDate:function(e){return b.timeAgo(e)},_getComments:function(e){return e?e:""},_getStatus:function(e){if(e===a.PersistenceOperation.DELETING){return d.Deleting}if(e===a.PersistenceOperation.UPDATING){return d.Saving}else{return""}},_isVersionInvalid:function(e){return(this.latestVersionInvalid&&(this.latestVersion===e))},_allowDeleteVersion:function(e){return((this.fileVersions.length>1)&&(this.latestVersion===e))},_showInvalidVersionMessage:function(e){return(this.latestVersionInvalid&&(this.latestVersion===e)&&(this.fileVersions.length>1))},_showInvalidFileMessage:function(e){return(this.latestVersionInvalid&&(this.latestVersion===e)&&(this.fileVersions.length<=1))},commentsChanged:function(g){var e=g.model.nextVersion,f=g.target.value;if(f!==e.comments){this.fire(c.COMMENTS_CHANGED,{fileVersion:e,newComment:f})}},downloadVersion:function(f){var e=f.model.nextVersion;this.fire(c.DOWNLOAD_VERSION,{fileVersion:e,zip:false})},downloadVersionZip:function(f){var e=f.model.nextVersion;this.fire(c.DOWNLOAD_VERSION,{fileVersion:e,zip:true})},deleteVersion:function(f){var e=f.model.nextVersion;this.fire(c.DELETE_VERSION,{fileVersion:e})},behaviors:[DS.SMAProcSP.SPBase]});DS.SMAPoweredByViews.ADFileHistory.EVENTS=c});