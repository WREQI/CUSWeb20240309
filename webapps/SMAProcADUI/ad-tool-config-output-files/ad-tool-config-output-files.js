/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
window.require(["DS/SMAProcADUI/ad-tool-instance/ADToolInstance","DS/UIKIT/Input/Select"],function(t,r){var j=window.Polymer,n=window.DS;var E=null,z=null,h=null,s=null,m=null,f=null,o=null,a=null,C=null,B={linux:"linux",windows:"windows"},i=null,u=null,y=null,e=null,q=null,D=null,b=null,l=null,v=null,x=null,p="<Enter file type(s), e.g., *.inp,*.txt>",c={python:"Abaqus/Python",viewer:"Abaqus/Viewer",cae:"Abaqus/CAE"},d=[{value:"MM",label:"Millimeter"},{value:"METER",label:"Meter",selected:true},{value:"CM",label:"Centimeter"},{value:"KM",label:"Kilometer"},{value:"INCH",label:"Inch"},{value:"FOOT",label:"Foot"},{value:"F_I_F64",label:"Feet, Inch, Fraction/64"},{value:"F_I_F16",label:"Feet, Inch, Fraction/16"},{value:"F_I_DEC",label:"Feet, Inch, Decimal"},{value:"micron",label:"Micrometer"},{value:"YARD",label:"Yard"},{value:"MILE",label:"Mile"},{value:"NANOMETER",label:"Nanometer"},{value:"HECTOMETER",label:"Hectometer"},{value:"NAUTICAL_MILE",label:"Nautical mile"}],w=[{value:"KILOGRAM",label:"Kilogram"},{value:"GRAM",label:"Gram"},{value:"MG",label:"Milligram"},{value:"TONNE",label:"Ton"},{value:"POUND",label:"Pound"},{value:"OUNCE",label:"Ounce"},{value:"SLUG",label:"Slug"},{value:"SLUG12",label:"Pound force x square second per inch"},{value:"GRAVITY_TON",label:"Gravity ton"},{value:"KGFxS2_M",label:"Kilogram force squared second per meter"},{value:"KGFxS2_MM",label:"Kilogram force squared second per millimeter"},{value:"KGFxS2_CM",label:"Kilogram force squared second per centimeter"},{value:"LBFxS2_IN",label:"Pound force squared second per inch"},{value:"LBFxS2_FT",label:"Pound force squared second per foot"}],k=[{value:"SECOND",label:"Second"},{value:"MS",label:"Millisecond"},{value:"HOUR",label:"Hour"},{value:"MINUTE",label:"Minute"},{value:"DAY",label:"Day"},{value:"YEAR",label:"year"},{value:"HHMMSS",label:"HH:MM:SS"},{value:"WEEK",label:"Week"},{value:"DECIHOUR",label:"A tenth of an hour"},{value:"CENTIHOUR",label:"A hundredth of an hour"},{value:"MILLIHOUR",label:"A thousandth of an hour"}],g=[{value:"KELVIN",label:"Kelvin degree"},{value:"CELSIUS",label:"Celsius degree"},{value:"FAHRENT",label:"Fahrenheit degree"}],A="MASS=KILOGRAM:TIME=SECOND:LENGTH=METER:TEMPRTRE=KELVIN:COURANT=AMPER:LUMEN=CANDELA:MOLE=MOL";E=function(){this.$.fileSpecsEdit.value="";this.$.nofileNote.style.display="none";this.loading=true;if(this.tools&&this.tools.length>0){if(this.tools[0].outputFileSpecs.length===0){this.$.fileSpecsEdit.placeholder=p;o.call(this)}else{this.$.fileSpecsEdit.value=m(this.tools[0])}if(this.tools[0].outputOption===t.ADToolInstance.OUTPUTOPTIONS.noFiles){this.$.uploadOptionNone.checked=true;if(this.tools[0].hasPredefinedRules){this.$.nofileNote.style.display="inline-block"}this.$.fileSpecsEdit.disabled=true}else{this.$.uploadOptionDefault.checked=true;this.$.nofileNote.style.display="none";this.$.fileSpecsEdit.disabled=false}if(this.tools[0].toolType===n.SMAProcADUI.ADToolManager.TOOLTYPES.osCommandSimToSO||this.tools[0].toolType===n.SMAProcADUI.ADToolManager.TOOLTYPES.simToSO){if(this.abaqusStudyMode){if(this.tools[0].getExecutionConfig().properties.drmMode==="Cloud"&&this.tools[0].toolType!==n.SMAProcADUI.ADToolManager.TOOLTYPES.simToSO){if(this.tools[0].configuration.getSimToSOExecutable()){this.$.physicsResultsGen.checked=true;j.dom(this.$.unitsSection).classList.remove("hidden")}else{if(!this.tools[0].configuration.getSimToSOExecutable()&&this.tools[0].getExecutionConfig().properties.CloudConfig.os===B.windows){this.$.physicsResultsGen.checked=false;j.dom(this.$.unitsSection).classList.add("hidden")}else{if(!this.tools[0].configuration.getSimToSOExecutable()){this.$.physicsResultsGen.checked=false;j.dom(this.$.physicsResultsGenWarning).classList.remove("hidden");j.dom(this.$.unitsSection).classList.add("hidden")}}}}else{if(this.tools[0].toolType===n.SMAProcADUI.ADToolManager.TOOLTYPES.simToSO){this.$.physicsResultsGen.checked=true;this.$.physicsResultsGen.disabled=true}else{this.$.physicsResultsGen.checked=this.tools[0].configuration.getSimToSOExecutable();if(this.$.physicsResultsGen.checked){j.dom(this.$.unitsSection).classList.remove("hidden")}else{j.dom(this.$.unitsSection).classList.add("hidden")}}}}else{j.dom(this.$.genPhyRes).classList.add("hidden")}}else{j.dom(this.$.genPhyRes).classList.add("hidden")}}if(this.tools[0].isOnCloud()){this.DOM(this.$.uploadFileNote1).removeClass("hidden")}else{this.DOM(this.$.uploadFileNote1).addClass("hidden")}this.loading=false};z=function(){if(this.tools.length===0){this.DOM(this.$.mainContentSection).removeClass("hidden");this.DOM(this.$.configurationSection).addClass("hidden");this.DOM(this.$.configurationErrorNone).removeClass("hidden");this.DOM(this.$.configurationErrorMultiple).addClass("hidden")}else{if(this.tools.length>1){this.DOM(this.$.mainContentSection).removeClass("hidden");this.DOM(this.$.configurationSection).addClass("hidden");this.DOM(this.$.configurationErrorNone).addClass("hidden");this.DOM(this.$.configurationErrorMultiple).removeClass("hidden")}else{if(this.tools[0].supportsUpload){this.DOM(this.$.mainContentSection).removeClass("hidden");this.DOM(this.$.configurationSection).removeClass("hidden");this.DOM(this.$.configurationErrorNone).addClass("hidden");this.DOM(this.$.configurationErrorMultiple).addClass("hidden");E.call(this)}else{this.DOM(this.$.mainContentSection).addClass("hidden")}}}};h=function(){this.loading=true;if(this.tools[0].outputFileSpecs!==""){this.$.fileSpecsEdit.value=this.tools[0].outputFileSpecs}else{this.$.fileSpecsEdit.placeholder=p}if(this.$.uploadOptionNone.checked===true){if(this.tools[0].hasPredefinedRules){this.$.nofileNote.style.display="inline-block"}this.$.fileSpecsEdit.disabled=true;this.tools[0].outputOption=t.ADToolInstance.OUTPUTOPTIONS.noFiles}else{this.tools[0].outputOption=t.ADToolInstance.OUTPUTOPTIONS.defaultFiles;this.$.nofileNote.style.display="none";this.$.fileSpecsEdit.disabled=false}this.loading=false};s=function(){var G,L,J=-1,F,I,K,H=[];G=this.$.fileSpecsEdit.value;G=G.trim().replace(/'/g,'"');do{L=G.indexOf('"');if(L>=0){J=G.indexOf('"',L+1);if(J>=0){K=G.slice(L,J+1);G=G.substr(0,L)+G.substr(J+1);if(K.length>2){H.push(K)}L=J+1}}}while(L>=0&&J>=0);F=G.split(/[;,\s]/);for(I=0;I<F.length;I++){K=F[I].trim();if(K.length>0){H.push(K)}}this.tools[0].outputFileSpecs=H};m=function(H){var F="",G,I;if(H){G=H.outputFileSpecs;if(G){for(I=0;I<G.length;I++){F+=G[I];if(I<G.length-1){F+=", "}}}}return F};o=function(){if(window.widget){if(window.widget.getValue("uploadFiles")==="appDefault"&&this.tools[0].toolType!==n.SMAProcADUI.ADToolManager.TOOLTYPES.simToSO&&this.tools[0].configuration.getAppName()!==c.viewer&&this.tools[0].configuration.getAppName()!==c.cae&&this.tools[0].configuration.getAppName()!==c.python){this.$.fileSpecsEdit.value="*.com, *.dat, *.msg, *.sta, *.odb, *.sim, *.log"}else{if(window.widget.getValue("uploadFiles")==="userCustom"){this.$.fileSpecsEdit.value=window.widget.getValue("customFiles")}}s.call(this)}};a=function(){var F=null;if(this.tools&&this.tools.length>0){if(this.tools[0].toolType===n.SMAProcADUI.ADToolManager.TOOLTYPES.osCommandSimToSO||this.tools[0].toolType===n.SMAProcADUI.ADToolManager.TOOLTYPES.simToSO){F=this.tools[0].configuration.getResultsUnits()}}this.$.massSelection=new r({id:"massSelection",placeholder:false,options:w});this.$.massSelection.inject(this.$.massContainer);this.$.massSelection.addEvent("onChange",x,this);this.$.lengthSelection=new r({id:"lengthSelection",placeholder:false,options:d});this.$.lengthSelection.inject(this.$.lengthContainer);this.$.lengthSelection.addEvent("onChange",x,this);this.$.timeSelection=new r({id:"timeSelection",placeholder:false,options:k});this.$.timeSelection.inject(this.$.timeContainer);this.$.timeSelection.addEvent("onChange",x,this);this.$.tempSelection=new r({id:"tempSelection",placeholder:false,options:g});this.$.tempSelection.inject(this.$.tempContainer);this.$.tempSelection.addEvent("onChange",x,this);if(F){C.call(this,F)}else{C.call(this,A)}};i=function(){this.loading=false;this._uiCreated=false};u=function(){a.call(this);this._uiCreated=true};y=function(F){F.stopPropagation();F.cancelBubble=true;F.preventDefault();h.call(this);return true};e=function(F){F.stopPropagation();F.cancelBubble=true;F.preventDefault();if(!this.loading){if(!this.$.uploadOptionDefault.checked){this.$.uploadOptionDefault.checked=true;h.call(this)}s.call(this)}return true};q=function(F){F.stopPropagation();F.cancelBubble=true;F.preventDefault();if(this.$.fileSpecsEdit.value===""){this.$.fileSpecsEdit.placeholder=p;s.call(this)}s.call(this)};D=function(F){F.stopPropagation();F.cancelBubble=true;F.preventDefault();if(!this.$.uploadOptionDefault.checked){this.$.uploadOptionDefault.checked=true;this.$.nofileNote.style.display="none";this.tools[0].outputOption=t.ADToolInstance.OUTPUTOPTIONS.defaultFiles}};b=function(H){H.stopPropagation();H.cancelBubble=true;H.preventDefault();var G=false;var J=false;j.dom(this.$.physicsResultsFormatNotSupported).classList.add("hidden");j.dom(this.$.physicsResultsGenWarning).classList.add("hidden");if(this.tools[0].configuration.getSimToSOExecutable()){this.tools[0].configuration.setSimToSOExecutable(this.$.physicsResultsGen.checked);j.dom(this.$.unitsSection).classList.add("hidden")}else{var F=this.tools[0].station;if(!this.tools[0].configuration.resultFormatSupportsSimToSo()){this.tools[0].configuration.setSimToSOExecutable(false);this.$.physicsResultsGen.checked=false;G=true}else{if(F&&!this.tools[0].isOnCloud()){if(this.tools[0].stationManager.isALinuxStation(F)){if(this.$.physicsResultsGen.checked){J=true}this.$.physicsResultsGen.checked=false}else{this.tools[0].configuration.setSimToSOExecutable(this.$.physicsResultsGen.checked);j.dom(this.$.unitsSection).classList.remove("hidden")}}else{if(F&&this.tools[0].isOnCloud()){var I=this.tools[0].getExecutionConfig();if(I&&I.properties&&I.properties.drmMode==="Cloud"&&I.properties.CloudConfig){if(I.properties.CloudConfig.os===B.linux){if(this.$.physicsResultsGen.checked){J=true}this.$.physicsResultsGen.checked=false}else{if(I.properties.CloudConfig.os===B.windows){this.tools[0].configuration.setSimToSOExecutable(this.$.physicsResultsGen.checked);j.dom(this.$.unitsSection).classList.remove("hidden")}}}}}}}if(G){j.dom(this.$.physicsResultsFormatNotSupported).classList.remove("hidden");j.dom(this.$.unitsSection).classList.add("hidden")}if(J){j.dom(this.$.physicsResultsGenWarning).classList.remove("hidden");j.dom(this.$.unitsSection).classList.add("hidden")}};f=function(F){if(F){j.dom(this.$.genPhyRes).classList.remove("hidden");j.dom(this.$.monitorFilesInfo).classList.remove("hidden");j.dom(this.$.uploadFileWarnings).classList.remove("hidden");j.dom(this.$.uploadPreferenceContainer).classList.remove("hidden")}};l=function(F){F.stopPropagation();F.cancelBubble=true;F.preventDefault();j.dom(this.$.uploadPreferencePopover).classList.remove("hidden")};v=function(F){F.stopPropagation();F.cancelBubble=true;F.preventDefault();j.dom(this.$.uploadPreferencePopover).classList.add("hidden")};x=function(G){G.stopPropagation();G.cancelBubble=true;G.preventDefault();var F,H;this.massUnit=this.$.massSelection.getSelection()[0].value;this.lengthUnit=this.$.lengthSelection.getSelection()[0].value;this.timeUnit=this.$.timeSelection.getSelection()[0].value;this.tempUnit=this.$.tempSelection.getSelection()[0].value;F={mass:this.massUnit,length:this.lengthUnit,time:this.timeUnit,temp:this.tempUnit};H="MASS="+this.massUnit+":TIME="+this.timeUnit+":LENGTH="+this.lengthUnit+":TEMPRTRE="+this.tempUnit+":COURANT=AMPER:LUMEN=CANDELA:MOLE=MOL";this.tools[0].configuration.setResultsUnits(H)};C=function(G){var F=[];F=G.split(":");F.forEach(function(H){if(H.split("=")[0]==="MASS"){this.$.massSelection.select(H.split("=")[1])}if(H.split("=")[0]==="LENGTH"){this.$.lengthSelection.select(H.split("=")[1])}if(H.split("=")[0]==="TEMPRTRE"){this.$.tempSelection.select(H.split("=")[1])}if(H.split("=")[0]==="TIME"){this.$.timeSelection.select(H.split("=")[1])}}.bind(this))};n.SMAProcADUI=n.SMAProcADUI||{};n.SMAProcADUI.ADToolConfigOutputFiles=j({is:"ad-tool-config-output-files",properties:{tools:{type:Array,value:function(){return[]},observer:"toolsChanged"},abaqusStudyMode:{type:Boolean,value:false,observer:"abaqusStudyModeChanged"},onCloud:{type:Boolean,value:false}},observers:["toolsChanged(tools.splices)"],created:function(){return i.apply(this,arguments)},attached:function(){return u.apply(this,arguments)},toolsChanged:function(){z.call(this)},abaqusStudyModeChanged:function(){f.apply(this,arguments)},onUploadOptionChanged:function(){return y.apply(this,arguments)},onUploadFileSpecsChanged:function(){return e.apply(this,arguments)},onUploadFileSpecsBlur:function(){return q.apply(this,arguments)},onUploadFileSpecsInput:function(){return D.apply(this,arguments)},onPhysicsResultsGenChanged:function(){return b.apply(this,arguments)},onUploadPreferenceClick:function(){return l.apply(this,arguments)},onUploadPreferencePopover:function(){return v.apply(this,arguments)},onUnitChange:function(){return x.apply(this,arguments)},_computeIfASonCloud:function(F,G){if(F&&G){return true}else{return false}},_computeIfASOnPremise:function(F,G){if(F&&!G){return true}},behaviors:[n.SMAProcSP.SPBase]})});