define("DS/SMAProcWebContents/ParameterChooser",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebContents/CommonBehavior","DS/SMAProcWebCMMUtils/SMAJSCMMParameterUtils","DS/SMAProcWebContents/PolyUtils","DS/SMAProcWebContents/ComboBox","DS/SMAProcWebContents/ArraySelector","DS/SMAProcWebAuthoringUtils/cmp-parameter-create/cmp-parameter-create-modal",],function(b,h,e,k,c){var l='<dom-module id="pcw-sdk-parameter-chooser"><template>  <style>    :host {        display: flex;        width: 100%;    };    :host[disabled] { pointer-events:none;opacity:0.5;}    #selectParameter {        flex-grow: 2;     }    .paramChooserImg {        width: 22px;        height: 22px;        cursor: pointer;     }}</style><template is="dom-if" if="{{_canCreate(create, disabled)}}">   <img class="paramChooserImg" style="margin-right:5px;flex-shrink: 0;" on-tap="_createParam" src="'+require.toUrl("DS/SMAProcWebAuthoringUtils/assets/images/I_SMAWflUIParameterNew.png")+'" />   <cmp-parameter-create-modal id="paramCreateModal" datatype="[[datatype]]" structure="[[structure]]"></cmp-parameter-create-modal></template><pcw-sdk-combo-box id="selectParameter"  placeholder="Select..." enable-search-flag></pcw-sdk-combo-box><template is="dom-if" if="{{_canSelect(autoselect, disabled)}}">    <img class="paramChooserImg" style="margin-left:5px;flex-shrink: 0;" on-tap="_select" src="'+require.toUrl("DS/SMAProcWebAuthoringUtils/assets/images/I_SMAWflUIInsert.png")+'" /></template><pcw-sdk-array-selector id="arraySelector" />"</dom-module>';h.registerDomModule(l);var j="parent";var d="children";var g="siblings";var f=["String","Boolean","Integer","Real","Timestamp","UserType","Object","File"];var a=["Scalar","Array"];var i=["In","Out","In/Out","Neutral"];b({is:"pcw-sdk-parameter-chooser",properties:{create:{type:Boolean,value:false,reflectToAttribute:true},autoselect:{type:Boolean,value:false,reflectToAttribute:true},source:{value:[j,d,g].join(" "),reflectToAttribute:true},datatype:{value:f.join(" "),reflectToAttribute:true},structure:{value:a.join(" "),reflectToAttribute:true},mode:{value:i.join(" "),reflectToAttribute:true},displayType:{type:Boolean,value:false},disabled:{type:Boolean,value:false,reflectToAttribute:true},_datatypeList:{type:Array,computed:"_expand(datatype)"},_sourceList:{type:Array,computed:"_expand(source)"},_modeList:{type:Array,computed:"_expand(mode)"},_structureList:{type:Array,computed:"_expand(structure)"}},behaviors:[e],listeners:{"param-create-done":"_onParamAdded"},_canCreate:function(m,n){return m&&!n},_canSelect:function(n,m){return !n&&!m},_expand:function(m){if(m){return m.split(/[\s,]+/)}return[]},ready:function(){},setContentService:function(m){this.service=m;var n=this;this.service.subscribe("param-added",function(r){var o=r.parameters;var q=r.target;var p=q===n;n.update(o,p)})},update:function(m,q){var n=m.filter(this._filterByParameterType.bind(this));if(n&&n.length>0){var p=this.getSelectedItem();if(q&&n.length===1){p=n[0]}var o=(this._parameters||[]).concat(n);this.setModelFromParameters(o,p);if(q&&p){this._selectionChange()}}},setActivity:function(m){this.container=m},getActivity:function(){return this.container},getDataContainer:function(){var m=this.container;if(this.container){m=typeof this.container.getDataContainer==="function"?this.container.getDataContainer():this.container}return m},setModelFromParameters:function(n,o){this._parameters=n.filter(this._filterByParameterType.bind(this));var m=this._parameters.map(this._getItemLabel.bind(this));this.$.selectParameter.setModel(m,o);this.registerEvents([this.$.selectParameter,"select-change","_selectionChange"])},setModel:function(m,o){this.container=m;this._parameters=this._getFilteredParameters();var n=this._parameters.map(this._getItemLabel.bind(this));this.$.selectParameter.setModel(n,o);this.registerEvents([this.$.selectParameter,"select-change","_selectionChange"])},_getTypeDesc:function(n){var m=n._getDataTypeName();if(n._getStructureName()==="Array"){m=m+n.getDimensionAsString(true)}return m},_getItemLabel:function(o){var n=o.getName();var m=this.getDataContainer();if(o.getParent()!==m){n=o.getParent().getName()+"->"+n}if(this.displayType){n+=" ("+this._getTypeDesc(o)+")"}return{labelItem:n,valueItem:o}},_getFilteredParameters:function(){var m=k.getPotentialParameters(this.container)||{};var o=m.self||[];var n=(this.source||"").split(/\s+/);if(n.indexOf(j)>=0){o=o.concat(m.parent||[])}if(n.indexOf(d)>=0){o=o.concat(m.children||[])}if(n.indexOf(g)>=0){o=o.concat(m.siblings||[])}var p=o.filter(this._filterByParameterType.bind(this));return p},_filterByParameterType:function(m){return this._datatypeList.indexOf(m._getDataTypeName())>=0&&this._structureList.indexOf(m._getStructureName())>=0&&this._modeList.indexOf(m._getModeName())>=0},_selectionChange:function(m){this._stopEvent(m);if(this.autoselect){this._select()}},_select:function(n){this._stopEvent(n);var o=this.getSelectedItem();if(!o){return}var m=this.getDataContainer();if(o.getParent()!==m){k.addParameters([o],m)}if(o._getStructureName()==="Array"){this.$.arraySelector.showArraySelectionDialog(o,function(p){this.fire("pcw-parameter-selected",{parameter:o,value:o,selectedIndices:p})}.bind(this))}else{this.fire("pcw-parameter-selected",{parameter:o,value:o,selectedIndices:null})}},_createParam:function(){var m=this;var n=this.$$("#paramCreateModal");c.waitTillReady(n,"setDialogHeading",function(o){o.setDataContainer(m.container)})},_onParamAdded:function(m){m&&m.stopPropagation();if(m.detail.success){var n=m.detail.parameter;this.service&&this.service.publishParametersCreated([n],this)}},getSelectedItem:function(){return this.$.selectParameter.getSelectedItem()},setSelectedItem:function(m){this.$.selectParameter.setSelectedItem(m)},setDataContainer:function(m){this.setModel(m)},getSelectedParameter:function(){return this.getSelectedItem()},getParameterByName:function(m){var n=null;(this._parameters||[]).every(function(p,o){if(m===p.getName()){n={parameter:p,index:o};return false}else{return true}},this);return n},getParameterNameByIndex:function(m){var n=this._parameters&&this._parameters[m];return n?n.getName():null},selectParameterByName:function(m){var n=this.getSelectedItem();(this._parameters||[]).every(function(o){if(m===o.getName()&&n!==o){this.setSelectedItem(o);return false}else{return true}},this)},getParameters:function(){return this._parameters}})});