define("DS/W3DDriveWrapper/FrameLayout",["UWA/Core"],function(a){return{getOptions:function(){setTimeout(function(){require(["DS/TopBar/TopBar"],function(b){b.addEvent({events:{search:function(c){a.Widgets.instances[1].dispatchEvent("onSearch",c.value)},clearSearch:function(){a.Widgets.instances[1].dispatchEvent("onSearch","")}}})});require(["DS/TopBarProxy/TopBarProxy","DS/i3DXCompassServices/i3DXCompassServices"],function(b,d){var c=new b({id:"helpMenu"});d.getPlatformServices({onComplete:function(e){e.forEach(function(f){if(f&&f.hasOwnProperty("3DPassport")){c.setContent({profile:[{label:"Sign out",onExecute:function(){document.location.href=f["3DPassport"].replace(f.platformId.toLowerCase()+"-","")+"/cas/logout?service="+encodeURIComponent(window.location.href)}}]})}})}})})},3000);return{brand:"3DDrive",application:"",topMenus:["profile","help"],useTagger:false,activateLegal:false,activateFederatedSearch:false,userId:""}}}});define("DS/W3DDriveWrapper/saveToMyDrive/saveToMyDriveController",["DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","DS/W3DDrive/Collections/drives","UWA/Utils","UWA/String","UWA/Array","DS/W3DDrive/Utils/RequestHelper","DS/i3DXCompass/Data","i18n!DS/W3DDriveWrapper/assets/nls/saveToMyDrive"],function(a,i,f,c,b,d,g,h){var e={view:null,drivesLoaded:false,selectedTenant:null,initialized:false,binded:false,treeLoading:{root:{title:h.loading_tree,id:-2}},loadingTenants:{root:{title:h.loading_tenants,id:-1}},noTenantSelected:{root:{title:h.select_tenant,id:-1}},setView:function(j){this.view=j;this.bindToViewEvents()},loadDrives:function(){var j=this;return new Promise(function(l,k){if(j.drivesLoaded){l()}i.fetch({reset:true,merge:false,onComplete:function(){j.drivesLoaded=true;l()},onFailure:k})})},loadNode:function(k){var j=this;return new Promise(function(n,m){var l={};if(k.get("mimeType")!=="text/directory"){n(l);return}l.title=k.get("title");l.id=k.get("id");if(!k.inodeTable){n(l);return}k.inodeTable.fetch({reset:k.inodeTable.isEmpty(),remove:false,merge:true,onComplete:function(){if(k.inodeTable.length>0){l.children=[];k.inodeTable.forEach(function(o){j.loadNode(o).then(function(p){l.children.push(p);if(l.children.length===k.inodeTable.length){n(l)}})})}else{n(l)}},onFailure:m})})},refreshTree:function(j){this.selectedTenant=j;if(!j){this.view.updateTree(this.noTenantSelected);return}this.view.updateTree(this.treeLoading);var k=this;this.loadDrives().then(function(){var m=i.get(j);if(m){var l=m.getRootInodes().first();k.loadNode(l).then(function(n){if(k.selectedTenant===j){k.view.updateTree({root:n})}})}})},run:function(){if(!this.initialized||!this.binded){return}var j=this;j.view.updateTree(j.loadingTenants);a.getPlatformServices({onComplete:function(k){var l=[];k.forEach(function(m){l.push({label:m.displayName,value:m.platformId,url:m["3DDrive"]})});j.tenants=l;j.view.setTenants(l)},onFailure:function(){console.log("fail");console.log(g)}})},init:function(k,j){this.view.setTitle(k);g.initialize({myAppsBaseUrl:j,userId:"USER_ID",});this.initialized=true;this.run()},_performAutoname:function(m,j,n,l){var k=this;return new Promise(function(q,p){var o={};o.data={};o.data.receipt=l;o.data.title=n;o.data.file=n;o.data.description="";o.data.type="Document";var r=b.detect(k.tenants,function(s){return s.value===m});if(!r){p(-1)}o.url=c.format("{0}/resources/3ddrive/v1/bos/{1}/contents/autoname?withactions=true&tenant={2}&xrequestedwith=xmlhttprequest",r.url,j,m);o.data=JSON.stringify(o.data);o.type="json";o.method="POST";o.onComplete=q;o.onFailure=p;o.headers=o.headers||{};o.headers["Content-Type"]="application/json;charset=UTF-8";o.auth={};d.performRequestWithOptions(o.url,o)})},addContent:function(m,j,n,l){var k=this;k._performAutoname(m,j,n,l).then(function(){k.finalize(true)},function(){k.finalize(false)})},finalize:function(j){console.log("Success = "+j)},cancel:function(){},submit:function(l,j,k){},bindToViewEvents:function(){var j=this;this.view.onTenantSelectionChange=function(k){j.refreshTree(k)};this.view.onPublish=this.submit;this.view.onCancel=this.cancel;this.binded=true}};return e});define("DS/W3DDriveWrapper/saveToMyDrive/saveToMyDriveView",["UWA/Array","DS/UIKIT/Modal","DS/UIKIT/Input/Button","DS/UIKIT/Form","DS/Tree/FileTreeView","DS/Tree/TreeDocument","DS/Tree/TreeNodeModel","DS/WebappsUtils/WebappsUtils","DS/W3DDrive/Actions/drivesInputs","i18n!DS/W3DDriveWrapper/assets/nls/saveToMyDrive","css!DS/UIKIT/UIKIT.css","css!DS/W3DDriveWrapper/W3DDriveWrapper.css"],function(c,i,g,f,n,a,e,d,j,l){var h={drive:{id:"3ddrive"},id:"0",get:function(){return"abc"}};var m=j(h);var k=d.getWebappsAssetUrl("W3DDrive","folder-icon.png");var b=function(){this.checkFields=function(){if(this.getFormValues()){this.validatedButton.enable()}else{this.validatedButton.disable()}};this.getFormValues=function(){var p=this.form.getValues();var r=c.detect(this.tenants,function(s){return s.value===p.tenant});if(!r.value){return null}var q=this.getSelectedNode();if(r&&q&&q.options.id&&p.filename){return{tenant:r,folderId:q.options.id,fileName:p.filename}}return null};this.publish=function(){var p=this.getFormValues();if(p){this.onPublish(p.tenant,p.folderId,p.fileName.trim())}};this.cancel=function(){this.container.destroy();delete this.container;delete this.title;delete this.tenants;delete this.tree;this.onCancel()};this.onPublish=function(r,p,q){console.log("Publish",r,p,q)};this.onCancel=function(){console.log("Cancel")};this.onTenantSelectionChange=function(p){};this.container=new i({className:"saveToMyDrive",escapeToClose:false,closable:false,overlay:false,visible:true,header:"",body:"",footer:""});this.title=null;this.tenants=[];var o=this;this.tree;this.setTitle=function(q){this.title=q;var p=this.form.getField("filename");if(p){p.value=this.title}};this.setTenants=function(r){r[0].selected=true;this.onTenantSelectionChange(r[0].value);this.tenants=r;var q=this.form.options.fields[0];q.options=this.tenants;var p=this.form.fields[q.type](q,this.form);this.form.elements.container.replaceChild(p,this.form.elements.container.querySelector(".form-group"));if(this.tenants.length<3){this.form.elements.container.querySelector(".form-group").hide()}else{this.form.elements.container.querySelector(".form-group").show()}};this.updateTree=function(p){if(p){this.tree=p}if(this.treeView){if(this.tree&&this.tree.root){this.treeView.options.treeDocument.removeRoots();var q=this.treeObjectToNode(this.tree.root);this.treeView.options.treeDocument.addChild(q);if(this.tree.root.id===-1||this.tree.root.id===-2){q.options.icons=null}else{q.select();q.expand()}}}};this.treeObjectToNode=function(r){var q;var p=[];if(r.children){r.children.map(function(s){if(s.hasOwnProperty("id")){p.push(o.treeObjectToNode(s))}})}q=new e({label:r.title,children:(p.length>0)?p:null,icons:[k],id:(r.id!=undefined)?r.id:null,isSelectable:true});return q};this.createTreeMap=function(){if(!this.treeView){var p=new a({shouldBeSelected:function(r){return r.options.isSelectable},shouldAcceptDrag:function(){return false},shouldAcceptDrag:function(){return false}});var q=this;p.flattenTreeDocument({onUpdate:function(){q.checkFields()}});this.treeView=new n({treeDocument:p,selection:{toggle:false},enableExpandOnDoubleClick:true,height:"inherit",enableDragAndDrop:false})}return this.treeView.elements.container};this.getSelectedNode=function(){var p=this.treeView.options.treeDocument.getXSO().get();return(p.length>0)?p[0]:null};this.render=function(){var q=this;this.container.elements.body.empty();this.form=new f({fields:[{type:"select",label:" ",placeholder:l.select_platform,name:"tenant",options:this.tenants,events:{onChange:function(s){q.checkFields();q.onTenantSelectionChange(s.target.value)}}},{type:"custom",className:"tree-map",},{type:"field",placeholder:l.title,name:"filename",value:this.title,pattern:m.forbiddenChars.regex,errorText:m.forbiddenChars.text,events:{onKeyDown:function(s){setTimeout(function(){q.checkFields()},1)}}}],buttons:[{type:"submit",value:l.publish}],events:{onSubmit:function(){q.publish()}}}).inject(this.container.elements.body);var p=this.form.buttons[0];p.hide();this.validatedButton=new g({value:l.publish,className:"primary",disabled:true,events:{onClick:function(s){p.elements.input.click()}}}).inject(this.container.elements.footer);new g({value:l.cancel,className:"default",events:{onClick:function(s){q.cancel()}}}).inject(this.container.elements.footer);var r=this.container.elements.body.querySelector(".tree-map");r.parentElement.replaceChild(this.createTreeMap(),r);return this};this.inject=function(p){this.container.elements.body;this.container.inject(p)}};return b});