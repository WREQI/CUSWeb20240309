define("DS/CfgWebinWinInterop/scripts/CfgWIWUtility",["DS/CfgBaseUX/scripts/CfgUtility","i18n!DS/CfgBaseUX/assets/nls/CfgBaseUX"],function(a,c){var b={retrieveModeldetails:function(e){var d=this;var f=new Promise(function(m,l){var j="/search?xrequestedwith=xmlhttprequest";var n=function(o){m(o)};var k={with_indexing_date:true,with_nls:false,label:"model-info",locale:"en",select_predicate:["ds6w:label","ds6w:type","ds6w:description","ds6w:identifier","ds6w:modified","ds6w:created","ds6w:responsible","ds6w:lastModifiedBy","ds6wg:marketing_Name"],select_file:["icon","thumbnail_2d"],order_by:"desc",order_field:"relevance",nresults:1000,start:"0",source:[],tenant:enoviaServerFilterWidget.tenant};var g="";e.forEach(function(p,o){if(o==0){g="physicalid:"+p}else{g=g+" OR physicalid:"+p}});k.query=g;var k=JSON.stringify(k);var i=function(){l()};var h={isfederated:"true"};a.makeWSCall(j,"POST","enovia","application/json",k,n,i,true,h)});return f},getLegacyCfgDico:function(d){var e=this;var f=new Promise(function(i,h){var j="";var g=0;d.forEach(function(o,k){var n="/resources/modeler/browsing/browseservice/pid:"+o.physicalID+"/configurationdictionary?";var p=function(q){if(q.image!=""){o.preview_url=q.image}g=g+1;if(g==d.length){i(q)}};var m=function(q){h(q)};var l="image=1";n+=l;a.makeWSCall(n,"POST","enovia","application/x-www-form-urlencoded",j,p,m,true)})});return f},convertSearchResponseToJson:function(d){var e=[];if(d&&d.results){d.results.forEach(function(h,f){var g={id:"temp",data:[],basicData:[],};g.basicData=h.attributes;h.attributes.forEach(function(k,i){if(k.name=="resourceid"){g.physicalID=k.value}if(k.name=="ds6w:label"){var j=[];j.push(k.value);g.data.push({name:"Marketing Name",value:j})}if(k.name=="preview_url"){g.preview_url=k.value}if(k.name=="ds6w:who/ds6w:responsible"){g.basicData.push({name:"owner",value:k.value})}if(k.name=="ds6w:identifier"){g.basicData.push({name:"name",value:k.value})}if(k.name=="ds6w:what/ds6w:status"){g.basicData.push({name:"current",value:k.value.split("Model.")})}});e.push(g)})}return e},};return b});define("DS/CfgWebinWinInterop/scripts/CfgWIWDialogs",["DS/CfgBaseUX/scripts/CfgController","DS/CfgWebinWinInterop/scripts/CfgWIWUtility","DS/CfgBaseUX/scripts/CfgUtility","DS/CfgAuthoringContextUX/scripts/CfgAuthContextChangeView","UWA/Core","DS/CfgConfigurationContextUX/CfgEditMultipleConfigurationContextDialog","i18n!DS/CfgEvolutionUX/assets/nls/CfgEvolutionUX","css!DS/CfgWebinWinInterop/CfgWebinWinInterop.css"],function(a,e,c,d,h,b,f){var g={destroy:function(){widget.body.empty()},dummy:function(){},getOptions:function(){var i={};return i},createNativeLayout:function(j){widget.body.empty();widget.body.setStyle("height",document.body.parentElement.clientHeight+"px");widget.addEvent("onResize",function(){widget.body.setStyle("height",document.body.parentElement.clientHeight+"px")});var i=this.mainContent=new UWA.createElement("div",{id:"cfgNative-main-container","class":"cfgNative-main-container",});i.inject(widget.body)},initWIWDialog:function(j){j.mode="Native";if(j.modelIds){j.modelIds=j.modelIds.split(",")}if(j.enabledAxis){j.enabledAxis=j.enabledAxis.split(",");var i={feature:"false",productState:"false",unit:"false",contextualDate:"false",milestone:"false",manufacturingPlan:"false"};j.enabledAxis.forEach(function(m){m=m.replace(" ","");i[m]="true"});j.enabledCriteria=i}this.nativeOptions=j;var k=this;a.init("","",this.nativeOptions.mode);enoviaServerFilterWidget.tenant=this.nativeOptions.tenantID;enoviaServerFilterWidget.baseURL=this.nativeOptions.enoviaURL,enoviaServerFilterWidget.federatedURL=this.nativeOptions.federatedSearchURL;var l=new Promise(function(n,m){c.populateSecurityContext().then(function(){k.createNativeLayout();n()})});return l},editEvolution:function(i){var j=this;if(i==undefined||i.enoviaURL==undefined){i=this.getOptions()}this.initWIWDialog(i).then(function(){var m={tenant:j.nativeOptions.tenantID,environment:j.nativeOptions.mode,mode:"EditEvolution",modelList:[],modelIds:j.nativeOptions.modelIds,enabledCritData:j.nativeOptions.enabledCriteria,Access:{SetEvolutionEffectvity:"true"},parent:j.mainContent,parentElement:j.mainContent,dialogue:{okHandler:null,hasEffectivity:null,effExpressionXml:null,}};var k,l;if(j.nativeOptions.currentEffExp==""){k=false}else{console.log("Decoupled Evolution Effectivity");k=true;l=j.nativeOptions.currentEffExp}m.dialogue.hasEffectivity=k;m.dialogue.effExpressionXml=l;e.retrieveModeldetails(j.nativeOptions.modelIds).then(function(n){m.modelList=e.convertSearchResponseToJson(n);require(["DS/CfgEvolutionUX/CfgEditEvolutionLayout"],function(o){o.create(m)})})})},initAuthContext:function(i){var j=this;if(i==undefined||i.enoviaURL==undefined){i=this.getOptions()}this.initWIWDialog(i).then(function(){var m={};m.parent=j.mainContent;j.CfgAuthoringContextView=new d(m);if(j.CfgAuthoringContextView){if(j.nativeOptions.mode=="powerBy"||j.nativeOptions.mode=="Native"){var l={eventName:"cfgAuthoringContext",operation:"Init_Complete",operationVersion:"1.0",content:{}};c.sendNotificationWebInWin(l)}else{var k={authoringMode:"change",ChangeAction:{id:"EA33B1564E6F000081566F5D75800400",name:"caName",title:"CATitle",description:"Description",severity:"High"}};j.setAuthContext(k)}}})},setAuthContext:function(i){if(this.mainContent){this.mainContent.inject(widget.body)}if(!UWA.is(i)){console.log("setAuthContext | Options not set")}else{if(this.CfgAuthoringContextView){this.CfgAuthoringContextView.setContext(i)}}},editVariant:function(i){var j=this;if(i==undefined||i.enoviaURL==undefined){i=this.getOptions()}this.initWIWDialog(i).then(function(){var k={evoEffXML:j.nativeOptions.currentEvoEffExp,varEffXML:j.nativeOptions.currentEffExp,hasEffectivity:(j.nativeOptions.currentEffExp!="")?true:false,parent:j.mainContent,parentElement:j.mainContent};e.retrieveModeldetails(j.nativeOptions.modelIds).then(function(l){k.contextData=e.convertSearchResponseToJson(l);if(window.__karma__!==undefined){window.jQueryURL="VENENO6WPlugins/plugins/jquery/latest/jquery"}else{window.jQueryURL="../webapps/VENENO6WPlugins/plugins/jquery/latest/jquery"}require(["DS/CfgVariantEffectivityDialog/scripts/CfgVariantInitDialog"],function(m){c.populateDisplayExpressionXSLT().then(function(){m.init(k)})})})})},initConfigurationContext:function(i){var j=this;if(i==undefined||i.enoviaURL==undefined){i=this.getOptions()}this.initWIWDialog(i).then(function(){i.parent=j.mainContent;if(i.modelIds.length!=0){e.retrieveModeldetails(i.modelIds).then(function(k){i.contextList=e.convertSearchResponseToJson(k);e.getLegacyCfgDico(i.contextList).then(function(l){j.createContextView(i)})})}else{j.createContextView(i)}})},createContextView:function(j){if(j.contextList){for(var k=0;k<j.contextList.length;k++){j.contextList[k]["isToPropagate"]="false"}}var l={};if(j.enabledAxis){for(var k=0;k<j.enabledAxis.length;k++){l[j.enabledAxis[k]]="true"}}j.enabledCriteriaArray=l;this.contextDialog=new b(j);this.contextDialog.renderNative(j)},onModelSearchOK:function(i){var j=this;if(i.modelIds){i.modelIds=i.modelIds.split(",")}if(i.enabledAxis){i.enabledAxis=i.enabledAxis.split(",")}e.retrieveModeldetails(i.modelIds).then(function(k){i.contextList=e.convertSearchResponseToJson(k);if(i.contextList){for(var l=0;l<i.contextList.length;l++){i.contextList[l]["isToPropagate"]="false"}}e.getLegacyCfgDico(i.contextList).then(function(m){j.contextDialog.onModelSearchOK(i)})})}};return g});