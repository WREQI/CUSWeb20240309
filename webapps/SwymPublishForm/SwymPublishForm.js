define("DS/SwymPublishForm/script/publish-form-view",["UWA/Core","UWA/Utils/Client","DS/SwymUICore/script/feature/core/config/bootstrap-model","DS/SwymUICore/script/lib/view/generic/swym-view","DS/UIKIT/Input/Button","DS/UIKIT/Input/Select","DS/UIKIT/Input/Toggle","DS/UIKIT/Input/Text","DS/UIKIT/Alert","DS/SwymUICore/script/feature/community/community/collection/community-collection","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","i18n!DS/SwymPublishForm/assets/nls/publish-form-view","DS/WAFData/WAFData","DS/SwymUICore/script/utils/i18n","DS/CKEditor/CKEditor","css!SwymPublishForm/SwymPublishForm"],function(a,l,p,j,g,h,i,o,d,c,e,f,b,m,n){var r=document,k=j.extend({_description:"",_createContent:function(){return{"class":"content-body",html:this._description}},getDescription:function(){return this._description},_formatDescription:function(w){var v=this,u="p;h1;h2;ul;li;ol;i;u;s;strong;blockquote;em;table[*]{*};caption;ythead[*]{*};tbody[*]{*};th[*]{*};tr[*]{*};td[*]{*};br;figcaption;pre;span(marker);b",s=u+";a[data-type,data-content-type,data-content-id,data-community-id,data-login,desc,url,href,target,contenteditable,data-predicate](*);figure[data-size,data-position](*){*};img[data-media-pasted-id,data-media-id,data-community-id,ds_height,width,height,data-media-type,style,class,title,longDesc,src,data-size,data-position,data-media_cid,data-new_media,data-content-thumbnail,data-deleted-media](*){*}",x=new n.htmlParser.basicWriter(),t=new n.htmlParser.fragment.fromHtml(w,undefined,false);new n.filter(s).applyTo(t);t.writeHtml(x);v._description=x.getHtml();return v._description},setup:function(s){var t=this;t._description=t._formatDescription(s.description);t._parent.apply(t,arguments)}}),q=j.extend({name:"publish-form-view",_mode:"automatic",_currentType:"media",_currentCommunityId:null,_currentCommunityTitle:null,_communityListLoaded:false,_platformListLoaded:false,_config:{mode:"automatic",isDescriptionHTML:false},_currentPlatformUrl:null,_dmList:null,_currentThreadType:null,_createContent:function(){var t=this;var s={"class":"publish-form",html:[{"class":"publish-form-body",html:[{"class":"platform-select-cnt",html:t.getControl("platformSelect")},{"class":"thread-selector-cnt",html:[t.getControl("ctyToggle"),t.getControl("dmToggle")]},{"class":"types-button-group-cnt",html:t.getControl("buttonGroupType")},{"class":"community-select-cnt",html:t.getControl("communitySelect")},{"class":"dm-select-cnt",html:t._createDMSelect()},{"class":"alert-message alert-warning",html:f.Thereisnocommunitywhereyoucancreatethiscontent},{"class":"alert-message alert-warning alert-warning-dm",html:f.Youhavenoconversationyet},{"class":"title-input-cnt",html:t.getControl("titleInput")},(t.getControl("descriptionInput")?{"class":"description-input-cnt"+(t._config.isDescriptionHTML!==true?"":" preview"),html:t.getControl("descriptionInput")}:""),{"class":"base64-image-container",html:(t._config.base64image?'<img width="100%" src="'+t._config.base64image+'"/>':"")},(t._config.isDescriptionHTML!==true?{"class":"note-cnt",html:f.Note}:"")]},{"class":"footer-cnt",html:[{"class":"button-cnt",html:t.addControl("cancelButton",new g({className:"cancel-share-button default",value:f.Cancel,events:{onClick:function(){if(t._mode!=="automatic"){t._sendEvent("CancelShare","Cancel share")}else{if(t._config.onCancel){t._config.onCancel()}else{t.hide()}}}}}))},{"class":"button-cnt",html:t._publishButton}]}]};return s},setContentTitle:function(s){if(a.is(s)){this.getControl("titleInput").setValue(s)}else{console.error("PublishFormView: No title param set");throw"PublishFormView: No title param set"}},setContentDescription:function(s){if(a.is(s)){if(this._config.isDescriptionHTML!==true){this.getControl("descriptionInput").setValue(s)}else{}}else{console.error("PublishFormView: No description param set");throw"PublishFormView: No description param set"}},setBase64image:function(s){if(s){this._config.base64image=s;this.getElement(".base64-image-container").setHTML('<img width="100%" src="'+this._config.base64image+'"/>')}else{console.error("PublishFormView: No base64image param set");throw"PublishFormView: No base64image param set"}},setImageTitle:function(s){if(s){this._config.title=s}else{console.error("PublishFormView: No title param set");throw"PublishFormView: No title param set"}console.warn("PublishFormView: setImageTitle is deprecated, please use title param in the constructor")},setImageDescription:function(s){if(s){this._config.description=s}console.warn("PublishFormView: setImageDescription is deprecated, please use description param in the constructor")},createContent:function(u,s){var t=this;require(["DS/SwymUICore/script/lib/model/generic/swym-model"],function(v){require([v.getModuleNameFromModelName(t._currentType)],function(w){if(t._currentCommunityId&&t._currentType){var x=null,z=function(C,B){C.save((B==="media"?{}:{community_id:t._currentCommunityId}),{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()},onComplete:function(){if(s&&a.is(s.disabled)){s.disabled=false}else{if(t._publishButton){t._publishButton.setDisabled(false)}}t.unmask();t.setContentTitle("");if(t._config.isDescriptionHTML!==true){t.setContentDescription("")}if(t._mode!=="automatic"){t._sendEvent("ContentCreated",JSON.stringify({success:true}))}else{if(t._config.onContentCreated){t.alert("success",m.replace(f.Yourcontenthasbeenpublishedin,{communityTitle:t._currentCommunityTitle}));t._config.onContentCreated()}else{t.alert("success",m.replace(f.Yourcontenthasbeenpublishedin,{communityTitle:t._currentCommunityTitle}));t.hide()}}},onFailure:function(){if(s){s.disabled=false}else{t._publishButton.setDisabled(false)}t.unmask();if(t._mode!=="automatic"){t._sendEvent("ContentCreated",JSON.stringify({success:false,message:f.Errorcannotsaveyourcontent}))}else{t._showAlertMessage("error",f.Errorcannotsaveyourcontent)}}})},y=(t._config.isDescriptionHTML!==true?t.getControl("descriptionInput").getValue():t._config.contentDescription),A=t.getControl("titleInput").getValue();if(y&&t._config.isDescriptionHTML!==true){y=y.escapeHTML();y="<p>"+y.replace(/\n/g,"</p><p>")+"</p>"}switch(t._currentType){case"post":case"iquestion":case"idea":x=new w({},{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()},urlRoot:t._currentPlatformUrl});if(u){x.addChanges("content",y+'<p><img data-source="swym" data-media-id="'+u+'" width="320"></p>')}else{x.addChanges("content",y)}x.addChanges("title",A);x.addChanges("published",1);z(x,t._currentType);break;case"media":if(u){x=new w({id:u},{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()},urlRoot:t._currentPlatformUrl,autoPopulate:true,onPopulate:function(B){B.addChanges("description",y);B.addChanges("title",A);x.addChanges("published",1);z(B,t._currentType)},onFailure:function(){if(t._mode!=="automatic"){t._sendEvent("ContentCreated",JSON.stringify({success:false,message:f.Errorcannotloadyourmedia}))}else{t._showAlertMessage("error",f.Errorcannotloadyourmedia)}}})}break}}else{if(t._mode!=="automatic"){t._sendEvent("ContentCreated",JSON.stringify({success:false,message:f.Errormissingparameters}))}}})})},_displaySuccessMessage:function(){that.alert("success",m.replace(f.Yourcontenthasbeenpublishedin,{communityTitle:that._currentCommunityTitle}))},_fetchDMList:function(){var s=this;if(this._dmList===null){require(["DS/SwymUICore/script/feature/thread/collection/thread-lite-collection"],function(t){s._dmList=new t([],{mode:"conversation",urlRoot:s._currentPlatformUrl});s._dmList.fetch({headers:{"X-DS-SWYM-CSRFTOKEN":s._bootstrapModel.getCSRFToken()},onComplete:function(x){var v=s.getControl("dmSelect"),w=s.getControl("communitySelect"),u=[];if(x.length>0){s.getElement(".alert-message.alert-warning-dm").setStyle("display","none");v.show();w.hide();x.forEach(function(y){if(!y.get("is_hidden")){u.push({label:y.getMembersTitle(s._bootstrapModel.get("user").login),value:y.get("mid")})}});if(u.length>0){u[0].selected=true;s._currentCommunityId=u[0].value;v.remove();v.add(u)}else{s._displayNoDMMessage()}}else{s._displayNoDMMessage()}}})})}},_displayNoDMMessage:function(){var s=this.getControl("dmSelect"),t=this.getControl("communitySelect");this.getElement(".alert-message.alert-warning-dm").setStyle("display","block");s.disable();s.hide();t.hide()},_createDMSelect:function(){var t=this;var s=this.addControl("dmSelect",new h({className:"dm-combo",placeholder:f.Selectadm,options:[],events:{onChange:function(){var u=t.getControl("dmSelect");if(u&&u.getValue()&&u.getValue()[0]&&u.getValue()[0]!==""){u.elements.choices.removeAttribute("style");t._currentCommunityId=u.getValue()[0];t._currentCommunityTitle=u.getSelection()[0].innerHTML}else{if(u){u.elements.choices.setStyle("border","1px solid #d0432b");t._currentCommunityId=null;t._currentCommunityTitle=null}}}}}));return s},_fetchCommunityList:function(){var t=this,s=t._currentType;t._communityList=new c([],{mode:"communities-with-rights",limit:999,modelParam:(s==="idea"?"ideation":s),urlRoot:t._currentPlatformUrl});t._communityList.fetch({headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()},onComplete:function(v){var u=t.getControl("communitySelect"),w=[];if(v.length>0){t.getElement(".alert-message").setStyle("display","none");u.show();v.forEach(function(x){w.push({label:x.get("title",{escapeHTML:false}),value:x.get("mid")})});w[0].selected=true;t._currentCommunityId=w[0].value;u.remove();u.add(w);u.setDisabled(false)}else{t.getElement(".alert-message").setStyle("display","block");if(!l.Platform.ios){u.hide()}}t.getControl("buttonGroupType").setDisabled(false);t._communityListLoaded=true;if(t._communityListLoaded&&t._platformListLoaded){t.unmask()}}})},_setCurrentPlatformURL:function(s){var t=this;t._currentPlatformUrl=s;t._bootstrapModel.loaded=false;t._bootstrapModel.initialize(null,{baseUrl:t._currentPlatformUrl}).executeWhenReady(function(){t._fetchCommunityList();if(t._dmList!==null){t._fetchDMList()}})},_processPlatforms:function(s){var y=[],u,z,w,t=this._config,v=this,x=t.platformId||t.platformUrl;if(s.length>0){s.forEach(function(A){u=!A.url?A.hasOwnProperty("3DSwym")&&A["3DSwym"]:A.url;z=A.platformId||A.id;y.push({id:z,label:A.displayName||A.label,value:u});if((x&&(z===x||x.toLowerCase().contains(u.substring(0,u.length-1))))||(v._mode==="catia"&&u.contains(document.location.host))){w=u}});v.getControl("platformSelect").add(y);if(y.length===1){v.getControl("platformSelect").hide()}else{v.getControl("platformSelect").show()}if(w){v.getControl("platformSelect").select(w,true,true);v._setCurrentPlatformURL(w)}else{v.getControl("platformSelect").select(1)}v.getControl("platformSelect").setDisabled(false);v._platformListLoaded=true}else{throw"Platform list can't be empty"}},_getPlatformServices:function(t,s){var u=this;e.getPlatformServices({config:{myAppsBaseUrl:t,userId:s},onComplete:function(v){u._processPlatforms(v)},onFailure:function(){throw"Error while fetching platform from MyApps"}})},_fetchPlatformList:function(){var s=this;if(this._config.platforms){this._processPlatforms(this._config.platforms)}else{if(this._mode==="catia"){require(["DS/PlatformAPI/PlatformAPI"],function(t){s._getPlatformServices(t.getApplicationConfiguration("app.urls.myapps"),p.getInstance().get("user").login)})}else{s._getPlatformServices()}}},_sendEvent:function(t,v){if(this._mode==="catia"){var s=r.createElement("textarea"),u=r.createElement("form");s.setAttribute("name",t);s.appendChild(r.createTextNode(v));u.setAttribute("method","POST");u.setAttribute("action","jsnotif://");u.appendChild(s);r.documentElement.appendChild(u);u.submit();u.parentNode.removeChild(u);u=null}else{this.dispatchEvent(t,v)}},_uploadImage:function(u){var v=this,s=new Blob([v._config.base64image.split(",")[1]],{type:v._config.base64image.split(",")[0],"Content-Transfer-Encoding":"base64"}),t=new FormData();t.append("base64_encoded",1);t.append("description",v._config.description||(v._config.isDescriptionHTML!==true?v.getControl("descriptionInput").getValue():v._config.contentDescription));t.append("title",v._config.title||v.getControl("titleInput").getValue());t.append("published",1);t.append("community_id",v._currentCommunityId);t.append("userFile",s,v._config.title+"."+v._config.base64imageExtension);if(v._currentType!=="media"){t.append("is_illustration",1)}b.authenticatedRequest(v._currentPlatformUrl+"/api/media/addmedia",{data:t,method:"POST",timeout:60000,onComplete:function(x){var w=(typeof x==="object"?x:JSON.parse(x));if(w.errorcode){v._showAlertMessage("error",f.Errorcannotsaveyourmedia);if(u&&a.is(u.disabled)){u.disabled=false}else{if(v._publishButton){v._publishButton.setDisabled(false)}}v.unmask()}else{v.createContent(w.result.mediaUploaded.id_media,u)}}})},_showAlertMessage:function(s,t){if(!this.alertComponent){this.alertComponent=new d({visible:true,autoHide:true,hideDelay:3000});this.alertComponent.inject(this.container,"top")}this.alertComponent.add({className:s,message:t})},_createThreadSelector:function(){this._ctyToggle=this.addControl("ctyToggle",new i({name:"thread",value:"community",className:"primary checked",label:f.Community,checked:true}));this._dmToggle=this.addControl("dmToggle",new i({name:"thread",value:"dm",className:"primary",label:f.Conversation}));this._ctyToggle.addEvent("onChange",this._onCtyToggleChange.bind(this));this._dmToggle.addEvent("onChange",this._onDMToggleChange.bind(this))},_onCtyToggleChange:function(){var t=this.getControl("dmSelect"),u=this.getControl("communitySelect"),s=this.getControl("buttonGroupType");if(this._ctyToggle.isChecked()){this._ctyToggle.elements.container.classList.add("checked");this._dmToggle.elements.container.classList.remove("checked");u.show();t.hide();this._currentThreadType="community";this.getElement(".alert-message.alert-warning-dm").setStyle("display","none")}s.updateOptions()},_onDMToggleChange:function(){var t=this.getControl("dmSelect"),u=this.getControl("communitySelect"),s=this.getControl("buttonGroupType");if(this._dmToggle.isChecked()){this._dmToggle.elements.container.classList.add("checked");this._ctyToggle.elements.container.classList.remove("checked");u.hide();t.show();this._currentThreadType="dm";this.getElement(".alert-message.alert-warning").setStyle("display","none")}s.updateOptions();if(this._dmList===null){this._fetchDMList()}else{this._currentCommunityId=t.getValue()[0];this._currentCommunityTitle=t.getSelection()[0].innerHTML}},_createTypeSelector:function(t){var v=this,u=[{modelName:"media",value:f.Media,selected:true},{modelName:"post",value:f.Post},{modelName:"iquestion",value:f.iQuestion},{modelName:"idea",value:f.Idea}];if(this._mode==="automatic"&&t.hasOwnProperty("isDescriptionHTML")&&t.isDescriptionHTML===true&&!t.hasOwnProperty("base64image")){u.shift();u[0].selected=true;v._currentType=u[0].modelName}var s=this.addControl("buttonGroupType",new h({disabled:true,placeholder:f.Selectacontenttype,options:u,events:{onChange:function(x){var w=v.getControl("buttonGroupType");if(w&&w.getValue()&&w.getValue()[0]&&w.getValue()[0]!==""){var y=w.options.options.filter(function(z){return z.value===w.getValue()[0]});if(y[0]){v._currentType=y[0].modelName}w.elements.choices.removeAttribute("style");if(v._currentThreadType==="community"){w.setDisabled(true);v.getControl("communitySelect").setDisabled(true);v._fetchCommunityList()}}else{if(w){w.elements.choices.setStyle("border","1px solid #d0432b");v._currentType=null}}}}}));s.updateOptions=function(){s.remove();if(v._currentThreadType==="community"){s.add(u)}else{s.add([{modelName:"media",value:f.Media,selected:true},{modelName:"post",value:f.Post}])}}},setup:function(s){var t=this,u=null;if(s){t._config=s}this._currentThreadType="community";if(t._config.mode==="base64"){t._mode="automatic";t._config.mode=t._mode;console.warn("PublishFormView: base64 mode is deprecated, please don't define it or use 'automatic' instead")}else{if(a.is(t._config.mode)&&t._config.mode!=="automatic"){t._mode=t._config.mode}}t._config.isDescriptionHTML=false;if(t._config.hasOwnProperty("base64image")){if(!t._config.hasOwnProperty("title")){console.error("PublishFormView: title must be defined if base64image is set");throw"PublishFormView: title must be defined if base64image is set"}if(!t._config.hasOwnProperty("base64imageExtension")){t._config.base64imageExtension="png"}}if(s.content_title){console.warn("PublishFormView: content_title is deprecated, please use contentTitle instead of content_title");s.contentTitle=s.content_title}if(s.content_description){console.warn("PublishFormView: content_description is deprecated, please use contentDescription instead of content_description");s.contentDescription=s.content_description}if(s.platformUrl){console.warn("PublishFormView: platformUrl is deprecated, please use platformId instead of platformUrl")}if(s.platforms){s.platforms.forEach(function(v){if(!v.id||!v.label||!v.url){throw new Error("Each plaform must contain the properties id, label and url")}})}t._bootstrapModel=new p();t.reactTo(t._bootstrapModel,"onFailure",function(){t._showAlertMessage("error",f.Lookslikeyoudonthaveaccesstothisplatform);if(t.getControl("communitySelect")){t.getControl("communitySelect").hide()}t.unmask()});t._parent.apply(t,arguments);this._createThreadSelector();this._createTypeSelector(s);t.addControl("communitySelect",new h({className:"community-combo",disabled:true,placeholder:f.Selectacommunity,options:[],events:{onChange:function(){var v=t.getControl("communitySelect");if(v&&v.getValue()&&v.getValue()[0]&&v.getValue()[0]!==""){v.elements.choices.removeAttribute("style");t._currentCommunityId=v.getValue()[0];t._currentCommunityTitle=v.getSelection()[0].innerHTML}else{if(v){v.elements.choices.setStyle("border","1px solid #d0432b");t._currentCommunityId=null;t._currentCommunityTitle=null}}}}}));t.addControl("titleInput",new o({placeholder:f.Title,value:t._config.contentTitle||"",maxlength:255,events:{onChange:function(){if(this.getValue().trim()===""){this.getContent().setStyle("border","1px solid #d0432b")}else{this.getContent().removeAttribute("style")}}}}));if(t._config.isDescriptionHTML!==true){t.addControl("descriptionInput",new o({multiline:true,placeholder:f.Description,value:t._config.contentDescription||"",events:{onChange:function(){if(this.getValue().trim()===""){this.getContent().setStyle("border","1px solid #d0432b")}else{this.getContent().removeAttribute("style")}}}}))}else{if(t._config.contentDescription){u=t.addControl("descriptionInput",new k({addScroller:true,description:t._config.contentDescription}));t._config.contentDescription=u.getDescription()}}t._publishButton=t.addControl("publishButton",new g({className:"publish-share-button primary",value:f.Publish,events:{onClick:function(v){var x=true,w;if(v.target&&a.is(v.target.disabled)){v.target.disabled=true}else{if(t._publishButton){t._publishButton.setDisabled(true)}}w=t.getControl("titleInput");if(w&&w.getValue().trim()===""){x=false;w.getContent().setStyle("border","1px solid #d0432b")}if(t._config.isDescriptionHTML!==true){w=t.getControl("descriptionInput");if(w&&w.getValue().trim()===""){x=false;w.getContent().setStyle("border","1px solid #d0432b")}}if(!t.getControl("platformSelect").getValue()[0]){x=false;t.getControl("platformSelect").elements.choices.setStyle("border","1px solid #d0432b")}if(!t.getControl("communitySelect").getValue()[0]){x=false;t.getControl("communitySelect").elements.choices.setStyle("border","1px solid #d0432b")}if(x===true){t.mask();if(t._mode!=="automatic"){t._sendEvent("StartUpload",JSON.stringify({platform_instance:t.getControl("platformSelect").getValue()[0],community_id:t._currentCommunityId,content_type:t._currentType}))}else{if(t._config.base64image){t._uploadImage(v.target)}else{t.createContent(null,v.target)}}}else{if(v.target&&a.is(v.target.disabled)){v.target.disabled=false}else{if(t._publishButton){t._publishButton.setDisabled(false)}}t._showAlertMessage("warning",f.Pleasecheckyourform)}}}}));t.addControl("platformSelect",new h({className:"platform-combo",placeholder:f.Selectaplatform,disabled:true,events:{onChange:function(){var v=t.getControl("platformSelect");if(v&&v.getValue()&&v.getValue()[0]&&v.getValue()[0]!==""){v.elements.choices.removeAttribute("style");t.mask();t._sendEvent("PlatformChange",JSON.stringify({platform_instance:v.getValue()[0]}));if(t._mode!=="catia"){t._setCurrentPlatformURL(v.getValue()[0])}}else{if(v){v.elements.choices.setStyle("border","1px solid #d0432b")}}}}}));t.getControl("platformSelect").hide();t._fetchPlatformList()}});return q});