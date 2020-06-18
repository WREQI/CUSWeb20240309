define("DS/DELMGAApp/AppConfig",["DS/DELPPWModelServices/BehaviorUtil",],function(b){var a={preferences:[{name:"showDialog",type:"boolean",label:"Preferences.ShowDialog",defaultValue:"true"},{name:"navigateOnIndexedDB",type:b.isNavigateOnIndexedDBPrefDisplayed()?"boolean":"hidden",label:"Preferences.NavOnIndexedDB",defaultValue:"false"},{name:"fetchAllLevel",type:"boolean",label:"Preferences.fetchAllLevel",defaultValue:"false"},{name:"showOrg",type:"boolean",label:"Preferences.showOrg",defaultValue:"false"},{name:"showCollaborativeSpace",type:"boolean",label:"Preferences.showCollaborativeSpace",defaultValue:"false"},{name:"showRole",type:"boolean",label:"Preferences.showRole",defaultValue:"false"},{name:"oneDelmiaAggregationMode",type:"boolean",label:"Preferences.oneDelmiaAggregationRules",defaultValue:"true"},{name:"separator",type:"text",label:"Preferences.Separator",defaultValue:"|"},{name:"navigateOnIndex",type:"list",options:[{value:"Database",label:"Database"},{value:"Index",label:"Index"}],label:"Preferences.NavOnIndex",defaultValue:"Index"},{name:"organization",type:"list",label:"Preferences.Org",options:[],defaultValue:"",onchange:"OrganizationUpdated"},{name:"collaborativeSpace",type:"list",label:"Preferences.CollabSpace",options:[],defaultValue:"",onchange:"CollabSpaceUpdated"},{name:"role",type:"list",label:"Preferences.Role",options:[],defaultValue:"",onchange:"RoleUpdated"},{name:"custoParametersSet",type:"list",label:"Preferences.CustoParametersSet",options:[],defaultValue:"",},{name:"timeout",type:"text",label:"Preferences.ServerTimeout",defaultValue:((b.getDefaultTimeout()===false)||(b.getDefaultTimeout()===""))?"600":b.getDefaultTimeout(),onchange:"TimeoutUpdated"},{name:"systemsViewColumns",type:"hidden",defaultValue:[]},{name:"consumedItemsColumns",type:"hidden",defaultValue:[]},{name:"capableResourcesColumns",type:"hidden",defaultValue:[]},{name:"forceDBModePreferences",type:"hidden",defaultValue:"false"}],xmlConfiguration:{"ROUTINGS.columnConfigPath":"DELMGAApp/RoutingsViewColumnConfig","MANUFACTURING.columnConfigPath":"DELMGAApp/ManufacturingViewColumnConfig","RESOURCE.columnConfigPath":"DELMGAApp/ResourceViewColumnConfig","AUXILIARY.columnConfigPath":"DELMGAApp/AuxiliaryColumnConfig",duplicateAdvancedPreferencesXML:"DELMGAApp/DuplicateAdvancedPreferences",exportCSVPreferencesXML:"DELMGAApp/ExportCSVPreferences",indexMappingXML:"DELMGAApp/IndexMapping",insertFormAttributeXML:"DELMGAApp/InsertCmdFormAttribute",modelRelationsXML:"DELMGAApp/ModelRelations",modelCustomRelationsXML:"DELMGAApp/ModelCustomRelations",relationsColumnMappingXML:"DELMGAApp/RelationsColumnMapping",relationsDisplayAttributeConfigXML:"DELMGAApp/RelationsDisplayAttributeConfig",relationsDialogDisplayAttributeConfigXML:"DELMGAApp/RelationsDialogDisplayAttributeConfig",editLinkAttrsConfigXML:"DELMGAApp/EditLinkAttributesConfig",documemntColumnConfigXML:"DELMGAApp/DocumentColumnDisplayAttributeConfig",toolTipConfigXML:"DELMGAApp/TooltipConfig",egraphViewNodePreferenceXML:"DELMGAApp/EGraphViewReferenceAttribute",egraphViewLinkPreferenceXML:"DELMGAApp/EGraphViewLinkAttribute"}};return a});define("DS/DELMGAApp/App",["UWA/Core","DS/Core/Core","DS/UIKIT/Mask","DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext","DS/DELPPWModules/Modules","DS/DELPPWBehaviors/Behaviors","DS/DELPPWPlugins/Plugins","DS/DELPPWServices/Services","DS/DELMGAApplicationServices/Services","DS/DELModularWebAppCore/Core","text!DS/DELMGAApp/assets/json/ModuleConfigurations.json","css!DS/DELMGAApp/DELMGAApp.css"],function(i,a,A,m,q,t,g,f,k,b,x){var o=q.getMap(),p=t.getMap(),w=g.getMap(),u=i.merge(k.getMap(),f.getMap()),l="DELMGAApp.xml",e="DELMGAApp",j="DS/DELMGAApp/AppConfig",d="DS/DELMGAApp/assets/icons/catalog.json",r="DS/DELMGAApp/assets/json/EventsMapping.json",y="DS/DELMGAApp/assets/json/SelectionMapping.json",c="DS/DELMGAApp/assets/json/RootsMapping.json",v="DS/DELMGAApp/assets/json/CommandsAvailability.json",h="DS/DELMGAApp/assets/nls/NLS",s="DS/ENOCollabSharingCmds/assets/catnls/CollabSharing_Workbench.CATNls",n="DS/ENOCollabSharingCmds/assets/catrsc/CollabSharing_Workbench.CATRsc";var z=function z(){var N="DELMGA_AP",F="MGA",E,G,M;w.ImplementPlugin="DS/DELPPWViewPlugins/ImplementPlugin/ProcessImplementPlugin";E=new b({appId:N,widgetTrigram:F,unAuthorizedTypes:["PRODUCT","PARTS"],appContext:{widget:{getId:function C(){return widget.id},data:{appId:N}}},require:{module:o,behavior:p,plugin:w,service:u},resource:{iconCatalogPath:d,eventsMappingPath:r,selectionMappingPath:y,rootsMappingPath:c,commandsAvailabilityPath:v,indexMappingXML:"indexMappingXML",modelRelationsXML:"modelRelationsXML",relationsDisplayAttributeConfigXML:"relationsDisplayAttributeConfigXML",relationsColumnMappingXML:"relationsColumnMappingXML",insertFormAttributeXML:"insertFormAttributeXML",modelCustomRelationsXML:"modelCustomRelationsXML",documemntColumnConfigXML:"documemntColumnConfigXML",duplicateAdvancedPreferencesXML:"duplicateAdvancedPreferencesXML",nlsFilePath:h,nlsExternalCmdsPath:s,rscExternalCmdsPath:n,appConfigPath:j,afrWorkbenchName:l,afrWorkbenchModule:e,custoParameterRegExp:"MGAParameters*"}});G=function G(P){var O=P.moduleData||{};if(i.is(P)&&i.is(P.moduleId,"string")){O=i.merge(O,x[P.moduleId]);E.start(P.moduleId,O)}else{E.getLogger().debug("Module id is required to start the module.")}};M=function M(O){if(i.is(O)&&i.is(O.moduleId,"string")){E.stop(O.moduleId)}else{E.getLogger().debug("Module id is required to stop the module.")}};x=i.Json.decode(x);E.addExternalListener("startModule",G);E.addExternalListener("stopModule",M);return{onLoad:function J(){widget.body.empty();A.mask(widget.body);E.useServices(["EventsService","LoggerService","ConfigService","ModelService","CommandsService","ExternalService","LifecycleService","FilterService","LayoutService"],function(){var O,P=E.getService("LayoutService");O=P.getContainer("progressIndicator");E.createModule("ProgressIndModule","PROGRESSINDMOD",O,function(Q){E.start(Q)});O=P.getContainer("none");E.createModule("InsertCmdModule","INSTCMDMOD",O,function(Q){E.start(Q,x.INSTCMDMOD)});O=P.getContainer("none");E.createModule("DeleteCmdModule","DELCMDMOD",O,function(Q){E.start(Q)});O=P.getContainer("none");E.createModule("AuthorLinksModule","AUTHORLINKMOD",O,function(Q){E.start(Q)});O=P.getContainer("manufacturing");E.createModule("TreeListAuthoringMGAModule","MANUFACTURING",O,function(Q){E.start(Q,x.MANUFACTURING)});O=P.getContainer("resource");E.createModule("TreeListAuthoringMGAModule","RESOURCE",O,function(Q){E.start(Q,x.RESOURCE)});O=P.getContainer("routings");E.createModule("TreeListAuthoringMGAModule","ROUTINGS",O,function(Q){E.start(Q,x.ROUTINGS)});O=P.getContainer("auxiliary");E.createModule("AuxiliaryModule","AUXILIARY",O,function(Q){E.start(Q,x.AUXILIARY)});O=P.getContainer("none");E.createModule("LinksModule","LINKS",O);O=P.getContainer("none");E.createModule("DocumentsModule","DOCUMENTSMOD",O,function(Q){E.start(Q,x.DOCUMENTSMOD)});O=P.getContainer("none");E.createModule("EGraphModule","EGRAPHMOD",O);O=P.getContainer("none");E.createModule("EGraphModule","PRODUCTFLOWMOD",O);m.initialize2(P.getUIContainer(),widget.id,"show","bottom-right",function(){})})},getCore:function D(){return E},onEdit:function I(){},onSearch:function L(Y){var V,ac,O,U,ab,S,X=["SYSTEM","OPERATION"],R=[],aa,P,Z=E.getPlugins("RootsPlugin"),W=E.getPlugins("ResourcePlugin"),T=E.getPlugins("DatabasePlugin");if(!i.is(T)||!i.is(Z)||!i.is(W)){E.getLogger().debug("App","Database or Roots or Resource plugin is not available.");return}T=T.instance;Z=Z.instance;W=W.instance;if(i.is(Y,"string")){ac=Y.split(":");if(i.is(ac,"array")){if(ac.length>1){O=ac[0];U=ac[1]}}}ab=i.is(O,"string")?O.replace(/^\s+/g,"").replace(/\s+$/g,""):"";S=i.is(U,"string")?U.replace(/^\s+/g,"").replace(/\s+$/g,""):"";if(i.is(ab)&&i.is(S)&&ab!==""&&S!==""){V={type:ab,externalId:S};T.fetchReferences(V,{silent:true,remove:false,onComplete:function Q(ae,ad){if(i.is(ae,"array")){ae.forEach(function(af){if(Z.isRoot(af.id)){R.referenceName=af.get("V_Name");aa=W.getNLSValue("AlreadyRoot",R,"ValidationError");E.getLogger().warn(self.name,aa)}else{P=af.get("PPRTYPE");if(i.is(P,"string")&&X.indexOf(P)!==-1){E.getMediator().notify("addReference",[af,null,ad])}else{E.getMediator().notify("addToAuxiliaryView",[af])}}})}}})}},onResize:function B(){},onRefresh:function H(){E.getMediator().notify("reset")},onEndEdit:function K(P){var S,O,T,Q;if(i.is(P)&&P.submitted===true){S=E.getService("ConfigService");T=E.getService("LayoutService");Q=E.getService("ModelService");Q.updateAggregationRules();if(i.is(S)){if(S.hasConfigurationChanged()){O=T.getContainer("layoutContainer");if(i.is(O)){O.hidden=true}A.mask(widget.body);E.stopAll();E.startAllServices(function R(){E.start("PROGRESSINDMOD");E.start("INSTCMDMOD",x.INSTCMDMOD);E.start("DELCMDMOD");E.start("AUTHORLINKMOD");E.start("MANUFACTURING",x.MANUFACTURING);E.start("RESOURCE",x.RESOURCE);E.start("ROUTINGS",x.ROUTINGS);E.start("AUXILIARY",x.AUXILIARY);E.start("DOCUMENTSMOD",x.DOCUMENTSMOD);A.unmask(widget.body);if(i.is(O)){O.hidden=false}})}else{E.getMediator().notify("endEdit")}}}}}};return z});