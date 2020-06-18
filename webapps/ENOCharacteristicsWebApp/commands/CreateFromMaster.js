define("DS/ENOCharacteristicsWebApp/commands/CreateFromMaster",["UWA/Core","DS/ApplicationFrame/Command","DS/UIKIT/Mask","DS/ENOCharacteristicsWebApp/controls/SearchConfiguration","DS/ENOCharacteristicsWebApp/utils/Constants","DS/ENOCharacteristicsWebApp/utils/RequestUtils","DS/ENOCharacteristicsWebApp/utils/AlertManager","DS/ENOCharacteristicsWebApp/utils/ComponentUtil","DS/ENOCharacteristicsWebApp/utils/CommandsManagerUtil"],function(h,d,g,f,c,i,e,b,j){var a=d.extend({isInsert:true,mSearchConfig:null,mTitle:null,init:function(k){this.charControl=k.context;this.mTitle="Results - Characteristics Master in Released State";this.mSearchConfig=new f(this.mTitle);this._parent(k,{mode:"exclusive",isAsynchronous:false})},beginExecute:function(){this.charControl=j.getCharacteristicsControlFromCommand(this.options.context)},execute:function(k){var m=this;var l="";console.log(m.charControl);m.mSearchConfig.activate("","Characteristic Master","current==Released",m.onSelectedCharMaster.bind(m),l,"")},onSelectedCharMaster:function(q){var o=this;var k=o.charControl.mRootItem.mWebAppViewContainer;g.mask(k);var n=[];for(var l=0;l<q.length;l++){n[l]={masterId:q[l].id}}var p={objectId:o.charControl.mObjectId,charMasterIds:n};var m=JSON.stringify(p);i.send3DSpaceRequest(i.getGLSWebServiceURL()+c.CHARACTERISTICS_ENDPOINT+c.CHARACTERISTICS_CREATE_MASTER_ON_ITEM,"POST",{type:"text",headers:{"Content-type":"application/json; charset=UTF-8"},data:m},function(r){var t=JSON.parse(r);o.charControl.mRootItem.loadCharacteristics(t);var s={rootNode:o.charControl.mRootItem.mTreeNodeModel,reOrderAcrossCategory:false};o.charControl.updateSequenceOrder(s);g.unmask(k)},function(s,r){g.unmask(k);e.displayErrorResponse(o.charControl.mAlert,r)})},endExecute:function(){}});return a});