define("DS/ENOCharacteristicsWebApp/commands/CreateCharacteristics",["UWA/Core","DS/ApplicationFrame/Command","DS/ENOCharacteristicsWebApp/controls/CreateCharacteristics","DS/ENOCharacteristicsWebApp/utils/RequestUtils","DS/ENOCharacteristicsWebApp/utils/Constants","DS/ENOCharacteristicsWebApp/utils/CommandsManagerUtil"],function(g,a,c,e,b,f){var d=a.extend({labelTopBar:g.i18n("Create"),isInsert:true,datas:{},mCreateCharForm:null,init:function(h){this._parent(h,{mode:"exclusive",isAsynchronous:false})},beginExecute:function(){this.charControl=f.getCharacteristicsControlFromCommand(this.options.context)},execute:function(i){var j=this;var h=e.getGLSWebServiceURL()+b.CHARACTERISTICS_ENDPOINT;e.send3DSpaceRequest(h+"getdimensionpreferences","GET",{type:"json",headers:{"Content-type":"application/x-www-form-urlencoded"}},function(k){if(j.mCreateCharForm==null){j.mCreateCharForm=new c(j.charControl.mRootItem,k,j.charControl)}else{j.mCreateCharForm.pushFormContent(k,j.charControl)}},function(k){j.dataError})},endExecute:function(){}});return d});