define("DS/SMAProcWebMFT/plugins/mft-plugin/mft-plugin",[],function(){var a={properties:{advancedOptions:{type:Object,value:{}},mftElement:{type:Object,value:null},processChooserElement:{type:Object,value:null},validationElement:{type:Object,value:null},validationCancelled:{type:Boolean,value:false},mftUrl:{type:String,value:null},mftUsername:{type:String,value:null},mftPassword:{type:String,value:null},},created:function(){},attached:function(){},ready:function(){this.isReady=true;this.setAttribute("data-plugin-name",this.getPluginName())},getRemoteProcesses:function(b,c,d){console.log('WARNING: Using default MFT Plugin "getRemoteProcesses"');this.setRemoteProcesses([])},runRemoteProcessValidation:function(c,d,e,b){console.log('WARNING: Using default MFT Plugin "runRemoteProcessValidation"');this.clearValidationLog();this.addValidationLogMessage('WARNING: Using default MFT Plugin "runRemoteProcessValidation"')},checkRemoteProcessValidation:function(b,c,e,d,f){console.log('WARNING: Using default MFT Plugin "checkRemoteProcessValidation"')},getPluginName:function(){throw Error("getPluginName is not implemented")},update:function(c,b,d){this.setExtensionConfig(d);console.log("default mft plugin update")},apply:function(){console.log("default mft plugin apply")},setExtensionConfig:function(b){this.extensionConfig=b},getExtensionConfig:function(){return this.extensionConfig},showMessage:function(b){if(this.mftElement){this.mftElement.showMessage(b)}},setRemoteProcessesSuccess:function(b){if(this.processChooserElement){this.getProcessChooserElement().setRemoteProcessesSuccess(b)}},setRemoteProcessesError:function(){if(this.processChooserElement){this.getProcessChooserElement().setRemoteProcessesError()}},clearValidationLog:function(){console.log("VALIDATION LOG CLEARED");if(this.validationElement){this.validationElement.clearLog()}},addValidationLogMessage:function(b){console.log("VALIDATION: "+b);if(this.validationElement){this.validationElement.addLogMessage(b)}},validationStarted:function(){this.validationCancelled=false;this.clearValidationLog();if(this.validationElement){this.validationElement.validationStarted()}},validationComplete:function(){if(this.validationElement){this.validationElement.validationComplete()}},cancelValidation:function(){this.validationCancelled=true},getMftUrl:function(){return this.mftUrl},setMftUrl:function(b){this.mftUrl=b},getMftUsername:function(){return this.mftusername},setMftUsername:function(b){this.mftusername=b},getMftPassword:function(){return this.mftPassword},setMftPassword:function(b){this.mftPassword=b},getDefaultAdvancedOptions:function(){return{}},getAdvancedOptions:function(){return this.advancedOptions},setAdvancedOptions:function(b){this.advancedOptions=b},getMftElement:function(){return this.mftElement},setMftElement:function(b){this.mftElement=b},getProcessChooserElement:function(){return this.processChooserElement},setProcessChooserElement:function(b){this.processChooserElement=b},getValidationElement:function(){return this.validationElement},setValidationElement:function(b){this.validationElement=b}};return a});