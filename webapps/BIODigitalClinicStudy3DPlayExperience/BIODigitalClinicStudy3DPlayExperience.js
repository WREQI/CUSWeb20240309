define("DS/BIODigitalClinicStudy3DPlayExperience/BIODigitalClinicStudy3DPlayParser",function(){return{parse:function(l){var k='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="none meet">';var a=JSON.parse(l);var d=a.PREVIEW;var i='<svg version="1.1" style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="1527" height="843"><g transform="translate(0,434)"><text x="3" zIndex="1" style="font-size:48px;font-weight:bold;color:#60606a;fill:#60606a;" y="16" width="1527"><tspan>No data to display : please add a result snapshot to the study</tspan></text></g></svg>';if(!(d instanceof Array)||d.length===0){return i}for(jsonPreviewIndex in d){var b=d[jsonPreviewIndex];var g=b.SVG;if(g===""){g=i}else{var j="<title>";var c=g.indexOf(j);var f="</title>";var m=g.indexOf(f);var e=g.slice(c+j.length,m);var h=b.TITLE;g=g.replace(e,h)}k=k+g}k=k+"</svg>";return k}}});define("DS/BIODigitalClinicStudy3DPlayExperience/BIODigitalClinicStudy3DPlayExperience",["DS/3DPlayDocumentViewer/3DPlayDocumentViewer","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","DS/WAFData/WAFData","DS/BIODigitalClinicStudy3DPlayExperience/BIODigitalClinicStudy3DPlayParser"],function(c,d,b,a){return c.extend({loadAsset:function(h,i){var g=this;var f="";var e=new Promise(function(k,j){d.getServiceUrl({serviceName:"3DSpace",onComplete:function(l){k(l)},onFailure:function(l){j(l)}})});e.then(function(k){f=k[0].url;var j=h.asset.physicalid;return new Promise(function(m,l){b.authenticatedRequest(f+"/resources/BIOCommonsWebService/eno/"+j+"/Stream/PreviewStream",{headers:{Accept:"application/json","Content-Type":"text/plain"},method:"GET",type:"text/plain",onComplete:function(n){n=a.parse(n);m(n)},onFailure:function(n){l(n)}})})},function(j){}).then(function(j){h.asset.provider="BUFFER";h.asset.dataFormat="svg";h.asset.mimetype="svg";h.asset.data=j;g._loadAssets(h,i)},function(j){})}})});