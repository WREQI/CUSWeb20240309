define("DS/MPFCountrySelectComponent/CountrySelectComponent",["UWA/Core","UWA/Class/View","UWA/Element","DS/UIKIT/Input/Select","i18n!DS/MPFCountrySelectComponent/assets/nls/countrySelectComponent","i18n!DS/MPFCountrySelectComponent/assets/nls/countries"],function(g,e,a,f,c,d){var b=e.extend({className:"mpf-entry mpf-select mpf-country",domEvents:{change:"onChange"},setup:function(h){this._parent(h);this.preSetCountry=h.preSetCountry;this.readOnly=h.readOnly===true;this.required=h.required===true;this.select=null;this.countries=h.countries;this.fieldName=h.fieldName||"country"},render:function(i){var h;if(this.select){this.select.destroy()}this.select=this._createSelect();this.container.setContent([{tag:"label",html:[{tag:"span","class":"mpf-label",html:c.label+'&nbsp;<em class="mpf-required">*</em>'}]},this.select]);h=i!==undefined&&i.invalid!==undefined&&i.invalid;if(h){this.select.elements.input.getParent().addClassName("mpf-addressInvalidField")}return this},destroy:function(){this.stopListening(this.model);this.model=null;this._parent();this.container=null},onChange:function(){var h;h=this.select.getValue()[0];this.model.set({country:h});this.validate()},validate:function(){this._removeErrorMsg();if(this.required){var h=this.model.validate(this.fieldName);if(g.is(h)&&h.length>0){this._showErrorMessage(h[0].message);return false}else{this._removeErrorMsg();return true}}},_removeErrorMsg:function(){this.select.elements.container.removeClassName("mpf-addressInvalidField");var h=this.container.getElement("p.mpf-addressSelectError");if(h!==null){this.container.removeChild(h)}},_showErrorMessage:function(h){this.select.elements.container.addClassName("mpf-addressInvalidField");g.createElement("p",{"class":"mpf-addressSelectError",text:h}).inject(this.container)},_createSelect:function(){var h;var i;var j;i=[];j=this.model.get("country");if(this.countries){this.countries.forEach(function(m){var l;var k;k=m.get("isocode3");l={value:k,label:m.get("name")};if(k===j){l.selected=true}i.push(l)})}h=new f({disabled:this.readOnly,placeholder:c.get("placeholder"),name:this.fieldName,options:i});return h},getValue:function(){return this.select.getValue()},setValue:function(h){return this.select.setValue(h)},setDisabled:function(h){if(h!==false){this.select&&this.select.disable()}else{this.select.enable()}}});return b});