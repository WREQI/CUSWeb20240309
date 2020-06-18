define("DS/SMAProcPSUI/Models/IOModel",["UWA/Core","UWA/Class/Model"],function(c,b){var f={ACTIVITY:"Activity",SIMULATION:"Simulation",PARAMETER:"Parameters",ATTRIBUTE:"Attributes",OWNEDCONTENT:"OwnedContent",CONTENT:"Content"};function e(h){var g=Number(h);if(!isNaN(g)&&(g.toString().indexOf("."))){return true}else{return false}}function a(h){var g=Number(h);if(isNaN(g)){return false}else{return true}}var d=b.extend({idAttribute:"modelId",parse:function(h){var g={id:h.id,modelId:h.modelId,sequence:h.sequence,title:h.title,value:h.value,description:h.description,datatype:h.datatype,syncAssist:h.syncAssist,valuetype:h.valuetype,choices:h.choices,mode:h.ioMode,Expression:h.Expression,action1:h.action,objectId:h.objectId,parentId:h.parentId,type:h.type,DummyDocType:h.DummyDocType,isModified:false,level:h.level,chooser_physicalid:h.chooser_physicalid,value_display:h.value_display,chooser_value_orig:h.chooser_value_orig};g.title_display=h.title_display||h.title;g.minimum=(c.is(h.minimum,"string")&&h.minimum.length)?Number(h.minimum):h.minimum;g.maximum=(c.is(h.maximum,"string")&&h.maximum.length)?Number(h.maximum):h.maximum;g.mandatory=c.is(h.mandatory,"string")?h.mandatory.toLowerCase()==="true":h.mandatory;g.readonly=h.editableInPS==="false"||h.forceReadOnly==="true";g.isHidden=h.action==="hide"&&h.editableInPS==="false";g.isHeader=h.value===undefined;if(g.isHeader){if(h.sequence==="0"){g.headerType=f.SIMULATION}else{if(c.is(h.sequence)&&(h.sequence.indexOf(f.ACTIVITY)!==-1)){g.headerType=f.ACTIVITY}else{if(h.title.indexOf(f.PARAMETER)!==-1){g.headerType="HeaderTitle"}else{if(h.title.indexOf(f.ATTRIBUTE)!==-1){g.headerType="HeaderTitle"}else{if(h.title.indexOf(f.OWNEDCONTENT)!==-1){g.headerType="HeaderTitle"}else{if(h.title.indexOf(f.CONTENT)!==-1){g.headerType="HeaderTitle"}}}}}}}if(g.syncAssist&&(g.syncAssist==="Parameter")){g.headerType=f.PARAMETER}else{if(g.syncAssist&&(g.syncAssist&&g.syncAssist==="Attribute")){g.headerType=f.ATTRIBUTE}else{if(g.syncAssist&&(g.syncAssist&&g.syncAssist==="content")){g.headerType=f.CONTENT}}}var i;for(i in g){if(c.owns(g,i)&&!c.is(g[i])){delete g[i]}}return g},validate:function(r,u){var k=r.datatype,v=r.valuetype,l=r.mandatory;var n=r.minimum,h=r.maximum;var q=false,m;var g=r.value;var j;if(v==="multival"){var t=g.toString().split("\n"),p;for(j=0;j<t.length&&!q;j+=1){p=t[j];switch(k){case"integer":q=!e(p);m=" Please enter a valid integer.";break;case"real":q=!a(p);m=" Please enter a valid real number.";break;default:}if(!q&&n&&Number(p)<n){q=true;m=" Please enter value greater than "+n+"."}if(!q&&h&&Number(p)>h){q=true;m=" Please enter value less than "+h+"."}}}else{if(v==="array"){var o,s;o=JSON.parse(u.title);g=JSON.parse(r.value);s=g;for(j=0;j<o.length;j++){if(j===0){s=s[o[j]]}else{s=s.children[o[j]]}}switch(k){case"integer":q=!e(s.data);m=" Please enter a valid integer.";break;case"real":q=!a(s.data);m=" Please enter a valid real number.";break;default:}}else{switch(k){case"integer":q=!e(g);m=" Please enter a valid integer.";break;case"real":q=!a(g);m=" Please enter a valid real number.";break;default:}if(!q&&n&&Number(g)<n){q=true;m=" Please enter value greater than "+n+"."}if(!q&&h&&Number(g)>h){q=true;m=" Please enter value less than "+h+"."}}}if(l&&String(g).length===0){q=true;m=" Required."}if(!q){this.set("isModified",true)}return q?m||"There is some error.":false},set:function(o,j,r){var p;if(o){if(c.is(o,"object")){p=o,r=j||{}}else{p={};p[o]=j;r=r||{}}if(p.hasOwnProperty("value")){var l=this.get("datatype")||p.datatype;var s=this.get("valuetype")||p.valuetype;var h=p.value;if(s==="array"&&r.method==="set"){var n,g,q;try{n=JSON.parse(r.title);g=JSON.parse(this.get("value"));q=g;for(var k=0;k<n.length;k++){if(k===0){q=q[n[k]]}else{q=q.children[n[k]]}}q.data=h;p.value=JSON.stringify(g)}catch(m){console.warn(m)}}else{switch(l){case"boolean":if(s!=="array"&&c.is(h,"string")){h=(h.toLowerCase()==="true")}p.value=h;break;case"integer":case"real":case"string":case"multiline":p.value=h;break;case"timestamp":if(c.is(h,"date")){h=h.getTime()}else{if(c.is(h,"string")){if(h!==""){if(Number(h)){h=Number(h)}else{h=Date.parse(h)}}}}p.value=h;break;case"chooser":if(r.method==="set"){p.value=h;if(this.get("syncAssist")!=="Parameter"){p.chooser_physicalid=h}}break}}}return this._parent(p,r)}}});return d});