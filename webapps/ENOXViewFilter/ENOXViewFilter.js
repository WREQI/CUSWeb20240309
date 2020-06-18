define("DS/ENOXViewFilter/js/ENOXViewFilter",["UWA/Controls/Abstract","UWA/Class/View","DS/Core/ModelEvents","DS/UIKIT/Input/Toggle","DS/UIKIT/DropdownMenu","DS/UIKIT/Autocomplete","DS/UIKIT/Scroller","DS/UIKIT/Badge","DS/ResizeSensor/js/ResizeSensor","UWA/Class/Events","i18n!DS/ENOXViewFilter/assets/nls/ENOXViewFilter","css!DS/ENOXViewFilter/css/ENOXViewFilter.css"],function(f,b,l,i,a,j,d,g,c,k,h){var e=f.extend({init:function(m){var n=this;this.options=m?UWA.clone(m,false):{};var o={enableCache:false,allowMultipleSearch:false,parentContainer:document.body};UWA.merge(this.options,o);this.data={searchValue:""};this.options.enableCache?this.data.savedAttributes=[]:"";this.modelEvent=new l();this.modelEvent.subscribe({event:"onSaveInCache"},function(r){if(UWA.typeOf(r.searchValue)=="array"){var p;for(var q=0;q<r.searchValue.length;q++){if(!n.isSaved(r,q)){if(!p){p=n.getAttributeContainer(r.attrObj)}n.saveSearch(r.searchValue[q],r.attrObj,p)}}}else{if(!n.isSaved(r)){if(r.searchValue.length>0){n.saveSearch(r.searchValue,r.attrObj,null)}}}n.publishSearch()});if(UWA.is(this.options.onSearch,"function")){n.modelEvent.subscribe({event:"OnSearchValueChange"},n.options.onSearch)}this._parent();this.render()},render:function(){var m=this;this.container=UWA.createElement("div",{"class":"searchContainer"}).inject(this.options.parentContainer);this.defaultContainer=UWA.createElement("div",{"class":"defaultContainer"}).inject(this.container);if(this.options.typeFilter){this.checksContainer=UWA.createElement("div",{"class":"checksContainer"}).inject(this.container);this.createCheckbox()}this.textboxContainer=UWA.createElement("div",{"class":"textboxContainer"}).inject(this.defaultContainer);this.createSearchBox();if(this.options.attributeFilter){this.attributeContainer=UWA.createElement("span",{"class":"fonticon fonticon-xx fonticon-menu attributeContainer"}).inject(this.defaultContainer);this.createAttributeFilter()}this.savedAttrContainer=(UWA.createElement("div",{"class":"selectedAttrContainer",styles:{"min-height":"20px","max-height":"75px",padding:"2px","margin-top":"5px",height:"60px"}}).inject(this.textboxContainer));this.savedAttrContainer.hide();this.selectedAttrContainer=(UWA.createElement("div",{"class":"selectedAttrContainer"}));this.savedAttrContainer.setContent(this.selectedAttrContainer);this.savedSearchScroll=new d({element:this.savedAttrContainer}).inject(this.textboxContainer);this.resizeSearch();new c(this.container,function(){m.resizeSearch()})},resizeSearch:function(){var n=this.attributeContainer?this.attributeContainer.offsetWidth:0;var m=this.checksContainer?this.checksContainer.offsetWidth:0;if(this.container.getParent()){var o=this.container.getParent().offsetWidth-m;var p=o-n;if(o>0){this.defaultContainer.setStyle("width",o+"px");this.textboxContainer.setStyle("width",p+"px")}}},createSearchBox:function(){var n=this,o=0,m="";this.currentSearchItems=[];this.searchTextBox=new j({placeholder:h.search,noResultsMessage:"",events:{onKeyUp:function(q){q.key=="Enter"?n.publishSaveInCache():(q.target.value.length>0?n.addInput(q,p):n.removeInput(q,m,p));m=q.target.value.trim();n.publishSearch()}}}).inject(this.textboxContainer);this.searchTextBox.elements.inputContainer.addClassName("search-input");var p=this.searchTextBox.elements.clear.addEvent("click",function(q){n.resetInput(this)});this.searchTextBox.elements.clear.addClassName("clearSpan");this.searchClearButton=p},setText:function(m){if(UWA.typeOf(m)==="string"){this.data.searchValue="";var o=document.createEvent("KeyboardEvent");o.initEvent("keyup",true,true);this.searchTextBox.elements.input.value=m;this.searchTextBox.elements.input.dispatchEvent(o)}else{if(UWA.typeOf(m)==="array"){this.data.searchValue=[];for(var n=0;n<m.length;n++){this.searchTextBox.elements.input.value=m[n]+";";var o=new KeyboardEvent("keyup",{key:";"});this.searchTextBox.elements.input.dispatchEvent(o)}}}},addInput:function(p,r){var o=this;var q=p.target.value.trim();r.show();this.data.searchValue=q;if(this.options.allowMultipleSearch){var n=this.getToken(q);this.data.searchValue=JSON.parse(JSON.stringify(this.currentSearchItems));if(!n){this.data.searchValue.push(q)}if(p.key==";"){if(n!==";"&&n!==""){p.currentTarget.addClassName("search-autocomplete-input");this.searchTextBox.resetInput();var m=new g({content:n,className:"default search-badge",selectable:true,closable:true,events:{onClose:function(t,s){o.removeToken(t.currentTarget);s.destroy();o.publishSearch()}}}).inject(p.currentTarget.getParent());r.hide();this.currentPosition++;this.getSearchBoxPlaceholder()}}}},removeInput:function(o,n,p){if(this.options.allowMultipleSearch&&n.length==0&&(this.data.searchValue!=""||this.data.searchValue.length!=0)){if(o.key=="Backspace"){var m=o.target.parentElement.childNodes;this.removeToken(m[m.length-1]);m[m.length-1].remove()}}else{this.resetInput(p)}},getToken:function(m){var n=[];if(m.contains(";")){n=m.split(";");if(n[0]!==""&&n[0]!==";"){this.currentSearchItems.push(n[0])}}return n[0]},removeToken:function(o){var n;if(o.hasClassName("fonticon-cancel")){n=o.previousSibling.outerText}else{n=o.getText()}var m=this.currentSearchItems.indexOf(n);this.currentSearchItems.splice(m,1);this.data.searchValue.splice(m,1)},reset:function(){this.searchTextBox.resetInput();var m=this.textboxContainer.getElementsByClassName("search-badge");var o=m.length;if(m){for(var n=0;n<o;n++){m[0].remove()}}this.getSearchBoxPlaceholder();this.data.searchValue="";this.currentSearchItems=[];this.publishSearch()},resetInput:function(m){if(this.currentSearchItems.length==0){this.data.searchValue=""}else{this.data.searchValue=JSON.parse(JSON.stringify(this.currentSearchItems))}this.searchTextBox.resetInput();m.hide();this.searchClearButton.hide();this.getSearchBoxPlaceholder();this.publishSearch()},createAttributeFilter:function(){var m=this;this.attrDD=new a({target:m.attributeContainer,items:[],events:{onClick:function(o,n){m.getSearchBoxPlaceholder();m.data.searchAttribute=n.id;m.publishSearch()}}});this.options.attributeFilter.forEach(function(n){m.attrDD.addItem({id:n.id,selectable:true,selected:n.selected?n.selected:false,text:n.text,})});this.data.searchAttribute=this.attrDD.getSelectedItems()?this.attrDD.getSelectedItems()[0].id:"";this.getSearchBoxPlaceholder()},getSearchBoxPlaceholder:function(){var m=h.search,n;if(this.attrDD){n=this.attrDD.getSelectedItems()?this.attrDD.getSelectedItems()[0]:undefined}if(n&&n.text){m=m+" ("+n.text+")"}this.searchTextBox.elements.input.placeholder=m},publishSearch:function(){this.modelEvent.publish({event:"OnSearchValueChange",data:this.data,context:this})},createCheckbox:function(){var m=this.options.typeFilter,p=[],o=this;this.data.typeFilter={};this.checkBoxActualIdInputIdMap={};for(var n=0;n<m.length;n++){p[n]=new i({type:"checkbox",className:"primary toggle-viewSearch",label:m[n].text,checked:m[n].selected?m[n].selected:false,events:{onClick:function(r){var q=o.checkBoxActualIdInputIdMap[r.target.id];o.data.typeFilter[q]=r.target.checked;o.publishSearch()}}}).inject(this.checksContainer);this.checkBoxActualIdInputIdMap[p[n].options.id]=m[n].id;this.data.typeFilter[m[n].id]=p[n].options.checked}return p},publishSaveInCache:function(){if(this.options.enableCache){var m={id:""};if(this.attrDD){m=this.attrDD.getSelectedItems()?this.attrDD.getSelectedItems()[0]:""}this.modelEvent.publish({event:"onSaveInCache",data:{searchValue:this.data.searchValue,searchAttribute:m.id,attrObj:m}})}},isSaved:function(r,p){var o=this.data.savedAttributes,n=r.searchAttribute,q=r.searchValue[p];for(var m=0;m<o.length;m++){if(o[m].attribute==n){if(this.options.allowMultipleSearch){if(o[m].value.indexOf(q.toLowerCase())!=-1){return true}}else{if((o[m].value.toString().toLowerCase()==q.toLowerCase())){return true}}}}return false},getAttributeContainer:function(q){var p=this;var n=UWA.createElement("div",{"class":"itemContainer"}).inject(this.selectedAttrContainer);var o=UWA.createElement("div",{"class":"itemContainer"}).inject(n);var m=UWA.createElement("div",{id:"cid"+(this.data.savedAttributes.length+1),"class":"search-saved-container"}).inject(o);if(q.text!=undefined){var s=UWA.createElement("div",{text:"("+q.text+")","class":"search-saved-text"}).inject(o)}this.data.savedAttributes.push({value:[],attribute:q.id});var r=UWA.createElement("span",{"class":"fonticon fonticon-xx fonticon-cancel clearSpan clearSelectionSpan"}).inject(n);r.addEvents({click:function(u){var t=Array.prototype.indexOf.call(p.selectedAttrContainer.childNodes,m.parentElement.parentElement);p.data.savedAttributes.splice(t,1);u.currentTarget.parentElement.remove();p.setScrollbarHeight();p.publishSearch()}});return m},saveSearch:function(s,o,m){var r=this;if(this.options.allowMultipleSearch){this.data.savedAttributes[this.data.savedAttributes.length-1].value.push(s);var t=new g({content:s,className:"default search-badge saved-badge",selectable:true,closable:true,events:{onClose:function(y,x){r.removeSavedSearch(x,m);if(m.children.length==0){var w=Array.prototype.indexOf.call(r.selectedAttrContainer.getChildren(),m.parentElement.parentElement);r.data.savedAttributes.splice(w,1);m.getParent().parentElement.remove();r.setScrollbarHeight()}r.publishSearch()}}}).inject(m);this.savedSearchScroll.scrollToElement(m)}else{var p=o.text?" ("+o.text+")":"";var s=s+p;var u=UWA.createElement("div",{"class":"itemContainer"}).inject(this.selectedAttrContainer);var q=UWA.createElement("span",{text:s,"class":"itemSelectionSpan",styles:{display:"flex","margin-top":"5px","margin-left":"5px",width:"100%",margin:"2px !important","flex-wrap":"nowrap","flex-shrink":"inherit","text-align":"left"}}).inject(u);var v=UWA.createElement("span",{"class":"fonticon fonticon-xx fonticon-cancel clearSpan clearSelectionSpan"}).inject(u);this.savedSearchScroll.scrollToElement(u);if(o&&o.id&&o.id!=""){this.data.savedAttributes.push({value:s,attribute:o.id})}else{this.data.savedAttributes.push({value:s})}var n=this.selectedAttrContainer.getChildren();n.forEach(function(w){w.lastChild.addEvents({click:function(x){r.removeSavedSearch(x.currentTarget.parentElement,r.selectedAttrContainer);r.publishSearch()}})})}this.savedAttrContainer.show();this.setScrollbarHeight()},removeSavedSearch:function(q,m){var p=m.getChildren();for(var o=0;o<p.length;o++){var r=q.options?q.options.content:q.getText();if(r==p[o].getText()){if(this.options.allowMultipleSearch){var n=Array.prototype.indexOf.call(this.selectedAttrContainer.childNodes,m.parentElement.parentElement);this.data.savedAttributes[n].value.splice(o,1)}else{this.data.savedAttributes.splice(o,1)}}}q.remove();this.setScrollbarHeight()},setScrollbarHeight:function(){var m=((this.data.savedAttributes.length)*30)+"px";this.savedAttrContainer.setStyles({height:m});if(m=="0px"){this.savedAttrContainer.hide()}}});return e});define("DS/ENOXViewFilter/js/ENOXBasicFilter",["DS/Core/ModelEvents","DS/Handlebars/Handlebars","DS/UIKIT/Autocomplete","text!DS/ENOXViewFilter/html/ENOXBasicFilter.html","i18n!DS/ENOXViewFilter/assets/nls/ENOXViewFilter","css!DS/ENOXViewFilter/css/ENOXBasicFilter.css","css!DS/UIKIT/UIKIT.css"],function(c,b,h,d,e,f,g){var i=b.compile(d);var a=function(j){this._init(j)};a.prototype._init=function(j){this._options=j?UWA.clone(j,false):{};var k={multiselect:false,enableCache:true};UWA.merge(this._options,k);this._modelEvents=j.modelEvents?j.modelEvents:new c();this.data={searchValue:[]};this._initDivs();this._subscribeEvents();this._render()};a.prototype._initDivs=function(){this._container=document.createElement("div");this._container.innerHTML=i(this._options);this._container=this._container.querySelector(".enox-basic-filter-container");this._autocomplteWrapper=this._container.querySelector(".enox-basic-filter-autocomplete-wrapper")};a.prototype._subscribeEvents=function(){var j=this;this._modelEvents.subscribe({event:"enox-basic-filter-reset-search"},function(){j._resetSearch()})};a.prototype.inject=function(j){j.appendChild(this._container)};a.prototype._render=function(){var k=this;this.searchTextBox=new h({placeholder:e.search,noResultsMessage:"",allowFreeInput:true,showSuggestsOnFocus:this._options.enableCache,events:{onKeyUp:function(o){var n=o.target.value,m;k._nextKeyToProcess=true;if(n.length%2===0){m=true}k._debounce(function(){var p=o.target.value;k._nextKeyToProcess=false;k.data.searchValue=[];if(p.length>0){k.data.searchValue.push(p);if(o.key=="Enter"){if(k._options.enableCache){k._updateDataset(p)}}}k._modelEvents.publish({event:"enox-basic-filter-search-value",data:k.data});console.log(k.data)},200,m)}}}).inject(this._autocomplteWrapper);this.searchTextBox.elements.inputContainer.addClassName("enox-basic-filter-search-input");if(!this._options.multiselect){var j=this.searchTextBox.elements.clear.addEvent("click",function(m){k._resetSearch(true)})}var l={name:"filter-dataset",items:[]};this.searchTextBox.addDataset(l)};a.prototype._resetSearch=function(j){if(this.data.searchValue&&this.data.searchValue.length>0){this.data.searchValue=[];this.searchTextBox.reset(j);this._modelEvents.publish({event:"enox-basic-filter-search-value",data:this.data})}};a.prototype.setText=function(j){if(UWA.typeOf(j)==="string"){this.data.searchValue="";var l=document.createEvent("KeyboardEvent");l.initEvent("keyup",true,true);this.searchTextBox.elements.input.value=j;this.searchTextBox.elements.input.dispatchEvent(l)}else{if(UWA.typeOf(j)==="array"){this.data.searchValue=[];for(var k=0;k<j.length;k++){this.searchTextBox.elements.input.value=j[k]+";";var l=new KeyboardEvent("keyup",{key:";"});this.searchTextBox.elements.input.dispatchEvent(l)}}}};a.prototype._debounce=function(n,p,l){var o,m=this;var k=function(){o=null;if(!l&&m._nextKeyToProcess){n()}};var j=l&&!o;clearTimeout(o);setTimeout(k,p);if(j){n()}};a.prototype._updateDataset=function(j){var k=this.searchTextBox.getDataset("filter-dataset");if(!this.searchTextBox.getItemByLabel(j)){this.searchTextBox.addItems({value:j},k)}};return a});