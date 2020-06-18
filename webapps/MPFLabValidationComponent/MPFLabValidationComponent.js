define("DS/MPFLabValidationComponent/LabValidationComponent",["UWA/Core","DS/MPFView/MPFView","DS/UIKIT/Input/Button","DS/UWPClientCode/Navigation","i18n!DS/MPFLabValidationComponent/assets/nls/LabValidationComponent","css!DS/MPFUI/MPFUI"],function(d,e,a,f,c){var b=e.extend({className:"mpf-lab-validation",setup:function(g){g=(g||{});this._parent(g);this.labs=g.shops},render:function(){var g;g=d.createElement("div",{"class":"mpf-lab-list",html:[this._createLabListHeader(),this._createLabList()]});this.container.setContent(g);return this},_createLabList:function(){return d.createElement("div",{"class":"mpf-validation-labs",html:this._createLabRow()})},_createLabRow:function(){var h=this;var i=[];var g;this.labs.forEach(function(j){g=d.createElement("div",{"class":"mpf-lab-details row",html:[d.createElement("div",{"class":"col-xs-1 ellipsis center",html:j.get("id")}),d.createElement("a",{"class":"col-xs-3 no-padding center",href:"/lab-validation-detail/"+j.get("id"),html:[d.createElement("div",{"class":"col-xs-4 no-padding center",html:h._renderLogo(j)}),d.createElement("div",{"class":"col-xs-8 center ellipsis lab-name",html:j.get("shopName")})]}),d.createElement("div",{"class":"col-xs-2 no-padding center",html:h._extractDate(j)}),d.createElement("div",{"class":"col-xs-1 no-padding center",html:h._displayFonticon(j)}),d.createElement("div",{"class":"col-xs-2 no-padding center",html:h._displayStatusShowroom(j)}),d.createElement("div",{"class":"col-xs-2 no-padding center",html:h._displayStatusTestOrder(j)}),d.createElement("div",{"class":"col-xs-1 no-padding center",html:h._displayStatusLab(j)})]});i.push(g)});return i},_displayStatusLab:function(g){if(g.get("currentState")==="DRAFT"){return d.createElement("b",{html:c.get("draft")})}else{return d.createElement("b",{html:c.get("validated")})}},_displayStatusTestOrder:function(h){var g=h.get("shopServices")["testOrderStatus"]||h.get("shopServices")["MP_SoftwareShopService"]["testOrderStatus"];if(g==="TRUE"){return d.createElement("span",{"class":"fonticon fonticon-check green-icon"})}else{return new a({value:c.get("sendTestOrder"),events:{onClick:function(){f.routeTo("/lab-validation-detail/"+h.get("id")+"/order-creation")}}})}},_displayStatusShowroom:function(g){if(g.get("description")===""){return new a({value:c.get("reviewshowroom"),events:{onClick:function(){f.routeTo("/lab-validation-detail/"+g.get("id")+"/showroom")}}})}else{return d.createElement("span",{"class":"fonticon fonticon-check green-icon"})}},_displayFonticon:function(g){var h=g.get("kycStatus")==="TRUE"||g.get("kycForcedStatus")==="TRUE";if(h){return d.createElement("span",{"class":"fonticon fonticon-check green-icon"})}else{return d.createElement("span",{"class":"fonticon fonticon-cancel red-icon"})}},_extractDate:function(h){var g=h.get("modified");var i=g.split(" ");return[d.createElement("b",{html:i[0]}),d.createElement("br"),i[1]+" "+i[2]]},_renderLogo:function(h){var g;var j;var k;var l;var i;g=["#078BFA","#F95753","#6FBC4B","#9E846A","#AA4BB2","#1A997B","#F564A3","#FF8A2E"];if(h.getLogo()){i=d.createElement("img",{styles:{"background-color":"grey"},src:h.get("logoUrl")})}else{j=h.get("shopName").split(" ");k=j[0].charAt(0).toUpperCase();l=0;if(j[1]){k=k+j[1].charAt(0).toUpperCase();l=(k.charCodeAt(0)+k.charCodeAt(1))%g.length}else{l=k.charCodeAt(0)%g.length}i=d.createElement("div",{html:k,"class":"mpf-dot-view",styles:{"background-color":g[l]}})}return i},_createLabListHeader:function(){return d.createElement("div",{"class":"mpf-lab-list-top row",html:[this._createColumnHeader("1","sellerID"),this._createColumnHeader("3","shopName"),this._createColumnHeader("2","lastUpdate"),this._createColumnHeader("1","kyc"),this._createColumnHeader("2","showroom"),this._createColumnHeader("2","testOrder"),this._createColumnHeader("1","status")]})},_createColumnHeader:function(h,g){return d.createElement("div",{"class":"col-xs-"+h+" no-padding",html:[d.createElement("span",{"class":"fonticon fonticon-down-dir"}),d.createElement("span",{html:c.get(g)}),d.createElement("span",{"class":"fonticon fonticon-filter"})]})},destroy:function(){this.model=null;this._parent();this.container=null}});return b});