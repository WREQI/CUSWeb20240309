/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-defs","DS/SMAPoweredByState/ad-state-utils","DS/SMAPoweredByState/ad-state-wc-adapter","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByState/ad-state-domain-study/selectors","DS/SMAPoweredByState/ad-state-domain-work-data/selectors","DS/SMAPoweredByState/ad-state-cos/selectors","UWA/Class/Promise"],function(n,j,c,y,k,q,l,u,m,g){var x={};var p={FILE:"File",FILEVERSION:"File Version",FOLDER:"Simulation Folder",CATEGORY_INTERNALDATA:"Simulation Category - Internal Data"};var d="failed to commit";var e=window.Promise||g;function f(C,B){var A=null,z=function(F,G){var D=null,E;if(F.info.objId===G){D=F}else{for(E=0;E<F.children.length;E++){D=z(F.children[E],G);if(D){break}}}return D};if(C&&C.hasOwnProperty("ROOT")){A=z(C.ROOT,B)}return A}function h(B,C){var A=null,z=function(G,F){var D=null,E;if(G.info.type===C){D=G}else{for(E=0;E<G.children.length;E++){D=z(G.children[E],F);if(D){break}}}return D};if(B&&B.hasOwnProperty("ROOT")){A=z(B.ROOT,C)}return A}function s(B,A){var z={};z.persistenceStatus=j.PersistenceStatus.CLEAN;if(p.FILE===B.info.type){z.id=A+B.info.fileName;z.type=k.Types.FILE;z.name=B.info.fileName;z.size=null;z.modified=0;z.latestVersion=B.info.fileLatestVer}else{if(p.FILEVERSION===B.info.type){z.id=B.info.fileContainerDocId;z.type=k.Types.FILEVERSION;z.name=B.info.fileName;z.size=B.info.fileSize;z.modified=c.parseTimestamp(B.info.fileModifiedMillis);z.version=B.info.fileVersion;z.comments=B.info.fileCheckinReason}else{if(B.info.hasOwnProperty("fileName")){z.id=B.info.fileId;z.type=k.Types.FILE;z.name=B.info.fileName;z.size=B.info.fileSize;z.modified=c.parseTimestamp(B.info.fileModifiedMillis);z.latestVersion=null}else{if(p.CATEGORY_INTERNALDATA===B.info.type){z.id=B.info.objId;z.type=k.Types.CATEGORY;z.title=B.info.objDispName;z.description=B.info.objDesc;z.created=c.parseTimestamp(B.info.objOrigMillis);z.modified=c.parseTimestamp(B.info.objModifiedMillis);z.locked=(B.info.objLocked.toUpperCase()==="TRUE")}else{if(p.FOLDER===B.info.type){z.id=B.info.objId;z.type=k.Types.FOLDER;z.title=B.info.objDispName;z.description=B.info.objDesc;z.created=c.parseTimestamp(B.info.objOrigMillis);z.modified=c.parseTimestamp(B.info.objModifiedMillis);z.locked=(B.info.objLocked.toUpperCase()==="TRUE");z.referenced=((typeof B.info.isReferenced!=="undefined")&&B.info.isReferenced)}else{z.id=B.info.objId;z.type=B.info.type;z.title=B.info.objDispName;z.description=B.info.objDesc;z.created=c.parseTimestamp(B.info.objOrigMillis);z.modified=c.parseTimestamp(B.info.objModifiedMillis);z.locked=(B.info.objLocked.toUpperCase()==="TRUE");z.referenced=((typeof B.info.isReferenced!=="undefined")&&B.info.isReferenced)}}}}}return z}function w(z,C,B){var A=function(J,H,D){var E,G,F,I=null;if(D.id){I=D.id}G=s(J,I);H.push(G);F={id:G.id,parent:I,children:[]};if(D.children){D.children.push(F)}else{D.id=F.id;D.parent=F.parent;D.children=F.children;F=D}if(J.children){for(E=0;E<J.children.length;E++){A(J.children[E],H,F)}}};A(z,C,B)}function t(E,B,z,A){var F,D=null,C;F=c.getNodeChildren({objects:E,hierarchy:B},z);if(F){for(C=0;C<F.length;C++){if(F[C].version===A){D=F[C];break}}}return D}function o(C,z){var B,A;for(B=0;B<C.length;B++){if((C[B].type===k.Types.FILE)&&!C[B].size&&!C[B].modified&&C[B].latestVersion){A=t(C,z,C[B].id,C[B].latestVersion);if(A){C[B].size=A.size;C[B].modified=A.modified}}}}function b(C,H,I){var F=n.getStore(),A={attachToJobID:C,managedDataProjections:[]},z=[],B,E,D,G;if(I){I.forEach(function(J){B=u.workDataWithID(F.getState(),J);if(B&&B.name&&(B.type===u.Types.FILE)){z.push(B.name)}})}z.forEach(function(J){D={containerID:H,documentID:null,fileName:J,version:"1"};E=k.managedDataFilesWithName(F.getState(),J,H);if(E.length===1){D.documentID=k.managedDataParent(F.getState(),E[0].id,false).id;if(E[0].latestVersion){G=parseInt(E[0].latestVersion);D.version=isNaN(G)?"":(String(++G))}}A.managedDataProjections.push(D)});return A}function a(z){return new e(function(F,E){var B=n.getStore(),H,A,C={successes:[],failures:[]},G=function(){C.successes.push({id:z.id});F(C)},D=function(I){C.failures.push({id:z.id,error:c.buildError(k.ErrorCodes.DELETE_CONTENT_WS_ERROR,I)});F(C)};H=k.managedDataParent(B.getState(),z.id,false);A=k.managedDataParent(B.getState(),H.id,false);y.callSMAProcService({verb:"DELETE",uri:"/simulationdocuments/"+A.id+"/fileversion?fileName="+H.name,headers:{"Content-Type":"application/ds-json",Accept:"*/*"},onComplete:G,onError:D,sessionTimeoutInfo:{handler:E,context:null}})})}function v(z){return new e(function(F,E){var B=n.getStore(),A,C={successes:[],failures:[]},G=function(){C.successes.push({id:z.id});F(C)},D=function(H){C.failures.push({id:z.id,error:c.buildError(k.ErrorCodes.DELETE_CONTENT_WS_ERROR,H)});F(C)};A=k.managedDataParent(B.getState(),z.id,false);y.callSMAProcService({verb:"DELETE",uri:"/simulationdocuments/"+A.id+"/fileversion?fileName="+z.name+((z.latestVersion)?"&version=all":"&version=none"),headers:{"Content-Type":"application/ds-json",Accept:"*/*"},onComplete:G,onError:D,sessionTimeoutInfo:{handler:E,context:null}})})}function i(z){return new e(function(F,E){var D="",B,A={successes:[],failures:[]},G=function(){for(B=0;B<z.objects.length;B++){A.successes.push({id:z.objects[B].id})}F(A)},C=function(H){for(B=0;B<z.objects.length;B++){A.failures.push({id:z.objects[B].id,error:c.buildError(k.ErrorCodes.DELETE_CONTENT_WS_ERROR,H)})}F(A)};for(B=0;B<z.objects.length;B++){D+=z.objects[B].id;if(B<(z.objects.length-1)){D+=","}}y.callSMAProcService({verb:"DELETE",uri:"/simulations/content/owned"+(z.deleteRules?"?delRules=true":""),headers:{"Content-Type":"application/ds-json",Accept:"*/*"},data:D,onComplete:G,onError:C,sessionTimeoutInfo:{handler:E,context:null}})})}function r(z){return new e(function(E,D){var A=n.getStore(),B={successes:[],failures:[]},F=function(){B.successes.push({id:z.id});E(B)},C=function(G){B.failures.push({id:z.id,error:c.buildError(k.ErrorCodes.DELETE_CONTENT_WS_ERROR,G)});E(B)};y.callSMAProcService({verb:"POST",uri:"/simulations/"+l.studyID(A.getState())+"/referencedContent?contentId="+z.id+"&operation=delete",onComplete:F,onError:C,sessionTimeoutInfo:{handler:D,context:null}})})}x.createManagedData=function(A,D){var C=[],B={},z=null;if(D){z=f(A,D)}else{z=h(A,p.CATEGORY_INTERNALDATA)}if(z){if(D){c.clearNodeDescendants(n.getStore().getState().domain.managedData,D)}w(z,C,B);o(C,B)}return{objects:C,hierarchy:B}};x.refreshManagedData=function(){return new e(function(B,A){var C=function(F){var D=null,E=JSON.parse(F.response);if(E){D=x.createManagedData(E)}B(D)},z=function(D){A(c.buildError(k.ErrorCodes.GET_CONTENT_WS_ERROR,D))};y.callSMAProcService({uri:"/simulations/"+l.studyID(n.getStore().getState())+"/getDetailedContents",onComplete:C,onError:z,sessionTimeoutInfo:{handler:A,context:null}})})};x.refreshManagedDataDocument=function(z){return new e(function(C,B){var D=function(G){var E=null,F=JSON.parse(G.response);if(F){E=x.createManagedData(F,z.documentID);E.containerID=z.containerID}C(E)},A=function(E){B(c.buildError(k.ErrorCodes.GET_FILE_VERSIONS_WS_ERROR,E))};y.callSMAProcService({uri:"/simulationdocuments/fileVersionsInfo/"+z.documentID,onComplete:D,onError:A,sessionTimeoutInfo:{handler:B,context:null}})})};x.uploadLocalFile=function(z){return new e(function(H,I){var J,A=0,D=0,E,F,C=function(K){H({documentID:K.objectID,containerID:z.containerID})},B=function(K){if((K.status===403)||((K.status===500)&&(K.response&&(K.response.toLowerCase().indexOf(d)!==-1)))){F=k.ErrorCodes.UPLOAD_FILE_UNAUTHORIZED}else{F=k.ErrorCodes.UPLOAD_FILE_WS_ERROR}I(c.buildError(F,K,z.placeholder))},G=function(K){if(K.lengthComputable){if(z.progressIncrement&&(K.loaded>0)&&(K.total>0)){D=Math.round((K.loaded/K.total)*100);E=(((D-A)>=z.progressIncrement)||(K.loaded===K.total));if(E){A=D}}else{E=true}if(E){n.getStore().dispatch(z.progressHandler(z.placeholder.id,{uploaded:K.loaded,total:K.total}))}}};J={file:z.file,onComplete:C,onFailure:B,sessionTimeoutInfo:{handler:I,context:z.placeholder}};if(z.placeholder){J.onProgress=G}if((k.Types.CATEGORY===z.containerObject.type)||(k.Types.FOLDER===z.containerObject.type)){J.createMethod="POST";J.createURL="/simulations/content?pid="+z.containerObject.id+"&name="+z.file.name}else{J.createMethod="PUT";J.createURL="/fcs/checkin?oid="+z.containerObject.id;if(z.containerFile&&(z.containerFile.name!==z.file.name)){J.createURL+="&dname="+z.containerFile.name+"&newdname="}else{J.createURL+="&dname="}J.createURL+=z.file.name}y.callUploadLocalFile(J)})};x.addReferencedContent=function(z){return new e(function(E,D){var B,C=l.studyObject(n.getStore().getState()),F=function(H){var G,I=false;try{G=JSON.parse(H.response);if(G&&G.errorMessage){I=true}}catch(J){I=false}if(I){D(c.buildError(k.ErrorCodes.ADD_REF_CONTENT_UNAUTHORIZED,H,z.placeholder))}else{E(z)}},A=function(G){D(c.buildError(k.ErrorCodes.ADD_REF_CONTENT_WS_ERROR,G,z.placeholder))};B="/simulations/"+C.id+"/referencedContent?contentId="+z.objectID;if(z.containerID!==C.managedDataRootID){B=B+"&folderId="+z.containerID}y.callSMAProcService({verb:"POST",uri:B,onComplete:F,onError:A,sessionTimeoutInfo:{handler:D,context:z.placeholder}})})};x.setFileVersionComments=function(z){return new e(function(F,E){var C,B,A,G=function(){F({fileVersionID:z.fileVersionID,comments:z.comments})},D=function(H){E(c.buildError(k.ErrorCodes.SET_FILE_VERSION_COMMENTS_WS_ERROR,H,z.fileVersionID))};C=k.managedDataWithID(n.getStore().getState(),z.fileVersionID);B=k.managedDataParent(n.getStore().getState(),z.fileVersionID);A=k.managedDataParent(n.getStore().getState(),B.id,false);y.callSMAProcService({verb:"PUT",uri:"/simulationdocuments/"+A.id+"/versioncomment?fileName="+B.name+"&version="+C.version,headers:{"Content-Type":"text/plain"},data:z.comments,onComplete:G,onError:D,sessionTimeoutInfo:{handler:E,context:z.fileVersionID}})})};x.storeUploadJobInfo=function(z){return new e(function(C,B){var F,E,D=function(){C()},A=function(G){B(c.buildError(k.ErrorCodes.UPLOAD_JOB_FILE_CHECKIN_WS_ERROR,G,z.uploadJobID))};F=b(z.attachToJobID,z.containerID,z.workDataIDs);E=new Blob([JSON.stringify(F)]);E.name=q.UPLOAD_JOB_CONFIG_FILENAME;y.callUploadLocalFile({file:E,createURL:"/fcs/checkin?oid="+z.uploadJobID+"&dname="+q.UPLOAD_JOB_CONFIG_FILENAME,createMethod:"PUT",onComplete:D,onFailure:A,sessionTimeoutInfo:{handler:B,context:z.uploadJobID}})})};x.startUploadWorkDataJob=function(z){return new e(function(O,Q){var M=n.getStore(),L,K,J=null,F,A,I,H,E=[],N=[],B=l.studyObject(n.getStore().getState()),G,P,D=function(R){O({jobID:R.mcsJobID,containerID:z.containerID})},C=function(){Q(c.buildError(k.ErrorCodes.UPLOAD_WORK_DATA_ERROR,null,z.placeholders))};if(z.containerID===B.managedDataRootID){L=k.Types.CATEGORY}else{L=k.managedDataWithID(n.getStore().getState(),z.containerID).type}for(H=0;H<z.workDataIDs.length;H++){I=u.workDataWithID(n.getStore().getState(),z.workDataIDs[H]);if(I){if(u.Types.FOLDER===I.type){if((k.Types.FOLDER===L)||(k.Types.CATEGORY===L)){E.push(z.containerID);N.push(I.name+"/*");if(!J){J=k.Types.FOLDER}}}else{K=k.managedDataFilesWithName(M.getState(),I.name,z.containerID);if(K.length===1){E.push(k.managedDataParent(M.getState(),K[0].id,false).id)}else{E.push(z.containerID)}N.push(I.name);if(!J){J=k.Types.DOCUMENT}}}}F=u.workDataExecDir(n.getStore().getState(),z.workDataIDs[0]);A=u.workDataParent(n.getStore().getState(),z.workDataIDs[0]).path;A=A.replace(/(\\)/gm,"\\\\\\\\");G={REPLACE_VERSION:"6.417.0",REPLACE_PROCESS_ID:B.id,REPLACE_DYNAMIC_ACTIVITY:"ACT#",KEEP_DIR:"1",REPLACE_STEP_ID:"FunctionStep8b6066d6-ea38-4dbe-89ab-dce498b0f63d",REPLACE_WORKING_DIR:A,REPLACE_LAST_ID:"1",REPLACE_HOST:F.station,ADD_RULE_TITLE:N.join(","),ADD_RULE_CATEGORY:B.managedDataRootID,ADD_RULE_TYPE:J,REF_ID:E.join(",")};G.model_key="UploadModel";P={studyID:B.id,data:G,serverID:F.server,onComplete:D,onFailure:C,sessionTimeoutInfo:{handler:Q,context:z.placeholders}};if(F.credentials){P.credentials=F.credentials}if(m.LOCALSTATIONNAME===F.station){P.isLocalStation=true}y.callRunUpload(P)})};x.deleteManagedData=function(B){var A=n.getStore(),z,E=[],D=[],C=[];B.objectIDs.forEach(function(F){z=k.managedDataWithID(A.getState(),F);if(z.type===k.Types.FILEVERSION){E.push(e.resolve(z).then(a))}else{if(z.type===k.Types.FILE){E.push(e.resolve(z).then(v))}else{if(z.referenced){E.push(e.resolve(z).then(r))}else{if((z.type===k.Types.DOCUMENT)||(z.type===k.Types.NVDOCUMENT)){D.push(z)}else{C.push(z)}}}}});if(D.length>0){E.push(e.resolve({objects:D,deleteRules:true}).then(i))}if(C.length>0){E.push(e.resolve({objects:C,deleteRules:false}).then(i))}return e.all(E).then(function(F){var G={successes:[],failures:[]};F.forEach(function(H){G.successes=G.successes.concat(H.successes);G.failures=G.failures.concat(H.failures)});return G})};return x});