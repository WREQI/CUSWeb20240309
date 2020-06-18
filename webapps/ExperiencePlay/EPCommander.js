define("DS/ExperiencePlay/EPCommander",["DS/ExperienceKernel/ExperienceKernel","DS/EP/EP"],function(b,a){var d=function(e){this.ip=(e.ip!==undefined?e.ip:window.location.hostname);this.port=(e.port!==undefined?e.port:b.defaultsOptions.webSocketPort);this.globalOnDisconnect=e.onDisconnect;this.connectToEK()};d.prototype.connectToEK=function(){var e={pool:"WebCommander",hypervisorIp:this.ip,webSocketPort:this.port,onHypervisorDisconnect:this.localOnDisconnect.bind(this)};this.node=new b.Node(e);this.playerId=this.node.connect("Player").select()};var c=function(e,f){this.onOK=e;this.onFail=f;this.success=undefined;this.answer=undefined};c.prototype.onBinary=function(e){var f=new a.JSONMessage;f.FromBinary(e);return this.onCommand(f)};c.prototype.onText=function(e){var f=new a.JSONMessage;f.FromJSON(e);return this.onCommand(f)};c.prototype.onCommand=function(e){if(((e.command==="SendEvent")&&(e.result===a.JSONMessage.EResult.eEventOK))||(e.result===a.JSONMessage.EResult.eCommandOK)){if((this.success===undefined)||(this.success!==false)){this.success=true;if(this.answer===undefined){this.answer=e}else{this.answer.parameters=this.answer.parameters.concat(e.parameters)}}}else{if(((e.command==="SendEvent")&&(e.result===a.JSONMessage.EResult.eEventFail))||(e.result===a.JSONMessage.EResult.eCommandFail)){this.success=false;this.answer=e}else{console.error("Unknown answer "+e.command+(e.dataStr!==""?(" ("+e.dataStr+")!"):"!"))}}return true};c.prototype.join=function(){if((this.success!==undefined)&&(this.success===true)){if(this.onOK!==undefined){this.onOK(this.answer)}}else{if(this.onFail!==undefined){this.onFail(this.answer)}else{if((this.success!==undefined)&&(this.success===false)&&(this.onFail===undefined)){console.error("The command "+this.answer.command+(this.answer.dataStr!==""?(" ("+this.answer.dataStr+") failed!"):" failed!"))}else{console.error("Issue encounter with a send!")}}}return true};c.prototype.get=function(){return{onText:this.onText.bind(this),onBinary:this.onBinary.bind(this),join:this.join.bind(this)}};d.prototype.send=function(e,f){return function(g,j){if((this.node===undefined)||(this.playerId===undefined)){this.connectToEK()}var h=new c(g,j);var i=new b.Multiplexer(this.node,h.get());if(f!==undefined){i.sendBinary(this.node.connect(f).select(),e.ToBinary())}else{i.sendBinary(this.playerId,e.ToBinary())}i.close()}.bind(this)};d.prototype.sendBasicEventToPlayer=function(f){var e=new a.JSONMessage("SendBasicEvent","WebCommander");if(f!==undefined){e.dataStr=f}return this.send(e)};d.prototype.sendEventToPlayer=function(f){var e=new a.JSONMessage("SendEvent","WebCommander");if(f!==undefined){e.dataStr=f}return this.send(e)};d.prototype.sendToPlayer=function(e){return this.send(e)};d.prototype.sendTo=function(f,e){return this.send(e,f)};d.prototype.localOnDisconnect=function(){this.node=undefined;this.playerId=undefined;this.stack=[];if(this.globalOnDisconnect){this.globalOnDisconnect()}};a.Commander=d;return a.Commander});