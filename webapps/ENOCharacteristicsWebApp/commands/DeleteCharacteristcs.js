define("DS/ENOCharacteristicsWebApp/commands/DeleteCharacteristcs",["UWA/Core","DS/ApplicationFrame/Command","DS/UIKIT/Mask","DS/ENOCharacteristicsWebApp/utils/UIUtil","DS/ENOCharacteristicsWebApp/utils/CommandsManagerUtil","i18n!DS/ENOCharacteristicsWebApp/assets/nls/ENOCharacteristicsWebAppNLS"],function(g,b,e,a,f,d){var c=b.extend({labelTopBar:g.i18n("Create"),isInsert:true,datas:{},init:function(h){this._parent(h,{mode:"exclusive",isAsynchronous:false})},beginExecute:function(){this.charControl=f.getCharacteristicsControlFromCommand(this.options.context)},execute:function(h){var i=a.deleteCharacteristics(this.charControl)},endExecute:function(){}});return c});