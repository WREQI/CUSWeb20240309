define("DS/DELPPWDocumentsModule/DocumentsUIInfra",[],function(){var a=function a(b,d,e){var c;c=function c(g){var f,h=d.getComponent("WUXFrameWindowsManager"),j=h.getFrameWindow(b.getAppContext());f=d.create("Dialog",{domId:"DocumentMgmtUI-Dialog",horizontallyStretchableFlag:true,immersiveFrame:j.getImmersiveFrame(),modalFlag:true,visibleFlag:false,resizableFlag:true,snappableFlag:false,title:g.title,content:g.body,buttons:{Ok:d.create("Button",{className:"ok primary",label:UWA.is(g.okBtn)&&UWA.is(g.okBtn.Title)?g.okBtn.Title:e.getNLSValue("DocumentMgmtUI.Attach"),emphasize:"primary",visibleFlag:UWA.is(g.okBtn)?true:false,onClick:function i(){if(UWA.is(g.okBtn.onClick,"function")){g.okBtn.onClick()}}}),Cancel:d.create("Button",{className:"cancel",label:UWA.is(g.cancelBtn)&&UWA.is(g.cancelBtn.Title)?g.cancelBtn.Title:e.getNLSValue("DocumentMgmtUI.Cancel"),visibleFlag:UWA.is(g.cancelBtn)?true:false,onClick:function i(){if(UWA.is(g.cancelBtn.onClick,"function")){f.destroy();g.cancelBtn.onClick()}}})}});return f};return{buildDialog:c}};return a});define("DS/DELPPWDocumentsModule/DocumentsMgmtUI",["UWA/Core","DS/DELPPWDocumentsModule/DocumentsUIInfra"],function(c,a){var b=function b(u,j,q,z,h){var d,B,l,m,i,A,f,t,e,w,C,D,E,x,o,y=[],v=[],p={document:{authoring:["Download","Update","Delete","Explore"],nonAuthoring:["Download","Explore"]},file:{authoring:["DownloadFile","ModifyFile","RemoveFile","ViewFile"],nonAuthoring:["DownloadFile","ViewFile"]}},k=new a(u,z,h);E=function E(J){var H=this,G=J.cellView.getContent(),F=J.cellModel.getCellContent(),I;if(!J.isHeader&&c.is(F,"array")&&F.length>0){I=c.createElement("div",{"class":"commandsDiv"});F.forEach(function(L){var K;if(c.is(H[L])){K=z.create("Button",{icon:{iconName:H[L].icon,fontIconFamily:WUXManagedFontIcons.Font3DS},className:"link",displayStyle:"icon",onClick:H[L].callback.bind(J.nodeModel)});K.inject(I)}});setTimeout(function(){G.setAttribute("title","")},0);G.setContent(I);return I}};D=function D(I){var H,F=I.cellView.getContent(),G=I.cellModel.getCellContent();if(!I.isHeader){H=z.create("Editor",{value:G,disabled:true});F.setContent(H);return H}};C=function C(I){var H,F=I.nodeModel.options.grid[I.dataIndex],G=c.is(F,"number")?F*1000:F;if(c.is(G)){H=new Date(G)}return H};w=function w(){var G,F;G=function G(H){H=(H.isRoot())?H:H.getParent();return H.options.grid.documentID};F=function F(H){if(!H.isRoot()){return H.options.grid.documentID}};return{Download:{icon:"download",callback:function(){q.downloadDocument(G(this))}},Update:{icon:"plus",callback:function(){var H={id:G(this)};j.buildUpdateDocUI(H.id,function I(J){q.attachFile(H,J)})}},Delete:{icon:"wrong",callback:function(){q.deleteDocument(B,G(this))}},Explore:{icon:"compass",callback:function(){u.notify("ExploreInWebApp",[[{documentPID:G(this)}]])}},DownloadFile:{icon:"download",callback:function(){q.downloadFile(G(this),F(this),this.options.label)}},ModifyFile:{icon:"upload",callback:function(){var J={id:G(this)},H=F(this),I=this.options.label;j.buildUpdateFileUI(J.id,function K(L){L.id=H;q.modifyFile(J,L,I)})}},RemoveFile:{icon:"wrong",callback:function(){q.removeFile(G(this),F(this))}},ViewFile:{icon:"eye",callback:function(){q.viewFile(G(this),F(this),this.options.label)}},}},A=function A(G){var F={showVerticalLines:true,isSortable:false,isDraggable:false,isEditable:false,apiVersion:2,height:"auto",defaultCellHeight:40,selection:{nodes:false,cells:false,canMultiSelect:false,columnHeaders:false,rowHeaders:false},resize:{columns:true,rows:false}};F.columns=[{dataIndex:"documentId",width:0,isHidden:true},{text:h.getNLSValue("DocumentMgmtUI.FileName"),dataIndex:"tree",width:"20%",},{text:h.getNLSValue("DocumentMgmtUI.Commands"),dataIndex:"commands",width:"25%",isColumnMovable:false,onCellRequest:E.bind(G)},{text:h.getNLSValue("DocumentMgmtUI.Description"),dataIndex:"file_desc",width:"20%",isColumnMovable:false,onCellRequest:D},{text:h.getNLSValue("DocumentMgmtUI.DocPolicy"),dataIndex:"policy",isEditable:false,width:"15%",isColumnMovable:false},{text:h.getNLSValue("DocumentMgmtUI.FileDate"),dataIndex:"creationDate",isEditable:false,typeRepresentation:"datetime",width:"20%",isColumnMovable:false,getValue:C}];return z.create("TreeListView",F)};f=function f(G){var F=d.getDocument().search({match:function(H){if(H.nodeModel.options.grid.documentID===G){return true}}});return(F.length===1)?F[0]:null},t=function t(G){var H,F=f(G.id);if(c.is(F)){H=F.isExpanded();F.removeChildren();o(F,G.get("relateddata").files);if(H){F.expand()}}},e=function e(G){var F=f(G);if(c.is(F)){F.remove()}},o=function o(F,H){var G;H.forEach(function(I){G=z.create("TreeNodeModel",{label:I.dataelements.title,grid:{documentID:I.id,commands:v,file_desc:I.dataelements.comments,creationDate:I.dataelements.created}});F.addChild(G)})};x=function x(J){var H,I,F,G;J=c.is(J,"array")?J:[J];for(H=0;H<J.length;H++){G=J[H];I=G.get("relateddata").files;F=z.create("TreeNodeModel",{label:G.get("dataelements").title,grid:{documentID:G.get("id"),commands:y,file_desc:G.get("dataelements").description,policy:G.get("dataelements").policy,creationDate:G.get("dataelements").originated}});o(F,I);d.addRoot(F)}};i=function i(F){d=A(w());x(F);return d};m=function m(){var G,H,F;H=c.createElement("div",{"class":"dialogBody"});F=z.create("WUXLoader",{text:h.getNLSValue("loading")}).inject(H);F.on();G=k.buildDialog({title:h.getNLSValue("DocumentMgmtUI.ManageDocs"),body:H,okBtn:{Title:h.getNLSValue("Dialog.Ok"),onClick:function(){G.destroy()}}});G.show();return G};return{buildDocMgmtUI:function r(F,H){if(!c.is(F)){throw new Error("Valid Reference ID is not provided")}H=H||false;B=F;y=H?p.document.authoring:p.document.nonAuthoring,v=H?p.file.authoring:p.file.nonAuthoring,l=m();q.fetchDocuments(F,function G(I){if(c.is(l)){l.content.setContent(i(I))}})},onAddConnection:function s(H){var G,F;F=function F(I){if(c.is(l)&&B===I.get("from")){x(q.getDocument(I.get("to")))}};if(c.is(H,"array")){for(G=0;G<H.length;G++){F(H[G])}}else{F(H)}},onRemoveConnection:function n(F){if(c.is(l)&&B===F.get("from")){e(F.get("to"))}},onChangeDocument:function g(F){if(c.is(l)){t(F)}}}};return b});define("DS/DELPPWDocumentsModule/DocumentsUploadUI",["DS/DELPPWDocumentsModule/DocumentsUIInfra",],function(a){var b=function b(m,k,i,h){var g,c,f,e=new a(m,i,h);f=function f(n,p,q){var o=i.create("Element","input",{attributes:{type:"file",accept:"*.*"},styles:{display:"none"},events:{change:q,}});o.multiple=p;o.inject(n);o.click()};c=function c(x,v){var s,r,o,p,w,t,q,n=[];v=UWA.merge(v||{},{multiSelection:true,});if(UWA.is(v.docPolicy)){n.push({selected:true,value:v.docPolicy,label:h.getNLSValue(v.docPolicy)})}else{if(UWA.is(v.docPolicies,"array")&&v.docPolicies.length>0){v.docPolicies.forEach(function(y){n.push({value:y,label:h.getNLSValue(y)})})}else{r=i.create("Element","div",{"class":"documentDlgErrorDiv"});r.setText(h.getNLSValue("DocumentMgmtUI.NoDocPolicesAvailable"));r.inject(x);return}}s=[{type:"text",name:"DocumentTitle",required:true,label:h.getNLSValue("DocumentMgmtUI.DocumentTitle"),placeholder:h.getNLSValue("DocumentMgmtUI.DocTitlePlaceholder"),disabled:UWA.is(v.docTitle)?true:false,value:UWA.is(v.docTitle)?v.docTitle:null},{type:"text",name:"DocDescription",multiline:"true",label:h.getNLSValue("DocumentMgmtUI.DocDescription"),placeholder:h.getNLSValue("DocumentMgmtUI.DocDescPlaceholder"),disabled:UWA.is(v.docDescription)?true:false,value:UWA.is(v.docDescription)?v.docDescription:null},{type:"select",name:"DocPolicy",required:true,label:h.getNLSValue("DocumentMgmtUI.DocPolicy"),placeholder:h.getNLSValue("DocumentMgmtUI.DocPolicyPlaceholder"),options:n,disabled:UWA.is(v.docPolicy)?true:false}];t={name:"chooseFiles",value:v.multiSelection?h.getNLSValue("DocumentMgmtUI.ChooseFiles"):h.getNLSValue("DocumentMgmtUI.ChooseFile"),action:function u(){f(x,v.multiSelection,function y(){var A,B,C,z=[];p.getButtonInput("chooseFiles").disable();p.getButtonInput("resetSelection").enable();for(A=0;A<this.files.length;A++){B=this.files[A];C={type:"text",name:B.name,multiline:"true",label:B.name,placeholder:h.getNLSValue("DocumentMgmtUI.FileDescPlaceholder",{file:B.name}),};z.push(C)}if(z.length>0){w=i.create("Form",{className:"horizontal",grid:"4 8",fields:z});w.inject(o)}if(UWA.is(v.onChooseFiles,"function")){v.onChooseFiles(this.files,w)}})}};q={name:"resetSelection",disabled:true,value:h.getNLSValue("DocumentMgmtUI.ResetSelection"),action:function u(){p.getButtonInput("resetSelection").disable();p.getButtonInput("chooseFiles").enable();w.destroy();if(UWA.is(v.onResetFileSelection,"function")){v.onResetFileSelection()}}};p=i.create("Form",{className:"horizontal",grid:"3 8",fields:s,buttons:[t,q]});o=i.create("Element","div",{"class":"filesFormDiv",});p.inject(x);o.inject(x);return p};g=function g(t){var w={},q,s,v,o,p,u;t=t||{};s=t.title;v=i.create("Element","div",{"class":"dialogBody",});o=c(v,UWA.merge({onChooseFiles:function n(y,x){u=y;p=x},onResetFileSelection:function r(){u=null;p=null}},t));w={title:s,body:v,okBtn:{Title:t.okBtnTitle,onClick:function(){var y,A,x,z=[];if(o.validate()){if(UWA.is(u)){A=p.getValues();x={title:o.getValue("DocumentTitle"),description:o.getValue("DocDescription"),policy:o.getValue("DocPolicy")};for(y=0;y<u.length;y++){z.push({file:u[y],comments:A[u[y].name]})}if(UWA.is(t.okBtnClick,"function")){t.okBtnClick(x,z)}q.destroy()}else{m.warn(h.getNLSValue("DocumentMgmtUI.FilesRequired"))}}else{m.warn(h.getNLSValue("DocumentMgmtUI.DocTitleRequired"))}}},cancelBtn:{Title:t.cancelBtnTitle,onClick:function(){if(UWA.is(t.cancelBtnClick,"function")){t.cancelBtnClick()}}}};q=e.buildDialog(w);q.show()};return{buildAttachDocUI:function d(o){k.getDocumentsPolicies(function n(q){g({title:h.getNLSValue("DocumentMgmtUI.AttachDocsHeader"),docPolicies:q,okBtnTitle:h.getNLSValue("DocumentMgmtUI.Attach"),okBtnClick:function p(r,s){k.uploadDocument(o,r,s)}})})},buildUpdateDocUI:function j(q,t){var o=k.getDocument(q),s=o.get("dataelements").title,r=o.get("dataelements").description,n=o.get("dataelements").policy;g({title:h.getNLSValue("DocumentMgmtUI.UpdateDocsHeader",{document:s}),docTitle:s,docDescription:r,docPolicy:n,okBtnTitle:h.getNLSValue("DocumentMgmtUI.Update"),okBtnClick:function p(u,v){t(v)}})},buildUpdateFileUI:function l(q,t){var o=k.getDocument(q),s=o.get("dataelements").title,r=o.get("dataelements").description,n=o.get("dataelements").policy;g({title:h.getNLSValue("DocumentMgmtUI.ModifyFileHeader"),docTitle:s,docDescription:r,docPolicy:n,multiSelection:false,okBtnTitle:h.getNLSValue("DocumentMgmtUI.Update"),okBtnClick:function p(u,v){t(v[0])}})},}};return b});define("DS/DELPPWDocumentsModule/DocumentsModule",["UWA/Core","DS/DELPPWDocumentsModule/DocumentsUploadUI","DS/DELPPWDocumentsModule/DocumentsMgmtUI"],function(d,c,a){var b=function b(t,o,z,y,x,h,l){var s,w,u,p,m,e,i,g,q,r,k,f;r=function r(A){var B=d.is(A,"array")?A:[A];B.forEach(function(C){if(o.isDocConnection(C)){t.notify("manageDocCmdAvailability");m.onAddConnection(C)}})};k=function k(A){if(o.isDocConnection(A)){t.notify("manageDocCmdAvailability");m.onRemoveConnection(A)}};f=function f(A){m.onChangeDocument(A)};s=function s(){var C,B=w(),A=false;if(d.is(B)&&d.is(B.get)){C=z.getPPRType(B);A=e.indexOf(C)>-1}return A};w=function w(){var B,A=x.getSelectedRefs();if(A.length>0){B=A[0]}else{A=x.getSelectedInsts();B=z.getReferenceModelFromInstance(A[0])}return B};u=function u(){var A=w();return d.is(A)?A.id:""};i=function i(){p.buildAttachDocUI(u())};g=function g(){var A=function A(B){var C=[];B.forEach(function(D){C.push(D.id)});o.attachDocuments(u(),C)};l.activate(h.getNLSValue("SearchDocumentCmd.SearchTitle"),A,o.getDocumentTypes(),null)};q=function q(){m.buildDocMgmtUI(u(),s())};return{listenTo:function n(){return{AttachDocumentCmd:i,SearchDocumentCmd:g,ManageDocumentsCmd:q,addConnection:r,removeConnection:k,changeDocument:f}},onStart:function v(A){A=A||{};if(!A.pprTypes){t.debug("Authoring pprTypes list is not provided,DocumentModule would render in readOnly mode only")}e=A.pprTypes||[];p=new c(t,o,y,h);m=new a(t,p,o,y,h)},onStop:function j(){p=null;m=null},}};return{behaviors:["DocumentBehavior","ModelBehavior","UXFactoryBehavior","SelectionBehavior","ResourceBehavior","SearchBehavior"],creator:b}});