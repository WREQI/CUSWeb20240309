(function(){var a=CKEDITOR.addTemplate("sharedcontainer",'<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_shared cke_detached cke_{langDir} '+CKEDITOR.env.cssClass+'" dir="{langDir}" title="'+(CKEDITOR.env.gecko?" ":"")+'" lang="{langCode}" role="presentation"><div class="cke_inner"><div id="{spaceId}" class="cke_{space}" role="presentation">{content}</div></div></div>');CKEDITOR.plugins.add("sharedspace",{init:function(c){c.on("loaded",function(){var e=c.config.sharedSpaces;if(e){for(var d in e){b(c,d,e[d])}}},null,null,9)}});function b(f,d,e){var h=CKEDITOR.document.getById(e),c,g;if(h){c=f.fire("uiSpace",{space:d,html:""}).html;if(c){f.on("uiSpace",function(i){if(i.data.space==d){i.cancel()}},null,null,1);g=h.append(CKEDITOR.dom.element.createFromHtml(a.output({id:f.id,name:f.name,langDir:f.lang.dir,langCode:f.langCode,space:d,spaceId:f.ui.spaceId(d),content:c})));if(h.getCustomData("cke_hasshared")){g.hide()}else{h.setCustomData("cke_hasshared",1)}g.unselectable();g.on("mousedown",function(i){i=i.data;if(!i.getTarget().hasAscendant("a",1)){i.preventDefault()}});f.focusManager.add(g,1);f.on("focus",function(){for(var k=0,l,j=h.getChildren();(l=j.getItem(k));k++){if(l.type==CKEDITOR.NODE_ELEMENT&&!l.equals(g)&&l.hasClass("cke_shared")){l.hide()}}g.show()});f.on("destroy",function(){g.remove()})}}}})();