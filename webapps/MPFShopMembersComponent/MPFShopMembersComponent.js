define("DS/MPFShopMembersComponent/MPFControlsTag",["UWA/Core","UWA/Controls/Abstract","UWA/Event","DS/UIKIT/Input/Text","DS/UIKIT/Touch","DS/UIKIT/Spinner"],function(h,g,a,e,c,b){var f=13,d="fonticon-cancel";return g.extend({defaultOptions:{text:null,onChange:function(){},onDestroy:function(){}},init:function(i){var j=this;j._parent(i);this.buildContainer()},destroy:function(){this.options.onDestroy();this._parent()},processChange:function(j,i){if(h.is(i.getParent("div"))){if(this.options.validator(j)){this.options.text=j;i.getParent("div").removeClassName("has-error");this.getContent().setContent(this.setReadInput());this.asyncCheck()}else{i.focus();h.log(i);if(!i.getParent("div").hasClassName("has-error")){i.getParent("div").addClassName("has-error");if(this.options.onError){this.options.onError()}}}}},setEditInput:function(){var i=this;this.input=new e({value:this.options.text,attributes:{type:"email",styles:{width:i.getContent().getSize().width},events:{keyup:function(j){j.preventDefault();j.stopPropagation();if(j.keyCode===f){i.processChange(this.value,this)}},blur:function(k){var j=this;k.preventDefault();k.stopPropagation();if(h.is(j)){setTimeout(function(){i.processChange(j.value,j)},100)}}}}});this.getContent().setContent(this.input);this.input.focus()},getButton:function(){var i=this;if(!this.button){this.button=h.createElement("button",{"class":"btn btn-default",html:{tag:"span","class":"fonticon fonticon-cancel"},events:{click:function(j){if(this.getElement(".fonticon").hasClassName(d)){i.destroy();a.stop(j)}}}})}return{tag:"span","class":"input-group-btn",html:this.button}},getInputText:function(){var i=this;this.inputText=h.createElement("span",{"class":"form-control",text:this.options.text,events:!this._isTouchActivate()?{dblclick:function(){i.setEditInput()}}:null});if(this._isTouchActivate()){this.touch=new c(this.inputText).on("hold",function(j){j.preventDefault();j.stopPropagation();i.setEditInput()})}return this.inputText},setReadInput:function(){return h.createElement("div",{"class":"input-group",html:[this.getInputText(),this.getButton()]})},buildContainer:function(){this.elements.container=h.createElement("div",{"class":"uwa-input-tags uwa-input",html:this.setReadInput()})},setLoading:function(j){var i=this.button.getElement(".fonticon");if(j){i.removeClassName(d);this.button.addClassName("is-loading");new b({visible:true,className:"small"}).inject(i)}else{this.button.removeClassName("is-loading");i.addClassName(d);i.setContent("")}},setError:function(k){var j=this.inputText,i=j.getParent("div");if(k){if(!i.hasClassName("has-error")){i.addClassName("has-error")}}else{i.removeClassName("has-error")}this.options.onChange()},asyncCheck:function(){var i=this;if(this.options.validatorAsync){this.setLoading(true);this.options.syncInputSize();this.options.validatorAsync(this.inputText.getText(),{onComplete:function(){i.getContent().setContent(i.setReadInput());i.setLoading();i.setError(false);i.options.syncInputSize()},onFailure:function(){i.setLoading();i.setError(true);i.options.syncInputSize()}})}},_isTouchActivate:function(){return h.Utils.Client.Features.touchEvents},})});define("DS/MPFShopMembersComponent/MPFInputTagger",["UWA/Core","UWA/Controls/Abstract","DS/UIKIT/Input/Text","DS/MPFShopMembersComponent/MPFControlsTag"],function(d,c,b,a){return c.extend({defaultOptions:{validator:function(e){return(e.length>0)},onSuccess:function(){},onError:function(){},onLimitError:function(){},placeholder:"",limit:null,onChange:function(){}},isFirst:true,init:function(e){var f=this;this.cancelButtonID=e.cancelButtonID;f._parent(e);this.buildContainer();setTimeout(function(){f.elements.input.focus()},1)},buildContainer:function(){this.elements.container=d.createElement("div",{html:[{"class":"tags-input-wrapper",html:[{"class":"tag-wrapper"},{"class":"tag-input-wrapper"}]},this.buildInput(),{"class":"clearfix"}]})},buildInput:function(){var e=this;this.elements.input=new b({className:"",attributes:{type:"email",placeholder:this.options.placeholder,autofocus:this.options.focus||null,events:{keydown:function(f){if(f.keyCode===9){e.paste(false,true)}},keyup:function(f){if(f.keyCode!==17){if(f.keyCode===13||f.keyCode===188){e.paste(false,true)}else{e.paste(true,true)}}},drop:function(){e.paste(false,true)},paste:function(){e.paste(false,true)},focusout:function(f){if(!f.relatedTarget||f.relatedTarget.id!==e.cancelButtonID){e.paste(false,false)}}}}});return this.elements.input},paste:function(g,f){var e=this;setTimeout(function(){var n=e.elements.input.getValue(),o=n,l,p,i,h=e.elements.container.getElement(".tags-input-wrapper"),m=e.elements.container.getElement(".tag-input-wrapper"),k,j=true;if(!g&&n.contains(" ")){k=e._extractEmails(n);if(k){n=k.join(";")}}if((g&&n.indexOf(";")>-1)||!g){l=n.split(";");l.forEach(function(r,q){if(r!==""){if(e.options.validator(r)&&(e.options.limit===null||e.getSelected().length<e.options.limit)){if(e.getSelected().indexOf(r)===-1){p=e.buildTag(r);p.inject(h);p.asyncCheck();j=false;i=(q+1===l.length)?"":";";n=n.replace(r+i,"")}}else{if(e.options.validator(r)&&e.getSelected().length===e.options.limit){if(!m.hasClassName("has-error")){m.addClassName("has-error");e.options.onLimitError()}}}}});if(n!==o){e.elements.input.setValue(n);e.syncInputSize();if(f){setTimeout(function(){e.elements.input.focus()},1)}}if(j){e.validate()}}},0)},buildTag:function(f){var e=this;return new a({text:f,onDestroy:function(){setTimeout(function(){e.syncInputSize();e.validate()},10)},onChange:function(){e.syncInputSize();e.validate()},onError:function(){e.syncInputSize();e.options.onError()},syncInputSize:e.syncInputSize.bind(this),validator:e.options.validator,validatorAsync:e.options.validatorAsync})},isFirstEmailAlreadySelected:function(){var f=this.elements.input.getValue(),e=f.split(";");return this.getSelected().indexOf(e[0])>-1},validate:function(){var e=this;setTimeout(function(){var g=e.elements.container.getElement(".tag-input-wrapper");if(g){if(e.elements.input.getValue()!==""||e.getContent().getElements(".uwa-input-split.has-error").length!==0){var f;if(!g.hasClassName("has-error")){g.addClassName("has-error")}f=e.isFirstEmailAlreadySelected();if(e.elements.input.getValue()!==""&&f){e.options.onError(true,f)}else{if(e.elements.input.getValue()!==""){e.options.onError()}else{e.options.onError(true)}}}else{g.removeClassName("has-error");e.options.onSuccess()}}},10)},proceedRemove:function(){var e=this.elements.container.getElements(".uwa-input-tags.focus");if(e.length>0){e.forEach(function(f){f.destroy()});this.syncInputSize()}else{e=this.elements.container.getElements(".uwa-input-tags");if(e.length>0){e[e.length-1].destroy();this.syncInputSize()}}this.validate()},syncInputSize:function(){var e=this;e.options.onChange()},getSelected:function(){var e=[];this.elements.container.getElements(".uwa-input-tags span.form-control").forEach(function(f){e.push(f.getHTML())});return e},_extractEmails:function(e){return e.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)}})});define("DS/MPFShopMembersComponent/ModalShopMembersAdd",["UWA/Core","UWA/String","DS/UIKIT/SuperModal","DS/UIKIT/Mask","DS/UIKIT/Input/Select","DS/MPFShopMembersComponent/MPFInputTagger","i18n!DS/MPFShopMembersComponent/assets/nls/ShopMembersComponent","css!DS/MPFUI/MPFUI"],function(e,g,c,d,a,b,h){var i=null;var f=e.Class.extend({init:function(j){this._parent(j);this.serviceTerm=j.serviceTerm||h.get("lab");this._container=null;this._validateButton=null;this._inviteCB=null;this._members=null;this._emails=[];this._roles=j.roles;this.title=j.title?j.title:g.format(h.inviteManagersTitle,g.ucfirst(this.serviceTerm));if(j){if(j.container){this._container=j.container}if(j.inviteCB){this._inviteCB=j.inviteCB}}this.modalContainer=e.createElement("div",{"class":"mpf-members-modal-container"});this._superModal=new c({renderTo:this.modalContainer});this._roleSelectDiv=e.createElement("div",{"class":"mpf-membersRolesDiv"})},display:function(){this.modalContainer.inject(this._container);var o=this;var m="mpfSuperModalCancelButtonID";this._emails=[];if(this._roles){var l=[];for(var n=0;n<this._roles.length;n++){l[n]={label:h.get(this._roles[n]),value:this._roles[n]}}this._roleLabel=e.createElement("label",{text:h.get("selectRole")});this._roleSelect=new a({className:"",options:l,placeholder:false});this._roleSelectDiv.setContent([this._roleLabel,this._roleSelect])}var p=new b({cancelButtonID:m,placeholder:h.inviteByEmailPlaceholder,limit:i,focus:true,validator:function(q){return e.String.isEmail(q)},onError:function(q,r){var s=h.invalidEmail;if(!q&&!o.errorInterval){setTimeout(function(){o._displayError(s)},200);o.errorInterval=true;setTimeout(function(){o.errorInterval=null},2000)}if(r){s=h.emailAlreadyInList;o._displayError(s)}o._setValidateBtnDisabled(true)},onLimitError:function(){var q=h.get("maxEmailLimit",{limit:i});o._displayError(q);o.errorInterval=true;setTimeout(function(){o.errorInterval=null},2000);o._setValidateBtnDisabled(true)},onSuccess:function(){var q=p.getSelected().length;if(q&&p.elements.container.getElement(".has-error")===null){o._emails=p.getSelected();o._setValidateBtnDisabled(false);o._displayError("")}else{o._setValidateBtnDisabled(true)}},validatorAsync:function(s,u){var t=false;for(var r=0;o._members&&r<o._members.length;r++){if(s.toLowerCase()===o._members[r].email.toLowerCase()){t=true;break}}if(t){var q=h.youCantInviteAlreadyAddedMember;o._displayError(q);o._setValidateBtnDisabled(true);u.onFailure()}else{u.onComplete()}},onChange:function(){var q=p.getSelected().length;if(q){o._setValidateBtnDisabled(true)}}});var j=e.createElement("div",{html:[{tag:"label",html:h.inviteByEmailLabel},p,this._roleSelectDiv,{tag:"label",html:h.addAMessageLabel},{tag:"textarea","class":"form-control invitation-message",rows:"2"},{tag:"br"},{tag:"p","class":"error-msg text-error",text:""}]});var k=[{className:"primary validate-btn",value:h.invite,action:function(s){o._setValidateBtnDisabled(true);d.mask(o._validateButton,"");if(o._inviteCB){var q=s.elements.body.getElement(".invitation-message").value;var r={emails:o._emails,message:q,roles:o._roleSelect?o._roleSelect.getValue():["ShopOperator","Admin"],onComplete:function(t){s.hide()},onFailure:function(t){d.unmask(o._validateButton);o._setValidateBtnDisabled(false);o._displayError(t)}};if(!o._roles){r.shopID=o._shopID}o._inviteCB(r)}}},{className:"default",id:m,value:h.cancel,action:function(q){q.hide()}}];this._superModal.dialog({body:j,title:this.title,buttons:k});this._validateButton=this._container.getElement(".validate-btn");this._setValidateBtnDisabled(true)},_displayError:function(j){this._container.getElement(".error-msg").setContent(j)},_setValidateBtnDisabled:function(k){var j=this._validateButton;if(j){if(k){j.setAttribute("disabled","true")}else{j.removeAttribute("disabled")}}}});return f});define("DS/MPFShopMembersComponent/ShopMembersComponent",["UWA/Core","UWA/String","DS/PlatformAPI/PlatformAPI","DS/MPFView/MPFView","DS/UIKIT/Alert","DS/UIKIT/Input/Button","DS/UIKIT/Input/Select","DS/UIKIT/SuperModal","DS/UIKIT/DropdownMenu","DS/UIKIT/Mask","DS/MPFView/InitialsDot","DS/MPFShopMembersComponent/ModalShopMembersAdd","DS/MPFView/GuidanceHelper","DS/MPFModelFactory/InviteFactory","DS/Handlebars/Handlebars","text!DS/MPFShopMembersComponent/assets/templates/ShopMembersComponent.hbs","i18n!DS/MPFShopMembersComponent/assets/nls/ShopMembersComponent","css!DS/MPFUI/MPFUI"],function(f,k,c,d,o,a,b,n,m,s,l,i,e,j,g,r,h){function p(){if(!("ifCond" in g.helpers)){g.registerHelper("ifCond",function(v,u,t){if(v===u){return t.fn(this)}return t.inverse(this)})}if(!("initialsDot" in g.helpers)){g.registerHelper("initialsDot",function(t,u){return new l({title:t,image:u}).getContent().outerHTML})}if(!("I18N" in g.helpers)){g.registerHelper("I18N",function(u,t){return(g.I18N!==undefined?g.I18N.get(u,t.hash):u)})}}var q=d.extend({setup:function(t){t||(t={});this._parent(t);this.companyId=t.companyId;this.shopID=t.shopId;this.companyMembers=t.companyMembers===true;this.completed=t.completed===true;this.topic=t.mpTopic;this.internalLab=t.internalLab===true;this.roles=t.roles;this.inviteFactory=t.inviteFactory;this.serviceTerm=f.is(t.serviceTerm,"string")?t.serviceTerm:h.get("lab");this._isEditable=t.isEditable!==false;p();this.template=g.compile(r);this._superModal=new n({renderTo:this.container});if(t.needData!==true){this._addMembersModal=new i({container:this.container,inviteCB:this._onInvite.bind(this),roles:this.roles,title:t.addMembersModalTitle,serviceTerm:this.serviceTerm})}if(this.model&&this.model.size()>0){c.publish(this.topic,{complete:true,event:"updateMenu",id:"members"})}},className:"mpf-members",tagName:"div",domEvents:{"click .add-member":"_openAddMemberModal"},render:function(){var v=this.model?this.model.toJSON():null;this._addMembersModal._members=v;this._addMembersModal._shopID=this.shopID;if(v){if(v.length>0&&this.topic){c.publish(this.topic,{complete:true,event:"updateMenu",id:"members"})}for(var x=0;x<v.length;x++){var w=v[x];var u=w.name?w.name:w.id;w.initials=w.state==="active"?w.firstName+" "+w.lastName:w.email;w.removable=u!==c.getUser().login;w.admin=w.Roles.indexOf("Admin")!==-1;w.internalManager=w.Roles.indexOf("ShopOperator")!==-1}}g.I18N=h;var A=this.companyMembers?h.get("inviteMembersTitle"):k.format(h.get("inviteManagersTitle"),k.ucfirst(this.serviceTerm));var t=k.format(h.get("invitationInformation"),this.serviceTerm);var y=this.template.call(null,{launchModalText:A,includeArrow:this._isEditable||this.internalLab,includeDescription:!this.companyMembers,invitationInformation:t,editable:this._isEditable&&!this.internalLab,internalLab:this.internalLab,members:v});this.container.setContent(y);var B=this.container.getElement(".members-info");if(B){var z=new e({content:k.format(h.helpMessageInvitation,this.serviceTerm,k.ucfirst(this.serviceTerm))});z.inject(B)}this._addDropdowns();return this},_openAddMemberModal:function(){this._addMembersModal.display()},_onInvite:function(x){var w=this;var z=x.emails||[];var v=x.message||"";var y=[];for(var u=0;u<z.length;u++){var t={email:z[u],Message:v};if(x.roles){t.Roles=x.roles}if(x.shopID){t.ShopId=x.shopID}y.push(t)}this.model.addAll(y,{companyId:this.companyId,onComplete:function(A){if(w.shopID){w.model.parentResourceId=w.shopID}x.onComplete(A);w.render()},onFailure:function(A){x.onFailure(A)}})},_addDropdowns:function(){var v=this.container.getElements(".remove-member");var y;var x;var z;var t;var A;var u;y=this._createChangeRoleItem();z=this._createRemoveItem();if(v&&v.length){for(var w=0;w<v.length;w++){u=[];if(this.companyMembers){u.push(y);u.push(z)}else{if(this.internalLab){u.push(y)}else{u.push(z)}}t=v[w].getAttribute("data-id");A=this.model.get(t);if(this.inviteFactory&&(A.get("state")!=="active")){x=this._createResendInviteItem(t);u.unshift(x)}new m({target:v[w],items:u})}}},_createChangeRoleItem:function(){var t=this;return{fonticon:"pencil",handler:function(){t._onChangeRoles(t.model.get(this.options.target.getAttribute("data-id")))},text:h.changeRoles}},_createResendInviteItem:function(t){return{text:h.get("sendInvitation"),fonticon:"mail",handler:this._resendInvite.bind(this,t)}},_createRemoveItem:function(){var t=this;return{text:h.removeButton,fonticon:"wrong",handler:function(){t._onRemove(this.options.target.getAttribute("data-id"),this.options.target.getAttribute("data-name"))}}},_resendInvite:function(t){var v;var u;v=this.inviteFactory.createModel(j.Types.COMPANY_INVITE);if(this.companyId){u=this.companyId;v.setShopId(this.shopID)}else{u=this.model.parentResourceId}v.parentResourceId=u;v.addMemberId(t);return v.save()},_onChangeRoles:function(w){var y=this;var t;var B=[];var u;var v=this.internalLab?{style:"opacity: 0.6; pointer-events: none;"}:{};var A=new o({closable:true,visible:true,animate:false});var x=f.clone(v);x=Object.assign(x,{"data-id":"admin"});var z=f.clone(v);z=Object.assign(z,{"data-id":"buyer"});var C=[{attributes:x,disabled:this.internalLab,label:h.Admin,selected:w.get("Roles").indexOf("Admin")!==-1,value:"Admin"},{attributes:z,disabled:this.internalLab,label:h.Buyer,selected:w.get("Roles").indexOf("Buyer")!==-1,value:"Buyer"}];if(this.internalLab){C.push({attributes:{"data-id":"operator"},label:h.ShopOperator,selected:w.get("Roles").indexOf("ShopOperator")!==-1,value:"ShopOperator"})}t=new b({multiple:true,options:C,placeholder:false,events:{onChange:function(){B=t.getValue();if(y.companyMembers){var D=w.get("Roles");if(D.indexOf("ShopOperator")!==-1){B.push("ShopOperator")}}}}});B=t.getValue();this._superModal.dialog({body:f.createElement("div",{"class":"",html:t}),buttons:[{action:function(D){var E=w.get("Roles");if(y._lastLabManagerRemoved(E,B)){u=A.getMessages();if(u.length>0){u.forEach(function(F){A.remove(F)})}A.inject(D.elements.body,"top");A.add({message:h.get("onlyManagerRole")})}else{if(B.length>0){y.model.updateRoles(w.get("id"),{companyId:y.companyId,shopId:y.shopID,email:w.get("email"),newRoles:B,previousRoles:E});if(y.shopId){y.model.parentResourceId=y.shopID}w.set("Roles",B);D.hide();D.destroy();y.render()}else{u=A.getMessages();if(u.length>0){u.forEach(function(F){A.remove(F)})}A.inject(D.elements.body,"top");A.add({message:h.get("noRoleError")})}}},className:"primary mpf-btn-ok",value:h.get("OK")},{action:function(D){if(w.get("Roles").length>0){D.hide();D.destroy()}else{u=A.getMessages();if(u.length>0){u.forEach(function(E){A.remove(E)})}A.inject(D.elements.body,"top");A.add({message:h.get("noRoleError")})}},className:"default mpf-btn-cancel",value:h.get("cancel")}],title:h.get("changeRoles")})},_onRemove:function(v,t){var u=this;u._superModal.confirm(h.get("areYouSurToRemove",{name:t}),h.confirmationModalTitle,function(w){if(w){var x=u.container.getElement('.member[data-id="'+v+'"]');if(x){s.mask(x,"")}if(u.model.removeOne){var y={companyId:u.companyId,onComplete:u._onRemoveComplete.bind(u),onFailure:u._onRemoveFailure.bind(u,x),roles:u.model.get(v).get("Roles")};if(!(u.internalLab)){y.roles.push("Admin")}if(y.roles.indexOf("ShopOperator")!==-1){y.shopID=u.shopID}u.model.removeOne(v,y)}}})},_onRemoveComplete:function(){if(this.shopID){this.model.parentResourceId=this.shopID}this.render()},_onRemoveFailure:function(u,t){var v;if(t.message.indexOf("403")!==-1){v=h.get("onlyManagerMsg")}else{v=h.get("errorMsg")}new o({className:"error",closable:true,messages:v,visible:true}).inject(this.container,"top");s.unmask(u)},_lastLabManagerRemoved:function(t,w){var u;var v;u=t.indexOf("ShopOperator")!==-1&&w.indexOf("ShopOperator")===-1;v=this.model.filter(function(x){return x.get("Roles").indexOf("ShopOperator")!==-1});return v.length===1&&u},destroy:function(){this.model=null;this._parent();this.container=null}});return q});