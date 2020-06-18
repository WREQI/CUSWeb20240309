require(["UWA/Core","DS/Tree/Tree","DS/Tree/TreeNodeModel","DS/WebappsUtils/WebappsUtils"],function(e,b,d,c){var a=window.Polymer;Polymer({is:"ec-monitor",properties:{},create:function(m){this.myJson=m;var f=new b({});for(var l=0;l<m.length;l++){var k=new d({label:m[l].name,icons:[""]});var g=m[l].status;if(g==="running"){var o=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/I_SMAFeaStatusBusy.png"}else{if(g==="completed"){var o=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/I_IAmDone_32.png"}else{if(g==="aborted"||g==="failed"){var o=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/Icon_Formula_Status_Failed.png"}else{if(g==="notstarted"){var o=""}}}}k.updateOptions({icons:[o]});if(m[l].children){for(var h=0;h<m[l].children.length;h++){var n=new d({label:m[l].children[h].name,icons:[""]});var g=m[l].children[h].status;if(g==="running"){var o=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/I_SMAFeaStatusBusy.png"}else{if(g==="completed"){var o=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/I_IAmDone_32.png"}else{if(g==="aborted"||g==="failed"){var o=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/Icon_Formula_Status_Failed.png"}else{if(g==="notstarted"){var o=""}}}}n.updateOptions({icons:[o]});k.addChild(n)}}f.addRoot(k)}this.myTree=f;f.inject(this.querySelector("#mainDiv"))},startMonitoring:function(j,k){var i=this;var h=this.myJson;var g;var f;g=setInterval(function(){var n=[];outerLoop:for(var m=0;m<h.length;m++){if(h[m].status==="notstarted"||h[m].status==="running"){if(!h[m].children){if(h[m].status==="notstarted"||h[m].status==="running"){j(h[m].name,function(o,p){i.setStatus(h[m].name,o,p);if(k){f=o;if(o==="running"){k(f)}}});break}}else{if(h[m].children){for(var l=0;l<h[m].children.length;l++){if(h[m].children[l].sequential&&(h[m].children[l].status==="notstarted"||h[m].children[l].status==="running")){j(h[m].children[l].name,function(o){i.setStatus(h[m].children[l].name,o)});break outerLoop}else{if(!h[m].children[l].sequential&&(h[m].children[l].status==="notstarted"||h[m].children[l].status==="running")){n.push(h[m].children[l].name);if(l<(h[m].children.length-1)){continue}else{if(l===(h[m].children.length-1)){j(n,function(o){for(var p=0;p<n.length;p++){i.setStatus(n[p],o[p])}});break outerLoop}}}}}}}}}i.myVar=g;if(m===(h.length-1)){if(!h[m-1].children){i.stopMonitoring();if(k){k(f)}}else{if(h[m-1].children){if(l===(h[m-1].children.length)){i.stopMonitoring()}}}}},3000)},setStatus:function(m,g,o){var f=this.myTree;var l=this.myJson;if(g==="running"){var n=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/I_SMAFeaStatusBusy.png"}else{if(g==="completed"){var n=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/I_IAmDone_32.png"}else{if(g==="aborted"||g==="failed"){var n=c.getWebappsBaseUrl()+"SMAProcWebXYPlot/assets/Icon_Formula_Status_Failed.png"}}}for(var k=0;k<l.length;k++){if(!l[k].children){if(l[k].name===m){l[k].status=g;break}}else{if(l[k].children){for(var h=0;h<l[k].children.length;h++){if(l[k].children[h].name===m){l[k].children[h].status=g;break}}}}}for(var k=0;k<f.getRoots().length;k++){if(!f.getRoots()[k].getChildren()){if(f.getRoots()[k]._options.label===m){f.getRoots()[k].updateOptions({icons:[n]});if(o){f.getRoots()[k].setLabel(m+" ("+o+" ms)")}break}}else{if(f.getRoots()[k].getChildren()){for(var h=0;h<f.getRoots()[k].getChildren().length;h++){if(f.getRoots()[k].getChildren()[h]._options.label===m){f.getRoots()[k].getChildren()[h]._options.status=g;f.getRoots()[k].getChildren()[h].updateOptions({icons:[n]});if(h===(f.getRoots()[k].getChildren().length-1)){f.getRoots()[k]._options.status=g;f.getRoots()[k].updateOptions({icons:[n]})}}}}}}},stopMonitoring:function(){clearInterval(this.myVar)},ready:function(){this.fire("ecmonitorready")}})});